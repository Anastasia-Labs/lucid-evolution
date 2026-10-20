import { afterEach, describe, expect, test, vi } from "vitest";
import {
  ScalusEmulator,
  ScalusEmulatorError,
} from "@lucid-evolution/scalus-uplc/emulator";
import {
  applyDoubleCborEncoding,
  CML,
  Data,
  EmulatorAccount,
  generateEmulatorAccount,
  Lucid,
  LucidEvolution,
  paymentCredentialOf,
  PROTOCOL_PARAMETERS_DEFAULT,
  Network,
  Script,
  unixTimeToSlot,
  UTxO,
  validatorToAddress,
  walletFromSeed,
} from "../src/index.js";
import { alwaysSucceedV3Script } from "./fixtures/scripts.js";
import { TxSignBuilder } from "../src/tx-sign-builder/TxSignBuilder.js";

// `(program 1.0.0 (lam ctx (error)))`, a PlutusV3 script that always fails.
const alwaysFailV3Script: Script = {
  type: "PlutusV3",
  script: applyDoubleCborEncoding("450100002601"),
};

const setup = async (
  options: { pools?: string[] } = {},
): Promise<{
  emulator: ScalusEmulator;
  lucid: LucidEvolution;
  payer: EmulatorAccount;
  payee: EmulatorAccount;
}> => {
  const payer = generateEmulatorAccount({ lovelace: 100_000_000n });
  const payee = generateEmulatorAccount({ lovelace: 10_000_000n });
  const emulator = new ScalusEmulator(
    [payer, payee],
    PROTOCOL_PARAMETERS_DEFAULT,
    0n,
    options,
  );
  const lucid = await Lucid(emulator, "Custom", {
    evaluator: emulator.evaluator,
  });
  lucid.selectWallet.fromSeed(payer.seedPhrase);
  return { emulator, lucid, payer, payee };
};

const pay = async (
  lucid: LucidEvolution,
  address: string,
  lovelace: bigint,
) => {
  const tx = await lucid
    .newTx()
    .pay.ToAddress(address, { lovelace })
    .complete();
  return (await tx.sign.withWallet().complete()).submit();
};

const lovelaceAt = async (emulator: ScalusEmulator, address: string) =>
  (await emulator.getUtxos(address)).reduce(
    (total, { assets }) => total + assets.lovelace,
    0n,
  );

describe("ScalusEmulator with Lucid", () => {
  test("builds, signs and submits a payment, then a second one a block later", async () => {
    const { emulator, lucid, payee } = await setup();
    const first = await pay(lucid, payee.address, 5_000_000n);
    expect(await emulator.awaitTx(first)).toBe(true);
    expect(emulator.slot).toBe(0);
    expect(await lovelaceAt(emulator, payee.address)).toBe(15_000_000n);

    emulator.awaitBlock();
    // Lucid takes the time from the branded emulator, so a lower bound of
    // now() is the current slot.
    const tx = await lucid
      .newTx()
      .pay.ToAddress(payee.address, { lovelace: 7_000_000n })
      .validFrom(emulator.now())
      .complete();
    const second = await (await tx.sign.withWallet().complete()).submit();
    expect(await emulator.awaitTx(second)).toBe(true);
    expect(await lovelaceAt(emulator, payee.address)).toBe(22_000_000n);
  });

  test("reports an applied transaction as confirmed in the block of its slot", async () => {
    const { emulator, lucid, payee } = await setup();
    emulator.awaitSlot(45);
    const txHash = await pay(lucid, payee.address, 5_000_000n);
    emulator.awaitSlot(55);
    expect(await emulator.getTransactionStatus(txHash)).toEqual({
      status: "confirmed",
      txHash,
      confirmation: { txHash, slot: 45, blockHeight: 2, confirmations: 4 },
    });
  });

  test("a ledger rule rejection is a ScalusEmulatorError", async () => {
    const { emulator, lucid, payee } = await setup();
    const tx = await lucid
      .newTx()
      .pay.ToAddress(payee.address, { lovelace: 5_000_000n })
      .complete();
    const signed = (await tx.sign.withWallet().complete()).toCBOR();
    await emulator.submitTx(signed);
    // The same transaction again: its inputs are spent.
    const error = await emulator.submitTx(signed).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ScalusEmulatorError);
    expect((error as ScalusEmulatorError).errorRule).toBe("UtxoNotAvailable");
  });

  test("spends from a Plutus script with the emulator's evaluator", async () => {
    const { emulator, lucid } = await setup();
    const scriptAddress = validatorToAddress("Custom", alwaysSucceedV3Script);
    const lock = await lucid
      .newTx()
      .pay.ToContract(
        scriptAddress,
        { kind: "inline", value: Data.void() },
        { lovelace: 10_000_000n },
      )
      .complete();
    await (await lock.sign.withWallet().complete()).submit();
    emulator.awaitBlock();

    const evaluateTx = vi.spyOn(emulator.scalus, "evaluateTx");
    const spend = await lucid
      .newTx()
      .collectFrom(await emulator.getUtxos(scriptAddress), Data.void())
      .attach.SpendingValidator(alwaysSucceedV3Script)
      .complete();
    expect(evaluateTx).toHaveBeenCalled();
    const signed = (await spend.sign.withWallet().complete()).toCBOR();
    expect(await emulator.evaluateTx(signed)).toEqual([
      {
        redeemer_tag: "spend",
        redeemer_index: 0,
        ex_units: { mem: expect.any(Number), steps: expect.any(Number) },
      },
    ]);
    await emulator.submitTx(signed);
    expect(await emulator.getUtxos(scriptAddress)).toEqual([]);
  });

  test("a failing script rejects evaluation with Scalus's PlutusScriptEvaluationError", async () => {
    const payer = generateEmulatorAccount({ lovelace: 100_000_000n });
    const emulator = new ScalusEmulator([payer], PROTOCOL_PARAMETERS_DEFAULT);
    const scriptAddress = validatorToAddress("Custom", alwaysFailV3Script);
    emulator.addUtxo({
      txHash: "55".repeat(32),
      outputIndex: 0,
      address: scriptAddress,
      assets: { lovelace: 10_000_000n },
      datum: Data.void(),
    });
    // Fixed budgets: the transaction must be built before it can fail.
    const lucid = await Lucid(emulator, "Custom", {
      evaluator: {
        evaluate: async () => [
          {
            redeemer_tag: "spend",
            redeemer_index: 0,
            ex_units: { mem: 1_000_000, steps: 1_000_000_000 },
          },
        ],
      },
    });
    lucid.selectWallet.fromSeed(payer.seedPhrase);
    const tx = await lucid
      .newTx()
      .collectFrom(await emulator.getUtxos(scriptAddress), Data.void())
      .attach.SpendingValidator(alwaysFailV3Script)
      .complete();

    const error = await emulator.evaluateTx(tx.toCBOR()).catch((e) => e);
    expect(error.name).toBe("PlutusScriptEvaluationError");
    expect(error.code).toBe("SCRIPT_FAILURE");
    await expect(
      emulator.evaluator.evaluate({
        tx: tx.toCBOR(),
        additionalUTxOs: [],
      } as never),
    ).rejects.toMatchObject({ name: "PlutusScriptEvaluationError" });
  });

  test("evaluates a spend of a UTxO outside the ledger only with it in additionalUTxOs", async () => {
    const { emulator, payer } = await setup();
    const scriptUtxo: UTxO = {
      txHash: "88".repeat(32),
      outputIndex: 0,
      address: validatorToAddress("Custom", alwaysSucceedV3Script),
      assets: { lovelace: 10_000_000n },
      datum: Data.void(),
    };
    // Built on a copy that holds the UTxO; the emulator itself does not.
    const copy = emulator.snapshot();
    copy.addUtxo(scriptUtxo);
    const lucid = await Lucid(copy, "Custom", { evaluator: copy.evaluator });
    lucid.selectWallet.fromSeed(payer.seedPhrase);
    const tx = (
      await lucid
        .newTx()
        .collectFrom([scriptUtxo], Data.void())
        .attach.SpendingValidator(alwaysSucceedV3Script)
        .complete()
    ).toCBOR();

    const spend = [
      {
        redeemer_tag: "spend",
        redeemer_index: 0,
        ex_units: { mem: expect.any(Number), steps: expect.any(Number) },
      },
    ];
    expect(await emulator.evaluateTx(tx, [scriptUtxo])).toEqual(spend);
    expect(
      await emulator.evaluator.evaluate({
        tx,
        additionalUTxOs: [scriptUtxo],
      } as never),
    ).toEqual(spend);
    await expect(emulator.evaluateTx(tx)).rejects.toThrow();
  });

  test("Lucid spends a datum-hash UTxO that addUtxo put into the ledger", async () => {
    const { emulator, lucid } = await setup();
    const scriptAddress = validatorToAddress("Custom", alwaysSucceedV3Script);
    const datum = Data.to(42n);
    const hash = CML.hash_plutus_data(
      CML.PlutusData.from_cbor_hex(datum),
    ).to_hex();
    emulator.addUtxo({
      txHash: "99".repeat(32),
      outputIndex: 0,
      address: scriptAddress,
      assets: { lovelace: 10_000_000n },
      datumHash: hash,
      datum,
    });
    expect(await emulator.getDatum(hash)).toBe(datum);

    // The queried UTxO carries only the hash: Lucid looks the datum up.
    const tx = await lucid
      .newTx()
      .collectFrom(await emulator.getUtxos(scriptAddress), Data.void())
      .attach.SpendingValidator(alwaysSucceedV3Script)
      .complete();
    await (await tx.sign.withWallet().complete()).submit();
    expect(await emulator.getUtxos(scriptAddress)).toEqual([]);
  });

  test("reports each redeemer at the index of its input", async () => {
    const { emulator, lucid } = await setup();
    const scriptAddress = validatorToAddress("Custom", alwaysSucceedV3Script);
    for (const txHash of ["11".repeat(32), "ff".repeat(32)])
      emulator.addUtxo({
        txHash,
        outputIndex: 0,
        address: scriptAddress,
        assets: { lovelace: 10_000_000n },
        datum: Data.void(),
      });
    const tx = await lucid
      .newTx()
      .collectFrom(await emulator.getUtxos(scriptAddress), Data.void())
      .attach.SpendingValidator(alwaysSucceedV3Script)
      .complete();

    const inputs = tx.toTransaction().body().inputs();
    const scriptInputs = Array.from({ length: inputs.len() }, (_, index) =>
      inputs.get(index).transaction_id().to_hex() === "00".repeat(32)
        ? -1
        : index,
    ).filter((index) => index >= 0);
    expect(scriptInputs).toHaveLength(2);
    const indices = (await emulator.evaluateTx(tx.toCBOR()))
      .map(({ redeemer_index }) => redeemer_index)
      .sort((a, b) => a - b);
    expect(indices).toEqual(scriptInputs);
    expect(indices[1]).toBeGreaterThan(0);
  });

  test("delegates to a registered pool and receives distributed rewards", async () => {
    const poolId = CML.Ed25519KeyHash.from_hex("cd".repeat(28)).to_bech32(
      "pool",
    );
    const { emulator, lucid } = await setup({ pools: [poolId] });
    const rewardAddress = (await lucid.wallet().rewardAddress())!;
    const tx = await lucid
      .newTx()
      .registerAndDelegate.ToPool(rewardAddress, poolId)
      .complete();
    await (await tx.sign.withWallet().complete()).submit();
    expect(await emulator.getDelegation(rewardAddress)).toEqual({
      poolId,
      rewards: 0n,
    });

    emulator.distributeRewards(1_000_000n);
    expect(emulator.slot).toBe(20);
    expect(await emulator.getRewardAccount(rewardAddress)).toEqual({
      registered: true,
      poolId,
      rewards: 1_000_000n,
    });
  });
});

/** The errorRule of a rejected submission; Lucid wraps it in TxSubmitError. */
const rejectionRule = async (tx: TxSignBuilder): Promise<string> => {
  const result = await (await tx.sign.withWallet().complete()).submitSafe();
  if (result._tag === "Right") throw new Error("The submission succeeded.");
  return (result.left.cause as ScalusEmulatorError).errorRule;
};

// Lucid's own emulator tests that Scalus rejects by a ledger rule.
describe("ScalusEmulator ledger rules that Lucid's Emulator does not check", () => {
  test("delegation to an unregistered pool is StakeCertificates", async () => {
    // The ledger: DelegateeStakePoolNotRegisteredDELEG.
    const { lucid } = await setup();
    const rewardAddress = (await lucid.wallet().rewardAddress())!;
    const poolId = CML.Ed25519KeyHash.from_hex("cd".repeat(28)).to_bech32(
      "pool",
    );
    const tx = await lucid
      .newTx()
      .registerAndDelegate.ToPool(rewardAddress, poolId)
      .complete();
    expect(await rejectionRule(tx)).toBe("StakeCertificates");
  });

  test("a pool retirement that refunds the deposit at once is ValueNotConserved", async () => {
    // The ledger refunds a pool deposit to the reward account at the
    // retirement epoch, never in the retiring transaction:
    // ValueNotConservedUTxO.
    const payer = generateEmulatorAccount({ lovelace: 1_000_000_000n });
    const emulator = new ScalusEmulator([payer], PROTOCOL_PARAMETERS_DEFAULT);
    const lucid = await Lucid(emulator, "Custom", {
      evaluator: emulator.evaluator,
    });
    lucid.selectWallet.fromSeed(payer.seedPhrase);
    const rewardAddress = (await lucid.wallet().rewardAddress())!;
    const poolId = CML.Ed25519KeyHash.from_hex(
      paymentCredentialOf(payer.address).hash,
    ).to_bech32("pool");
    const register = await lucid
      .newTx()
      .register.Pool({
        poolId,
        vrfKeyHash: "00".repeat(32),
        pledge: 0n,
        cost: 340_000_000n,
        margin: 1,
        rewardAddress,
        owners: [rewardAddress],
        relays: [],
      })
      .complete();
    await (await register.sign.withWallet().complete()).submit();
    emulator.awaitBlock();

    const retire = await lucid.newTx().retire.Pool(poolId, 1n).complete();
    expect(await rejectionRule(retire)).toBe("ValueNotConserved");
  });

  test("a donation reaches the treasury at the epoch boundary", async () => {
    // The ledger: the EPOCH rule moves donations into the treasury.
    const account = generateEmulatorAccount({ lovelace: 80_000_000n });
    const emulator = new ScalusEmulator(
      [account],
      PROTOCOL_PARAMETERS_DEFAULT,
      123_000_000n,
    );
    const lucid = await Lucid(emulator, "Custom", {
      evaluator: emulator.evaluator,
    });
    lucid.selectWallet.fromSeed(account.seedPhrase);
    const tx = await lucid.newTx().donateToTreasury(2_000_000n).complete();
    await (await tx.sign.withWallet().complete()).submit();
    expect(await emulator.getTreasury()).toBe(123_000_000n);

    emulator.awaitSlot(emulator.scalus.getCardanoInfo().slotConfig.epochLength);
    expect(await emulator.getTreasury()).toBe(125_000_000n);
  });
});

describe("ScalusEmulator.forNetwork with Lucid", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  const forPreprod = async (options: { pools?: string[] } = {}) => {
    const payer = generateEmulatorAccount({ lovelace: 100_000_000n });
    const emulator = ScalusEmulator.forNetwork("Preprod", {
      utxos: [
        {
          txHash: "66".repeat(32),
          outputIndex: 0,
          address: payer.address,
          assets: { lovelace: 100_000_000n },
        },
      ],
      ...options,
    });
    const lucid = await Lucid(emulator, "Preprod");
    lucid.selectWallet.fromSeed(payer.seedPhrase);
    return { emulator, lucid, payer };
  };

  test("counts confirmations up to the wall clock, not the last synced slot", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    const start = Date.now();
    const { emulator, lucid, payer } = await forPreprod();
    const txHash = await pay(lucid, payer.address, 5_000_000n);
    // Two blocks on; nothing syncs the ledger in between.
    vi.setSystemTime(start + 40_000);
    const status = await emulator.getTransactionStatus(txHash);
    expect(status.status === "confirmed" && status.confirmation).toMatchObject({
      confirmations: 3,
    });
    // A clock set back counts from the ledger's slot, never earlier.
    vi.setSystemTime(start - 60_000);
    const back = await emulator.getTransactionStatus(txHash);
    expect(back.status === "confirmed" && back.confirmation).toMatchObject({
      confirmations: 1,
    });
  });

  test("distributeRewards throws before it pays any reward", async () => {
    const poolId = CML.Ed25519KeyHash.from_hex("cd".repeat(28)).to_bech32(
      "pool",
    );
    const { emulator, lucid } = await forPreprod({ pools: [poolId] });
    const rewardAddress = (await lucid.wallet().rewardAddress())!;
    const tx = await lucid
      .newTx()
      .registerAndDelegate.ToPool(rewardAddress, poolId)
      .complete();
    await (await tx.sign.withWallet().complete()).submit();

    expect(() => emulator.distributeRewards(1_000_000n)).toThrow(
      "A wall-clock ScalusEmulator follows Date.now().",
    );
    expect((await emulator.getDelegation(rewardAddress)).rewards).toBe(0n);
  });

  test("keeps the datum of a datum-hash UTxO, so Lucid can spend it", async () => {
    const payer = generateEmulatorAccount({ lovelace: 100_000_000n });
    const scriptAddress = validatorToAddress("Preprod", alwaysSucceedV3Script);
    const datum = Data.to(42n);
    const hash = CML.hash_plutus_data(
      CML.PlutusData.from_cbor_hex(datum),
    ).to_hex();
    const emulator = ScalusEmulator.forNetwork("Preprod", {
      utxos: [
        {
          txHash: "66".repeat(32),
          outputIndex: 0,
          address: payer.address,
          assets: { lovelace: 100_000_000n },
        },
        {
          txHash: "77".repeat(32),
          outputIndex: 0,
          address: scriptAddress,
          assets: { lovelace: 10_000_000n },
          datumHash: hash,
          datum,
        },
      ],
    });
    expect(await emulator.getDatum(hash)).toBe(datum);

    const lucid = await Lucid(emulator, "Preprod", {
      evaluator: emulator.evaluator,
    });
    lucid.selectWallet.fromSeed(payer.seedPhrase);
    // The queried UTxO carries only the hash: Lucid looks the datum up.
    const tx = await lucid
      .newTx()
      .collectFrom(await emulator.getUtxos(scriptAddress), Data.void())
      .attach.SpendingValidator(alwaysSucceedV3Script)
      .complete();
    await (await tx.sign.withWallet().complete()).submit();
    expect(await emulator.getUtxos(scriptAddress)).toEqual([]);
  });

  test.each(["Preview", "Mainnet"] as const)(
    "%s: takes the network's slot configuration and network id",
    async (network: Network & ("Preview" | "Mainnet")) => {
      const { seedPhrase } = generateEmulatorAccount({});
      const { address } = walletFromSeed(seedPhrase, { network });
      const before = unixTimeToSlot(network, Date.now());
      const emulator = ScalusEmulator.forNetwork(network, {
        utxos: [
          {
            txHash: "66".repeat(32),
            outputIndex: 0,
            address,
            assets: { lovelace: 100_000_000n },
          },
        ],
      });
      expect(emulator.slot).toBeGreaterThanOrEqual(before);
      expect(emulator.slot).toBeLessThanOrEqual(
        unixTimeToSlot(network, Date.now()),
      );

      // A wrong slot configuration fails one of the two bounds, and a wrong
      // network id fails the network of the address.
      const lucid = await Lucid(emulator, network);
      lucid.selectWallet.fromSeed(seedPhrase);
      const tx = await lucid
        .newTx()
        .pay.ToAddress(address, { lovelace: 5_000_000n })
        .validFrom(Date.now() - 60_000)
        .validTo(Date.now() + 60_000)
        .complete();
      const txHash = await (await tx.sign.withWallet().complete()).submit();
      expect(await emulator.awaitTx(txHash)).toBe(true);
    },
  );

  test("follows the wall clock, forwards only", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    const start = Date.now();
    const payer = generateEmulatorAccount({ lovelace: 100_000_000n });
    const emulator = ScalusEmulator.forNetwork("Preprod", {
      utxos: [
        {
          txHash: "66".repeat(32),
          outputIndex: 0,
          address: payer.address,
          assets: { lovelace: 100_000_000n },
        },
      ],
    });
    const lucid = await Lucid(emulator, "Preprod");
    lucid.selectWallet.fromSeed(payer.seedPhrase);

    // A minute on, a lower bound of now is a slot the ledger has not reached
    // unless it follows the clock.
    vi.setSystemTime(start + 60_000);
    const forward = await lucid
      .newTx()
      .pay.ToAddress(payer.address, { lovelace: 5_000_000n })
      .validFrom(Date.now())
      .complete();
    await (await forward.sign.withWallet().complete()).submit();

    // Back to 30 s: the ledger stays at 60 s, so an upper bound of 50 s has
    // passed.
    vi.setSystemTime(start + 30_000);
    const backward = await lucid
      .newTx()
      .pay.ToAddress(payer.address, { lovelace: 5_000_000n })
      .validTo(start + 50_000)
      .complete();
    const signed = (await backward.sign.withWallet().complete()).toCBOR();
    const error = await emulator.submitTx(signed).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ScalusEmulatorError);
    expect((error as ScalusEmulatorError).errorRule).toBe("TransactionExpired");
  });
});

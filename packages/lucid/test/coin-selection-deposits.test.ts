import { describe, expect, test } from "vitest";
import {
  Data,
  Emulator,
  EmulatorAccount,
  generateEmulatorAccount,
  Lucid,
  LucidEvolution,
  PoolParams,
  PROTOCOL_PARAMETERS_DEFAULT,
  TxBuilder,
  TxSignBuilder,
  UTxO,
  validatorToRewardAddress,
  walletFromSeed,
} from "../src/index.js";
import { CML } from "../src/core.js";
import type { CompleteOptions } from "../src/tx-builder/internal/CompleteTxBuilder.js";
import { alwaysSucceedV3Script } from "./fixtures/scripts.js";

// Every deposit is larger than any single wallet UTxO, so coin selection
// has to count it to pick enough inputs.
const SMALL_COIN = 1_500_000n;
const KEY_DEPOSIT = PROTOCOL_PARAMETERS_DEFAULT.keyDeposit;
const LARGE_DEPOSIT = 5_000_000n;
const protocolParameters = {
  ...PROTOCOL_PARAMETERS_DEFAULT,
  poolDeposit: LARGE_DEPOSIT,
  drepDeposit: LARGE_DEPOSIT,
  govActionDeposit: LARGE_DEPOSIT,
};
const poolId = CML.Ed25519KeyHash.from_hex("00".repeat(28)).to_bech32("pool");

type Fixture = {
  lucid: LucidEvolution;
  emulator: Emulator;
  rewardAddress: string;
  stakeKey: string;
  funder: EmulatorAccount;
  wallet: EmulatorAccount;
};

/** A wallet holding `coins` UTxOs of 1.5 ADA, and a funder with 1,000 ADA. */
const smallCoinWallet = async (coins: number): Promise<Fixture> => {
  const wallet = generateEmulatorAccount({ lovelace: 0n });
  const funder = generateEmulatorAccount({ lovelace: 1_000_000_000n });
  const emulator = new Emulator(
    [
      ...Array.from({ length: coins }, () => ({
        ...wallet,
        assets: { lovelace: SMALL_COIN },
      })),
      funder,
    ],
    protocolParameters,
  );
  const lucid = await Lucid(emulator, "Custom");
  lucid.selectWallet.fromSeed(wallet.seedPhrase);
  const keys = walletFromSeed(wallet.seedPhrase, { network: "Custom" });
  return {
    lucid,
    emulator,
    rewardAddress: keys.rewardAddress!,
    stakeKey: keys.stakeKey!,
    funder,
    wallet,
  };
};

const otherRewardAddress = () =>
  walletFromSeed(generateEmulatorAccount({}).seedPhrase, { network: "Custom" })
    .rewardAddress!;

const sink = () => generateEmulatorAccount({}).address;

/**
 * Builds `tx` and reports how many wallet inputs it spends and the lovelace it
 * leaves out of its outputs and fee: deposits paid, less refunds and
 * withdrawals received.
 */
const completeAndMeasure = async (
  lucid: LucidEvolution,
  tx: TxBuilder,
  options: CompleteOptions = {},
) => {
  const walletUtxos = await lucid.wallet().getUtxos();
  const lovelaceByOutRef = new Map(
    walletUtxos.map((utxo: UTxO) => [
      `${utxo.txHash}#${utxo.outputIndex}`,
      utxo.assets.lovelace,
    ]),
  );
  const signBuilder = await tx.complete(options);
  const body = signBuilder.toTransaction().body();

  let inputLovelace = 0n;
  for (let index = 0; index < body.inputs().len(); index++) {
    const input = body.inputs().get(index);
    const lovelace = lovelaceByOutRef.get(
      `${input.transaction_id().to_hex()}#${input.index()}`,
    );
    expect(lovelace).toBeDefined();
    inputLovelace += lovelace!;
  }
  let outputLovelace = 0n;
  for (let index = 0; index < body.outputs().len(); index++) {
    outputLovelace += body.outputs().get(index).amount().coin();
  }
  return {
    signBuilder,
    inputs: body.inputs().len(),
    netDeposit: inputLovelace - outputLovelace - body.fee(),
  };
};

const submit = async (
  emulator: Emulator,
  signBuilder: TxSignBuilder,
  extraKeys: string[] = [],
) => {
  let signing = signBuilder.sign.withWallet();
  for (const key of extraKeys) signing = signing.sign.withPrivateKey(key);
  await (await signing.complete()).submit();
  emulator.awaitBlock();
};

/** The funder registers the wallet's stake key, so the wallet can deregister it. */
const registerWalletStakeFromFunder = async ({
  lucid,
  emulator,
  rewardAddress,
  funder,
  wallet,
}: Fixture) => {
  lucid.selectWallet.fromSeed(funder.seedPhrase);
  await submit(
    emulator,
    await lucid.newTx().register.Stake(rewardAddress).complete(),
  );
  lucid.selectWallet.fromSeed(wallet.seedPhrase);
};

const poolParams = (lucid: LucidEvolution, rewardAddress: string) =>
  lucid
    .wallet()
    .address()
    .then(
      (address) =>
        ({
          poolId: CML.Ed25519KeyHash.from_hex(
            CML.Address.from_bech32(address)
              .payment_cred()!
              .as_pub_key()!
              .to_hex(),
          ).to_bech32("pool"),
          vrfKeyHash: "00".repeat(32),
          pledge: 0n,
          cost: 340_000_000n,
          margin: 1,
          rewardAddress,
          owners: [rewardAddress],
          relays: [],
        }) satisfies PoolParams,
    );

describe("coin selection counts deposits", () => {
  test.each([
    {
      name: "stake registration",
      deposit: KEY_DEPOSIT,
      build: async (lucid: LucidEvolution, rewardAddress: string) =>
        lucid.newTx().register.Stake(rewardAddress),
    },
    {
      name: "stake registration with an explicit deposit",
      deposit: KEY_DEPOSIT,
      // The default 5 ADA collateral would take four 1.5 ADA inputs; three
      // is the most allowed.
      options: { setCollateral: 1_000_000n },
      build: async (lucid: LucidEvolution) =>
        lucid
          .newTx()
          .register.Stake(
            validatorToRewardAddress("Custom", alwaysSucceedV3Script),
            Data.void(),
          )
          .attach.CertificateValidator(alwaysSucceedV3Script),
    },
    {
      name: "registration and pool delegation",
      deposit: KEY_DEPOSIT,
      build: async (lucid: LucidEvolution, rewardAddress: string) =>
        lucid.newTx().registerAndDelegate.ToPool(rewardAddress, poolId),
    },
    {
      name: "registration and vote delegation",
      deposit: KEY_DEPOSIT,
      build: async (lucid: LucidEvolution, rewardAddress: string) =>
        lucid.newTx().registerAndDelegate.ToDRep(rewardAddress, {
          __typename: "AlwaysAbstain",
        }),
    },
    {
      name: "registration with pool and vote delegation",
      deposit: KEY_DEPOSIT,
      build: async (lucid: LucidEvolution, rewardAddress: string) =>
        lucid.newTx().registerAndDelegate.ToPoolAndDRep(rewardAddress, poolId, {
          __typename: "AlwaysAbstain",
        }),
    },
    {
      name: "DRep registration",
      deposit: LARGE_DEPOSIT,
      build: async (lucid: LucidEvolution, rewardAddress: string) =>
        lucid.newTx().register.DRep(rewardAddress),
    },
    {
      name: "pool registration",
      deposit: LARGE_DEPOSIT,
      build: async (lucid: LucidEvolution, rewardAddress: string) =>
        lucid.newTx().register.Pool(await poolParams(lucid, rewardAddress)),
    },
    {
      name: "governance proposal",
      deposit: LARGE_DEPOSIT,
      build: async (lucid: LucidEvolution, rewardAddress: string) =>
        lucid.newTx().propose({
          action: { type: "InfoAction" },
          returnAddress: rewardAddress,
          anchor: { url: "https://example.com", dataHash: "00".repeat(32) },
        }),
    },
  ])(
    "pays the $name deposit from a wallet of 1.5 ADA UTxOs",
    async ({ deposit, build, options }) => {
      const { lucid, emulator, rewardAddress } = await smallCoinWallet(10);

      const { signBuilder, inputs, netDeposit } = await completeAndMeasure(
        lucid,
        await build(lucid, rewardAddress),
        options,
      );

      expect(inputs).toBeGreaterThan(1);
      expect(netDeposit).toBe(deposit);
      await submit(emulator, signBuilder);
    },
  );

  test("pays the deposits of several certificates together", async () => {
    const { lucid, emulator, rewardAddress } = await smallCoinWallet(20);
    const tx = lucid.newTx().register.DRep(rewardAddress);
    tx.register.Stake(rewardAddress);
    for (let index = 0; index < 4; index++) {
      tx.register.Stake(otherRewardAddress());
    }

    const { signBuilder, inputs, netDeposit } = await completeAndMeasure(
      lucid,
      tx,
    );

    // 15 ADA in deposits plus the fee takes at least 11 of the 1.5 ADA UTxOs.
    expect(inputs).toBeGreaterThan(10);
    expect(netDeposit).toBe(LARGE_DEPOSIT + 5n * KEY_DEPOSIT);
    await submit(emulator, signBuilder);
  });

  test("selects for a payment of the same amount (control)", async () => {
    const { lucid, emulator } = await smallCoinWallet(10);

    const { signBuilder, inputs, netDeposit } = await completeAndMeasure(
      lucid,
      lucid.newTx().pay.ToAddress(sink(), { lovelace: KEY_DEPOSIT }),
    );

    expect(inputs).toBeGreaterThan(1);
    expect(netDeposit).toBe(0n);
    await submit(emulator, signBuilder);
  });
});

describe("coin selection counts refunds and withdrawals as inputs", () => {
  test("a deregistration refund pays toward the outputs", async () => {
    const fixture = await smallCoinWallet(10);
    const { lucid, emulator, rewardAddress } = fixture;
    await registerWalletStakeFromFunder(fixture);

    const { signBuilder, inputs, netDeposit } = await completeAndMeasure(
      lucid,
      lucid
        .newTx()
        .deregister.Stake(rewardAddress)
        .pay.ToAddress(sink(), { lovelace: KEY_DEPOSIT }),
    );

    // The 2 ADA refund covers the 2 ADA payment; one 1.5 ADA input covers
    // the fee and the change.
    expect(inputs).toBe(1);
    expect(netDeposit).toBe(-KEY_DEPOSIT);
    await submit(emulator, signBuilder);
  });

  test("a deregistration whose refund covers the fee still spends an input", async () => {
    const fixture = await smallCoinWallet(10);
    const { lucid, emulator, rewardAddress } = fixture;
    await registerWalletStakeFromFunder(fixture);

    const { signBuilder, inputs, netDeposit } = await completeAndMeasure(
      lucid,
      lucid.newTx().deregister.Stake(rewardAddress),
    );

    expect(inputs).toBe(1);
    expect(netDeposit).toBe(-KEY_DEPOSIT);
    await submit(emulator, signBuilder);
  });

  test("a reward withdrawal pays toward the outputs", async () => {
    const fixture = await smallCoinWallet(10);
    const { lucid, emulator, rewardAddress, stakeKey, funder, wallet } =
      fixture;
    const rewards = 10_000_000n;
    lucid.selectWallet.fromSeed(funder.seedPhrase);
    await submit(
      emulator,
      await lucid
        .newTx()
        .registerAndDelegate.ToPool(rewardAddress, poolId)
        .complete(),
      [stakeKey],
    );
    lucid.selectWallet.fromSeed(wallet.seedPhrase);
    emulator.distributeRewards(rewards);

    const { signBuilder, inputs, netDeposit } = await completeAndMeasure(
      lucid,
      lucid
        .newTx()
        .withdraw(rewardAddress, rewards)
        .pay.ToAddress(sink(), { lovelace: rewards }),
    );

    expect(inputs).toBe(1);
    expect(netDeposit).toBe(-rewards);
    await submit(emulator, signBuilder);
  });
});

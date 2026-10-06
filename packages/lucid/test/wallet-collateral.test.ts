import { describe, expect, test } from "vitest";
import {
  CML,
  Data,
  Emulator,
  generateEmulatorAccount,
  Lucid,
  LucidEvolution,
  PROTOCOL_PARAMETERS_DEFAULT,
  RedeemerBuilder,
  UTxO,
  utxoToCore,
  validatorToAddress,
  WalletApi,
} from "../src/index.js";
import { alwaysSucceedV3Script } from "./fixtures/scripts.js";

const outRef = (utxo: UTxO): string => `${utxo.txHash}#${utxo.outputIndex}`;

const collateralInputs = (tx: CML.Transaction): string[] => {
  const inputs = tx.body().collateral_inputs();
  return Array.from({ length: inputs?.len() ?? 0 }, (_, index) => {
    const input = inputs!.get(index);
    return `${input.transaction_id().to_hex()}#${input.index()}`;
  });
};

// A wallet with ADA-only UTxOs of 2, 5, 7 and 9 ADA plus change, and a script
// UTxO to spend.
const setup = async () => {
  const account = generateEmulatorAccount({ lovelace: 1_000_000_000n });
  const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
  const lucid = await Lucid(emulator, "Custom");
  lucid.selectWallet.fromSeed(account.seedPhrase);
  const address = await lucid.wallet().address();
  const scriptAddress = validatorToAddress("Custom", alwaysSucceedV3Script);
  const funded = await lucid
    .newTx()
    .pay.ToAddress(address, { lovelace: 2_000_000n })
    .pay.ToAddress(address, { lovelace: 5_000_000n })
    .pay.ToAddress(address, { lovelace: 7_000_000n })
    .pay.ToAddress(address, { lovelace: 9_000_000n })
    .pay.ToAddress(scriptAddress, { lovelace: 10_000_000n })
    .complete();
  await lucid.awaitTx(
    await (await funded.sign.withWallet().complete()).submit(),
  );
  const [scriptUtxo] = await lucid.utxosAt(scriptAddress);
  const walletUtxo = async (lovelace: bigint) =>
    (await lucid.wallet().getUtxos()).find(
      (utxo) => utxo.assets.lovelace === lovelace,
    )!;
  return { account, emulator, lucid, scriptUtxo, walletUtxo };
};

const spendScript = (
  lucid: LucidEvolution,
  scriptUtxo: UTxO,
  options?: { presetWalletInputs?: UTxO[] },
) =>
  lucid
    .newTx()
    .collectFrom([scriptUtxo], Data.void())
    .attach.SpendingValidator(alwaysSucceedV3Script)
    .complete(options);

const expectFromWalletUtxos = async (
  lucid: LucidEvolution,
  tx: CML.Transaction,
) => {
  const walletUtxos = (await lucid.wallet().getUtxos()).map(outRef);
  const collateral = collateralInputs(tx);
  expect(collateral.length).toBeGreaterThan(0);
  for (const input of collateral) expect(walletUtxos).toContain(input);
};

describe("wallet collateral candidates", () => {
  test("without getCollateral, collateral comes from the wallet's UTxOs", async () => {
    const { lucid, scriptUtxo } = await setup();
    const tx = (await spendScript(lucid, scriptUtxo)).toTransaction();
    await expectFromWalletUtxos(lucid, tx);
  });

  test("collateral is selected from getCollateral", async () => {
    const { lucid, scriptUtxo } = await setup();
    const wallet = lucid.wallet();
    // The UTxO that ordinary selection would not choose.
    const defaultCollateral = collateralInputs(
      (await spendScript(lucid, scriptUtxo)).toTransaction(),
    );
    const candidate = (await wallet.getUtxos()).find(
      (utxo) =>
        utxo.assets.lovelace >= 7_000_000n &&
        !defaultCollateral.includes(outRef(utxo)),
    )!;
    expect(candidate).toBeDefined();
    const amounts: (bigint | undefined)[] = [];
    wallet.getCollateral = async (amount) => {
      amounts.push(amount);
      return [candidate];
    };

    const completed = await spendScript(lucid, scriptUtxo);
    expect(amounts).toEqual([5_000_000n]);
    expect(collateralInputs(completed.toTransaction())).toEqual([
      outRef(candidate),
    ]);
    await lucid.awaitTx(
      await (await completed.sign.withWallet().complete()).submit(),
    );
  });

  test("an exactly 5 ADA collateral UTxO is used", async () => {
    const { lucid, scriptUtxo, walletUtxo } = await setup();
    const candidate = await walletUtxo(5_000_000n);
    lucid.wallet().getCollateral = async () => [candidate];

    const completed = await spendScript(lucid, scriptUtxo);
    const tx = completed.toTransaction();
    expect(collateralInputs(tx)).toEqual([outRef(candidate)]);
    expect(tx.body().collateral_return()).toBeUndefined();
    await lucid.awaitTx(
      await (await completed.sign.withWallet().complete()).submit(),
    );
  });

  test("getCollateral is called once when redeemers are rebuilt across attempts", async () => {
    const { lucid, scriptUtxo, walletUtxo } = await setup();
    const candidate = await walletUtxo(7_000_000n);
    let calls = 0;
    lucid.wallet().getCollateral = async () => {
      calls++;
      return [candidate];
    };
    const redeemer: RedeemerBuilder = {
      kind: "selected",
      inputs: [scriptUtxo],
      makeRedeemer: (indices) => Data.to(indices[0]),
    };

    const completed = await lucid
      .newTx()
      .collectFrom([scriptUtxo], redeemer)
      .attach.SpendingValidator(alwaysSucceedV3Script)
      .complete();
    expect(calls).toBe(1);
    expect(collateralInputs(completed.toTransaction())).toEqual([
      outRef(candidate),
    ]);
  });

  test("an empty getCollateral list falls back to the wallet's UTxOs", async () => {
    const { lucid, scriptUtxo } = await setup();
    lucid.wallet().getCollateral = async () => [];
    const tx = (await spendScript(lucid, scriptUtxo)).toTransaction();
    await expectFromWalletUtxos(lucid, tx);
  });

  test("candidates that cannot cover the collateral fall back to the wallet's UTxOs", async () => {
    const { lucid, scriptUtxo, walletUtxo } = await setup();
    const tooSmall = await walletUtxo(2_000_000n);
    lucid.wallet().getCollateral = async () => [tooSmall];
    const tx = (await spendScript(lucid, scriptUtxo)).toTransaction();
    expect(collateralInputs(tx)).not.toContain(outRef(tooSmall));
    await expectFromWalletUtxos(lucid, tx);
  });

  test("a getCollateral failure falls back to the wallet's UTxOs", async () => {
    const { lucid, scriptUtxo } = await setup();
    lucid.wallet().getCollateral = async () => {
      throw new Error("collateral unavailable");
    };
    const tx = (await spendScript(lucid, scriptUtxo)).toTransaction();
    await expectFromWalletUtxos(lucid, tx);
  });

  test("presetWalletInputs limits the candidates", async () => {
    const { lucid, scriptUtxo, walletUtxo } = await setup();
    const outside = await walletUtxo(9_000_000n);
    const preset = (await lucid.wallet().getUtxos()).filter(
      (utxo) => outRef(utxo) !== outRef(outside),
    );
    lucid.wallet().getCollateral = async () => [outside];

    const tx = (
      await spendScript(lucid, scriptUtxo, { presetWalletInputs: preset })
    ).toTransaction();
    const collateral = collateralInputs(tx);
    expect(collateral.length).toBeGreaterThan(0);
    for (const input of collateral) expect(preset.map(outRef)).toContain(input);
  });
});

// A CIP-30 wallet backed by the emulator, whose collateral setting points at
// a fixed UTxO regardless of pending transactions.
const makeCip30 = async (
  emulator: Emulator,
  seedPhrase: string,
  collateral: () => UTxO,
): Promise<WalletApi> => {
  const signer = await Lucid(emulator, "Custom");
  signer.selectWallet.fromSeed(seedPhrase);
  const address = await signer.wallet().address();
  const addressHex = CML.Address.from_bech32(address).to_hex();
  const api = {
    getNetworkId: async () => 0,
    getUtxos: async () =>
      (await emulator.getUtxos(address)).map((utxo) =>
        utxoToCore(utxo).to_cbor_hex(),
      ),
    getCollateral: async () => [utxoToCore(collateral()).to_cbor_hex()],
    getBalance: async () => "",
    getUsedAddresses: async () => [addressHex],
    getUnusedAddresses: async () => [],
    getChangeAddress: async () => addressHex,
    getRewardAddresses: async () => [],
    signTx: async (tx: string) =>
      (
        await signer.wallet().signTx(CML.Transaction.from_cbor_hex(tx))
      ).to_cbor_hex(),
    signData: async () => {
      throw new Error("not used");
    },
    submitTx: (tx: string) => emulator.submitTx(tx),
  };
  return api as unknown as WalletApi;
};

describe("CIP-30 wallet collateral", () => {
  test("a chained transaction does not reuse collateral spent by the pending transaction", async () => {
    const { account, emulator, lucid, scriptUtxo, walletUtxo } = await setup();
    const designated = await walletUtxo(9_000_000n);
    lucid.selectWallet.fromAPI(
      await makeCip30(emulator, account.seedPhrase, () => designated),
    );
    const address = await lucid.wallet().address();

    // The first transaction spends the wallet's designated collateral UTxO.
    const [walletAfterFirst, , first] = await lucid
      .newTx()
      .collectFrom([designated])
      .pay.ToAddress(address, { lovelace: 3_000_000n })
      .chain();
    lucid.overrideUTxOs(walletAfterFirst);

    const second = await spendScript(lucid, scriptUtxo);
    const collateral = collateralInputs(second.toTransaction());
    expect(collateral.length).toBeGreaterThan(0);
    expect(collateral).not.toContain(outRef(designated));
    for (const input of collateral)
      expect(walletAfterFirst.map(outRef)).toContain(input);

    await (await first.sign.withWallet().complete()).submit();
    emulator.awaitBlock(1);
    await lucid.awaitTx(
      await (await second.sign.withWallet().complete()).submit(),
    );
  });
});

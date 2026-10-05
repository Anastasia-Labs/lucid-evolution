import { describe, expect, test } from "vitest";
import {
  CML,
  Data,
  Emulator,
  generateEmulatorAccount,
  Lucid,
  LucidEvolution,
  PROTOCOL_PARAMETERS_DEFAULT,
  UTxO,
  validatorToAddress,
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

// A wallet with three ADA-only UTxOs and a script UTxO to spend.
const setup = async () => {
  const account = generateEmulatorAccount({ lovelace: 1_000_000_000n });
  const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
  const lucid = await Lucid(emulator, "Custom");
  lucid.selectWallet.fromSeed(account.seedPhrase);
  const address = await lucid.wallet().address();
  const scriptAddress = validatorToAddress("Custom", alwaysSucceedV3Script);
  const funded = await lucid
    .newTx()
    .pay.ToAddress(address, { lovelace: 7_000_000n })
    .pay.ToAddress(address, { lovelace: 9_000_000n })
    .pay.ToAddress(scriptAddress, { lovelace: 10_000_000n })
    .complete();
  await lucid.awaitTx(
    await (await funded.sign.withWallet().complete()).submit(),
  );
  const [scriptUtxo] = await lucid.utxosAt(scriptAddress);
  return { lucid, scriptUtxo };
};

const spendScript = (lucid: LucidEvolution, scriptUtxo: UTxO) =>
  lucid
    .newTx()
    .collectFrom([scriptUtxo], Data.void())
    .attach.SpendingValidator(alwaysSucceedV3Script)
    .complete();

describe("wallet collateral candidates", () => {
  test("without getCollateral, collateral comes from the wallet's UTxOs", async () => {
    const { lucid, scriptUtxo } = await setup();
    const walletUtxos = (await lucid.wallet().getUtxos()).map(outRef);
    const tx = (await spendScript(lucid, scriptUtxo)).toTransaction();
    const collateral = collateralInputs(tx);
    expect(collateral.length).toBeGreaterThan(0);
    for (const input of collateral) expect(walletUtxos).toContain(input);
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
    let calls = 0;
    wallet.getCollateral = async () => {
      calls++;
      return [candidate];
    };

    const completed = await spendScript(lucid, scriptUtxo);
    expect(calls).toBeGreaterThan(0);
    expect(collateralInputs(completed.toTransaction())).toEqual([
      outRef(candidate),
    ]);
    await lucid.awaitTx(
      await (await completed.sign.withWallet().complete()).submit(),
    );
  });

  test("an empty getCollateral list does not fall back to the wallet's UTxOs", async () => {
    const { lucid, scriptUtxo } = await setup();
    lucid.wallet().getCollateral = async () => [];
    await expect(spendScript(lucid, scriptUtxo)).rejects.toThrow(
      /does not have enough funds to cover the required \d+ Lovelace collateral/,
    );
  });

  test("a getCollateral failure fails completion", async () => {
    const { lucid, scriptUtxo } = await setup();
    lucid.wallet().getCollateral = async () => {
      throw new Error("collateral unavailable");
    };
    await expect(spendScript(lucid, scriptUtxo)).rejects.toThrow(
      /collateral unavailable/,
    );
  });
});

import { describe, expect, test } from "vitest";
import { Data } from "@lucid-evolution/plutus";
import {
  CML,
  Emulator,
  generateEmulatorAccount,
  Lucid,
  PROTOCOL_PARAMETERS_DEFAULT,
  validatorToAddress,
} from "../src/index.js";
import { alwaysSucceedV3Script } from "./fixtures/scripts.js";
import {
  applyBootstrapRedeemerExUnits,
  bootstrapRedeemerExUnits,
  redeemerWitnessKeys,
} from "../src/tx-builder/internal/CompleteTxBuilder.js";

const redeemerData = (value: bigint): CML.PlutusData =>
  CML.PlutusData.from_cbor_hex(Data.to(value));

const zeroExUnits = (): CML.ExUnits => CML.ExUnits.new(0n, 0n);

const legacyRedeemer = (
  tag: CML.RedeemerTag,
  index: bigint,
  value: bigint,
): CML.LegacyRedeemer =>
  CML.LegacyRedeemer.new(tag, index, redeemerData(value), zeroExUnits());

const redeemerVal = (value: bigint): CML.RedeemerVal =>
  CML.RedeemerVal.new(redeemerData(value), zeroExUnits());

type AppliedExUnits = {
  mem: bigint;
  steps: bigint;
};

const witnessLabels = (redeemers: CML.Redeemers): string[] =>
  redeemerWitnessKeys(redeemers).map(
    ({ tag, index }) => `${tag}:${index.toString()}`,
  );

describe("delayed redeemer bootstrap ex-units", () => {
  test("splits the protocol transaction budget across placeholder redeemers", () => {
    const exUnits = bootstrapRedeemerExUnits(2, 100_000_000n, 100_000_000_000n);

    expect(exUnits.map((exUnit) => exUnit.mem())).toEqual([
      50_000_000n,
      50_000_000n,
    ]);
    expect(exUnits.map((exUnit) => exUnit.steps())).toEqual([
      50_000_000_000n,
      50_000_000_000n,
    ]);
  });

  test("distributes remainder budgets exactly", () => {
    const exUnits = bootstrapRedeemerExUnits(3, 10n, 11n);

    expect(exUnits.map((exUnit) => exUnit.mem())).toEqual([4n, 3n, 3n]);
    expect(exUnits.map((exUnit) => exUnit.steps())).toEqual([4n, 4n, 3n]);
    expect(exUnits.reduce((total, exUnit) => total + exUnit.mem(), 0n)).toBe(
      10n,
    );
    expect(exUnits.reduce((total, exUnit) => total + exUnit.steps(), 0n)).toBe(
      11n,
    );
  });

  test("applies non-zero placeholders to legacy redeemers", () => {
    const list = CML.LegacyRedeemerList.new();
    list.add(legacyRedeemer(CML.RedeemerTag.Spend, 0n, 1n));
    list.add(legacyRedeemer(CML.RedeemerTag.Mint, 0n, 2n));
    const redeemers = CML.Redeemers.new_arr_legacy_redeemer(list);

    expect(witnessLabels(redeemers)).toEqual([
      `${CML.RedeemerTag.Spend}:0`,
      `${CML.RedeemerTag.Mint}:0`,
    ]);
    const applied: AppliedExUnits[] = [];
    applyBootstrapRedeemerExUnits(
      redeemers,
      {
        set_exunits: (_key, exUnits) => {
          applied.push({
            mem: exUnits.mem(),
            steps: exUnits.steps(),
          });
        },
      },
      14_000_000n,
      10_000_000_000n,
    );

    expect(applied).toEqual([
      { mem: 7_000_000n, steps: 5_000_000_000n },
      { mem: 7_000_000n, steps: 5_000_000_000n },
    ]);
  });

  test("applies non-zero placeholders to map redeemers", () => {
    const map = CML.MapRedeemerKeyToRedeemerVal.new();
    map.insert(CML.RedeemerKey.new(CML.RedeemerTag.Spend, 0n), redeemerVal(1n));
    map.insert(CML.RedeemerKey.new(CML.RedeemerTag.Mint, 0n), redeemerVal(2n));
    const redeemers = CML.Redeemers.new_map_redeemer_key_to_redeemer_val(map);

    expect(witnessLabels(redeemers)).toEqual([
      `${CML.RedeemerTag.Spend}:0`,
      `${CML.RedeemerTag.Mint}:0`,
    ]);
    const applied: AppliedExUnits[] = [];
    applyBootstrapRedeemerExUnits(
      redeemers,
      {
        set_exunits: (_key, exUnits) => {
          applied.push({
            mem: exUnits.mem(),
            steps: exUnits.steps(),
          });
        },
      },
      14_000_000n,
      10_000_000_000n,
    );

    expect(applied).toEqual([
      { mem: 7_000_000n, steps: 5_000_000_000n },
      { mem: 7_000_000n, steps: 5_000_000_000n },
    ]);
  });
});

describe("delayed redeemer bootstrap with setMinFee", () => {
  test("an explicitly funded fee is not charged the maximum transaction budget", async () => {
    const account = generateEmulatorAccount({ lovelace: 100_000_000n });
    const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
    const lucid = await Lucid(emulator, "Custom");
    lucid.selectWallet.fromSeed(account.seedPhrase);
    const address = await lucid.wallet().address();
    const scriptAddress = validatorToAddress("Custom", alwaysSucceedV3Script);
    const locked = await lucid
      .newTx()
      .pay.ToAddress(scriptAddress, { lovelace: 10_000_000n })
      .complete();
    await lucid.awaitTx(
      await (await locked.sign.withWallet().complete()).submit(),
    );
    const [scriptUtxo] = await lucid.utxosAt(scriptAddress);

    // The script input funds exactly a 9.5 ADA payment and a 0.5 ADA fee, so
    // there is no change output. A bootstrap fee for the maximum transaction
    // budget (over 1 ADA) is more than the input can pay.
    const fee = 500_000n;
    const { maxTxExMem, maxTxExSteps, priceMem, priceStep } =
      PROTOCOL_PARAMETERS_DEFAULT;
    expect(
      Math.ceil(
        Number(maxTxExMem) * priceMem + Number(maxTxExSteps) * priceStep,
      ),
    ).toBeGreaterThan(1_000_000);
    let callbacks = 0;
    const completed = await lucid
      .newTx()
      .collectFrom([scriptUtxo], () => {
        callbacks++;
        return Data.void();
      })
      .attach.SpendingValidator(alwaysSucceedV3Script)
      .pay.ToAddress(address, { lovelace: 9_500_000n })
      .setMinFee(fee)
      .complete({ coinSelection: false });

    const tx = completed.toTransaction();
    expect(callbacks).toBeGreaterThan(0);
    expect(tx.body().fee()).toBe(fee);
    expect(tx.body().inputs().len()).toBe(1);
    expect(tx.body().outputs().len()).toBe(1);
    const redeemers = tx.witness_set().redeemers()!.to_flat_format();
    expect(redeemers.len()).toBe(1);
    // The final redeemer carries real evaluated ex-units, not the bootstrap.
    expect(redeemers.get(0).ex_units().mem()).toBeGreaterThan(0n);
    expect(redeemers.get(0).ex_units().steps()).toBeGreaterThan(0n);
    expect(redeemers.get(0).ex_units().mem()).toBeLessThan(maxTxExMem);

    await lucid.awaitTx(
      await (await completed.sign.withWallet().complete()).submit(),
    );
    expect(await lucid.utxosAt(scriptAddress)).toHaveLength(0);
  });
});

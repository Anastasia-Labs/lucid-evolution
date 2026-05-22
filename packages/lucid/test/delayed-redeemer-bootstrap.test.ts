import { describe, expect, test } from "vitest";
import { Data } from "@lucid-evolution/plutus";
import { CML } from "../src/index.js";
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

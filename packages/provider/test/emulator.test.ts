import { ProtocolParameters } from "@evolution-sdk/core-types";
import { assert, describe, test } from "vitest";
import { PROTOCOL_PARAMETERS_DEFAULT } from "@evolution-sdk/utils";
import { Emulator, generateEmulatorAccount } from "../src";
import { Effect } from "effect";
import * as PreprodConstants from "./preprod-constants";

export const EMULATOR_ACCOUNT = generateEmulatorAccount({
  lovelace: 80000000000n,
});

export const emulator = await Effect.gen(function* () {
  return new Emulator([EMULATOR_ACCOUNT]);
}).pipe(Effect.runPromise);

describe.sequential("Emulator", () => {
  test("Get Protocol Parameters", async () => {
    const pp: ProtocolParameters = await emulator.getProtocolParameters();
    assert.deepEqual(pp, PROTOCOL_PARAMETERS_DEFAULT);
  });

  test("Correct Start Balance", async () => {
    const utxos = await emulator.getUtxos(EMULATOR_ACCOUNT.address);
    const lovelace = utxos.reduce(
      (amount: any, utxo: any) => amount + utxo.assets.lovelace,
      0n,
    );
    assert.equal(lovelace, EMULATOR_ACCOUNT.assets.lovelace);
  });

  test("evaluate tx", async () => {
    const redeemers = await emulator.evaluateTx(
      PreprodConstants.evalSample1.transaction,
      PreprodConstants.evalSample1.utxos,
    );
    assert.deepStrictEqual(
      redeemers,
      PreprodConstants.evalSample1.redeemersExUnits,
    );
  });

  test("submit tx", async () => {
    emulator.ledger = {
      ...emulator.ledger,
      "442575f1e4becbcaef8b20e61ee8b130cb02d1959a4dbe43dccd327a62d9eb180": {
        utxo: {
          txHash:
            "442575f1e4becbcaef8b20e61ee8b130cb02d1959a4dbe43dccd327a62d9eb18",
          outputIndex: 0,
          assets: { lovelace: 55000000n },
          address:
            "addr_test1wza9ek9k6fqddswte7ytf6r7uayyka9rat3rkm0mgdw8wysgv773j",
          datumHash: undefined,
          datum:
            "d87a84d87981d87982d87981581c983ed9af5d9f13d0cb5e64ab3a1c00140f663518e78aa8c8ca09e042d87981d87981d87981581c6d2a842a4ded1909f71835598d7d34dd55201d62dc2a88078a7a8f441a000f424000d87984581ce16c2dc8ae937e8d3790c7fd7168d7b994621ba14ca11415f39fed72434d494ed87a801a002625a0",
          scriptRef: undefined,
        },
        spent: false,
      },
      "442575f1e4becbcaef8b20e61ee8b130cb02d1959a4dbe43dccd327a62d9eb181": {
        utxo: {
          txHash:
            "442575f1e4becbcaef8b20e61ee8b130cb02d1959a4dbe43dccd327a62d9eb18",
          outputIndex: 1,
          assets: { lovelace: 144826975n },
          address:
            "addr_test1qzvrakd0tk0385xttej2kwsuqq2q7e34rrnc42xgegy7qsnd92zz5n0dryylwxp4txxh6dxa25sp6cku92yq0zn63azqya0vgs",
          datumHash: undefined,
          datum: undefined,
          scriptRef: undefined,
        },
        spent: false,
      },
    };
    const txHash = await emulator.submitTx(PreprodConstants.submitCbor);
    assert.equal(
      txHash,
      "edfc1d75074d741f5b7c97e8ddb81de956a43b6fca8664dff5722bb1d136ff3f",
    );
  });
});

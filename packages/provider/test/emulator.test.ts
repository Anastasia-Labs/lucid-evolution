import { ProtocolParameters } from "@lucid-evolution/core-types";
import { assert, describe, test } from "vitest";
import { PROTOCOL_PARAMETERS_DEFAULT } from "@lucid-evolution/utils";
import { Emulator, generateEmulatorAccount } from "../src";
import { Effect } from "effect";
import * as PreprodConstants from "./preprod-constants.js";

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
      PreprodConstants.cbor,
      PreprodConstants.utxos,
    );
    assert.deepStrictEqual(redeemers, PreprodConstants.redeemersExUnits);
  });
});

import { ProtocolParameters } from "@lucid-evolution/core-types";
import { assert, describe, test } from "vitest";
import { PROTOCOL_PARAMETERS_DEFAULT } from "@lucid-evolution/utils";
import { emulator, EMULATOR_ACCOUNT } from "./service";

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
});

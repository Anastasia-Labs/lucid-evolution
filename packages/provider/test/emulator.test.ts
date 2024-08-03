import { ProtocolParameters } from "@lucid-evolution/core-types";
import { assert, describe, expect, test } from "vitest";
import {
  mintingPolicyToId,
  PROTOCOL_PARAMETERS_DEFAULT,
  unixTimeToSlot,
  getAddressDetails,
  scriptFromNative,
} from "@lucid-evolution/utils";
import { emulator, EMULATOR_ACCOUNT, User } from "./service.js";
import { Effect, Layer, pipe } from "effect";
import { fromText } from "@lucid-evolution/core-utils";
import { handleSignSubmitWithoutValidation } from "../../lucid/test/specs/utils.js";

const mint = Effect.gen(function* () {
  const { user, emulator } = yield* User;
  const { paymentCredential } = getAddressDetails(EMULATOR_ACCOUNT.address);
  const mintingPolicy = scriptFromNative({
    type: "all",
    scripts: [
      {
        type: "before",
        slot: unixTimeToSlot("Custom", emulator.now() + 60000),
      },
      { type: "sig", keyHash: paymentCredential?.hash! },
    ],
  });
  console.log("mintingPolicy :>> ", mintingPolicy);

  const policyId = mintingPolicyToId(mintingPolicy);
  const signBuilder = yield* user
    .newTx()
    .mintAssets({
      [policyId + fromText("Wow")]: 123n,
    })
    .validTo(emulator.now() + 30000)
    .attach.MintingPolicy(mintingPolicy)
    .completeProgram();

  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmitWithoutValidation));

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

  test("Wait block", async () => {
    const program = pipe(mint, Effect.provide(Layer.mergeAll(User.layer)));
    const exit = await Effect.runPromiseExit(program);
    expect(exit._tag).toBe("Success");
    emulator.awaitBlock(4);
    const exit1 = await Effect.runPromiseExit(program);
    expect(exit1._tag).toBe("Failure");
  });
});

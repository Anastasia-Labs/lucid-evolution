import {
  fromText,
  mintingPolicyToId,
  nativeJSFromJson,
  paymentCredentialOf,
  unixTimeToSlot,
} from "../src/index.js";
import { test } from "vitest";
import { Effect, Logger, LogLevel, pipe, Schedule } from "effect";
import { User } from "./services.js";
const mkMintinPolicy = (time: number, address: string) => {
  return nativeJSFromJson({
    type: "all",
    scripts: [
      {
        type: "sig",
        keyHash: paymentCredentialOf(address).hash,
      },
      {
        type: "before",
        slot: unixTimeToSlot("Preprod", time + Date.now()),
      },
    ],
  });
};

export const txSubmit = Effect.gen(function* ($) {
  const { user } = yield* User;
  const utxo = yield* Effect.tryPromise(() => user.wallet().getUtxos());
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(9_000_000, addr);
  const policy = mintingPolicyToId(mint);

  const signBuilder = yield* user
    .newTx()
    .readFrom(utxo)
    .pay.ToAddress(
      "addr_test1qp4cgm42esrud5njskhsr6uc28s6ljah0phsdqe7qmh3rfuyjgq5wwsca5camufxavmtnm8f6ywga3de3jkgmkwzma4sqv284l",
      // { lovelace: 2_000_000n },
      { [policy + fromText("MyMintedToken")]: 1n },
    )
    .pay.ToAddressWithData(
      "addr_test1qp4cgm42esrud5njskhsr6uc28s6ljah0phsdqe7qmh3rfuyjgq5wwsca5camufxavmtnm8f6ywga3de3jkgmkwzma4sqv284l",
      {
        kind: "inline",
        value: "d87980",
      },
      // { [policy + fromText("MyMintedToken")]: 1n }
    )
    .mintAssets({ [policy + fromText("MyMintedToken")]: 1n })
    .validTo(Date.now() + 900000)
    .attach.MintingPolicy(mint)
    .complete()
    .program();
  const signed = yield* signBuilder.sign.withWallet().complete().program();
  const txHash = yield* signed.submit().program();
  yield* Effect.sleep("10 seconds");
  yield* Effect.logDebug(txHash);
}).pipe(
  Effect.tapError(Effect.logDebug),
  Effect.retry(
    pipe(Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4))),
  ),
  Logger.withMinimumLogLevel(LogLevel.Debug),
);

test("tx submit ", async () => {
  // const program = pipe(txSubmit, Effect.provide(Layer.mergeAll(User.layer)));
  // const exit = await Effect.runPromiseExit(program);
  // expect(exit._tag).toBe("Success");
});

import {
  fromText,
  mintingPolicyToId,
  paymentCredentialOf,
  scriptFromNative,
  unixTimeToSlot,
} from "../src/index.js";
import { expect, test } from "vitest";
import { Effect, Layer, Logger, LogLevel, pipe, Schedule } from "effect";
import { User } from "./specs/services.js";
const mkMintinPolicy = (time: number, address: string) => {
  return scriptFromNative({
    type: "all",
    scripts: [
      {
        type: "sig",
        keyHash: paymentCredentialOf(address).hash,
      },
      // {
      //   type: "before",
      //   slot: unixTimeToSlot("Preprod", time + Date.now()),
      // },
    ],
  });
};
export const txburn = Effect.gen(function* ($) {
  const { user } = yield* User;
  const utxo = yield* Effect.tryPromise(() => user.wallet().getUtxos());
  console.log(utxo);
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(9_000_000, addr);
  const policy = mintingPolicyToId(mint);

  const signBuilder = yield* user
    .newTx()
    // .readFrom(utxo)
    .pay.ToAddress(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
      { lovelace: 2_000_000n },
      // {
      //   "eb8b660cf939281c277264389c4086e7c79baf78e08d0c48668420ab4d794d696e746564546f6b656e":
      //     1n,
      // }
      // { [policy + fromText("BurnableToken")]: -1n }
    )
    // .pay.ToAddressWithData(
    //   "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
    //   {
    //     kind: "inline",
    //     value: "d87980",
    //   },
    //   { lovelace: 10_000_000n }
    //   // { [policy + fromText("MyMintedToken")]: 1n }
    // )
    .mintAssets({ [policy + fromText("BurnableToken")]: -1n })
    .validTo(Date.now() + 900000)
    .attach.MintingPolicy(mint)
    .completeProgram();
  const signed = yield* signBuilder.sign.withWallet().completeProgram();
  const txHash = yield* signed.submitProgram();
  yield* Effect.sleep("10 seconds");
  yield* Effect.logDebug(txHash);
}).pipe(
  Effect.tapError(Effect.logDebug),
  Effect.retry(
    pipe(Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4))),
  ),
  Logger.withMinimumLogLevel(LogLevel.Debug),
);

export const txSubmit = Effect.gen(function* ($) {
  const { user } = yield* User;
  const utxo = yield* Effect.tryPromise(() => user.wallet().getUtxos());
  console.log(utxo);
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(9_000_000, addr);
  const policy = mintingPolicyToId(mint);

  const signBuilder = yield* user
    .newTx()
    // .readFrom(utxo)
    .pay.ToAddress(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
      // { lovelace: 2_000_000n }
      // {
      //   "eb8b660cf939281c277264389c4086e7c79baf78e08d0c48668420ab4d794d696e746564546f6b656e":
      //     1n,
      // }
      { [policy + fromText("BurnableToken")]: 1n },
    )
    // .pay.ToAddressWithData(
    //   "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
    //   {
    //     kind: "inline",
    //     value: "d87980",
    //   },
    //   { lovelace: 10_000_000n }
    //   // { [policy + fromText("MyMintedToken")]: 1n }
    // )
    .mintAssets({
      [policy + fromText("BurnableToken")]: 1n,
      [policy + fromText("BurnableToken2")]: 1n,
    })
    .validTo(Date.now() + 900000)
    .attach.MintingPolicy(mint)
    .completeProgram();
  const signed = yield* signBuilder.sign.withWallet().completeProgram();
  const txHash = yield* signed.submitProgram();
  yield* Effect.sleep("10 seconds");
  yield* Effect.logDebug(txHash);
}).pipe(
  Effect.tapError(Effect.logDebug),
  Effect.retry(
    pipe(Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4))),
  ),
  Logger.withMinimumLogLevel(LogLevel.Debug),
);

test.skip("Mint Token", async () => {
  const program = pipe(txSubmit, Effect.provide(Layer.mergeAll(User.layer)));
  const exit = await Effect.runPromiseExit(program);
  expect(exit._tag).toBe("Success");
});

test.skip("Burn Token", async () => {
  const program = pipe(txburn, Effect.provide(Layer.mergeAll(User.layer)));
  const exit = await Effect.runPromiseExit(program);
  expect(exit._tag).toBe("Success");
});

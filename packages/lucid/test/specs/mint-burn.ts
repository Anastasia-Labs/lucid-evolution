import {
  fromText,
  mintingPolicyToId,
  nativeJSFromJson,
  paymentCredentialOf,
  selectUTxOs,
} from "../../src/index.js";
import { Effect } from "effect";
import { User } from "./services.js";
import { handleSignSubmit, withLogRetry } from "./utils.js";

const mkMintinPolicy = (time: number, address: string) => {
  return nativeJSFromJson({
    type: "all",
    scripts: [
      {
        type: "sig",
        keyHash: paymentCredentialOf(address).hash,
      },
    ],
  });
};
export const mint = Effect.gen(function* () {
  const { user } = yield* User;
  const utxo = yield* Effect.tryPromise(() => user.wallet().getUtxos());
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(9_000_000, addr);
  const policy = mintingPolicyToId(mint);

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddress(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
      { [policy + fromText("BurnableToken")]: 1n },
    )
    .mintAssets({
      [policy + fromText("BurnableToken")]: 1n,
      [policy + fromText("BurnableToken2")]: 1n,
    })
    .validTo(Date.now() + 900000)
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const burn = Effect.gen(function* () {
  const { user } = yield* User;
  const utxo = yield* Effect.tryPromise(() => user.wallet().getUtxos());
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(9_000_000, addr);
  const policy = mintingPolicyToId(mint);

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddress(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
      { lovelace: 2_000_000n },
    )
    .mintAssets({ [policy + fromText("BurnableToken")]: -1n })
    .validTo(Date.now() + 900000)
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const mintburn = Effect.gen(function* () {
  const { user } = yield* User;
  const utxo = yield* Effect.tryPromise(() => user.wallet().getUtxos());
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(9_000_000, addr);
  const policy = mintingPolicyToId(mint);

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddress(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
      { [policy + fromText("BurnableToken")]: 1n },
    )
    .mintAssets({
      [policy + fromText("BurnableToken")]: 1n,
      [policy + fromText("BurnableToken2")]: -1n,
    })
    .validTo(Date.now() + 900000)
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const mint2 = Effect.gen(function* () {
  const { user } = yield* User;
  const utxo = yield* Effect.tryPromise(() => user.wallet().getUtxos());
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(9_000_000, addr);
  const policy = mintingPolicyToId(mint);

  const signBuilder = yield* user
    .newTx()
    .mintAssets({
      [policy + fromText("BurnableToken")]: 1n,
      [policy + fromText("BurnableToken2")]: 1n,
    })
    .validTo(Date.now() + 900000)
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const burn2 = Effect.gen(function* () {
  const { user } = yield* User;
  const utxo = yield* Effect.tryPromise(() => user.wallet().getUtxos());
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(9_000_000, addr);
  const policy = mintingPolicyToId(mint);

  const signBuilder = yield* user
    .newTx()
    .mintAssets({
      [policy + fromText("BurnableToken")]: -1n,
      [policy + fromText("BurnableToken2")]: -1n,
    })
    .validTo(Date.now() + 900000)
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const pay = Effect.gen(function* () {
  const { user } = yield* User;
  const utxo = yield* Effect.tryPromise(() => user.wallet().getUtxos());
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(9_000_000, addr);
  const policy = mintingPolicyToId(mint);

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddress(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
      { lovelace: 2_000_000n },
    )
    .validTo(Date.now() + 900000)
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const pay2 = Effect.gen(function* () {
  const { user } = yield* User;
  const utxos = yield* Effect.tryPromise(() => user.wallet().getUtxos());
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(9_000_000, addr);
  const policy = mintingPolicyToId(mint);

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddress(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
      { [policy + fromText("BurnableToken2")]: 1n },
    )
    .validTo(Date.now() + 900000)
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const pay3 = Effect.gen(function* () {
  const { user } = yield* User;
  const utxos = yield* Effect.tryPromise(() => user.wallet().getUtxos());
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(9_000_000, addr);
  const policy = mintingPolicyToId(mint);

  const collecAssets = {
    ["1c05caed08ddd5c9f233f4cb497eeb6e5f685e8e7b842b08897d1dfe4d794d696e746564546f6b656e"]:
      1n,
    ["501b8b9dce8d7c1247a14bb69d416c621267daa72ebd6c81942931924d794d696e746564546f6b656e"]:
      1n,
    ["665d4dbea856001b880d5749e94384cc486d8c4ee99540d2f65d15704d794d696e746564546f6b656e"]:
      1n,
  };

  const signBuilder = yield* user
    .newTx()
    .collectFrom(selectUTxOs(utxos, collecAssets))
    .pay.ToAddress(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
      { [policy + fromText("BurnableToken2")]: 1n },
    )
    .pay.ToAddress(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
      {
        ["665d4dbea856001b880d5749e94384cc486d8c4ee99540d2f65d15704d794d696e746564546f6b656e"]:
          1n,
      },
    )
    .validTo(Date.now() + 900000)
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

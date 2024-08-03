import {
  Constr,
  Data,
  fromText,
  getAddressDetails,
  mintingPolicyToId,
  paymentCredentialOf,
  scriptFromNative,
  selectUTxOs,
  unixTimeToSlot,
} from "../../src/index.js";
import { Effect } from "effect";
import { MintContract, User } from "./services.js";
import { handleSignSubmit, handleSubmit, withLogRetry } from "./utils.js";

const maxHexToken =
  "accbfb633f637e3bb1abee40c9539d1effd742cd2716b3b1db9de3aaf3f37794";
const mkMintinPolicy = (time: number, address: string) => {
  return scriptFromNative({
    type: "all",
    scripts: [
      {
        type: "sig",
        keyHash: paymentCredentialOf(address).hash,
      },
    ],
  });
};
const mkSlotRangeMintinPolicy = (duration, address: string) => {
  return scriptFromNative({
    type: "all",
    scripts: [
      {
        type: "before",
        slot: unixTimeToSlot("Preprod", Date.now() + duration),
      },
      {
        type: "sig",
        keyHash: paymentCredentialOf(address).hash,
      },
    ],
  });
};
export const mint = Effect.gen(function* () {
  const { user } = yield* User;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const nativeMint = mkMintinPolicy(9_000_000, addr);
  const nativePolicyId = mintingPolicyToId(nativeMint);
  const plutusMint = yield* MintContract;
  const mintRedeemer = Data.to(new Constr(0, [[]]));

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddress(addr, {
      [nativePolicyId + fromText("BurnableToken")]: 1n,
      [nativePolicyId + maxHexToken]: 1n,
    })
    .mintAssets({
      [nativePolicyId + fromText("BurnableToken")]: 1n,
      [nativePolicyId + fromText("BurnableToken2")]: 1n,
      [nativePolicyId + maxHexToken]: 1n,
    })
    .mintAssets(
      {
        [plutusMint.policyId + fromText("BurnableTokenPlutus")]: 1n,
        [plutusMint.policyId + maxHexToken]: 1n,
      },
      mintRedeemer,
    )
    .validTo(Date.now() + 900000)
    .attach.MintingPolicy(nativeMint)
    .attach.MintingPolicy(plutusMint.mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const burn = Effect.gen(function* () {
  const { user } = yield* User;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const nativeMint = mkMintinPolicy(9_000_000, addr);
  const nativePolicyId = mintingPolicyToId(nativeMint);
  const plutusMint = yield* MintContract;
  const mintRedeemer = Data.to(new Constr(0, [[]]));

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddress(addr, { lovelace: 2_000_000n })
    .mintAssets({
      [nativePolicyId + fromText("BurnableToken")]: -1n,
      [nativePolicyId + maxHexToken]: -1n,
    })
    .mintAssets(
      {
        [plutusMint.policyId + fromText("BurnableTokenPlutus")]: -1n,
        [plutusMint.policyId + maxHexToken]: -1n,
      },
      mintRedeemer,
    )
    .validTo(Date.now() + 900000)
    .attach.MintingPolicy(nativeMint)
    .attach.MintingPolicy(plutusMint.mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const mintburn = Effect.gen(function* () {
  const { user } = yield* User;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(9_000_000, addr);
  const policy = mintingPolicyToId(mint);

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddress(addr, { [policy + fromText("BurnableToken")]: 1n })
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
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(9_000_000, addr);

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddress(addr, { lovelace: 2_000_000n })
    .validTo(Date.now() + 900000)
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const pay2 = Effect.gen(function* () {
  const { user } = yield* User;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(9_000_000, addr);
  const policy = mintingPolicyToId(mint);

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddress(addr, { [policy + fromText("BurnableToken2")]: 1n })
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
    .pay.ToAddress(addr, { [policy + fromText("BurnableToken2")]: 1n })
    .pay.ToAddress(addr, {
      ["665d4dbea856001b880d5749e94384cc486d8c4ee99540d2f65d15704d794d696e746564546f6b656e"]:
        1n,
    })
    .validTo(Date.now() + 900000)
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const payWithData = Effect.gen(function* () {
  const { user } = yield* User;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(9_000_000, addr);
  const policy = mintingPolicyToId(mint);
  const datum = Data.to(123n);

  const signBuilder = yield* user
    .newTx()
    .mintAssets({
      [policy + fromText("BurnableToken2")]: 1n,
    })
    .pay.ToAddressWithData(
      addr,
      { kind: "inline", value: datum },
      { [policy + fromText("BurnableToken2")]: 1n },
    )
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const payWithoutVkeyWitness = Effect.gen(function* () {
  const { user } = yield* User;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const utxo = yield* Effect.tryPromise(() => user.wallet().getUtxos());
  const mint = mkMintinPolicy(9_000_000, addr);
  const policy = mintingPolicyToId(mint);
  const datum = Data.to(123n);

  const signBuilder = yield* user
    .newTx()
    .mintAssets({
      [policy + fromText("BurnableToken2")]: 1n,
    })
    .pay.ToAddressWithData(
      addr,
      { kind: "inline", value: datum },
      { [policy + fromText("BurnableToken2")]: 1n },
    )
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSubmit));

export const mintInSlotRange = Effect.gen(function* () {
  const { user } = yield* User;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkSlotRangeMintinPolicy(60_000, addr);
  const policy = mintingPolicyToId(mint);
  const datum = Data.to(123n);

  const signBuilder = yield* user
    .newTx()
    .mintAssets({
      [policy + fromText("BurnableToken2")]: 1n,
    })
    .pay.ToAddressWithData(
      addr,
      { kind: "inline", value: datum },
      { [policy + fromText("BurnableToken2")]: 1n },
    )
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSubmit));

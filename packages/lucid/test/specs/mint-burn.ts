import {
  Constr,
  Data,
  fromText,
  mintingPolicyToId,
  Network,
  networkToId,
  paymentCredentialOf,
  scriptFromNative,
  selectUTxOs,
  unixTimeToSlot,
} from "../../src/index.js";
import { Effect, pipe } from "effect";
import { MintContract, NETWORK, NetworkConfig, User } from "./services.js";
import { handleSignSubmit, handleSubmit, withLogRetry } from "./utils.js";

const maxHexToken =
  "accbfb633f637e3bb1abee40c9539d1effd742cd2716b3b1db9de3aaf3f37794";
const mkMintinPolicy = (address: string) => {
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
const mkSlotRangeMintinPolicy = (
  duration: number,
  address: string,
  network: Network,
) => {
  return scriptFromNative({
    type: "all",
    scripts: [
      {
        type: "before",
        slot: unixTimeToSlot(network, Date.now() + duration),
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
  const nativeMint = mkMintinPolicy(addr);
  const nativePolicyId = mintingPolicyToId(nativeMint);
  const plutusMint = yield* MintContract;
  const mintRedeemer = Data.to(new Constr(0, [[]]));
  const signBuilder = yield* user
    .newTx()
    .pay.ToAddressWithData(
      addr,
      { kind: "inline", value: Data.void() },
      {
        [nativePolicyId + fromText("BurnableToken")]: 1n,
        [nativePolicyId + maxHexToken]: 1n,
      },
      plutusMint.mint,
    )
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
    .attach.MintingPolicy(nativeMint)
    .attach.MintingPolicy(plutusMint.mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const burn = Effect.gen(function* () {
  const { user } = yield* User;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const walletUTxOs = yield* Effect.promise(() => user.wallet().getUtxos());
  const nativeMint = mkMintinPolicy(addr);
  const nativePolicyId = mintingPolicyToId(nativeMint);
  const burnableToken = nativePolicyId + fromText("BurnableToken");
  const plutusMint = yield* MintContract;
  const utxoWithRefScript = walletUTxOs.filter((utxo) => {
    return (
      utxo.assets[burnableToken] == 1n &&
      utxo.scriptRef?.script == plutusMint.mint.script
    );
  });
  const burnAssets = {
    [plutusMint.policyId + fromText("BurnableTokenPlutus")]: -1n,
    [plutusMint.policyId + maxHexToken]: -1n,
  };

  const mintRedeemer = Data.to(new Constr(0, [[]]));
  const signBuilder = yield* user
    .newTx()
    .collectFrom(utxoWithRefScript)
    .collectFrom(selectUTxOs(walletUTxOs, burnAssets))
    .pay.ToAddress(addr, { lovelace: 2_000_000n })
    .mintAssets({
      [burnableToken]: -1n,
      [nativePolicyId + maxHexToken]: -1n,
    })
    .mintAssets(burnAssets, mintRedeemer)
    .attach.MintingPolicy(nativeMint)
    .attach.MintingPolicy(plutusMint.mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const mintburn = Effect.gen(function* () {
  const { user } = yield* User;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(addr);
  const policy = mintingPolicyToId(mint);

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddress(addr, { [policy + fromText("BurnableToken")]: 1n })
    .mintAssets({
      [policy + fromText("BurnableToken")]: 1n,
      [policy + fromText("BurnableToken2")]: -1n,
    })
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const mint2 = Effect.gen(function* () {
  const { user } = yield* User;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(addr);
  const policy = mintingPolicyToId(mint);

  const signBuilder = yield* user
    .newTx()
    .mintAssets({
      [policy + fromText("BurnableToken")]: 1n,
      [policy + fromText("BurnableToken2")]: 1n,
    })
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const burn2 = Effect.gen(function* () {
  const { user } = yield* User;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(addr);
  const policy = mintingPolicyToId(mint);

  const signBuilder = yield* user
    .newTx()
    .mintAssets({
      [policy + fromText("BurnableToken")]: -1n,
      [policy + fromText("BurnableToken2")]: -1n,
    })
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const pay = Effect.gen(function* () {
  const { user } = yield* User;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(addr);
  const policy = mintingPolicyToId(mint);
  const datum = Data.to(123n);

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddress(addr, { lovelace: 500_000n })
    .pay.ToAddress(addr, { lovelace: 2_000_000n })
    .pay.ToAddress(addr, { [policy + fromText("BurnableToken2")]: 1n })
    .pay.ToAddressWithData(
      addr,
      { kind: "inline", value: datum },
      { lovelace: 500_000n, [policy + fromText("BurnableToken2")]: 1n },
    )
    .pay.ToAddressWithData(
      addr,
      { kind: "inline", value: datum },
      { lovelace: 3_000_000n, [policy + fromText("BurnableToken2")]: 1n },
    )
    .pay.ToAddressWithData(
      addr,
      { kind: "inline", value: datum },
      { [policy + fromText("BurnableToken2")]: 1n },
    )
    .pay.ToAddressWithData(addr, { kind: "inline", value: datum }, {})
    .pay.ToAddressWithData(addr, { kind: "inline", value: datum }, undefined)
    .mintAssets({ [policy + fromText("BurnableToken2")]: 3n })
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const mintInSlotRange = Effect.gen(function* () {
  const { user } = yield* User;
  const networkConfig = yield* NetworkConfig;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkSlotRangeMintinPolicy(60_000, addr, networkConfig.NETWORK);
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

export const mintAndWithdraw = Effect.gen(function* () {
  const { user } = yield* User;
  const networkConfig = yield* NetworkConfig;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const mint = mkMintinPolicy(addr);
  const policy = mintingPolicyToId(mint);
  const datum = Data.to(123n);
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .mintAssets({
      [policy + fromText("multipurpose")]: 1n,
    })
    // .withdraw(rewardAddress, 0n)
    .pay.ToAddressWithData(
      addr,
      { kind: "inline", value: datum },
      { [policy + fromText("multipurpose")]: 1n },
    )
    .attach.MintingPolicy(mint)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSubmit));

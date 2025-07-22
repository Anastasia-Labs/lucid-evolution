import { fromText } from "@evolution-sdk/core-utils";
import {
  getAddressDetails,
  scriptFromNative,
  unixTimeToSlot,
  mintingPolicyToId,
} from "@evolution-sdk/utils";
import { Effect, pipe } from "effect";
import { HelloContract, NetworkConfig, User } from "./services";
import {
  handleSignSubmit,
  handleSignSubmitWithoutValidation,
  withLogRetry,
} from "./utils";
import { Constr, Data } from "@evolution-sdk/plutus";
import { DatumType } from "./hello-params";

export const composeMintTx = Effect.gen(function* ($) {
  const { user } = yield* User;
  const networkConfig = yield* NetworkConfig;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const txCompA = user
    .newTx()
    .pay.ToAddressWithData(addr, { kind: "inline", value: Data.to(0n) }, {});

  const { paymentCredential } = getAddressDetails(
    yield* Effect.promise(() => user.wallet().address()),
  );
  const mintingPolicy = scriptFromNative({
    type: "all",
    scripts: [
      {
        type: "before",
        slot: unixTimeToSlot(networkConfig.NETWORK, Date.now() + 60000),
      },
      { type: "sig", keyHash: paymentCredential?.hash! },
    ],
  });

  const policyId = mintingPolicyToId(mintingPolicy);
  const txCompB = user
    .newTx()
    .mintAssets({
      [policyId + fromText("Wow")]: 123n,
    })
    .validTo(Date.now() + 30000)
    .attach.MintingPolicy(mintingPolicy);
  const tx = user.newTx().compose(txCompA).compose(txCompB);
  const signBuilder = yield* tx.completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmitWithoutValidation), withLogRetry);

export const multiTxCompose = Effect.gen(function* ($) {
  const { user } = yield* User;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const txCompA = user
    .newTx()
    .pay.ToAddressWithData(addr, { kind: "inline", value: Data.to(0n) }, {});
  const txCompB = user
    .newTx()
    .pay.ToAddressWithData(addr, { kind: "inline", value: Data.to(10n) }, {})
    .compose(
      user
        .newTx()
        .pay.ToAddressWithData(addr, { kind: "inline", value: Data.to(1n) }, {})
        .compose(
          user
            .newTx()
            .pay.ToAddressWithData(
              addr,
              { kind: "inline", value: Data.to(2n) },
              {},
            ),
        ),
    );
  const tx = user
    .newTx()
    .compose(txCompA)
    .compose(txCompB)
    .pay.ToAddressWithData(addr, { kind: "inline", value: Data.to(3n) }, {});
  const signBuilder = yield* tx.completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmitWithoutValidation), withLogRetry);

export const composeMintAndRegisterStake = Effect.gen(function* ($) {
  const { user } = yield* User;
  const networkConfig = yield* NetworkConfig;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const txCompA = user
    .newTx()
    .pay.ToAddressWithData(addr, { kind: "inline", value: Data.to(0n) }, {});

  const { paymentCredential } = getAddressDetails(addr);
  const mintingPolicy = scriptFromNative({
    type: "all",
    scripts: [
      {
        type: "before",
        slot: unixTimeToSlot(networkConfig.NETWORK, Date.now() + 60000),
      },
      { type: "sig", keyHash: paymentCredential?.hash! },
    ],
  });

  const policyId = mintingPolicyToId(mintingPolicy);
  const txCompB = user
    .newTx()
    .mintAssets({
      [policyId + fromText("Wow")]: 123n,
    })
    .validTo(Date.now() + 30000)
    .attach.MintingPolicy(mintingPolicy);
  const txCompC = user.newTx().register.Stake(rewardAddress);
  const tx = user.newTx().compose(txCompA).compose(txCompB).compose(txCompC);
  const signBuilder = yield* tx.completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const composeDeregisterStake = Effect.gen(function* ($) {
  const { user } = yield* User;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const txCompA = user
    .newTx()
    .pay.ToAddressWithData(
      addr,
      { kind: "inline", value: Data.to(0n) },
      { lovelace: 10_000_000n },
    );

  const txCompC = user.newTx().deregister.Stake(rewardAddress);
  const tx = user.newTx().compose(txCompA).compose(txCompC);
  const signBuilder = yield* tx.completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

export const composeDepositFundsLockRefScriptAndRegisterDrep = Effect.gen(
  function* () {
    const { user } = yield* User;
    const rewardAddress = yield* pipe(
      Effect.promise(() => user.wallet().rewardAddress()),
      Effect.andThen(Effect.fromNullable),
    );
    const txCompA = user
      .newTx()
      .register.DRep(rewardAddress)
      .setMinFee(200_000n);
    const publicKeyHash = getAddressDetails(
      yield* Effect.promise(() => user.wallet().address()),
    ).paymentCredential?.hash;
    const datum = Data.to(new Constr(0, [publicKeyHash!]));

    const { contractAddress, hello } = yield* HelloContract;
    yield* pipe(Effect.tryPromise(() => user.utxosAt(contractAddress)));

    const txCompB = user.newTx().pay.ToAddressWithData(
      contractAddress,
      {
        kind: "inline",
        value: datum,
      },
      { lovelace: 10_000_000n },
      hello,
    );
    const tx = user.newTx().compose(txCompA).compose(txCompB);
    const signBuilder = yield* tx.completeProgram();
    return signBuilder;
  },
).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const composeCollectFundsReadFromAndDeregisterDrep = Effect.gen(
  function* () {
    const { user } = yield* User;

    const { contractAddress } = yield* HelloContract;

    const allUtxos = yield* Effect.tryPromise(() =>
      user.utxosAt(contractAddress),
    );
    const publicKeyHash = getAddressDetails(
      yield* Effect.promise(() => user.wallet().address()),
    ).paymentCredential?.hash;

    const readUtxo = allUtxos.filter((utxo) => utxo.scriptRef ?? null)[0];

    const utxos = allUtxos.filter((utxo) => {
      if (utxo.datum) {
        try {
          const datum = Data.from(utxo.datum, DatumType);
          return (
            datum.owner === publicKeyHash &&
            !(
              readUtxo.txHash == utxo.txHash &&
              readUtxo.outputIndex == utxo.outputIndex
            )
          );
        } catch (_) {
          return false;
        }
      } else {
        return false;
      }
    });
    const addr = yield* Effect.promise(() => user.wallet().address());

    const redeemer = Data.to(new Constr(0, [fromText("Hello, World!")]));
    const txCompA = user
      .newTx()
      .collectFrom([utxos[0]], redeemer)
      .readFrom([readUtxo])
      .addSigner(addr);
    const rewardAddress = yield* pipe(
      Effect.promise(() => user.wallet().rewardAddress()),
      Effect.andThen(Effect.fromNullable),
    );
    const txCompB = user.newTx().deregister.DRep(rewardAddress);
    const tx = user.newTx().compose(txCompA).compose(txCompB);
    const signBuilder = yield* tx.completeProgram();
    return signBuilder;
  },
).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

import { Effect, pipe } from "effect";
import { HelloContract, User } from "./services.js";
import { Constr, Data } from "@evolution-sdk/plutus";
import { getAddressDetails } from "@evolution-sdk/utils";
import { fromText } from "@evolution-sdk/core-utils";
import { handleSignSubmit, withLogRetry } from "./utils.js";

const DatumSchema = Data.Object({
  owner: Data.Bytes(),
});
type DatumType = Data.Static<typeof DatumSchema>;
const DatumType = DatumSchema as unknown as DatumType;

export const depositFunds = Effect.gen(function* () {
  const { user } = yield* User;
  const publicKeyHash = getAddressDetails(
    yield* Effect.promise(() => user.wallet().address()),
  ).paymentCredential?.hash;
  const datum = Data.to(new Constr(0, [publicKeyHash!]));
  const { contractAddress } = yield* HelloContract;

  yield* pipe(
    Effect.tryPromise(() => user.utxosAt(contractAddress)),
    // Effect.andThen((utxos) => Console.log(utxos)),
  );

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddressWithData(
      contractAddress,
      {
        kind: "inline",
        value: datum,
      },
      { lovelace: 10_000_000n },
    )
    .setMinFee(1_000_000n)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const collectFunds = Effect.gen(function* ($) {
  const { user } = yield* User;
  const { contractAddress, hello } = yield* HelloContract;
  const addr = yield* Effect.promise(() => user.wallet().address());
  const publicKeyHash = getAddressDetails(addr).paymentCredential?.hash;

  const allUtxos = yield* Effect.tryPromise(() =>
    user.utxosAt(contractAddress),
  );

  const utxos = allUtxos.filter((value) => {
    if (value.datum) {
      try {
        const datum = Data.from(value.datum, DatumType);
        return datum.owner === publicKeyHash;
      } catch (_) {
        return false;
      }
    } else {
      return false;
    }
  });

  const redeemer = Data.to(new Constr(0, [fromText("Hello, World!")]));
  const signBuilder = yield* user
    .newTx()
    .collectFrom(utxos, redeemer)
    .attach.SpendingValidator(hello)
    .addSigner(addr)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const depositFundsLockRefScript = Effect.gen(function* () {
  const { user } = yield* User;
  const publicKeyHash = getAddressDetails(
    yield* Effect.promise(() => user.wallet().address()),
  ).paymentCredential?.hash;
  const datum = Data.to(new Constr(0, [publicKeyHash!]));

  const { contractAddress, hello } = yield* HelloContract;
  yield* pipe(
    Effect.tryPromise(() => user.utxosAt(contractAddress)),
    // Effect.andThen((utxos) => Console.log(utxos)),
  );

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddressWithData(
      contractAddress,
      {
        kind: "inline",
        value: datum,
      },
      { lovelace: 10_000_000n },
      hello,
    )
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

export const collectFundsReadFrom = Effect.gen(function* ($) {
  const { user } = yield* User;

  const { contractAddress, hello } = yield* HelloContract;

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
  const signBuilder = yield* user
    .newTx()
    .collectFrom([utxos[0]], redeemer)
    .readFrom([readUtxo])
    .addSigner(addr)
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

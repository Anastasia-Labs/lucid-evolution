import { Console, Effect, Logger, LogLevel, pipe, Schedule } from "effect";
import { HelloContract, User } from "./services";
import { Constr, Data } from "@lucid-evolution/plutus";
import { getAddressDetails } from "@lucid-evolution/utils";
import { fromText } from "@lucid-evolution/core-utils";
import { TxSignBuilder } from "../../src";

const DatumSchema = Data.Object({
  owner: Data.Bytes(),
});
type DatumType = Data.Static<typeof DatumSchema>;
const DatumType = DatumSchema as unknown as DatumType;

const handleSignSubmit = (signBuilder: TxSignBuilder) =>
  Effect.gen(function* () {
    const { user } = yield* User;
    const signed = yield* signBuilder.sign.withWallet().completeProgram();
    const txHash = yield* signed.submitProgram();
    yield* Effect.promise(() => user.awaitTx(txHash, 20_000));
    yield* Effect.sleep("10 seconds");
    yield* Effect.logDebug(txHash);
  });

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
    .completeProgram();

  yield* handleSignSubmit(signBuilder);
}).pipe(
  Effect.tapErrorCause(Console.log),
  Effect.retry(
    Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4)),
  ),
  Logger.withMinimumLogLevel(LogLevel.Debug),
);

export const collectFunds = Effect.gen(function* ($) {
  const { user } = yield* User;
  const { contractAddress, hello } = yield* HelloContract;

  const allUtxos = yield* Effect.tryPromise(() =>
    user.utxosAt(contractAddress),
  );

  const utxos = allUtxos.filter((value) => {
    if (value.datum) {
      const datum = Data.from(value.datum, DatumType);
      return (
        datum.owner ===
        "e6849315a2984aadcd1e42d9628f6d6cc071685bef02bb52502f86c9"
      );
    } else {
      return false;
    }
  });
  const addr = yield* Effect.promise(() => user.wallet().address());
  // yield* Console.log(addr);

  const redeemer = Data.to(new Constr(0, [fromText("Hello, World!")]));
  const signBuilder = yield* user
    .newTx()
    .collectFrom(utxos, redeemer)
    .attach.SpendingValidator(hello)
    .addSigner(addr)
    .completeProgram();

  yield* handleSignSubmit(signBuilder);
}).pipe(
  Effect.tapErrorCause(Effect.logDebug),
  Effect.retry(
    pipe(Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4))),
  ),
  Logger.withMinimumLogLevel(LogLevel.Debug),
);

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

  yield* handleSignSubmit(signBuilder);
}).pipe(
  Effect.tapErrorCause(Console.log),
  Effect.retry(
    Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4)),
  ),
  Logger.withMinimumLogLevel(LogLevel.Debug),
);

export const collectFundsReadFrom = Effect.gen(function* ($) {
  const { user } = yield* User;

  const { contractAddress } = yield* HelloContract;

  const allUtxos = yield* Effect.tryPromise(() =>
    user.utxosAt(contractAddress),
  );

  const utxos = allUtxos.filter((value) => {
    if (value.datum) {
      const datum = Data.from(value.datum, DatumType);
      return (
        datum.owner ===
        "e6849315a2984aadcd1e42d9628f6d6cc071685bef02bb52502f86c9"
      );
    } else {
      return false;
    }
  });
  const addr = yield* Effect.promise(() => user.wallet().address());
  // yield* Console.log(addr);
  const readUtxo = allUtxos.filter((value) => value.scriptRef);

  const redeemer = Data.to(new Constr(0, [fromText("Hello, World!")]));
  const signBuilder = yield* user
    .newTx()
    .collectFrom(utxos, redeemer)
    .readFrom(readUtxo)
    .addSigner(addr)
    .completeProgram();

  yield* handleSignSubmit(signBuilder);
}).pipe(
  Effect.tapErrorCause(Effect.logDebug),
  Effect.retry(
    pipe(Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4))),
  ),
  Logger.withMinimumLogLevel(LogLevel.Debug),
);

import { Console, Effect, pipe, Schedule } from "effect";
import { User } from "./services";

export const registerStake = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .registerStake(rewardAddress)
    .completeProgram();
  const signed = yield* signBuilder.sign.withWallet().completeProgram();
  const txHash = yield* signed.submitProgram();
  yield* Effect.promise(() => user.awaitTx(txHash, 20_000));
  yield* Effect.logInfo(txHash);
}).pipe(
  Effect.tapErrorCause(Effect.log),
  Effect.tapErrorCause(Console.log),
  Effect.catchTag("TxSubmitError", (error) =>
    error.message.includes("StakeKeyAlreadyRegisteredDELEG")
      ? Effect.void
      : Effect.fail(error),
  ),
  Effect.retry(
    Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4)),
  ),
);

export const deRegisterStake = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .deRegisterStake(rewardAddress)
    .completeProgram();
  const signed = yield* signBuilder.sign.withWallet().completeProgram();
  const txHash = yield* signed.submitProgram();
  yield* Effect.promise(() => user.awaitTx(txHash, 20_000));
  yield* Effect.logInfo(txHash);
}).pipe(
  Effect.tapErrorCause(Effect.log),
  Effect.tapErrorCause(Console.log),
  Effect.retry(
    Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4)),
  ),
);
export const registerDeregisterStake = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .registerStake(rewardAddress)
    .deRegisterStake(rewardAddress)
    .completeProgram();
  const signed = yield* signBuilder.sign.withWallet().completeProgram();
  const txHash = yield* signed.submitProgram();
  yield* Effect.promise(() => user.awaitTx(txHash, 20_000));
  yield* Effect.logInfo(txHash);
}).pipe(
  Effect.tapErrorCause(Effect.log),
  Effect.tapErrorCause(Console.log),
  Effect.catchTag("TxSubmitError", (error) =>
    error.message.includes("StakeKeyAlreadyRegisteredDELEG")
      ? Effect.void
      : Effect.fail(error),
  ),
  Effect.retry(
    Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4)),
  ),
);

export const withdrawZero = Effect.gen(function* ($) {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .withdraw(rewardAddress, 0n)
    .completeProgram();
  const signed = yield* signBuilder.sign.withWallet().completeProgram();
  const txHash = yield* signed.submitProgram();
  yield* Effect.promise(() => user.awaitTx(txHash, 20_000));
  yield* Effect.logInfo(txHash);
}).pipe(
  Effect.tapErrorCause(Effect.log),
  Effect.tapErrorCause(Console.log),
  Effect.retry(
    Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4)),
  ),
);

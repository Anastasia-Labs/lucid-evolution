import { Effect, pipe, Schedule } from "effect";
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
    .complete()
    .program();
  const signed = yield* signBuilder.sign.withWallet().complete().program();
  const txHash = yield* signed.submit().program();
  yield* Effect.logInfo(txHash);
}).pipe(
  // Effect.tapError(Effect.logError),
  Effect.catchTag("UnknownException", (error) =>
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
    .complete()
    .program();
  const signed = yield* signBuilder.sign.withWallet().complete().program();
  const txHash = yield* signed.submit().program();
  yield* Effect.logInfo(txHash);
}).pipe(
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
    .complete()
    .program();
  const signed = yield* signBuilder.sign.withWallet().complete().program();
  const txHash = yield* signed.submit().program();
  yield* Effect.logInfo(txHash);
}).pipe(
  Effect.catchTag("UnknownException", (error) =>
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
    .complete()
    .program();
  const signed = yield* signBuilder.sign.withWallet().complete().program();
  const txHash = yield* signed.submit().program();
  yield* Effect.logInfo(txHash);
}).pipe(
  Effect.retry(
    Schedule.compose(Schedule.exponential(20_000), Schedule.recurs(4)),
  ),
);

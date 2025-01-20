import { Effect, pipe } from "effect";
import { User } from "../service/EmulatorUser.js";

export const register = Effect.gen(function* () {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .register.Stake(rewardAddress)
    .completeProgram();
  return signBuilder;
});

export const deRegister = Effect.gen(function* () {
  const { user } = yield* User;
  const rewardAddress = yield* pipe(
    Effect.promise(() => user.wallet().rewardAddress()),
    Effect.andThen(Effect.fromNullable),
  );
  const signBuilder = yield* user
    .newTx()
    .deRegisterStake(rewardAddress)
    .completeProgram();
  return signBuilder;
});

export const delegateTo = (config: { poolID: string }) =>
  Effect.gen(function* () {
    const { user } = yield* User;
    const rewardAddress = yield* pipe(
      Effect.promise(() => user.wallet().rewardAddress()),
      Effect.andThen(Effect.fromNullable),
    );
    const signBuilder = yield* user
      .newTx()
      .delegateTo(rewardAddress, config.poolID)
      .completeProgram();
    return signBuilder;
  });

export const withdrawReward = (amount: bigint) =>
  Effect.gen(function* () {
    const { user } = yield* User;
    const rewardAddress = yield* pipe(
      Effect.promise(() => user.wallet().rewardAddress()),
      Effect.andThen(Effect.fromNullable),
    );
    const signBuilder = yield* user
      .newTx()
      .withdraw(rewardAddress, amount)
      .completeProgram();
    return signBuilder;
  });

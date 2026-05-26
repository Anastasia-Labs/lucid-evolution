import { Effect, pipe } from "effect";
import { User } from "../service/EmulatorUser.js";
import { Data } from "@lucid-evolution/plutus";
import { validatorToRewardAddress } from "@lucid-evolution/utils";
import { alwaysSucceedV3Script } from "../../fixtures/scripts.js";

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

export const registerScriptWithRedeemer = Effect.gen(function* () {
  const { user } = yield* User;
  const rewardAddress = validatorToRewardAddress(
    "Custom",
    alwaysSucceedV3Script,
  );
  const signBuilder = yield* user
    .newTx()
    .attach.CertificateValidator(alwaysSucceedV3Script)
    .register.Stake(rewardAddress, Data.void())
    .completeProgram();
  return {
    signBuilder,
    rewardAddress,
  };
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

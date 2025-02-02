import { Effect, pipe } from "effect";
import { EmulatorInstance } from "../service/EmulatorInstance";
import { User } from "../service/EmulatorUser";
import * as StakeBuilder from "../builder/StakeBuilder";
import { CONSTANTS } from "../Constants";
import { handleSignSubmitWithoutValidation } from "../../specs/utils";

export const registerStake = Effect.gen(function* () {
  const { emulator } = yield* EmulatorInstance;
  yield* pipe(
    StakeBuilder.register,
    Effect.flatMap(handleSignSubmitWithoutValidation),
    Effect.catchTag("TxSubmitError", (error) =>
      error.message.includes("StakeKeyAlreadyRegisteredDELEG")
        ? Effect.void
        : Effect.fail(error),
    ),
  );
  emulator.awaitBlock(1);
  const userUTxOs = yield* User.getUtxos;
  return {
    userUTxOs,
  } as const;
});

export const deregisterStake = Effect.gen(function* () {
  const { emulator } = yield* EmulatorInstance;
  yield* pipe(
    StakeBuilder.deRegister,
    Effect.flatMap(handleSignSubmitWithoutValidation),
  );
  emulator.awaitBlock(1);
});

export const delegateStake = Effect.gen(function* () {
  const { emulator } = yield* EmulatorInstance;
  yield* pipe(
    StakeBuilder.delegateTo({ poolID: CONSTANTS.EMULATOR_POOL_ID }),
    Effect.flatMap(handleSignSubmitWithoutValidation),
  );
  emulator.awaitBlock(1);
  emulator.distributeRewards(CONSTANTS.REWARD_AMOUNT);
  emulator.awaitBlock(1);
});

export const withdrawRewardAmount = (config: { rewardAmount: bigint }) =>
  Effect.gen(function* () {
    const { emulator } = yield* EmulatorInstance;
    yield* pipe(
      StakeBuilder.withdrawReward(config.rewardAmount),
      Effect.flatMap(handleSignSubmitWithoutValidation),
    );
    emulator.awaitBlock(1);
  });

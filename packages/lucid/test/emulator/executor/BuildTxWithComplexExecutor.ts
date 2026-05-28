import { Effect, pipe } from "effect";
import * as BuildTxWithComplex from "../builder/BuildTxWithComplex.js";
import { EmulatorInstance } from "../service/EmulatorInstance.js";
import { User } from "../service/EmulatorUser.js";
import { handleSignSubmitWithoutValidation } from "../../specs/utils.js";
import { CONSTANTS } from "../Constants.js";

export const buildTxWithComplex = Effect.gen(function* () {
  const { emulator } = yield* EmulatorInstance;
  const { user } = yield* User;
  const trace = BuildTxWithComplex.makeBuildTxWithComplexTrace();

  yield* pipe(
    BuildTxWithComplex.depositBuildTxWithComplexSetup,
    Effect.flatMap(handleSignSubmitWithoutValidation),
  );
  emulator.awaitBlock(1);

  const rewardState = emulator.chain[trace.rewardAddress];
  if (!rewardState?.registeredStake) {
    throw new Error("BuildTxWithComplex setup did not register reward account");
  }
  rewardState.delegation = {
    poolId: CONSTANTS.EMULATOR_POOL_ID,
    rewards: BuildTxWithComplex.BUILD_TX_WITH_COMPLEX_REWARD,
  };

  yield* pipe(
    BuildTxWithComplex.buildTxWithComplex(trace),
    Effect.flatMap(handleSignSubmitWithoutValidation),
  );
  emulator.awaitBlock(1);

  const { referenceInput, walletUnits } = trace;
  if (!referenceInput) throw new Error("Missing complex reference input trace");
  if (!walletUnits) throw new Error("Missing complex wallet units trace");

  const walletUtxos = yield* Effect.promise(() => user.wallet().getUtxos());
  return {
    stressInputs: trace.stressInputs,
    referenceInput,
    walletUnits,
    rewardAddress: trace.rewardAddress,
    observations: trace.observations,
    walletUtxos,
  } as const;
});

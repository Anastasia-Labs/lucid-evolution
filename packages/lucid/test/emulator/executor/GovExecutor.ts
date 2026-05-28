import { Effect, pipe } from "effect";
import { EmulatorInstance } from "../service/EmulatorInstance";
import { User } from "../service/EmulatorUser";
import * as GovBuilder from "../builder/GovBuilder";
import * as StakeExecutor from "./StakeExecutor";
import { handleSignSubmitWithoutValidation } from "../../specs/utils";

export const registerDRep = Effect.gen(function* () {
  const { emulator } = yield* EmulatorInstance;
  yield* pipe(
    GovBuilder.registerDRep,
    Effect.flatMap(handleSignSubmitWithoutValidation),
  );
  emulator.awaitBlock(1);
  const userUTxOs = yield* User.getUtxos;
  return { userUTxOs } as const;
});

export const delegateVoteToAlwaysAbstain = Effect.gen(function* () {
  const { emulator } = yield* EmulatorInstance;
  yield* StakeExecutor.registerStake;
  yield* pipe(
    GovBuilder.delegateVoteToAlwaysAbstain,
    Effect.flatMap(handleSignSubmitWithoutValidation),
  );
  emulator.awaitBlock(1);
  const userUTxOs = yield* User.getUtxos;
  return { userUTxOs } as const;
});

export const registerAndRetirePool = Effect.gen(function* () {
  const { emulator } = yield* EmulatorInstance;
  const { signBuilder, poolId } = yield* GovBuilder.registerPool;
  yield* handleSignSubmitWithoutValidation(signBuilder);
  emulator.awaitBlock(1);
  yield* pipe(
    GovBuilder.retirePool(poolId),
    Effect.flatMap(handleSignSubmitWithoutValidation),
  );
  emulator.awaitBlock(1);
  const userUTxOs = yield* User.getUtxos;
  return { poolId, userUTxOs } as const;
});

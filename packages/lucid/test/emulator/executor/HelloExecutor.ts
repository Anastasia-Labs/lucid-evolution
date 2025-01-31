import { Effect, pipe } from "effect";
import * as HelloBuilder from "../builder/HelloBuilder";
import { EmulatorInstance } from "../service/EmulatorInstance";
import { User } from "../service/EmulatorUser";
import { HelloContract } from "../../specs/services";
import { handleSignSubmitWithoutValidation } from "../../specs/utils";

export const depositFunds = Effect.gen(function* () {
  const { emulator } = yield* EmulatorInstance;
  const { user } = yield* User;
  const { contractAddress } = yield* HelloContract;
  yield* pipe(
    HelloBuilder.depositFunds,
    Effect.flatMap(handleSignSubmitWithoutValidation),
  );
  emulator.awaitBlock(1);
  const contractUTxOs = yield* Effect.promise(() =>
    user.utxosAt(contractAddress),
  );
  return {
    contractUTxOs,
  } as const;
}).pipe(Effect.orDie);

export const collectFromReadFrom = Effect.gen(function* () {
  const { emulator } = yield* EmulatorInstance;
  const { user } = yield* User;
  const { contractAddress } = yield* HelloContract;
  yield* pipe(
    HelloBuilder.collectFundsReadFrom,
    Effect.flatMap(handleSignSubmitWithoutValidation),
  );
  emulator.awaitBlock(1);
  const contractUTxOs = yield* Effect.promise(() =>
    user.utxosAt(contractAddress),
  );
  const userUTxOs = yield* User.getUtxos;
  return {
    contractUTxOs,
    userUTxOs,
  } as const;
}).pipe(Effect.orDie);

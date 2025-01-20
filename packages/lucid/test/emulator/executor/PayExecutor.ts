import { Effect, pipe } from "effect";
import { EmulatorInstance } from "../service/EmulatorInstance";
import { User } from "../service/EmulatorUser";
import { Script } from "@lucid-evolution/core-types";
import { validatorToAddress } from "@lucid-evolution/utils";
import * as PayBuilder from "../builder/PayBuilder";
import { handleSignSubmitWithoutValidation } from "../../specs/utils";
import { HelloContract } from "../../specs/services";

// In the context of transaction interactions with contracts, it is crucial to understand the roles of the executor and the builder:
// Executor
// The executor is responsible for:
// Acting as a top-level layer, gathering and supplying external data required for the transaction-building process.
// Handling the signing and submission of the transaction.
// Confirming the completion of the transaction.
// Managing errors during the transaction process, e.g retry logic, logging errors, etc.
// Returning contextual information about the transaction, enabling its use in subsequent executions.

// Builder
// The builder is responsible for:
// Constructing the transaction.
// Assembling the transaction apis using the data provided by the executor.
// Ensuring that all required inputs are correctly fulfilled.

export const withDatumHashAndInlineDatum = Effect.gen(function* () {
  const { emulator } = yield* EmulatorInstance;
  const { user } = yield* User;
  const alwaysSucceedScript: Script = {
    type: "PlutusV2",
    script: "49480100002221200101",
  };
  const alwaysSucceedAddress = validatorToAddress(
    "Custom",
    alwaysSucceedScript,
  );
  yield* pipe(
    PayBuilder.composeWithDatumHashAndInlineDatum({
      script: alwaysSucceedScript,
    }),
    Effect.flatMap(handleSignSubmitWithoutValidation),
  );

  emulator.awaitBlock(1);

  const alwaysSucceedUtxos = yield* Effect.promise(() =>
    user.utxosAt(alwaysSucceedAddress),
  );

  return { alwaysSucceedUtxos } as const;
}).pipe(Effect.orDie);

export const sendAllFund = Effect.gen(function* () {
  const { emulator } = yield* EmulatorInstance;
  const { user } = yield* User;
  const { contractAddress } = yield* HelloContract;
  yield* pipe(
    PayBuilder.sendAllFund,
    Effect.flatMap(handleSignSubmitWithoutValidation),
  );
  emulator.awaitBlock(1);
  const contractUTxOs = yield* Effect.promise(() =>
    user.utxosAt(contractAddress),
  );
  return contractUTxOs;
});

export const multiTxCompose = Effect.gen(function* () {
  const { emulator } = yield* EmulatorInstance;
  yield* pipe(
    PayBuilder.multiTxCompose,
    Effect.flatMap(handleSignSubmitWithoutValidation),
  );
  emulator.awaitBlock(1);
  return yield* User.getUtxos;
});

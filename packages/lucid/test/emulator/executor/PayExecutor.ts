import { Effect, pipe } from "effect";
import { EmulatorInstance } from "../service/EmulatorInstance";
import { User } from "../service/EmulatorUser";
import { Script } from "@evolution-sdk/core-types";
import { validatorToAddress } from "@evolution-sdk/utils";
import * as PayBuilder from "../builder/PayBuilder";
import { handleSignSubmitWithoutValidation } from "../../specs/utils";
import { HelloContract } from "../../specs/services";

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

export const mintAndPayTxCompose = Effect.gen(function* () {
  const { emulator } = yield* EmulatorInstance;
  yield* pipe(
    PayBuilder.mintAndPayTxCompose,
    Effect.flatMap(handleSignSubmitWithoutValidation),
  );
  emulator.awaitBlock(1);
});

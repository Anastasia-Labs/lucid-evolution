import { Effect, pipe } from "effect";
import * as HelloBuilder from "../builder/HelloBuilder.js";
import * as HelloFailsBuilder from "../builder/HelloFailsBuilder.js";
import { EmulatorInstance } from "../service/EmulatorInstance.js";
import { handleSignSubmitWithoutValidation } from "../../specs/utils.js";

export const collectWithWrongRedeemer = Effect.gen(function* () {
  const { emulator } = yield* EmulatorInstance;
  yield* pipe(
    HelloBuilder.depositFunds,
    Effect.flatMap(handleSignSubmitWithoutValidation),
  );
  emulator.awaitBlock(1);
  yield* HelloFailsBuilder.collectFundsWithWrongRedeemer;
});

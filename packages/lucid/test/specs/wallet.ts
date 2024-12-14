import { Effect, Array as _Array } from "effect";
import { User } from "./services";
import { handleSignSubmit, withLogRetry } from "./utils";

export const recycleUTxOs = Effect.gen(function* ($) {
  const { user } = yield* User;
  const allUtxos = yield* Effect.tryPromise(() => user.wallet().getUtxos());

  // Clean up wallet with many UTxOs
  // TODO: Use compose() when fixed
  if (allUtxos.length > 40) {
    return yield* user
      .newTx()
      .collectFrom(allUtxos.slice(30))
      .completeProgram();
  } else {
    return yield* user
      .newTx()
      .collectFrom(_Array.take(allUtxos, 5))
      .completeProgram();
  }
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

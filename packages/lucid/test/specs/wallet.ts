import { Effect, Array as _Array } from "effect";
import { User } from "./services";
import { handleSignSubmit, withLogRetry } from "./utils";

export const recycleUTxOs = Effect.gen(function* ($) {
  const { user } = yield* User;
  const allUtxos = yield* Effect.tryPromise(() => user.wallet().getUtxos());

  const signBuilder = yield* user
    .newTx()
    .collectFrom(_Array.take(allUtxos, 5))
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry, Effect.orDie);

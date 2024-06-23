import { Effect } from "effect";
import { User } from "./services.js";
import { handleSignSubmit, withLogRetry } from "./utils.js";

export const payWithMetadata = Effect.gen(function* () {
  const { user } = yield* User;

  const signBuilder = yield* user
    .newTx()
    .pay.ToAddress(
      "addr_test1qrngfyc452vy4twdrepdjc50d4kvqutgt0hs9w6j2qhcdjfx0gpv7rsrjtxv97rplyz3ymyaqdwqa635zrcdena94ljs0xy950",
      { lovelace: 2_000_000n },
    )
    .attachMetadata(1337, new Uint8Array([1, 2]))
    .completeProgram();
  return signBuilder;
}).pipe(Effect.flatMap(handleSignSubmit), withLogRetry);

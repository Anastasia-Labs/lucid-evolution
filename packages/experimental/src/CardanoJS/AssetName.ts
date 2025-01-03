import { AssetName } "cardano-js-sdk" // browser
import { Data, Effect } from "effect";
import * as FormatError from "../FormatError.js";

class AssetNameError extends Data.TaggedError("AssetNameError")<{
  cause?: unknown;
  message?: string;
}> { }


export const from_cbor_hex = Effect.fn(function*(hex: string) {
  return yield* Effect.sync(() => Effect.succeed(hex)).pipe(
    Effect.catchAllDefect(
      (cause) =>
        new AssetNameError(
          FormatError.make({
            message: `Oops! Looks like [${hex}] is not correct`,
            cause,
          }),
        ),
    ),
  );
});


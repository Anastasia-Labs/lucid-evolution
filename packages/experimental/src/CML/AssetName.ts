import { Data, Effect } from "effect";
import * as ErrorFormat from "../ErrorFormat.js";
import { AssetName } from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

class AssetNameError extends Data.TaggedError("AssetNameError")<{
  cause?: unknown;
  message?: string;
}> {}

export const from_hex = Effect.fn(function* (hex: string) {
  return yield* Effect.sync(() => AssetName.from_hex(hex)).pipe(
    Effect.catchAllDefect(
      (cause) =>
        new AssetNameError(
          ErrorFormat.make({
            message: `Oops! Looks like [${hex}] isn’t correct, ensure the string is a properly formatted as hex`,
            cause,
          }),
        ),
    ),
  );
});

export const from_str = (utf8: string) =>
  Effect.try({
    try: () => AssetName.from_str(utf8),
    catch: (cause) =>
      new AssetNameError(
        ErrorFormat.make({
          message: `Oops! Looks like [${utf8}] isn’t correct, ensure the string is a properly formatted in UTF-8 and max 64 bytes in length`,
          cause,
        }),
      ),
  });

export const from_cbor_bytes = (bytes: Uint8Array) =>
  Effect.try({
    try: () => AssetName.from_cbor_bytes(bytes),
    catch: (cause) =>
      new AssetNameError(
        ErrorFormat.make({
          message: `Oops! Looks like [${bytes}] isn’t correct`,
          cause,
        }),
      ),
  });

export const from_cbor_hex = (hex: string) =>
  Effect.try({
    try: () => AssetName.from_cbor_hex(hex),
    catch: (cause) =>
      new AssetNameError(
        ErrorFormat.make({
          message: `Oops! Looks like [${hex}] isn’t correct`,
          cause,
        }),
      ),
  });

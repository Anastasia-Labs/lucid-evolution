import { Data, Effect } from "effect";
import * as FormatError from "../FormatError.js";
import { AssetName } from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

class AssetNameError extends Data.TaggedError("AssetNameError")<{
  cause?: unknown;
  message?: string;
}> {}

export const from_cbor_bytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.sync(() => AssetName.from_cbor_bytes(bytes)).pipe(
    Effect.catchAllDefect(
      (cause) =>
        new AssetNameError(
          FormatError.make({
            message: `Oops! Looks like [${bytes}] is not correct`,
            cause,
          }),
        ),
    ),
  );
});

export const from_cbor_hex = Effect.fn(function* (hex: string) {
  return yield* Effect.sync(() => AssetName.from_cbor_hex(hex)).pipe(
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

/**
 * Converts a `hex` string into CML class `AssetName`
 *
 * @since 1.0.0
 *
 * @example
 * ```ts
 * const helloHex = "68656c6c6f"
 * AssetName.from_hex(helloHex));
 * ```
 */
export const from_hex = Effect.fn(function* (hex: string) {
  return yield* Effect.sync(() => AssetName.from_hex(hex)).pipe(
    Effect.catchAllDefect(
      (cause) =>
        new AssetNameError(
          FormatError.make({
            message: `Oops! Looks like [${hex}] is not correct, ensure the string is a properly formatted as hex`,
            cause,
          }),
        ),
    ),
  );
});

export const from_json = Effect.fn(function* (json: string) {
  return yield* Effect.sync(() => AssetName.from_json(json)).pipe(
    Effect.catchAllDefect(
      (cause) =>
        new AssetNameError(
          FormatError.make({
            message: `Oops! Looks like [${json}] is not correct`,
            cause,
          }),
        ),
    ),
  );
});

export const from_raw_bytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.sync(() => AssetName.from_raw_bytes(bytes)).pipe(
    Effect.catchAllDefect(
      (cause) =>
        new AssetNameError(
          FormatError.make({
            message: `Oops! Looks like [${bytes}] is not correct`,
            cause,
          }),
        ),
    ),
  );
});

export const from_str = Effect.fn(function* (utf8: string) {
  return yield* Effect.sync(() => AssetName.from_str(utf8)).pipe(
    Effect.catchAllDefect(
      (cause) =>
        new AssetNameError(
          FormatError.make({
            message: `Oops! Looks like [${utf8}] is not correct, ensure the string is a properly formatted in UTF-8 and max 64 bytes in length`,
            cause,
          }),
        ),
    ),
  );
});

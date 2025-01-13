import { Data, Effect } from "effect";
import * as FormatError from "../FormatError.js";
import { AssetName } from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class AssetNameError extends Data.TaggedError("AssetNameError")<{
  cause?: unknown;
  message?: string;
}> {}

/**
 * Converts a `cbor` bytes into CML class `AssetName`
 * @example
 * ```ts
 * import { AssetName } from "@lucid-evolution/..."
 *
 * const helloCbor = new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
 *
 * AssetName.from_cbor_bytes(helloCbor);
 * ```
 * @since 1.0.0
 * @category Constructors
 *
 */
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

export const unsafe_from_cbor_bytes = (bytes: Uint8Array): AssetName =>
  from_cbor_bytes(bytes).pipe(Effect.runSync);

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
 * @example
 * ```ts
 * const helloHex = "68656c6c6f"
 * AssetName.from_hex(helloHex);
 * ```
 * 
 * @since 1.0.0
 */
export const from_hex = Effect.fn(function* (hex: string) {
  return yield* Effect.try({
    try: () => AssetName.from_hex(hex),
    catch: (cause) =>
      new AssetNameError(
        FormatError.make({
          message: `Oops! Looks like [${hex}] is not correct`,
          cause,
        }),
      ),
  });
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
            message: `Oops! Looks like [${utf8}] is not correct`,
            cause,
          }),
        ),
    ),
  );
});

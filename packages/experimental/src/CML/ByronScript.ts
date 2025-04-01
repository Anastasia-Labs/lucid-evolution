/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ByronScript class
 *
 * @since 2.0.0
 * @category Types
 */
export type ByronScript = CML.ByronScript;

/**
 * Error class for ByronScript operations
 *
 * This error is thrown when operations on ByronScript instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ByronScriptError extends Data.TaggedError("ByronScriptError")<{
  message?: string;
}> {}

/**
 * Method free of ByronScript
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.ByronScript,
) => Effect.Effect<void, ByronScriptError> = Effect.fn(
  (instance: CML.ByronScript) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ByronScriptError({
          message: `ByronScript.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ByronScript): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of ByronScript
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32: (
  instance: CML.ByronScript,
  prefix: string,
) => Effect.Effect<string, ByronScriptError> = Effect.fn(
  (instance: CML.ByronScript, prefix: string) =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new ByronScriptError({
          message: `ByronScript.toBech32 failed with parameters: ${prefix}. ByronScript is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (
  instance: CML.ByronScript,
  prefix: string,
): string => Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of ByronScript
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.ByronScript, ByronScriptError> = Effect.fn(function* (
  bech32Str: string,
) {
  return yield* Effect.try({
    try: () => CML.ByronScript.from_bech32(bech32Str),
    catch: () =>
      new ByronScriptError({
        message: `ByronScript.fromBech32 failed with parameters: ${bech32Str}. `,
      }),
  });
});

/**
 * Unsafely calls ByronScript.fromBech32 without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string): CML.ByronScript =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of ByronScript
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (
  instance: CML.ByronScript,
) => Effect.Effect<Uint8Array, ByronScriptError> = Effect.fn(
  (instance: CML.ByronScript) =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new ByronScriptError({
          message: `ByronScript.toRawBytes failed ByronScript is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.ByronScript): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of ByronScript
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.ByronScript, ByronScriptError> = Effect.fn(function* (
  bytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.ByronScript.from_raw_bytes(bytes),
    catch: () =>
      new ByronScriptError({
        message: `ByronScript.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ByronScript.fromRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.ByronScript =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of ByronScript
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (
  instance: CML.ByronScript,
) => Effect.Effect<string, ByronScriptError> = Effect.fn(
  (instance: CML.ByronScript) =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new ByronScriptError({
          message: `ByronScript.toHex failed ByronScript is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.ByronScript): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of ByronScript
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (
  input: string,
) => Effect.Effect<CML.ByronScript, ByronScriptError> = Effect.fn(function* (
  input: string,
) {
  return yield* Effect.try({
    try: () => CML.ByronScript.from_hex(input),
    catch: () =>
      new ByronScriptError({
        message: `ByronScript.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
      }),
  });
});

/**
 * Unsafely calls ByronScript.fromHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.ByronScript =>
  Effect.runSync(fromHex(input));

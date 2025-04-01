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
 * @example
 * import { ByronScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ByronScript instance
 * const instance = ... ;
 *   const result = yield* ByronScript.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ByronScript): Effect.Effect<void, ByronScriptError> =>
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
 * @example
 * import { ByronScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ByronScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronScript.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronScript.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ByronScript): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of ByronScript
 *
 * @example
 * import { ByronScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ByronScript instance
 * const instance = ... ;
 *   const result = yield* ByronScript.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (
    instance: CML.ByronScript,
    prefix: string,
  ): Effect.Effect<string, ByronScriptError> =>
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
 * @example
 * import { ByronScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ByronScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronScript.toBech32Unsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronScript.toBech32Unsafe failed: ${error.message}`);
 * }
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
 * @example
 * import { ByronScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ByronScript.fromBech32( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
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
 * @example
 * import { ByronScript } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronScript.fromBech32Unsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronScript.fromBech32Unsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of ByronScript
 *
 * @example
 * import { ByronScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ByronScript instance
 * const instance = ... ;
 *   const result = yield* ByronScript.toRawBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.ByronScript): Effect.Effect<Uint8Array, ByronScriptError> =>
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
 * @example
 * import { ByronScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ByronScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronScript.toRawBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronScript.toRawBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.ByronScript): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of ByronScript
 *
 * @example
 * import { ByronScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ByronScript.fromRawBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
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
 * @example
 * import { ByronScript } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronScript.fromRawBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronScript.fromRawBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of ByronScript
 *
 * @example
 * import { ByronScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ByronScript instance
 * const instance = ... ;
 *   const result = yield* ByronScript.toHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.ByronScript): Effect.Effect<string, ByronScriptError> =>
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
 * @example
 * import { ByronScript } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ByronScript instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronScript.toHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronScript.toHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.ByronScript): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of ByronScript
 *
 * @example
 * import { ByronScript } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ByronScript.fromHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
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
 * @example
 * import { ByronScript } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronScript.fromHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronScript.fromHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string) => Effect.runSync(fromHex(input));

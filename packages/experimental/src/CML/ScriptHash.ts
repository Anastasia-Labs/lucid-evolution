/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ScriptHash class
 *
 * @since 2.0.0
 * @category Types
 */
export type ScriptHash = CML.ScriptHash;

/**
 * Error class for ScriptHash operations
 *
 * This error is thrown when operations on ScriptHash instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ScriptHashError extends Data.TaggedError("ScriptHashError")<{
  message?: string;
}> {}

/**
 * Method free of ScriptHash
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptHash instance
 * const instance = ... ;
 *   const result = yield* ScriptHash.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ScriptHash): Effect.Effect<void, ScriptHashError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptHashError({
          message: `ScriptHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptHash.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptHash.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ScriptHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of ScriptHash
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptHash instance
 * const instance = ... ;
 *   const result = yield* ScriptHash.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (
    instance: CML.ScriptHash,
    prefix: string,
  ): Effect.Effect<string, ScriptHashError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new ScriptHashError({
          message: `ScriptHash.toBech32 failed with parameters: ${prefix}. ScriptHash is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptHash.toBech32Unsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptHash.toBech32Unsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (
  instance: CML.ScriptHash,
  prefix: string,
): string => Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of ScriptHash
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptHash.fromBech32( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.ScriptHash.from_bech32(bech32Str),
    catch: () =>
      new ScriptHashError({
        message: `ScriptHash.fromBech32 failed with parameters: ${bech32Str}. `,
      }),
  });
});

/**
 * Unsafely calls ScriptHash.fromBech32 without Effect wrapper
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptHash.fromBech32Unsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptHash.fromBech32Unsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of ScriptHash
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptHash instance
 * const instance = ... ;
 *   const result = yield* ScriptHash.toRawBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.ScriptHash): Effect.Effect<Uint8Array, ScriptHashError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new ScriptHashError({
          message: `ScriptHash.toRawBytes failed ScriptHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptHash.toRawBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptHash.toRawBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.ScriptHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of ScriptHash
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptHash.fromRawBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ScriptHash.from_raw_bytes(bytes),
    catch: () =>
      new ScriptHashError({
        message: `ScriptHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ScriptHash.fromRawBytes without Effect wrapper
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptHash.fromRawBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptHash.fromRawBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of ScriptHash
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptHash instance
 * const instance = ... ;
 *   const result = yield* ScriptHash.toHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.ScriptHash): Effect.Effect<string, ScriptHashError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new ScriptHashError({
          message: `ScriptHash.toHex failed ScriptHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptHash.toHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptHash.toHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.ScriptHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of ScriptHash
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptHash.fromHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.ScriptHash.from_hex(input),
    catch: () =>
      new ScriptHashError({
        message: `ScriptHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
      }),
  });
});

/**
 * Unsafely calls ScriptHash.fromHex without Effect wrapper
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptHash.fromHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptHash.fromHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string) => Effect.runSync(fromHex(input));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ScriptDataHash class
 *
 * @since 2.0.0
 * @category Types
 */
export type ScriptDataHash = CML.ScriptDataHash;

/**
 * Error class for ScriptDataHash operations
 *
 * This error is thrown when operations on ScriptDataHash instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ScriptDataHashError extends Data.TaggedError(
  "ScriptDataHashError",
)<{
  message?: string;
}> {}

/**
 * Method free of ScriptDataHash
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptDataHash instance
 * const instance = ... ;
 *   const result = yield* ScriptDataHash.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ScriptDataHash): Effect.Effect<void, ScriptDataHashError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptDataHashError({
          message: `ScriptDataHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptDataHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptDataHash.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptDataHash.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ScriptDataHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of ScriptDataHash
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptDataHash instance
 * const instance = ... ;
 *   const result = yield* ScriptDataHash.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (
    instance: CML.ScriptDataHash,
    prefix: string,
  ): Effect.Effect<string, ScriptDataHashError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new ScriptDataHashError({
          message: `ScriptDataHash.toBech32 failed with parameters: ${prefix}. ScriptDataHash is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptDataHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptDataHash.toBech32Unsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptDataHash.toBech32Unsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (
  instance: CML.ScriptDataHash,
  prefix: string,
): string => Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of ScriptDataHash
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptDataHash.fromBech32( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.ScriptDataHash.from_bech32(bech32Str),
    catch: () =>
      new ScriptDataHashError({
        message: `ScriptDataHash.fromBech32 failed with parameters: ${bech32Str}. `,
      }),
  });
});

/**
 * Unsafely calls ScriptDataHash.fromBech32 without Effect wrapper
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptDataHash.fromBech32Unsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptDataHash.fromBech32Unsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of ScriptDataHash
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptDataHash instance
 * const instance = ... ;
 *   const result = yield* ScriptDataHash.toRawBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (
    instance: CML.ScriptDataHash,
  ): Effect.Effect<Uint8Array, ScriptDataHashError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new ScriptDataHashError({
          message: `ScriptDataHash.toRawBytes failed ScriptDataHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptDataHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptDataHash.toRawBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptDataHash.toRawBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.ScriptDataHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of ScriptDataHash
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptDataHash.fromRawBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ScriptDataHash.from_raw_bytes(bytes),
    catch: () =>
      new ScriptDataHashError({
        message: `ScriptDataHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ScriptDataHash.fromRawBytes without Effect wrapper
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptDataHash.fromRawBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptDataHash.fromRawBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of ScriptDataHash
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptDataHash instance
 * const instance = ... ;
 *   const result = yield* ScriptDataHash.toHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.ScriptDataHash): Effect.Effect<string, ScriptDataHashError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new ScriptDataHashError({
          message: `ScriptDataHash.toHex failed ScriptDataHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptDataHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptDataHash.toHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptDataHash.toHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.ScriptDataHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of ScriptDataHash
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptDataHash.fromHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.ScriptDataHash.from_hex(input),
    catch: () =>
      new ScriptDataHashError({
        message: `ScriptDataHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
      }),
  });
});

/**
 * Unsafely calls ScriptDataHash.fromHex without Effect wrapper
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptDataHash.fromHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptDataHash.fromHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string) => Effect.runSync(fromHex(input));

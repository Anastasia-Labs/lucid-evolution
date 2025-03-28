import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type NonceHash = CML.NonceHash;

export class NonceHashError extends Data.TaggedError("NonceHashError")<{
  message?: string;
}> {}

/**
 * Method free of NonceHash
 * 
 * @example
 * import { NonceHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NonceHash instance
 * const instance = ... ;
 *   const result = yield* NonceHash.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.NonceHash): Effect.Effect<void, NonceHashError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new NonceHashError({
          message: `NonceHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { NonceHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NonceHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NonceHash.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NonceHash.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.NonceHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of NonceHash
 * 
 * @example
 * import { NonceHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NonceHash instance
 * const instance = ... ;
 *   const result = yield* NonceHash.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (instance: CML.NonceHash, prefix: string): Effect.Effect<string, NonceHashError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new NonceHashError({
          message: `NonceHash.toBech32 failed with parameters: ${prefix}. NonceHash is not valid for string conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 * 
 * @example
 * import { NonceHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NonceHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NonceHash.unsafeToBech32(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NonceHash.unsafeToBech32 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToBech32 = (instance: CML.NonceHash, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of NonceHash
 * 
 * @example
 * import { NonceHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NonceHash.fromBech32( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.NonceHash.from_bech32(bech32Str),
    catch: () => new NonceHashError({
      message: `NonceHash.fromBech32 failed with parameters: ${bech32Str}. `,
    }),
  });
});

/**
 * Unsafely calls NonceHash.fromBech32 without Effect wrapper
 * 
 * @example
 * import { NonceHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NonceHash.unsafeFromBech32( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NonceHash.unsafeFromBech32 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromBech32 = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of NonceHash
 * 
 * @example
 * import { NonceHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NonceHash instance
 * const instance = ... ;
 *   const result = yield* NonceHash.toRawBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.NonceHash): Effect.Effect<Uint8Array, NonceHashError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new NonceHashError({
          message: `NonceHash.toRawBytes failed NonceHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @example
 * import { NonceHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NonceHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NonceHash.unsafeToRawBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NonceHash.unsafeToRawBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawBytes = (instance: CML.NonceHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of NonceHash
 * 
 * @example
 * import { NonceHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NonceHash.fromRawBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.NonceHash.from_raw_bytes(bytes),
    catch: () => new NonceHashError({
      message: `NonceHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls NonceHash.fromRawBytes without Effect wrapper
 * 
 * @example
 * import { NonceHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NonceHash.unsafeFromRawBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NonceHash.unsafeFromRawBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromRawBytes = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of NonceHash
 * 
 * @example
 * import { NonceHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NonceHash instance
 * const instance = ... ;
 *   const result = yield* NonceHash.toHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.NonceHash): Effect.Effect<string, NonceHashError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new NonceHashError({
          message: `NonceHash.toHex failed NonceHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    })
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 * 
 * @example
 * import { NonceHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NonceHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NonceHash.unsafeToHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NonceHash.unsafeToHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToHex = (instance: CML.NonceHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of NonceHash
 * 
 * @example
 * import { NonceHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NonceHash.fromHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.NonceHash.from_hex(input),
    catch: () => new NonceHashError({
      message: `NonceHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
    }),
  });
});

/**
 * Unsafely calls NonceHash.fromHex without Effect wrapper
 * 
 * @example
 * import { NonceHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NonceHash.unsafeFromHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NonceHash.unsafeFromHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromHex = (input: string) =>
  Effect.runSync(fromHex(input));

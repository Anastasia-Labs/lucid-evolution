/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PoolMetadataHash class
 *
 * @since 2.0.0
 * @category Types
 */
export type PoolMetadataHash = CML.PoolMetadataHash;

/**
 * Error class for PoolMetadataHash operations
 * 
 * This error is thrown when operations on PoolMetadataHash instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PoolMetadataHashError extends Data.TaggedError("PoolMetadataHashError")<{
  message?: string;
}> {}

/**
 * Method free of PoolMetadataHash
 * 
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadataHash instance
 * const instance = ... ;
 *   const result = yield* PoolMetadataHash.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PoolMetadataHash): Effect.Effect<void, PoolMetadataHashError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PoolMetadataHashError({
          message: `PoolMetadataHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolMetadataHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadataHash.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadataHash.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PoolMetadataHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of PoolMetadataHash
 * 
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadataHash instance
 * const instance = ... ;
 *   const result = yield* PoolMetadataHash.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (instance: CML.PoolMetadataHash, prefix: string): Effect.Effect<string, PoolMetadataHashError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new PoolMetadataHashError({
          message: `PoolMetadataHash.toBech32 failed with parameters: ${prefix}. PoolMetadataHash is not valid for string conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 * 
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolMetadataHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadataHash.toBech32Unsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadataHash.toBech32Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.PoolMetadataHash, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of PoolMetadataHash
 * 
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PoolMetadataHash.fromBech32( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.PoolMetadataHash.from_bech32(bech32Str),
    catch: () => new PoolMetadataHashError({
      message: `PoolMetadataHash.fromBech32 failed with parameters: ${bech32Str}. `,
    }),
  });
});

/**
 * Unsafely calls PoolMetadataHash.fromBech32 without Effect wrapper
 * 
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadataHash.fromBech32Unsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadataHash.fromBech32Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of PoolMetadataHash
 * 
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadataHash instance
 * const instance = ... ;
 *   const result = yield* PoolMetadataHash.toRawBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.PoolMetadataHash): Effect.Effect<Uint8Array, PoolMetadataHashError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new PoolMetadataHashError({
          message: `PoolMetadataHash.toRawBytes failed PoolMetadataHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolMetadataHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadataHash.toRawBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadataHash.toRawBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.PoolMetadataHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of PoolMetadataHash
 * 
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PoolMetadataHash.fromRawBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PoolMetadataHash.from_raw_bytes(bytes),
    catch: () => new PoolMetadataHashError({
      message: `PoolMetadataHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls PoolMetadataHash.fromRawBytes without Effect wrapper
 * 
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadataHash.fromRawBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadataHash.fromRawBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of PoolMetadataHash
 * 
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadataHash instance
 * const instance = ... ;
 *   const result = yield* PoolMetadataHash.toHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.PoolMetadataHash): Effect.Effect<string, PoolMetadataHashError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new PoolMetadataHashError({
          message: `PoolMetadataHash.toHex failed PoolMetadataHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    })
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 * 
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolMetadataHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadataHash.toHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadataHash.toHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.PoolMetadataHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of PoolMetadataHash
 * 
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PoolMetadataHash.fromHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.PoolMetadataHash.from_hex(input),
    catch: () => new PoolMetadataHashError({
      message: `PoolMetadataHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
    }),
  });
});

/**
 * Unsafely calls PoolMetadataHash.fromHex without Effect wrapper
 * 
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadataHash.fromHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadataHash.fromHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string) =>
  Effect.runSync(fromHex(input));

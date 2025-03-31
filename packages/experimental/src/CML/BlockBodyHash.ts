/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML BlockBodyHash class
 *
 * @since 2.0.0
 * @category Types
 */
export type BlockBodyHash = CML.BlockBodyHash;

/**
 * Error class for BlockBodyHash operations
 * 
 * This error is thrown when operations on BlockBodyHash instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class BlockBodyHashError extends Data.TaggedError("BlockBodyHashError")<{
  message?: string;
}> {}

/**
 * Method free of BlockBodyHash
 * 
 * @example
 * import { BlockBodyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BlockBodyHash instance
 * const instance = ... ;
 *   const result = yield* BlockBodyHash.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.BlockBodyHash): Effect.Effect<void, BlockBodyHashError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new BlockBodyHashError({
          message: `BlockBodyHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { BlockBodyHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a BlockBodyHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BlockBodyHash.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BlockBodyHash.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.BlockBodyHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of BlockBodyHash
 * 
 * @example
 * import { BlockBodyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BlockBodyHash instance
 * const instance = ... ;
 *   const result = yield* BlockBodyHash.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (instance: CML.BlockBodyHash, prefix: string): Effect.Effect<string, BlockBodyHashError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new BlockBodyHashError({
          message: `BlockBodyHash.toBech32 failed with parameters: ${prefix}. BlockBodyHash is not valid for string conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 * 
 * @example
 * import { BlockBodyHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a BlockBodyHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BlockBodyHash.toBech32Unsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BlockBodyHash.toBech32Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.BlockBodyHash, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of BlockBodyHash
 * 
 * @example
 * import { BlockBodyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* BlockBodyHash.fromBech32( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.BlockBodyHash.from_bech32(bech32Str),
    catch: () => new BlockBodyHashError({
      message: `BlockBodyHash.fromBech32 failed with parameters: ${bech32Str}. `,
    }),
  });
});

/**
 * Unsafely calls BlockBodyHash.fromBech32 without Effect wrapper
 * 
 * @example
 * import { BlockBodyHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BlockBodyHash.fromBech32Unsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BlockBodyHash.fromBech32Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of BlockBodyHash
 * 
 * @example
 * import { BlockBodyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BlockBodyHash instance
 * const instance = ... ;
 *   const result = yield* BlockBodyHash.toRawBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.BlockBodyHash): Effect.Effect<Uint8Array, BlockBodyHashError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new BlockBodyHashError({
          message: `BlockBodyHash.toRawBytes failed BlockBodyHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @example
 * import { BlockBodyHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a BlockBodyHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BlockBodyHash.toRawBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BlockBodyHash.toRawBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.BlockBodyHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of BlockBodyHash
 * 
 * @example
 * import { BlockBodyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* BlockBodyHash.fromRawBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.BlockBodyHash.from_raw_bytes(bytes),
    catch: () => new BlockBodyHashError({
      message: `BlockBodyHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls BlockBodyHash.fromRawBytes without Effect wrapper
 * 
 * @example
 * import { BlockBodyHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BlockBodyHash.fromRawBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BlockBodyHash.fromRawBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of BlockBodyHash
 * 
 * @example
 * import { BlockBodyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BlockBodyHash instance
 * const instance = ... ;
 *   const result = yield* BlockBodyHash.toHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.BlockBodyHash): Effect.Effect<string, BlockBodyHashError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new BlockBodyHashError({
          message: `BlockBodyHash.toHex failed BlockBodyHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    })
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 * 
 * @example
 * import { BlockBodyHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a BlockBodyHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BlockBodyHash.toHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BlockBodyHash.toHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.BlockBodyHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of BlockBodyHash
 * 
 * @example
 * import { BlockBodyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* BlockBodyHash.fromHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.BlockBodyHash.from_hex(input),
    catch: () => new BlockBodyHashError({
      message: `BlockBodyHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
    }),
  });
});

/**
 * Unsafely calls BlockBodyHash.fromHex without Effect wrapper
 * 
 * @example
 * import { BlockBodyHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BlockBodyHash.fromHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BlockBodyHash.fromHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string) =>
  Effect.runSync(fromHex(input));

import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type BlockHeaderHash = CML.BlockHeaderHash;

export class BlockHeaderHashError extends Data.TaggedError("BlockHeaderHashError")<{
  message?: string;
}> {}

/**
 * Method free of BlockHeaderHash
 * 
 * @example
 * import { BlockHeaderHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BlockHeaderHash instance
 * const instance = ... ;
 *   const result = yield* BlockHeaderHash.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.BlockHeaderHash): Effect.Effect<void, BlockHeaderHashError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new BlockHeaderHashError({
          message: `BlockHeaderHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { BlockHeaderHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a BlockHeaderHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BlockHeaderHash.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BlockHeaderHash.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.BlockHeaderHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of BlockHeaderHash
 * 
 * @example
 * import { BlockHeaderHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BlockHeaderHash instance
 * const instance = ... ;
 *   const result = yield* BlockHeaderHash.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (instance: CML.BlockHeaderHash, prefix: string): Effect.Effect<string, BlockHeaderHashError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new BlockHeaderHashError({
          message: `BlockHeaderHash.toBech32 failed with parameters: ${prefix}. BlockHeaderHash is not valid for string conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 * 
 * @example
 * import { BlockHeaderHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a BlockHeaderHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BlockHeaderHash.unsafeToBech32(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BlockHeaderHash.unsafeToBech32 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToBech32 = (instance: CML.BlockHeaderHash, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of BlockHeaderHash
 * 
 * @example
 * import { BlockHeaderHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* BlockHeaderHash.fromBech32( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.BlockHeaderHash.from_bech32(bech32Str),
    catch: () => new BlockHeaderHashError({
      message: `BlockHeaderHash.fromBech32 failed with parameters: ${bech32Str}. `,
    }),
  });
});

/**
 * Unsafely calls BlockHeaderHash.fromBech32 without Effect wrapper
 * 
 * @example
 * import { BlockHeaderHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BlockHeaderHash.unsafeFromBech32( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BlockHeaderHash.unsafeFromBech32 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromBech32 = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of BlockHeaderHash
 * 
 * @example
 * import { BlockHeaderHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BlockHeaderHash instance
 * const instance = ... ;
 *   const result = yield* BlockHeaderHash.toRawBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.BlockHeaderHash): Effect.Effect<Uint8Array, BlockHeaderHashError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new BlockHeaderHashError({
          message: `BlockHeaderHash.toRawBytes failed BlockHeaderHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @example
 * import { BlockHeaderHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a BlockHeaderHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BlockHeaderHash.unsafeToRawBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BlockHeaderHash.unsafeToRawBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawBytes = (instance: CML.BlockHeaderHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of BlockHeaderHash
 * 
 * @example
 * import { BlockHeaderHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* BlockHeaderHash.fromRawBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.BlockHeaderHash.from_raw_bytes(bytes),
    catch: () => new BlockHeaderHashError({
      message: `BlockHeaderHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls BlockHeaderHash.fromRawBytes without Effect wrapper
 * 
 * @example
 * import { BlockHeaderHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BlockHeaderHash.unsafeFromRawBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BlockHeaderHash.unsafeFromRawBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromRawBytes = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of BlockHeaderHash
 * 
 * @example
 * import { BlockHeaderHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BlockHeaderHash instance
 * const instance = ... ;
 *   const result = yield* BlockHeaderHash.toHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.BlockHeaderHash): Effect.Effect<string, BlockHeaderHashError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new BlockHeaderHashError({
          message: `BlockHeaderHash.toHex failed BlockHeaderHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    })
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 * 
 * @example
 * import { BlockHeaderHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a BlockHeaderHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BlockHeaderHash.unsafeToHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BlockHeaderHash.unsafeToHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToHex = (instance: CML.BlockHeaderHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of BlockHeaderHash
 * 
 * @example
 * import { BlockHeaderHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* BlockHeaderHash.fromHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.BlockHeaderHash.from_hex(input),
    catch: () => new BlockHeaderHashError({
      message: `BlockHeaderHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
    }),
  });
});

/**
 * Unsafely calls BlockHeaderHash.fromHex without Effect wrapper
 * 
 * @example
 * import { BlockHeaderHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = BlockHeaderHash.unsafeFromHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BlockHeaderHash.unsafeFromHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromHex = (input: string) =>
  Effect.runSync(fromHex(input));

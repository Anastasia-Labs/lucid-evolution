/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML BlockHeaderHash class
 *
 * @since 2.0.0
 * @category Types
 */
export type BlockHeaderHash = CML.BlockHeaderHash;

/**
 * Error class for BlockHeaderHash operations
 * 
 * This error is thrown when operations on BlockHeaderHash instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class BlockHeaderHashError extends Data.TaggedError("BlockHeaderHashError")<{
  message?: string;
}> {}

/**
 * Method free of BlockHeaderHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.BlockHeaderHash) => Effect.Effect<void, BlockHeaderHashError> = Effect.fn(
  (instance: CML.BlockHeaderHash) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.BlockHeaderHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of BlockHeaderHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32: (instance: CML.BlockHeaderHash, prefix: string) => Effect.Effect<string, BlockHeaderHashError> = Effect.fn(
  (instance: CML.BlockHeaderHash, prefix: string) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.BlockHeaderHash, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of BlockHeaderHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32: (bech32Str: string) => Effect.Effect<CML.BlockHeaderHash, BlockHeaderHashError> = Effect.fn(function* (bech32Str: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string): CML.BlockHeaderHash =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of BlockHeaderHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (instance: CML.BlockHeaderHash) => Effect.Effect<Uint8Array, BlockHeaderHashError> = Effect.fn(
  (instance: CML.BlockHeaderHash) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.BlockHeaderHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of BlockHeaderHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.BlockHeaderHash, BlockHeaderHashError> = Effect.fn(function* (bytes: Uint8Array) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.BlockHeaderHash =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of BlockHeaderHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (instance: CML.BlockHeaderHash) => Effect.Effect<string, BlockHeaderHashError> = Effect.fn(
  (instance: CML.BlockHeaderHash) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.BlockHeaderHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of BlockHeaderHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (input: string) => Effect.Effect<CML.BlockHeaderHash, BlockHeaderHashError> = Effect.fn(function* (input: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.BlockHeaderHash =>
  Effect.runSync(fromHex(input));

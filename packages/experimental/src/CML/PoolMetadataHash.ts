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
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.PoolMetadataHash) => Effect.Effect<void, PoolMetadataHashError> = Effect.fn(
  (instance: CML.PoolMetadataHash) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PoolMetadataHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of PoolMetadataHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32: (instance: CML.PoolMetadataHash, prefix: string) => Effect.Effect<string, PoolMetadataHashError> = Effect.fn(
  (instance: CML.PoolMetadataHash, prefix: string) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.PoolMetadataHash, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of PoolMetadataHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32: (bech32Str: string) => Effect.Effect<CML.PoolMetadataHash, PoolMetadataHashError> = Effect.fn(function* (bech32Str: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string): CML.PoolMetadataHash =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of PoolMetadataHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (instance: CML.PoolMetadataHash) => Effect.Effect<Uint8Array, PoolMetadataHashError> = Effect.fn(
  (instance: CML.PoolMetadataHash) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.PoolMetadataHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of PoolMetadataHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.PoolMetadataHash, PoolMetadataHashError> = Effect.fn(function* (bytes: Uint8Array) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.PoolMetadataHash =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of PoolMetadataHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (instance: CML.PoolMetadataHash) => Effect.Effect<string, PoolMetadataHashError> = Effect.fn(
  (instance: CML.PoolMetadataHash) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.PoolMetadataHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of PoolMetadataHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (input: string) => Effect.Effect<CML.PoolMetadataHash, PoolMetadataHashError> = Effect.fn(function* (input: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.PoolMetadataHash =>
  Effect.runSync(fromHex(input));

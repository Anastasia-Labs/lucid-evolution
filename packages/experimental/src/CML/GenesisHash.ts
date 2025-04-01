/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML GenesisHash class
 *
 * @since 2.0.0
 * @category Types
 */
export type GenesisHash = CML.GenesisHash;

/**
 * Error class for GenesisHash operations
 * 
 * This error is thrown when operations on GenesisHash instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class GenesisHashError extends Data.TaggedError("GenesisHashError")<{
  message?: string;
}> {}

/**
 * Method free of GenesisHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.GenesisHash) => Effect.Effect<void, GenesisHashError> = Effect.fn(
  (instance: CML.GenesisHash) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new GenesisHashError({
          message: `GenesisHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.GenesisHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of GenesisHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32: (instance: CML.GenesisHash, prefix: string) => Effect.Effect<string, GenesisHashError> = Effect.fn(
  (instance: CML.GenesisHash, prefix: string) =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new GenesisHashError({
          message: `GenesisHash.toBech32 failed with parameters: ${prefix}. GenesisHash is not valid for string conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.GenesisHash, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of GenesisHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32: (bech32Str: string) => Effect.Effect<CML.GenesisHash, GenesisHashError> = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.GenesisHash.from_bech32(bech32Str),
    catch: () => new GenesisHashError({
      message: `GenesisHash.fromBech32 failed with parameters: ${bech32Str}. `,
    }),
  });
});

/**
 * Unsafely calls GenesisHash.fromBech32 without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string): CML.GenesisHash =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of GenesisHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (instance: CML.GenesisHash) => Effect.Effect<Uint8Array, GenesisHashError> = Effect.fn(
  (instance: CML.GenesisHash) =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new GenesisHashError({
          message: `GenesisHash.toRawBytes failed GenesisHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.GenesisHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of GenesisHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.GenesisHash, GenesisHashError> = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.GenesisHash.from_raw_bytes(bytes),
    catch: () => new GenesisHashError({
      message: `GenesisHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls GenesisHash.fromRawBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.GenesisHash =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of GenesisHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (instance: CML.GenesisHash) => Effect.Effect<string, GenesisHashError> = Effect.fn(
  (instance: CML.GenesisHash) =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new GenesisHashError({
          message: `GenesisHash.toHex failed GenesisHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    })
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.GenesisHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of GenesisHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (input: string) => Effect.Effect<CML.GenesisHash, GenesisHashError> = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.GenesisHash.from_hex(input),
    catch: () => new GenesisHashError({
      message: `GenesisHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
    }),
  });
});

/**
 * Unsafely calls GenesisHash.fromHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.GenesisHash =>
  Effect.runSync(fromHex(input));

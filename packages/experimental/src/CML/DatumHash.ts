/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML DatumHash class
 *
 * @since 2.0.0
 * @category Types
 */
export type DatumHash = CML.DatumHash;

/**
 * Error class for DatumHash operations
 * 
 * This error is thrown when operations on DatumHash instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class DatumHashError extends Data.TaggedError("DatumHashError")<{
  message?: string;
}> {}

/**
 * Method free of DatumHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.DatumHash) => Effect.Effect<void, DatumHashError> = Effect.fn(
  (instance: CML.DatumHash) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new DatumHashError({
          message: `DatumHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.DatumHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of DatumHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32: (instance: CML.DatumHash, prefix: string) => Effect.Effect<string, DatumHashError> = Effect.fn(
  (instance: CML.DatumHash, prefix: string) =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new DatumHashError({
          message: `DatumHash.toBech32 failed with parameters: ${prefix}. DatumHash is not valid for string conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.DatumHash, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of DatumHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32: (bech32Str: string) => Effect.Effect<CML.DatumHash, DatumHashError> = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.DatumHash.from_bech32(bech32Str),
    catch: () => new DatumHashError({
      message: `DatumHash.fromBech32 failed with parameters: ${bech32Str}. `,
    }),
  });
});

/**
 * Unsafely calls DatumHash.fromBech32 without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string): CML.DatumHash =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of DatumHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (instance: CML.DatumHash) => Effect.Effect<Uint8Array, DatumHashError> = Effect.fn(
  (instance: CML.DatumHash) =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new DatumHashError({
          message: `DatumHash.toRawBytes failed DatumHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.DatumHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of DatumHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.DatumHash, DatumHashError> = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.DatumHash.from_raw_bytes(bytes),
    catch: () => new DatumHashError({
      message: `DatumHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls DatumHash.fromRawBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.DatumHash =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of DatumHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (instance: CML.DatumHash) => Effect.Effect<string, DatumHashError> = Effect.fn(
  (instance: CML.DatumHash) =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new DatumHashError({
          message: `DatumHash.toHex failed DatumHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    })
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.DatumHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of DatumHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (input: string) => Effect.Effect<CML.DatumHash, DatumHashError> = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.DatumHash.from_hex(input),
    catch: () => new DatumHashError({
      message: `DatumHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
    }),
  });
});

/**
 * Unsafely calls DatumHash.fromHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.DatumHash =>
  Effect.runSync(fromHex(input));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML NonceHash class
 *
 * @since 2.0.0
 * @category Types
 */
export type NonceHash = CML.NonceHash;

/**
 * Error class for NonceHash operations
 * 
 * This error is thrown when operations on NonceHash instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class NonceHashError extends Data.TaggedError("NonceHashError")<{
  message?: string;
}> {}

/**
 * Method free of NonceHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.NonceHash) => Effect.Effect<void, NonceHashError> = Effect.fn(
  (instance: CML.NonceHash) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.NonceHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of NonceHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32: (instance: CML.NonceHash, prefix: string) => Effect.Effect<string, NonceHashError> = Effect.fn(
  (instance: CML.NonceHash, prefix: string) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.NonceHash, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of NonceHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32: (bech32Str: string) => Effect.Effect<CML.NonceHash, NonceHashError> = Effect.fn(function* (bech32Str: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string): CML.NonceHash =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of NonceHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (instance: CML.NonceHash) => Effect.Effect<Uint8Array, NonceHashError> = Effect.fn(
  (instance: CML.NonceHash) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.NonceHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of NonceHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.NonceHash, NonceHashError> = Effect.fn(function* (bytes: Uint8Array) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.NonceHash =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of NonceHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (instance: CML.NonceHash) => Effect.Effect<string, NonceHashError> = Effect.fn(
  (instance: CML.NonceHash) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.NonceHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of NonceHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (input: string) => Effect.Effect<CML.NonceHash, NonceHashError> = Effect.fn(function* (input: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.NonceHash =>
  Effect.runSync(fromHex(input));

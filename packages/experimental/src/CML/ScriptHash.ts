/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ScriptHash class
 *
 * @since 2.0.0
 * @category Types
 */
export type ScriptHash = CML.ScriptHash;

/**
 * Error class for ScriptHash operations
 * 
 * This error is thrown when operations on ScriptHash instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ScriptHashError extends Data.TaggedError("ScriptHashError")<{
  message?: string;
}> {}

/**
 * Method free of ScriptHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.ScriptHash) => Effect.Effect<void, ScriptHashError> = Effect.fn(
  (instance: CML.ScriptHash) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptHashError({
          message: `ScriptHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ScriptHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of ScriptHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32: (instance: CML.ScriptHash, prefix: string) => Effect.Effect<string, ScriptHashError> = Effect.fn(
  (instance: CML.ScriptHash, prefix: string) =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new ScriptHashError({
          message: `ScriptHash.toBech32 failed with parameters: ${prefix}. ScriptHash is not valid for string conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.ScriptHash, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of ScriptHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32: (bech32Str: string) => Effect.Effect<CML.ScriptHash, ScriptHashError> = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.ScriptHash.from_bech32(bech32Str),
    catch: () => new ScriptHashError({
      message: `ScriptHash.fromBech32 failed with parameters: ${bech32Str}. `,
    }),
  });
});

/**
 * Unsafely calls ScriptHash.fromBech32 without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string): CML.ScriptHash =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of ScriptHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (instance: CML.ScriptHash) => Effect.Effect<Uint8Array, ScriptHashError> = Effect.fn(
  (instance: CML.ScriptHash) =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new ScriptHashError({
          message: `ScriptHash.toRawBytes failed ScriptHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.ScriptHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of ScriptHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.ScriptHash, ScriptHashError> = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ScriptHash.from_raw_bytes(bytes),
    catch: () => new ScriptHashError({
      message: `ScriptHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls ScriptHash.fromRawBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.ScriptHash =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of ScriptHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (instance: CML.ScriptHash) => Effect.Effect<string, ScriptHashError> = Effect.fn(
  (instance: CML.ScriptHash) =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new ScriptHashError({
          message: `ScriptHash.toHex failed ScriptHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    })
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.ScriptHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of ScriptHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (input: string) => Effect.Effect<CML.ScriptHash, ScriptHashError> = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.ScriptHash.from_hex(input),
    catch: () => new ScriptHashError({
      message: `ScriptHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
    }),
  });
});

/**
 * Unsafely calls ScriptHash.fromHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.ScriptHash =>
  Effect.runSync(fromHex(input));

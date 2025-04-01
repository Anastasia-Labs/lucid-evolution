/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionHash class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionHash = CML.TransactionHash;

/**
 * Error class for TransactionHash operations
 *
 * This error is thrown when operations on TransactionHash instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionHashError extends Data.TaggedError(
  "TransactionHashError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionHash
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.TransactionHash,
) => Effect.Effect<void, TransactionHashError> = Effect.fn(
  (instance: CML.TransactionHash) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionHashError({
          message: `TransactionHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of TransactionHash
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32: (
  instance: CML.TransactionHash,
  prefix: string,
) => Effect.Effect<string, TransactionHashError> = Effect.fn(
  (instance: CML.TransactionHash, prefix: string) =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new TransactionHashError({
          message: `TransactionHash.toBech32 failed with parameters: ${prefix}. TransactionHash is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (
  instance: CML.TransactionHash,
  prefix: string,
): string => Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of TransactionHash
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.TransactionHash, TransactionHashError> = Effect.fn(
  function* (bech32Str: string) {
    return yield* Effect.try({
      try: () => CML.TransactionHash.from_bech32(bech32Str),
      catch: () =>
        new TransactionHashError({
          message: `TransactionHash.fromBech32 failed with parameters: ${bech32Str}. `,
        }),
    });
  },
);

/**
 * Unsafely calls TransactionHash.fromBech32 without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string): CML.TransactionHash =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of TransactionHash
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (
  instance: CML.TransactionHash,
) => Effect.Effect<Uint8Array, TransactionHashError> = Effect.fn(
  (instance: CML.TransactionHash) =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new TransactionHashError({
          message: `TransactionHash.toRawBytes failed TransactionHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.TransactionHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of TransactionHash
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.TransactionHash, TransactionHashError> = Effect.fn(
  function* (bytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.TransactionHash.from_raw_bytes(bytes),
      catch: () =>
        new TransactionHashError({
          message: `TransactionHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls TransactionHash.fromRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.TransactionHash =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of TransactionHash
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (
  instance: CML.TransactionHash,
) => Effect.Effect<string, TransactionHashError> = Effect.fn(
  (instance: CML.TransactionHash) =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new TransactionHashError({
          message: `TransactionHash.toHex failed TransactionHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.TransactionHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of TransactionHash
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (
  input: string,
) => Effect.Effect<CML.TransactionHash, TransactionHashError> = Effect.fn(
  function* (input: string) {
    return yield* Effect.try({
      try: () => CML.TransactionHash.from_hex(input),
      catch: () =>
        new TransactionHashError({
          message: `TransactionHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
        }),
    });
  },
);

/**
 * Unsafely calls TransactionHash.fromHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.TransactionHash =>
  Effect.runSync(fromHex(input));

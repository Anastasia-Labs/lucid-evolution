/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML AuxiliaryDataHash class
 *
 * @since 2.0.0
 * @category Types
 */
export type AuxiliaryDataHash = CML.AuxiliaryDataHash;

/**
 * Error class for AuxiliaryDataHash operations
 *
 * This error is thrown when operations on AuxiliaryDataHash instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class AuxiliaryDataHashError extends Data.TaggedError(
  "AuxiliaryDataHashError",
)<{
  message?: string;
}> {}

/**
 * Method free of AuxiliaryDataHash
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.AuxiliaryDataHash,
) => Effect.Effect<void, AuxiliaryDataHashError> = Effect.fn(
  (instance: CML.AuxiliaryDataHash) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new AuxiliaryDataHashError({
          message: `AuxiliaryDataHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.AuxiliaryDataHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of AuxiliaryDataHash
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32: (
  instance: CML.AuxiliaryDataHash,
  prefix: string,
) => Effect.Effect<string, AuxiliaryDataHashError> = Effect.fn(
  (instance: CML.AuxiliaryDataHash, prefix: string) =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new AuxiliaryDataHashError({
          message: `AuxiliaryDataHash.toBech32 failed with parameters: ${prefix}. AuxiliaryDataHash is not valid for string conversion. `,
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
  instance: CML.AuxiliaryDataHash,
  prefix: string,
): string => Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of AuxiliaryDataHash
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.AuxiliaryDataHash, AuxiliaryDataHashError> = Effect.fn(
  function* (bech32Str: string) {
    return yield* Effect.try({
      try: () => CML.AuxiliaryDataHash.from_bech32(bech32Str),
      catch: () =>
        new AuxiliaryDataHashError({
          message: `AuxiliaryDataHash.fromBech32 failed with parameters: ${bech32Str}. `,
        }),
    });
  },
);

/**
 * Unsafely calls AuxiliaryDataHash.fromBech32 without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string): CML.AuxiliaryDataHash =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of AuxiliaryDataHash
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (
  instance: CML.AuxiliaryDataHash,
) => Effect.Effect<Uint8Array, AuxiliaryDataHashError> = Effect.fn(
  (instance: CML.AuxiliaryDataHash) =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new AuxiliaryDataHashError({
          message: `AuxiliaryDataHash.toRawBytes failed AuxiliaryDataHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.AuxiliaryDataHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of AuxiliaryDataHash
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.AuxiliaryDataHash, AuxiliaryDataHashError> = Effect.fn(
  function* (bytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.AuxiliaryDataHash.from_raw_bytes(bytes),
      catch: () =>
        new AuxiliaryDataHashError({
          message: `AuxiliaryDataHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls AuxiliaryDataHash.fromRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.AuxiliaryDataHash =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of AuxiliaryDataHash
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (
  instance: CML.AuxiliaryDataHash,
) => Effect.Effect<string, AuxiliaryDataHashError> = Effect.fn(
  (instance: CML.AuxiliaryDataHash) =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new AuxiliaryDataHashError({
          message: `AuxiliaryDataHash.toHex failed AuxiliaryDataHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.AuxiliaryDataHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of AuxiliaryDataHash
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (
  input: string,
) => Effect.Effect<CML.AuxiliaryDataHash, AuxiliaryDataHashError> = Effect.fn(
  function* (input: string) {
    return yield* Effect.try({
      try: () => CML.AuxiliaryDataHash.from_hex(input),
      catch: () =>
        new AuxiliaryDataHashError({
          message: `AuxiliaryDataHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
        }),
    });
  },
);

/**
 * Unsafely calls AuxiliaryDataHash.fromHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.AuxiliaryDataHash =>
  Effect.runSync(fromHex(input));

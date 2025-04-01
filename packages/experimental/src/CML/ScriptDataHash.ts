/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ScriptDataHash class
 *
 * @since 2.0.0
 * @category Types
 */
export type ScriptDataHash = CML.ScriptDataHash;

/**
 * Error class for ScriptDataHash operations
 *
 * This error is thrown when operations on ScriptDataHash instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ScriptDataHashError extends Data.TaggedError(
  "ScriptDataHashError",
)<{
  message?: string;
}> {}

/**
 * Method free of ScriptDataHash
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.ScriptDataHash,
) => Effect.Effect<void, ScriptDataHashError> = Effect.fn(
  (instance: CML.ScriptDataHash) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptDataHashError({
          message: `ScriptDataHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ScriptDataHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of ScriptDataHash
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32: (
  instance: CML.ScriptDataHash,
  prefix: string,
) => Effect.Effect<string, ScriptDataHashError> = Effect.fn(
  (instance: CML.ScriptDataHash, prefix: string) =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new ScriptDataHashError({
          message: `ScriptDataHash.toBech32 failed with parameters: ${prefix}. ScriptDataHash is not valid for string conversion. `,
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
  instance: CML.ScriptDataHash,
  prefix: string,
): string => Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of ScriptDataHash
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.ScriptDataHash, ScriptDataHashError> = Effect.fn(
  function* (bech32Str: string) {
    return yield* Effect.try({
      try: () => CML.ScriptDataHash.from_bech32(bech32Str),
      catch: () =>
        new ScriptDataHashError({
          message: `ScriptDataHash.fromBech32 failed with parameters: ${bech32Str}. `,
        }),
    });
  },
);

/**
 * Unsafely calls ScriptDataHash.fromBech32 without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string): CML.ScriptDataHash =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of ScriptDataHash
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (
  instance: CML.ScriptDataHash,
) => Effect.Effect<Uint8Array, ScriptDataHashError> = Effect.fn(
  (instance: CML.ScriptDataHash) =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new ScriptDataHashError({
          message: `ScriptDataHash.toRawBytes failed ScriptDataHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.ScriptDataHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of ScriptDataHash
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.ScriptDataHash, ScriptDataHashError> = Effect.fn(
  function* (bytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.ScriptDataHash.from_raw_bytes(bytes),
      catch: () =>
        new ScriptDataHashError({
          message: `ScriptDataHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls ScriptDataHash.fromRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.ScriptDataHash =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of ScriptDataHash
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (
  instance: CML.ScriptDataHash,
) => Effect.Effect<string, ScriptDataHashError> = Effect.fn(
  (instance: CML.ScriptDataHash) =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new ScriptDataHashError({
          message: `ScriptDataHash.toHex failed ScriptDataHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.ScriptDataHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of ScriptDataHash
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (
  input: string,
) => Effect.Effect<CML.ScriptDataHash, ScriptDataHashError> = Effect.fn(
  function* (input: string) {
    return yield* Effect.try({
      try: () => CML.ScriptDataHash.from_hex(input),
      catch: () =>
        new ScriptDataHashError({
          message: `ScriptDataHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
        }),
    });
  },
);

/**
 * Unsafely calls ScriptDataHash.fromHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.ScriptDataHash =>
  Effect.runSync(fromHex(input));

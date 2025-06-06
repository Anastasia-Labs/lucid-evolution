/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML KESVkey class
 *
 * @since 2.0.0
 * @category Types
 */
export type KESVkey = CML.KESVkey;

/**
 * Error class for KESVkey operations
 *
 * This error is thrown when operations on KESVkey instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class KESVkeyError extends Data.TaggedError("KESVkeyError")<{
  message?: string;
}> {}

/**
 * Method free of KESVkey
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.KESVkey,
) => Effect.Effect<void, KESVkeyError> = Effect.fn((instance: CML.KESVkey) =>
  Effect.try({
    try: () => instance.free(),
    catch: () =>
      new KESVkeyError({
        message: `KESVkey.free failed Hint: Check if you're calling free() more than once.`,
      }),
  }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.KESVkey): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of KESVkey
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32: (
  instance: CML.KESVkey,
  prefix: string,
) => Effect.Effect<string, KESVkeyError> = Effect.fn(
  (instance: CML.KESVkey, prefix: string) =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new KESVkeyError({
          message: `KESVkey.toBech32 failed with parameters: ${prefix}. KESVkey is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.KESVkey, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of KESVkey
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.KESVkey, KESVkeyError> = Effect.fn(function* (
  bech32Str: string,
) {
  return yield* Effect.try({
    try: () => CML.KESVkey.from_bech32(bech32Str),
    catch: () =>
      new KESVkeyError({
        message: `KESVkey.fromBech32 failed with parameters: ${bech32Str}. `,
      }),
  });
});

/**
 * Unsafely calls KESVkey.fromBech32 without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string): CML.KESVkey =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of KESVkey
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (
  instance: CML.KESVkey,
) => Effect.Effect<Uint8Array, KESVkeyError> = Effect.fn(
  (instance: CML.KESVkey) =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new KESVkeyError({
          message: `KESVkey.toRawBytes failed KESVkey is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.KESVkey): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of KESVkey
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.KESVkey, KESVkeyError> = Effect.fn(function* (
  bytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.KESVkey.from_raw_bytes(bytes),
    catch: () =>
      new KESVkeyError({
        message: `KESVkey.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls KESVkey.fromRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.KESVkey =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of KESVkey
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (
  instance: CML.KESVkey,
) => Effect.Effect<string, KESVkeyError> = Effect.fn((instance: CML.KESVkey) =>
  Effect.try({
    try: () => instance.to_hex(),
    catch: () =>
      new KESVkeyError({
        message: `KESVkey.toHex failed KESVkey is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.KESVkey): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of KESVkey
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (
  input: string,
) => Effect.Effect<CML.KESVkey, KESVkeyError> = Effect.fn(function* (
  input: string,
) {
  return yield* Effect.try({
    try: () => CML.KESVkey.from_hex(input),
    catch: () =>
      new KESVkeyError({
        message: `KESVkey.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
      }),
  });
});

/**
 * Unsafely calls KESVkey.fromHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.KESVkey =>
  Effect.runSync(fromHex(input));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Ed25519Signature class
 *
 * @since 2.0.0
 * @category Types
 */
export type Ed25519Signature = CML.Ed25519Signature;

/**
 * Error class for Ed25519Signature operations
 *
 * This error is thrown when operations on Ed25519Signature instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class Ed25519SignatureError extends Data.TaggedError(
  "Ed25519SignatureError",
)<{
  message?: string;
}> {}

/**
 * Method free of Ed25519Signature
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.Ed25519Signature,
) => Effect.Effect<void, Ed25519SignatureError> = Effect.fn(
  (instance: CML.Ed25519Signature) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new Ed25519SignatureError({
          message: `Ed25519Signature.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Ed25519Signature): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of Ed25519Signature
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32: (
  instance: CML.Ed25519Signature,
) => Effect.Effect<string, Ed25519SignatureError> = Effect.fn(
  (instance: CML.Ed25519Signature) =>
    Effect.try({
      try: () => instance.to_bech32(),
      catch: () =>
        new Ed25519SignatureError({
          message: `Ed25519Signature.toBech32 failed Ed25519Signature is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.Ed25519Signature): string =>
  Effect.runSync(toBech32(instance));

/**
 * Static method fromBech32 of Ed25519Signature
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32: (
  bech32Str: string,
) => Effect.Effect<CML.Ed25519Signature, Ed25519SignatureError> = Effect.fn(
  function* (bech32Str: string) {
    return yield* Effect.try({
      try: () => CML.Ed25519Signature.from_bech32(bech32Str),
      catch: () =>
        new Ed25519SignatureError({
          message: `Ed25519Signature.fromBech32 failed with parameters: ${bech32Str}. `,
        }),
    });
  },
);

/**
 * Unsafely calls Ed25519Signature.fromBech32 without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string): CML.Ed25519Signature =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of Ed25519Signature
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (
  instance: CML.Ed25519Signature,
) => Effect.Effect<Uint8Array, Ed25519SignatureError> = Effect.fn(
  (instance: CML.Ed25519Signature) =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new Ed25519SignatureError({
          message: `Ed25519Signature.toRawBytes failed Ed25519Signature is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.Ed25519Signature): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of Ed25519Signature
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.Ed25519Signature, Ed25519SignatureError> = Effect.fn(
  function* (bytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.Ed25519Signature.from_raw_bytes(bytes),
      catch: () =>
        new Ed25519SignatureError({
          message: `Ed25519Signature.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls Ed25519Signature.fromRawBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.Ed25519Signature =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of Ed25519Signature
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (
  instance: CML.Ed25519Signature,
) => Effect.Effect<string, Ed25519SignatureError> = Effect.fn(
  (instance: CML.Ed25519Signature) =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new Ed25519SignatureError({
          message: `Ed25519Signature.toHex failed Ed25519Signature is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.Ed25519Signature): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of Ed25519Signature
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (
  input: string,
) => Effect.Effect<CML.Ed25519Signature, Ed25519SignatureError> = Effect.fn(
  function* (input: string) {
    return yield* Effect.try({
      try: () => CML.Ed25519Signature.from_hex(input),
      catch: () =>
        new Ed25519SignatureError({
          message: `Ed25519Signature.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
        }),
    });
  },
);

/**
 * Unsafely calls Ed25519Signature.fromHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.Ed25519Signature =>
  Effect.runSync(fromHex(input));

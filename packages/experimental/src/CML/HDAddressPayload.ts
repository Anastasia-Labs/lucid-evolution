/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML HDAddressPayload class
 *
 * @since 2.0.0
 * @category Types
 */
export type HDAddressPayload = CML.HDAddressPayload;

/**
 * Error class for HDAddressPayload operations
 *
 * This error is thrown when operations on HDAddressPayload instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class HDAddressPayloadError extends Data.TaggedError(
  "HDAddressPayloadError",
)<{
  message?: string;
}> {}

/**
 * Method free of HDAddressPayload
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.HDAddressPayload,
) => Effect.Effect<void, HDAddressPayloadError> = Effect.fn(
  (instance: CML.HDAddressPayload) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new HDAddressPayloadError({
          message: `HDAddressPayload.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.HDAddressPayload): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of HDAddressPayload
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.HDAddressPayload,
) => Effect.Effect<Uint8Array, HDAddressPayloadError> = Effect.fn(
  (instance: CML.HDAddressPayload) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new HDAddressPayloadError({
          message: `HDAddressPayload.toCborBytes failed HDAddressPayload is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.HDAddressPayload): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of HDAddressPayload
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.HDAddressPayload, HDAddressPayloadError> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.HDAddressPayload.from_cbor_bytes(cborBytes),
      catch: () =>
        new HDAddressPayloadError({
          message: `HDAddressPayload.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls HDAddressPayload.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.HDAddressPayload => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of HDAddressPayload
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.HDAddressPayload,
) => Effect.Effect<string, HDAddressPayloadError> = Effect.fn(
  (instance: CML.HDAddressPayload) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new HDAddressPayloadError({
          message: `HDAddressPayload.toCborHex failed HDAddressPayload is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.HDAddressPayload): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of HDAddressPayload
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.HDAddressPayload, HDAddressPayloadError> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.HDAddressPayload.from_cbor_hex(cborBytes),
      catch: () =>
        new HDAddressPayloadError({
          message: `HDAddressPayload.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls HDAddressPayload.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.HDAddressPayload =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method get of HDAddressPayload
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.HDAddressPayload,
) => Effect.Effect<Uint8Array, HDAddressPayloadError> = Effect.fn(
  (instance: CML.HDAddressPayload) =>
    Effect.try({
      try: () => instance.get(),
      catch: () =>
        new HDAddressPayloadError({
          message: `HDAddressPayload.get failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.HDAddressPayload): Uint8Array =>
  Effect.runSync(get(instance));

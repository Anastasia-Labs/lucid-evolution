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
export class HDAddressPayloadError extends Data.TaggedError("HDAddressPayloadError")<{
  message?: string;
}> {}

/**
 * Method free of HDAddressPayload
 * 
 * @example
 * import { HDAddressPayload } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HDAddressPayload instance
 * const instance = ... ;
 *   const result = yield* HDAddressPayload.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.HDAddressPayload): Effect.Effect<void, HDAddressPayloadError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new HDAddressPayloadError({
          message: `HDAddressPayload.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { HDAddressPayload } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HDAddressPayload instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HDAddressPayload.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HDAddressPayload.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.HDAddressPayload): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of HDAddressPayload
 * 
 * @example
 * import { HDAddressPayload } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HDAddressPayload instance
 * const instance = ... ;
 *   const result = yield* HDAddressPayload.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.HDAddressPayload): Effect.Effect<Uint8Array, HDAddressPayloadError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new HDAddressPayloadError({
          message: `HDAddressPayload.toCborBytes failed HDAddressPayload is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { HDAddressPayload } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HDAddressPayload instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HDAddressPayload.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HDAddressPayload.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.HDAddressPayload): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of HDAddressPayload
 * 
 * @example
 * import { HDAddressPayload } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* HDAddressPayload.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.HDAddressPayload.from_cbor_bytes(cborBytes),
    catch: () => new HDAddressPayloadError({
      message: `HDAddressPayload.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls HDAddressPayload.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { HDAddressPayload } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HDAddressPayload.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HDAddressPayload.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of HDAddressPayload
 * 
 * @example
 * import { HDAddressPayload } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HDAddressPayload instance
 * const instance = ... ;
 *   const result = yield* HDAddressPayload.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.HDAddressPayload): Effect.Effect<string, HDAddressPayloadError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new HDAddressPayloadError({
          message: `HDAddressPayload.toCborHex failed HDAddressPayload is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { HDAddressPayload } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HDAddressPayload instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HDAddressPayload.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HDAddressPayload.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.HDAddressPayload): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of HDAddressPayload
 * 
 * @example
 * import { HDAddressPayload } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* HDAddressPayload.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.HDAddressPayload.from_cbor_hex(cborBytes),
    catch: () => new HDAddressPayloadError({
      message: `HDAddressPayload.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls HDAddressPayload.fromCborHex without Effect wrapper
 * 
 * @example
 * import { HDAddressPayload } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HDAddressPayload.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HDAddressPayload.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method get of HDAddressPayload
 * 
 * @example
 * import { HDAddressPayload } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a HDAddressPayload instance
 * const instance = ... ;
 *   const result = yield* HDAddressPayload.get(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.HDAddressPayload): Effect.Effect<Uint8Array, HDAddressPayloadError> =>
    Effect.try({
      try: () => instance.get(),
      catch: () =>
        new HDAddressPayloadError({
          message: `HDAddressPayload.get failed `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { HDAddressPayload } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a HDAddressPayload instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = HDAddressPayload.getUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`HDAddressPayload.getUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.HDAddressPayload): Uint8Array =>
  Effect.runSync(get(instance));

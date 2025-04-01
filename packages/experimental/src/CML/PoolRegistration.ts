/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PoolRegistration class
 *
 * @since 2.0.0
 * @category Types
 */
export type PoolRegistration = CML.PoolRegistration;

/**
 * Error class for PoolRegistration operations
 *
 * This error is thrown when operations on PoolRegistration instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PoolRegistrationError extends Data.TaggedError(
  "PoolRegistrationError",
)<{
  message?: string;
}> {}

/**
 * Method free of PoolRegistration
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRegistration instance
 * const instance = ... ;
 *   const result = yield* PoolRegistration.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.PoolRegistration,
  ): Effect.Effect<void, PoolRegistrationError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PoolRegistrationError({
          message: `PoolRegistration.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PoolRegistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRegistration.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRegistration.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PoolRegistration): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of PoolRegistration
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRegistration instance
 * const instance = ... ;
 *   const result = yield* PoolRegistration.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.PoolRegistration,
  ): Effect.Effect<Uint8Array, PoolRegistrationError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new PoolRegistrationError({
          message: `PoolRegistration.toCborBytes failed PoolRegistration is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PoolRegistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRegistration.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRegistration.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.PoolRegistration): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PoolRegistration
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRegistration instance
 * const instance = ... ;
 *   const result = yield* PoolRegistration.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.PoolRegistration,
  ): Effect.Effect<Uint8Array, PoolRegistrationError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new PoolRegistrationError({
          message: `PoolRegistration.toCanonicalCborBytes failed PoolRegistration is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PoolRegistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRegistration.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRegistration.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.PoolRegistration,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PoolRegistration
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PoolRegistration.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PoolRegistration.from_cbor_bytes(cborBytes),
    catch: () =>
      new PoolRegistrationError({
        message: `PoolRegistration.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls PoolRegistration.fromCborBytes without Effect wrapper
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRegistration.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRegistration.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PoolRegistration
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRegistration instance
 * const instance = ... ;
 *   const result = yield* PoolRegistration.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.PoolRegistration,
  ): Effect.Effect<string, PoolRegistrationError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new PoolRegistrationError({
          message: `PoolRegistration.toCborHex failed PoolRegistration is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PoolRegistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRegistration.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRegistration.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.PoolRegistration): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PoolRegistration
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRegistration instance
 * const instance = ... ;
 *   const result = yield* PoolRegistration.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.PoolRegistration,
  ): Effect.Effect<string, PoolRegistrationError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new PoolRegistrationError({
          message: `PoolRegistration.toCanonicalCborHex failed PoolRegistration is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PoolRegistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRegistration.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRegistration.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.PoolRegistration,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PoolRegistration
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PoolRegistration.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.PoolRegistration.from_cbor_hex(cborBytes),
    catch: () =>
      new PoolRegistrationError({
        message: `PoolRegistration.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls PoolRegistration.fromCborHex without Effect wrapper
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRegistration.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRegistration.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of PoolRegistration
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRegistration instance
 * const instance = ... ;
 *   const result = yield* PoolRegistration.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.PoolRegistration,
  ): Effect.Effect<string, PoolRegistrationError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new PoolRegistrationError({
          message: `PoolRegistration.toJson failed PoolRegistration is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PoolRegistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRegistration.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRegistration.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.PoolRegistration): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of PoolRegistration
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRegistration instance
 * const instance = ... ;
 *   const result = yield* PoolRegistration.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.PoolRegistration): Effect.Effect<any, PoolRegistrationError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new PoolRegistrationError({
          message: `PoolRegistration.toJsValue failed PoolRegistration is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PoolRegistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRegistration.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRegistration.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.PoolRegistration): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of PoolRegistration
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PoolRegistration.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.PoolRegistration.from_json(json),
    catch: () =>
      new PoolRegistrationError({
        message: `PoolRegistration.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls PoolRegistration.fromJson without Effect wrapper
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRegistration.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRegistration.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method poolParams of PoolRegistration
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRegistration instance
 * const instance = ... ;
 *   const result = yield* PoolRegistration.poolParams(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const poolParams = Effect.fn(
  (
    instance: CML.PoolRegistration,
  ): Effect.Effect<CML.PoolParams, PoolRegistrationError> =>
    Effect.try({
      try: () => instance.pool_params(),
      catch: () =>
        new PoolRegistrationError({
          message: `PoolRegistration.poolParams failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.poolParams without Effect wrapper
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PoolRegistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRegistration.poolParamsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRegistration.poolParamsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolParamsUnsafe = (
  instance: CML.PoolRegistration,
): CML.PoolParams => Effect.runSync(poolParams(instance));

/**
 * Static method _new of PoolRegistration
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PoolRegistration._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (poolParams: CML.PoolParams) {
  return yield* Effect.try({
    try: () => CML.PoolRegistration.new(poolParams),
    catch: () =>
      new PoolRegistrationError({
        message: `PoolRegistration._new failed with parameters: ${poolParams} (PoolParams). `,
      }),
  });
});

/**
 * Unsafely calls PoolRegistration._new without Effect wrapper
 *
 * @example
 * import { PoolRegistration } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRegistration._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRegistration._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (poolParams: CML.PoolParams) =>
  Effect.runSync(_new(poolParams));

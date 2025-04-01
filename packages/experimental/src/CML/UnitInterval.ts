/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML UnitInterval class
 *
 * @since 2.0.0
 * @category Types
 */
export type UnitInterval = CML.UnitInterval;

/**
 * Error class for UnitInterval operations
 *
 * This error is thrown when operations on UnitInterval instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class UnitIntervalError extends Data.TaggedError("UnitIntervalError")<{
  message?: string;
}> {}

/**
 * Method free of UnitInterval
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *   const result = yield* UnitInterval.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.UnitInterval): Effect.Effect<void, UnitIntervalError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new UnitIntervalError({
          message: `UnitInterval.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnitInterval.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnitInterval.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.UnitInterval): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of UnitInterval
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *   const result = yield* UnitInterval.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.UnitInterval): Effect.Effect<Uint8Array, UnitIntervalError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new UnitIntervalError({
          message: `UnitInterval.toCborBytes failed UnitInterval is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnitInterval.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnitInterval.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.UnitInterval): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of UnitInterval
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *   const result = yield* UnitInterval.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.UnitInterval): Effect.Effect<Uint8Array, UnitIntervalError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new UnitIntervalError({
          message: `UnitInterval.toCanonicalCborBytes failed UnitInterval is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnitInterval.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnitInterval.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.UnitInterval,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of UnitInterval
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* UnitInterval.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.UnitInterval.from_cbor_bytes(cborBytes),
    catch: () =>
      new UnitIntervalError({
        message: `UnitInterval.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls UnitInterval.fromCborBytes without Effect wrapper
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnitInterval.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnitInterval.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of UnitInterval
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *   const result = yield* UnitInterval.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.UnitInterval): Effect.Effect<string, UnitIntervalError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new UnitIntervalError({
          message: `UnitInterval.toCborHex failed UnitInterval is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnitInterval.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnitInterval.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.UnitInterval): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of UnitInterval
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *   const result = yield* UnitInterval.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.UnitInterval): Effect.Effect<string, UnitIntervalError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new UnitIntervalError({
          message: `UnitInterval.toCanonicalCborHex failed UnitInterval is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnitInterval.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnitInterval.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.UnitInterval): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of UnitInterval
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* UnitInterval.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.UnitInterval.from_cbor_hex(cborBytes),
    catch: () =>
      new UnitIntervalError({
        message: `UnitInterval.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls UnitInterval.fromCborHex without Effect wrapper
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnitInterval.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnitInterval.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of UnitInterval
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *   const result = yield* UnitInterval.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.UnitInterval): Effect.Effect<string, UnitIntervalError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new UnitIntervalError({
          message: `UnitInterval.toJson failed UnitInterval is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnitInterval.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnitInterval.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.UnitInterval): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of UnitInterval
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *   const result = yield* UnitInterval.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.UnitInterval): Effect.Effect<any, UnitIntervalError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new UnitIntervalError({
          message: `UnitInterval.toJsValue failed UnitInterval is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnitInterval.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnitInterval.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.UnitInterval): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of UnitInterval
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* UnitInterval.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.UnitInterval.from_json(json),
    catch: () =>
      new UnitIntervalError({
        message: `UnitInterval.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls UnitInterval.fromJson without Effect wrapper
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnitInterval.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnitInterval.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method start of UnitInterval
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *   const result = yield* UnitInterval.start(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const start = Effect.fn(
  (instance: CML.UnitInterval): Effect.Effect<bigint, UnitIntervalError> =>
    Effect.try({
      try: () => instance.start(),
      catch: () =>
        new UnitIntervalError({
          message: `UnitInterval.start failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.start without Effect wrapper
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnitInterval.startUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnitInterval.startUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const startUnsafe = (instance: CML.UnitInterval): bigint =>
  Effect.runSync(start(instance));

/**
 * Method end of UnitInterval
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *   const result = yield* UnitInterval.end(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const end = Effect.fn(
  (instance: CML.UnitInterval): Effect.Effect<bigint, UnitIntervalError> =>
    Effect.try({
      try: () => instance.end(),
      catch: () =>
        new UnitIntervalError({
          message: `UnitInterval.end failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.end without Effect wrapper
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 * // Assume we have a UnitInterval instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnitInterval.endUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnitInterval.endUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const endUnsafe = (instance: CML.UnitInterval): bigint =>
  Effect.runSync(end(instance));

/**
 * Static method _new of UnitInterval
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* UnitInterval._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (start: bigint, end: bigint) {
  return yield* Effect.try({
    try: () => CML.UnitInterval.new(start, end),
    catch: () =>
      new UnitIntervalError({
        message: `UnitInterval._new failed with parameters: ${start}, ${end}. `,
      }),
  });
});

/**
 * Unsafely calls UnitInterval._new without Effect wrapper
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = UnitInterval._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnitInterval._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (start: bigint, end: bigint) =>
  Effect.runSync(_new(start, end));

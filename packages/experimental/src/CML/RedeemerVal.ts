/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML RedeemerVal class
 *
 * @since 2.0.0
 * @category Types
 */
export type RedeemerVal = CML.RedeemerVal;

/**
 * Error class for RedeemerVal operations
 *
 * This error is thrown when operations on RedeemerVal instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class RedeemerValError extends Data.TaggedError("RedeemerValError")<{
  message?: string;
}> {}

/**
 * Method free of RedeemerVal
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *   const result = yield* RedeemerVal.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.RedeemerVal): Effect.Effect<void, RedeemerValError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerVal.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerVal.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.RedeemerVal): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of RedeemerVal
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *   const result = yield* RedeemerVal.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.RedeemerVal): Effect.Effect<Uint8Array, RedeemerValError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.toCborBytes failed RedeemerVal is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerVal.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerVal.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.RedeemerVal): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of RedeemerVal
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *   const result = yield* RedeemerVal.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.RedeemerVal): Effect.Effect<Uint8Array, RedeemerValError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.toCanonicalCborBytes failed RedeemerVal is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerVal.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerVal.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.RedeemerVal,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of RedeemerVal
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* RedeemerVal.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.RedeemerVal.from_cbor_bytes(cborBytes),
    catch: () =>
      new RedeemerValError({
        message: `RedeemerVal.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls RedeemerVal.fromCborBytes without Effect wrapper
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerVal.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerVal.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of RedeemerVal
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *   const result = yield* RedeemerVal.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.RedeemerVal): Effect.Effect<string, RedeemerValError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.toCborHex failed RedeemerVal is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerVal.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerVal.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.RedeemerVal): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of RedeemerVal
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *   const result = yield* RedeemerVal.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.RedeemerVal): Effect.Effect<string, RedeemerValError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.toCanonicalCborHex failed RedeemerVal is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerVal.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerVal.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.RedeemerVal): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of RedeemerVal
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* RedeemerVal.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.RedeemerVal.from_cbor_hex(cborBytes),
    catch: () =>
      new RedeemerValError({
        message: `RedeemerVal.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls RedeemerVal.fromCborHex without Effect wrapper
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerVal.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerVal.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of RedeemerVal
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *   const result = yield* RedeemerVal.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.RedeemerVal): Effect.Effect<string, RedeemerValError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.toJson failed RedeemerVal is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerVal.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerVal.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.RedeemerVal): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of RedeemerVal
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *   const result = yield* RedeemerVal.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.RedeemerVal): Effect.Effect<any, RedeemerValError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.toJsValue failed RedeemerVal is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerVal.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerVal.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.RedeemerVal): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of RedeemerVal
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* RedeemerVal.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.RedeemerVal.from_json(json),
    catch: () =>
      new RedeemerValError({
        message: `RedeemerVal.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls RedeemerVal.fromJson without Effect wrapper
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerVal.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerVal.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method data of RedeemerVal
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *   const result = yield* RedeemerVal.data(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const data = Effect.fn(
  (
    instance: CML.RedeemerVal,
  ): Effect.Effect<CML.PlutusData, RedeemerValError> =>
    Effect.try({
      try: () => instance.data(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.data failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.data without Effect wrapper
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerVal.dataUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerVal.dataUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dataUnsafe = (instance: CML.RedeemerVal): CML.PlutusData =>
  Effect.runSync(data(instance));

/**
 * Method exUnits of RedeemerVal
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *   const result = yield* RedeemerVal.exUnits(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const exUnits = Effect.fn(
  (instance: CML.RedeemerVal): Effect.Effect<CML.ExUnits, RedeemerValError> =>
    Effect.try({
      try: () => instance.ex_units(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.exUnits failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.exUnits without Effect wrapper
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RedeemerVal instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerVal.exUnitsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerVal.exUnitsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const exUnitsUnsafe = (instance: CML.RedeemerVal): CML.ExUnits =>
  Effect.runSync(exUnits(instance));

/**
 * Static method _new of RedeemerVal
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* RedeemerVal._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  data: CML.PlutusData,
  exUnits: CML.ExUnits,
) {
  return yield* Effect.try({
    try: () => CML.RedeemerVal.new(data, exUnits),
    catch: () =>
      new RedeemerValError({
        message: `RedeemerVal._new failed with parameters: ${data} (PlutusData), ${exUnits} (ExUnits). `,
      }),
  });
});

/**
 * Unsafely calls RedeemerVal._new without Effect wrapper
 *
 * @example
 * import { RedeemerVal } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerVal._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerVal._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (data: CML.PlutusData, exUnits: CML.ExUnits) =>
  Effect.runSync(_new(data, exUnits));

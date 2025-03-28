import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type CostModels = CML.CostModels;

export class CostModelsError extends Data.TaggedError("CostModelsError")<{
  message?: string;
}> {}

/**
 * Method free of CostModels
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CostModels instance
 * const instance = ... ;
 *   const result = yield* CostModels.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.CostModels): Effect.Effect<void, CostModelsError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CostModelsError({
          message: `CostModels.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CostModels instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CostModels.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CostModels.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.CostModels): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CostModels
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CostModels instance
 * const instance = ... ;
 *   const result = yield* CostModels.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.CostModels): Effect.Effect<Uint8Array, CostModelsError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CostModelsError({
          message: `CostModels.toCborBytes failed CostModels is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CostModels instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CostModels.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CostModels.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.CostModels): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of CostModels
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CostModels instance
 * const instance = ... ;
 *   const result = yield* CostModels.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.CostModels): Effect.Effect<Uint8Array, CostModelsError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new CostModelsError({
          message: `CostModels.toCanonicalCborBytes failed CostModels is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CostModels instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CostModels.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CostModels.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.CostModels,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of CostModels
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CostModels.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.CostModels.from_cbor_bytes(cborBytes),
    catch: () =>
      new CostModelsError({
        message: `CostModels.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls CostModels.fromCborBytes without Effect wrapper
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CostModels.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CostModels.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CostModels
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CostModels instance
 * const instance = ... ;
 *   const result = yield* CostModels.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.CostModels): Effect.Effect<string, CostModelsError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CostModelsError({
          message: `CostModels.toCborHex failed CostModels is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CostModels instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CostModels.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CostModels.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.CostModels): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of CostModels
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CostModels instance
 * const instance = ... ;
 *   const result = yield* CostModels.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.CostModels): Effect.Effect<string, CostModelsError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new CostModelsError({
          message: `CostModels.toCanonicalCborHex failed CostModels is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CostModels instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CostModels.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CostModels.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.CostModels): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of CostModels
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CostModels.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.CostModels.from_cbor_hex(cborBytes),
    catch: () =>
      new CostModelsError({
        message: `CostModels.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls CostModels.fromCborHex without Effect wrapper
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CostModels.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CostModels.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CostModels
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CostModels instance
 * const instance = ... ;
 *   const result = yield* CostModels.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.CostModels): Effect.Effect<string, CostModelsError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CostModelsError({
          message: `CostModels.toJson failed CostModels is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CostModels instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CostModels.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CostModels.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.CostModels): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CostModels
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CostModels instance
 * const instance = ... ;
 *   const result = yield* CostModels.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.CostModels): Effect.Effect<any, CostModelsError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CostModelsError({
          message: `CostModels.toJsValue failed CostModels is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CostModels instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CostModels.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CostModels.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.CostModels): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CostModels
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CostModels.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CostModels.from_json(json),
    catch: () =>
      new CostModelsError({
        message: `CostModels.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls CostModels.fromJson without Effect wrapper
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CostModels.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CostModels.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method inner of CostModels
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CostModels instance
 * const instance = ... ;
 *   const result = yield* CostModels.inner(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const inner = Effect.fn(
  (
    instance: CML.CostModels,
  ): Effect.Effect<CML.MapU64ToArrI64, CostModelsError> =>
    Effect.try({
      try: () => instance.inner(),
      catch: () =>
        new CostModelsError({
          message: `CostModels.inner failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.inner without Effect wrapper
 *
 * @example
 * import { CostModels } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CostModels instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CostModels.unsafeInner(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CostModels.unsafeInner failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeInner = (instance: CML.CostModels): CML.MapU64ToArrI64 =>
  Effect.runSync(inner(instance));

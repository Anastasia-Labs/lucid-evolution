/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PlutusMap class
 *
 * @since 2.0.0
 * @category Types
 */
export type PlutusMap = CML.PlutusMap;

/**
 * Error class for PlutusMap operations
 * 
 * This error is thrown when operations on PlutusMap instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PlutusMapError extends Data.TaggedError("PlutusMapError")<{
  message?: string;
}> {}

/**
 * Method free of PlutusMap
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 *   const result = yield* PlutusMap.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PlutusMap): Effect.Effect<void, PlutusMapError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusMap.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusMap.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PlutusMap): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of PlutusMap
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 *   const result = yield* PlutusMap.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.PlutusMap): Effect.Effect<Uint8Array, PlutusMapError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.toCborBytes failed PlutusMap is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusMap.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusMap.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.PlutusMap): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PlutusMap
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 *   const result = yield* PlutusMap.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.PlutusMap): Effect.Effect<Uint8Array, PlutusMapError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.toCanonicalCborBytes failed PlutusMap is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusMap.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusMap.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.PlutusMap): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PlutusMap
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PlutusMap.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PlutusMap.from_cbor_bytes(cborBytes),
    catch: () => new PlutusMapError({
      message: `PlutusMap.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls PlutusMap.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusMap.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusMap.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PlutusMap
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 *   const result = yield* PlutusMap.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.PlutusMap): Effect.Effect<string, PlutusMapError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.toCborHex failed PlutusMap is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusMap.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusMap.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.PlutusMap): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PlutusMap
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 *   const result = yield* PlutusMap.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.PlutusMap): Effect.Effect<string, PlutusMapError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.toCanonicalCborHex failed PlutusMap is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusMap.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusMap.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.PlutusMap): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PlutusMap
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PlutusMap.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.PlutusMap.from_cbor_hex(cborBytes),
    catch: () => new PlutusMapError({
      message: `PlutusMap.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls PlutusMap.fromCborHex without Effect wrapper
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusMap.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusMap.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Static method _new of PlutusMap
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PlutusMap._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.PlutusMap.new(),
    catch: () => new PlutusMapError({
      message: `PlutusMap._new failed `,
    }),
  });
});

/**
 * Unsafely calls PlutusMap._new without Effect wrapper
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusMap._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusMap._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () =>
  Effect.runSync(_new());

/**
 * Method len of PlutusMap
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 *   const result = yield* PlutusMap.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.PlutusMap): Effect.Effect<number, PlutusMapError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusMap.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusMap.lenUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.PlutusMap): number =>
  Effect.runSync(len(instance));

/**
 * Method isEmpty of PlutusMap
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 *   const result = yield* PlutusMap.isEmpty(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const isEmpty = Effect.fn(
  (instance: CML.PlutusMap): Effect.Effect<boolean, PlutusMapError> =>
    Effect.try({
      try: () => instance.is_empty(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.isEmpty failed `,
        }),
    })
);

/**
 * Unsafely calls instance.isEmpty without Effect wrapper
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusMap.isEmptyUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusMap.isEmptyUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const isEmptyUnsafe = (instance: CML.PlutusMap): boolean =>
  Effect.runSync(isEmpty(instance));

/**
 * Method set of PlutusMap
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 *   const result = yield* PlutusMap.set(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const set = Effect.fn(
  (instance: CML.PlutusMap, key: CML.PlutusData, value: CML.PlutusData): Effect.Effect<void, PlutusMapError> =>
    Effect.try({
      try: () => instance.set(key, value),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.set failed with parameters: ${key} (PlutusData), ${value} (PlutusData). `,
        }),
    })
);

/**
 * Unsafely calls instance.set without Effect wrapper
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusMap.setUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusMap.setUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setUnsafe = (instance: CML.PlutusMap, key: CML.PlutusData, value: CML.PlutusData): void =>
  Effect.runSync(set(instance, key, value));

/**
 * Method get of PlutusMap
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 *   const result = yield* PlutusMap.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.PlutusMap, key: CML.PlutusData): Effect.Effect<CML.PlutusData | undefined, PlutusMapError> =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.get failed with parameters: ${key} (PlutusData). `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusMap.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusMap.getUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.PlutusMap, key: CML.PlutusData): CML.PlutusData | undefined =>
  Effect.runSync(get(instance, key));

/**
 * Method getAll of PlutusMap
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 *   const result = yield* PlutusMap.getAll(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getAll = Effect.fn(
  (instance: CML.PlutusMap, key: CML.PlutusData): Effect.Effect<CML.PlutusDataList | undefined, PlutusMapError> =>
    Effect.try({
      try: () => instance.get_all(key),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.getAll failed with parameters: ${key} (PlutusData). `,
        }),
    })
);

/**
 * Unsafely calls instance.getAll without Effect wrapper
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusMap.getAllUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusMap.getAllUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getAllUnsafe = (instance: CML.PlutusMap, key: CML.PlutusData): CML.PlutusDataList | undefined =>
  Effect.runSync(getAll(instance, key));

/**
 * Method keys of PlutusMap
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 *   const result = yield* PlutusMap.keys(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keys = Effect.fn(
  (instance: CML.PlutusMap): Effect.Effect<CML.PlutusDataList, PlutusMapError> =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.keys failed `,
        }),
    })
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 * 
 * @example
 * import { PlutusMap } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusMap instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusMap.keysUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusMap.keysUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.PlutusMap): CML.PlutusDataList =>
  Effect.runSync(keys(instance));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MapTransactionIndexToAuxiliaryData class
 *
 * @since 2.0.0
 * @category Types
 */
export type MapTransactionIndexToAuxiliaryData = CML.MapTransactionIndexToAuxiliaryData;

/**
 * Error class for MapTransactionIndexToAuxiliaryData operations
 * 
 * This error is thrown when operations on MapTransactionIndexToAuxiliaryData instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MapTransactionIndexToAuxiliaryDataError extends Data.TaggedError("MapTransactionIndexToAuxiliaryDataError")<{
  message?: string;
}> {}

/**
 * Method free of MapTransactionIndexToAuxiliaryData
 * 
 * @example
 * import { MapTransactionIndexToAuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapTransactionIndexToAuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* MapTransactionIndexToAuxiliaryData.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.MapTransactionIndexToAuxiliaryData): Effect.Effect<void, MapTransactionIndexToAuxiliaryDataError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapTransactionIndexToAuxiliaryDataError({
          message: `MapTransactionIndexToAuxiliaryData.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { MapTransactionIndexToAuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapTransactionIndexToAuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapTransactionIndexToAuxiliaryData.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionIndexToAuxiliaryData.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MapTransactionIndexToAuxiliaryData): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MapTransactionIndexToAuxiliaryData
 * 
 * @example
 * import { MapTransactionIndexToAuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* MapTransactionIndexToAuxiliaryData._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MapTransactionIndexToAuxiliaryData.new(),
    catch: () => new MapTransactionIndexToAuxiliaryDataError({
      message: `MapTransactionIndexToAuxiliaryData._new failed `,
    }),
  });
});

/**
 * Unsafely calls MapTransactionIndexToAuxiliaryData._new without Effect wrapper
 * 
 * @example
 * import { MapTransactionIndexToAuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapTransactionIndexToAuxiliaryData._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionIndexToAuxiliaryData._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () =>
  Effect.runSync(_new());

/**
 * Method len of MapTransactionIndexToAuxiliaryData
 * 
 * @example
 * import { MapTransactionIndexToAuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapTransactionIndexToAuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* MapTransactionIndexToAuxiliaryData.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.MapTransactionIndexToAuxiliaryData): Effect.Effect<number, MapTransactionIndexToAuxiliaryDataError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapTransactionIndexToAuxiliaryDataError({
          message: `MapTransactionIndexToAuxiliaryData.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { MapTransactionIndexToAuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapTransactionIndexToAuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapTransactionIndexToAuxiliaryData.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionIndexToAuxiliaryData.lenUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.MapTransactionIndexToAuxiliaryData): number =>
  Effect.runSync(len(instance));

/**
 * Method insert of MapTransactionIndexToAuxiliaryData
 * 
 * @example
 * import { MapTransactionIndexToAuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapTransactionIndexToAuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* MapTransactionIndexToAuxiliaryData.insert(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const insert = Effect.fn(
  (instance: CML.MapTransactionIndexToAuxiliaryData, key: number, value: CML.AuxiliaryData): Effect.Effect<CML.AuxiliaryData | undefined, MapTransactionIndexToAuxiliaryDataError> =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapTransactionIndexToAuxiliaryDataError({
          message: `MapTransactionIndexToAuxiliaryData.insert failed with parameters: ${key}, ${value} (AuxiliaryData). `,
        }),
    })
);

/**
 * Unsafely calls instance.insert without Effect wrapper
 * 
 * @example
 * import { MapTransactionIndexToAuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapTransactionIndexToAuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapTransactionIndexToAuxiliaryData.insertUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionIndexToAuxiliaryData.insertUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const insertUnsafe = (instance: CML.MapTransactionIndexToAuxiliaryData, key: number, value: CML.AuxiliaryData): CML.AuxiliaryData | undefined =>
  Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapTransactionIndexToAuxiliaryData
 * 
 * @example
 * import { MapTransactionIndexToAuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapTransactionIndexToAuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* MapTransactionIndexToAuxiliaryData.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.MapTransactionIndexToAuxiliaryData, key: number): Effect.Effect<CML.AuxiliaryData | undefined, MapTransactionIndexToAuxiliaryDataError> =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapTransactionIndexToAuxiliaryDataError({
          message: `MapTransactionIndexToAuxiliaryData.get failed with parameters: ${key}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { MapTransactionIndexToAuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapTransactionIndexToAuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapTransactionIndexToAuxiliaryData.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionIndexToAuxiliaryData.getUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.MapTransactionIndexToAuxiliaryData, key: number): CML.AuxiliaryData | undefined =>
  Effect.runSync(get(instance, key));

/**
 * Method keys of MapTransactionIndexToAuxiliaryData
 * 
 * @example
 * import { MapTransactionIndexToAuxiliaryData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapTransactionIndexToAuxiliaryData instance
 * const instance = ... ;
 *   const result = yield* MapTransactionIndexToAuxiliaryData.keys(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keys = Effect.fn(
  (instance: CML.MapTransactionIndexToAuxiliaryData): Effect.Effect<Uint16Array, MapTransactionIndexToAuxiliaryDataError> =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapTransactionIndexToAuxiliaryDataError({
          message: `MapTransactionIndexToAuxiliaryData.keys failed `,
        }),
    })
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 * 
 * @example
 * import { MapTransactionIndexToAuxiliaryData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapTransactionIndexToAuxiliaryData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapTransactionIndexToAuxiliaryData.keysUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionIndexToAuxiliaryData.keysUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.MapTransactionIndexToAuxiliaryData): Uint16Array =>
  Effect.runSync(keys(instance));

import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type MapTransactionIndexToAuxiliaryData = CML.MapTransactionIndexToAuxiliaryData;

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
 *   const result = MapTransactionIndexToAuxiliaryData.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionIndexToAuxiliaryData.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.MapTransactionIndexToAuxiliaryData): void =>
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
 *   const result = MapTransactionIndexToAuxiliaryData.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionIndexToAuxiliaryData.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
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
 *   const result = MapTransactionIndexToAuxiliaryData.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionIndexToAuxiliaryData.unsafeLen failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.MapTransactionIndexToAuxiliaryData): number =>
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
 *   const result = MapTransactionIndexToAuxiliaryData.unsafeInsert(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionIndexToAuxiliaryData.unsafeInsert failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeInsert = (instance: CML.MapTransactionIndexToAuxiliaryData, key: number, value: CML.AuxiliaryData): CML.AuxiliaryData | undefined =>
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
 *   const result = MapTransactionIndexToAuxiliaryData.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionIndexToAuxiliaryData.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.MapTransactionIndexToAuxiliaryData, key: number): CML.AuxiliaryData | undefined =>
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
 *   const result = MapTransactionIndexToAuxiliaryData.unsafeKeys(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionIndexToAuxiliaryData.unsafeKeys failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKeys = (instance: CML.MapTransactionIndexToAuxiliaryData): Uint16Array =>
  Effect.runSync(keys(instance));

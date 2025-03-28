import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type MapPlutusDataToPlutusData = CML.MapPlutusDataToPlutusData;

export class MapPlutusDataToPlutusDataError extends Data.TaggedError("MapPlutusDataToPlutusDataError")<{
  message?: string;
}> {}

/**
 * Method free of MapPlutusDataToPlutusData
 * 
 * @example
 * import { MapPlutusDataToPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapPlutusDataToPlutusData instance
 * const instance = ... ;
 *   const result = yield* MapPlutusDataToPlutusData.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.MapPlutusDataToPlutusData): Effect.Effect<void, MapPlutusDataToPlutusDataError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapPlutusDataToPlutusDataError({
          message: `MapPlutusDataToPlutusData.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { MapPlutusDataToPlutusData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapPlutusDataToPlutusData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapPlutusDataToPlutusData.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapPlutusDataToPlutusData.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.MapPlutusDataToPlutusData): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MapPlutusDataToPlutusData
 * 
 * @example
 * import { MapPlutusDataToPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* MapPlutusDataToPlutusData._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MapPlutusDataToPlutusData.new(),
    catch: () => new MapPlutusDataToPlutusDataError({
      message: `MapPlutusDataToPlutusData._new failed `,
    }),
  });
});

/**
 * Unsafely calls MapPlutusDataToPlutusData._new without Effect wrapper
 * 
 * @example
 * import { MapPlutusDataToPlutusData } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapPlutusDataToPlutusData.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapPlutusDataToPlutusData.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

/**
 * Method len of MapPlutusDataToPlutusData
 * 
 * @example
 * import { MapPlutusDataToPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapPlutusDataToPlutusData instance
 * const instance = ... ;
 *   const result = yield* MapPlutusDataToPlutusData.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.MapPlutusDataToPlutusData): Effect.Effect<number, MapPlutusDataToPlutusDataError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapPlutusDataToPlutusDataError({
          message: `MapPlutusDataToPlutusData.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { MapPlutusDataToPlutusData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapPlutusDataToPlutusData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapPlutusDataToPlutusData.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapPlutusDataToPlutusData.unsafeLen failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.MapPlutusDataToPlutusData): number =>
  Effect.runSync(len(instance));

/**
 * Method insert of MapPlutusDataToPlutusData
 * 
 * @example
 * import { MapPlutusDataToPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapPlutusDataToPlutusData instance
 * const instance = ... ;
 *   const result = yield* MapPlutusDataToPlutusData.insert(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const insert = Effect.fn(
  (instance: CML.MapPlutusDataToPlutusData, key: CML.PlutusData, value: CML.PlutusData): Effect.Effect<CML.PlutusData | undefined, MapPlutusDataToPlutusDataError> =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapPlutusDataToPlutusDataError({
          message: `MapPlutusDataToPlutusData.insert failed with parameters: ${key} (PlutusData), ${value} (PlutusData). `,
        }),
    })
);

/**
 * Unsafely calls instance.insert without Effect wrapper
 * 
 * @example
 * import { MapPlutusDataToPlutusData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapPlutusDataToPlutusData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapPlutusDataToPlutusData.unsafeInsert(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapPlutusDataToPlutusData.unsafeInsert failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeInsert = (instance: CML.MapPlutusDataToPlutusData, key: CML.PlutusData, value: CML.PlutusData): CML.PlutusData | undefined =>
  Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapPlutusDataToPlutusData
 * 
 * @example
 * import { MapPlutusDataToPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapPlutusDataToPlutusData instance
 * const instance = ... ;
 *   const result = yield* MapPlutusDataToPlutusData.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.MapPlutusDataToPlutusData, key: CML.PlutusData): Effect.Effect<CML.PlutusData | undefined, MapPlutusDataToPlutusDataError> =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapPlutusDataToPlutusDataError({
          message: `MapPlutusDataToPlutusData.get failed with parameters: ${key} (PlutusData). `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { MapPlutusDataToPlutusData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapPlutusDataToPlutusData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapPlutusDataToPlutusData.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapPlutusDataToPlutusData.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.MapPlutusDataToPlutusData, key: CML.PlutusData): CML.PlutusData | undefined =>
  Effect.runSync(get(instance, key));

/**
 * Method keys of MapPlutusDataToPlutusData
 * 
 * @example
 * import { MapPlutusDataToPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapPlutusDataToPlutusData instance
 * const instance = ... ;
 *   const result = yield* MapPlutusDataToPlutusData.keys(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keys = Effect.fn(
  (instance: CML.MapPlutusDataToPlutusData): Effect.Effect<CML.PlutusDataList, MapPlutusDataToPlutusDataError> =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapPlutusDataToPlutusDataError({
          message: `MapPlutusDataToPlutusData.keys failed `,
        }),
    })
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 * 
 * @example
 * import { MapPlutusDataToPlutusData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapPlutusDataToPlutusData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapPlutusDataToPlutusData.unsafeKeys(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapPlutusDataToPlutusData.unsafeKeys failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKeys = (instance: CML.MapPlutusDataToPlutusData): CML.PlutusDataList =>
  Effect.runSync(keys(instance));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MapPlutusDataToPlutusData class
 *
 * @since 2.0.0
 * @category Types
 */
export type MapPlutusDataToPlutusData = CML.MapPlutusDataToPlutusData;

/**
 * Error class for MapPlutusDataToPlutusData operations
 * 
 * This error is thrown when operations on MapPlutusDataToPlutusData instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MapPlutusDataToPlutusDataError extends Data.TaggedError("MapPlutusDataToPlutusDataError")<{
  message?: string;
}> {}

/**
 * Method free of MapPlutusDataToPlutusData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.MapPlutusDataToPlutusData) => Effect.Effect<void, MapPlutusDataToPlutusDataError> = Effect.fn(
  (instance: CML.MapPlutusDataToPlutusData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MapPlutusDataToPlutusData): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MapPlutusDataToPlutusData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.MapPlutusDataToPlutusData, MapPlutusDataToPlutusDataError> = Effect.fn(function* () {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.MapPlutusDataToPlutusData =>
  Effect.runSync(_new());

/**
 * Method len of MapPlutusDataToPlutusData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.MapPlutusDataToPlutusData) => Effect.Effect<number, MapPlutusDataToPlutusDataError> = Effect.fn(
  (instance: CML.MapPlutusDataToPlutusData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.MapPlutusDataToPlutusData): number =>
  Effect.runSync(len(instance));

/**
 * Method insert of MapPlutusDataToPlutusData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const insert: (instance: CML.MapPlutusDataToPlutusData, key: CML.PlutusData, value: CML.PlutusData) => Effect.Effect<CML.PlutusData | undefined, MapPlutusDataToPlutusDataError> = Effect.fn(
  (instance: CML.MapPlutusDataToPlutusData, key: CML.PlutusData, value: CML.PlutusData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const insertUnsafe = (instance: CML.MapPlutusDataToPlutusData, key: CML.PlutusData, value: CML.PlutusData): CML.PlutusData | undefined =>
  Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapPlutusDataToPlutusData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.MapPlutusDataToPlutusData, key: CML.PlutusData) => Effect.Effect<CML.PlutusData | undefined, MapPlutusDataToPlutusDataError> = Effect.fn(
  (instance: CML.MapPlutusDataToPlutusData, key: CML.PlutusData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.MapPlutusDataToPlutusData, key: CML.PlutusData): CML.PlutusData | undefined =>
  Effect.runSync(get(instance, key));

/**
 * Method keys of MapPlutusDataToPlutusData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keys: (instance: CML.MapPlutusDataToPlutusData) => Effect.Effect<CML.PlutusDataList, MapPlutusDataToPlutusDataError> = Effect.fn(
  (instance: CML.MapPlutusDataToPlutusData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.MapPlutusDataToPlutusData): CML.PlutusDataList =>
  Effect.runSync(keys(instance));

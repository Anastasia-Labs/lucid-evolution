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
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.MapTransactionIndexToAuxiliaryData) => Effect.Effect<void, MapTransactionIndexToAuxiliaryDataError> = Effect.fn(
  (instance: CML.MapTransactionIndexToAuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MapTransactionIndexToAuxiliaryData): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MapTransactionIndexToAuxiliaryData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.MapTransactionIndexToAuxiliaryData, MapTransactionIndexToAuxiliaryDataError> = Effect.fn(function* () {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.MapTransactionIndexToAuxiliaryData =>
  Effect.runSync(_new());

/**
 * Method len of MapTransactionIndexToAuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.MapTransactionIndexToAuxiliaryData) => Effect.Effect<number, MapTransactionIndexToAuxiliaryDataError> = Effect.fn(
  (instance: CML.MapTransactionIndexToAuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.MapTransactionIndexToAuxiliaryData): number =>
  Effect.runSync(len(instance));

/**
 * Method insert of MapTransactionIndexToAuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const insert: (instance: CML.MapTransactionIndexToAuxiliaryData, key: number, value: CML.AuxiliaryData) => Effect.Effect<CML.AuxiliaryData | undefined, MapTransactionIndexToAuxiliaryDataError> = Effect.fn(
  (instance: CML.MapTransactionIndexToAuxiliaryData, key: number, value: CML.AuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const insertUnsafe = (instance: CML.MapTransactionIndexToAuxiliaryData, key: number, value: CML.AuxiliaryData): CML.AuxiliaryData | undefined =>
  Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapTransactionIndexToAuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.MapTransactionIndexToAuxiliaryData, key: number) => Effect.Effect<CML.AuxiliaryData | undefined, MapTransactionIndexToAuxiliaryDataError> = Effect.fn(
  (instance: CML.MapTransactionIndexToAuxiliaryData, key: number) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.MapTransactionIndexToAuxiliaryData, key: number): CML.AuxiliaryData | undefined =>
  Effect.runSync(get(instance, key));

/**
 * Method keys of MapTransactionIndexToAuxiliaryData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keys: (instance: CML.MapTransactionIndexToAuxiliaryData) => Effect.Effect<Uint16Array, MapTransactionIndexToAuxiliaryDataError> = Effect.fn(
  (instance: CML.MapTransactionIndexToAuxiliaryData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.MapTransactionIndexToAuxiliaryData): Uint16Array =>
  Effect.runSync(keys(instance));

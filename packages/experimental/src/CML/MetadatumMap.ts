/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MetadatumMap class
 *
 * @since 2.0.0
 * @category Types
 */
export type MetadatumMap = CML.MetadatumMap;

/**
 * Error class for MetadatumMap operations
 * 
 * This error is thrown when operations on MetadatumMap instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MetadatumMapError extends Data.TaggedError("MetadatumMapError")<{
  message?: string;
}> {}

/**
 * Method free of MetadatumMap
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.MetadatumMap) => Effect.Effect<void, MetadatumMapError> = Effect.fn(
  (instance: CML.MetadatumMap) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MetadatumMapError({
          message: `MetadatumMap.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MetadatumMap): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MetadatumMap
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.MetadatumMap, MetadatumMapError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MetadatumMap.new(),
    catch: () => new MetadatumMapError({
      message: `MetadatumMap._new failed `,
    }),
  });
});

/**
 * Unsafely calls MetadatumMap._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.MetadatumMap =>
  Effect.runSync(_new());

/**
 * Method len of MetadatumMap
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.MetadatumMap) => Effect.Effect<number, MetadatumMapError> = Effect.fn(
  (instance: CML.MetadatumMap) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MetadatumMapError({
          message: `MetadatumMap.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.MetadatumMap): number =>
  Effect.runSync(len(instance));

/**
 * Method set of MetadatumMap
 * 
 * @since 2.0.0
 * @category Methods
 */
export const set: (instance: CML.MetadatumMap, key: CML.TransactionMetadatum, value: CML.TransactionMetadatum) => Effect.Effect<void, MetadatumMapError> = Effect.fn(
  (instance: CML.MetadatumMap, key: CML.TransactionMetadatum, value: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.set(key, value),
      catch: () =>
        new MetadatumMapError({
          message: `MetadatumMap.set failed with parameters: ${key} (TransactionMetadatum), ${value} (TransactionMetadatum). `,
        }),
    })
);

/**
 * Unsafely calls instance.set without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setUnsafe = (instance: CML.MetadatumMap, key: CML.TransactionMetadatum, value: CML.TransactionMetadatum): void =>
  Effect.runSync(set(instance, key, value));

/**
 * Method get of MetadatumMap
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.MetadatumMap, key: CML.TransactionMetadatum) => Effect.Effect<CML.TransactionMetadatum | undefined, MetadatumMapError> = Effect.fn(
  (instance: CML.MetadatumMap, key: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MetadatumMapError({
          message: `MetadatumMap.get failed with parameters: ${key} (TransactionMetadatum). `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.MetadatumMap, key: CML.TransactionMetadatum): CML.TransactionMetadatum | undefined =>
  Effect.runSync(get(instance, key));

/**
 * Method getAll of MetadatumMap
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getAll: (instance: CML.MetadatumMap, key: CML.TransactionMetadatum) => Effect.Effect<CML.TransactionMetadatumList | undefined, MetadatumMapError> = Effect.fn(
  (instance: CML.MetadatumMap, key: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.get_all(key),
      catch: () =>
        new MetadatumMapError({
          message: `MetadatumMap.getAll failed with parameters: ${key} (TransactionMetadatum). `,
        }),
    })
);

/**
 * Unsafely calls instance.getAll without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getAllUnsafe = (instance: CML.MetadatumMap, key: CML.TransactionMetadatum): CML.TransactionMetadatumList | undefined =>
  Effect.runSync(getAll(instance, key));

/**
 * Method keys of MetadatumMap
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keys: (instance: CML.MetadatumMap) => Effect.Effect<CML.MetadatumList, MetadatumMapError> = Effect.fn(
  (instance: CML.MetadatumMap) =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MetadatumMapError({
          message: `MetadatumMap.keys failed `,
        }),
    })
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.MetadatumMap): CML.MetadatumList =>
  Effect.runSync(keys(instance));

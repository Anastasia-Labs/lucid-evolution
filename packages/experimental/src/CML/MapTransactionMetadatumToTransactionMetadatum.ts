/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MapTransactionMetadatumToTransactionMetadatum class
 *
 * @since 2.0.0
 * @category Types
 */
export type MapTransactionMetadatumToTransactionMetadatum = CML.MapTransactionMetadatumToTransactionMetadatum;

/**
 * Error class for MapTransactionMetadatumToTransactionMetadatum operations
 * 
 * This error is thrown when operations on MapTransactionMetadatumToTransactionMetadatum instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MapTransactionMetadatumToTransactionMetadatumError extends Data.TaggedError("MapTransactionMetadatumToTransactionMetadatumError")<{
  message?: string;
}> {}

/**
 * Method free of MapTransactionMetadatumToTransactionMetadatum
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.MapTransactionMetadatumToTransactionMetadatum) => Effect.Effect<void, MapTransactionMetadatumToTransactionMetadatumError> = Effect.fn(
  (instance: CML.MapTransactionMetadatumToTransactionMetadatum) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapTransactionMetadatumToTransactionMetadatumError({
          message: `MapTransactionMetadatumToTransactionMetadatum.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MapTransactionMetadatumToTransactionMetadatum): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MapTransactionMetadatumToTransactionMetadatum
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.MapTransactionMetadatumToTransactionMetadatum, MapTransactionMetadatumToTransactionMetadatumError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MapTransactionMetadatumToTransactionMetadatum.new(),
    catch: () => new MapTransactionMetadatumToTransactionMetadatumError({
      message: `MapTransactionMetadatumToTransactionMetadatum._new failed `,
    }),
  });
});

/**
 * Unsafely calls MapTransactionMetadatumToTransactionMetadatum._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.MapTransactionMetadatumToTransactionMetadatum =>
  Effect.runSync(_new());

/**
 * Method len of MapTransactionMetadatumToTransactionMetadatum
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.MapTransactionMetadatumToTransactionMetadatum) => Effect.Effect<number, MapTransactionMetadatumToTransactionMetadatumError> = Effect.fn(
  (instance: CML.MapTransactionMetadatumToTransactionMetadatum) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapTransactionMetadatumToTransactionMetadatumError({
          message: `MapTransactionMetadatumToTransactionMetadatum.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.MapTransactionMetadatumToTransactionMetadatum): number =>
  Effect.runSync(len(instance));

/**
 * Method insert of MapTransactionMetadatumToTransactionMetadatum
 * 
 * @since 2.0.0
 * @category Methods
 */
export const insert: (instance: CML.MapTransactionMetadatumToTransactionMetadatum, key: CML.TransactionMetadatum, value: CML.TransactionMetadatum) => Effect.Effect<CML.TransactionMetadatum | undefined, MapTransactionMetadatumToTransactionMetadatumError> = Effect.fn(
  (instance: CML.MapTransactionMetadatumToTransactionMetadatum, key: CML.TransactionMetadatum, value: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapTransactionMetadatumToTransactionMetadatumError({
          message: `MapTransactionMetadatumToTransactionMetadatum.insert failed with parameters: ${key} (TransactionMetadatum), ${value} (TransactionMetadatum). `,
        }),
    })
);

/**
 * Unsafely calls instance.insert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const insertUnsafe = (instance: CML.MapTransactionMetadatumToTransactionMetadatum, key: CML.TransactionMetadatum, value: CML.TransactionMetadatum): CML.TransactionMetadatum | undefined =>
  Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapTransactionMetadatumToTransactionMetadatum
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.MapTransactionMetadatumToTransactionMetadatum, key: CML.TransactionMetadatum) => Effect.Effect<CML.TransactionMetadatum | undefined, MapTransactionMetadatumToTransactionMetadatumError> = Effect.fn(
  (instance: CML.MapTransactionMetadatumToTransactionMetadatum, key: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapTransactionMetadatumToTransactionMetadatumError({
          message: `MapTransactionMetadatumToTransactionMetadatum.get failed with parameters: ${key} (TransactionMetadatum). `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.MapTransactionMetadatumToTransactionMetadatum, key: CML.TransactionMetadatum): CML.TransactionMetadatum | undefined =>
  Effect.runSync(get(instance, key));

/**
 * Method keys of MapTransactionMetadatumToTransactionMetadatum
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keys: (instance: CML.MapTransactionMetadatumToTransactionMetadatum) => Effect.Effect<CML.TransactionMetadatumList, MapTransactionMetadatumToTransactionMetadatumError> = Effect.fn(
  (instance: CML.MapTransactionMetadatumToTransactionMetadatum) =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapTransactionMetadatumToTransactionMetadatumError({
          message: `MapTransactionMetadatumToTransactionMetadatum.keys failed `,
        }),
    })
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.MapTransactionMetadatumToTransactionMetadatum): CML.TransactionMetadatumList =>
  Effect.runSync(keys(instance));

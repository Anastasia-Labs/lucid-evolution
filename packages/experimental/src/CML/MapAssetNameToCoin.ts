/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MapAssetNameToCoin class
 *
 * @since 2.0.0
 * @category Types
 */
export type MapAssetNameToCoin = CML.MapAssetNameToCoin;

/**
 * Error class for MapAssetNameToCoin operations
 * 
 * This error is thrown when operations on MapAssetNameToCoin instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MapAssetNameToCoinError extends Data.TaggedError("MapAssetNameToCoinError")<{
  message?: string;
}> {}

/**
 * Method free of MapAssetNameToCoin
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.MapAssetNameToCoin) => Effect.Effect<void, MapAssetNameToCoinError> = Effect.fn(
  (instance: CML.MapAssetNameToCoin) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapAssetNameToCoinError({
          message: `MapAssetNameToCoin.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MapAssetNameToCoin): void =>
  Effect.runSync(free(instance));

/**
 * Method get of MapAssetNameToCoin
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.MapAssetNameToCoin, key: CML.AssetName) => Effect.Effect<bigint | undefined, MapAssetNameToCoinError> = Effect.fn(
  (instance: CML.MapAssetNameToCoin, key: CML.AssetName) =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapAssetNameToCoinError({
          message: `MapAssetNameToCoin.get failed with parameters: ${key} (AssetName). `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.MapAssetNameToCoin, key: CML.AssetName): bigint | undefined =>
  Effect.runSync(get(instance, key));

/**
 * Method insert of MapAssetNameToCoin
 * 
 * @since 2.0.0
 * @category Methods
 */
export const insert: (instance: CML.MapAssetNameToCoin, key: CML.AssetName, value: bigint) => Effect.Effect<bigint | undefined, MapAssetNameToCoinError> = Effect.fn(
  (instance: CML.MapAssetNameToCoin, key: CML.AssetName, value: bigint) =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapAssetNameToCoinError({
          message: `MapAssetNameToCoin.insert failed with parameters: ${key} (AssetName), ${value}. `,
        }),
    })
);

/**
 * Unsafely calls instance.insert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const insertUnsafe = (instance: CML.MapAssetNameToCoin, key: CML.AssetName, value: bigint): bigint | undefined =>
  Effect.runSync(insert(instance, key, value));

/**
 * Static method _new of MapAssetNameToCoin
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.MapAssetNameToCoin, MapAssetNameToCoinError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MapAssetNameToCoin.new(),
    catch: () => new MapAssetNameToCoinError({
      message: `MapAssetNameToCoin._new failed `,
    }),
  });
});

/**
 * Unsafely calls MapAssetNameToCoin._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.MapAssetNameToCoin =>
  Effect.runSync(_new());

/**
 * Method len of MapAssetNameToCoin
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.MapAssetNameToCoin) => Effect.Effect<number, MapAssetNameToCoinError> = Effect.fn(
  (instance: CML.MapAssetNameToCoin) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapAssetNameToCoinError({
          message: `MapAssetNameToCoin.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.MapAssetNameToCoin): number =>
  Effect.runSync(len(instance));

/**
 * Method isEmpty of MapAssetNameToCoin
 * 
 * @since 2.0.0
 * @category Methods
 */
export const isEmpty: (instance: CML.MapAssetNameToCoin) => Effect.Effect<boolean, MapAssetNameToCoinError> = Effect.fn(
  (instance: CML.MapAssetNameToCoin) =>
    Effect.try({
      try: () => instance.is_empty(),
      catch: () =>
        new MapAssetNameToCoinError({
          message: `MapAssetNameToCoin.isEmpty failed `,
        }),
    })
);

/**
 * Unsafely calls instance.isEmpty without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const isEmptyUnsafe = (instance: CML.MapAssetNameToCoin): boolean =>
  Effect.runSync(isEmpty(instance));

/**
 * Method keys of MapAssetNameToCoin
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keys: (instance: CML.MapAssetNameToCoin) => Effect.Effect<CML.AssetNameList, MapAssetNameToCoinError> = Effect.fn(
  (instance: CML.MapAssetNameToCoin) =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapAssetNameToCoinError({
          message: `MapAssetNameToCoin.keys failed `,
        }),
    })
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.MapAssetNameToCoin): CML.AssetNameList =>
  Effect.runSync(keys(instance));

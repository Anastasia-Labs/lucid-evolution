/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MapAssetNameToNonZeroInt64 class
 *
 * @since 2.0.0
 * @category Types
 */
export type MapAssetNameToNonZeroInt64 = CML.MapAssetNameToNonZeroInt64;

/**
 * Error class for MapAssetNameToNonZeroInt64 operations
 * 
 * This error is thrown when operations on MapAssetNameToNonZeroInt64 instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MapAssetNameToNonZeroInt64Error extends Data.TaggedError("MapAssetNameToNonZeroInt64Error")<{
  message?: string;
}> {}

/**
 * Method free of MapAssetNameToNonZeroInt64
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.MapAssetNameToNonZeroInt64) => Effect.Effect<void, MapAssetNameToNonZeroInt64Error> = Effect.fn(
  (instance: CML.MapAssetNameToNonZeroInt64) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapAssetNameToNonZeroInt64Error({
          message: `MapAssetNameToNonZeroInt64.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MapAssetNameToNonZeroInt64): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MapAssetNameToNonZeroInt64
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.MapAssetNameToNonZeroInt64, MapAssetNameToNonZeroInt64Error> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MapAssetNameToNonZeroInt64.new(),
    catch: () => new MapAssetNameToNonZeroInt64Error({
      message: `MapAssetNameToNonZeroInt64._new failed `,
    }),
  });
});

/**
 * Unsafely calls MapAssetNameToNonZeroInt64._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.MapAssetNameToNonZeroInt64 =>
  Effect.runSync(_new());

/**
 * Method len of MapAssetNameToNonZeroInt64
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.MapAssetNameToNonZeroInt64) => Effect.Effect<number, MapAssetNameToNonZeroInt64Error> = Effect.fn(
  (instance: CML.MapAssetNameToNonZeroInt64) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapAssetNameToNonZeroInt64Error({
          message: `MapAssetNameToNonZeroInt64.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.MapAssetNameToNonZeroInt64): number =>
  Effect.runSync(len(instance));

/**
 * Method insert of MapAssetNameToNonZeroInt64
 * 
 * @since 2.0.0
 * @category Methods
 */
export const insert: (instance: CML.MapAssetNameToNonZeroInt64, key: CML.AssetName, value: bigint) => Effect.Effect<bigint | undefined, MapAssetNameToNonZeroInt64Error> = Effect.fn(
  (instance: CML.MapAssetNameToNonZeroInt64, key: CML.AssetName, value: bigint) =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapAssetNameToNonZeroInt64Error({
          message: `MapAssetNameToNonZeroInt64.insert failed with parameters: ${key} (AssetName), ${value}. `,
        }),
    })
);

/**
 * Unsafely calls instance.insert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const insertUnsafe = (instance: CML.MapAssetNameToNonZeroInt64, key: CML.AssetName, value: bigint): bigint | undefined =>
  Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapAssetNameToNonZeroInt64
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.MapAssetNameToNonZeroInt64, key: CML.AssetName) => Effect.Effect<bigint | undefined, MapAssetNameToNonZeroInt64Error> = Effect.fn(
  (instance: CML.MapAssetNameToNonZeroInt64, key: CML.AssetName) =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapAssetNameToNonZeroInt64Error({
          message: `MapAssetNameToNonZeroInt64.get failed with parameters: ${key} (AssetName). `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.MapAssetNameToNonZeroInt64, key: CML.AssetName): bigint | undefined =>
  Effect.runSync(get(instance, key));

/**
 * Method keys of MapAssetNameToNonZeroInt64
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keys: (instance: CML.MapAssetNameToNonZeroInt64) => Effect.Effect<CML.AssetNameList, MapAssetNameToNonZeroInt64Error> = Effect.fn(
  (instance: CML.MapAssetNameToNonZeroInt64) =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapAssetNameToNonZeroInt64Error({
          message: `MapAssetNameToNonZeroInt64.keys failed `,
        }),
    })
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.MapAssetNameToNonZeroInt64): CML.AssetNameList =>
  Effect.runSync(keys(instance));

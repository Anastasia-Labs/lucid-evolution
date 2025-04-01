/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MapAssetNameToU64 class
 *
 * @since 2.0.0
 * @category Types
 */
export type MapAssetNameToU64 = CML.MapAssetNameToU64;

/**
 * Error class for MapAssetNameToU64 operations
 *
 * This error is thrown when operations on MapAssetNameToU64 instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MapAssetNameToU64Error extends Data.TaggedError(
  "MapAssetNameToU64Error",
)<{
  message?: string;
}> {}

/**
 * Method free of MapAssetNameToU64
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.MapAssetNameToU64,
) => Effect.Effect<void, MapAssetNameToU64Error> = Effect.fn(
  (instance: CML.MapAssetNameToU64) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapAssetNameToU64Error({
          message: `MapAssetNameToU64.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MapAssetNameToU64): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MapAssetNameToU64
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.MapAssetNameToU64,
  MapAssetNameToU64Error
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MapAssetNameToU64.new(),
    catch: () =>
      new MapAssetNameToU64Error({
        message: `MapAssetNameToU64._new failed `,
      }),
  });
});

/**
 * Unsafely calls MapAssetNameToU64._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.MapAssetNameToU64 => Effect.runSync(_new());

/**
 * Method len of MapAssetNameToU64
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.MapAssetNameToU64,
) => Effect.Effect<number, MapAssetNameToU64Error> = Effect.fn(
  (instance: CML.MapAssetNameToU64) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapAssetNameToU64Error({
          message: `MapAssetNameToU64.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.MapAssetNameToU64): number =>
  Effect.runSync(len(instance));

/**
 * Method insert of MapAssetNameToU64
 *
 * @since 2.0.0
 * @category Methods
 */
export const insert: (
  instance: CML.MapAssetNameToU64,
  key: CML.AssetName,
  value: bigint,
) => Effect.Effect<bigint | undefined, MapAssetNameToU64Error> = Effect.fn(
  (instance: CML.MapAssetNameToU64, key: CML.AssetName, value: bigint) =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapAssetNameToU64Error({
          message: `MapAssetNameToU64.insert failed with parameters: ${key} (AssetName), ${value}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.insert without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const insertUnsafe = (
  instance: CML.MapAssetNameToU64,
  key: CML.AssetName,
  value: bigint,
): bigint | undefined => Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapAssetNameToU64
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.MapAssetNameToU64,
  key: CML.AssetName,
) => Effect.Effect<bigint | undefined, MapAssetNameToU64Error> = Effect.fn(
  (instance: CML.MapAssetNameToU64, key: CML.AssetName) =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapAssetNameToU64Error({
          message: `MapAssetNameToU64.get failed with parameters: ${key} (AssetName). `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.MapAssetNameToU64,
  key: CML.AssetName,
): bigint | undefined => Effect.runSync(get(instance, key));

/**
 * Method keys of MapAssetNameToU64
 *
 * @since 2.0.0
 * @category Methods
 */
export const keys: (
  instance: CML.MapAssetNameToU64,
) => Effect.Effect<CML.AssetNameList, MapAssetNameToU64Error> = Effect.fn(
  (instance: CML.MapAssetNameToU64) =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapAssetNameToU64Error({
          message: `MapAssetNameToU64.keys failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (
  instance: CML.MapAssetNameToU64,
): CML.AssetNameList => Effect.runSync(keys(instance));

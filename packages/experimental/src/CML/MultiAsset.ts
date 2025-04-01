/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MultiAsset class
 *
 * @since 2.0.0
 * @category Types
 */
export type MultiAsset = CML.MultiAsset;

/**
 * Error class for MultiAsset operations
 *
 * This error is thrown when operations on MultiAsset instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MultiAssetError extends Data.TaggedError("MultiAssetError")<{
  message?: string;
}> {}

/**
 * Method free of MultiAsset
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.MultiAsset,
) => Effect.Effect<void, MultiAssetError> = Effect.fn(
  (instance: CML.MultiAsset) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MultiAsset): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MultiAsset
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.MultiAsset, MultiAssetError> =
  Effect.fn(function* () {
    return yield* Effect.try({
      try: () => CML.MultiAsset.new(),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset._new failed `,
        }),
    });
  });

/**
 * Unsafely calls MultiAsset._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.MultiAsset => Effect.runSync(_new());

/**
 * Method policyCount of MultiAsset
 *
 * @since 2.0.0
 * @category Methods
 */
export const policyCount: (
  instance: CML.MultiAsset,
) => Effect.Effect<number, MultiAssetError> = Effect.fn(
  (instance: CML.MultiAsset) =>
    Effect.try({
      try: () => instance.policy_count(),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.policyCount failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.policyCount without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const policyCountUnsafe = (instance: CML.MultiAsset): number =>
  Effect.runSync(policyCount(instance));

/**
 * Method insertAssets of MultiAsset
 *
 * @since 2.0.0
 * @category Methods
 */
export const insertAssets: (
  instance: CML.MultiAsset,
  policyId: CML.ScriptHash,
  assets: CML.MapAssetNameToCoin,
) => Effect.Effect<CML.MapAssetNameToCoin | undefined, MultiAssetError> =
  Effect.fn(
    (
      instance: CML.MultiAsset,
      policyId: CML.ScriptHash,
      assets: CML.MapAssetNameToCoin,
    ) =>
      Effect.try({
        try: () => instance.insert_assets(policyId, assets),
        catch: () =>
          new MultiAssetError({
            message: `MultiAsset.insertAssets failed with parameters: ${policyId} (ScriptHash), ${assets} (MapAssetNameToCoin). `,
          }),
      }),
  );

/**
 * Unsafely calls instance.insertAssets without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const insertAssetsUnsafe = (
  instance: CML.MultiAsset,
  policyId: CML.ScriptHash,
  assets: CML.MapAssetNameToCoin,
): CML.MapAssetNameToCoin | undefined =>
  Effect.runSync(insertAssets(instance, policyId, assets));

/**
 * Method getAssets of MultiAsset
 *
 * @since 2.0.0
 * @category Methods
 */
export const getAssets: (
  instance: CML.MultiAsset,
  key: CML.ScriptHash,
) => Effect.Effect<CML.MapAssetNameToCoin | undefined, MultiAssetError> =
  Effect.fn((instance: CML.MultiAsset, key: CML.ScriptHash) =>
    Effect.try({
      try: () => instance.get_assets(key),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.getAssets failed with parameters: ${key} (ScriptHash). `,
        }),
    }),
  );

/**
 * Unsafely calls instance.getAssets without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getAssetsUnsafe = (
  instance: CML.MultiAsset,
  key: CML.ScriptHash,
): CML.MapAssetNameToCoin | undefined =>
  Effect.runSync(getAssets(instance, key));

/**
 * Method get of MultiAsset
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.MultiAsset,
  policyId: CML.ScriptHash,
  asset: CML.AssetName,
) => Effect.Effect<bigint | undefined, MultiAssetError> = Effect.fn(
  (instance: CML.MultiAsset, policyId: CML.ScriptHash, asset: CML.AssetName) =>
    Effect.try({
      try: () => instance.get(policyId, asset),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.get failed with parameters: ${policyId} (ScriptHash), ${asset} (AssetName). `,
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
  instance: CML.MultiAsset,
  policyId: CML.ScriptHash,
  asset: CML.AssetName,
): bigint | undefined => Effect.runSync(get(instance, policyId, asset));

/**
 * Method set of MultiAsset
 *
 * @since 2.0.0
 * @category Methods
 */
export const set: (
  instance: CML.MultiAsset,
  policyId: CML.ScriptHash,
  asset: CML.AssetName,
  value: bigint,
) => Effect.Effect<bigint | undefined, MultiAssetError> = Effect.fn(
  (
    instance: CML.MultiAsset,
    policyId: CML.ScriptHash,
    asset: CML.AssetName,
    value: bigint,
  ) =>
    Effect.try({
      try: () => instance.set(policyId, asset, value),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.set failed with parameters: ${policyId} (ScriptHash), ${asset} (AssetName), ${value}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.set without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setUnsafe = (
  instance: CML.MultiAsset,
  policyId: CML.ScriptHash,
  asset: CML.AssetName,
  value: bigint,
): bigint | undefined => Effect.runSync(set(instance, policyId, asset, value));

/**
 * Method keys of MultiAsset
 *
 * @since 2.0.0
 * @category Methods
 */
export const keys: (
  instance: CML.MultiAsset,
) => Effect.Effect<CML.PolicyIdList, MultiAssetError> = Effect.fn(
  (instance: CML.MultiAsset) =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.keys failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.MultiAsset): CML.PolicyIdList =>
  Effect.runSync(keys(instance));

/**
 * Method checkedAdd of MultiAsset
 *
 * @since 2.0.0
 * @category Methods
 */
export const checkedAdd: (
  instance: CML.MultiAsset,
  rhs: CML.MultiAsset,
) => Effect.Effect<CML.MultiAsset, MultiAssetError> = Effect.fn(
  (instance: CML.MultiAsset, rhs: CML.MultiAsset) =>
    Effect.try({
      try: () => instance.checked_add(rhs),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.checkedAdd failed with parameters: ${rhs} (MultiAsset). `,
        }),
    }),
);

/**
 * Unsafely calls instance.checkedAdd without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const checkedAddUnsafe = (
  instance: CML.MultiAsset,
  rhs: CML.MultiAsset,
): CML.MultiAsset => Effect.runSync(checkedAdd(instance, rhs));

/**
 * Method checkedSub of MultiAsset
 *
 * @since 2.0.0
 * @category Methods
 */
export const checkedSub: (
  instance: CML.MultiAsset,
  rhs: CML.MultiAsset,
) => Effect.Effect<CML.MultiAsset, MultiAssetError> = Effect.fn(
  (instance: CML.MultiAsset, rhs: CML.MultiAsset) =>
    Effect.try({
      try: () => instance.checked_sub(rhs),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.checkedSub failed with parameters: ${rhs} (MultiAsset). `,
        }),
    }),
);

/**
 * Unsafely calls instance.checkedSub without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const checkedSubUnsafe = (
  instance: CML.MultiAsset,
  rhs: CML.MultiAsset,
): CML.MultiAsset => Effect.runSync(checkedSub(instance, rhs));

/**
 * Method clampedSub of MultiAsset
 *
 * @since 2.0.0
 * @category Methods
 */
export const clampedSub: (
  instance: CML.MultiAsset,
  rhs: CML.MultiAsset,
) => Effect.Effect<CML.MultiAsset, MultiAssetError> = Effect.fn(
  (instance: CML.MultiAsset, rhs: CML.MultiAsset) =>
    Effect.try({
      try: () => instance.clamped_sub(rhs),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.clampedSub failed with parameters: ${rhs} (MultiAsset). `,
        }),
    }),
);

/**
 * Unsafely calls instance.clampedSub without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const clampedSubUnsafe = (
  instance: CML.MultiAsset,
  rhs: CML.MultiAsset,
): CML.MultiAsset => Effect.runSync(clampedSub(instance, rhs));

import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type MultiAsset = CML.MultiAsset;

export class MultiAssetError extends Data.TaggedError("MultiAssetError")<{
  message?: string;
}> {}

/**
 * Method free of MultiAsset
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 *   const result = yield* MultiAsset.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.MultiAsset): Effect.Effect<void, MultiAssetError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiAsset.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiAsset.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.MultiAsset): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MultiAsset
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* MultiAsset._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MultiAsset.new(),
    catch: () => new MultiAssetError({
      message: `MultiAsset._new failed `,
    }),
  });
});

/**
 * Unsafely calls MultiAsset._new without Effect wrapper
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiAsset.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiAsset.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

/**
 * Method policyCount of MultiAsset
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 *   const result = yield* MultiAsset.policyCount(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const policyCount = Effect.fn(
  (instance: CML.MultiAsset): Effect.Effect<number, MultiAssetError> =>
    Effect.try({
      try: () => instance.policy_count(),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.policyCount failed `,
        }),
    })
);

/**
 * Unsafely calls instance.policyCount without Effect wrapper
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiAsset.unsafePolicyCount(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiAsset.unsafePolicyCount failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePolicyCount = (instance: CML.MultiAsset): number =>
  Effect.runSync(policyCount(instance));

/**
 * Method insertAssets of MultiAsset
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 *   const result = yield* MultiAsset.insertAssets(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const insertAssets = Effect.fn(
  (instance: CML.MultiAsset, policyId: CML.ScriptHash, assets: CML.MapAssetNameToCoin): Effect.Effect<CML.MapAssetNameToCoin | undefined, MultiAssetError> =>
    Effect.try({
      try: () => instance.insert_assets(policyId, assets),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.insertAssets failed with parameters: ${policyId} (ScriptHash), ${assets} (MapAssetNameToCoin). `,
        }),
    })
);

/**
 * Unsafely calls instance.insertAssets without Effect wrapper
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiAsset.unsafeInsertAssets(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiAsset.unsafeInsertAssets failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeInsertAssets = (instance: CML.MultiAsset, policyId: CML.ScriptHash, assets: CML.MapAssetNameToCoin): CML.MapAssetNameToCoin | undefined =>
  Effect.runSync(insertAssets(instance, policyId, assets));

/**
 * Method getAssets of MultiAsset
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 *   const result = yield* MultiAsset.getAssets(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getAssets = Effect.fn(
  (instance: CML.MultiAsset, key: CML.ScriptHash): Effect.Effect<CML.MapAssetNameToCoin | undefined, MultiAssetError> =>
    Effect.try({
      try: () => instance.get_assets(key),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.getAssets failed with parameters: ${key} (ScriptHash). `,
        }),
    })
);

/**
 * Unsafely calls instance.getAssets without Effect wrapper
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiAsset.unsafeGetAssets(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiAsset.unsafeGetAssets failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGetAssets = (instance: CML.MultiAsset, key: CML.ScriptHash): CML.MapAssetNameToCoin | undefined =>
  Effect.runSync(getAssets(instance, key));

/**
 * Method get of MultiAsset
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 *   const result = yield* MultiAsset.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.MultiAsset, policyId: CML.ScriptHash, asset: CML.AssetName): Effect.Effect<bigint | undefined, MultiAssetError> =>
    Effect.try({
      try: () => instance.get(policyId, asset),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.get failed with parameters: ${policyId} (ScriptHash), ${asset} (AssetName). `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiAsset.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiAsset.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.MultiAsset, policyId: CML.ScriptHash, asset: CML.AssetName): bigint | undefined =>
  Effect.runSync(get(instance, policyId, asset));

/**
 * Method set of MultiAsset
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 *   const result = yield* MultiAsset.set(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const set = Effect.fn(
  (instance: CML.MultiAsset, policyId: CML.ScriptHash, asset: CML.AssetName, value: bigint): Effect.Effect<bigint | undefined, MultiAssetError> =>
    Effect.try({
      try: () => instance.set(policyId, asset, value),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.set failed with parameters: ${policyId} (ScriptHash), ${asset} (AssetName), ${value}. `,
        }),
    })
);

/**
 * Unsafely calls instance.set without Effect wrapper
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiAsset.unsafeSet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiAsset.unsafeSet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSet = (instance: CML.MultiAsset, policyId: CML.ScriptHash, asset: CML.AssetName, value: bigint): bigint | undefined =>
  Effect.runSync(set(instance, policyId, asset, value));

/**
 * Method keys of MultiAsset
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 *   const result = yield* MultiAsset.keys(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keys = Effect.fn(
  (instance: CML.MultiAsset): Effect.Effect<CML.PolicyIdList, MultiAssetError> =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.keys failed `,
        }),
    })
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiAsset.unsafeKeys(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiAsset.unsafeKeys failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKeys = (instance: CML.MultiAsset): CML.PolicyIdList =>
  Effect.runSync(keys(instance));

/**
 * Method checkedAdd of MultiAsset
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 *   const result = yield* MultiAsset.checkedAdd(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const checkedAdd = Effect.fn(
  (instance: CML.MultiAsset, rhs: CML.MultiAsset): Effect.Effect<CML.MultiAsset, MultiAssetError> =>
    Effect.try({
      try: () => instance.checked_add(rhs),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.checkedAdd failed with parameters: ${rhs} (MultiAsset). `,
        }),
    })
);

/**
 * Unsafely calls instance.checkedAdd without Effect wrapper
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiAsset.unsafeCheckedAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiAsset.unsafeCheckedAdd failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCheckedAdd = (instance: CML.MultiAsset, rhs: CML.MultiAsset): CML.MultiAsset =>
  Effect.runSync(checkedAdd(instance, rhs));

/**
 * Method checkedSub of MultiAsset
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 *   const result = yield* MultiAsset.checkedSub(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const checkedSub = Effect.fn(
  (instance: CML.MultiAsset, rhs: CML.MultiAsset): Effect.Effect<CML.MultiAsset, MultiAssetError> =>
    Effect.try({
      try: () => instance.checked_sub(rhs),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.checkedSub failed with parameters: ${rhs} (MultiAsset). `,
        }),
    })
);

/**
 * Unsafely calls instance.checkedSub without Effect wrapper
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiAsset.unsafeCheckedSub(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiAsset.unsafeCheckedSub failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCheckedSub = (instance: CML.MultiAsset, rhs: CML.MultiAsset): CML.MultiAsset =>
  Effect.runSync(checkedSub(instance, rhs));

/**
 * Method clampedSub of MultiAsset
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 *   const result = yield* MultiAsset.clampedSub(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const clampedSub = Effect.fn(
  (instance: CML.MultiAsset, rhs: CML.MultiAsset): Effect.Effect<CML.MultiAsset, MultiAssetError> =>
    Effect.try({
      try: () => instance.clamped_sub(rhs),
      catch: () =>
        new MultiAssetError({
          message: `MultiAsset.clampedSub failed with parameters: ${rhs} (MultiAsset). `,
        }),
    })
);

/**
 * Unsafely calls instance.clampedSub without Effect wrapper
 * 
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MultiAsset instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MultiAsset.unsafeClampedSub(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MultiAsset.unsafeClampedSub failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeClampedSub = (instance: CML.MultiAsset, rhs: CML.MultiAsset): CML.MultiAsset =>
  Effect.runSync(clampedSub(instance, rhs));

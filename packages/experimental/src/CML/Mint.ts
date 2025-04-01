/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Mint class
 *
 * @since 2.0.0
 * @category Types
 */
export type Mint = CML.Mint;

/**
 * Error class for Mint operations
 *
 * This error is thrown when operations on Mint instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MintError extends Data.TaggedError("MintError")<{
  message?: string;
}> {}

/**
 * Method free of Mint
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Mint instance
 * const instance = ... ;
 *   const result = yield* Mint.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Mint): Effect.Effect<void, MintError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MintError({
          message: `Mint.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Mint instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Mint.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Mint.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Mint): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of Mint
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Mint._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.Mint.new(),
    catch: () =>
      new MintError({
        message: `Mint._new failed `,
      }),
  });
});

/**
 * Unsafely calls Mint._new without Effect wrapper
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Mint._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Mint._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () => Effect.runSync(_new());

/**
 * Method policyCount of Mint
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Mint instance
 * const instance = ... ;
 *   const result = yield* Mint.policyCount(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const policyCount = Effect.fn(
  (instance: CML.Mint): Effect.Effect<number, MintError> =>
    Effect.try({
      try: () => instance.policy_count(),
      catch: () =>
        new MintError({
          message: `Mint.policyCount failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.policyCount without Effect wrapper
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Mint instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Mint.policyCountUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Mint.policyCountUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const policyCountUnsafe = (instance: CML.Mint): number =>
  Effect.runSync(policyCount(instance));

/**
 * Method insertAssets of Mint
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Mint instance
 * const instance = ... ;
 *   const result = yield* Mint.insertAssets(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const insertAssets = Effect.fn(
  (
    instance: CML.Mint,
    policyId: CML.ScriptHash,
    assets: CML.MapAssetNameToNonZeroInt64,
  ): Effect.Effect<CML.MapAssetNameToNonZeroInt64 | undefined, MintError> =>
    Effect.try({
      try: () => instance.insert_assets(policyId, assets),
      catch: () =>
        new MintError({
          message: `Mint.insertAssets failed with parameters: ${policyId} (ScriptHash), ${assets} (MapAssetNameToNonZeroInt64). `,
        }),
    }),
);

/**
 * Unsafely calls instance.insertAssets without Effect wrapper
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Mint instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Mint.insertAssetsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Mint.insertAssetsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const insertAssetsUnsafe = (
  instance: CML.Mint,
  policyId: CML.ScriptHash,
  assets: CML.MapAssetNameToNonZeroInt64,
): CML.MapAssetNameToNonZeroInt64 | undefined =>
  Effect.runSync(insertAssets(instance, policyId, assets));

/**
 * Method getAssets of Mint
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Mint instance
 * const instance = ... ;
 *   const result = yield* Mint.getAssets(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const getAssets = Effect.fn(
  (
    instance: CML.Mint,
    key: CML.ScriptHash,
  ): Effect.Effect<CML.MapAssetNameToNonZeroInt64 | undefined, MintError> =>
    Effect.try({
      try: () => instance.get_assets(key),
      catch: () =>
        new MintError({
          message: `Mint.getAssets failed with parameters: ${key} (ScriptHash). `,
        }),
    }),
);

/**
 * Unsafely calls instance.getAssets without Effect wrapper
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Mint instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Mint.getAssetsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Mint.getAssetsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getAssetsUnsafe = (
  instance: CML.Mint,
  key: CML.ScriptHash,
): CML.MapAssetNameToNonZeroInt64 | undefined =>
  Effect.runSync(getAssets(instance, key));

/**
 * Method get of Mint
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Mint instance
 * const instance = ... ;
 *   const result = yield* Mint.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.Mint,
    policyId: CML.ScriptHash,
    asset: CML.AssetName,
  ): Effect.Effect<bigint | undefined, MintError> =>
    Effect.try({
      try: () => instance.get(policyId, asset),
      catch: () =>
        new MintError({
          message: `Mint.get failed with parameters: ${policyId} (ScriptHash), ${asset} (AssetName). `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Mint instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Mint.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Mint.getUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.Mint,
  policyId: CML.ScriptHash,
  asset: CML.AssetName,
): bigint | undefined => Effect.runSync(get(instance, policyId, asset));

/**
 * Method set of Mint
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Mint instance
 * const instance = ... ;
 *   const result = yield* Mint.set(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const set = Effect.fn(
  (
    instance: CML.Mint,
    policyId: CML.ScriptHash,
    asset: CML.AssetName,
    value: bigint,
  ): Effect.Effect<bigint | undefined, MintError> =>
    Effect.try({
      try: () => instance.set(policyId, asset, value),
      catch: () =>
        new MintError({
          message: `Mint.set failed with parameters: ${policyId} (ScriptHash), ${asset} (AssetName), ${value}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.set without Effect wrapper
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Mint instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Mint.setUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Mint.setUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setUnsafe = (
  instance: CML.Mint,
  policyId: CML.ScriptHash,
  asset: CML.AssetName,
  value: bigint,
): bigint | undefined => Effect.runSync(set(instance, policyId, asset, value));

/**
 * Method keys of Mint
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Mint instance
 * const instance = ... ;
 *   const result = yield* Mint.keys(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const keys = Effect.fn(
  (instance: CML.Mint): Effect.Effect<CML.PolicyIdList, MintError> =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MintError({
          message: `Mint.keys failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Mint instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Mint.keysUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Mint.keysUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.Mint): CML.PolicyIdList =>
  Effect.runSync(keys(instance));

/**
 * Method checkedAdd of Mint
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Mint instance
 * const instance = ... ;
 *   const result = yield* Mint.checkedAdd(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const checkedAdd = Effect.fn(
  (instance: CML.Mint, rhs: CML.Mint): Effect.Effect<CML.Mint, MintError> =>
    Effect.try({
      try: () => instance.checked_add(rhs),
      catch: () =>
        new MintError({
          message: `Mint.checkedAdd failed with parameters: ${rhs} (Mint). `,
        }),
    }),
);

/**
 * Unsafely calls instance.checkedAdd without Effect wrapper
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Mint instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Mint.checkedAddUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Mint.checkedAddUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const checkedAddUnsafe = (instance: CML.Mint, rhs: CML.Mint): CML.Mint =>
  Effect.runSync(checkedAdd(instance, rhs));

/**
 * Method checkedSub of Mint
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Mint instance
 * const instance = ... ;
 *   const result = yield* Mint.checkedSub(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const checkedSub = Effect.fn(
  (instance: CML.Mint, rhs: CML.Mint): Effect.Effect<CML.Mint, MintError> =>
    Effect.try({
      try: () => instance.checked_sub(rhs),
      catch: () =>
        new MintError({
          message: `Mint.checkedSub failed with parameters: ${rhs} (Mint). `,
        }),
    }),
);

/**
 * Unsafely calls instance.checkedSub without Effect wrapper
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Mint instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Mint.checkedSubUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Mint.checkedSubUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const checkedSubUnsafe = (instance: CML.Mint, rhs: CML.Mint): CML.Mint =>
  Effect.runSync(checkedSub(instance, rhs));

/**
 * Method asPositiveMultiasset of Mint
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Mint instance
 * const instance = ... ;
 *   const result = yield* Mint.asPositiveMultiasset(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asPositiveMultiasset = Effect.fn(
  (instance: CML.Mint): Effect.Effect<CML.MultiAsset, MintError> =>
    Effect.try({
      try: () => instance.as_positive_multiasset(),
      catch: () =>
        new MintError({
          message: `Mint.asPositiveMultiasset failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asPositiveMultiasset without Effect wrapper
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Mint instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Mint.asPositiveMultiassetUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Mint.asPositiveMultiassetUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asPositiveMultiassetUnsafe = (
  instance: CML.Mint,
): CML.MultiAsset => Effect.runSync(asPositiveMultiasset(instance));

/**
 * Method asNegativeMultiasset of Mint
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Mint instance
 * const instance = ... ;
 *   const result = yield* Mint.asNegativeMultiasset(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asNegativeMultiasset = Effect.fn(
  (instance: CML.Mint): Effect.Effect<CML.MultiAsset, MintError> =>
    Effect.try({
      try: () => instance.as_negative_multiasset(),
      catch: () =>
        new MintError({
          message: `Mint.asNegativeMultiasset failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asNegativeMultiasset without Effect wrapper
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Mint instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Mint.asNegativeMultiassetUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Mint.asNegativeMultiassetUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asNegativeMultiassetUnsafe = (
  instance: CML.Mint,
): CML.MultiAsset => Effect.runSync(asNegativeMultiasset(instance));

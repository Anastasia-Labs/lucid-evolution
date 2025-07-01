import { Schema, Data, FastCheck, HashMap } from "effect";
import * as PolicyId from "./PolicyId.js";
import * as AssetName from "./AssetName.js";
import * as PositiveCoin from "./PositiveCoin.js";

/**
 * Error class for MultiAsset related operations.
 *
 * @example
 * import { MultiAsset } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new MultiAsset.MultiAssetError({ message: "Invalid multi asset" });
 * assert(error.message === "Invalid multi asset");
 *
 * @since 2.0.0
 * @category errors
 */
export class MultiAssetError extends Data.TaggedError("MultiAssetError")<{
  message?: string;
  reason?:
    | "InvalidStructure"
    | "EmptyAssetMap"
    | "ZeroAmount"
    | "DuplicateAsset";
}> {}

/**
 * Schema for inner asset map (asset_name => positive_coin).
 *
 * @since 2.0.0
 * @category schemas
 */
export const AssetMapSchema = Schema.HashMap({
  key: AssetName.AssetName,
  value: PositiveCoin.PositiveCoinSchema,
})
  .pipe(Schema.filter((map) => HashMap.size(map) > 0))
  .annotations({
    message: () => "Asset map cannot be empty",
    identifier: "AssetMap",
  });

/**
 * Type alias for the inner asset map.
 *
 * @since 2.0.0
 * @category model
 */
export type AssetMap = typeof AssetMapSchema.Type;

/**
 * Schema for MultiAsset representing native assets.
 * multiasset<a0> = {+ policy_id => {+ asset_name => a0}}
 * case: multiasset<positive_coin> = {+ policy_id => {+ asset_name => positive_coin}}
 *
 * @since 2.0.0
 * @category schemas
 */
export const MultiAssetSchema = Schema.HashMap({
  key: PolicyId.PolicyId,
  value: AssetMapSchema,
})
  .pipe(Schema.filter((map) => HashMap.size(map) > 0))
  .annotations({
    message: () => "MultiAsset cannot be empty",
    identifier: "MultiAsset",
  });

/**
 * Type alias for MultiAsset representing a collection of native assets.
 * Each policy ID maps to a collection of asset names and their amounts.
 * All amounts must be positive (non-zero).
 *
 * @example
 * import { MultiAsset, PolicyId, AssetName, PositiveCoin } from "@lucid-evolution/experimental";
 * import { HashMap } from "effect";
 *
 * const policyId = new PolicyId({ hash: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235" });
 * const assetName = new AssetName({ name: "546f6b656e" }); // "Token"
 * const amount = PositiveCoin.make(1000n);
 *
 * const assetMap = HashMap.make([assetName, amount]);
 * const multiAsset: MultiAsset.MultiAsset = HashMap.make([policyId, assetMap]);
 *
 * @since 2.0.0
 * @category model
 */
export type MultiAsset = typeof MultiAssetSchema.Type;

/**
 * Create an empty MultiAsset (note: this will fail validation as MultiAsset cannot be empty).
 * Use this only as a starting point for building a MultiAsset.
 *
 * @since 2.0.0
 * @category constructors
 */
export const empty = (): HashMap.HashMap<PolicyId.PolicyId, AssetMap> =>
  HashMap.empty();

/**
 * Create a MultiAsset from a single asset.
 *
 * @example
 * import { MultiAsset, PolicyId, AssetName, PositiveCoin } from "@lucid-evolution/experimental";
 *
 * const policyId = new PolicyId({ hash: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235" });
 * const assetName = new AssetName({ name: "546f6b656e" });
 * const amount = PositiveCoin.make(1000n);
 *
 * const multiAsset = MultiAsset.singleton(policyId, assetName, amount);
 *
 * @since 2.0.0
 * @category constructors
 */
export const singleton = (
  policyId: PolicyId.PolicyId,
  assetName: AssetName.AssetName,
  amount: PositiveCoin.PositiveCoin,
): MultiAsset => {
  const assetMap = HashMap.make([assetName, amount]);
  return HashMap.make([policyId, assetMap]);
};

/**
 * Add an asset to a MultiAsset, combining amounts if the asset already exists.
 *
 * @example
 * import { MultiAsset, PolicyId, AssetName, PositiveCoin } from "@lucid-evolution/experimental";
 *
 * const policyId = new PolicyId({ hash: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235" });
 * const assetName = new AssetName({ name: "546f6b656e" });
 * const amount = PositiveCoin.make(1000n);
 *
 * let multiAsset = MultiAsset.singleton(policyId, assetName, amount);
 * multiAsset = MultiAsset.addAsset(multiAsset, policyId, assetName, PositiveCoin.make(500n));
 * // The asset amount is now 1500n
 *
 * @since 2.0.0
 * @category transformation
 */
export const addAsset = (
  multiAsset: MultiAsset,
  policyId: PolicyId.PolicyId,
  assetName: AssetName.AssetName,
  amount: PositiveCoin.PositiveCoin,
): MultiAsset => {
  const existingAssetMap = HashMap.get(multiAsset, policyId);

  if (existingAssetMap._tag === "Some") {
    const existingAmount = HashMap.get(existingAssetMap.value, assetName);
    const newAmount =
      existingAmount._tag === "Some"
        ? PositiveCoin.add(existingAmount.value, amount)
        : amount;

    const updatedAssetMap = HashMap.set(
      existingAssetMap.value,
      assetName,
      newAmount,
    );
    return HashMap.set(multiAsset, policyId, updatedAssetMap);
  } else {
    const newAssetMap = HashMap.make([assetName, amount]);
    return HashMap.set(multiAsset, policyId, newAssetMap);
  }
};

/**
 * Get the amount of a specific asset from a MultiAsset.
 *
 * @example
 * import { MultiAsset, PolicyId, AssetName, PositiveCoin } from "@lucid-evolution/experimental";
 * import { Option } from "effect";
 *
 * const policyId = new PolicyId({ hash: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235" });
 * const assetName = new AssetName({ name: "546f6b656e" });
 * const amount = PositiveCoin.make(1000n);
 *
 * const multiAsset = MultiAsset.singleton(policyId, assetName, amount);
 * const retrievedAmount = MultiAsset.getAsset(multiAsset, policyId, assetName);
 * console.log(Option.isSome(retrievedAmount)); // true
 *
 * @since 2.0.0
 * @category transformation
 */
export const getAsset = (
  multiAsset: MultiAsset,
  policyId: PolicyId.PolicyId,
  assetName: AssetName.AssetName,
) => {
  const assetMap = HashMap.get(multiAsset, policyId);
  if (assetMap._tag === "Some") {
    return HashMap.get(assetMap.value, assetName);
  }
  return { _tag: "None" as const };
};

/**
 * Check if a MultiAsset contains a specific asset.
 *
 * @example
 * import { MultiAsset, PolicyId, AssetName, PositiveCoin } from "@lucid-evolution/experimental";
 *
 * const policyId = new PolicyId({ hash: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235" });
 * const assetName = new AssetName({ name: "546f6b656e" });
 * const amount = PositiveCoin.make(1000n);
 *
 * const multiAsset = MultiAsset.singleton(policyId, assetName, amount);
 * console.log(MultiAsset.hasAsset(multiAsset, policyId, assetName)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const hasAsset = (
  multiAsset: MultiAsset,
  policyId: PolicyId.PolicyId,
  assetName: AssetName.AssetName,
): boolean => {
  const result = getAsset(multiAsset, policyId, assetName);
  return result._tag === "Some";
};

/**
 * Get all policy IDs in a MultiAsset.
 *
 * @example
 * import { MultiAsset, PolicyId, AssetName, PositiveCoin } from "@lucid-evolution/experimental";
 *
 * const policyId = new PolicyId({ hash: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235" });
 * const assetName = new AssetName({ name: "546f6b656e" });
 * const amount = PositiveCoin.make(1000n);
 *
 * const multiAsset = MultiAsset.singleton(policyId, assetName, amount);
 * const policyIds = MultiAsset.getPolicyIds(multiAsset);
 * console.log(Array.from(policyIds).length); // 1
 *
 * @since 2.0.0
 * @category transformation
 */
export const getPolicyIds = (multiAsset: MultiAsset) =>
  HashMap.keys(multiAsset);

/**
 * Get all assets for a specific policy ID.
 *
 * @example
 * import { MultiAsset, PolicyId, AssetName, PositiveCoin } from "@lucid-evolution/experimental";
 * import { Option } from "effect";
 *
 * const policyId = new PolicyId({ hash: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235" });
 * const assetName = new AssetName({ name: "546f6b656e" });
 * const amount = PositiveCoin.make(1000n);
 *
 * const multiAsset = MultiAsset.singleton(policyId, assetName, amount);
 * const assets = MultiAsset.getAssetsByPolicy(multiAsset, policyId);
 * console.log(Option.isSome(assets)); // true
 *
 * @since 2.0.0
 * @category transformation
 */
export const getAssetsByPolicy = (
  multiAsset: MultiAsset,
  policyId: PolicyId.PolicyId,
) => HashMap.get(multiAsset, policyId);

/**
 * Check if two MultiAsset instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: MultiAsset, b: MultiAsset): boolean =>
  HashMap.size(a) === HashMap.size(b) &&
  Array.from(HashMap.keys(a)).every((policyId) => {
    const aAssets = HashMap.get(a, policyId);
    const bAssets = HashMap.get(b, policyId);

    if (aAssets._tag !== bAssets._tag) return false;
    if (aAssets._tag === "None") return true;
    if (bAssets._tag === "None") return false;

    const aMap = aAssets.value;
    const bMap = bAssets.value;

    return (
      HashMap.size(aMap) === HashMap.size(bMap) &&
      Array.from(HashMap.keys(aMap)).every((assetName) => {
        const aAmount = HashMap.get(aMap, assetName);
        const bAmount = HashMap.get(bMap, assetName);
        return (
          aAmount._tag === bAmount._tag &&
          (aAmount._tag === "None" ||
            (bAmount._tag === "Some" && aAmount.value === bAmount.value))
        );
      })
    );
  });

/**
 * Check if a value is a valid MultiAsset.
 *
 * @since 2.0.0
 * @category predicates
 */
export const is = (value: unknown): value is MultiAsset =>
  Schema.is(MultiAssetSchema)(value);

/**
 * Generate a random MultiAsset.
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.array(
  FastCheck.tuple(
    PolicyId.generator,
    FastCheck.array(
      FastCheck.tuple(AssetName.generator, PositiveCoin.generator),
      { minLength: 1, maxLength: 5 },
    ).map((assets) => HashMap.fromIterable(assets)),
  ),
  { minLength: 1, maxLength: 3 },
).map((policies) => HashMap.fromIterable(policies));

/**
 * Synchronous encoding/decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  sync: Schema.encodeSync(MultiAssetSchema),
};

export const Decode = {
  sync: Schema.decodeUnknownSync(MultiAssetSchema),
};

/**
 * Either encoding/decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  either: Schema.encodeEither(MultiAssetSchema),
};

export const DecodeEither = {
  either: Schema.decodeUnknownEither(MultiAssetSchema),
};

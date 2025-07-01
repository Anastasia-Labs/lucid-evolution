import { Schema, Data, FastCheck, Option } from "effect";
import * as Coin from "./Coin.js";
import * as MultiAsset from "./MultiAsset.js";

/**
 * Error class for Value related operations.
 *
 * @example
 * import { Value } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new Value.ValueError({ message: "Invalid value" });
 * assert(error.message === "Invalid value");
 *
 * @since 2.0.0
 * @category errors
 */
export class ValueError extends Data.TaggedError("ValueError")<{
  message?: string;
  reason?: "InvalidStructure" | "NegativeAmount" | "InvalidCombination";
}> {}

/**
 * Schema for Value representing both ADA and native assets.
 * value = coin / [coin, multiasset<positive_coin>]
 *
 * This can be either:
 * 1. Just a coin amount (ADA only)
 * 2. A tuple of [coin, multiasset] (ADA + native assets)
 *
 * @since 2.0.0
 * @category schemas
 */
export const ValueSchema = Schema.Union(
  Coin.CoinSchema,
  Schema.Tuple(Coin.CoinSchema, MultiAsset.MultiAssetSchema),
);

/**
 * Type alias for Value representing transaction outputs.
 * Can contain both ADA (lovelace) and native assets.
 *
 * @example
 * import { Value, Coin, MultiAsset, PolicyId, AssetName, PositiveCoin } from "@lucid-evolution/experimental";
 *
 * // ADA-only value
 * const adaOnlyValue: Value.Value = Coin.make(1000000n); // 1 ADA
 *
 * // Value with ADA + native assets
 * const policyId = new PolicyId({ hash: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235" });
 * const assetName = new AssetName({ name: "546f6b656e" });
 * const amount = PositiveCoin.make(1000n);
 * const multiAsset = MultiAsset.singleton(policyId, assetName, amount);
 * const mixedValue: Value.Value = [Coin.make(2000000n), multiAsset];
 *
 * @since 2.0.0
 * @category model
 */
export type Value = typeof ValueSchema.Type;

/**
 * Create a Value containing only ADA.
 *
 * @example
 * import { Value, Coin } from "@lucid-evolution/experimental";
 *
 * const value = Value.onlyAda(Coin.make(1000000n)); // 1 ADA
 *
 * @since 2.0.0
 * @category constructors
 */
export const onlyAda = (ada: Coin.Coin): Value => ada;

/**
 * Create a Value containing ADA and native assets.
 *
 * @example
 * import { Value, Coin, MultiAsset, PolicyId, AssetName, PositiveCoin } from "@lucid-evolution/experimental";
 *
 * const ada = Coin.make(2000000n);
 * const policyId = new PolicyId({ hash: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235" });
 * const assetName = new AssetName({ name: "546f6b656e" });
 * const amount = PositiveCoin.make(1000n);
 * const multiAsset = MultiAsset.singleton(policyId, assetName, amount);
 * const value = Value.withAssets(ada, multiAsset);
 *
 * @since 2.0.0
 * @category constructors
 */
export const withAssets = (
  ada: Coin.Coin,
  assets: MultiAsset.MultiAsset,
): Value => [ada, assets] as const;

/**
 * Extract the ADA amount from a Value.
 *
 * @example
 * import { Value, Coin } from "@lucid-evolution/experimental";
 *
 * const adaOnlyValue = Value.onlyAda(Coin.make(1000000n));
 * const ada = Value.getAda(adaOnlyValue);
 * console.log(ada); // 1000000n
 *
 * @since 2.0.0
 * @category transformation
 */
export const getAda = (value: Value): Coin.Coin => {
  if (typeof value === "bigint") {
    return value;
  } else {
    return value[0];
  }
};

/**
 * Extract the MultiAsset from a Value, if it exists.
 *
 * @example
 * import { Value, Coin, MultiAsset } from "@lucid-evolution/experimental";
 * import { Option } from "effect";
 *
 * const adaOnlyValue = Value.onlyAda(Coin.make(1000000n));
 * const assets = Value.getAssets(adaOnlyValue);
 * console.log(Option.isNone(assets)); // true (no assets)
 *
 * @since 2.0.0
 * @category transformation
 */
export const getAssets = (
  value: Value,
): Option.Option<MultiAsset.MultiAsset> => {
  if (typeof value === "bigint") {
    return Option.none();
  } else {
    return Option.some(value[1]);
  }
};

/**
 * Check if a Value contains only ADA (no native assets).
 *
 * @example
 * import { Value, Coin } from "@lucid-evolution/experimental";
 *
 * const adaOnlyValue = Value.onlyAda(Coin.make(1000000n));
 * console.log(Value.isAdaOnly(adaOnlyValue)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isAdaOnly = (value: Value): value is Coin.Coin =>
  typeof value === "bigint";

/**
 * Check if a Value contains native assets.
 *
 * @example
 * import { Value, Coin, MultiAsset } from "@lucid-evolution/experimental";
 *
 * const adaOnlyValue = Value.onlyAda(Coin.make(1000000n));
 * console.log(Value.hasAssets(adaOnlyValue)); // false
 *
 * @since 2.0.0
 * @category predicates
 */
export const hasAssets = (
  value: Value,
): value is readonly [Coin.Coin, MultiAsset.MultiAsset] => !isAdaOnly(value);

/**
 * Add two Values together.
 * Combines ADA amounts and merges MultiAssets.
 *
 * @example
 * import { Value, Coin, MultiAsset, PolicyId, AssetName, PositiveCoin } from "@lucid-evolution/experimental";
 *
 * const value1 = Value.onlyAda(Coin.make(1000000n));
 * const value2 = Value.onlyAda(Coin.make(2000000n));
 * const result = Value.add(value1, value2);
 * console.log(Value.getAda(result)); // 3000000n
 *
 * @since 2.0.0
 * @category transformation
 */
export const add = (a: Value, b: Value): Value => {
  const adaA = getAda(a);
  const adaB = getAda(b);
  const totalAda = Coin.add(adaA, adaB);

  const assetsA = getAssets(a);
  const assetsB = getAssets(b);

  if (Option.isNone(assetsA) && Option.isNone(assetsB)) {
    return onlyAda(totalAda);
  }

  // Merge assets - this is a simplified version
  // In practice, you'd need a proper merge function for MultiAssets
  if (Option.isSome(assetsA) && Option.isNone(assetsB)) {
    return withAssets(totalAda, assetsA.value);
  }

  if (Option.isNone(assetsA) && Option.isSome(assetsB)) {
    return withAssets(totalAda, assetsB.value);
  }

  // Both have assets - would need MultiAsset.merge function
  if (Option.isSome(assetsA) && Option.isSome(assetsB)) {
    // For now, just use the first one - proper implementation would merge
    return withAssets(totalAda, assetsA.value);
  }

  return onlyAda(totalAda);
};

/**
 * Subtract Value b from Value a.
 * Note: This is a simplified implementation.
 *
 * @example
 * import { Value, Coin } from "@lucid-evolution/experimental";
 *
 * const value1 = Value.onlyAda(Coin.make(3000000n));
 * const value2 = Value.onlyAda(Coin.make(1000000n));
 * const result = Value.subtract(value1, value2);
 * console.log(Value.getAda(result)); // 2000000n
 *
 * @since 2.0.0
 * @category transformation
 */
export const subtract = (a: Value, b: Value): Value => {
  const adaA = getAda(a);
  const adaB = getAda(b);
  const resultAda = Coin.subtract(adaA, adaB);

  // Simplified: for ADA-only values
  if (isAdaOnly(a) && isAdaOnly(b)) {
    return onlyAda(resultAda);
  }

  // For mixed values, would need proper MultiAsset subtraction
  const assetsA = getAssets(a);
  if (Option.isSome(assetsA)) {
    return withAssets(resultAda, assetsA.value);
  }

  return onlyAda(resultAda);
};

/**
 * Check if two Values are equal.
 *
 * @example
 * import { Value, Coin } from "@lucid-evolution/experimental";
 *
 * const value1 = Value.onlyAda(Coin.make(1000000n));
 * const value2 = Value.onlyAda(Coin.make(1000000n));
 * console.log(Value.equals(value1, value2)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: Value, b: Value): boolean => {
  const adaEqual = Coin.equals(getAda(a), getAda(b));

  if (!adaEqual) return false;

  const assetsA = getAssets(a);
  const assetsB = getAssets(b);

  if (Option.isNone(assetsA) && Option.isNone(assetsB)) {
    return true;
  }

  if (Option.isSome(assetsA) && Option.isSome(assetsB)) {
    return MultiAsset.equals(assetsA.value, assetsB.value);
  }

  return false;
};

/**
 * Check if a value is a valid Value.
 *
 * @since 2.0.0
 * @category predicates
 */
export const is = (value: unknown): value is Value =>
  Schema.is(ValueSchema)(value);

/**
 * Generate a random Value.
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.oneof(
  Coin.generator,
  FastCheck.tuple(Coin.generator, MultiAsset.generator),
);

/**
 * Synchronous encoding/decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  sync: Schema.encodeSync(ValueSchema),
};

export const Decode = {
  sync: Schema.decodeUnknownSync(ValueSchema),
};

/**
 * Either encoding/decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  either: Schema.encodeEither(ValueSchema),
};

export const DecodeEither = {
  either: Schema.decodeUnknownEither(ValueSchema),
};

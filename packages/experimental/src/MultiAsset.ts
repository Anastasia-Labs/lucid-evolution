import { Schema, Data, FastCheck, HashMap, ParseResult, Effect } from "effect";
import * as PolicyId from "./PolicyId.js";
import * as AssetName from "./AssetName.js";
import * as PositiveCoin from "./PositiveCoin.js";
import * as CBOR from "./CBOR.js";
import { Bytes } from "./index.js";

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
 * CDDL schema for MultiAsset as map structure.
 * multiasset<positive_coin> = {+ policy_id => {+ asset_name => positive_coin}}
 *
 * Where:
 * - policy_id: 28-byte Uint8Array (from CBOR byte string)
 * - asset_name: variable-length Uint8Array (from CBOR byte string, can be empty)
 * - positive_coin: unsigned 64-bit integer (must be > 0)
 *
 * @since 2.0.0
 * @category schemas
 */
export const MultiAssetCDDLSchema = Schema.Map({
  key: Schema.Uint8ArrayFromSelf, // Policy ID as Uint8Array (28 bytes)
  value: Schema.Map({
    key: Schema.Uint8ArrayFromSelf, // Asset name as Uint8Array (variable length)
    value: Schema.Number, // Amount as number (will be converted to PositiveCoin)
  }),
});

/**
 * TypeScript type for the raw CDDL representation.
 * This is what gets encoded/decoded to/from CBOR.
 *
 * @since 2.0.0
 * @category model
 */
export type MultiAssetCDDL = Map<Uint8Array, Map<Uint8Array, number>>;

/**
 * Helper function to convert MultiAsset to entries array for manipulation
 */
const toEntries = (
  multiAsset: MultiAsset,
): Array<
  [PolicyId.PolicyId, Array<[AssetName.AssetName, PositiveCoin.PositiveCoin]>]
> => {
  return Array.from(HashMap.entries(multiAsset)).map(([policyId, assetMap]) => [
    policyId,
    Array.from(HashMap.entries(assetMap)),
  ]);
};

/**
 * Helper function to create MultiAsset from entries array
 */
const fromEntries = (
  entries: Array<
    [PolicyId.PolicyId, Array<[AssetName.AssetName, PositiveCoin.PositiveCoin]>]
  >,
): MultiAsset => {
  return HashMap.fromIterable(
    entries.map(([policyId, assetEntries]) => [
      policyId,
      HashMap.fromIterable(assetEntries),
    ]),
  );
};

/**
 * CBOR bytes transformation schema for MultiAsset.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = Schema.transformOrFail(
  Schema.typeSchema(Bytes.BytesSchema),
  Schema.typeSchema(MultiAssetSchema),
  {
    strict: true,
    encode: (_, __, ___, toA) =>
      ParseResult.succeed(
        CBOR.Encode.bytes(
          new Map(
            toEntries(toA).map(([policyId, assetEntries]) => [
              Bytes.Decode.hex(policyId),
              new Map(
                assetEntries.map(([assetName, amount]) => [
                  Bytes.Decode.hex(assetName),
                  Number(amount),
                ]),
              ),
            ]),
          ),
        ),
      ),
    decode: (_, __, ___, fromI) =>
      Effect.gen(function* () {
        const map = yield* ParseResult.decode(CBOR.CBORBytesSchema())(fromI);
        const m = yield* ParseResult.decodeUnknown(MultiAssetCDDLSchema)(map);
        return fromCDDL(m);
      }),
  },
);

/**
 * CBOR hex transformation schema for MultiAsset.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = Schema.transformOrFail(
  Schema.typeSchema(Bytes.HexSchema),
  Schema.typeSchema(MultiAssetSchema),
  {
    strict: true,
    encode: (_, __, ___, toA) =>
      ParseResult.succeed(
        CBOR.Encode.hex(
          new Map(
            toEntries(toA).map(([policyId, assetEntries]) => [
              Bytes.Decode.hex(policyId),
              new Map(
                assetEntries.map(([assetName, amount]) => [
                  Bytes.Decode.hex(assetName),
                  Number(amount),
                ]),
              ),
            ]),
          ),
        ),
      ),
    decode: (_, __, ___, fromI) =>
      Effect.gen(function* () {
        const map = yield* ParseResult.decode(CBOR.CBORHexSchema())(fromI);
        const cddlMap =
          yield* ParseResult.decodeUnknown(MultiAssetCDDLSchema)(map);
        const m = fromCDDL(cddlMap);
        return m;
      }),
  },
);

/**
 * Convert MultiAsset to raw Map data for CBOR encoding.
 *
 * @since 2.0.0
 * @category transformation
 */
export const toCDDL = (multiAsset: MultiAsset): MultiAssetCDDL => {
  const outerMap = new Map<Uint8Array, Map<Uint8Array, number>>();

  for (const [policyId, assetMap] of HashMap.entries(multiAsset)) {
    const policyIdBytes = Bytes.Decode.hex(policyId);
    const innerMap = new Map<Uint8Array, number>();

    for (const [assetName, amount] of HashMap.entries(assetMap)) {
      const assetNameBytes = Bytes.Decode.hex(assetName);
      innerMap.set(assetNameBytes, Number(amount));
    }

    outerMap.set(policyIdBytes, innerMap);
  }

  return outerMap;
};

/**
 * Create MultiAsset from raw Map data after CBOR decoding.
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromCDDL = (raw: MultiAssetCDDL): MultiAsset => {
  const entries = Array.from(raw.entries()).map(([policyIdBytes, assetMap]) => {
    const policyId = PolicyId.PolicyId.make(Bytes.Encode.hex(policyIdBytes));
    const assetEntries = Array.from(assetMap.entries()).map(
      ([assetNameBytes, amount]) => {
        const assetName = AssetName.AssetName.make(
          Bytes.Encode.hex(assetNameBytes),
        );
        const positiveCoin = Schema.decodeUnknownSync(
          PositiveCoin.PositiveCoinSchema,
        )(amount);
        return [assetName, positiveCoin] as [
          AssetName.AssetName,
          PositiveCoin.PositiveCoin,
        ];
      },
    );
    return [policyId, assetEntries] as [
      PolicyId.PolicyId,
      Array<[AssetName.AssetName, PositiveCoin.PositiveCoin]>,
    ];
  });

  return fromEntries(entries);
};

/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  cborHex: Schema.encodeSync(CBORHexSchema),
  cborBytes: Schema.encodeSync(CBORBytesSchema),
};

/**
 * Synchronous decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  cborHex: Schema.decodeUnknownSync(CBORHexSchema),
  cborBytes: Schema.decodeUnknownSync(CBORBytesSchema),
};

/**
 * Either encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  cborHex: Schema.encodeEither(CBORHexSchema),
  cborBytes: Schema.encodeEither(CBORBytesSchema),
};

/**
 * Either decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  cborHex: Schema.decodeUnknownEither(CBORHexSchema),
  cborBytes: Schema.decodeUnknownEither(CBORBytesSchema),
};

/**
 * Merge two MultiAsset instances, combining amounts for assets that exist in both.
 *
 * @example
 * import { MultiAsset, PolicyId, AssetName, PositiveCoin } from "@lucid-evolution/experimental";
 *
 * const policyId = new PolicyId({ hash: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235" });
 * const assetName = new AssetName({ name: "546f6b656e" });
 *
 * const multiAsset1 = MultiAsset.singleton(policyId, assetName, PositiveCoin.make(1000n));
 * const multiAsset2 = MultiAsset.singleton(policyId, assetName, PositiveCoin.make(500n));
 * const merged = MultiAsset.merge(multiAsset1, multiAsset2);
 * // The merged asset amount is now 1500n
 *
 * @since 2.0.0
 * @category transformation
 */
export const merge = (a: MultiAsset, b: MultiAsset): MultiAsset => {
  let result = a;

  for (const [policyId, assetMap] of HashMap.entries(b)) {
    for (const [assetName, amount] of HashMap.entries(assetMap)) {
      result = addAsset(result, policyId, assetName, amount);
    }
  }

  return result;
};

/**
 * Subtract MultiAsset b from MultiAsset a.
 * Returns a new MultiAsset with amounts reduced by the amounts in b.
 * If any asset would result in zero or negative amount, it's removed from the result.
 * If the result would be empty, an error is thrown since MultiAsset cannot be empty.
 *
 * @example
 * import { MultiAsset, PolicyId, AssetName, PositiveCoin } from "@lucid-evolution/experimental";
 *
 * const policyId = new PolicyId({ hash: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235" });
 * const assetName = new AssetName({ name: "546f6b656e" });
 *
 * const multiAsset1 = MultiAsset.singleton(policyId, assetName, PositiveCoin.make(1500n));
 * const multiAsset2 = MultiAsset.singleton(policyId, assetName, PositiveCoin.make(500n));
 * const result = MultiAsset.subtract(multiAsset1, multiAsset2);
 * // The result asset amount is now 1000n
 *
 * @since 2.0.0
 * @category transformation
 */
export const subtract = (a: MultiAsset, b: MultiAsset): MultiAsset => {
  let result = HashMap.empty<PolicyId.PolicyId, AssetMap>();

  // Start with all assets from a
  for (const [policyId, assetMapA] of HashMap.entries(a)) {
    const assetMapB = HashMap.get(b, policyId);

    if (assetMapB._tag === "None") {
      // No assets to subtract for this policy, keep all
      result = HashMap.set(result, policyId, assetMapA);
    } else {
      // Subtract assets for this policy
      let newAssetMap = HashMap.empty<
        AssetName.AssetName,
        PositiveCoin.PositiveCoin
      >();

      for (const [assetName, amountA] of HashMap.entries(assetMapA)) {
        const amountB = HashMap.get(assetMapB.value, assetName);

        if (amountB._tag === "None") {
          // No amount to subtract, keep the original
          newAssetMap = HashMap.set(newAssetMap, assetName, amountA);
        } else {
          // Subtract amounts
          const diff = amountA - amountB.value;
          if (diff > 0n) {
            // Only keep positive amounts
            newAssetMap = HashMap.set(
              newAssetMap,
              assetName,
              PositiveCoin.make(diff),
            );
          }
          // If diff <= 0, the asset is removed (not added to newAssetMap)
        }
      }

      // Only add the policy if it has remaining assets
      if (HashMap.size(newAssetMap) > 0) {
        result = HashMap.set(result, policyId, newAssetMap);
      }
    }
  }

  // Check if result is empty
  if (HashMap.size(result) === 0) {
    throw new MultiAssetError({
      message: "Subtraction would result in empty MultiAsset",
      reason: "EmptyAssetMap",
    });
  }

  return result;
};

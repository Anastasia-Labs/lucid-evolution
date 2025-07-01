import { Schema, Data, FastCheck, HashMap, ParseResult, Effect } from "effect";
import * as PolicyId from "./PolicyId.js";
import * as AssetName from "./AssetName.js";
import * as NonZeroInt64 from "./NonZeroInt64.js";
import * as CBOR from "./CBOR.js";
import { Bytes } from "./index.js";

/**
 * Error class for Mint related operations.
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new Mint.MintError({ message: "Invalid mint" });
 * assert(error.message === "Invalid mint");
 *
 * @since 2.0.0
 * @category errors
 */
export class MintError extends Data.TaggedError("MintError")<{
  message?: string;
  reason?:
    | "InvalidStructure"
    | "EmptyAssetMap"
    | "ZeroAmount"
    | "DuplicateAsset";
}> {}

/**
 * Schema for inner asset map (asset_name => nonZeroInt64).
 *
 * @since 2.0.0
 * @category schemas
 */
export const AssetMap = Schema.HashMap({
  key: AssetName.AssetName,
  value: NonZeroInt64.NonZeroInt64Schema,
})
  .pipe(Schema.filter((map) => HashMap.size(map) > 0))
  .annotations({
    message: () => "Asset map cannot be empty",
    identifier: "MintAssetMap",
  });

/**
 * Schema for Mint representing token minting/burning operations.
 * mint = multiasset<nonZeroInt64>
 *
 * The structure is: policy_id => { asset_name => nonZeroInt64 }
 * - Positive values represent minting
 * - Negative values represent burning
 *
 * @example
 * import { Mint, PolicyId, AssetName, NonZeroInt64 } from "@lucid-evolution/experimental";
 * import { HashMap } from "effect";
 *
 * const mint = new Mint({
 *   assets: HashMap.make([
 *     new PolicyId.PolicyId({ hash: "..." }),
 *     HashMap.make([
 *       [new AssetName.AssetName({ name: "token1" }), NonZeroInt64.make(1000n)]
 *     ])
 *   ])
 * });
 *
 * @since 2.0.0
 * @category model
 */
export class Mint extends Schema.TaggedClass<Mint>()("Mint", {
  assets: Schema.HashMap({
    key: PolicyId.PolicyId,
    value: AssetMap,
  }),
}) {
  [Symbol.for("nodejs.util.inspect.custom")]() {
    const assetEntries = HashMap.toEntries(this.assets).map(
      ([policyId, assetMap]) => [
        policyId,
        HashMap.toEntries(assetMap).map(([assetName, amount]) => [
          assetName,
          amount.toString(),
        ]),
      ],
    );
    return {
      _tag: "Mint",
      assets: assetEntries,
    };
  }
}

/**
 * Create empty Mint.
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 *
 * const mint = Mint.empty();
 *
 * @since 2.0.0
 * @category constructors
 */
export const empty = (): Mint =>
  new Mint({
    assets: HashMap.empty(),
  });

/**
 * Create Mint from a single policy and asset entry.
 *
 * @example
 * import { Mint, PolicyId, AssetName, NonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * const policyId = new PolicyId.PolicyId({ hash: "..." });
 * const assetName = new AssetName.AssetName({ name: "token1" });
 * const mint = Mint.singleton(policyId, assetName, NonZeroInt64.make(1000n));
 *
 * @since 2.0.0
 * @category constructors
 */
export const singleton = (
  policyId: PolicyId.PolicyId,
  assetName: AssetName.AssetName,
  amount: NonZeroInt64.NonZeroInt64,
): Mint => {
  const assetMap = HashMap.make([assetName, amount]);
  return new Mint({
    assets: HashMap.make([policyId, assetMap]),
  });
};

/**
 * Add or update an asset in the Mint.
 *
 * @example
 * import { Mint, PolicyId, AssetName, NonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * const mint = Mint.empty();
 * const policyId = new PolicyId.PolicyId({ hash: "..." });
 * const assetName = new AssetName.AssetName({ name: "token1" });
 * const updatedMint = Mint.insert(mint, policyId, assetName, NonZeroInt64.make(1000n));
 *
 * @since 2.0.0
 * @category transformation
 */
export const insert = (
  mint: Mint,
  policyId: PolicyId.PolicyId,
  assetName: AssetName.AssetName,
  amount: NonZeroInt64.NonZeroInt64,
): Mint => {
  const existingAssetMap = HashMap.get(mint.assets, policyId);

  if (existingAssetMap._tag === "Some") {
    const updatedAssetMap = HashMap.set(
      existingAssetMap.value,
      assetName,
      amount,
    );
    return new Mint({
      assets: HashMap.set(mint.assets, policyId, updatedAssetMap),
    });
  } else {
    const newAssetMap = HashMap.make([assetName, amount]);
    return new Mint({
      assets: HashMap.set(mint.assets, policyId, newAssetMap),
    });
  }
};

/**
 * Remove an asset from the Mint.
 *
 * @example
 * import { Mint, PolicyId, AssetName } from "@lucid-evolution/experimental";
 *
 * const mint = Mint.singleton(policyId, assetName, NonZeroInt64.make(1000n));
 * const updatedMint = Mint.remove(mint, policyId, assetName);
 *
 * @since 2.0.0
 * @category transformation
 */
export const remove = (
  mint: Mint,
  policyId: PolicyId.PolicyId,
  assetName: AssetName.AssetName,
): Mint => {
  const existingAssetMap = HashMap.get(mint.assets, policyId);

  if (existingAssetMap._tag === "Some") {
    const updatedAssetMap = HashMap.remove(existingAssetMap.value, assetName);

    if (HashMap.size(updatedAssetMap) === 0) {
      // Remove the entire policy if no assets remain
      return new Mint({
        assets: HashMap.remove(mint.assets, policyId),
      });
    } else {
      return new Mint({
        assets: HashMap.set(mint.assets, policyId, updatedAssetMap),
      });
    }
  }

  return mint; // Asset not found, return unchanged
};

/**
 * Get the amount for a specific policy and asset.
 *
 * @example
 * import { Mint, PolicyId, AssetName, NonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * const mint = Mint.singleton(policyId, assetName, NonZeroInt64.make(1000n));
 * const amount = Mint.get(mint, policyId, assetName);
 * // Some(NonZeroInt64.make(1000n))
 *
 * @since 2.0.0
 * @category transformation
 */
export const get = (
  mint: Mint,
  policyId: PolicyId.PolicyId,
  assetName: AssetName.AssetName,
): NonZeroInt64.NonZeroInt64 | undefined => {
  const assetMap = HashMap.get(mint.assets, policyId);
  if (assetMap._tag === "Some") {
    const amount = HashMap.get(assetMap.value, assetName);
    return amount._tag === "Some" ? amount.value : undefined;
  }
  return undefined;
};

/**
 * Check if Mint contains a specific policy and asset.
 *
 * @example
 * import { Mint, PolicyId, AssetName, NonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * const mint = Mint.singleton(policyId, assetName, NonZeroInt64.make(1000n));
 * const hasAsset = Mint.has(mint, policyId, assetName); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const has = (
  mint: Mint,
  policyId: PolicyId.PolicyId,
  assetName: AssetName.AssetName,
): boolean => get(mint, policyId, assetName) !== undefined;

/**
 * Check if Mint is empty.
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 *
 * const mint = Mint.empty();
 * const empty = Mint.isEmpty(mint); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isEmpty = (mint: Mint): boolean => HashMap.size(mint.assets) === 0;

/**
 * Get the number of policies in the Mint.
 *
 * @example
 * import { Mint, PolicyId, AssetName, NonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * const mint = Mint.singleton(policyId, assetName, NonZeroInt64.make(1000n));
 * const policyCount = Mint.policyCount(mint); // 1
 *
 * @since 2.0.0
 * @category transformation
 */
export const policyCount = (mint: Mint): number => HashMap.size(mint.assets);

export const fromEntries = (
  entries: Array<
    [PolicyId.PolicyId, [AssetName.AssetName, NonZeroInt64.NonZeroInt64][]]
  >,
): Mint => {
  const assets = HashMap.fromIterable(
    entries.map(([policyId, assetEntries]) => [
      policyId,
      HashMap.fromIterable(
        assetEntries.map(([assetName, amount]) => [assetName, amount]),
      ),
    ]),
  );
  return new Mint({ assets });
};

/**
 * Get all entries as an array of [policy, asset, amount] tuples.
 *
 * @example
 * import { Mint } from "@lucid-evolution/experimental";
 *
 * const mint = Mint.singleton(policyId, assetName, NonZeroInt64.make(1000n));
 * const entries = Mint.entries(mint);
 *
 * @since 2.0.0
 * @category transformation
 */
export const entries = (
  mint: Mint,
): Array<
  [PolicyId.PolicyId, AssetName.AssetName, NonZeroInt64.NonZeroInt64]
> => {
  const result: Array<
    [PolicyId.PolicyId, AssetName.AssetName, NonZeroInt64.NonZeroInt64]
  > = [];

  for (const [policyId, assetMap] of HashMap.toEntries(mint.assets)) {
    for (const [assetName, amount] of HashMap.toEntries(assetMap)) {
      result.push([policyId, assetName, amount]);
    }
  }

  return result;
};

/**
 * Check if two Mint instances are equal.
 *
 * @example
 * import { Mint, PolicyId, AssetName, NonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * const mint1 = Mint.singleton(policyId, assetName, NonZeroInt64.make(1000n));
 * const mint2 = Mint.singleton(policyId, assetName, NonZeroInt64.make(1000n));
 * const isEqual = Mint.equals(mint1, mint2); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (self: Mint, that: Mint): boolean => {
  if (HashMap.size(self.assets) !== HashMap.size(that.assets)) return false;

  for (const [policyId, assetMap] of HashMap.toEntries(self.assets)) {
    const otherAssetMap = HashMap.get(that.assets, policyId);
    if (otherAssetMap._tag === "None") return false;

    if (HashMap.size(assetMap) !== HashMap.size(otherAssetMap.value))
      return false;

    for (const [assetName, amount] of HashMap.toEntries(assetMap)) {
      const otherAmount = HashMap.get(otherAssetMap.value, assetName);
      if (otherAmount._tag === "None" || otherAmount.value !== amount)
        return false;
    }
  }

  return true;
};

/**
 * FastCheck generator for Mint instances.
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.array(
  FastCheck.tuple(
    PolicyId.generator,
    FastCheck.array(
      FastCheck.tuple(AssetName.generator, NonZeroInt64.generator),
      { minLength: 1, maxLength: 5 },
    ),
  ),
  { minLength: 0, maxLength: 5 },
).map((entries) => {
  const assets = HashMap.fromIterable(
    entries.map(([policyId, assetEntries]) => [
      policyId,
      HashMap.fromIterable(assetEntries),
    ]),
  );
  return new Mint({ assets });
});

/**
 * CDDL schema for Mint as map structure.
 * mint = {* policy_id => {* asset_name => int64}}
 *
 * Where:
 * - policy_id: 28-byte Uint8Array (from CBOR byte string)
 * - asset_name: variable-length Uint8Array (from CBOR byte string, can be empty)
 * - int64: signed 64-bit integer (positive = mint, negative = burn)
 *
 * @since 2.0.0
 * @category schemas
 */
export const MintCDDLSchema = Schema.Map({
  key: Schema.Uint8ArrayFromSelf, // Policy ID as Uint8Array (28 bytes)
  value: Schema.Map({
    key: Schema.Uint8ArrayFromSelf, // Asset name as Uint8Array (variable length)
    value: Schema.Number, // Amount as number (will be converted to NonZeroInt64)
  }),
});

/**
 * TypeScript type for the raw CDDL representation.
 * This is what gets encoded/decoded to/from CBOR.
 *
 * @since 2.0.0
 * @category model
 */
export type MintCDDL = Map<Uint8Array, Map<Uint8Array, number>>;

/**
 * CBOR bytes transformation schema for Mint.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = Schema.transformOrFail(
  Schema.typeSchema(Bytes.BytesSchema),
  Schema.typeSchema(Mint),
  {
    strict: true,
    encode: (_, __, ___, toA) =>
      // Convert HashMap to Map and then encode to CBOR bytes
      ParseResult.succeed(
        CBOR.Encode().bytes(
          new Map(
            HashMap.toEntries(toA.assets).map(([policyId, assetMap]) => [
              policyId, // Convert PolicyId to Uint8Array
              new Map(
                HashMap.toEntries(assetMap).map(([assetName, amount]) => [
                  assetName, // Convert AssetName to Uint8Array
                  amount, // Convert NonZeroInt64 to BigInt
                ]),
              ),
            ]),
          ),
        ),
      ),
    decode: (_, __, ___, fromI) =>
      Effect.gen(function* () {
        const map = yield* ParseResult.decode(
          CBOR.makeCBORBytesSchema(MintCDDLSchema),
        )(fromI);
        const m = fromRaw(map);
        return m;
      }),
  },
);

/**
 * CBOR hex transformation schema for Mint.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = CBOR.makeCBORHexSchema(MintCDDLSchema);

/**
 * Encoding utilities using CBOR.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeRaw = CBOR.EncodeWithSchema(MintCDDLSchema);

/**
 * Decoding utilities using CBOR.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeRaw = CBOR.DecodeWithSchema(MintCDDLSchema);

/**
 * Convert Mint to raw Map data for CBOR encoding.
 *
 * @since 2.0.0
 * @category transformation
 */
export const toRaw = (mint: Mint): MintCDDL => {
  const outerMap = new Map<Uint8Array, Map<Uint8Array, number>>();

  for (const [policyId, assetMap] of HashMap.toEntries(mint.assets)) {
    const policyIdBytes = Bytes.Decode.hex(policyId);
    const innerMap = new Map<Uint8Array, number>();

    for (const [assetName, amount] of HashMap.toEntries(assetMap)) {
      const assetNameBytes = Bytes.Decode.hex(assetName);
      innerMap.set(assetNameBytes, Number(amount));
    }

    outerMap.set(policyIdBytes, innerMap);
  }

  return outerMap;
};

/**
 * Create Mint from raw Map data after CBOR decoding.
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromRaw = (raw: MintCDDL): Mint => {
  const assets = HashMap.fromIterable(
    Array.from(raw.entries()).map(([policyIdBytes, assetMap]) => {
      const policyId = PolicyId.PolicyId.make(Bytes.Encode.hex(policyIdBytes));
      const assets = HashMap.fromIterable(
        Array.from(assetMap.entries()).map(([assetNameBytes, amount]) => {
          const assetName = AssetName.AssetName.make(
            Bytes.Encode.hex(assetNameBytes),
          );
          // const nonZeroAmount = NonZeroInt64.NonZeroInt64Schema.make(amount);
          const nonZeroAmount = Schema.decodeUnknownSync(
            NonZeroInt64.NonZeroInt64Schema,
          )(amount);
          return [assetName, nonZeroAmount] as const;
        }),
      );
      return [policyId, assets] as const;
    }),
  );

  return new Mint({ assets });
};

/**
 * Synchronous encoding utilities for Mint.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  cborHex: (mint: Mint): string => EncodeRaw.hex(toRaw(mint)),
  cborBytes: (mint: Mint): Uint8Array => EncodeRaw.bytes(toRaw(mint)),
};

/**
 * Synchronous decoding utilities for Mint.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  cborHex: (hex: string): Mint => fromRaw(DecodeRaw.hex(hex)),
  cborBytes: (bytes: Uint8Array): Mint => fromRaw(DecodeRaw.bytes(bytes)),
};

/**
 * Either encoding utilities for Mint.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  cborHex: Schema.encodeEither(CBORHexSchema),
  cborBytes: Schema.encodeEither(CBORBytesSchema),
};

/**
 * Either decoding utilities for Mint.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  cborHex: Schema.decodeUnknownEither(CBORHexSchema),
  cborBytes: Schema.decodeUnknownEither(CBORBytesSchema),
};

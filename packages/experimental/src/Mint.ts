import {
  Schema,
  Data,
  FastCheck,
  ParseResult,
  Effect,
  HashMap,
  Option,
  Equal,
  Pretty,
  Either,
} from "effect";
import * as PolicyId from "./PolicyId.js";
import * as AssetName from "./AssetName.js";
import * as NonZeroInt64 from "./NonZeroInt64.js";
import * as CBOR from "./CBOR.js";
import { Bytes } from "./index.js";
import { ParseError } from "effect/ParseResult";

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
}).annotations({
  identifier: "AssetMap",
});

export type AssetMap = typeof AssetMap.Type;

/**
 * Schema for Mint representing token minting/burning operations.
 * mint = multiasset<nonZeroInt64>
 *
 * The structure is: policy_id => { asset_name => nonZeroInt64 }
 * - Positive values represent minting
 * - Negative values represent burning
 *
 * @since 2.0.0
 * @category model
 */
export const Mint = Schema.HashMap({
  key: PolicyId.PolicyId,
  value: AssetMap,
}).annotations({
  identifier: "Mint",
  pretty: () => (value) =>
    `HashMap(${HashMap.size(value)}) {${Array.from(HashMap.entries(value))
      .map(
        ([policyId, assetMap]) =>
          `\n  ${policyId} => HashMap(${HashMap.size(assetMap)}) {${Array.from(
            HashMap.entries(assetMap),
          )
            .map(([assetName, amount]) => `\n    ${assetName} => ${amount}`)
            .join(",")}\n  }`,
      )
      .join(",")}\n}`,
});

export type Mint = typeof Mint.Type;

type PrettyPrint = (self: Mint) => string;
export const prettyPrint: PrettyPrint = Pretty.make(Mint);

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
export const empty = (): Mint => HashMap.empty<PolicyId.PolicyId, AssetMap>();

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
  return HashMap.set(
    empty(),
    policyId,
    HashMap.fromIterable([[assetName, amount]]),
  );
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
/**
 * Helper function to convert Mint to entries array for manipulation
 */
const toEntries = (
  mint: Mint,
): Array<
  [PolicyId.PolicyId, Array<[AssetName.AssetName, NonZeroInt64.NonZeroInt64]>]
> => {
  return Array.from(HashMap.entries(mint)).map(([policyId, assetMap]) => [
    policyId,
    Array.from(HashMap.entries(assetMap)),
  ]);
};

/**
 * Helper function to create Mint from entries array
 */
const fromEntries = (
  entries: Array<
    [PolicyId.PolicyId, Array<[AssetName.AssetName, NonZeroInt64.NonZeroInt64]>]
  >,
): Mint => {
  return HashMap.fromIterable(
    entries.map(([policyId, assetEntries]) => [
      policyId,
      HashMap.fromIterable(assetEntries),
    ]),
  );
};

export const insert = (
  mint: Mint,
  policyId: PolicyId.PolicyId,
  assetName: AssetName.AssetName,
  amount: NonZeroInt64.NonZeroInt64,
): Mint => {
  // Get existing asset map or create empty one
  const existingAssetMap = HashMap.get(mint, policyId);
  const assetMap =
    existingAssetMap._tag === "Some"
      ? HashMap.set(existingAssetMap.value, assetName, amount)
      : HashMap.fromIterable([[assetName, amount]]);

  return HashMap.set(mint, policyId, assetMap);
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
export const removePolicy = (mint: Mint, policyId: PolicyId.PolicyId): Mint =>
  HashMap.remove(mint, policyId);

export const removeAsset = (
  mint: Mint,
  policyId: PolicyId.PolicyId,
  assetName: AssetName.AssetName,
): Mint => {
  const assets = HashMap.get(mint, policyId);
  if (assets._tag === "None") {
    return mint; // No assets for this policy, nothing to remove
  }
  const updatedAssets = HashMap.remove(assets.value, assetName);
  if (HashMap.isEmpty(updatedAssets)) {
    // If no assets left, remove the policyId entry
    return HashMap.remove(mint, policyId);
  }
  return HashMap.set(mint, policyId, updatedAssets);
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
): Option.Option<bigint> => {
  const assets = HashMap.get(mint, policyId);
  if (assets._tag === "None") {
    return Option.none();
  }
  const amount = HashMap.get(assets.value, assetName);
  if (amount._tag === "None") {
    return Option.none();
  }
  return Option.some(amount.value);
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
): boolean => get(mint, policyId, assetName) !== Option.none();

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
export const isEmpty = (mint: Mint): boolean => HashMap.size(mint) === 0;

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
export const policyCount = (mint: Mint): number => HashMap.size(mint);

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
export const equals = (self: Mint, that: Mint): boolean =>
  Equal.equals(self, that);

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
).map((entries) => fromEntries(entries));

/**
 * CDDL schema for Mint as map structure.
 * mint = {* policy_id => {* asset_name => nonZeroInt64}}
 *
 * Where:
 * - policy_id: 28-byte Uint8Array (from CBOR byte string)
 * - asset_name: variable-length Uint8Array (from CBOR byte string, can be empty)
 * - nonZeroInt64: signed 64-bit integer (positive = mint, negative = burn, cannot be zero)
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
      // Convert Map to Map and then encode to CBOR bytes
      ParseResult.succeed(
        CBOR.Encode().bytes(
          new Map(
            toEntries(toA).map(([policyId, assetEntries]) => [
              policyId, // Convert PolicyId to Uint8Array
              new Map(
                assetEntries.map(([assetName, amount]) => [
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
        const m = fromCDDL(map);
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
export const CBORHexSchema = Schema.transformOrFail(
  Schema.typeSchema(Bytes.HexSchema),
  Schema.typeSchema(Mint),
  {
    strict: true,
    encode: (_, __, ___, toA) =>
      // Convert Map to Map and then encode to CBOR hex
      ParseResult.succeed(
        CBOR.Encode().hex(
          new Map(
            toEntries(toA).map(([policyId, assetEntries]) => [
              policyId, // Convert PolicyId to Uint8Array
              new Map(
                assetEntries.map(([assetName, amount]) => [
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
          CBOR.makeCBORHexSchema(MintCDDLSchema),
        )(fromI);
        const m = fromCDDL(map);
        return m;
      }),
  },
);

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
export const toCDDL = (mint: Mint): MintCDDL => {
  const outerMap = new Map<Uint8Array, Map<Uint8Array, number>>();

  for (const [policyId, assetMap] of HashMap.entries(mint)) {
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
 * Create Mint from raw Map data after CBOR decoding.
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromCDDL = (raw: MintCDDL): Mint => {
  const entries = Array.from(raw.entries()).map(([policyIdBytes, assetMap]) => {
    const policyId = PolicyId.PolicyId.make(Bytes.Encode.hex(policyIdBytes));
    const assetEntries = Array.from(assetMap.entries()).map(
      ([assetNameBytes, amount]) => {
        const assetName = AssetName.AssetName.make(
          Bytes.Encode.hex(assetNameBytes),
        );
        const nonZeroAmount = Schema.decodeUnknownSync(
          NonZeroInt64.NonZeroInt64Schema,
        )(amount);
        return [assetName, nonZeroAmount] as [
          AssetName.AssetName,
          NonZeroInt64.NonZeroInt64,
        ];
      },
    );
    return [policyId, assetEntries] as [
      PolicyId.PolicyId,
      Array<[AssetName.AssetName, NonZeroInt64.NonZeroInt64]>,
    ];
  });

  return fromEntries(entries);
};

/**
 * Synchronous encoding utilities for Mint.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  cborHex: Schema.encodeSync(CBORHexSchema),
  cborBytes: Schema.encodeSync(CBORBytesSchema),
};

/**
 * Synchronous decoding utilities for Mint.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  cborHex: Schema.decodeUnknownSync(CBORHexSchema),
  cborBytes: Schema.decodeUnknownSync(CBORBytesSchema),
  entries: (entries: Array<[string, Array<[string, bigint]>]>): Mint =>
    Schema.decodeSync(Mint)(entries),
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
  entries: Schema.encodeEither(Mint),
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
  entries: (
    entries: Array<[string, Array<[string, bigint]>]>,
  ): Either.Either<Mint, ParseError> => Schema.decodeEither(Mint)(entries),
};

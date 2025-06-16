import { Data, FastCheck, Inspectable, pipe, Schema } from "effect";
import * as Hex from "./Hex.js";

/**
 * CDDL specs
 * asset_name = bytes .size (0 .. 32)
 */

/**
 * The maximum length in bytes of an asset name.
 *
 * @since 2.0.0
 * @category constants
 */
export const ASSET_NAME_MAX_LENGTH = 32;

/**
 * Error class for AssetName related operations.
 *
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new AssetName.AssetNameError({ message: "Invalid asset name" });
 * assert(error.message === "Invalid asset name");
 *
 * @since 2.0.0
 * @category errors
 */
export class AssetNameError extends Data.TaggedError("AssetNameError")<{
  message?: string;
  reason?: "InvalidBytesLength" | "InvalidHexFormat" | "InvalidCBORFormat";
}> {}

/**
 * Schema for validating AssetName bytes with CDDL constraint (0..32 bytes)
 *
 * @since 2.0.0
 * @category schemas
 */
export const AssetNameBytes = pipe(
  Schema.Uint8Array,
  Schema.filter((a) => a.length >= 0 && a.length <= ASSET_NAME_MAX_LENGTH),
  Schema.typeSchema,
).annotations({
  message: (issue) =>
    `Asset name must be a byte array of length 0-${ASSET_NAME_MAX_LENGTH}, got length ${
      (issue.actual as Uint8Array)?.length
    }`,
  identifier: "AssetNameBytes",
});

export declare const NominalType: unique symbol;
export interface AssetName {
  readonly [NominalType]: unique symbol;
}

/**
 * Schema for AssetName representing an asset name.
 * Follows CDDL specification: bytes .size (0 .. 32)
 *
 * @since 2.0.0
 * @category schemas
 */
export class AssetName extends Schema.TaggedClass<AssetName>("AssetName")(
  "AssetName",
  {
    bytes: AssetNameBytes,
  },
) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "AssetName",
      bytes: this.bytes,
    };
  }
}

/**
 * Check if the given value is a valid AssetName
 *
 * @since 2.0.0
 * @category predicates
 */
export const isAssetName = Schema.is(AssetName);

/**
 * Schema for transforming between bytes and AssetName
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Bytes = Schema.transform(AssetNameBytes, AssetName, {
  strict: true,
  encode: (_, toA) => toA.bytes,
  decode: (fromA) => new AssetName({ bytes: fromA }),
});

/**
 * Schema for transforming between hex string and AssetName
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const HexString = Schema.transform(Hex.HexString, AssetName, {
  strict: true,
  encode: (_toI, toA) => Hex.fromBytes(toA.bytes),
  decode: (fromI, _fromA) => new AssetName({ bytes: Hex.toBytes(fromI) }),
});

/**
 * Check if two AssetName instances are equal.
 *
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const name1 = new AssetName({ bytes: new Uint8Array([0x74, 0x6f, 0x6b, 0x65, 0x6e]) });
 * const name2 = new AssetName({ bytes: new Uint8Array([0x74, 0x6f, 0x6b, 0x65, 0x6e]) });
 * const name3 = new AssetName({ bytes: new Uint8Array([0x6f, 0x74, 0x68, 0x65, 0x72]) });
 *
 * assert(AssetName.equals(name1, name2) === true);
 * assert(AssetName.equals(name1, name3) === false);
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: AssetName, b: AssetName): boolean =>
  a.bytes.length === b.bytes.length &&
  a.bytes.every((byte, index) => byte === b.bytes[index]);

/**
 * Generator for creating random AssetName instances for testing
 *
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(AssetName.generator, 10);
 * randomSamples.forEach((assetName) => {
 *   assert(assetName instanceof AssetName);
 *   assert(assetName.bytes.length <= 32);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: 0,
  maxLength: ASSET_NAME_MAX_LENGTH,
}).map((bytes) => new AssetName({ bytes }));

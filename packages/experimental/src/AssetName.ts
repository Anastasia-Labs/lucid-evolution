import { Schema, Data, FastCheck } from "effect";
import * as Bytes from "./Bytes.js";
import * as Hash32 from "./Hash32.js";
import { Brand } from "effect/Brand";

/**
 * Constants for AssetName validation.
 * asset_name = bytes .size (0 .. 32)
 *
 * @since 2.0.0
 * @category constants
 */
export const ASSET_NAME_MIN_BYTES_LENGTH = 0;
export const ASSET_NAME_MAX_BYTES_LENGTH = Hash32.HASH32_BYTES_LENGTH; // Reuse Hash32 constant
export const ASSET_NAME_MIN_HEX_LENGTH = 0;
export const ASSET_NAME_MAX_HEX_LENGTH = Hash32.HASH32_HEX_LENGTH; // Reuse Hash32 constant

/**
 * Error class for AssetName related operations.
 *
 * @example
 * import { AssetName } from "@evolution-sdk/experimental";
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
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

// /**
//  * Schema for validating AssetName hex strings.
//  * Asset names can be 0 to 32 bytes (0-64 hex characters).
//  *
//  * @since 2.0.0
//  * @category schemas
//  */
// export const AssetNameHexSchema = Hash32.VariableHexSchema.annotations({
//   message: (issue) =>
//     `Asset name hex string must be between ${ASSET_NAME_MIN_HEX_LENGTH} and ${ASSET_NAME_MAX_HEX_LENGTH} characters, got: ${(issue.actual as string).length}`,
//   identifier: "AssetNameHex",
// });

/**
 * Schema for validating AssetName byte arrays.
 * Asset names can be 0 to 32 bytes.
 *
 * @since 2.0.0
 * @category schemas
 */
export const AssetNameBytesSchema = Hash32.VariableBytesSchema.annotations({
  message: (issue) =>
    `Asset name bytes must be between ${ASSET_NAME_MIN_BYTES_LENGTH} and ${ASSET_NAME_MAX_BYTES_LENGTH} bytes, got: ${(issue.actual as Uint8Array).length}`,
  identifier: "AssetNameBytes",
});

/**
 * Schema for AssetName representing a native asset identifier.
 * Asset names are limited to 32 bytes (0-64 hex characters).
 *
 * @example
 * import { AssetName } from "@evolution-sdk/experimental";
 * import { Schema } from "effect";
 *
 * const assetName = Schema.decodeSync(AssetName)("546f6b656e"); // "Token" in hex
 * console.log(assetName); // "546f6b656e"
 *
 * const emptyAssetName = Schema.decodeSync(AssetName)(""); // Empty asset name (0 bytes)
 * console.log(emptyAssetName); // ""
 *
 * @since 2.0.0
 * @category model
 */
export const AssetName = Hash32.VariableHexSchema.pipe(
  Schema.brand("AssetName"),
  Schema.annotations({
    identifier: "AssetName",
    message: (issue) =>
      `Asset name must be a valid hex string of length between ${ASSET_NAME_MIN_HEX_LENGTH} and ${ASSET_NAME_MAX_HEX_LENGTH}, but got ${(issue.actual as string).length}`,
  }),
);

export type AssetName = typeof AssetName.Type;

/**
 * Schema for transforming between Uint8Array and AssetName.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const BytesSchema = Schema.transform(Hash32.BytesSchema, AssetName, {
  strict: true,
  encode: (_, assetName) => Bytes.Decode.hex(assetName),
  decode: (bytes) => Schema.decodeSync(AssetName)(Bytes.Encode.hex(bytes)),
});

/**
 * Schema for transforming between hex string and AssetName.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const HexSchema = Schema.transform(Hash32.VariableHexSchema, AssetName, {
  strict: true,
  encode: (_, assetName) => assetName,
  decode: (name) => Schema.decodeSync(AssetName)(name),
});

/**
 * Check if two AssetName instances are equal.
 *
 * @example
 * import { AssetName } from "@evolution-sdk/experimental";
 * import { Schema } from "effect";
 *
 * const assetName1 = Schema.decodeSync(AssetName)("546f6b656e");
 * const assetName2 = Schema.decodeSync(AssetName)("546f6b656e");
 * console.log(AssetName.equals(assetName1, assetName2)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: AssetName, b: AssetName): boolean => a === b;

/**
 * Generate a random AssetName.
 *
 * @example
 * import { AssetName } from "@evolution-sdk/experimental";
 * import { FastCheck, Schema } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(AssetName.generator, 10);
 * randomSamples.forEach((assetName) => {
 *   assert(assetName.length <= 64);
 *   assert(assetName.length >= 0);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: ASSET_NAME_MIN_BYTES_LENGTH,
  maxLength: ASSET_NAME_MAX_BYTES_LENGTH,
}).map((bytes) => Schema.decodeSync(AssetName)(Bytes.Encode.hex(bytes)));

/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  hex: Schema.encodeSync(HexSchema),
  bytes: Schema.encodeSync(BytesSchema),
};

/**
 * Synchronous decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  string: Schema.decodeSync(HexSchema),
  bytes: Schema.decodeUnknownSync(BytesSchema),
};

/**
 * Either encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  hex: Schema.encodeEither(HexSchema),
  bytes: Schema.encodeEither(BytesSchema),
};

/**
 * Either decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  hex: Schema.decodeUnknownEither(HexSchema),
  bytes: Schema.decodeUnknownEither(BytesSchema),
};

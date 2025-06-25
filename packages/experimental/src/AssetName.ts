import {
  Data,
  Schema,
  pipe,
  Inspectable,
  FastCheck,
  Effect,
  ParseResult,
} from "effect";
import * as CBOR from "./CBOR.js";
import * as Hex from "./Hex.js";
/**
 * Max length in bytes of a AssetName.
 *
 * @since 2.0.0
 * @category constants
 */
export const ASSETNAME_BYTES_LENGTH = 32;

/**
 * Max length in hex characters of a AssetName.
 *
 * @since 2.0.0
 * @category constants
 */
export const ASSETNAME_HEX_LENGTH = 64;

export class AssetNameError extends Data.TaggedError("AssetNameError")<{
  message: string;
  cause?: unknown;
}> {}

export const Hash = Hex.HexString.pipe(
  Schema.filter((hex) => hex.length === ASSETNAME_HEX_LENGTH),
).annotations({
  message: (issue) =>
    `${issue.actual} must be a hex string of length ${ASSETNAME_HEX_LENGTH}`,
  identifier: "Hash",
});

/**
 * Schema for AssetName, enforcing a max byte length of 32.
 *
 * @since 2.0.0
 * @category schemas
 */
export class AssetName extends Schema.TaggedClass<AssetName>()("AssetName", {
  hex: Hex.HexString,
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "AssetName",
      hex: this.hex,
    };
  }
}

/**
 * Schema for AssetName bytes validation.
 *
 * @since 2.0.0
 * @category schemas
 */
export const AssetNameBytes = pipe(
  Schema.Uint8Array,
  Schema.filter((bytes) => bytes.length <= ASSETNAME_BYTES_LENGTH),
  Schema.typeSchema,
).annotations({
  message: (issue) =>
    `${issue.actual} must be a byte array of max length ${ASSETNAME_BYTES_LENGTH}`,
  identifier: "AssetNameBytes",
});

/**
 * Schema for transforming between Uint8Array and AssetName.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Bytes = Schema.transform(
  AssetNameBytes,
  AssetName.pipe(Schema.asSchema),
  {
    strict: true,
    encode: (_, hash) => Hex.toBytes(hash.hex),
    decode: (bytes) => new AssetName({ hex: Hex.fromBytes(bytes) }),
  },
);

/**
 * Schema for transforming between hex string and AssetName.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const HexString = Schema.transform(Hash, AssetName, {
  strict: true,
  encode: (_, hash) => hash.hex,
  decode: (hex) => new AssetName({ hex }),
});

/**
 * Schema for transforming between CBOR bytes and AssetName.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const CBORBytes = Schema.transformOrFail(
  Schema.Uint8ArrayFromSelf.annotations({
    identifier: "CBORBytes",
  }),
  AssetName,
  {
    strict: true,
    encode: (_s, _options, ast, assetName) =>
      pipe(
        CBOR.encodeAsBytes(Hex.toBytes(assetName.hex)),
        Effect.mapError((e) => new ParseResult.Type(ast, _s, e.message)),
      ),
    decode: (bytes, _options, ast) =>
      pipe(
        CBOR.decodeBytes(bytes),
        Effect.mapError(
          (error) => new ParseResult.Type(ast, bytes, error.message),
        ),
        Effect.flatMap(ParseResult.decode(Bytes)),
      ),
  },
);

/**
 * Schema for transforming between CBOR hex and AssetName.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const CBORHex = Schema.transformOrFail(
  Hex.HexString.pipe(Schema.typeSchema).annotations({
    identifier: "CBORHex",
  }),
  AssetName,
  {
    strict: true,
    encode: (_s, _options, ast, assetName) =>
      ParseResult.succeed(CBOR.encodeAsCBORHexOrThrow(assetName.hex)),
    decode: (hexString, _options, ast) =>
      pipe(
        CBOR.decodeHex(hexString),
        Effect.mapError(
          (error) => new ParseResult.Type(ast, hexString, error.message),
        ),
        Effect.flatMap(ParseResult.decode(Bytes)),
      ),
  },
);

/**
 * Check if two AssetClass instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: AssetName, b: AssetName): boolean => a.hex === b.hex;

/**
 * Generate a random AssetName.
 *
 * @example
 * import { AssetName } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(AssetName.generator, 20);
 * randomSamples.forEach((assetName) => {
 *  assert(assetName.hex.length <= 64);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: 1,
  maxLength: ASSETNAME_BYTES_LENGTH,
}).map((bytes) => new AssetName({ hex: Hex.fromBytes(bytes) }));

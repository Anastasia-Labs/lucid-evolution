import { Schema, Data, FastCheck, ParseResult, Effect } from "effect";
import * as Url from "./Url.js";
import * as Hash32 from "./Hash32.js";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";

/**
 * Error class for Anchor related operations.
 *
 * @example
 * import { Anchor } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new Anchor.AnchorError({ message: "Invalid anchor" });
 * assert(error.message === "Invalid anchor");
 *
 * @since 2.0.0
 * @category errors
 */
export class AnchorError extends Data.TaggedError("AnchorError")<{
  message?: string;
  reason?: "InvalidStructure" | "InvalidUrl" | "InvalidHash";
}> {}

/**
 * Schema for Anchor representing an anchor with URL and data hash.
 * anchor = [anchor_url: url, anchor_data_hash: hash32]
 *
 * @example
 * import { Anchor, Url, Hash32 } from "@evolution-sdk/experimental";
 *
 * const anchor = new Anchor({
 *   anchorUrl: Url.make("https://example.com/anchor.json"),
 *   anchorDataHash: Hash32.Decode.bytes(new Uint8Array(32))
 * });
 *
 * @since 2.0.0
 * @category model
 */
export class Anchor extends Schema.TaggedClass<Anchor>()("Anchor", {
  anchorUrl: Url.Url,
  anchorDataHash: Hash32.BytesSchema,
}) {}

/**
 * CDDL schema for Anchor as tuple structure.
 * anchor = [anchor_url: url, anchor_data_hash: hash32]
 *
 * @since 2.0.0
 * @category schemas
 */
export const AnchorCDDLSchema = Schema.transformOrFail(
  Schema.Tuple(CBOR.Text, CBOR.ByteArray),
  Schema.typeSchema(Anchor),
  {
    strict: true,
    encode: (toA) =>
      Effect.succeed([toA.anchorUrl as string, toA.anchorDataHash] as const),
    decode: ([anchorUrl, anchorDataHash]) =>
      ParseResult.decode(Anchor)({
        _tag: "Anchor",
        anchorUrl: Url.make(anchorUrl),
        anchorDataHash,
      }),
  },
);

/**
 * CBOR bytes transformation schema for Anchor.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    CBOR.CBORBytesSchema(options), // Uint8Array → CBOR
    AnchorCDDLSchema, // CBOR → Anchor
  );

/**
 * CBOR hex transformation schema for Anchor.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    Bytes.BytesSchema, // string → Uint8Array
    CBORBytesSchema(options), // Uint8Array → Anchor
  );

/**
 * Create an Anchor from a URL string and hash bytes.
 *
 * @example
 * import { Anchor, Url } from "@evolution-sdk/experimental";
 *
 * const anchor = Anchor.make(
 *   "https://example.com/anchor.json",
 *   new Uint8Array(32)
 * );
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = (anchorUrl: string, anchorDataHash: Uint8Array): Anchor =>
  new Anchor({
    anchorUrl: Url.make(anchorUrl),
    anchorDataHash,
  });

/**
 * Create an Anchor from a URL string and hex hash.
 *
 * @example
 * import { Anchor } from "@evolution-sdk/experimental";
 *
 * const anchor = Anchor.fromHex(
 *   "https://example.com/anchor.json",
 *   "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"
 * );
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromHex = (anchorUrl: string, anchorDataHashHex: string): Anchor =>
  new Anchor({
    anchorUrl: Url.make(anchorUrl),
    anchorDataHash: Bytes.Decode.hex(anchorDataHashHex),
  });

/**
 * Get the anchor URL string from an Anchor.
 *
 * @example
 * import { Anchor } from "@evolution-sdk/experimental";
 *
 * const anchor = Anchor.make("https://example.com/anchor.json", new Uint8Array(32));
 * const urlStr = Anchor.getAnchorUrl(anchor);
 * // "https://example.com/anchor.json"
 *
 * @since 2.0.0
 * @category transformation
 */
export const getAnchorUrl = (anchor: Anchor): string => anchor.anchorUrl;

/**
 * Get the anchor data hash as bytes from an Anchor.
 *
 * @example
 * import { Anchor } from "@evolution-sdk/experimental";
 *
 * const anchor = Anchor.make("https://example.com/anchor.json", new Uint8Array(32));
 * const hashBytes = Anchor.getAnchorDataHash(anchor);
 *
 * @since 2.0.0
 * @category transformation
 */
export const getAnchorDataHash = (anchor: Anchor): Uint8Array =>
  anchor.anchorDataHash;

/**
 * Get the anchor data hash as hex string from an Anchor.
 *
 * @example
 * import { Anchor } from "@evolution-sdk/experimental";
 *
 * const anchor = Anchor.make("https://example.com/anchor.json", new Uint8Array(32));
 * const hexHash = Anchor.getAnchorDataHashHex(anchor);
 *
 * @since 2.0.0
 * @category transformation
 */
export const getAnchorDataHashHex = (anchor: Anchor): string =>
  Bytes.Encode.hex(anchor.anchorDataHash);

/**
 * Check if two Anchor instances are equal.
 *
 * @example
 * import { Anchor } from "@evolution-sdk/experimental";
 *
 * const anchor1 = Anchor.make("https://example.com/anchor.json", new Uint8Array(32));
 * const anchor2 = Anchor.make("https://example.com/anchor.json", new Uint8Array(32));
 * const isEqual = Anchor.equals(anchor1, anchor2); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (self: Anchor, that: Anchor): boolean => {
  if (self.anchorUrl !== that.anchorUrl) return false;
  if (self.anchorDataHash.length !== that.anchorDataHash.length) return false;
  for (let i = 0; i < self.anchorDataHash.length; i++) {
    if (self.anchorDataHash[i] !== that.anchorDataHash[i]) return false;
  }
  return true;
};

/**
 * FastCheck generator for Anchor instances.
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.record({
  anchorUrl: Url.generator,
  anchorDataHash: FastCheck.uint8Array({ minLength: 32, maxLength: 32 }),
}).map(
  ({ anchorUrl, anchorDataHash }) => new Anchor({ anchorUrl, anchorDataHash }),
);

export const Codec = (options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS) => ({
  Encode: {
    cborBytes: Schema.encodeSync(CBORBytesSchema(options)),
    cborHex: Schema.encodeSync(CBORHexSchema(options)),
  },
  Decode: {
    cborBytes: Schema.decodeUnknownSync(CBORBytesSchema(options)),
    cborHex: Schema.decodeUnknownSync(CBORHexSchema(options)),
  },
  EncodeEither: {
    cborBytes: Schema.encodeEither(CBORBytesSchema(options)),
    cborHex: Schema.encodeEither(CBORHexSchema(options)),
  },
  DecodeEither: {
    cborBytes: Schema.decodeEither(CBORBytesSchema(options)),
    cborHex: Schema.decodeEither(CBORHexSchema(options)),
  },
  EncodeEffect: {
    cborBytes: Schema.encode(CBORBytesSchema(options)),
    cborHex: Schema.encode(CBORHexSchema(options)),
  },
  DecodeEffect: {
    cborBytes: Schema.decode(CBORBytesSchema(options)),
    cborHex: Schema.decode(CBORHexSchema(options)),
  },
});

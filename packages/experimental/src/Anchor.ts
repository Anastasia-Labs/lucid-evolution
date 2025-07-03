import { Schema, Data, FastCheck, ParseResult, pipe } from "effect";
import * as Url from "./Url.js";
import * as Hash32 from "./Hash32.js";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";

/**
 * Error class for Anchor related operations.
 *
 * @example
 * import { Anchor } from "@lucid-evolution/experimental";
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
 * import { Anchor, Url, Hash32 } from "@lucid-evolution/experimental";
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
export const AnchorCDDLSchema = Schema.Tuple(Url.Url, Hash32.BytesSchema);

/**
 * CBOR bytes transformation schema for Anchor.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = Schema.transformOrFail(
  Schema.Uint8ArrayFromSelf.annotations({
    identifier: "CBORBytes",
  }),
  Anchor,
  {
    strict: true,
    encode: (toA) =>
      ParseResult.succeed(
        CBOR.Encode().bytes([toA.anchorUrl, toA.anchorDataHash]),
      ),
    decode: (fromA) =>
      pipe(
        ParseResult.decode(CBOR.makeCBORBytesSchema(AnchorCDDLSchema))(fromA),
        ParseResult.flatMap(([anchorUrl, anchorDataHash]) =>
          ParseResult.succeed(new Anchor({ anchorUrl, anchorDataHash })),
        ),
      ),
  },
);

/**
 * CBOR hex transformation schema for Anchor.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = Schema.transformOrFail(
  Schema.String.annotations({
    identifier: "CBORHex",
  }),
  Anchor,
  {
    strict: true,
    encode: (toA) =>
      ParseResult.succeed(
        CBOR.Encode().hex([toA.anchorUrl, toA.anchorDataHash]),
      ),
    decode: (fromA) =>
      pipe(
        ParseResult.decode(CBOR.makeCBORHexSchema(AnchorCDDLSchema))(fromA),
        ParseResult.flatMap(([anchorUrl, anchorDataHash]) =>
          ParseResult.succeed(new Anchor({ anchorUrl, anchorDataHash })),
        ),
      ),
  },
);

/**
 * Create an Anchor from a URL string and hash bytes.
 *
 * @example
 * import { Anchor, Url } from "@lucid-evolution/experimental";
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
 * import { Anchor } from "@lucid-evolution/experimental";
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
 * import { Anchor } from "@lucid-evolution/experimental";
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
 * import { Anchor } from "@lucid-evolution/experimental";
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
 * import { Anchor } from "@lucid-evolution/experimental";
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
 * import { Anchor } from "@lucid-evolution/experimental";
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

/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  cborBytes: Schema.encodeSync(CBORBytesSchema),
  cborHex: Schema.encodeSync(CBORHexSchema),
};

/**
 * Synchronous decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  cborBytes: Schema.decodeUnknownSync(CBORBytesSchema),
  cborHex: Schema.decodeUnknownSync(CBORHexSchema),
};

/**
 * Either encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  cborBytes: Schema.encodeEither(CBORBytesSchema),
  cborHex: Schema.encodeEither(CBORHexSchema),
};

/**
 * Either decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  cborBytes: Schema.decodeUnknownEither(CBORBytesSchema),
  cborHex: Schema.decodeUnknownEither(CBORHexSchema),
};

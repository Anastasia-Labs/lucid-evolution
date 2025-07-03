import { Schema, Data, FastCheck } from "effect";
import * as Url from "./Url.js";
import * as Bytes from "./Bytes.js";
import * as CBOR from "./CBOR.js";

/**
 * Error class for PoolMetadata related operations.
 *
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new PoolMetadata.PoolMetadataError({ message: "Invalid pool metadata" });
 * assert(error.message === "Invalid pool metadata");
 *
 * @since 2.0.0
 * @category errors
 */
export class PoolMetadataError extends Data.TaggedError("PoolMetadataError")<{
  message?: string;
  reason?: "InvalidStructure" | "InvalidUrl" | "InvalidBytes";
}> {}

/**
 * Schema for PoolMetadata representing pool metadata information.
 * pool_metadata = [url, bytes]
 *
 * @example
 * import { PoolMetadata, Url } from "@lucid-evolution/experimental";
 *
 * const metadata = new PoolMetadata({
 *   url: Url.make("https://example.com/pool.json"),
 *   hash: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
 * });
 *
 * @since 2.0.0
 * @category model
 */
export class PoolMetadata extends Schema.TaggedClass<PoolMetadata>()(
  "PoolMetadata",
  {
    url: Url.Url,
    hash: Schema.Uint8ArrayFromSelf,
  },
) {
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: "PoolMetadata",
      url: this.url,
      hash: Bytes.Encode.hex(this.hash),
    };
  }
}

/**
 * CBOR bytes transformation schema for PoolMetadata.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = CBOR.makeCBORBytesSchema(PoolMetadata);

/**
 * CBOR hex transformation schema for PoolMetadata.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = CBOR.makeCBORHexSchema(PoolMetadata);

/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  bytes: Schema.encodeSync(CBORBytesSchema),
  hex: Schema.encodeSync(CBORHexSchema),
};

/**
 * Synchronous decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  bytes: Schema.decodeUnknownSync(CBORBytesSchema),
  hex: Schema.decodeUnknownSync(CBORHexSchema),
};

/**
 * Either encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  bytes: Schema.encodeEither(CBORBytesSchema),
  hex: Schema.encodeEither(CBORHexSchema),
};

/**
 * Either decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  bytes: Schema.decodeUnknownEither(CBORBytesSchema),
  hex: Schema.decodeUnknownEither(CBORHexSchema),
};

/**
 * Check if two PoolMetadata instances are equal.
 *
 * @example
 * import { PoolMetadata, Url } from "@lucid-evolution/experimental";
 *
 * const metadata1 = new PoolMetadata({ url: Url.make("https://example.com/pool.json"), hash: new Uint8Array([1, 2, 3]) });
 * const metadata2 = new PoolMetadata({ url: Url.make("https://example.com/pool.json"), hash: new Uint8Array([1, 2, 3]) });
 * const isEqual = equals(metadata1, metadata2); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (self: PoolMetadata, that: PoolMetadata): boolean => {
  if (self.url !== that.url) return false;
  if (self.hash.length !== that.hash.length) return false;
  for (let i = 0; i < self.hash.length; i++) {
    if (self.hash[i] !== that.hash[i]) return false;
  }
  return true;
};

/**
 * FastCheck generator for PoolMetadata instances.
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.record({
  url: Url.generator,
  hash: FastCheck.uint8Array({ minLength: 1, maxLength: 64 }),
}).map(({ url, hash }) => new PoolMetadata({ url, hash }));

/**
 * Create a PoolMetadata from a URL string and metadata hash bytes.
 *
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 *
 * const metadata = PoolMetadata.make(
 *   "https://example.com/pool.json",
 *   new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
 * );
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = (urlString: string, hash: Uint8Array): PoolMetadata =>
  new PoolMetadata({
    url: Url.make(urlString),
    hash,
  });

/**
 * Create a PoolMetadata from a URL string and hex hash.
 *
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 *
 * const metadata = PoolMetadata.fromHex(
 *   "https://example.com/pool.json",
 *   "0102030405060708"
 * );
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromHex = (urlString: string, hashHex: string): PoolMetadata =>
  new PoolMetadata({
    url: Url.make(urlString),
    hash: Bytes.Decode.hex(hashHex),
  });

/**
 * Get the URL string from a PoolMetadata.
 *
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 *
 * const metadata = PoolMetadata.make("https://example.com/pool.json", new Uint8Array(8));
 * const urlStr = PoolMetadata.getUrl(metadata);
 * // "https://example.com/pool.json"
 *
 * @since 2.0.0
 * @category transformation
 */
export const getUrl = (metadata: PoolMetadata): string => metadata.url;

/**
 * Get the metadata hash as bytes from a PoolMetadata.
 *
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 *
 * const metadata = PoolMetadata.make("https://example.com/pool.json", new Uint8Array(8));
 * const hashBytes = PoolMetadata.getHash(metadata);
 *
 * @since 2.0.0
 * @category transformation
 */
export const getHash = (metadata: PoolMetadata): Uint8Array => metadata.hash;

/**
 * Get the metadata hash as hex string from a PoolMetadata.
 *
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 *
 * const metadata = PoolMetadata.make("https://example.com/pool.json", new Uint8Array(8));
 * const hexHash = PoolMetadata.getHashHex(metadata);
 *
 * @since 2.0.0
 * @category transformation
 */
export const getHashHex = (metadata: PoolMetadata): string =>
  Bytes.Encode.hex(metadata.hash);

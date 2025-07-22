import { Schema, Data, Effect, ParseResult } from "effect";
import * as Url from "./Url.js";
import * as Bytes from "./Bytes.js";
import * as CBOR from "./CBOR.js";

/**
 * Error class for PoolMetadata related operations.
 *
 * @example
 * import { PoolMetadata } from "@evolution-sdk/experimental";
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
 * import { PoolMetadata, Url } from "@evolution-sdk/experimental";
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
 * CDDL schema for PoolMetadata as defined in the specification:
 * pool_metadata = [url, bytes]
 *
 * Transforms between CBOR tuple structure and PoolMetadata model.
 *
 * @since 2.0.0
 * @category schemas
 */
export const PoolMetadataCDDLSchema = Schema.transformOrFail(
  Schema.Tuple(
    CBOR.Text, // url as CBOR text string
    CBOR.ByteArray, // hash as CBOR byte string
  ),
  Schema.typeSchema(PoolMetadata),
  {
    strict: true,
    encode: (poolMetadata) =>
      Effect.succeed([poolMetadata.url, poolMetadata.hash] as const),
    decode: ([urlText, hash]) =>
      Effect.gen(function* () {
        const url = yield* ParseResult.decode(Url.Url)(urlText);
        return new PoolMetadata({ url, hash });
      }),
  },
);

/**
 * CBOR bytes transformation schema for PoolMetadata.
 * Transforms between Uint8Array and PoolMetadata using CBOR encoding.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    CBOR.CBORBytesSchema(options), // Uint8Array → CBOR
    PoolMetadataCDDLSchema, // CBOR → PoolMetadata
  );

/**
 * CBOR hex transformation schema for PoolMetadata.
 * Transforms between hex string and PoolMetadata using CBOR encoding.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    Bytes.BytesSchema, // string → Uint8Array
    CBORBytesSchema(options), // Uint8Array → PoolMetadata
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

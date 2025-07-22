import { Schema, Data, FastCheck } from "effect";
import * as Bytes from "./Bytes.js";
import * as Hash28 from "./Hash28.js";

/**
 * Error class for PoolKeyHash related operations.
 *
 * @example
 * import { PoolKeyHash } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new PoolKeyHash.PoolKeyHashError({ message: "Invalid pool key hash" });
 * assert(error.message === "Invalid pool key hash");
 *
 * @since 2.0.0
 * @category errors
 */
export class PoolKeyHashError extends Data.TaggedError("PoolKeyHashError")<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

/**
 * PoolKeyHash is a 28-byte hash representing a stake pool's verification key.
 * pool_keyhash = hash28
 *
 * @since 2.0.0
 * @category schemas
 */
export const PoolKeyHash = Hash28.HexSchema.pipe(Schema.brand("PoolKeyHash"));
export type PoolKeyHash = typeof PoolKeyHash.Type;

/**
 * Schema for transforming between Uint8Array and PoolKeyHash.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const BytesSchema = Schema.transform(Hash28.BytesSchema, PoolKeyHash, {
  strict: true,
  encode: (_, hash) => Bytes.Decode.hex(hash),
  decode: (bytes) => Schema.decodeSync(PoolKeyHash)(Bytes.Encode.hex(bytes)),
});

/**
 * Schema for transforming between hex string and PoolKeyHash.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const HexSchema = Schema.transform(
  Schema.typeSchema(Hash28.HexSchema),
  PoolKeyHash,
  {
    strict: true,
    encode: (_, hash) => hash,
    decode: (hash) => Schema.decodeSync(PoolKeyHash)(hash),
  },
);

/**
 * Check if two PoolKeyHash instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: PoolKeyHash, b: PoolKeyHash): boolean => a === b;

/**
 * Generate a random PoolKeyHash.
 *
 * @example
 * import { PoolKeyHash } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(PoolKeyHash.generator, 20);
 * randomSamples.forEach((poolKeyHash) => {
 *  assert(poolKeyHash.length === 56);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: Hash28.HASH28_BYTES_LENGTH,
  maxLength: Hash28.HASH28_BYTES_LENGTH,
}).map((bytes) => PoolKeyHash.make(Bytes.Encode.hex(bytes)));

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
  hex: Schema.decodeUnknownSync(HexSchema),
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

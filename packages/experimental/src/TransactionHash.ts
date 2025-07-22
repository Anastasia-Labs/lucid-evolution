import { Schema, Data, FastCheck } from "effect";
import * as Bytes from "./Bytes.js";
import * as Hash32 from "./Hash32.js";

/**
 * Error class for TransactionHash related operations.
 *
 * @example
 * import { TransactionHash } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new TransactionHash.TransactionHashError({ message: "Invalid transaction hash" });
 * assert(error.message === "Invalid transaction hash");
 *
 * @since 2.0.0
 * @category errors
 */
export class TransactionHashError extends Data.TaggedError(
  "TransactionHashError",
)<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

/**
 * Schema for TransactionHash.
 * transaction_hash = hash32
 *
 * @since 2.0.0
 * @category schemas
 */
export const TransactionHash = Hash32.HexSchema.pipe(
  Schema.brand("TransactionHash"),
);
export type TransactionHash = typeof TransactionHash.Type;

/**
 * Schema for transforming between Uint8Array and TransactionHash.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const BytesSchema = Schema.transform(
  Hash32.BytesSchema,
  TransactionHash,
  {
    strict: true,
    encode: (_, hash) => Bytes.Decode.hex(hash),
    decode: (bytes) =>
      Schema.decodeSync(TransactionHash)(Bytes.Encode.hex(bytes)),
  },
);

/**
 * Schema for transforming between hex string and TransactionHash.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const HexSchema = Schema.transform(
  Schema.typeSchema(Hash32.HexSchema),
  TransactionHash,
  {
    strict: true,
    encode: (_, hash) => hash,
    decode: (hash) => Schema.decodeSync(TransactionHash)(hash),
  },
);

/**
 * Check if two TransactionHash instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: TransactionHash, b: TransactionHash): boolean =>
  a === b;

/**
 * Generate a random TransactionHash.
 *
 * @example
 * import { TransactionHash } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(TransactionHash.generator, 20);
 * randomSamples.forEach((transactionHash) => {
 *  assert(transactionHash.length === 64);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: Hash32.HASH32_BYTES_LENGTH,
  maxLength: Hash32.HASH32_BYTES_LENGTH,
}).map((bytes) => Schema.decodeSync(TransactionHash)(Bytes.Encode.hex(bytes)));

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

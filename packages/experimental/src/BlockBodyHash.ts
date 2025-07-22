import { Schema, Data } from "effect";
import * as Hash32 from "./Hash32.js";
import * as Bytes from "./Bytes.js";

/**
 * Error class for BlockBodyHash related operations.
 *
 * @example
 * import { BlockBodyHash } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new BlockBodyHash.BlockBodyHashError({ message: "Invalid block body hash" });
 * assert(error.message === "Invalid block body hash");
 *
 * @since 2.0.0
 * @category errors
 */
export class BlockBodyHashError extends Data.TaggedError("BlockBodyHashError")<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

/**
 * Schema for BlockBodyHash representing a block body hash.
 * block_body_hash = hash32
 * Follows the Conway-era CDDL specification.
 *
 * @since 2.0.0
 * @category schemas
 */
export const BlockBodyHash = Hash32.HexSchema.pipe(
  Schema.brand("BlockBodyHash"),
);
export type BlockBodyHash = typeof BlockBodyHash.Type;

export const BytesSchema = Schema.transform(
  Hash32.BytesSchema,
  Schema.typeSchema(BlockBodyHash),
  {
    strict: true,
    encode: (_, toA) => Bytes.Decode.hex(toA),
    decode: (_, fromA) =>
      Schema.decodeSync(BlockBodyHash)(Bytes.Encode.hex(fromA)),
  },
);

export const HexSchema = Schema.transform(
  Schema.typeSchema(Hash32.HexSchema),
  BlockBodyHash,
  {
    strict: true,
    encode: (_, toA) => toA,
    decode: (fromI) => Schema.decodeSync(BlockBodyHash)(fromI),
  },
);

/**
 * Check if two BlockBodyHash instances are equal.
 *
 * @example
 * import { BlockBodyHash } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: BlockBodyHash, b: BlockBodyHash): boolean => a === b;

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

import { Schema, Data } from "effect";
import * as Hash32 from "./Hash32.js";
import * as Bytes from "./Bytes.js";

/**
 * Error class for BlockHeaderHash related operations.
 *
 * @example
 * import { BlockHeaderHash } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new BlockHeaderHash.BlockHeaderHashError({ message: "Invalid block header hash" });
 * assert(error.message === "Invalid block header hash");
 *
 * @since 2.0.0
 * @category errors
 */
export class BlockHeaderHashError extends Data.TaggedError(
  "BlockHeaderHashError",
)<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

/**
 * Schema for BlockHeaderHash representing a block header hash.
 * block_header_hash = hash32
 * Follows the Conway-era CDDL specification.
 *
 * @since 2.0.0
 * @category schemas
 */
export const BlockHeaderHash = Hash32.HexSchema.pipe(
  Schema.brand("BlockHeaderHash"),
);
export type BlockHeaderHash = typeof BlockHeaderHash.Type;

export const BytesSchema = Schema.transform(
  Hash32.BytesSchema,
  Schema.typeSchema(BlockHeaderHash),
  {
    strict: true,
    encode: (_, toA) => Bytes.Decode.hex(toA),
    decode: (_, fromA) =>
      Schema.decodeSync(BlockHeaderHash)(Bytes.Encode.hex(fromA)),
  },
);

export const HexSchema = Schema.transform(
  Schema.typeSchema(Hash32.HexSchema),
  BlockHeaderHash,
  {
    strict: true,
    encode: (_, toA) => toA,
    decode: (fromI) => Schema.decodeSync(BlockHeaderHash)(fromI),
  },
);

/**
 * Check if two BlockHeaderHash instances are equal.
 *
 * @example
 * import { BlockHeaderHash } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: BlockHeaderHash, b: BlockHeaderHash): boolean =>
  a === b;

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

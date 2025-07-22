import { Schema, Data, FastCheck } from "effect";
import * as Bytes from "./Bytes.js";
import * as Hash32 from "./Hash32.js";

/**
 * Error class for VKey related operations.
 *
 * @example
 * import { VKey } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new VKey.VKeyError({ message: "Invalid verification key" });
 * assert(error.message === "Invalid verification key");
 *
 * @since 2.0.0
 * @category errors
 */
export class VKeyError extends Data.TaggedError("VKeyError")<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

/**
 * Schema for VKey representing a verification key.
 * vkey = bytes .size 32
 * Follows the Conway-era CDDL specification.
 *
 * @since 2.0.0
 * @category schemas
 */
export const VKey = Hash32.HexSchema.pipe(Schema.brand("VKey"));
export type VKey = typeof VKey.Type;

export const BytesSchema = Schema.transform(
  Hash32.BytesSchema,
  Schema.typeSchema(VKey),
  {
    strict: true,
    encode: (_, toA) => Bytes.Decode.hex(toA),
    decode: (_, fromA) => Schema.decodeSync(VKey)(Bytes.Encode.hex(fromA)),
  },
);

export const HexSchema = Schema.transform(
  Schema.typeSchema(Hash32.HexSchema),
  VKey,
  {
    strict: true,
    encode: (_, toA) => toA,
    decode: (fromI) => Schema.decodeSync(VKey)(fromI),
  },
);

/**
 * Check if two VKey instances are equal.
 *
 * @example
 * import { VKey } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: VKey, b: VKey): boolean => a === b;

/**
 * Generate a random VKey.
 *
 * @example
 * import { VKey } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(VKey.generator, 20);
 * randomSamples.forEach((vkey) => {
 *  assert(vkey.length === 64);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: 32,
  maxLength: 32,
}).map((bytes) => VKey.make(Bytes.Encode.hex(bytes)));

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

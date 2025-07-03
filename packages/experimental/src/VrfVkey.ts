import { Schema, Data } from "effect";
import * as Hash32 from "./Hash32.js";
import * as Bytes from "./Bytes.js";

/**
 * Error class for VrfVkey related operations.
 *
 * @example
 * import { VrfVkey } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new VrfVkey.VrfVkeyError({ message: "Invalid VRF verification key" });
 * assert(error.message === "Invalid VRF verification key");
 *
 * @since 2.0.0
 * @category errors
 */
export class VrfVkeyError extends Data.TaggedError("VrfVkeyError")<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

/**
 * Schema for VrfVkey representing a VRF verification key.
 * vrf_vkey = bytes .size 32
 * Follows the Conway-era CDDL specification.
 *
 * @since 2.0.0
 * @category schemas
 */
export const VrfVkey = Hash32.HexSchema.pipe(Schema.brand("VrfVkey"));
export type VrfVkey = typeof VrfVkey.Type;

export const BytesSchema = Schema.transform(
  Hash32.BytesSchema,
  Schema.typeSchema(VrfVkey),
  {
    strict: true,
    encode: (_, toA) => Bytes.Decode.hex(toA),
    decode: (_, fromA) => Schema.decodeSync(VrfVkey)(Bytes.Encode.hex(fromA)),
  },
);

export const HexSchema = Schema.transform(
  Schema.typeSchema(Hash32.HexSchema),
  VrfVkey,
  {
    strict: true,
    encode: (_, toA) => toA,
    decode: (fromI) => Schema.decodeSync(VrfVkey)(fromI),
  },
);

/**
 * Check if two VrfVkey instances are equal.
 *
 * @example
 * import { VrfVkey } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: VrfVkey, b: VrfVkey): boolean => a === b;

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

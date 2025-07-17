import { Schema, Data, FastCheck } from "effect";
import * as Bytes from "./Bytes.js";
import * as Hash32 from "./Hash32.js";

/**
 * Error class for VrfKeyHash related operations.
 *
 * @example
 * import { VrfKeyHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new VrfKeyHash.VrfKeyHashError({ message: "Invalid VRF key hash" });
 * assert(error.message === "Invalid VRF key hash");
 *
 * @since 2.0.0
 * @category errors
 */
export class VrfKeyHashError extends Data.TaggedError("VrfKeyHashError")<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

/**
 * VrfKeyHash is a 32-byte hash representing a VRF verification key.
 * vrf_keyhash = hash32
 *
 * @since 2.0.0
 * @category schemas
 */
export const VrfKeyHash = Hash32.HexSchema.pipe(Schema.brand("VrfKeyHash"));
export type VrfKeyHash = typeof VrfKeyHash.Type;

export const BytesSchema = Schema.transform(
  Hash32.BytesSchema,
  Schema.typeSchema(VrfKeyHash),
  {
    strict: true,
    encode: (_, toA) => Bytes.Decode.hex(toA),
    decode: (_, fromA) =>
      Schema.decodeSync(VrfKeyHash)(Bytes.Encode.hex(fromA)),
  },
);

export const HexSchema = Schema.transform(
  Schema.typeSchema(Hash32.HexSchema),
  VrfKeyHash,
  {
    strict: true,
    encode: (_, toA) => toA,
    decode: (fromI) => Schema.decodeSync(VrfKeyHash)(fromI),
  },
);

/**
 * Check if two VrfKeyHash instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: VrfKeyHash, b: VrfKeyHash): boolean => a === b;

/**
 * Generate a random VrfKeyHash.
 *
 * @example
 * import { VrfKeyHash } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(VrfKeyHash.generator, 20);
 * randomSamples.forEach((vrfKeyHash) => {
 *  assert(vrfKeyHash.length === 64);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: Hash32.HASH32_BYTES_LENGTH,
  maxLength: Hash32.HASH32_BYTES_LENGTH,
}).map((bytes) => VrfKeyHash.make(Bytes.Encode.hex(bytes)));

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

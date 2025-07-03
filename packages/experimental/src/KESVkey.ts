import { Schema, Data, FastCheck } from "effect";
import * as Bytes from "./Bytes.js";
import * as Hash32 from "./Hash32.js";

/**
 * Error class for KESVkey related operations.
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new KESVkey.KESVkeyError({ message: "Invalid KES verification key" });
 * assert(error.message === "Invalid KES verification key");
 *
 * @since 2.0.0
 * @category errors
 */
export class KESVkeyError extends Data.TaggedError("KESVkeyError")<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

/**
 * Schema for KESVkey representing a KES verification key.
 * kes_vkey = bytes .size 32
 * Follows the Conway-era CDDL specification.
 *
 * @since 2.0.0
 * @category schemas
 */
export const KESVkey = Hash32.HexSchema.pipe(Schema.brand("KESVkey"));
export type KESVkey = typeof KESVkey.Type;

export const BytesSchema = Schema.transform(
  Hash32.BytesSchema,
  Schema.typeSchema(KESVkey),
  {
    strict: true,
    encode: (_, toA) => Bytes.Decode.hex(toA),
    decode: (_, fromA) => Schema.decodeSync(KESVkey)(Bytes.Encode.hex(fromA)),
  },
);

export const HexSchema = Schema.transform(
  Schema.typeSchema(Hash32.HexSchema),
  KESVkey,
  {
    strict: true,
    encode: (_, toA) => toA,
    decode: (fromI) => Schema.decodeSync(KESVkey)(fromI),
  },
);

/**
 * Check if two KESVkey instances are equal.
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: KESVkey, b: KESVkey): boolean => a === b;

/**
 * Generate a random KESVkey.
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(KESVkey.generator, 20);
 * randomSamples.forEach((kesvkey) => {
 *  assert(kesvkey.length === 64);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: 32,
  maxLength: 32,
}).map((bytes) => KESVkey.make(Bytes.Encode.hex(bytes)));

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

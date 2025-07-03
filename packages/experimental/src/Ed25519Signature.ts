import { Schema, Data, FastCheck } from "effect";
import * as Bytes from "./Bytes.js";
import * as Bytes64 from "./Bytes64.js";

/**
 * Error class for Ed25519Signature related operations.
 *
 * @example
 * import { Ed25519Signature } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new Ed25519Signature.Ed25519SignatureError({ message: "Invalid Ed25519 signature" });
 * assert(error.message === "Invalid Ed25519 signature");
 *
 * @since 2.0.0
 * @category errors
 */
export class Ed25519SignatureError extends Data.TaggedError(
  "Ed25519SignatureError",
)<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

/**
 * Schema for Ed25519Signature representing an Ed25519 signature.
 * ed25519_signature = bytes .size 64
 * Follows the Conway-era CDDL specification.
 *
 * @since 2.0.0
 * @category schemas
 */
export const Ed25519Signature = Bytes64.HexSchema.pipe(
  Schema.brand("Ed25519Signature"),
);
export type Ed25519Signature = typeof Ed25519Signature.Type;

export const BytesSchema = Schema.transform(
  Bytes64.BytesSchema,
  Schema.typeSchema(Ed25519Signature),
  {
    strict: true,
    encode: (_, toA) => Bytes.Decode.hex(toA),
    decode: (_, fromA) =>
      Schema.decodeSync(Ed25519Signature)(Bytes.Encode.hex(fromA)),
  },
);

export const HexSchema = Schema.transform(
  Schema.typeSchema(Bytes64.HexSchema),
  Ed25519Signature,
  {
    strict: true,
    encode: (_, toA) => toA,
    decode: (fromI) => Schema.decodeSync(Ed25519Signature)(fromI),
  },
);

/**
 * Check if two Ed25519Signature instances are equal.
 *
 * @example
 * import { Ed25519Signature } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: Ed25519Signature, b: Ed25519Signature): boolean =>
  a === b;

/**
 * Generate a random Ed25519Signature.
 *
 * @example
 * import { Ed25519Signature } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(Ed25519Signature.generator, 20);
 * randomSamples.forEach((signature) => {
 *  assert(signature.length === 128);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: 64,
  maxLength: 64,
}).map((bytes) => Ed25519Signature.make(Bytes.Encode.hex(bytes)));

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

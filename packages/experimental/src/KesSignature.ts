import { Schema, Data, FastCheck } from "effect";
import * as Bytes from "./Bytes.js";
import * as Bytes448 from "./Bytes448.js";

/**
 * Error class for KesSignature related operations.
 *
 * @example
 * import { KesSignature } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new KesSignature.KesSignatureError({ message: "Invalid KES signature" });
 * assert(error.message === "Invalid KES signature");
 *
 * @since 2.0.0
 * @category errors
 */
export class KesSignatureError extends Data.TaggedError("KesSignatureError")<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

/**
 * Schema for KesSignature representing a KES signature.
 * kes_signature = bytes .size 448
 * Follows the Conway-era CDDL specification.
 *
 * @since 2.0.0
 * @category schemas
 */
export const KesSignature = Bytes448.HexSchema.pipe(
  Schema.brand("KesSignature"),
);
export type KesSignature = typeof KesSignature.Type;

export const BytesSchema = Schema.transform(
  Bytes448.BytesSchema,
  Schema.typeSchema(KesSignature),
  {
    strict: true,
    encode: (_, toA) => Bytes.Decode.hex(toA),
    decode: (_, fromA) =>
      Schema.decodeSync(KesSignature)(Bytes.Encode.hex(fromA)),
  },
);

export const HexSchema = Schema.transform(
  Schema.typeSchema(Bytes448.HexSchema),
  KesSignature,
  {
    strict: true,
    encode: (_, toA) => toA,
    decode: (fromI) => Schema.decodeSync(KesSignature)(fromI),
  },
);

/**
 * Check if two KesSignature instances are equal.
 *
 * @example
 * import { KesSignature } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: KesSignature, b: KesSignature): boolean => a === b;

/**
 * Generate a random KesSignature.
 *
 * @example
 * import { KesSignature } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(KesSignature.generator, 20);
 * randomSamples.forEach((kesSignature) => {
 *  assert(kesSignature.length === 896);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: 448,
  maxLength: 448,
}).map((bytes) => KesSignature.make(Bytes.Encode.hex(bytes)));

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

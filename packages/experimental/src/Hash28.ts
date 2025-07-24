import { Data, Schema } from "effect";
import * as Bytes from "./Bytes.js";
import * as _Codec from "./Codec.js";

export class Hash28Error extends Data.TaggedError("Hash28Error")<{
  message?: string;
  cause?: unknown;
}> {}

/**
 * Hash28 byte array length constant.
 *
 * @since 2.0.0
 * @category constants
 */
export const HASH28_BYTES_LENGTH = 28;

/**
 * Hash28 hex string length constant.
 *
 * @since 2.0.0
 * @category constants
 */
export const HASH28_HEX_LENGTH = 56;

/**
 * Schema for Hash28 hex strings with 56-character length validation.
 *
 * @since 2.0.0
 * @category schemas
 */
export const HexSchema = Bytes.HexSchema.pipe(
  Schema.filter((a) => a.length === HASH28_HEX_LENGTH)
).annotations({
  identifier: "Hash28.Hex",
  message: (issue) =>
    `Hash28 hex must be exactly ${HASH28_HEX_LENGTH} characters, got ${(issue.actual as string).length}`,
});

/**
 * Schema for Hash28 bytes with 28-byte length validation.
 *
 * @since 2.0.0
 * @category schemas
 */
export const BytesSchema = Schema.Uint8ArrayFromSelf.pipe(
  Schema.filter((a) => a.length === HASH28_BYTES_LENGTH)
).annotations({
  identifier: "Hash28.Bytes",
  message: (issue) =>
    `Hash28 bytes must be exactly ${HASH28_BYTES_LENGTH} bytes, got ${(issue.actual as Uint8Array).length}`,
});

/**
 * Schema transformer for Hash28 that converts between hex strings and byte arrays.
 * Like Bytes.BytesSchema but with Hash28-specific length validation.
 *
 * @since 2.0.0
 * @category schemas
 */
export const BytesHexTransformer = Schema.transform(BytesSchema, HexSchema, {
  strict: true,
  decode: (toA) => {
    let hex = "";
    for (let i = 0; i < toA.length; i++) {
      hex += toA[i].toString(16).padStart(2, "0");
    }
    return hex;
  },
  encode: (fromA) => {
    const array = new Uint8Array(fromA.length / 2);
    for (let ai = 0, hi = 0; ai < array.length; ai++, hi += 2) {
      array[ai] = parseInt(fromA.slice(hi, hi + 2), 16);
    }
    return array;
  },
});

/**
 * Codec for Hash28 encoding and decoding operations.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Codec = _Codec.createEncoders(
  {
    bytes: BytesHexTransformer,
    hex: HexSchema,
  },
  Hash28Error
);

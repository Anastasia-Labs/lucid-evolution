import { Data, Schema } from "effect";
import * as Bytes from "./Bytes.js";
import * as _Codec from "./Codec.js";

export class Hash32Error extends Data.TaggedError("Hash32Error")<{
  message?: string;
  cause?: unknown;
}> {}

// Add constants following the style guide
export const HASH32_BYTES_LENGTH = 32;
export const HASH32_HEX_LENGTH = 64;

/**
 * Schema for Hash32 bytes with 32-byte length validation.
 *
 * @since 2.0.0
 * @category schemas
 */
export const BytesSchema = Schema.Uint8ArrayFromSelf.pipe(
  Schema.filter((a) => a.length === HASH32_BYTES_LENGTH)
).annotations({
  identifier: "Hash32.Bytes",
  message: (issue) =>
    `Hash32 bytes must be exactly ${HASH32_BYTES_LENGTH} bytes, got ${(issue.actual as Uint8Array).length}`,
});

/**
 * Schema for Hash32 hex strings with 64-character length validation.
 *
 * @since 2.0.0
 * @category schemas
 */
export const HexSchema = Bytes.HexSchema.pipe(
  Schema.filter((a) => a.length === HASH32_HEX_LENGTH)
).annotations({
  identifier: "Hash32.Hex",
  message: (issue) =>
    `Hash32 hex must be exactly ${HASH32_HEX_LENGTH} characters, got ${(issue.actual as string).length}`,
});

/**
 * Schema for variable-length byte arrays from 0 to 32 bytes.
 * Useful for asset names and other variable-length data structures.
 *
 * @since 2.0.0
 * @category schemas
 */
export const VariableBytesSchema = Schema.Uint8ArrayFromSelf.pipe(
  Schema.filter((a) => a.length >= 0 && a.length <= HASH32_BYTES_LENGTH)
).annotations({
  message: (issue) =>
    `must be a byte array of length 0 to ${HASH32_BYTES_LENGTH}, but got ${(issue.actual as Uint8Array).length}`,
  identifier: "Hash32.VariableBytes",
});

/**
 * Schema for variable-length hex strings from 0 to 64 characters (0 to 32 bytes).
 * Useful for asset names and other variable-length data structures.
 *
 * @since 2.0.0
 * @category schemas
 */
export const VariableHexSchema = Bytes.HexSchema.pipe(
  Schema.filter((a) => a.length >= 0 && a.length <= HASH32_HEX_LENGTH)
).annotations({
  message: (issue) =>
    `must be a hex string of length 0 to ${HASH32_HEX_LENGTH}, but got ${(issue.actual as string).length}`,
  identifier: "Hash32.VariableHex",
});

/**
 * Schema transformer for Hash32 that converts between hex strings and byte arrays.
 * Like Bytes.BytesSchema but with Hash32-specific length validation.
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
 * Codec for Hash32 encoding and decoding operations.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Codec = _Codec.createEncoders(
  {
    bytes: BytesHexTransformer,
    hex: HexSchema,
  },
  Hash32Error
);

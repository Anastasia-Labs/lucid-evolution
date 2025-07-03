import { pipe, Schema } from "effect";
import * as Bytes from "./Bytes.js";

// Add constants following the style guide
export const HASH32_BYTES_LENGTH = 32;
export const HASH32_HEX_LENGTH = 64;

/**
 * Schema for validating Hash32 byte arrays.
 * hash32 = bytes .size 32
 *
 * @since 2.0.0
 * @category schemas
 */
export const BytesSchema = pipe(
  Schema.Uint8ArrayFromSelf,
  Schema.filter((a) => a.length === HASH32_BYTES_LENGTH),
).annotations({
  message: (issue) =>
    `${issue.actual} must be a byte array of length ${HASH32_BYTES_LENGTH}, but got ${(issue.actual as Uint8Array).length}`,
  identifier: "Hash32Bytes",
});

/**
 * Schema for validating Hash32 hex strings.
 * hash32 = bytes .size 32 (represented as 64 hex characters)
 *
 * @since 2.0.0
 * @category schemas
 */
export const HexSchema = pipe(
  Bytes.HexSchema,
  Schema.filter((a) => a.length === HASH32_HEX_LENGTH),
).annotations({
  message: (issue) =>
    `${issue.actual} must be a hex string of length ${HASH32_HEX_LENGTH}, but got ${(issue.actual as string).length}`,
});

/**
 * Schema for variable-length byte arrays from 0 to 32 bytes.
 * Useful for asset names and other variable-length data structures.
 *
 * @since 2.0.0
 * @category schemas
 */
export const VariableBytesSchema = pipe(
  Schema.Uint8ArrayFromSelf,
  Schema.filter((a) => a.length >= 0 && a.length <= HASH32_BYTES_LENGTH),
).annotations({
  message: (issue) =>
    `must be a byte array of length 0 to ${HASH32_BYTES_LENGTH}, but got ${(issue.actual as Uint8Array).length}`,
  identifier: "Hash32VariableBytes",
});

/**
 * Schema for variable-length hex strings from 0 to 64 characters (0 to 32 bytes).
 * Useful for asset names and other variable-length data structures.
 *
 * @since 2.0.0
 * @category schemas
 */
export const VariableHexSchema = pipe(
  Bytes.HexSchema,
  Schema.filter((a) => a.length >= 0 && a.length <= HASH32_HEX_LENGTH),
).annotations({
  message: (issue) =>
    `must be a hex string of length 0 to ${HASH32_HEX_LENGTH}, but got ${(issue.actual as string).length}`,
  identifier: "Hash32VariableHex",
});

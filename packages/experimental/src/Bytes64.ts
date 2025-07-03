import { pipe, Schema } from "effect";
import * as Bytes from "./Bytes.js";

/**
 * Schema for 64-byte arrays
 *
 * CDDL: bytes .size 64
 *
 * @since 2.0.0
 * @category schemas
 */
export const BytesSchema = pipe(
  Schema.Uint8ArrayFromSelf,
  Schema.filter((a) => a.length === 64, {
    message: (issue) =>
      `${issue.actual} must be a byte array of length 64, but got ${issue.actual}`,
    identifier: "Bytes64",
  }),
);

/**
 * Schema for 64-byte hex strings (128 characters)
 *
 * @since 2.0.0
 * @category schemas
 */
export const HexSchema = pipe(
  Bytes.HexSchema,
  Schema.filter((a) => a.length === 128, {
    message: (issue) =>
      `${issue.actual} must be a hex string of length 128, but got ${issue.actual}`,
    identifier: "Bytes64HexString",
  }),
);

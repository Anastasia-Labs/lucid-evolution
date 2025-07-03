import { pipe, Schema } from "effect";
import * as Bytes from "./Bytes.js";

/**
 * Schema for 80-byte arrays
 *
 * CDDL: bytes .size 80
 *
 * @since 2.0.0
 * @category schemas
 */
export const BytesSchema = pipe(
  Schema.Uint8ArrayFromSelf,
  Schema.filter((a) => a.length === 80, {
    message: (issue) =>
      `${issue.actual} must be a byte array of length 80, but got ${issue.actual}`,
    identifier: "Bytes80",
  }),
);

/**
 * Schema for 80-byte hex strings (160 characters)
 *
 * @since 2.0.0
 * @category schemas
 */
export const HexSchema = pipe(
  Bytes.HexSchema,
  Schema.filter((a) => a.length === 160, {
    message: (issue) =>
      `${issue.actual} must be a hex string of length 160, but got ${issue.actual}`,
    identifier: "Bytes80HexString",
  }),
);

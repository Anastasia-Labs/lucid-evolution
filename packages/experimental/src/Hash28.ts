import { pipe, Schema } from "effect";
import * as Bytes from "./Bytes.js";

// Add constants following the style guide
export const HASH28_BYTES_LENGTH = 28;
export const HASH28_HEX_LENGTH = 56;

export const BytesSchema = pipe(
  Schema.Uint8ArrayFromSelf,
  Schema.filter((a) => a.length === HASH28_BYTES_LENGTH),
).annotations({
  message: (issue) =>
    `${issue.actual} must be a byte array of length ${HASH28_BYTES_LENGTH}, but got ${(issue.actual as Uint8Array).length}`,
  identifier: "Hash28Bytes",
});

export const HexSchema = pipe(
  Bytes.HexSchema,
  Schema.filter((a) => a.length === HASH28_HEX_LENGTH),
).annotations({
  message: (issue) =>
    `${issue.actual} must be a hex string of length ${HASH28_HEX_LENGTH}, but got ${(issue.actual as string).length}`,
  identifier: "Hash28Hex",
});

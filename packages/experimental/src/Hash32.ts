import { pipe, Schema } from "effect";
import * as Hex from "./Hex.js";

// Add constants following the style guide
export const HASH32_BYTES_LENGTH = 32;
export const HASH32_HEX_LENGTH = 64;

export const Bytes = pipe(
  Schema.Uint8ArrayFromSelf,
  Schema.filter((a) => a.length === HASH32_BYTES_LENGTH)
).annotations({
  message: (issue) =>
    `${issue.actual} must be a byte array of length ${HASH32_BYTES_LENGTH}, but got ${issue.actual.length}`,
  identifier: "Hash32Bytes",
});

export const HexString = pipe(
  Hex.HexString,
  Schema.filter((a) => a.length === HASH32_HEX_LENGTH)
).annotations({
  message: (issue) =>
    `${issue.actual} must be a hex string of length ${HASH32_HEX_LENGTH}, but got ${issue.actual.length}`,
  identifier: "Hash32HexString",
});
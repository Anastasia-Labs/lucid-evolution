import { pipe, Schema } from "effect";
import * as Bytes from "./Bytes.js";

export const BytesSchema = pipe(
  Schema.Uint8ArrayFromSelf,
  Schema.filter((a) => a.length === 16, {
    message: (issue) =>
      `${issue.actual} must be a byte array of length 16, but got ${issue.actual}`,
    identifier: "Bytes16",
  }),
);

export const HexSchema = pipe(
  Bytes.HexSchema,
  Schema.filter((a) => a.length === 32, {
    message: (issue) =>
      `${issue.actual} must be a hex string of length 32, but got ${issue.actual}`,
    identifier: "Bytes16HexString",
  }),
);

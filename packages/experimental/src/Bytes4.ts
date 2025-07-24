import { pipe, Schema } from "effect";
import * as Bytes from "./Bytes.js";

export const BytesSchema = pipe(
  Schema.Uint8ArrayFromSelf,
  Schema.filter((a) => a.length === 4, {
    message: (issue) =>
      `${issue.actual} must be a byte array of length 4, but got ${issue.actual}`,
    identifier: "Bytes4.Bytes",
  }),
);

export const HexSchema = pipe(
  Bytes.HexSchema,
  Schema.filter((a) => a.length === 8, {
    message: (issue) =>
      `${issue.actual} must be a hex string of length 8, but got ${issue.actual}`,
    identifier: "Bytes4.Hex",
  }),
);

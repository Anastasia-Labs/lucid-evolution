import { pipe, Schema } from "effect";
import * as Hex from "./Hex.js";

export const BytesSchema = pipe(
  Schema.Uint8ArrayFromSelf,
  Schema.filter((a) => a.length === 29, {
    message: (issue) =>
      `${issue.actual} must be a byte array of length 29, but got ${issue.actual}`,
    identifier: "Bytes29",
  }),
);

export const HexSchema = pipe(
  Hex.HexSchema,
  Schema.filter((a) => a.length === 58, {
    message: (issue) =>
      `${issue.actual} must be a hex string of length 58, but got ${issue.actual}`,
    identifier: "Bytes29HexString",
  }),
);

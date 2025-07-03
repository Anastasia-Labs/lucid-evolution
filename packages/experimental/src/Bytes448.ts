import { pipe, Schema } from "effect";
import * as Bytes from "./Bytes.js";

export const BytesSchema = pipe(
  Schema.Uint8ArrayFromSelf,
  Schema.filter((a) => a.length === 448, {
    message: (issue) =>
      `${issue.actual} must be a byte array of length 448, but got ${issue.actual}`,
    identifier: "Bytes448",
  }),
);

export const HexSchema = pipe(
  Bytes.HexSchema,
  Schema.filter((a) => a.length === 896, {
    message: (issue) =>
      `${issue.actual} must be a hex string of length 896, but got ${issue.actual}`,
    identifier: "Bytes448HexString",
  }),
);

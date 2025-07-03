import { pipe, Schema } from "effect";
import * as Bytes from "./Bytes.js";

export const BytesSchema = pipe(
  Schema.Uint8ArrayFromSelf,
  Schema.filter((a) => a.length === 57, {
    message: (issue) =>
      `${issue.actual} must be a byte array of length 57, but got ${issue.actual}`,
    identifier: "Bytes57",
  }),
);

export const HexSchema = pipe(
  Bytes.HexSchema,
  Schema.filter((a) => a.length === 114, {
    message: (issue) =>
      `${issue.actual} must be a hex string of length 114, but got ${issue.actual}`,
    identifier: "Bytes57HexString",
  }),
);

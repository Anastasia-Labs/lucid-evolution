import { pipe, Schema } from "effect";
import * as Hex from "./Hex.js";

export const Bytes = pipe(
  Schema.Uint8ArrayFromSelf,
  Schema.filter((a) => a.length === 57, {
    message: (issue) =>
      `${issue.actual} must be a byte array of length 29, but got ${issue.actual}`,
    identifier: "Bytes29",
  }),
);

export const HexString = pipe(
  Hex.HexSchema,
  Schema.filter((a) => a.length === 104, {
    message: (issue) =>
      `${issue.actual} must be a hex string of length 58, but got ${issue.actual}`,
    identifier: "Bytes29HexString",
  }),
);

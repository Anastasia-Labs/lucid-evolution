import { pipe, Schema } from "effect";
import * as Bytes from "./Bytes.js";

export const TextSchema = Schema.transform(Bytes.HexSchema, Schema.String, {
  strict: true,
  decode: (toA) =>
    pipe(Bytes.Decode.hex(toA), (fromA) => new TextDecoder().decode(fromA)),
  encode: (fromA) => pipe(new TextEncoder().encode(fromA), Bytes.Encode.hex),
});

export const Encode = {
  hex: Schema.encodeSync(TextSchema),
};

export const Decode = {
  hex: Schema.decodeUnknownSync(TextSchema),
};

export const EncodeEffect = {
  hex: Schema.encode(TextSchema),
};

export const DecodeEffect = {
  hex: Schema.decodeUnknown(TextSchema),
};

import * as CBOR from "cbor-x";
import * as Bytes from "./Bytes.js";
import { Effect, Data } from "effect";

export class CBORError extends Data.TaggedError("CBORError")<{
  message: string;
  cause?: unknown;
}> {}

// Create a singleton encoder with the correct options for Cardano CBOR encoding
const encoder = new CBOR.Encoder({
  tagUint8Array: false,
  useRecords: false,
  mapsAsObjects: false,
});

export const encodeOrThrow = (value: any): Uint8Array =>
  new Uint8Array(encoder.encode(value));

export const encode = Effect.fnUntraced(function* (value: any) {
  return yield* Effect.try({
    try: () => encoder.encode(value),
    catch: () =>
      new CBORError({
        message: "CBOR encoding failed",
      }),
  });
});

export const decode = Effect.fn(function* (buffer: Uint8Array) {
  return yield* Effect.try({
    try: () => CBOR.decode(buffer),
    catch: () =>
      new CBORError({
        message: `Oops! I Couldn't decode your cbor bytes: ${buffer}.`,
      }),
  });
});

export const decodeOrThrow = (buffer: Uint8Array): any => CBOR.decode(buffer);

export const decodeHex = Effect.fnUntraced(function* (hex: string) {
  const bytes = yield* Bytes.fromHex(hex);
  return yield* Effect.try({
    try: () => CBOR.decode(bytes),
    catch: () =>
      new CBORError({
        message: `Oops! I Couldn't decode you cbor hex : ${hex}`,
      }),
  });
});

export const decodeHexOrThrow = (hex: string): any => {
  const bytes = Bytes.fromHexOrThrow(hex);
  return CBOR.decode(bytes);
};

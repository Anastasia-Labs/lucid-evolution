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

export const encode = Effect.fnUntraced(function* (value: any) {
  return yield* Effect.try({
    try: () => encoder.encode(value),
    catch: (error) =>
      new CBORError({
        message: "CBOR encoding failed",
        cause: error,
      }),
  });
});

export const decode = Effect.fnUntraced(function* (buffer: Uint8Array) {
  return yield* Effect.try({
    try: () => CBOR.decode(buffer),
    catch: (error) =>
      new CBORError({
        message: `Oops! Couldn't decode your cbor. Here's the hex if it helps: ${Bytes.toHex(buffer)}`,
        cause: error,
      }),
  });
});

export const decodeHex = Effect.fnUntraced(function* (hex: string) {
  const bytes = Bytes.fromHex(hex);
  return yield* Effect.try({
    try: () => CBOR.decode(bytes),
    catch: (error) =>
      new CBORError({
        message: `Oops! Couldn't decode that hex as CBOR: ${hex}`,
        cause: error,
      }),
  });
});

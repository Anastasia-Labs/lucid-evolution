import * as CBORX from "cbor-x";
import * as Hex from "./Hex.js";
import { Data, Effect, pipe } from "effect";

/**
 * Error type for CBOR-related operations
 *
 * @since 2.0.0
 * @category errors
 */
export class CBORError extends Data.TaggedError("CBORError")<{
  message: string;
  cause?: unknown;
}> {}

export type CBORHex<T> = Hex.HexString & T;

// Create a singleton encoder with the correct options for Cardano CBOR encoding
const encoder = new CBORX.Encoder({
  tagUint8Array: false,
  useRecords: false,
  mapsAsObjects: false,
});

/**
 * Encodes a value to CBOR bytes
 *
 * @example
 * import { encodeCBORBytes } from "@lucid-evolution/experimental/CBOR";
 * import { Either } from "effect";
 *
 * const value = { hello: "world" };
 * const result = encodeCBORBytes(value);
 * if (Either.isRight(result)) {
 *   console.log("Encoded to CBOR bytes successfully");
 * }
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const encodeAsBytes = (value: unknown) =>
  Effect.try({
    try: () => new Uint8Array(encoder.encode(value)),
    catch: () =>
      new CBORError({
        message:
          "CBOR encoding failed. Check if the value can be serialized to CBOR format.",
      }),
  });

export const encodeAsBytesOrThrow = (value: unknown) =>
  Effect.runSync(encodeAsBytes(value));

/**
 * Encodes a value to CBOR hex string
 *
 * @example
 * import { encodeCBOR } from "@lucid-evolution/experimental/CBOR";
 * import { Either } from "effect";
 *
 * const value = { hello: "world" };
 * const result = encodeCBOR(value);
 * if (Either.isRight(result)) {
 *   console.log("Encoded to CBOR hex successfully");
 * }
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const encodeAsCBORHex = (value: unknown) =>
  pipe(
    encodeAsBytes(value),
    Effect.map((bytes) => Hex.fromBytes(bytes))
  );

/**
 * Encodes a value to CBOR hex string, throws on error
 *
 * @example
 * import { encodeCBOROrThrow } from "@lucid-evolution/experimental/CBOR";
 *
 * const value = { hello: "world" };
 * const cborHex = encodeCBOROrThrow(value);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const encodeAsCBORHexOrThrow = (value: unknown) =>
  Effect.runSync(encodeAsCBORHex(value));

/**
 * Decodes CBOR bytes to a value
 *
 * @example
 * import { decode } from "@lucid-evolution/experimental/CBOR";
 * import { Either } from "effect";
 *
 * const buffer = new Uint8Array([...]);
 * const result = decode(buffer);
 * if (Either.isRight(result)) {
 *   console.log("Decoded value:", result.right);
 * }
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeBytes = (bytes: Uint8Array) =>
  Effect.try({
    try: () => CBORX.decode(bytes),
    catch: () =>
      new CBORError({
        message:
          "Failed to decode CBOR. Verify that the input contains valid CBOR data.",
      }),
  });

/**
 * Decodes CBOR bytes to a value, throws on error
 *
 * @example
 * import { decodeOrThrow } from "@lucid-evolution/experimental/CBOR";
 *
 * const buffer = new Uint8Array([...]);
 * const value = decodeOrThrow(buffer);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeBytesOrThrow = (bytes: Uint8Array) =>
  Effect.runSync(decodeBytes(bytes));

/**
 * Decodes a CBOR hex string to a value
 *
 * @example
 * import { decodeHex } from "@lucid-evolution/experimental/CBOR";
 * import { makeOrThrow } from "@lucid-evolution/experimental/Hex";
 * import { Either } from "effect";
 *
 * const hex = makeOrThrow("a1656865656c6c6f65776f726c64");
 * const result = decodeHex(hex);
 * if (Either.isRight(result)) {
 *   console.log("Decoded value:", result.right);
 * }
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeHex = <T>(hex: CBORHex<T>) => decodeBytes(Hex.toBytes(hex));

/**
 * Decodes a CBOR hex string to a value, throws on error
 *
 * @example
 * import { decodeHexOrThrow } from "@lucid-evolution/experimental/CBOR";
 * import { makeOrThrow } from "@lucid-evolution/experimental/Hex";
 *
 * const hex = makeOrThrow("a1656865656c6c6f65776f726c64");
 * const value = decodeHexOrThrow(hex);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeHexOrThrow = <T>(hex: CBORHex<T>) =>
  Effect.runSync(decodeHex(hex));

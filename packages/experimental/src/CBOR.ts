import * as CBORX from "cbor-x";
import * as Bytes from "./Bytes.js";
import { Data, Effect, ParseResult, pipe, Schema } from "effect";

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

// Create a singleton encoder with the correct options for Cardano CBOR encoding
const encoder = new CBORX.Encoder({
  tagUint8Array: false,
  useRecords: false,
  mapsAsObjects: false,
});

/**
 * Creates a schema transformation from CBOR bytes to a given schema
 *
 * @since 2.0.0
 * @category schemas
 */
export const makeCBORBytesSchema = <A, B>(schema: Schema.Schema<A, B, never>) =>
  Schema.transformOrFail(
    Schema.Uint8ArrayFromSelf.annotations({ identifier: "CBORBytes" }),
    schema,
    {
      strict: false,
      encode: (toI, _, ast) =>
        ParseResult.try({
          try: () => new Uint8Array(encoder.encode(toI)),
          catch: (e) =>
            new ParseResult.Type(
              ast,
              toI,
              `CBOR encoding failed: ${String(e)}`,
            ),
        }),
      decode: (fromA, _, ast) =>
        ParseResult.try({
          try: () => CBORX.decode(fromA),
          catch: (e) =>
            new ParseResult.Type(
              ast,
              fromA,
              `CBOR decoding failed: ${String(e)}`,
            ),
        }).pipe(
          Effect.flatMap((decoded) => ParseResult.decode(schema)(decoded)),
        ),
    },
  );

/**
 * Creates a schema transformation from CBOR hex to a given schema
 *
 * @since 2.0.0
 * @category schemas
 */
export const makeCBORHexSchema = <A, B>(schema: Schema.Schema<A, B, never>) =>
  Schema.transformOrFail(Bytes.HexSchema, schema, {
    strict: false,
    encode: (toI, _, ast) =>
      pipe(
        ParseResult.try({
          try: () => new Uint8Array(encoder.encode(toI)),
          catch: (e) =>
            new ParseResult.Type(
              ast,
              toI,
              `CBOR encoding failed: ${String(e)}`,
            ),
        }),
        Effect.flatMap((bytes) => ParseResult.encode(Bytes.BytesSchema)(bytes)),
      ),
    decode: (fromA, _, ast) =>
      pipe(
        ParseResult.decode(Bytes.BytesSchema)(fromA),
        Effect.flatMap((bytes) =>
          ParseResult.try({
            try: () => CBORX.decode(bytes),
            catch: (e) =>
              new ParseResult.Type(
                ast,
                fromA,
                `CBOR decoding failed: ${String(e)}`,
              ),
          }),
        ),
        Effect.flatMap((decoded) => ParseResult.decode(schema)(decoded)),
      ),
  });

/**
 * Creates encoding functions for a schema
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeWithSchema = <A, B>(schema: Schema.Schema<A, B, never>) => {
  const HexSchema = makeCBORHexSchema(schema);
  const BytesSchema = makeCBORBytesSchema(schema);

  return {
    hex: Schema.encodeSync(HexSchema),
    bytes: Schema.encodeSync(BytesSchema),
  };
};

/**
 * Creates decoding functions for a schema
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeWithSchema = <A, B>(schema: Schema.Schema<A, B, never>) => {
  const HexSchema = makeCBORHexSchema(schema);
  const BytesSchema = makeCBORBytesSchema(schema);

  return {
    hex: Schema.decodeUnknownSync(HexSchema),
    bytes: Schema.decodeUnknownSync(BytesSchema),
  };
};

export const Encode = {
  hex: Schema.encodeSync(makeCBORHexSchema(Schema.Unknown)),
  bytes: Schema.encodeSync(makeCBORBytesSchema(Schema.Unknown)),
};

export const Decode = {
  hex: Schema.decodeUnknownSync(makeCBORHexSchema(Schema.Unknown)),
  bytes: Schema.decodeUnknownSync(makeCBORBytesSchema(Schema.Unknown)),
};

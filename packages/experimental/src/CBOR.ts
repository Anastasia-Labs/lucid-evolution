import * as CBORX from "cbor-x";
import * as Hex from "./Hex.js";
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
  Schema.transformOrFail(Hex.HexSchema, schema, {
    strict: false,
    encode: (value, _, ast) =>
      ParseResult.try({
        try: () => {
          const encoded = new Uint8Array(encoder.encode(value));
          return Hex.fromBytes(encoded);
        },
        catch: (e) =>
          new ParseResult.Type(
            ast,
            value,
            `CBOR encoding failed: ${String(e)}`,
          ),
      }),
    decode: (hex, _, ast) =>
      pipe(
        ParseResult.try({
          try: () => Hex.toBytes(hex),
          catch: (e) =>
            new ParseResult.Type(ast, hex, `Hex decoding failed: ${String(e)}`),
        }),
        Effect.flatMap((bytes) =>
          ParseResult.try({
            try: () => CBORX.decode(bytes),
            catch: (e) =>
              new ParseResult.Type(
                ast,
                hex,
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
  const hexSchema = makeCBORHexSchema(schema);
  const bytesSchema = makeCBORBytesSchema(schema);

  return {
    hex: Schema.encodeSync(hexSchema),
    bytes: Schema.encodeSync(bytesSchema),
  };
};

/**
 * Creates decoding functions for a schema
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeWithSchema = <A, B>(schema: Schema.Schema<A, B, never>) => {
  const hexSchema = makeCBORHexSchema(schema);
  const bytesSchema = makeCBORBytesSchema(schema);

  return {
    hex: Schema.decodeUnknownSync(hexSchema),
    bytes: Schema.decodeUnknownSync(bytesSchema),
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

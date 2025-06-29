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

/**
 * Configuration options for CBOR encoding
 *
 * @since 2.0.0
 * @category model
 */
export interface CBOREncodingOptions {
  /** Use indefinite length encoding for arrays */
  readonly useIndefiniteArrays?: boolean;
  /** Use indefinite length encoding for maps */
  readonly useIndefiniteMaps?: boolean;
  /** Use canonical encoding (deterministic) */
  readonly canonical?: boolean;
  /** Tag Uint8Array values */
  readonly tagUint8Array?: boolean;
  /** Use records for encoding */
  readonly useRecords?: boolean;
  /** Maps as objects */
  readonly mapsAsObjects?: boolean;
}

/**
 * Default CBOR encoding options for Cardano
 *
 * @since 2.0.0
 * @category constants
 */
export const DEFAULT_ENCODING_OPTIONS: CBOREncodingOptions = {
  useIndefiniteArrays: true,
  useIndefiniteMaps: true,
  canonical: true,
  tagUint8Array: false,
  useRecords: false,
  mapsAsObjects: false,
};

/**
 * Encodes data using indefinite length arrays
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
const encodeIndefiniteArray = (
  array: unknown[],
  options: CBOREncodingOptions,
): Uint8Array => {
  const chunks: Uint8Array[] = [];

  // Indefinite-length array marker (major type 4, additional info 31)
  chunks.push(new Uint8Array([0x9f])); // 0b100_11111

  // Encode each element with the same options (recursive)
  for (const item of array) {
    const encoded = encodeWithOptions(item, options);
    chunks.push(encoded);
  }

  // Break marker
  chunks.push(new Uint8Array([0xff]));

  // Combine all chunks
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
};

/**
 * Encodes data using indefinite length maps
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
const encodeIndefiniteMap = (
  obj: Record<string, unknown>,
  options: CBOREncodingOptions,
): Uint8Array => {
  const chunks: Uint8Array[] = [];

  // Indefinite-length map marker (major type 5, additional info 31)
  chunks.push(new Uint8Array([0xbf])); // 0b101_11111

  // Encode each key-value pair with the same options (recursive)
  for (const [key, value] of Object.entries(obj)) {
    const encodedKey = encodeWithOptions(key, options);
    const encodedValue = encodeWithOptions(value, options);
    chunks.push(encodedKey);
    chunks.push(encodedValue);
  }

  // Break marker
  chunks.push(new Uint8Array([0xff]));

  // Combine all chunks
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
};

/**
 * Encodes data with configurable options
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
const encodeWithOptions = (
  data: unknown,
  options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
): Uint8Array => {
  // Handle indefinite length encoding
  if (options.useIndefiniteArrays && Array.isArray(data)) {
    return encodeIndefiniteArray(data, options);
  } else if (
    options.useIndefiniteMaps &&
    typeof data === "object" &&
    data !== null &&
    !Array.isArray(data) &&
    !(data instanceof Uint8Array) && // Don't treat Uint8Array as maps
    !(data instanceof ArrayBuffer) && // Don't treat ArrayBuffer as maps
    !(data instanceof DataView) // Don't treat DataView as maps
  ) {
    return encodeIndefiniteMap(data as Record<string, unknown>, options);
  } else {
    // Use standard CBOR-X encoding for primitives, Uint8Array, etc.
    const cborEncoder = new CBORX.Encoder({
      tagUint8Array: options.tagUint8Array ?? false,
      useRecords: options.useRecords ?? false,
      mapsAsObjects: options.mapsAsObjects ?? false,
    });

    return new Uint8Array(cborEncoder.encode(data));
  }
};

/**
 * Creates a schema transformation from CBOR bytes to a given schema with configurable encoding options
 *
 * @since 2.0.0
 * @category schemas
 */
export const makeCBORBytesSchema = <A, B>(
  schema: Schema.Schema<A, B, never>,
  options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
) =>
  Schema.transformOrFail(
    Schema.Uint8ArrayFromSelf.annotations({ identifier: "CBORBytes" }),
    schema,
    {
      strict: false,
      encode: (toI, _, ast) =>
        ParseResult.try({
          try: () => encodeWithOptions(toI, options),
          catch: () =>
            new ParseResult.Type(
              ast,
              toI,
              `${String(toI)} must be a valid CBOR value.`,
            ),
        }),
      decode: (fromA, _, ast) =>
        ParseResult.try({
          try: () => CBORX.decode(fromA),
          catch: () =>
            new ParseResult.Type(
              ast,
              fromA,
              `${fromA} must be a valid CBOR bytes array.`,
            ),
        }).pipe(
          Effect.flatMap((decoded) => ParseResult.decode(schema)(decoded)),
        ),
    },
  );

/**
 * Creates a schema transformation from CBOR hex to a given schema with configurable encoding options
 *
 * @since 2.0.0
 * @category schemas
 */
export const makeCBORHexSchema = <A, B>(
  schema: Schema.Schema<A, B, never>,
  options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
) =>
  Schema.transformOrFail(Bytes.HexSchema, schema, {
    strict: false,
    encode: (toI, _, ast) =>
      pipe(
        ParseResult.try({
          try: () => encodeWithOptions(toI, options),
          catch: () =>
            new ParseResult.Type(
              ast,
              toI,
              `${String(toI)} must be a valid CBOR value.`,
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
            catch: () =>
              new ParseResult.Type(
                ast,
                fromA,
                `${Bytes.Encode.hex(bytes)} must be a valid CBOR hex string.`,
              ),
          }),
        ),
        Effect.flatMap((decoded) => ParseResult.decode(schema)(decoded)),
      ),
  });

/**
 * Creates encoding functions for a schema with configurable options
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeWithSchema = <A, B>(
  schema: Schema.Schema<A, B, never>,
  options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
) => {
  const HexSchema = makeCBORHexSchema(schema, options);
  const BytesSchema = makeCBORBytesSchema(schema, options);

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
  const CBORHexSchema = makeCBORHexSchema(schema);
  const CBORBytesSchema = makeCBORBytesSchema(schema);

  return {
    hex: Schema.decodeUnknownSync(CBORHexSchema),
    bytes: Schema.decodeUnknownSync(CBORBytesSchema),
  };
};

/**
 * Creates configurable CBOR encoding functions
 *
 * @example
 * import { CBOR } from "@lucid-evolution/experimental";
 *
 * // Standard canonical encoding
 * const canonical = CBOR.Encode();
 * canonical.hex([1, 2, 3]); // "83010203"
 *
 * // Indefinite length encoding
 * const indefinite = CBOR.Encode({ useIndefiniteArrays: true });
 * indefinite.hex([1, 2, 3]); // "9f010203ff"
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = (
  options: CBOREncodingOptions = DEFAULT_ENCODING_OPTIONS,
) => ({
  hex: (data: unknown) => Bytes.Encode.hex(encodeWithOptions(data, options)),
  bytes: (data: unknown) => encodeWithOptions(data, options),
});

/**
 * Standard CBOR decoding functions
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  hex: Schema.decodeUnknownSync(makeCBORHexSchema(Schema.Unknown)),
  bytes: Schema.decodeUnknownSync(makeCBORBytesSchema(Schema.Unknown)),
};

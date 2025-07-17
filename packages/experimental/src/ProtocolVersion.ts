import { Schema, Data, Effect, ParseResult } from "effect";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";
import * as Numeric from "./Numeric.js";

/**
 * Error class for ProtocolVersion related operations.
 *
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new ProtocolVersion.ProtocolVersionError({ message: "Invalid protocol version" });
 * assert(error.message === "Invalid protocol version");
 *
 * @since 2.0.0
 * @category errors
 */
export class ProtocolVersionError extends Data.TaggedError(
  "ProtocolVersionError",
)<{
  message?: string;
  cause?: unknown;
}> {}

/**
 * ProtocolVersion class based on Conway CDDL specification
 *
 * CDDL: protocol_version = [major_version : uint32, minor_version : uint32]
 *
 * @since 2.0.0
 * @category model
 */
export class ProtocolVersion extends Schema.TaggedClass<ProtocolVersion>()(
  "ProtocolVersion",
  {
    major: Numeric.Uint32Schema,
    minor: Numeric.Uint32Schema,
  },
) {}

/**
 * Check if two ProtocolVersion instances are equal.
 *
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const v1 = new ProtocolVersion({ major: 8n, minor: 0n });
 * const v2 = new ProtocolVersion({ major: 8n, minor: 0n });
 * assert(ProtocolVersion.equals(v1, v2) === true);
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: ProtocolVersion, b: ProtocolVersion): boolean =>
  a.major === b.major && a.minor === b.minor;

/**
 * CDDL schema for ProtocolVersion.
 * protocol_version = [major_version : uint32, minor_version : uint32]
 *
 * @since 2.0.0
 * @category schemas
 */
export const ProtocolVersionCDDLSchema = Schema.transformOrFail(
  Schema.Tuple(CBOR.Integer, CBOR.Integer),
  Schema.typeSchema(ProtocolVersion),
  {
    strict: true,
    encode: (toA) =>
      Effect.succeed([BigInt(toA.major), BigInt(toA.minor)] as const),
    decode: ([major, minor]) =>
      ParseResult.decode(ProtocolVersion)({
        _tag: "ProtocolVersion",
        major: Number(major),
        minor: Number(minor),
      }),
  },
);

/**
 * CBOR bytes transformation schema for ProtocolVersion.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    CBOR.CBORBytesSchema(options), // Uint8Array → CBOR
    ProtocolVersionCDDLSchema, // CBOR → ProtocolVersion
  );

/**
 * CBOR hex transformation schema for ProtocolVersion.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    Bytes.BytesSchema, // string → Uint8Array
    CBORBytesSchema(options), // Uint8Array → ProtocolVersion
  );

export const Codec = (options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS) => ({
  Encode: {
    cborBytes: Schema.encodeSync(CBORBytesSchema(options)),
    cborHex: Schema.encodeSync(CBORHexSchema(options)),
  },
  Decode: {
    cborBytes: Schema.decodeUnknownSync(CBORBytesSchema(options)),
    cborHex: Schema.decodeUnknownSync(CBORHexSchema(options)),
  },
  EncodeEither: {
    cborBytes: Schema.encodeEither(CBORBytesSchema(options)),
    cborHex: Schema.encodeEither(CBORHexSchema(options)),
  },
  DecodeEither: {
    cborBytes: Schema.decodeEither(CBORBytesSchema(options)),
    cborHex: Schema.decodeEither(CBORHexSchema(options)),
  },
  EncodeEffect: {
    cborBytes: Schema.encode(CBORBytesSchema(options)),
    cborHex: Schema.encode(CBORHexSchema(options)),
  },
  DecodeEffect: {
    cborBytes: Schema.decode(CBORBytesSchema(options)),
    cborHex: Schema.decode(CBORHexSchema(options)),
  },
});

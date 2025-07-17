import { Schema, Data, ParseResult, Effect } from "effect";
import * as KESVkey from "./KESVkey.js";
import * as Ed25519Signature from "./Ed25519Signature.js";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";
import * as Numeric from "./Numeric.js";

/**
 * Error class for OperationalCert operations
 *
 * @since 2.0.0
 * @category errors
 */
export class OperationalCertError extends Data.TaggedError(
  "OperationalCertError",
)<{
  message?: string;
  cause?: unknown;
}> {}

/**
 * OperationalCert class based on Conway CDDL specification
 *
 * CDDL: operational_cert = [
 *   hot_vkey : kes_vkey,
 *   sequence_number : uint64,
 *   kes_period : uint64,
 *   sigma : ed25519_signature
 * ]
 *
 * @since 2.0.0
 * @category model
 */
export class OperationalCert extends Schema.TaggedClass<OperationalCert>()(
  "OperationalCert",
  {
    hotVkey: KESVkey.KESVkey,
    sequenceNumber: Numeric.Uint64Schema,
    kesPeriod: Numeric.Uint64Schema,
    sigma: Ed25519Signature.Ed25519Signature,
  },
) {}

/**
 * Check if two OperationalCert instances are equal.
 *
 * @example
 * import { OperationalCert } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const cert1 = new OperationalCert({
 *   hotVkey: KESVkey.KESVkey.make("abcd..."),
 *   sequenceNumber: Natural.Natural.make(1),
 *   kesPeriod: Natural.Natural.make(100),
 *   sigma: Ed25519Signature.Ed25519Signature.make("ef01...")
 * });
 * const cert2 = new OperationalCert({
 *   hotVkey: KESVkey.KESVkey.make("abcd..."),
 *   sequenceNumber: Natural.Natural.make(1),
 *   kesPeriod: Natural.Natural.make(100),
 *   sigma: Ed25519Signature.Ed25519Signature.make("ef01...")
 * });
 * assert(OperationalCert.equals(cert1, cert2) === true);
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: OperationalCert, b: OperationalCert): boolean =>
  KESVkey.equals(a.hotVkey, b.hotVkey) &&
  a.sequenceNumber === b.sequenceNumber &&
  a.kesPeriod === b.kesPeriod &&
  Ed25519Signature.equals(a.sigma, b.sigma);

/**
 * CDDL schema for OperationalCert.
 * operational_cert = [
 *   hot_vkey : kes_vkey,
 *   sequence_number : uint64,
 *   kes_period : uint64,
 *   sigma : ed25519_signature
 * ]
 *
 * @since 2.0.0
 * @category schemas
 */
export const OperationalCertCDDLSchema = Schema.transformOrFail(
  Schema.Tuple(
    CBOR.ByteArray, // hot_vkey as bytes
    CBOR.Integer, // sequence_number as bigint
    CBOR.Integer, // kes_period as bigint
    CBOR.ByteArray, // sigma as bytes
  ),
  Schema.typeSchema(OperationalCert),
  {
    strict: true,
    encode: (toA) =>
      Effect.gen(function* () {
        const hotVkeyBytes = yield* ParseResult.encode(KESVkey.BytesSchema)(
          toA.hotVkey,
        );
        const sigmaBytes = yield* ParseResult.encode(
          Ed25519Signature.BytesSchema,
        )(toA.sigma);
        return [
          hotVkeyBytes,
          BigInt(toA.sequenceNumber),
          BigInt(toA.kesPeriod),
          sigmaBytes,
        ] as const;
      }),
    decode: ([hotVkeyBytes, sequenceNumber, kesPeriod, sigmaBytes]) =>
      Effect.gen(function* () {
        const hotVkey = yield* ParseResult.decode(KESVkey.BytesSchema)(
          hotVkeyBytes,
        );
        const sigma = yield* ParseResult.decode(Ed25519Signature.BytesSchema)(
          sigmaBytes,
        );
        return yield* ParseResult.decode(OperationalCert)({
          _tag: "OperationalCert",
          hotVkey,
          sequenceNumber,
          kesPeriod,
          sigma,
        });
      }),
  },
);

/**
 * CBOR bytes transformation schema for OperationalCert.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    CBOR.CBORBytesSchema(options), // Uint8Array → CBOR
    OperationalCertCDDLSchema, // CBOR → OperationalCert
  );

/**
 * CBOR hex transformation schema for OperationalCert.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    Bytes.BytesSchema, // string → Uint8Array
    CBORBytesSchema(options), // Uint8Array → OperationalCert
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

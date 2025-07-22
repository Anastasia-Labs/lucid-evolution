import { Schema, Data, ParseResult, Effect } from "effect";
import * as Bytes from "./Bytes.js";
import * as Bytes80 from "./Bytes80.js";
import * as CBOR from "./CBOR.js";

/**
 * Error class for VrfCert related operations.
 *
 * @example
 * import { VrfCert } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new VrfCert.VrfCertError({ message: "Invalid VRF certificate" });
 * assert(error.message === "Invalid VRF certificate");
 *
 * @since 2.0.0
 * @category errors
 */
export class VrfCertError extends Data.TaggedError("VrfCertError")<{
  message?: string;
  cause?: unknown;
}> {}

/**
 * Schema for VRF output (32 bytes).
 * vrf_output = bytes .size 32
 *
 * @since 2.0.0
 * @category schemas
 */
export const VRFOutput = Bytes.HexSchema.pipe(Schema.brand("VrfOutput"));

/**
 * Type alias for VRF output.
 *
 * @since 2.0.0
 * @category model
 */
export type VRFOutput = typeof VRFOutput.Type;

/**
 * Schema for VRF proof (80 bytes).
 * vrf_proof = bytes .size 80
 *
 * @since 2.0.0
 * @category schemas
 */
export const VRFProof = Bytes80.HexSchema.pipe(Schema.brand("VrfProof"));

/**
 * Type alias for VRF proof.
 *
 * @since 2.0.0
 * @category model
 */
export type VRFProof = typeof VRFProof.Type;

/**
 * Schema for VrfCert representing a VRF certificate.
 * vrf_cert = [vrf_output, vrf_proof]
 *
 * @example
 * import { VrfCert } from "@evolution-sdk/experimental";
 *
 * const cert = new VrfCert.VrfCert({
 *   output: VrfCert.VRFOutput.make("a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235a0028f35"),
 *   proof: VrfCert.VRFProof.make("...")
 * });
 *
 * @since 2.0.0
 * @category model
 */
export class VrfCert extends Schema.TaggedClass<VrfCert>()("VrfCert", {
  output: VRFOutput,
  proof: VRFProof,
}) {
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: this._tag,
      output: this.output,
      proof: this.proof,
    };
  }
}

/**
 * Check if the given value is a valid VrfCert.
 *
 * @example
 * import { VrfCert } from "@evolution-sdk/experimental";
 *
 * const cert = new VrfCert.VrfCert({ output: ..., proof: ... });
 * console.log(VrfCert.isVrfCert(cert)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isVrfCert = Schema.is(VrfCert);

/**
 * CDDL schema for VrfCert as tuple structure.
 * vrf_cert = [vrf_output, vrf_proof]
 * vrf_output = bytes .size 32
 * vrf_proof = bytes .size 80
 *
 * @since 2.0.0
 * @category schemas
 */
export const VrfCertCDDLSchema = Schema.transformOrFail(
  Schema.Tuple(
    CBOR.ByteArray, // vrf_output as bytes
    CBOR.ByteArray, // vrf_proof as bytes
  ),
  Schema.typeSchema(VrfCert),
  {
    strict: true,
    encode: (vrfCert) =>
      Effect.gen(function* () {
        const outputBytes = yield* ParseResult.decode(Bytes.BytesSchema)(
          vrfCert.output,
        );
        const proofBytes = yield* ParseResult.decode(Bytes.BytesSchema)(
          vrfCert.proof,
        );
        return [outputBytes, proofBytes] as const;
      }),
    decode: ([outputBytes, proofBytes]) =>
      Effect.gen(function* () {
        const output = yield* ParseResult.encode(Bytes.BytesSchema)(
          outputBytes,
        );
        const proof = yield* ParseResult.encode(Bytes.BytesSchema)(proofBytes);
        return new VrfCert({
          output: VRFOutput.make(output),
          proof: VRFProof.make(proof),
        });
      }),
  },
);

/**
 * CBOR bytes transformation schema for VrfCert.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    CBOR.CBORBytesSchema(options), // Uint8Array → CBOR
    VrfCertCDDLSchema, // CBOR → VrfCert
  );

/**
 * CBOR hex transformation schema for VrfCert.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    Bytes.BytesSchema, // string → Uint8Array
    CBORBytesSchema(options), // Uint8Array → VrfCert
  );

/**
 * Bytes transformation schema for VRFOutput.
 * Converts between Uint8Array and VRFOutput hex string.
 *
 * @since 2.0.0
 * @category schemas
 */
export const VRFOutputBytesSchema = Schema.transform(
  Schema.Uint8ArrayFromSelf,
  Schema.typeSchema(VRFOutput),
  {
    strict: true,
    encode: (_, toA) => Bytes.Decode.hex(toA),
    decode: (_, fromA) => Schema.decodeSync(VRFOutput)(Bytes.Encode.hex(fromA)),
  },
);

/**
 * Bytes transformation schema for VRFProof.
 * Converts between Uint8Array and VRFProof hex string.
 *
 * @since 2.0.0
 * @category schemas
 */
export const VRFProofBytesSchema = Schema.transform(
  Schema.Uint8ArrayFromSelf,
  Schema.typeSchema(VRFProof),
  {
    strict: true,
    encode: (_, toA) => Bytes.Decode.hex(toA),
    decode: (_, fromA) => Schema.decodeSync(VRFProof)(Bytes.Encode.hex(fromA)),
  },
);

/**
 * Check if two VrfCert instances are equal.
 *
 * @example
 * import { VrfCert } from "@evolution-sdk/experimental";
 *
 * const cert1 = new VrfCert.VrfCert({ output: ..., proof: ... });
 * const cert2 = new VrfCert.VrfCert({ output: ..., proof: ... });
 * console.log(VrfCert.equals(cert1, cert2));
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: VrfCert, b: VrfCert): boolean =>
  a._tag === b._tag && a.output === b.output && a.proof === b.proof;

/**
 * Create a VrfCert from output and proof.
 *
 * @example
 * import { VrfCert } from "@evolution-sdk/experimental";
 *
 * const cert = VrfCert.make(
 *   VrfCert.VRFOutput.make("a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235a0028f35"),
 *   VrfCert.VRFProof.make("...")
 * );
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = (output: VRFOutput, proof: VRFProof): VrfCert =>
  new VrfCert({ output, proof });

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

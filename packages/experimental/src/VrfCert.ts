import { Schema, Data, ParseResult, Effect } from "effect";
import * as Bytes from "./Bytes.js";
import * as Bytes80 from "./Bytes80.js";
import * as CBOR from "./CBOR.js";

/**
 * Error class for VrfCert related operations.
 *
 * @example
 * import { VrfCert } from "@lucid-evolution/experimental";
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

export const VRFOutput = Bytes.HexSchema.pipe(Schema.brand("VrfOutput"));
export type VRFOutput = typeof VRFOutput.Type;
export const VRFProof = Bytes80.HexSchema.pipe(Schema.brand("VrfProof"));
export type VrfProof = typeof VRFProof.Type;

/**
 * VrfCert class based on Conway CDDL specification
 *
 * CDDL: vrf_cert = [vrf_output, vrf_proof]
 * vrf_output = bytes .size 32
 * vrf_proof = bytes .size 80
 *
 * @since 2.0.0
 * @category model
 */
export class VRFCert extends Schema.TaggedClass<VRFCert>()("VrfCert", {
  output: VRFOutput,
  proof: VRFProof,
}) {}

/**
 * CBOR schema for VrfCert based on Conway CDDL specification
 *
 * CDDL: vrf_cert = [vrf_output, vrf_proof]
 * vrf_output = bytes .size 32
 * vrf_proof = bytes .size 80
 *
 * @since 2.0.0
 * @category schemas
 */
const VrfCertCDDLSchema = Schema.Tuple(Bytes.BytesSchema, Bytes80.BytesSchema);

/**
 * Schema transformation from CBOR bytes to VrfCert
 *
 * @since 2.0.0
 * @category schemas
 */
export const BytesSchema = Schema.transformOrFail(
  Schema.Uint8ArrayFromSelf,
  VRFCert,
  {
    strict: true,
    encode: (_, __, ___, toA) =>
      ParseResult.succeed(
        CBOR.Encode.bytes([
          Schema.decodeUnknownSync(Bytes.BytesSchema)(toA.output),
          Schema.decodeUnknownSync(Bytes80.BytesSchema)(toA.proof),
        ]),
      ),
    decode: (_, __, ___, fromA) =>
      Effect.gen(function* () {
        const value = yield* ParseResult.decode(CBOR.CBORBytesSchema())(fromA);
        const decoded =
          yield* ParseResult.decodeUnknown(VrfCertCDDLSchema)(value);
        const [outputBytes, proofBytes] = decoded;
        return new VRFCert({
          output: VRFOutput.make(Bytes.Encode.hex(outputBytes)),
          proof: VRFProof.make(Bytes.Encode.hex(proofBytes)),
        });
      }),
  },
);

/**
 * TODO: Implement when BytesSchema is complete
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  bytes: Schema.encodeSync(BytesSchema),
};

/**
 * TODO: Implement when BytesSchema is complete
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  bytes: Schema.decodeUnknownSync(BytesSchema),
};

/**
 * TODO: Implement when BytesSchema is complete
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  bytes: Schema.encodeEither(BytesSchema),
};

/**
 * TODO: Implement when BytesSchema is complete
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  bytes: Schema.decodeUnknownEither(BytesSchema),
};

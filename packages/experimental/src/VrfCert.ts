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
export class VrfCert extends Schema.TaggedClass<VrfCert>()("VrfCert", {
  output: Bytes.HexSchema.pipe(Schema.brand("VrfOutput")), // bytes
  proof: Bytes80.HexSchema.pipe(Schema.brand("VrfProof")), // 80 bytes
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
  VrfCert,
  {
    strict: true,
    encode: (_, __, ___, toA) =>
      ParseResult.succeed(
        CBOR.Encode().bytes([
          Schema.decodeUnknownSync(Bytes.BytesSchema)(toA.output),
          Schema.decodeUnknownSync(Bytes80.BytesSchema)(toA.proof),
        ]),
      ),
    decode: (_, __, ___, fromA) =>
      Effect.gen(function* () {
        const decoded = yield* ParseResult.decode(
          CBOR.makeCBORBytesSchema(VrfCertCDDLSchema),
        )(fromA);
        const [outputBytes, proofBytes] = decoded;
        return new VrfCert({
          output: Schema.decodeUnknownSync(
            Bytes.HexSchema.pipe(Schema.brand("VrfOutput")),
          )(Bytes.Encode.hex(outputBytes)),
          proof: Schema.decodeUnknownSync(
            Bytes80.HexSchema.pipe(Schema.brand("VrfProof")),
          )(Bytes.Encode.hex(proofBytes)),
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

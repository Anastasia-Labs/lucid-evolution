import { Schema, Data } from "effect";
import * as Natural from "./Natural.js";
import * as Hash32 from "./Hash32.js";
import * as ProtocolVersion from "./ProtocolVersion.js";
import * as BlockBodyHash from "./BlockBodyHash.js";
import * as VKey from "./VKey.js";
import * as VrfVkey from "./VrfVkey.js";
import * as VrfCert from "./VrfCert.js";
import * as OperationalCert from "./OperationalCert.js";

/**
 * Error class for HeaderBody operations
 *
 * @since 2.0.0
 * @category errors
 */
export class HeaderBodyError extends Data.TaggedError("HeaderBodyError")<{
  message?: string;
  cause?: unknown;
}> {}

/**
 * HeaderBody class based on Conway CDDL specification
 *
 * CDDL: header_body = [
 *   block_number : uint64,
 *   slot : uint64,
 *   prev_hash : block_header_hash / null,
 *   issuer_vkey : vkey,
 *   vrf_vkey : vrf_vkey,
 *   vrf_result : vrf_cert,
 *   block_body_size : uint32,
 *   block_body_hash : block_body_hash,
 *   operational_cert : operational_cert,
 *   protocol_version : protocol_version
 * ]
 *
 * @since 2.0.0
 * @category model
 */
export class HeaderBody extends Schema.TaggedClass<HeaderBody>()("HeaderBody", {
  blockNumber: Natural.Natural,
  slot: Natural.Natural,
  prevHash: Schema.optional(
    Hash32.HexSchema.pipe(Schema.brand("BlockHeaderHash")),
  ),
  issuerVkey: VKey.HexSchema,
  vrfVkey: VrfVkey.HexSchema,
  vrfResult: VrfCert.VRFCert,
  blockBodySize: Natural.Natural,
  blockBodyHash: BlockBodyHash.BlockBodyHash,
  operationalCert: OperationalCert.OperationalCert,
  protocolVersion: ProtocolVersion.ProtocolVersion,
}) {}

/**
 * TODO: Implement proper CBOR encoding/decoding
 * Currently returns a placeholder error
 *
 * @since 2.0.0
 * @category schemas
 */
export const BytesSchema = Schema.transform(
  Schema.Uint8ArrayFromSelf,
  HeaderBody,
  {
    strict: true,
    encode: () => {
      throw new HeaderBodyError({
        message:
          "HeaderBody CBOR encoding not implemented yet. Requires vkey, vrf_vkey, vrf_cert, and operational_cert modules.",
      });
    },
    decode: () => {
      throw new HeaderBodyError({
        message:
          "HeaderBody CBOR decoding not implemented yet. Requires vkey, vrf_vkey, vrf_cert, and operational_cert modules.",
      });
    },
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

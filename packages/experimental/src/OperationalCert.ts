import { Schema, Data } from "effect";
import * as Natural from "./Natural.js";
import * as KESVkey from "./KESVkey.js";
import * as Ed25519Signature from "./Ed25519Signature.js";

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
    hotVkey: KESVkey.HexSchema,
    sequenceNumber: Natural.Natural,
    kesPeriod: Natural.Natural,
    sigma: Ed25519Signature.HexSchema,
  },
) {}

/**
 * TODO: Implement proper CBOR encoding/decoding
 * Currently returns a placeholder error
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = Schema.transform(
  Schema.Uint8ArrayFromSelf,
  OperationalCert,
  {
    strict: true,
    encode: () => {
      throw new OperationalCertError({
        message:
          "OperationalCert CBOR encoding not implemented yet. Requires CBOR utilities.",
      });
    },
    decode: () => {
      throw new OperationalCertError({
        message:
          "OperationalCert CBOR decoding not implemented yet. Requires CBOR utilities.",
      });
    },
  },
);

//TODO: Implement CBORHexSchema when BytesSchema is complete

/**
 * TODO: Implement when BytesSchema is complete
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  bytes: Schema.encodeSync(CBORBytesSchema),
};

/**
 * TODO: Implement when BytesSchema is complete
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  bytes: Schema.decodeUnknownSync(CBORBytesSchema),
};

/**
 * TODO: Implement when BytesSchema is complete
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  bytes: Schema.encodeEither(CBORBytesSchema),
};

/**
 * TODO: Implement when BytesSchema is complete
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  bytes: Schema.decodeUnknownEither(CBORBytesSchema),
};

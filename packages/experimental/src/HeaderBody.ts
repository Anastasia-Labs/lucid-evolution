import { Schema, Data, Effect, ParseResult } from "effect";
import * as Natural from "./Natural.js";
import * as Hash32 from "./Hash32.js";
import * as ProtocolVersion from "./ProtocolVersion.js";
import * as BlockBodyHash from "./BlockBodyHash.js";
import * as VKey from "./VKey.js";
import * as VrfVkey from "./VrfVkey.js";
import * as VrfCert from "./VrfCert.js";
import * as OperationalCert from "./OperationalCert.js";
import * as KESVkey from "./KESVkey.js";
import * as Ed25519Signature from "./Ed25519Signature.js";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";

/**
 * Error class for HeaderBody related operations.
 *
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new HeaderBody.HeaderBodyError({ message: "Invalid header body" });
 * assert(error.message === "Invalid header body");
 *
 * @since 2.0.0
 * @category errors
 */
export class HeaderBodyError extends Data.TaggedError("HeaderBodyError")<{
  message?: string;
  cause?: unknown;
}> {}

/**
 * Schema for HeaderBody representing a block header body.
 * header_body = [
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
 * @example
 * import { HeaderBody, Natural, Hash32, VKey, VrfVkey, VrfCert, BlockBodyHash, OperationalCert, ProtocolVersion } from "@lucid-evolution/experimental";
 *
 * const headerBody = new HeaderBody({
 *   blockNumber: Natural.Natural.make(1000n),
 *   slot: Natural.Natural.make(2000n),
 *   prevHash: Hash32.Hash32.make("a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235"),
 *   issuerVkey: VKey.VKey.make("..."),
 *   vrfVkey: VrfVkey.VrfVkey.make("..."),
 *   vrfResult: new VrfCert.VrfCert({ ... }),
 *   blockBodySize: Natural.Natural.make(1024n),
 *   blockBodyHash: BlockBodyHash.BlockBodyHash.make("..."),
 *   operationalCert: new OperationalCert.OperationalCert({ ... }),
 *   protocolVersion: new ProtocolVersion.ProtocolVersion({ ... })
 * });
 *
 * @since 2.0.0
 * @category model
 */
export class HeaderBody extends Schema.TaggedClass<HeaderBody>()("HeaderBody", {
  blockNumber: Natural.Natural,
  slot: Natural.Natural,
  prevHash: Schema.NullOr(
    Hash32.HexSchema.pipe(Schema.brand("BlockHeaderHash")),
  ),
  issuerVkey: VKey.VKey,
  vrfVkey: VrfVkey.VrfVkey,
  vrfResult: VrfCert.VrfCert,
  blockBodySize: Natural.Natural,
  blockBodyHash: BlockBodyHash.BlockBodyHash,
  operationalCert: OperationalCert.OperationalCert,
  protocolVersion: ProtocolVersion.ProtocolVersion,
}) {
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: this._tag,
      blockNumber: this.blockNumber.toString(),
      slot: this.slot.toString(),
      prevHash: this.prevHash,
      issuerVkey: this.issuerVkey,
      vrfVkey: this.vrfVkey,
      vrfResult: this.vrfResult,
      blockBodySize: this.blockBodySize.toString(),
      blockBodyHash: this.blockBodyHash,
      operationalCert: this.operationalCert,
      protocolVersion: this.protocolVersion,
    };
  }
}

/**
 * Check if two HeaderBody instances are equal.
 *
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const header1 = new HeaderBody({ ... });
 * const header2 = new HeaderBody({ ... });
 * assert(HeaderBody.equals(header1, header2) === true);
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: HeaderBody, b: HeaderBody): boolean =>
  a.blockNumber === b.blockNumber &&
  a.slot === b.slot &&
  a.prevHash === b.prevHash &&
  VKey.equals(a.issuerVkey, b.issuerVkey) &&
  VrfVkey.equals(a.vrfVkey, b.vrfVkey) &&
  VrfCert.equals(a.vrfResult, b.vrfResult) &&
  a.blockBodySize === b.blockBodySize &&
  BlockBodyHash.equals(a.blockBodyHash, b.blockBodyHash) &&
  OperationalCert.equals(a.operationalCert, b.operationalCert) &&
  ProtocolVersion.equals(a.protocolVersion, b.protocolVersion);

/**
 * CDDL schema for HeaderBody.
 * header_body = [
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
 * @category schemas
 */
export const HeaderBodyCDDLSchema = Schema.transformOrFail(
  Schema.Tuple(
    CBOR.Integer, // block_number as bigint
    CBOR.Integer, // slot as bigint
    Schema.NullOr(CBOR.ByteArray), // prev_hash as bytes or null
    CBOR.ByteArray, // issuer_vkey as bytes (32 bytes)
    CBOR.ByteArray, // vrf_vkey as bytes (32 bytes)
    Schema.encodedSchema(
      VrfCert.VrfCertCDDLSchema, // vrf_result as VrfCert
    ),
    CBOR.Integer, // block_body_size as bigint
    CBOR.ByteArray, // block_body_hash as bytes
    Schema.encodedSchema(
      OperationalCert.OperationalCertCDDLSchema, // operational_cert as OperationalCert
    ),
    Schema.encodedSchema(
      ProtocolVersion.ProtocolVersionCDDLSchema, // protocol_version as ProtocolVersion
    ),
  ),
  Schema.typeSchema(HeaderBody),
  {
    strict: true,
    encode: (toA) =>
      Effect.gen(function* () {
        const prevHashBytes = toA.prevHash
          ? yield* ParseResult.decode(Bytes.BytesSchema)(toA.prevHash.slice(2))
          : null;
        const issuerVkeyBytes = yield* ParseResult.encode(VKey.BytesSchema)(
          toA.issuerVkey,
        );
        const vrfVkeyBytes = yield* ParseResult.encode(VrfVkey.BytesSchema)(
          toA.vrfVkey,
        );
        const vrfOutputBytes = yield* ParseResult.encode(
          VrfCert.VRFOutputBytesSchema,
        )(toA.vrfResult.output);
        const vrfProofBytes = yield* ParseResult.encode(
          VrfCert.VRFProofBytesSchema,
        )(toA.vrfResult.proof);
        const blockBodyHashBytes = yield* ParseResult.encode(
          BlockBodyHash.BytesSchema,
        )(toA.blockBodyHash);
        const hotVkeyBytes = yield* ParseResult.encode(KESVkey.BytesSchema)(
          toA.operationalCert.hotVkey,
        );
        const sigmaBytes = yield* ParseResult.encode(
          Ed25519Signature.BytesSchema,
        )(toA.operationalCert.sigma);

        return [
          BigInt(toA.blockNumber),
          BigInt(toA.slot),
          prevHashBytes,
          issuerVkeyBytes,
          vrfVkeyBytes,
          [vrfOutputBytes, vrfProofBytes] as const,
          BigInt(toA.blockBodySize),
          blockBodyHashBytes,
          [
            hotVkeyBytes,
            BigInt(toA.operationalCert.sequenceNumber),
            BigInt(toA.operationalCert.kesPeriod),
            sigmaBytes,
          ] as const,
          [
            BigInt(toA.protocolVersion.major),
            BigInt(toA.protocolVersion.minor),
          ] as const,
        ] as const;
      }),
    decode: ([
      blockNumber,
      slot,
      prevHashBytes,
      issuerVkeyBytes,
      vrfVkeyBytes,
      [vrfOutputBytes, vrfProofBytes],
      blockBodySize,
      blockBodyHashBytes,
      [hotVkeyBytes, sequenceNumber, kesPeriod, sigmaBytes],
      [protocolMajor, protocolMinor],
    ]) =>
      Effect.gen(function* () {
        const prevHash = prevHashBytes
          ? yield* ParseResult.encode(Bytes.BytesSchema)(prevHashBytes)
          : null;
        const issuerVkey = yield* ParseResult.decode(VKey.BytesSchema)(
          issuerVkeyBytes,
        );
        const vrfVkey = yield* ParseResult.decode(VrfVkey.BytesSchema)(
          vrfVkeyBytes,
        );
        const vrfOutput = yield* ParseResult.decode(
          VrfCert.VRFOutputBytesSchema,
        )(vrfOutputBytes);
        const vrfProof = yield* ParseResult.decode(VrfCert.VRFProofBytesSchema)(
          vrfProofBytes,
        );
        const blockBodyHash = yield* ParseResult.decode(
          BlockBodyHash.BytesSchema,
        )(blockBodyHashBytes);
        const hotVkey = yield* ParseResult.decode(KESVkey.BytesSchema)(
          hotVkeyBytes,
        );
        const sigma = yield* ParseResult.decode(Ed25519Signature.BytesSchema)(
          sigmaBytes,
        );

        return yield* ParseResult.decode(HeaderBody)({
          _tag: "HeaderBody",
          blockNumber: Natural.Natural.make(Number(blockNumber)),
          slot: Natural.Natural.make(Number(slot)),
          prevHash,
          issuerVkey,
          vrfVkey,
          vrfResult: new VrfCert.VrfCert({
            output: vrfOutput,
            proof: vrfProof,
          }),
          blockBodySize: Natural.Natural.make(Number(blockBodySize)),
          blockBodyHash,
          operationalCert: new OperationalCert.OperationalCert({
            hotVkey,
            sequenceNumber,
            kesPeriod,
            sigma,
          }),
          protocolVersion: new ProtocolVersion.ProtocolVersion({
            major: Number(protocolMajor),
            minor: Number(protocolMinor),
          }),
        });
      }),
  },
);

/**
 * Check if the given value is a valid HeaderBody.
 *
 * @example
 * import { HeaderBody } from "@lucid-evolution/experimental";
 *
 * const headerBody = new HeaderBody({ ... });
 * console.log(HeaderBody.isHeaderBody(headerBody)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isHeaderBody = Schema.is(HeaderBody);

/**
 * CBOR bytes transformation schema for HeaderBody.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    CBOR.CBORBytesSchema(options), // Uint8Array → CBOR
    HeaderBodyCDDLSchema, // CBOR → HeaderBody
  );

/**
 * CBOR hex transformation schema for HeaderBody.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    Bytes.BytesSchema, // string → Uint8Array
    CBORBytesSchema(options), // Uint8Array → HeaderBody
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

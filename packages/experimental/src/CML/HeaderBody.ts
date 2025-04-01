/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML HeaderBody class
 *
 * @since 2.0.0
 * @category Types
 */
export type HeaderBody = CML.HeaderBody;

/**
 * Error class for HeaderBody operations
 *
 * This error is thrown when operations on HeaderBody instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class HeaderBodyError extends Data.TaggedError("HeaderBodyError")<{
  message?: string;
}> {}

/**
 * Method free of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.HeaderBody,
) => Effect.Effect<void, HeaderBodyError> = Effect.fn(
  (instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.HeaderBody): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.HeaderBody,
) => Effect.Effect<Uint8Array, HeaderBodyError> = Effect.fn(
  (instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.toCborBytes failed HeaderBody is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.HeaderBody): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.HeaderBody,
) => Effect.Effect<Uint8Array, HeaderBodyError> = Effect.fn(
  (instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.toCanonicalCborBytes failed HeaderBody is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.HeaderBody,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of HeaderBody
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.HeaderBody, HeaderBodyError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.HeaderBody.from_cbor_bytes(cborBytes),
    catch: () =>
      new HeaderBodyError({
        message: `HeaderBody.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls HeaderBody.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.HeaderBody =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.HeaderBody,
) => Effect.Effect<string, HeaderBodyError> = Effect.fn(
  (instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.toCborHex failed HeaderBody is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.HeaderBody): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.HeaderBody,
) => Effect.Effect<string, HeaderBodyError> = Effect.fn(
  (instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.toCanonicalCborHex failed HeaderBody is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.HeaderBody): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of HeaderBody
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.HeaderBody, HeaderBodyError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.HeaderBody.from_cbor_hex(cborBytes),
    catch: () =>
      new HeaderBodyError({
        message: `HeaderBody.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls HeaderBody.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.HeaderBody =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.HeaderBody,
) => Effect.Effect<string, HeaderBodyError> = Effect.fn(
  (instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.toJson failed HeaderBody is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.HeaderBody): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.HeaderBody,
) => Effect.Effect<any, HeaderBodyError> = Effect.fn(
  (instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.toJsValue failed HeaderBody is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.HeaderBody): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of HeaderBody
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.HeaderBody, HeaderBodyError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.HeaderBody.from_json(json),
    catch: () =>
      new HeaderBodyError({
        message: `HeaderBody.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls HeaderBody.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.HeaderBody =>
  Effect.runSync(fromJson(json));

/**
 * Method blockNumber of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const blockNumber: (
  instance: CML.HeaderBody,
) => Effect.Effect<bigint, HeaderBodyError> = Effect.fn(
  (instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.block_number(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.blockNumber failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.blockNumber without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const blockNumberUnsafe = (instance: CML.HeaderBody): bigint =>
  Effect.runSync(blockNumber(instance));

/**
 * Method slot of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const slot: (
  instance: CML.HeaderBody,
) => Effect.Effect<bigint, HeaderBodyError> = Effect.fn(
  (instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.slot(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.slot failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.slot without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const slotUnsafe = (instance: CML.HeaderBody): bigint =>
  Effect.runSync(slot(instance));

/**
 * Method prevHash of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const prevHash: (
  instance: CML.HeaderBody,
) => Effect.Effect<CML.BlockHeaderHash | undefined, HeaderBodyError> =
  Effect.fn((instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.prev_hash(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.prevHash failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.prevHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const prevHashUnsafe = (
  instance: CML.HeaderBody,
): CML.BlockHeaderHash | undefined => Effect.runSync(prevHash(instance));

/**
 * Method issuerVkey of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const issuerVkey: (
  instance: CML.HeaderBody,
) => Effect.Effect<CML.PublicKey, HeaderBodyError> = Effect.fn(
  (instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.issuer_vkey(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.issuerVkey failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.issuerVkey without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const issuerVkeyUnsafe = (instance: CML.HeaderBody): CML.PublicKey =>
  Effect.runSync(issuerVkey(instance));

/**
 * Method vrfVkey of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const vrfVkey: (
  instance: CML.HeaderBody,
) => Effect.Effect<CML.VRFVkey, HeaderBodyError> = Effect.fn(
  (instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.vrf_vkey(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.vrfVkey failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.vrfVkey without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const vrfVkeyUnsafe = (instance: CML.HeaderBody): CML.VRFVkey =>
  Effect.runSync(vrfVkey(instance));

/**
 * Method vrfResult of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const vrfResult: (
  instance: CML.HeaderBody,
) => Effect.Effect<CML.VRFCert, HeaderBodyError> = Effect.fn(
  (instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.vrf_result(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.vrfResult failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.vrfResult without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const vrfResultUnsafe = (instance: CML.HeaderBody): CML.VRFCert =>
  Effect.runSync(vrfResult(instance));

/**
 * Method blockBodySize of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const blockBodySize: (
  instance: CML.HeaderBody,
) => Effect.Effect<bigint, HeaderBodyError> = Effect.fn(
  (instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.block_body_size(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.blockBodySize failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.blockBodySize without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const blockBodySizeUnsafe = (instance: CML.HeaderBody): bigint =>
  Effect.runSync(blockBodySize(instance));

/**
 * Method blockBodyHash of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const blockBodyHash: (
  instance: CML.HeaderBody,
) => Effect.Effect<CML.BlockBodyHash, HeaderBodyError> = Effect.fn(
  (instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.block_body_hash(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.blockBodyHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.blockBodyHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const blockBodyHashUnsafe = (
  instance: CML.HeaderBody,
): CML.BlockBodyHash => Effect.runSync(blockBodyHash(instance));

/**
 * Method operationalCert of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const operationalCert: (
  instance: CML.HeaderBody,
) => Effect.Effect<CML.OperationalCert, HeaderBodyError> = Effect.fn(
  (instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.operational_cert(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.operationalCert failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.operationalCert without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const operationalCertUnsafe = (
  instance: CML.HeaderBody,
): CML.OperationalCert => Effect.runSync(operationalCert(instance));

/**
 * Method protocolVersion of HeaderBody
 *
 * @since 2.0.0
 * @category Methods
 */
export const protocolVersion: (
  instance: CML.HeaderBody,
) => Effect.Effect<CML.ProtocolVersion, HeaderBodyError> = Effect.fn(
  (instance: CML.HeaderBody) =>
    Effect.try({
      try: () => instance.protocol_version(),
      catch: () =>
        new HeaderBodyError({
          message: `HeaderBody.protocolVersion failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.protocolVersion without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const protocolVersionUnsafe = (
  instance: CML.HeaderBody,
): CML.ProtocolVersion => Effect.runSync(protocolVersion(instance));

/**
 * Static method _new of HeaderBody
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  blockNumber: bigint,
  slot: bigint,
  prevHash: CML.BlockHeaderHash | undefined,
  issuerVkey: CML.PublicKey,
  vrfVkey: CML.VRFVkey,
  vrfResult: CML.VRFCert,
  blockBodySize: bigint,
  blockBodyHash: CML.BlockBodyHash,
  operationalCert: CML.OperationalCert,
  protocolVersion: CML.ProtocolVersion,
) => Effect.Effect<CML.HeaderBody, HeaderBodyError> = Effect.fn(function* (
  blockNumber: bigint,
  slot: bigint,
  prevHash: CML.BlockHeaderHash | undefined,
  issuerVkey: CML.PublicKey,
  vrfVkey: CML.VRFVkey,
  vrfResult: CML.VRFCert,
  blockBodySize: bigint,
  blockBodyHash: CML.BlockBodyHash,
  operationalCert: CML.OperationalCert,
  protocolVersion: CML.ProtocolVersion,
) {
  return yield* Effect.try({
    try: () =>
      CML.HeaderBody.new(
        blockNumber,
        slot,
        prevHash,
        issuerVkey,
        vrfVkey,
        vrfResult,
        blockBodySize,
        blockBodyHash,
        operationalCert,
        protocolVersion,
      ),
    catch: () =>
      new HeaderBodyError({
        message: `HeaderBody._new failed with parameters: ${blockNumber}, ${slot}, ${prevHash}, ${issuerVkey} (PublicKey), ${vrfVkey} (VRFVkey), ${vrfResult} (VRFCert), ${blockBodySize}, ${blockBodyHash} (BlockBodyHash), ${operationalCert} (OperationalCert), ${protocolVersion} (ProtocolVersion). `,
      }),
  });
});

/**
 * Unsafely calls HeaderBody._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  blockNumber: bigint,
  slot: bigint,
  prevHash: CML.BlockHeaderHash | undefined,
  issuerVkey: CML.PublicKey,
  vrfVkey: CML.VRFVkey,
  vrfResult: CML.VRFCert,
  blockBodySize: bigint,
  blockBodyHash: CML.BlockBodyHash,
  operationalCert: CML.OperationalCert,
  protocolVersion: CML.ProtocolVersion,
): CML.HeaderBody =>
  Effect.runSync(
    _new(
      blockNumber,
      slot,
      prevHash,
      issuerVkey,
      vrfVkey,
      vrfResult,
      blockBodySize,
      blockBodyHash,
      operationalCert,
      protocolVersion,
    ),
  );

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML OperationalCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type OperationalCert = CML.OperationalCert;

/**
 * Error class for OperationalCert operations
 *
 * This error is thrown when operations on OperationalCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class OperationalCertError extends Data.TaggedError(
  "OperationalCertError",
)<{
  message?: string;
}> {}

/**
 * Method free of OperationalCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.OperationalCert,
) => Effect.Effect<void, OperationalCertError> = Effect.fn(
  (instance: CML.OperationalCert) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.OperationalCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of OperationalCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.OperationalCert,
) => Effect.Effect<Uint8Array, OperationalCertError> = Effect.fn(
  (instance: CML.OperationalCert) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.toCborBytes failed OperationalCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.OperationalCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of OperationalCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.OperationalCert,
) => Effect.Effect<Uint8Array, OperationalCertError> = Effect.fn(
  (instance: CML.OperationalCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.toCanonicalCborBytes failed OperationalCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.OperationalCert,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of OperationalCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.OperationalCert, OperationalCertError> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.OperationalCert.from_cbor_bytes(cborBytes),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls OperationalCert.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.OperationalCert => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of OperationalCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.OperationalCert,
) => Effect.Effect<string, OperationalCertError> = Effect.fn(
  (instance: CML.OperationalCert) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.toCborHex failed OperationalCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.OperationalCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of OperationalCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.OperationalCert,
) => Effect.Effect<string, OperationalCertError> = Effect.fn(
  (instance: CML.OperationalCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.toCanonicalCborHex failed OperationalCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.OperationalCert,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of OperationalCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.OperationalCert, OperationalCertError> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.OperationalCert.from_cbor_hex(cborBytes),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls OperationalCert.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.OperationalCert =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of OperationalCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.OperationalCert,
) => Effect.Effect<string, OperationalCertError> = Effect.fn(
  (instance: CML.OperationalCert) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.toJson failed OperationalCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.OperationalCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of OperationalCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.OperationalCert,
) => Effect.Effect<any, OperationalCertError> = Effect.fn(
  (instance: CML.OperationalCert) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.toJsValue failed OperationalCert is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.OperationalCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of OperationalCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.OperationalCert, OperationalCertError> = Effect.fn(
  function* (json: string) {
    return yield* Effect.try({
      try: () => CML.OperationalCert.from_json(json),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  },
);

/**
 * Unsafely calls OperationalCert.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.OperationalCert =>
  Effect.runSync(fromJson(json));

/**
 * Method hotVkey of OperationalCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const hotVkey: (
  instance: CML.OperationalCert,
) => Effect.Effect<CML.KESVkey, OperationalCertError> = Effect.fn(
  (instance: CML.OperationalCert) =>
    Effect.try({
      try: () => instance.hot_vkey(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.hotVkey failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.hotVkey without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hotVkeyUnsafe = (instance: CML.OperationalCert): CML.KESVkey =>
  Effect.runSync(hotVkey(instance));

/**
 * Method sequenceNumber of OperationalCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const sequenceNumber: (
  instance: CML.OperationalCert,
) => Effect.Effect<bigint, OperationalCertError> = Effect.fn(
  (instance: CML.OperationalCert) =>
    Effect.try({
      try: () => instance.sequence_number(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.sequenceNumber failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.sequenceNumber without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const sequenceNumberUnsafe = (instance: CML.OperationalCert): bigint =>
  Effect.runSync(sequenceNumber(instance));

/**
 * Method kesPeriod of OperationalCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const kesPeriod: (
  instance: CML.OperationalCert,
) => Effect.Effect<bigint, OperationalCertError> = Effect.fn(
  (instance: CML.OperationalCert) =>
    Effect.try({
      try: () => instance.kes_period(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.kesPeriod failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kesPeriod without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kesPeriodUnsafe = (instance: CML.OperationalCert): bigint =>
  Effect.runSync(kesPeriod(instance));

/**
 * Method sigma of OperationalCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const sigma: (
  instance: CML.OperationalCert,
) => Effect.Effect<CML.Ed25519Signature, OperationalCertError> = Effect.fn(
  (instance: CML.OperationalCert) =>
    Effect.try({
      try: () => instance.sigma(),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert.sigma failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.sigma without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const sigmaUnsafe = (
  instance: CML.OperationalCert,
): CML.Ed25519Signature => Effect.runSync(sigma(instance));

/**
 * Static method _new of OperationalCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  hotVkey: CML.KESVkey,
  sequenceNumber: bigint,
  kesPeriod: bigint,
  sigma: CML.Ed25519Signature,
) => Effect.Effect<CML.OperationalCert, OperationalCertError> = Effect.fn(
  function* (
    hotVkey: CML.KESVkey,
    sequenceNumber: bigint,
    kesPeriod: bigint,
    sigma: CML.Ed25519Signature,
  ) {
    return yield* Effect.try({
      try: () =>
        CML.OperationalCert.new(hotVkey, sequenceNumber, kesPeriod, sigma),
      catch: () =>
        new OperationalCertError({
          message: `OperationalCert._new failed with parameters: ${hotVkey} (KESVkey), ${sequenceNumber}, ${kesPeriod}, ${sigma} (Ed25519Signature). `,
        }),
    });
  },
);

/**
 * Unsafely calls OperationalCert._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  hotVkey: CML.KESVkey,
  sequenceNumber: bigint,
  kesPeriod: bigint,
  sigma: CML.Ed25519Signature,
): CML.OperationalCert =>
  Effect.runSync(_new(hotVkey, sequenceNumber, kesPeriod, sigma));

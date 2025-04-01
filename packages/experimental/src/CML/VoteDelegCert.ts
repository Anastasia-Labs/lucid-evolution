/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML VoteDelegCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type VoteDelegCert = CML.VoteDelegCert;

/**
 * Error class for VoteDelegCert operations
 *
 * This error is thrown when operations on VoteDelegCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class VoteDelegCertError extends Data.TaggedError("VoteDelegCertError")<{
  message?: string;
}> {}

/**
 * Method free of VoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.VoteDelegCert,
) => Effect.Effect<void, VoteDelegCertError> = Effect.fn(
  (instance: CML.VoteDelegCert) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.VoteDelegCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of VoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.VoteDelegCert,
) => Effect.Effect<Uint8Array, VoteDelegCertError> = Effect.fn(
  (instance: CML.VoteDelegCert) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.toCborBytes failed VoteDelegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.VoteDelegCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of VoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.VoteDelegCert,
) => Effect.Effect<Uint8Array, VoteDelegCertError> = Effect.fn(
  (instance: CML.VoteDelegCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.toCanonicalCborBytes failed VoteDelegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.VoteDelegCert,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of VoteDelegCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.VoteDelegCert, VoteDelegCertError> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.VoteDelegCert.from_cbor_bytes(cborBytes),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls VoteDelegCert.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.VoteDelegCert =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of VoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.VoteDelegCert,
) => Effect.Effect<string, VoteDelegCertError> = Effect.fn(
  (instance: CML.VoteDelegCert) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.toCborHex failed VoteDelegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.VoteDelegCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of VoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.VoteDelegCert,
) => Effect.Effect<string, VoteDelegCertError> = Effect.fn(
  (instance: CML.VoteDelegCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.toCanonicalCborHex failed VoteDelegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.VoteDelegCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of VoteDelegCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.VoteDelegCert, VoteDelegCertError> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.VoteDelegCert.from_cbor_hex(cborBytes),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls VoteDelegCert.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.VoteDelegCert =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of VoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.VoteDelegCert,
) => Effect.Effect<string, VoteDelegCertError> = Effect.fn(
  (instance: CML.VoteDelegCert) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.toJson failed VoteDelegCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.VoteDelegCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of VoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.VoteDelegCert,
) => Effect.Effect<any, VoteDelegCertError> = Effect.fn(
  (instance: CML.VoteDelegCert) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.toJsValue failed VoteDelegCert is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.VoteDelegCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of VoteDelegCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.VoteDelegCert, VoteDelegCertError> = Effect.fn(
  function* (json: string) {
    return yield* Effect.try({
      try: () => CML.VoteDelegCert.from_json(json),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  },
);

/**
 * Unsafely calls VoteDelegCert.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.VoteDelegCert =>
  Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of VoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential: (
  instance: CML.VoteDelegCert,
) => Effect.Effect<CML.Credential, VoteDelegCertError> = Effect.fn(
  (instance: CML.VoteDelegCert) =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.stakeCredential failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeCredentialUnsafe = (
  instance: CML.VoteDelegCert,
): CML.Credential => Effect.runSync(stakeCredential(instance));

/**
 * Method dRep of VoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const dRep: (
  instance: CML.VoteDelegCert,
) => Effect.Effect<CML.DRep, VoteDelegCertError> = Effect.fn(
  (instance: CML.VoteDelegCert) =>
    Effect.try({
      try: () => instance.d_rep(),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert.dRep failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.dRep without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dRepUnsafe = (instance: CML.VoteDelegCert): CML.DRep =>
  Effect.runSync(dRep(instance));

/**
 * Static method _new of VoteDelegCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  stakeCredential: CML.Credential,
  dRep: CML.DRep,
) => Effect.Effect<CML.VoteDelegCert, VoteDelegCertError> = Effect.fn(
  function* (stakeCredential: CML.Credential, dRep: CML.DRep) {
    return yield* Effect.try({
      try: () => CML.VoteDelegCert.new(stakeCredential, dRep),
      catch: () =>
        new VoteDelegCertError({
          message: `VoteDelegCert._new failed with parameters: ${stakeCredential} (Credential), ${dRep} (DRep). `,
        }),
    });
  },
);

/**
 * Unsafely calls VoteDelegCert._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  stakeCredential: CML.Credential,
  dRep: CML.DRep,
): CML.VoteDelegCert => Effect.runSync(_new(stakeCredential, dRep));

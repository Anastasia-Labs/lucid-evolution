/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML StakeVoteDelegCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type StakeVoteDelegCert = CML.StakeVoteDelegCert;

/**
 * Error class for StakeVoteDelegCert operations
 *
 * This error is thrown when operations on StakeVoteDelegCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class StakeVoteDelegCertError extends Data.TaggedError(
  "StakeVoteDelegCertError",
)<{
  message?: string;
}> {}

/**
 * Method free of StakeVoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<void, StakeVoteDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteDelegCert) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new StakeVoteDelegCertError({
          message: `StakeVoteDelegCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.StakeVoteDelegCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of StakeVoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<Uint8Array, StakeVoteDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteDelegCert) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new StakeVoteDelegCertError({
          message: `StakeVoteDelegCert.toCborBytes failed StakeVoteDelegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.StakeVoteDelegCert,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of StakeVoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<Uint8Array, StakeVoteDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteDelegCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new StakeVoteDelegCertError({
          message: `StakeVoteDelegCert.toCanonicalCborBytes failed StakeVoteDelegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.StakeVoteDelegCert,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of StakeVoteDelegCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.StakeVoteDelegCert, StakeVoteDelegCertError> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.StakeVoteDelegCert.from_cbor_bytes(cborBytes),
      catch: () =>
        new StakeVoteDelegCertError({
          message: `StakeVoteDelegCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls StakeVoteDelegCert.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.StakeVoteDelegCert => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of StakeVoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<string, StakeVoteDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteDelegCert) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new StakeVoteDelegCertError({
          message: `StakeVoteDelegCert.toCborHex failed StakeVoteDelegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.StakeVoteDelegCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of StakeVoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<string, StakeVoteDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteDelegCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new StakeVoteDelegCertError({
          message: `StakeVoteDelegCert.toCanonicalCborHex failed StakeVoteDelegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
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
  instance: CML.StakeVoteDelegCert,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of StakeVoteDelegCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.StakeVoteDelegCert, StakeVoteDelegCertError> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.StakeVoteDelegCert.from_cbor_hex(cborBytes),
      catch: () =>
        new StakeVoteDelegCertError({
          message: `StakeVoteDelegCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls StakeVoteDelegCert.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.StakeVoteDelegCert =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of StakeVoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<string, StakeVoteDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteDelegCert) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new StakeVoteDelegCertError({
          message: `StakeVoteDelegCert.toJson failed StakeVoteDelegCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.StakeVoteDelegCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of StakeVoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<any, StakeVoteDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteDelegCert) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new StakeVoteDelegCertError({
          message: `StakeVoteDelegCert.toJsValue failed StakeVoteDelegCert is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.StakeVoteDelegCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of StakeVoteDelegCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.StakeVoteDelegCert, StakeVoteDelegCertError> = Effect.fn(
  function* (json: string) {
    return yield* Effect.try({
      try: () => CML.StakeVoteDelegCert.from_json(json),
      catch: () =>
        new StakeVoteDelegCertError({
          message: `StakeVoteDelegCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  },
);

/**
 * Unsafely calls StakeVoteDelegCert.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.StakeVoteDelegCert =>
  Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of StakeVoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<CML.Credential, StakeVoteDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteDelegCert) =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new StakeVoteDelegCertError({
          message: `StakeVoteDelegCert.stakeCredential failed `,
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
  instance: CML.StakeVoteDelegCert,
): CML.Credential => Effect.runSync(stakeCredential(instance));

/**
 * Method pool of StakeVoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const pool: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<CML.Ed25519KeyHash, StakeVoteDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteDelegCert) =>
    Effect.try({
      try: () => instance.pool(),
      catch: () =>
        new StakeVoteDelegCertError({
          message: `StakeVoteDelegCert.pool failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.pool without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolUnsafe = (
  instance: CML.StakeVoteDelegCert,
): CML.Ed25519KeyHash => Effect.runSync(pool(instance));

/**
 * Method dRep of StakeVoteDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const dRep: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<CML.DRep, StakeVoteDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteDelegCert) =>
    Effect.try({
      try: () => instance.d_rep(),
      catch: () =>
        new StakeVoteDelegCertError({
          message: `StakeVoteDelegCert.dRep failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.dRep without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dRepUnsafe = (instance: CML.StakeVoteDelegCert): CML.DRep =>
  Effect.runSync(dRep(instance));

/**
 * Static method _new of StakeVoteDelegCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  dRep: CML.DRep,
) => Effect.Effect<CML.StakeVoteDelegCert, StakeVoteDelegCertError> = Effect.fn(
  function* (
    stakeCredential: CML.Credential,
    pool: CML.Ed25519KeyHash,
    dRep: CML.DRep,
  ) {
    return yield* Effect.try({
      try: () => CML.StakeVoteDelegCert.new(stakeCredential, pool, dRep),
      catch: () =>
        new StakeVoteDelegCertError({
          message: `StakeVoteDelegCert._new failed with parameters: ${stakeCredential} (Credential), ${pool} (Ed25519KeyHash), ${dRep} (DRep). `,
        }),
    });
  },
);

/**
 * Unsafely calls StakeVoteDelegCert._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  dRep: CML.DRep,
): CML.StakeVoteDelegCert => Effect.runSync(_new(stakeCredential, pool, dRep));

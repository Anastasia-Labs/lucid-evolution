/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML StakeVoteRegDelegCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type StakeVoteRegDelegCert = CML.StakeVoteRegDelegCert;

/**
 * Error class for StakeVoteRegDelegCert operations
 *
 * This error is thrown when operations on StakeVoteRegDelegCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class StakeVoteRegDelegCertError extends Data.TaggedError(
  "StakeVoteRegDelegCertError",
)<{
  message?: string;
}> {}

/**
 * Method free of StakeVoteRegDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<void, StakeVoteRegDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.StakeVoteRegDelegCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of StakeVoteRegDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<Uint8Array, StakeVoteRegDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toCborBytes failed StakeVoteRegDelegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.StakeVoteRegDelegCert,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of StakeVoteRegDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<Uint8Array, StakeVoteRegDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toCanonicalCborBytes failed StakeVoteRegDelegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.StakeVoteRegDelegCert,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of StakeVoteRegDelegCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.StakeVoteRegDelegCert, StakeVoteRegDelegCertError> =
  Effect.fn(function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.StakeVoteRegDelegCert.from_cbor_bytes(cborBytes),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  });

/**
 * Unsafely calls StakeVoteRegDelegCert.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.StakeVoteRegDelegCert => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of StakeVoteRegDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<string, StakeVoteRegDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toCborHex failed StakeVoteRegDelegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.StakeVoteRegDelegCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of StakeVoteRegDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<string, StakeVoteRegDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toCanonicalCborHex failed StakeVoteRegDelegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
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
  instance: CML.StakeVoteRegDelegCert,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of StakeVoteRegDelegCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.StakeVoteRegDelegCert, StakeVoteRegDelegCertError> =
  Effect.fn(function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.StakeVoteRegDelegCert.from_cbor_hex(cborBytes),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  });

/**
 * Unsafely calls StakeVoteRegDelegCert.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (
  cborBytes: string,
): CML.StakeVoteRegDelegCert => Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of StakeVoteRegDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<string, StakeVoteRegDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toJson failed StakeVoteRegDelegCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.StakeVoteRegDelegCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of StakeVoteRegDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<any, StakeVoteRegDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toJsValue failed StakeVoteRegDelegCert is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.StakeVoteRegDelegCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of StakeVoteRegDelegCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.StakeVoteRegDelegCert, StakeVoteRegDelegCertError> =
  Effect.fn(function* (json: string) {
    return yield* Effect.try({
      try: () => CML.StakeVoteRegDelegCert.from_json(json),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  });

/**
 * Unsafely calls StakeVoteRegDelegCert.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.StakeVoteRegDelegCert =>
  Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of StakeVoteRegDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<CML.Credential, StakeVoteRegDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert) =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.stakeCredential failed `,
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
  instance: CML.StakeVoteRegDelegCert,
): CML.Credential => Effect.runSync(stakeCredential(instance));

/**
 * Method pool of StakeVoteRegDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const pool: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<CML.Ed25519KeyHash, StakeVoteRegDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert) =>
    Effect.try({
      try: () => instance.pool(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.pool failed `,
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
  instance: CML.StakeVoteRegDelegCert,
): CML.Ed25519KeyHash => Effect.runSync(pool(instance));

/**
 * Method dRep of StakeVoteRegDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const dRep: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<CML.DRep, StakeVoteRegDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert) =>
    Effect.try({
      try: () => instance.d_rep(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.dRep failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.dRep without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dRepUnsafe = (instance: CML.StakeVoteRegDelegCert): CML.DRep =>
  Effect.runSync(dRep(instance));

/**
 * Method deposit of StakeVoteRegDelegCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const deposit: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<bigint, StakeVoteRegDelegCertError> = Effect.fn(
  (instance: CML.StakeVoteRegDelegCert) =>
    Effect.try({
      try: () => instance.deposit(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.deposit failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.deposit without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const depositUnsafe = (instance: CML.StakeVoteRegDelegCert): bigint =>
  Effect.runSync(deposit(instance));

/**
 * Static method _new of StakeVoteRegDelegCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  dRep: CML.DRep,
  deposit: bigint,
) => Effect.Effect<CML.StakeVoteRegDelegCert, StakeVoteRegDelegCertError> =
  Effect.fn(function* (
    stakeCredential: CML.Credential,
    pool: CML.Ed25519KeyHash,
    dRep: CML.DRep,
    deposit: bigint,
  ) {
    return yield* Effect.try({
      try: () =>
        CML.StakeVoteRegDelegCert.new(stakeCredential, pool, dRep, deposit),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert._new failed with parameters: ${stakeCredential} (Credential), ${pool} (Ed25519KeyHash), ${dRep} (DRep), ${deposit}. `,
        }),
    });
  });

/**
 * Unsafely calls StakeVoteRegDelegCert._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  dRep: CML.DRep,
  deposit: bigint,
): CML.StakeVoteRegDelegCert =>
  Effect.runSync(_new(stakeCredential, pool, dRep, deposit));

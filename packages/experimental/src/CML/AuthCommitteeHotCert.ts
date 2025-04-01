/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML AuthCommitteeHotCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type AuthCommitteeHotCert = CML.AuthCommitteeHotCert;

/**
 * Error class for AuthCommitteeHotCert operations
 *
 * This error is thrown when operations on AuthCommitteeHotCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class AuthCommitteeHotCertError extends Data.TaggedError(
  "AuthCommitteeHotCertError",
)<{
  message?: string;
}> {}

/**
 * Method free of AuthCommitteeHotCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<void, AuthCommitteeHotCertError> = Effect.fn(
  (instance: CML.AuthCommitteeHotCert) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.AuthCommitteeHotCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of AuthCommitteeHotCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<Uint8Array, AuthCommitteeHotCertError> = Effect.fn(
  (instance: CML.AuthCommitteeHotCert) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toCborBytes failed AuthCommitteeHotCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.AuthCommitteeHotCert,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of AuthCommitteeHotCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<Uint8Array, AuthCommitteeHotCertError> = Effect.fn(
  (instance: CML.AuthCommitteeHotCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toCanonicalCborBytes failed AuthCommitteeHotCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.AuthCommitteeHotCert,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of AuthCommitteeHotCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.AuthCommitteeHotCert, AuthCommitteeHotCertError> =
  Effect.fn(function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.AuthCommitteeHotCert.from_cbor_bytes(cborBytes),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  });

/**
 * Unsafely calls AuthCommitteeHotCert.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.AuthCommitteeHotCert => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of AuthCommitteeHotCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<string, AuthCommitteeHotCertError> = Effect.fn(
  (instance: CML.AuthCommitteeHotCert) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toCborHex failed AuthCommitteeHotCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.AuthCommitteeHotCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of AuthCommitteeHotCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<string, AuthCommitteeHotCertError> = Effect.fn(
  (instance: CML.AuthCommitteeHotCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toCanonicalCborHex failed AuthCommitteeHotCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
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
  instance: CML.AuthCommitteeHotCert,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of AuthCommitteeHotCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.AuthCommitteeHotCert, AuthCommitteeHotCertError> =
  Effect.fn(function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.AuthCommitteeHotCert.from_cbor_hex(cborBytes),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  });

/**
 * Unsafely calls AuthCommitteeHotCert.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (
  cborBytes: string,
): CML.AuthCommitteeHotCert => Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of AuthCommitteeHotCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<string, AuthCommitteeHotCertError> = Effect.fn(
  (instance: CML.AuthCommitteeHotCert) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toJson failed AuthCommitteeHotCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.AuthCommitteeHotCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of AuthCommitteeHotCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<any, AuthCommitteeHotCertError> = Effect.fn(
  (instance: CML.AuthCommitteeHotCert) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toJsValue failed AuthCommitteeHotCert is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.AuthCommitteeHotCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of AuthCommitteeHotCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.AuthCommitteeHotCert, AuthCommitteeHotCertError> =
  Effect.fn(function* (json: string) {
    return yield* Effect.try({
      try: () => CML.AuthCommitteeHotCert.from_json(json),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  });

/**
 * Unsafely calls AuthCommitteeHotCert.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.AuthCommitteeHotCert =>
  Effect.runSync(fromJson(json));

/**
 * Method committeeColdCredential of AuthCommitteeHotCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const committeeColdCredential: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<CML.Credential, AuthCommitteeHotCertError> = Effect.fn(
  (instance: CML.AuthCommitteeHotCert) =>
    Effect.try({
      try: () => instance.committee_cold_credential(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.committeeColdCredential failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.committeeColdCredential without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const committeeColdCredentialUnsafe = (
  instance: CML.AuthCommitteeHotCert,
): CML.Credential => Effect.runSync(committeeColdCredential(instance));

/**
 * Method committeeHotCredential of AuthCommitteeHotCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const committeeHotCredential: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<CML.Credential, AuthCommitteeHotCertError> = Effect.fn(
  (instance: CML.AuthCommitteeHotCert) =>
    Effect.try({
      try: () => instance.committee_hot_credential(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.committeeHotCredential failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.committeeHotCredential without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const committeeHotCredentialUnsafe = (
  instance: CML.AuthCommitteeHotCert,
): CML.Credential => Effect.runSync(committeeHotCredential(instance));

/**
 * Static method _new of AuthCommitteeHotCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  committeeColdCredential: CML.Credential,
  committeeHotCredential: CML.Credential,
) => Effect.Effect<CML.AuthCommitteeHotCert, AuthCommitteeHotCertError> =
  Effect.fn(function* (
    committeeColdCredential: CML.Credential,
    committeeHotCredential: CML.Credential,
  ) {
    return yield* Effect.try({
      try: () =>
        CML.AuthCommitteeHotCert.new(
          committeeColdCredential,
          committeeHotCredential,
        ),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert._new failed with parameters: ${committeeColdCredential} (Credential), ${committeeHotCredential} (Credential). `,
        }),
    });
  });

/**
 * Unsafely calls AuthCommitteeHotCert._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  committeeColdCredential: CML.Credential,
  committeeHotCredential: CML.Credential,
): CML.AuthCommitteeHotCert =>
  Effect.runSync(_new(committeeColdCredential, committeeHotCredential));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ResignCommitteeColdCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type ResignCommitteeColdCert = CML.ResignCommitteeColdCert;

/**
 * Error class for ResignCommitteeColdCert operations
 *
 * This error is thrown when operations on ResignCommitteeColdCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ResignCommitteeColdCertError extends Data.TaggedError(
  "ResignCommitteeColdCertError",
)<{
  message?: string;
}> {}

/**
 * Method free of ResignCommitteeColdCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.ResignCommitteeColdCert,
) => Effect.Effect<void, ResignCommitteeColdCertError> = Effect.fn(
  (instance: CML.ResignCommitteeColdCert) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ResignCommitteeColdCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ResignCommitteeColdCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.ResignCommitteeColdCert,
) => Effect.Effect<Uint8Array, ResignCommitteeColdCertError> = Effect.fn(
  (instance: CML.ResignCommitteeColdCert) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.toCborBytes failed ResignCommitteeColdCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.ResignCommitteeColdCert,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ResignCommitteeColdCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.ResignCommitteeColdCert,
) => Effect.Effect<Uint8Array, ResignCommitteeColdCertError> = Effect.fn(
  (instance: CML.ResignCommitteeColdCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.toCanonicalCborBytes failed ResignCommitteeColdCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.ResignCommitteeColdCert,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ResignCommitteeColdCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ResignCommitteeColdCert, ResignCommitteeColdCertError> =
  Effect.fn(function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.ResignCommitteeColdCert.from_cbor_bytes(cborBytes),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  });

/**
 * Unsafely calls ResignCommitteeColdCert.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.ResignCommitteeColdCert => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ResignCommitteeColdCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.ResignCommitteeColdCert,
) => Effect.Effect<string, ResignCommitteeColdCertError> = Effect.fn(
  (instance: CML.ResignCommitteeColdCert) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.toCborHex failed ResignCommitteeColdCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (
  instance: CML.ResignCommitteeColdCert,
): string => Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ResignCommitteeColdCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.ResignCommitteeColdCert,
) => Effect.Effect<string, ResignCommitteeColdCertError> = Effect.fn(
  (instance: CML.ResignCommitteeColdCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.toCanonicalCborHex failed ResignCommitteeColdCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
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
  instance: CML.ResignCommitteeColdCert,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ResignCommitteeColdCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ResignCommitteeColdCert, ResignCommitteeColdCertError> =
  Effect.fn(function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.ResignCommitteeColdCert.from_cbor_hex(cborBytes),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  });

/**
 * Unsafely calls ResignCommitteeColdCert.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (
  cborBytes: string,
): CML.ResignCommitteeColdCert => Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ResignCommitteeColdCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.ResignCommitteeColdCert,
) => Effect.Effect<string, ResignCommitteeColdCertError> = Effect.fn(
  (instance: CML.ResignCommitteeColdCert) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.toJson failed ResignCommitteeColdCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ResignCommitteeColdCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ResignCommitteeColdCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.ResignCommitteeColdCert,
) => Effect.Effect<any, ResignCommitteeColdCertError> = Effect.fn(
  (instance: CML.ResignCommitteeColdCert) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.toJsValue failed ResignCommitteeColdCert is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ResignCommitteeColdCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ResignCommitteeColdCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.ResignCommitteeColdCert, ResignCommitteeColdCertError> =
  Effect.fn(function* (json: string) {
    return yield* Effect.try({
      try: () => CML.ResignCommitteeColdCert.from_json(json),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  });

/**
 * Unsafely calls ResignCommitteeColdCert.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.ResignCommitteeColdCert =>
  Effect.runSync(fromJson(json));

/**
 * Method committeeColdCredential of ResignCommitteeColdCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const committeeColdCredential: (
  instance: CML.ResignCommitteeColdCert,
) => Effect.Effect<CML.Credential, ResignCommitteeColdCertError> = Effect.fn(
  (instance: CML.ResignCommitteeColdCert) =>
    Effect.try({
      try: () => instance.committee_cold_credential(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.committeeColdCredential failed `,
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
  instance: CML.ResignCommitteeColdCert,
): CML.Credential => Effect.runSync(committeeColdCredential(instance));

/**
 * Method anchor of ResignCommitteeColdCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const anchor: (
  instance: CML.ResignCommitteeColdCert,
) => Effect.Effect<CML.Anchor | undefined, ResignCommitteeColdCertError> =
  Effect.fn((instance: CML.ResignCommitteeColdCert) =>
    Effect.try({
      try: () => instance.anchor(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.anchor failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.anchor without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const anchorUnsafe = (
  instance: CML.ResignCommitteeColdCert,
): CML.Anchor | undefined => Effect.runSync(anchor(instance));

/**
 * Static method _new of ResignCommitteeColdCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  committeeColdCredential: CML.Credential,
  anchor: CML.Anchor,
) => Effect.Effect<CML.ResignCommitteeColdCert, ResignCommitteeColdCertError> =
  Effect.fn(function* (
    committeeColdCredential: CML.Credential,
    anchor: CML.Anchor,
  ) {
    return yield* Effect.try({
      try: () =>
        CML.ResignCommitteeColdCert.new(committeeColdCredential, anchor),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert._new failed with parameters: ${committeeColdCredential} (Credential), ${anchor} (Anchor). `,
        }),
    });
  });

/**
 * Unsafely calls ResignCommitteeColdCert._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  committeeColdCredential: CML.Credential,
  anchor: CML.Anchor,
): CML.ResignCommitteeColdCert =>
  Effect.runSync(_new(committeeColdCredential, anchor));

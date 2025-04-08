/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML UpdateDrepCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type UpdateDrepCert = CML.UpdateDrepCert;

/**
 * Error class for UpdateDrepCert operations
 *
 * This error is thrown when operations on UpdateDrepCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class UpdateDrepCertError extends Data.TaggedError(
  "UpdateDrepCertError",
)<{
  message?: string;
}> {}

/**
 * Method free of UpdateDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<void, UpdateDrepCertError> = Effect.fn(
  (instance: CML.UpdateDrepCert) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.UpdateDrepCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of UpdateDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<Uint8Array, UpdateDrepCertError> = Effect.fn(
  (instance: CML.UpdateDrepCert) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.toCborBytes failed UpdateDrepCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.UpdateDrepCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of UpdateDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<Uint8Array, UpdateDrepCertError> = Effect.fn(
  (instance: CML.UpdateDrepCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.toCanonicalCborBytes failed UpdateDrepCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.UpdateDrepCert,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of UpdateDrepCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.UpdateDrepCert, UpdateDrepCertError> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.UpdateDrepCert.from_cbor_bytes(cborBytes),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls UpdateDrepCert.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.UpdateDrepCert => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of UpdateDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<string, UpdateDrepCertError> = Effect.fn(
  (instance: CML.UpdateDrepCert) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.toCborHex failed UpdateDrepCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.UpdateDrepCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of UpdateDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<string, UpdateDrepCertError> = Effect.fn(
  (instance: CML.UpdateDrepCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.toCanonicalCborHex failed UpdateDrepCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
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
  instance: CML.UpdateDrepCert,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of UpdateDrepCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.UpdateDrepCert, UpdateDrepCertError> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.UpdateDrepCert.from_cbor_hex(cborBytes),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls UpdateDrepCert.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.UpdateDrepCert =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of UpdateDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<string, UpdateDrepCertError> = Effect.fn(
  (instance: CML.UpdateDrepCert) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.toJson failed UpdateDrepCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.UpdateDrepCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of UpdateDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<any, UpdateDrepCertError> = Effect.fn(
  (instance: CML.UpdateDrepCert) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.toJsValue failed UpdateDrepCert is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.UpdateDrepCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of UpdateDrepCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.UpdateDrepCert, UpdateDrepCertError> = Effect.fn(
  function* (json: string) {
    return yield* Effect.try({
      try: () => CML.UpdateDrepCert.from_json(json),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  },
);

/**
 * Unsafely calls UpdateDrepCert.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.UpdateDrepCert =>
  Effect.runSync(fromJson(json));

/**
 * Method drepCredential of UpdateDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const drepCredential: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<CML.Credential, UpdateDrepCertError> = Effect.fn(
  (instance: CML.UpdateDrepCert) =>
    Effect.try({
      try: () => instance.drep_credential(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.drepCredential failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.drepCredential without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const drepCredentialUnsafe = (
  instance: CML.UpdateDrepCert,
): CML.Credential => Effect.runSync(drepCredential(instance));

/**
 * Method anchor of UpdateDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const anchor: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<CML.Anchor | undefined, UpdateDrepCertError> = Effect.fn(
  (instance: CML.UpdateDrepCert) =>
    Effect.try({
      try: () => instance.anchor(),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert.anchor failed `,
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
  instance: CML.UpdateDrepCert,
): CML.Anchor | undefined => Effect.runSync(anchor(instance));

/**
 * Static method _new of UpdateDrepCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  drepCredential: CML.Credential,
  anchor: CML.Anchor,
) => Effect.Effect<CML.UpdateDrepCert, UpdateDrepCertError> = Effect.fn(
  function* (drepCredential: CML.Credential, anchor: CML.Anchor) {
    return yield* Effect.try({
      try: () => CML.UpdateDrepCert.new(drepCredential, anchor),
      catch: () =>
        new UpdateDrepCertError({
          message: `UpdateDrepCert._new failed with parameters: ${drepCredential} (Credential), ${anchor} (Anchor). `,
        }),
    });
  },
);

/**
 * Unsafely calls UpdateDrepCert._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  drepCredential: CML.Credential,
  anchor: CML.Anchor,
): CML.UpdateDrepCert => Effect.runSync(_new(drepCredential, anchor));

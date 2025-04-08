/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML UnregDrepCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type UnregDrepCert = CML.UnregDrepCert;

/**
 * Error class for UnregDrepCert operations
 *
 * This error is thrown when operations on UnregDrepCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class UnregDrepCertError extends Data.TaggedError("UnregDrepCertError")<{
  message?: string;
}> {}

/**
 * Method free of UnregDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<void, UnregDrepCertError> = Effect.fn(
  (instance: CML.UnregDrepCert) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.UnregDrepCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of UnregDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<Uint8Array, UnregDrepCertError> = Effect.fn(
  (instance: CML.UnregDrepCert) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toCborBytes failed UnregDrepCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.UnregDrepCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of UnregDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<Uint8Array, UnregDrepCertError> = Effect.fn(
  (instance: CML.UnregDrepCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toCanonicalCborBytes failed UnregDrepCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.UnregDrepCert,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of UnregDrepCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.UnregDrepCert, UnregDrepCertError> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.UnregDrepCert.from_cbor_bytes(cborBytes),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls UnregDrepCert.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.UnregDrepCert =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of UnregDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<string, UnregDrepCertError> = Effect.fn(
  (instance: CML.UnregDrepCert) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toCborHex failed UnregDrepCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.UnregDrepCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of UnregDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<string, UnregDrepCertError> = Effect.fn(
  (instance: CML.UnregDrepCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toCanonicalCborHex failed UnregDrepCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.UnregDrepCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of UnregDrepCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.UnregDrepCert, UnregDrepCertError> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.UnregDrepCert.from_cbor_hex(cborBytes),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls UnregDrepCert.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.UnregDrepCert =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of UnregDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<string, UnregDrepCertError> = Effect.fn(
  (instance: CML.UnregDrepCert) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toJson failed UnregDrepCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.UnregDrepCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of UnregDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<any, UnregDrepCertError> = Effect.fn(
  (instance: CML.UnregDrepCert) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toJsValue failed UnregDrepCert is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.UnregDrepCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of UnregDrepCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.UnregDrepCert, UnregDrepCertError> = Effect.fn(
  function* (json: string) {
    return yield* Effect.try({
      try: () => CML.UnregDrepCert.from_json(json),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  },
);

/**
 * Unsafely calls UnregDrepCert.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.UnregDrepCert =>
  Effect.runSync(fromJson(json));

/**
 * Method drepCredential of UnregDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const drepCredential: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<CML.Credential, UnregDrepCertError> = Effect.fn(
  (instance: CML.UnregDrepCert) =>
    Effect.try({
      try: () => instance.drep_credential(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.drepCredential failed `,
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
  instance: CML.UnregDrepCert,
): CML.Credential => Effect.runSync(drepCredential(instance));

/**
 * Method deposit of UnregDrepCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const deposit: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<bigint, UnregDrepCertError> = Effect.fn(
  (instance: CML.UnregDrepCert) =>
    Effect.try({
      try: () => instance.deposit(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.deposit failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.deposit without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const depositUnsafe = (instance: CML.UnregDrepCert): bigint =>
  Effect.runSync(deposit(instance));

/**
 * Static method _new of UnregDrepCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  drepCredential: CML.Credential,
  deposit: bigint,
) => Effect.Effect<CML.UnregDrepCert, UnregDrepCertError> = Effect.fn(
  function* (drepCredential: CML.Credential, deposit: bigint) {
    return yield* Effect.try({
      try: () => CML.UnregDrepCert.new(drepCredential, deposit),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert._new failed with parameters: ${drepCredential} (Credential), ${deposit}. `,
        }),
    });
  },
);

/**
 * Unsafely calls UnregDrepCert._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  drepCredential: CML.Credential,
  deposit: bigint,
): CML.UnregDrepCert => Effect.runSync(_new(drepCredential, deposit));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML RegCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type RegCert = CML.RegCert;

/**
 * Error class for RegCert operations
 * 
 * This error is thrown when operations on RegCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class RegCertError extends Data.TaggedError("RegCertError")<{
  message?: string;
}> {}

/**
 * Method free of RegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.RegCert) => Effect.Effect<void, RegCertError> = Effect.fn(
  (instance: CML.RegCert) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RegCertError({
          message: `RegCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.RegCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of RegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.RegCert) => Effect.Effect<Uint8Array, RegCertError> = Effect.fn(
  (instance: CML.RegCert) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new RegCertError({
          message: `RegCert.toCborBytes failed RegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.RegCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of RegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.RegCert) => Effect.Effect<Uint8Array, RegCertError> = Effect.fn(
  (instance: CML.RegCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new RegCertError({
          message: `RegCert.toCanonicalCborBytes failed RegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.RegCert): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of RegCert
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.RegCert, RegCertError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.RegCert.from_cbor_bytes(cborBytes),
    catch: () => new RegCertError({
      message: `RegCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls RegCert.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.RegCert =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of RegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.RegCert) => Effect.Effect<string, RegCertError> = Effect.fn(
  (instance: CML.RegCert) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new RegCertError({
          message: `RegCert.toCborHex failed RegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.RegCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of RegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.RegCert) => Effect.Effect<string, RegCertError> = Effect.fn(
  (instance: CML.RegCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new RegCertError({
          message: `RegCert.toCanonicalCborHex failed RegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.RegCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of RegCert
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.RegCert, RegCertError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.RegCert.from_cbor_hex(cborBytes),
    catch: () => new RegCertError({
      message: `RegCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls RegCert.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.RegCert =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of RegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.RegCert) => Effect.Effect<string, RegCertError> = Effect.fn(
  (instance: CML.RegCert) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new RegCertError({
          message: `RegCert.toJson failed RegCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.RegCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of RegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.RegCert) => Effect.Effect<any, RegCertError> = Effect.fn(
  (instance: CML.RegCert) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new RegCertError({
          message: `RegCert.toJsValue failed RegCert is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.RegCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of RegCert
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.RegCert, RegCertError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.RegCert.from_json(json),
    catch: () => new RegCertError({
      message: `RegCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls RegCert.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.RegCert =>
  Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of RegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential: (instance: CML.RegCert) => Effect.Effect<CML.Credential, RegCertError> = Effect.fn(
  (instance: CML.RegCert) =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new RegCertError({
          message: `RegCert.stakeCredential failed `,
        }),
    })
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeCredentialUnsafe = (instance: CML.RegCert): CML.Credential =>
  Effect.runSync(stakeCredential(instance));

/**
 * Method deposit of RegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const deposit: (instance: CML.RegCert) => Effect.Effect<bigint, RegCertError> = Effect.fn(
  (instance: CML.RegCert) =>
    Effect.try({
      try: () => instance.deposit(),
      catch: () =>
        new RegCertError({
          message: `RegCert.deposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.deposit without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const depositUnsafe = (instance: CML.RegCert): bigint =>
  Effect.runSync(deposit(instance));

/**
 * Static method _new of RegCert
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (stakeCredential: CML.Credential, deposit: bigint) => Effect.Effect<CML.RegCert, RegCertError> = Effect.fn(function* (stakeCredential: CML.Credential, deposit: bigint) {
  return yield* Effect.try({
    try: () => CML.RegCert.new(stakeCredential, deposit),
    catch: () => new RegCertError({
      message: `RegCert._new failed with parameters: ${stakeCredential} (Credential), ${deposit}. `,
    }),
  });
});

/**
 * Unsafely calls RegCert._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (stakeCredential: CML.Credential, deposit: bigint): CML.RegCert =>
  Effect.runSync(_new(stakeCredential, deposit));

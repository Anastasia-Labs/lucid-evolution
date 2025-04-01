/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML UnregCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type UnregCert = CML.UnregCert;

/**
 * Error class for UnregCert operations
 * 
 * This error is thrown when operations on UnregCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class UnregCertError extends Data.TaggedError("UnregCertError")<{
  message?: string;
}> {}

/**
 * Method free of UnregCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.UnregCert) => Effect.Effect<void, UnregCertError> = Effect.fn(
  (instance: CML.UnregCert) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.UnregCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of UnregCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.UnregCert) => Effect.Effect<Uint8Array, UnregCertError> = Effect.fn(
  (instance: CML.UnregCert) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toCborBytes failed UnregCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.UnregCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of UnregCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.UnregCert) => Effect.Effect<Uint8Array, UnregCertError> = Effect.fn(
  (instance: CML.UnregCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toCanonicalCborBytes failed UnregCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.UnregCert): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of UnregCert
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.UnregCert, UnregCertError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.UnregCert.from_cbor_bytes(cborBytes),
    catch: () => new UnregCertError({
      message: `UnregCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls UnregCert.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.UnregCert =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of UnregCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.UnregCert) => Effect.Effect<string, UnregCertError> = Effect.fn(
  (instance: CML.UnregCert) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toCborHex failed UnregCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.UnregCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of UnregCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.UnregCert) => Effect.Effect<string, UnregCertError> = Effect.fn(
  (instance: CML.UnregCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toCanonicalCborHex failed UnregCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.UnregCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of UnregCert
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.UnregCert, UnregCertError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.UnregCert.from_cbor_hex(cborBytes),
    catch: () => new UnregCertError({
      message: `UnregCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls UnregCert.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.UnregCert =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of UnregCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.UnregCert) => Effect.Effect<string, UnregCertError> = Effect.fn(
  (instance: CML.UnregCert) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toJson failed UnregCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.UnregCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of UnregCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.UnregCert) => Effect.Effect<any, UnregCertError> = Effect.fn(
  (instance: CML.UnregCert) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toJsValue failed UnregCert is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.UnregCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of UnregCert
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.UnregCert, UnregCertError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.UnregCert.from_json(json),
    catch: () => new UnregCertError({
      message: `UnregCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls UnregCert.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.UnregCert =>
  Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of UnregCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential: (instance: CML.UnregCert) => Effect.Effect<CML.Credential, UnregCertError> = Effect.fn(
  (instance: CML.UnregCert) =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.stakeCredential failed `,
        }),
    })
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeCredentialUnsafe = (instance: CML.UnregCert): CML.Credential =>
  Effect.runSync(stakeCredential(instance));

/**
 * Method deposit of UnregCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const deposit: (instance: CML.UnregCert) => Effect.Effect<bigint, UnregCertError> = Effect.fn(
  (instance: CML.UnregCert) =>
    Effect.try({
      try: () => instance.deposit(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.deposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.deposit without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const depositUnsafe = (instance: CML.UnregCert): bigint =>
  Effect.runSync(deposit(instance));

/**
 * Static method _new of UnregCert
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (stakeCredential: CML.Credential, deposit: bigint) => Effect.Effect<CML.UnregCert, UnregCertError> = Effect.fn(function* (stakeCredential: CML.Credential, deposit: bigint) {
  return yield* Effect.try({
    try: () => CML.UnregCert.new(stakeCredential, deposit),
    catch: () => new UnregCertError({
      message: `UnregCert._new failed with parameters: ${stakeCredential} (Credential), ${deposit}. `,
    }),
  });
});

/**
 * Unsafely calls UnregCert._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (stakeCredential: CML.Credential, deposit: bigint): CML.UnregCert =>
  Effect.runSync(_new(stakeCredential, deposit));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML StakeRegDelegCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type StakeRegDelegCert = CML.StakeRegDelegCert;

/**
 * Error class for StakeRegDelegCert operations
 * 
 * This error is thrown when operations on StakeRegDelegCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class StakeRegDelegCertError extends Data.TaggedError("StakeRegDelegCertError")<{
  message?: string;
}> {}

/**
 * Method free of StakeRegDelegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.StakeRegDelegCert) => Effect.Effect<void, StakeRegDelegCertError> = Effect.fn(
  (instance: CML.StakeRegDelegCert) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new StakeRegDelegCertError({
          message: `StakeRegDelegCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.StakeRegDelegCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of StakeRegDelegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.StakeRegDelegCert) => Effect.Effect<Uint8Array, StakeRegDelegCertError> = Effect.fn(
  (instance: CML.StakeRegDelegCert) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new StakeRegDelegCertError({
          message: `StakeRegDelegCert.toCborBytes failed StakeRegDelegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.StakeRegDelegCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of StakeRegDelegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.StakeRegDelegCert) => Effect.Effect<Uint8Array, StakeRegDelegCertError> = Effect.fn(
  (instance: CML.StakeRegDelegCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new StakeRegDelegCertError({
          message: `StakeRegDelegCert.toCanonicalCborBytes failed StakeRegDelegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.StakeRegDelegCert): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of StakeRegDelegCert
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.StakeRegDelegCert, StakeRegDelegCertError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.StakeRegDelegCert.from_cbor_bytes(cborBytes),
    catch: () => new StakeRegDelegCertError({
      message: `StakeRegDelegCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls StakeRegDelegCert.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.StakeRegDelegCert =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of StakeRegDelegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.StakeRegDelegCert) => Effect.Effect<string, StakeRegDelegCertError> = Effect.fn(
  (instance: CML.StakeRegDelegCert) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new StakeRegDelegCertError({
          message: `StakeRegDelegCert.toCborHex failed StakeRegDelegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.StakeRegDelegCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of StakeRegDelegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.StakeRegDelegCert) => Effect.Effect<string, StakeRegDelegCertError> = Effect.fn(
  (instance: CML.StakeRegDelegCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new StakeRegDelegCertError({
          message: `StakeRegDelegCert.toCanonicalCborHex failed StakeRegDelegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.StakeRegDelegCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of StakeRegDelegCert
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.StakeRegDelegCert, StakeRegDelegCertError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.StakeRegDelegCert.from_cbor_hex(cborBytes),
    catch: () => new StakeRegDelegCertError({
      message: `StakeRegDelegCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls StakeRegDelegCert.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.StakeRegDelegCert =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of StakeRegDelegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.StakeRegDelegCert) => Effect.Effect<string, StakeRegDelegCertError> = Effect.fn(
  (instance: CML.StakeRegDelegCert) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new StakeRegDelegCertError({
          message: `StakeRegDelegCert.toJson failed StakeRegDelegCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.StakeRegDelegCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of StakeRegDelegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.StakeRegDelegCert) => Effect.Effect<any, StakeRegDelegCertError> = Effect.fn(
  (instance: CML.StakeRegDelegCert) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new StakeRegDelegCertError({
          message: `StakeRegDelegCert.toJsValue failed StakeRegDelegCert is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.StakeRegDelegCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of StakeRegDelegCert
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.StakeRegDelegCert, StakeRegDelegCertError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.StakeRegDelegCert.from_json(json),
    catch: () => new StakeRegDelegCertError({
      message: `StakeRegDelegCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls StakeRegDelegCert.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.StakeRegDelegCert =>
  Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of StakeRegDelegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential: (instance: CML.StakeRegDelegCert) => Effect.Effect<CML.Credential, StakeRegDelegCertError> = Effect.fn(
  (instance: CML.StakeRegDelegCert) =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new StakeRegDelegCertError({
          message: `StakeRegDelegCert.stakeCredential failed `,
        }),
    })
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeCredentialUnsafe = (instance: CML.StakeRegDelegCert): CML.Credential =>
  Effect.runSync(stakeCredential(instance));

/**
 * Method pool of StakeRegDelegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const pool: (instance: CML.StakeRegDelegCert) => Effect.Effect<CML.Ed25519KeyHash, StakeRegDelegCertError> = Effect.fn(
  (instance: CML.StakeRegDelegCert) =>
    Effect.try({
      try: () => instance.pool(),
      catch: () =>
        new StakeRegDelegCertError({
          message: `StakeRegDelegCert.pool failed `,
        }),
    })
);

/**
 * Unsafely calls instance.pool without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolUnsafe = (instance: CML.StakeRegDelegCert): CML.Ed25519KeyHash =>
  Effect.runSync(pool(instance));

/**
 * Method deposit of StakeRegDelegCert
 * 
 * @since 2.0.0
 * @category Methods
 */
export const deposit: (instance: CML.StakeRegDelegCert) => Effect.Effect<bigint, StakeRegDelegCertError> = Effect.fn(
  (instance: CML.StakeRegDelegCert) =>
    Effect.try({
      try: () => instance.deposit(),
      catch: () =>
        new StakeRegDelegCertError({
          message: `StakeRegDelegCert.deposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.deposit without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const depositUnsafe = (instance: CML.StakeRegDelegCert): bigint =>
  Effect.runSync(deposit(instance));

/**
 * Static method _new of StakeRegDelegCert
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash, deposit: bigint) => Effect.Effect<CML.StakeRegDelegCert, StakeRegDelegCertError> = Effect.fn(function* (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash, deposit: bigint) {
  return yield* Effect.try({
    try: () => CML.StakeRegDelegCert.new(stakeCredential, pool, deposit),
    catch: () => new StakeRegDelegCertError({
      message: `StakeRegDelegCert._new failed with parameters: ${stakeCredential} (Credential), ${pool} (Ed25519KeyHash), ${deposit}. `,
    }),
  });
});

/**
 * Unsafely calls StakeRegDelegCert._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash, deposit: bigint): CML.StakeRegDelegCert =>
  Effect.runSync(_new(stakeCredential, pool, deposit));

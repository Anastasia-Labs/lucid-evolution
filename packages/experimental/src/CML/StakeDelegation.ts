/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML StakeDelegation class
 *
 * @since 2.0.0
 * @category Types
 */
export type StakeDelegation = CML.StakeDelegation;

/**
 * Error class for StakeDelegation operations
 * 
 * This error is thrown when operations on StakeDelegation instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class StakeDelegationError extends Data.TaggedError("StakeDelegationError")<{
  message?: string;
}> {}

/**
 * Method free of StakeDelegation
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.StakeDelegation) => Effect.Effect<void, StakeDelegationError> = Effect.fn(
  (instance: CML.StakeDelegation) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new StakeDelegationError({
          message: `StakeDelegation.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.StakeDelegation): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of StakeDelegation
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.StakeDelegation) => Effect.Effect<Uint8Array, StakeDelegationError> = Effect.fn(
  (instance: CML.StakeDelegation) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new StakeDelegationError({
          message: `StakeDelegation.toCborBytes failed StakeDelegation is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.StakeDelegation): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of StakeDelegation
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.StakeDelegation) => Effect.Effect<Uint8Array, StakeDelegationError> = Effect.fn(
  (instance: CML.StakeDelegation) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new StakeDelegationError({
          message: `StakeDelegation.toCanonicalCborBytes failed StakeDelegation is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.StakeDelegation): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of StakeDelegation
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.StakeDelegation, StakeDelegationError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.StakeDelegation.from_cbor_bytes(cborBytes),
    catch: () => new StakeDelegationError({
      message: `StakeDelegation.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls StakeDelegation.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.StakeDelegation =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of StakeDelegation
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.StakeDelegation) => Effect.Effect<string, StakeDelegationError> = Effect.fn(
  (instance: CML.StakeDelegation) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new StakeDelegationError({
          message: `StakeDelegation.toCborHex failed StakeDelegation is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.StakeDelegation): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of StakeDelegation
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.StakeDelegation) => Effect.Effect<string, StakeDelegationError> = Effect.fn(
  (instance: CML.StakeDelegation) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new StakeDelegationError({
          message: `StakeDelegation.toCanonicalCborHex failed StakeDelegation is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.StakeDelegation): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of StakeDelegation
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.StakeDelegation, StakeDelegationError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.StakeDelegation.from_cbor_hex(cborBytes),
    catch: () => new StakeDelegationError({
      message: `StakeDelegation.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls StakeDelegation.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.StakeDelegation =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of StakeDelegation
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.StakeDelegation) => Effect.Effect<string, StakeDelegationError> = Effect.fn(
  (instance: CML.StakeDelegation) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new StakeDelegationError({
          message: `StakeDelegation.toJson failed StakeDelegation is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.StakeDelegation): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of StakeDelegation
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.StakeDelegation) => Effect.Effect<any, StakeDelegationError> = Effect.fn(
  (instance: CML.StakeDelegation) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new StakeDelegationError({
          message: `StakeDelegation.toJsValue failed StakeDelegation is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.StakeDelegation): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of StakeDelegation
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.StakeDelegation, StakeDelegationError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.StakeDelegation.from_json(json),
    catch: () => new StakeDelegationError({
      message: `StakeDelegation.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls StakeDelegation.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.StakeDelegation =>
  Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of StakeDelegation
 * 
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential: (instance: CML.StakeDelegation) => Effect.Effect<CML.Credential, StakeDelegationError> = Effect.fn(
  (instance: CML.StakeDelegation) =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new StakeDelegationError({
          message: `StakeDelegation.stakeCredential failed `,
        }),
    })
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeCredentialUnsafe = (instance: CML.StakeDelegation): CML.Credential =>
  Effect.runSync(stakeCredential(instance));

/**
 * Method pool of StakeDelegation
 * 
 * @since 2.0.0
 * @category Methods
 */
export const pool: (instance: CML.StakeDelegation) => Effect.Effect<CML.Ed25519KeyHash, StakeDelegationError> = Effect.fn(
  (instance: CML.StakeDelegation) =>
    Effect.try({
      try: () => instance.pool(),
      catch: () =>
        new StakeDelegationError({
          message: `StakeDelegation.pool failed `,
        }),
    })
);

/**
 * Unsafely calls instance.pool without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolUnsafe = (instance: CML.StakeDelegation): CML.Ed25519KeyHash =>
  Effect.runSync(pool(instance));

/**
 * Static method _new of StakeDelegation
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash) => Effect.Effect<CML.StakeDelegation, StakeDelegationError> = Effect.fn(function* (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash) {
  return yield* Effect.try({
    try: () => CML.StakeDelegation.new(stakeCredential, pool),
    catch: () => new StakeDelegationError({
      message: `StakeDelegation._new failed with parameters: ${stakeCredential} (Credential), ${pool} (Ed25519KeyHash). `,
    }),
  });
});

/**
 * Unsafely calls StakeDelegation._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash): CML.StakeDelegation =>
  Effect.runSync(_new(stakeCredential, pool));

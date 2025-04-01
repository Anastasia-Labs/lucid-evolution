/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PoolRetirement class
 *
 * @since 2.0.0
 * @category Types
 */
export type PoolRetirement = CML.PoolRetirement;

/**
 * Error class for PoolRetirement operations
 * 
 * This error is thrown when operations on PoolRetirement instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PoolRetirementError extends Data.TaggedError("PoolRetirementError")<{
  message?: string;
}> {}

/**
 * Method free of PoolRetirement
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.PoolRetirement) => Effect.Effect<void, PoolRetirementError> = Effect.fn(
  (instance: CML.PoolRetirement) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PoolRetirementError({
          message: `PoolRetirement.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PoolRetirement): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of PoolRetirement
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.PoolRetirement) => Effect.Effect<Uint8Array, PoolRetirementError> = Effect.fn(
  (instance: CML.PoolRetirement) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new PoolRetirementError({
          message: `PoolRetirement.toCborBytes failed PoolRetirement is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.PoolRetirement): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PoolRetirement
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.PoolRetirement) => Effect.Effect<Uint8Array, PoolRetirementError> = Effect.fn(
  (instance: CML.PoolRetirement) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new PoolRetirementError({
          message: `PoolRetirement.toCanonicalCborBytes failed PoolRetirement is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.PoolRetirement): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PoolRetirement
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.PoolRetirement, PoolRetirementError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PoolRetirement.from_cbor_bytes(cborBytes),
    catch: () => new PoolRetirementError({
      message: `PoolRetirement.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls PoolRetirement.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.PoolRetirement =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PoolRetirement
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.PoolRetirement) => Effect.Effect<string, PoolRetirementError> = Effect.fn(
  (instance: CML.PoolRetirement) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new PoolRetirementError({
          message: `PoolRetirement.toCborHex failed PoolRetirement is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.PoolRetirement): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PoolRetirement
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.PoolRetirement) => Effect.Effect<string, PoolRetirementError> = Effect.fn(
  (instance: CML.PoolRetirement) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new PoolRetirementError({
          message: `PoolRetirement.toCanonicalCborHex failed PoolRetirement is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.PoolRetirement): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PoolRetirement
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.PoolRetirement, PoolRetirementError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.PoolRetirement.from_cbor_hex(cborBytes),
    catch: () => new PoolRetirementError({
      message: `PoolRetirement.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls PoolRetirement.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.PoolRetirement =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of PoolRetirement
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.PoolRetirement) => Effect.Effect<string, PoolRetirementError> = Effect.fn(
  (instance: CML.PoolRetirement) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new PoolRetirementError({
          message: `PoolRetirement.toJson failed PoolRetirement is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.PoolRetirement): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of PoolRetirement
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.PoolRetirement) => Effect.Effect<any, PoolRetirementError> = Effect.fn(
  (instance: CML.PoolRetirement) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new PoolRetirementError({
          message: `PoolRetirement.toJsValue failed PoolRetirement is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.PoolRetirement): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of PoolRetirement
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.PoolRetirement, PoolRetirementError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.PoolRetirement.from_json(json),
    catch: () => new PoolRetirementError({
      message: `PoolRetirement.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls PoolRetirement.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.PoolRetirement =>
  Effect.runSync(fromJson(json));

/**
 * Method pool of PoolRetirement
 * 
 * @since 2.0.0
 * @category Methods
 */
export const pool: (instance: CML.PoolRetirement) => Effect.Effect<CML.Ed25519KeyHash, PoolRetirementError> = Effect.fn(
  (instance: CML.PoolRetirement) =>
    Effect.try({
      try: () => instance.pool(),
      catch: () =>
        new PoolRetirementError({
          message: `PoolRetirement.pool failed `,
        }),
    })
);

/**
 * Unsafely calls instance.pool without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolUnsafe = (instance: CML.PoolRetirement): CML.Ed25519KeyHash =>
  Effect.runSync(pool(instance));

/**
 * Method epoch of PoolRetirement
 * 
 * @since 2.0.0
 * @category Methods
 */
export const epoch: (instance: CML.PoolRetirement) => Effect.Effect<bigint, PoolRetirementError> = Effect.fn(
  (instance: CML.PoolRetirement) =>
    Effect.try({
      try: () => instance.epoch(),
      catch: () =>
        new PoolRetirementError({
          message: `PoolRetirement.epoch failed `,
        }),
    })
);

/**
 * Unsafely calls instance.epoch without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const epochUnsafe = (instance: CML.PoolRetirement): bigint =>
  Effect.runSync(epoch(instance));

/**
 * Static method _new of PoolRetirement
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (pool: CML.Ed25519KeyHash, epoch: bigint) => Effect.Effect<CML.PoolRetirement, PoolRetirementError> = Effect.fn(function* (pool: CML.Ed25519KeyHash, epoch: bigint) {
  return yield* Effect.try({
    try: () => CML.PoolRetirement.new(pool, epoch),
    catch: () => new PoolRetirementError({
      message: `PoolRetirement._new failed with parameters: ${pool} (Ed25519KeyHash), ${epoch}. `,
    }),
  });
});

/**
 * Unsafely calls PoolRetirement._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (pool: CML.Ed25519KeyHash, epoch: bigint): CML.PoolRetirement =>
  Effect.runSync(_new(pool, epoch));

import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type PoolRetirement = CML.PoolRetirement;

export class PoolRetirementError extends Data.TaggedError("PoolRetirementError")<{
  message?: string;
}> {}

/**
 * Method free of PoolRetirement
 * 
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 *   const result = yield* PoolRetirement.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PoolRetirement): Effect.Effect<void, PoolRetirementError> =>
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
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRetirement.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRetirement.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.PoolRetirement): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of PoolRetirement
 * 
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 *   const result = yield* PoolRetirement.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.PoolRetirement): Effect.Effect<Uint8Array, PoolRetirementError> =>
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
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRetirement.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRetirement.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.PoolRetirement): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PoolRetirement
 * 
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 *   const result = yield* PoolRetirement.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.PoolRetirement): Effect.Effect<Uint8Array, PoolRetirementError> =>
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
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRetirement.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRetirement.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.PoolRetirement): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PoolRetirement
 * 
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PoolRetirement.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
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
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRetirement.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRetirement.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PoolRetirement
 * 
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 *   const result = yield* PoolRetirement.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.PoolRetirement): Effect.Effect<string, PoolRetirementError> =>
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
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRetirement.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRetirement.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.PoolRetirement): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PoolRetirement
 * 
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 *   const result = yield* PoolRetirement.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.PoolRetirement): Effect.Effect<string, PoolRetirementError> =>
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
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRetirement.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRetirement.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.PoolRetirement): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PoolRetirement
 * 
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PoolRetirement.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
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
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRetirement.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRetirement.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of PoolRetirement
 * 
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 *   const result = yield* PoolRetirement.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.PoolRetirement): Effect.Effect<string, PoolRetirementError> =>
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
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRetirement.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRetirement.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.PoolRetirement): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of PoolRetirement
 * 
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 *   const result = yield* PoolRetirement.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.PoolRetirement): Effect.Effect<any, PoolRetirementError> =>
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
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRetirement.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRetirement.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.PoolRetirement): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of PoolRetirement
 * 
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PoolRetirement.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
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
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRetirement.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRetirement.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method pool of PoolRetirement
 * 
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 *   const result = yield* PoolRetirement.pool(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const pool = Effect.fn(
  (instance: CML.PoolRetirement): Effect.Effect<CML.Ed25519KeyHash, PoolRetirementError> =>
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
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRetirement.unsafePool(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRetirement.unsafePool failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePool = (instance: CML.PoolRetirement): CML.Ed25519KeyHash =>
  Effect.runSync(pool(instance));

/**
 * Method epoch of PoolRetirement
 * 
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 *   const result = yield* PoolRetirement.epoch(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const epoch = Effect.fn(
  (instance: CML.PoolRetirement): Effect.Effect<bigint, PoolRetirementError> =>
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
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolRetirement instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRetirement.unsafeEpoch(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRetirement.unsafeEpoch failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeEpoch = (instance: CML.PoolRetirement): bigint =>
  Effect.runSync(epoch(instance));

/**
 * Static method _new of PoolRetirement
 * 
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PoolRetirement._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (pool: CML.Ed25519KeyHash, epoch: bigint) {
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
 * @example
 * import { PoolRetirement } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolRetirement.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolRetirement.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (pool: CML.Ed25519KeyHash, epoch: bigint) =>
  Effect.runSync(_new(pool, epoch));

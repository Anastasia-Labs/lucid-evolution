import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type StakeDelegation = CML.StakeDelegation;

export class StakeDelegationError extends Data.TaggedError("StakeDelegationError")<{
  message?: string;
}> {}

/**
 * Method free of StakeDelegation
 * 
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 *   const result = yield* StakeDelegation.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.StakeDelegation): Effect.Effect<void, StakeDelegationError> =>
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
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDelegation.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDelegation.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.StakeDelegation): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of StakeDelegation
 * 
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 *   const result = yield* StakeDelegation.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.StakeDelegation): Effect.Effect<Uint8Array, StakeDelegationError> =>
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
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDelegation.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDelegation.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.StakeDelegation): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of StakeDelegation
 * 
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 *   const result = yield* StakeDelegation.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.StakeDelegation): Effect.Effect<Uint8Array, StakeDelegationError> =>
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
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDelegation.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDelegation.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.StakeDelegation): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of StakeDelegation
 * 
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeDelegation.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
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
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDelegation.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDelegation.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of StakeDelegation
 * 
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 *   const result = yield* StakeDelegation.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.StakeDelegation): Effect.Effect<string, StakeDelegationError> =>
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
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDelegation.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDelegation.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.StakeDelegation): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of StakeDelegation
 * 
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 *   const result = yield* StakeDelegation.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.StakeDelegation): Effect.Effect<string, StakeDelegationError> =>
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
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDelegation.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDelegation.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.StakeDelegation): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of StakeDelegation
 * 
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeDelegation.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
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
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDelegation.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDelegation.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of StakeDelegation
 * 
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 *   const result = yield* StakeDelegation.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.StakeDelegation): Effect.Effect<string, StakeDelegationError> =>
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
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDelegation.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDelegation.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.StakeDelegation): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of StakeDelegation
 * 
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 *   const result = yield* StakeDelegation.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.StakeDelegation): Effect.Effect<any, StakeDelegationError> =>
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
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDelegation.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDelegation.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.StakeDelegation): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of StakeDelegation
 * 
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeDelegation.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
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
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDelegation.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDelegation.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of StakeDelegation
 * 
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 *   const result = yield* StakeDelegation.stakeCredential(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential = Effect.fn(
  (instance: CML.StakeDelegation): Effect.Effect<CML.Credential, StakeDelegationError> =>
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
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDelegation.unsafeStakeCredential(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDelegation.unsafeStakeCredential failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeStakeCredential = (instance: CML.StakeDelegation): CML.Credential =>
  Effect.runSync(stakeCredential(instance));

/**
 * Method pool of StakeDelegation
 * 
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 *   const result = yield* StakeDelegation.pool(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const pool = Effect.fn(
  (instance: CML.StakeDelegation): Effect.Effect<CML.Ed25519KeyHash, StakeDelegationError> =>
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
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeDelegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDelegation.unsafePool(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDelegation.unsafePool failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePool = (instance: CML.StakeDelegation): CML.Ed25519KeyHash =>
  Effect.runSync(pool(instance));

/**
 * Static method _new of StakeDelegation
 * 
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeDelegation._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash) {
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
 * @example
 * import { StakeDelegation } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDelegation.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDelegation.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (stakeCredential: CML.Credential, pool: CML.Ed25519KeyHash) =>
  Effect.runSync(_new(stakeCredential, pool));

import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type CIP36Delegation = CML.CIP36Delegation;

export class CIP36DelegationError extends Data.TaggedError("CIP36DelegationError")<{
  message?: string;
}> {}

/**
 * Method free of CIP36Delegation
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 *   const result = yield* CIP36Delegation.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.CIP36Delegation): Effect.Effect<void, CIP36DelegationError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP36DelegationError({
          message: `CIP36Delegation.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36Delegation.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36Delegation.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.CIP36Delegation): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP36Delegation
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 *   const result = yield* CIP36Delegation.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.CIP36Delegation): Effect.Effect<Uint8Array, CIP36DelegationError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP36DelegationError({
          message: `CIP36Delegation.toCborBytes failed CIP36Delegation is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36Delegation.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36Delegation.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.CIP36Delegation): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of CIP36Delegation
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 *   const result = yield* CIP36Delegation.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.CIP36Delegation): Effect.Effect<Uint8Array, CIP36DelegationError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new CIP36DelegationError({
          message: `CIP36Delegation.toCanonicalCborBytes failed CIP36Delegation is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36Delegation.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36Delegation.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.CIP36Delegation): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of CIP36Delegation
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP36Delegation.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.CIP36Delegation.from_cbor_bytes(cborBytes),
    catch: () => new CIP36DelegationError({
      message: `CIP36Delegation.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls CIP36Delegation.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36Delegation.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36Delegation.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP36Delegation
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 *   const result = yield* CIP36Delegation.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.CIP36Delegation): Effect.Effect<string, CIP36DelegationError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CIP36DelegationError({
          message: `CIP36Delegation.toCborHex failed CIP36Delegation is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36Delegation.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36Delegation.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.CIP36Delegation): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of CIP36Delegation
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 *   const result = yield* CIP36Delegation.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.CIP36Delegation): Effect.Effect<string, CIP36DelegationError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new CIP36DelegationError({
          message: `CIP36Delegation.toCanonicalCborHex failed CIP36Delegation is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36Delegation.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36Delegation.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.CIP36Delegation): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of CIP36Delegation
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP36Delegation.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.CIP36Delegation.from_cbor_hex(cborBytes),
    catch: () => new CIP36DelegationError({
      message: `CIP36Delegation.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls CIP36Delegation.fromCborHex without Effect wrapper
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36Delegation.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36Delegation.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP36Delegation
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 *   const result = yield* CIP36Delegation.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.CIP36Delegation): Effect.Effect<string, CIP36DelegationError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP36DelegationError({
          message: `CIP36Delegation.toJson failed CIP36Delegation is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36Delegation.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36Delegation.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.CIP36Delegation): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP36Delegation
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 *   const result = yield* CIP36Delegation.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.CIP36Delegation): Effect.Effect<any, CIP36DelegationError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP36DelegationError({
          message: `CIP36Delegation.toJsValue failed CIP36Delegation is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36Delegation.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36Delegation.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.CIP36Delegation): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP36Delegation
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP36Delegation.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP36Delegation.from_json(json),
    catch: () => new CIP36DelegationError({
      message: `CIP36Delegation.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls CIP36Delegation.fromJson without Effect wrapper
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36Delegation.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36Delegation.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method votingPubKey of CIP36Delegation
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 *   const result = yield* CIP36Delegation.votingPubKey(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const votingPubKey = Effect.fn(
  (instance: CML.CIP36Delegation): Effect.Effect<CML.PublicKey, CIP36DelegationError> =>
    Effect.try({
      try: () => instance.voting_pub_key(),
      catch: () =>
        new CIP36DelegationError({
          message: `CIP36Delegation.votingPubKey failed `,
        }),
    })
);

/**
 * Unsafely calls instance.votingPubKey without Effect wrapper
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36Delegation.unsafeVotingPubKey(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36Delegation.unsafeVotingPubKey failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeVotingPubKey = (instance: CML.CIP36Delegation): CML.PublicKey =>
  Effect.runSync(votingPubKey(instance));

/**
 * Method weight of CIP36Delegation
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 *   const result = yield* CIP36Delegation.weight(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const weight = Effect.fn(
  (instance: CML.CIP36Delegation): Effect.Effect<number, CIP36DelegationError> =>
    Effect.try({
      try: () => instance.weight(),
      catch: () =>
        new CIP36DelegationError({
          message: `CIP36Delegation.weight failed `,
        }),
    })
);

/**
 * Unsafely calls instance.weight without Effect wrapper
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36Delegation instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36Delegation.unsafeWeight(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36Delegation.unsafeWeight failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeWeight = (instance: CML.CIP36Delegation): number =>
  Effect.runSync(weight(instance));

/**
 * Static method _new of CIP36Delegation
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP36Delegation._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (votingPubKey: CML.PublicKey, weight: number) {
  return yield* Effect.try({
    try: () => CML.CIP36Delegation.new(votingPubKey, weight),
    catch: () => new CIP36DelegationError({
      message: `CIP36Delegation._new failed with parameters: ${votingPubKey} (PublicKey), ${weight}. `,
    }),
  });
});

/**
 * Unsafely calls CIP36Delegation._new without Effect wrapper
 * 
 * @example
 * import { CIP36Delegation } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36Delegation.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36Delegation.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (votingPubKey: CML.PublicKey, weight: number) =>
  Effect.runSync(_new(votingPubKey, weight));

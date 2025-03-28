import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type CIP36KeyRegistration = CML.CIP36KeyRegistration;

export class CIP36KeyRegistrationError extends Data.TaggedError("CIP36KeyRegistrationError")<{
  message?: string;
}> {}

/**
 * Method free of CIP36KeyRegistration
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyRegistration.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.CIP36KeyRegistration): Effect.Effect<void, CIP36KeyRegistrationError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP36KeyRegistrationError({
          message: `CIP36KeyRegistration.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyRegistration.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyRegistration.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.CIP36KeyRegistration): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP36KeyRegistration
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyRegistration.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.CIP36KeyRegistration): Effect.Effect<Uint8Array, CIP36KeyRegistrationError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP36KeyRegistrationError({
          message: `CIP36KeyRegistration.toCborBytes failed CIP36KeyRegistration is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyRegistration.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyRegistration.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.CIP36KeyRegistration): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of CIP36KeyRegistration
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyRegistration.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.CIP36KeyRegistration): Effect.Effect<Uint8Array, CIP36KeyRegistrationError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new CIP36KeyRegistrationError({
          message: `CIP36KeyRegistration.toCanonicalCborBytes failed CIP36KeyRegistration is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyRegistration.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyRegistration.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.CIP36KeyRegistration): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of CIP36KeyRegistration
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP36KeyRegistration.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.CIP36KeyRegistration.from_cbor_bytes(cborBytes),
    catch: () => new CIP36KeyRegistrationError({
      message: `CIP36KeyRegistration.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls CIP36KeyRegistration.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyRegistration.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyRegistration.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP36KeyRegistration
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyRegistration.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.CIP36KeyRegistration): Effect.Effect<string, CIP36KeyRegistrationError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CIP36KeyRegistrationError({
          message: `CIP36KeyRegistration.toCborHex failed CIP36KeyRegistration is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyRegistration.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyRegistration.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.CIP36KeyRegistration): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of CIP36KeyRegistration
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyRegistration.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.CIP36KeyRegistration): Effect.Effect<string, CIP36KeyRegistrationError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new CIP36KeyRegistrationError({
          message: `CIP36KeyRegistration.toCanonicalCborHex failed CIP36KeyRegistration is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyRegistration.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyRegistration.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.CIP36KeyRegistration): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of CIP36KeyRegistration
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP36KeyRegistration.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.CIP36KeyRegistration.from_cbor_hex(cborBytes),
    catch: () => new CIP36KeyRegistrationError({
      message: `CIP36KeyRegistration.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls CIP36KeyRegistration.fromCborHex without Effect wrapper
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyRegistration.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyRegistration.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP36KeyRegistration
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyRegistration.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.CIP36KeyRegistration): Effect.Effect<string, CIP36KeyRegistrationError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP36KeyRegistrationError({
          message: `CIP36KeyRegistration.toJson failed CIP36KeyRegistration is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyRegistration.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyRegistration.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.CIP36KeyRegistration): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP36KeyRegistration
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyRegistration.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.CIP36KeyRegistration): Effect.Effect<any, CIP36KeyRegistrationError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP36KeyRegistrationError({
          message: `CIP36KeyRegistration.toJsValue failed CIP36KeyRegistration is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyRegistration.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyRegistration.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.CIP36KeyRegistration): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP36KeyRegistration
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP36KeyRegistration.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP36KeyRegistration.from_json(json),
    catch: () => new CIP36KeyRegistrationError({
      message: `CIP36KeyRegistration.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls CIP36KeyRegistration.fromJson without Effect wrapper
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyRegistration.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyRegistration.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method delegation of CIP36KeyRegistration
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyRegistration.delegation(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const delegation = Effect.fn(
  (instance: CML.CIP36KeyRegistration): Effect.Effect<CML.CIP36DelegationDistribution, CIP36KeyRegistrationError> =>
    Effect.try({
      try: () => instance.delegation(),
      catch: () =>
        new CIP36KeyRegistrationError({
          message: `CIP36KeyRegistration.delegation failed `,
        }),
    })
);

/**
 * Unsafely calls instance.delegation without Effect wrapper
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyRegistration.unsafeDelegation(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyRegistration.unsafeDelegation failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDelegation = (instance: CML.CIP36KeyRegistration): CML.CIP36DelegationDistribution =>
  Effect.runSync(delegation(instance));

/**
 * Method stakeCredential of CIP36KeyRegistration
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyRegistration.stakeCredential(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential = Effect.fn(
  (instance: CML.CIP36KeyRegistration): Effect.Effect<CML.PublicKey, CIP36KeyRegistrationError> =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new CIP36KeyRegistrationError({
          message: `CIP36KeyRegistration.stakeCredential failed `,
        }),
    })
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyRegistration.unsafeStakeCredential(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyRegistration.unsafeStakeCredential failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeStakeCredential = (instance: CML.CIP36KeyRegistration): CML.PublicKey =>
  Effect.runSync(stakeCredential(instance));

/**
 * Method paymentAddress of CIP36KeyRegistration
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyRegistration.paymentAddress(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const paymentAddress = Effect.fn(
  (instance: CML.CIP36KeyRegistration): Effect.Effect<CML.Address, CIP36KeyRegistrationError> =>
    Effect.try({
      try: () => instance.payment_address(),
      catch: () =>
        new CIP36KeyRegistrationError({
          message: `CIP36KeyRegistration.paymentAddress failed `,
        }),
    })
);

/**
 * Unsafely calls instance.paymentAddress without Effect wrapper
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyRegistration.unsafePaymentAddress(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyRegistration.unsafePaymentAddress failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePaymentAddress = (instance: CML.CIP36KeyRegistration): CML.Address =>
  Effect.runSync(paymentAddress(instance));

/**
 * Method nonce of CIP36KeyRegistration
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyRegistration.nonce(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const nonce = Effect.fn(
  (instance: CML.CIP36KeyRegistration): Effect.Effect<bigint, CIP36KeyRegistrationError> =>
    Effect.try({
      try: () => instance.nonce(),
      catch: () =>
        new CIP36KeyRegistrationError({
          message: `CIP36KeyRegistration.nonce failed `,
        }),
    })
);

/**
 * Unsafely calls instance.nonce without Effect wrapper
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyRegistration.unsafeNonce(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyRegistration.unsafeNonce failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeNonce = (instance: CML.CIP36KeyRegistration): bigint =>
  Effect.runSync(nonce(instance));

/**
 * Method setVotingPurpose of CIP36KeyRegistration
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyRegistration.setVotingPurpose(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setVotingPurpose = Effect.fn(
  (instance: CML.CIP36KeyRegistration, votingPurpose: bigint): Effect.Effect<void, CIP36KeyRegistrationError> =>
    Effect.try({
      try: () => instance.set_voting_purpose(votingPurpose),
      catch: () =>
        new CIP36KeyRegistrationError({
          message: `CIP36KeyRegistration.setVotingPurpose failed with parameters: ${votingPurpose}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setVotingPurpose without Effect wrapper
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyRegistration.unsafeSetVotingPurpose(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyRegistration.unsafeSetVotingPurpose failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetVotingPurpose = (instance: CML.CIP36KeyRegistration, votingPurpose: bigint): void =>
  Effect.runSync(setVotingPurpose(instance, votingPurpose));

/**
 * Method votingPurpose of CIP36KeyRegistration
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyRegistration.votingPurpose(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const votingPurpose = Effect.fn(
  (instance: CML.CIP36KeyRegistration): Effect.Effect<bigint, CIP36KeyRegistrationError> =>
    Effect.try({
      try: () => instance.voting_purpose(),
      catch: () =>
        new CIP36KeyRegistrationError({
          message: `CIP36KeyRegistration.votingPurpose failed `,
        }),
    })
);

/**
 * Unsafely calls instance.votingPurpose without Effect wrapper
 * 
 * @example
 * import { CIP36KeyRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36KeyRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyRegistration.unsafeVotingPurpose(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyRegistration.unsafeVotingPurpose failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeVotingPurpose = (instance: CML.CIP36KeyRegistration): bigint =>
  Effect.runSync(votingPurpose(instance));

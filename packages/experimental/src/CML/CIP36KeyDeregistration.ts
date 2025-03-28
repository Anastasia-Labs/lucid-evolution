import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type CIP36KeyDeregistration = CML.CIP36KeyDeregistration;

export class CIP36KeyDeregistrationError extends Data.TaggedError(
  "CIP36KeyDeregistrationError",
)<{
  message?: string;
}> {}

/**
 * Method free of CIP36KeyDeregistration
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyDeregistration.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.CIP36KeyDeregistration,
  ): Effect.Effect<void, CIP36KeyDeregistrationError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyDeregistration.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyDeregistration.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.CIP36KeyDeregistration): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP36KeyDeregistration
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyDeregistration.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.CIP36KeyDeregistration,
  ): Effect.Effect<Uint8Array, CIP36KeyDeregistrationError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.toCborBytes failed CIP36KeyDeregistration is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyDeregistration.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyDeregistration.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (
  instance: CML.CIP36KeyDeregistration,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of CIP36KeyDeregistration
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyDeregistration.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.CIP36KeyDeregistration,
  ): Effect.Effect<Uint8Array, CIP36KeyDeregistrationError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.toCanonicalCborBytes failed CIP36KeyDeregistration is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyDeregistration.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyDeregistration.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.CIP36KeyDeregistration,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of CIP36KeyDeregistration
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP36KeyDeregistration.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.CIP36KeyDeregistration.from_cbor_bytes(cborBytes),
    catch: () =>
      new CIP36KeyDeregistrationError({
        message: `CIP36KeyDeregistration.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls CIP36KeyDeregistration.fromCborBytes without Effect wrapper
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyDeregistration.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyDeregistration.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP36KeyDeregistration
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyDeregistration.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.CIP36KeyDeregistration,
  ): Effect.Effect<string, CIP36KeyDeregistrationError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.toCborHex failed CIP36KeyDeregistration is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyDeregistration.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyDeregistration.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.CIP36KeyDeregistration): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of CIP36KeyDeregistration
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyDeregistration.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.CIP36KeyDeregistration,
  ): Effect.Effect<string, CIP36KeyDeregistrationError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.toCanonicalCborHex failed CIP36KeyDeregistration is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyDeregistration.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyDeregistration.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (
  instance: CML.CIP36KeyDeregistration,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of CIP36KeyDeregistration
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP36KeyDeregistration.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.CIP36KeyDeregistration.from_cbor_hex(cborBytes),
    catch: () =>
      new CIP36KeyDeregistrationError({
        message: `CIP36KeyDeregistration.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls CIP36KeyDeregistration.fromCborHex without Effect wrapper
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyDeregistration.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyDeregistration.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP36KeyDeregistration
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyDeregistration.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.CIP36KeyDeregistration,
  ): Effect.Effect<string, CIP36KeyDeregistrationError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.toJson failed CIP36KeyDeregistration is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyDeregistration.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyDeregistration.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.CIP36KeyDeregistration): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP36KeyDeregistration
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyDeregistration.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.CIP36KeyDeregistration,
  ): Effect.Effect<any, CIP36KeyDeregistrationError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.toJsValue failed CIP36KeyDeregistration is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyDeregistration.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyDeregistration.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.CIP36KeyDeregistration): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP36KeyDeregistration
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP36KeyDeregistration.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP36KeyDeregistration.from_json(json),
    catch: () =>
      new CIP36KeyDeregistrationError({
        message: `CIP36KeyDeregistration.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls CIP36KeyDeregistration.fromJson without Effect wrapper
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyDeregistration.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyDeregistration.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of CIP36KeyDeregistration
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyDeregistration.stakeCredential(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential = Effect.fn(
  (
    instance: CML.CIP36KeyDeregistration,
  ): Effect.Effect<CML.PublicKey, CIP36KeyDeregistrationError> =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.stakeCredential failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyDeregistration.unsafeStakeCredential(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyDeregistration.unsafeStakeCredential failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeStakeCredential = (
  instance: CML.CIP36KeyDeregistration,
): CML.PublicKey => Effect.runSync(stakeCredential(instance));

/**
 * Method nonce of CIP36KeyDeregistration
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyDeregistration.nonce(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const nonce = Effect.fn(
  (
    instance: CML.CIP36KeyDeregistration,
  ): Effect.Effect<bigint, CIP36KeyDeregistrationError> =>
    Effect.try({
      try: () => instance.nonce(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.nonce failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.nonce without Effect wrapper
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyDeregistration.unsafeNonce(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyDeregistration.unsafeNonce failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeNonce = (instance: CML.CIP36KeyDeregistration): bigint =>
  Effect.runSync(nonce(instance));

/**
 * Method setVotingPurpose of CIP36KeyDeregistration
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyDeregistration.setVotingPurpose(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setVotingPurpose = Effect.fn(
  (
    instance: CML.CIP36KeyDeregistration,
    votingPurpose: bigint,
  ): Effect.Effect<void, CIP36KeyDeregistrationError> =>
    Effect.try({
      try: () => instance.set_voting_purpose(votingPurpose),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.setVotingPurpose failed with parameters: ${votingPurpose}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.setVotingPurpose without Effect wrapper
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyDeregistration.unsafeSetVotingPurpose(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyDeregistration.unsafeSetVotingPurpose failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetVotingPurpose = (
  instance: CML.CIP36KeyDeregistration,
  votingPurpose: bigint,
): void => Effect.runSync(setVotingPurpose(instance, votingPurpose));

/**
 * Method votingPurpose of CIP36KeyDeregistration
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *   const result = yield* CIP36KeyDeregistration.votingPurpose(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const votingPurpose = Effect.fn(
  (
    instance: CML.CIP36KeyDeregistration,
  ): Effect.Effect<bigint, CIP36KeyDeregistrationError> =>
    Effect.try({
      try: () => instance.voting_purpose(),
      catch: () =>
        new CIP36KeyDeregistrationError({
          message: `CIP36KeyDeregistration.votingPurpose failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.votingPurpose without Effect wrapper
 *
 * @example
 * import { CIP36KeyDeregistration } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36KeyDeregistration instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36KeyDeregistration.unsafeVotingPurpose(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36KeyDeregistration.unsafeVotingPurpose failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeVotingPurpose = (
  instance: CML.CIP36KeyDeregistration,
): bigint => Effect.runSync(votingPurpose(instance));

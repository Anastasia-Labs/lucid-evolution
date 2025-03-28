import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type DRepVotingThresholds = CML.DRepVotingThresholds;

export class DRepVotingThresholdsError extends Data.TaggedError(
  "DRepVotingThresholdsError",
)<{
  message?: string;
}> {}

/**
 * Method free of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<void, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.DRepVotingThresholds): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<Uint8Array, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.toCborBytes failed DRepVotingThresholds is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (
  instance: CML.DRepVotingThresholds,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<Uint8Array, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.toCanonicalCborBytes failed DRepVotingThresholds is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.DRepVotingThresholds,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* DRepVotingThresholds.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.DRepVotingThresholds.from_cbor_bytes(cborBytes),
    catch: () =>
      new DRepVotingThresholdsError({
        message: `DRepVotingThresholds.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls DRepVotingThresholds.fromCborBytes without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<string, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.toCborHex failed DRepVotingThresholds is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.DRepVotingThresholds): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<string, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.toCanonicalCborHex failed DRepVotingThresholds is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (
  instance: CML.DRepVotingThresholds,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* DRepVotingThresholds.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.DRepVotingThresholds.from_cbor_hex(cborBytes),
    catch: () =>
      new DRepVotingThresholdsError({
        message: `DRepVotingThresholds.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls DRepVotingThresholds.fromCborHex without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<string, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.toJson failed DRepVotingThresholds is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.DRepVotingThresholds): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<any, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.toJsValue failed DRepVotingThresholds is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.DRepVotingThresholds): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* DRepVotingThresholds.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.DRepVotingThresholds.from_json(json),
    catch: () =>
      new DRepVotingThresholdsError({
        message: `DRepVotingThresholds.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls DRepVotingThresholds.fromJson without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method motionNoConfidence of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.motionNoConfidence(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const motionNoConfidence = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.motion_no_confidence(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.motionNoConfidence failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.motionNoConfidence without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafeMotionNoConfidence(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafeMotionNoConfidence failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMotionNoConfidence = (
  instance: CML.DRepVotingThresholds,
): CML.UnitInterval => Effect.runSync(motionNoConfidence(instance));

/**
 * Method committeeNormal of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.committeeNormal(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const committeeNormal = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.committee_normal(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.committeeNormal failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.committeeNormal without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafeCommitteeNormal(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafeCommitteeNormal failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCommitteeNormal = (
  instance: CML.DRepVotingThresholds,
): CML.UnitInterval => Effect.runSync(committeeNormal(instance));

/**
 * Method committeeNoConfidence of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.committeeNoConfidence(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const committeeNoConfidence = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.committee_no_confidence(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.committeeNoConfidence failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.committeeNoConfidence without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafeCommitteeNoConfidence(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafeCommitteeNoConfidence failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCommitteeNoConfidence = (
  instance: CML.DRepVotingThresholds,
): CML.UnitInterval => Effect.runSync(committeeNoConfidence(instance));

/**
 * Method updateConstitution of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.updateConstitution(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const updateConstitution = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.update_constitution(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.updateConstitution failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.updateConstitution without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafeUpdateConstitution(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafeUpdateConstitution failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeUpdateConstitution = (
  instance: CML.DRepVotingThresholds,
): CML.UnitInterval => Effect.runSync(updateConstitution(instance));

/**
 * Method hardForkInitiation of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.hardForkInitiation(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const hardForkInitiation = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.hard_fork_initiation(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.hardForkInitiation failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.hardForkInitiation without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafeHardForkInitiation(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafeHardForkInitiation failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeHardForkInitiation = (
  instance: CML.DRepVotingThresholds,
): CML.UnitInterval => Effect.runSync(hardForkInitiation(instance));

/**
 * Method ppNetworkGroup of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.ppNetworkGroup(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const ppNetworkGroup = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.pp_network_group(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.ppNetworkGroup failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.ppNetworkGroup without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafePpNetworkGroup(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafePpNetworkGroup failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafePpNetworkGroup = (
  instance: CML.DRepVotingThresholds,
): CML.UnitInterval => Effect.runSync(ppNetworkGroup(instance));

/**
 * Method ppEconomicGroup of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.ppEconomicGroup(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const ppEconomicGroup = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.pp_economic_group(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.ppEconomicGroup failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.ppEconomicGroup without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafePpEconomicGroup(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafePpEconomicGroup failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafePpEconomicGroup = (
  instance: CML.DRepVotingThresholds,
): CML.UnitInterval => Effect.runSync(ppEconomicGroup(instance));

/**
 * Method ppTechnicalGroup of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.ppTechnicalGroup(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const ppTechnicalGroup = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.pp_technical_group(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.ppTechnicalGroup failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.ppTechnicalGroup without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafePpTechnicalGroup(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafePpTechnicalGroup failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafePpTechnicalGroup = (
  instance: CML.DRepVotingThresholds,
): CML.UnitInterval => Effect.runSync(ppTechnicalGroup(instance));

/**
 * Method ppGovernanceGroup of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.ppGovernanceGroup(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const ppGovernanceGroup = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.pp_governance_group(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.ppGovernanceGroup failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.ppGovernanceGroup without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafePpGovernanceGroup(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafePpGovernanceGroup failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafePpGovernanceGroup = (
  instance: CML.DRepVotingThresholds,
): CML.UnitInterval => Effect.runSync(ppGovernanceGroup(instance));

/**
 * Method treasuryWithdrawal of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *   const result = yield* DRepVotingThresholds.treasuryWithdrawal(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const treasuryWithdrawal = Effect.fn(
  (
    instance: CML.DRepVotingThresholds,
  ): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.treasury_withdrawal(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.treasuryWithdrawal failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.treasuryWithdrawal without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DRepVotingThresholds instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafeTreasuryWithdrawal(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafeTreasuryWithdrawal failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeTreasuryWithdrawal = (
  instance: CML.DRepVotingThresholds,
): CML.UnitInterval => Effect.runSync(treasuryWithdrawal(instance));

/**
 * Static method _new of DRepVotingThresholds
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* DRepVotingThresholds._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  motionNoConfidence: CML.UnitInterval,
  committeeNormal: CML.UnitInterval,
  committeeNoConfidence: CML.UnitInterval,
  updateConstitution: CML.UnitInterval,
  hardForkInitiation: CML.UnitInterval,
  ppNetworkGroup: CML.UnitInterval,
  ppEconomicGroup: CML.UnitInterval,
  ppTechnicalGroup: CML.UnitInterval,
  ppGovernanceGroup: CML.UnitInterval,
  treasuryWithdrawal: CML.UnitInterval,
) {
  return yield* Effect.try({
    try: () =>
      CML.DRepVotingThresholds.new(
        motionNoConfidence,
        committeeNormal,
        committeeNoConfidence,
        updateConstitution,
        hardForkInitiation,
        ppNetworkGroup,
        ppEconomicGroup,
        ppTechnicalGroup,
        ppGovernanceGroup,
        treasuryWithdrawal,
      ),
    catch: () =>
      new DRepVotingThresholdsError({
        message: `DRepVotingThresholds._new failed with parameters: ${motionNoConfidence} (UnitInterval), ${committeeNormal} (UnitInterval), ${committeeNoConfidence} (UnitInterval), ${updateConstitution} (UnitInterval), ${hardForkInitiation} (UnitInterval), ${ppNetworkGroup} (UnitInterval), ${ppEconomicGroup} (UnitInterval), ${ppTechnicalGroup} (UnitInterval), ${ppGovernanceGroup} (UnitInterval), ${treasuryWithdrawal} (UnitInterval). `,
      }),
  });
});

/**
 * Unsafely calls DRepVotingThresholds._new without Effect wrapper
 *
 * @example
 * import { DRepVotingThresholds } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DRepVotingThresholds.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (
  motionNoConfidence: CML.UnitInterval,
  committeeNormal: CML.UnitInterval,
  committeeNoConfidence: CML.UnitInterval,
  updateConstitution: CML.UnitInterval,
  hardForkInitiation: CML.UnitInterval,
  ppNetworkGroup: CML.UnitInterval,
  ppEconomicGroup: CML.UnitInterval,
  ppTechnicalGroup: CML.UnitInterval,
  ppGovernanceGroup: CML.UnitInterval,
  treasuryWithdrawal: CML.UnitInterval,
) =>
  Effect.runSync(
    _new(
      motionNoConfidence,
      committeeNormal,
      committeeNoConfidence,
      updateConstitution,
      hardForkInitiation,
      ppNetworkGroup,
      ppEconomicGroup,
      ppTechnicalGroup,
      ppGovernanceGroup,
      treasuryWithdrawal,
    ),
  );

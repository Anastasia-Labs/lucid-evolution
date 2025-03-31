/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML DRepVotingThresholds class
 *
 * @since 2.0.0
 * @category Types
 */
export type DRepVotingThresholds = CML.DRepVotingThresholds;

/**
 * Error class for DRepVotingThresholds operations
 * 
 * This error is thrown when operations on DRepVotingThresholds instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class DRepVotingThresholdsError extends Data.TaggedError("DRepVotingThresholdsError")<{
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
  (instance: CML.DRepVotingThresholds): Effect.Effect<void, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
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
 *   const result = DRepVotingThresholds.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.DRepVotingThresholds): void =>
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
  (instance: CML.DRepVotingThresholds): Effect.Effect<Uint8Array, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.toCborBytes failed DRepVotingThresholds is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
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
 *   const result = DRepVotingThresholds.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.DRepVotingThresholds): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

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
  (instance: CML.DRepVotingThresholds): Effect.Effect<Uint8Array, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.toCanonicalCborBytes failed DRepVotingThresholds is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
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
 *   const result = DRepVotingThresholds.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.DRepVotingThresholds): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

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
    catch: () => new DRepVotingThresholdsError({
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
 *   const result = DRepVotingThresholds.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
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
  (instance: CML.DRepVotingThresholds): Effect.Effect<string, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.toCborHex failed DRepVotingThresholds is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
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
 *   const result = DRepVotingThresholds.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.DRepVotingThresholds): string =>
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
  (instance: CML.DRepVotingThresholds): Effect.Effect<string, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.toCanonicalCborHex failed DRepVotingThresholds is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
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
 *   const result = DRepVotingThresholds.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.DRepVotingThresholds): string =>
  Effect.runSync(toCanonicalCborHex(instance));

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
    catch: () => new DRepVotingThresholdsError({
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
 *   const result = DRepVotingThresholds.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
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
  (instance: CML.DRepVotingThresholds): Effect.Effect<string, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.toJson failed DRepVotingThresholds is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
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
 *   const result = DRepVotingThresholds.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.DRepVotingThresholds): string =>
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
  (instance: CML.DRepVotingThresholds): Effect.Effect<any, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.toJsValue failed DRepVotingThresholds is not valid for any conversion. `,
        }),
    })
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
 *   const result = DRepVotingThresholds.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.DRepVotingThresholds): any =>
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
    catch: () => new DRepVotingThresholdsError({
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
 *   const result = DRepVotingThresholds.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

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
  (instance: CML.DRepVotingThresholds): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.motion_no_confidence(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.motionNoConfidence failed `,
        }),
    })
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
 *   const result = DRepVotingThresholds.motionNoConfidenceUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.motionNoConfidenceUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const motionNoConfidenceUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(motionNoConfidence(instance));

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
  (instance: CML.DRepVotingThresholds): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.committee_normal(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.committeeNormal failed `,
        }),
    })
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
 *   const result = DRepVotingThresholds.committeeNormalUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.committeeNormalUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const committeeNormalUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(committeeNormal(instance));

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
  (instance: CML.DRepVotingThresholds): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.committee_no_confidence(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.committeeNoConfidence failed `,
        }),
    })
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
 *   const result = DRepVotingThresholds.committeeNoConfidenceUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.committeeNoConfidenceUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const committeeNoConfidenceUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(committeeNoConfidence(instance));

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
  (instance: CML.DRepVotingThresholds): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.update_constitution(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.updateConstitution failed `,
        }),
    })
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
 *   const result = DRepVotingThresholds.updateConstitutionUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.updateConstitutionUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const updateConstitutionUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(updateConstitution(instance));

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
  (instance: CML.DRepVotingThresholds): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.hard_fork_initiation(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.hardForkInitiation failed `,
        }),
    })
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
 *   const result = DRepVotingThresholds.hardForkInitiationUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.hardForkInitiationUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hardForkInitiationUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(hardForkInitiation(instance));

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
  (instance: CML.DRepVotingThresholds): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.pp_network_group(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.ppNetworkGroup failed `,
        }),
    })
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
 *   const result = DRepVotingThresholds.ppNetworkGroupUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.ppNetworkGroupUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const ppNetworkGroupUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(ppNetworkGroup(instance));

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
  (instance: CML.DRepVotingThresholds): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.pp_economic_group(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.ppEconomicGroup failed `,
        }),
    })
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
 *   const result = DRepVotingThresholds.ppEconomicGroupUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.ppEconomicGroupUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const ppEconomicGroupUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(ppEconomicGroup(instance));

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
  (instance: CML.DRepVotingThresholds): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.pp_technical_group(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.ppTechnicalGroup failed `,
        }),
    })
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
 *   const result = DRepVotingThresholds.ppTechnicalGroupUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.ppTechnicalGroupUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const ppTechnicalGroupUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(ppTechnicalGroup(instance));

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
  (instance: CML.DRepVotingThresholds): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.pp_governance_group(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.ppGovernanceGroup failed `,
        }),
    })
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
 *   const result = DRepVotingThresholds.ppGovernanceGroupUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.ppGovernanceGroupUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const ppGovernanceGroupUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(ppGovernanceGroup(instance));

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
  (instance: CML.DRepVotingThresholds): Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> =>
    Effect.try({
      try: () => instance.treasury_withdrawal(),
      catch: () =>
        new DRepVotingThresholdsError({
          message: `DRepVotingThresholds.treasuryWithdrawal failed `,
        }),
    })
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
 *   const result = DRepVotingThresholds.treasuryWithdrawalUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds.treasuryWithdrawalUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const treasuryWithdrawalUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(treasuryWithdrawal(instance));

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
export const _new = Effect.fn(function* (motionNoConfidence: CML.UnitInterval, committeeNormal: CML.UnitInterval, committeeNoConfidence: CML.UnitInterval, updateConstitution: CML.UnitInterval, hardForkInitiation: CML.UnitInterval, ppNetworkGroup: CML.UnitInterval, ppEconomicGroup: CML.UnitInterval, ppTechnicalGroup: CML.UnitInterval, ppGovernanceGroup: CML.UnitInterval, treasuryWithdrawal: CML.UnitInterval) {
  return yield* Effect.try({
    try: () => CML.DRepVotingThresholds.new(motionNoConfidence, committeeNormal, committeeNoConfidence, updateConstitution, hardForkInitiation, ppNetworkGroup, ppEconomicGroup, ppTechnicalGroup, ppGovernanceGroup, treasuryWithdrawal),
    catch: () => new DRepVotingThresholdsError({
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
 *   const result = DRepVotingThresholds._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DRepVotingThresholds._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (motionNoConfidence: CML.UnitInterval, committeeNormal: CML.UnitInterval, committeeNoConfidence: CML.UnitInterval, updateConstitution: CML.UnitInterval, hardForkInitiation: CML.UnitInterval, ppNetworkGroup: CML.UnitInterval, ppEconomicGroup: CML.UnitInterval, ppTechnicalGroup: CML.UnitInterval, ppGovernanceGroup: CML.UnitInterval, treasuryWithdrawal: CML.UnitInterval) =>
  Effect.runSync(_new(motionNoConfidence, committeeNormal, committeeNoConfidence, updateConstitution, hardForkInitiation, ppNetworkGroup, ppEconomicGroup, ppTechnicalGroup, ppGovernanceGroup, treasuryWithdrawal));

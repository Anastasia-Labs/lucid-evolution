/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PoolVotingThresholds class
 *
 * @since 2.0.0
 * @category Types
 */
export type PoolVotingThresholds = CML.PoolVotingThresholds;

/**
 * Error class for PoolVotingThresholds operations
 * 
 * This error is thrown when operations on PoolVotingThresholds instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PoolVotingThresholdsError extends Data.TaggedError("PoolVotingThresholdsError")<{
  message?: string;
}> {}

/**
 * Method free of PoolVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.PoolVotingThresholds) => Effect.Effect<void, PoolVotingThresholdsError> = Effect.fn(
  (instance: CML.PoolVotingThresholds) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PoolVotingThresholdsError({
          message: `PoolVotingThresholds.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PoolVotingThresholds): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of PoolVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.PoolVotingThresholds) => Effect.Effect<Uint8Array, PoolVotingThresholdsError> = Effect.fn(
  (instance: CML.PoolVotingThresholds) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new PoolVotingThresholdsError({
          message: `PoolVotingThresholds.toCborBytes failed PoolVotingThresholds is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.PoolVotingThresholds): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PoolVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.PoolVotingThresholds) => Effect.Effect<Uint8Array, PoolVotingThresholdsError> = Effect.fn(
  (instance: CML.PoolVotingThresholds) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new PoolVotingThresholdsError({
          message: `PoolVotingThresholds.toCanonicalCborBytes failed PoolVotingThresholds is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.PoolVotingThresholds): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PoolVotingThresholds
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.PoolVotingThresholds, PoolVotingThresholdsError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PoolVotingThresholds.from_cbor_bytes(cborBytes),
    catch: () => new PoolVotingThresholdsError({
      message: `PoolVotingThresholds.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls PoolVotingThresholds.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.PoolVotingThresholds =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PoolVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.PoolVotingThresholds) => Effect.Effect<string, PoolVotingThresholdsError> = Effect.fn(
  (instance: CML.PoolVotingThresholds) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new PoolVotingThresholdsError({
          message: `PoolVotingThresholds.toCborHex failed PoolVotingThresholds is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.PoolVotingThresholds): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PoolVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.PoolVotingThresholds) => Effect.Effect<string, PoolVotingThresholdsError> = Effect.fn(
  (instance: CML.PoolVotingThresholds) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new PoolVotingThresholdsError({
          message: `PoolVotingThresholds.toCanonicalCborHex failed PoolVotingThresholds is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.PoolVotingThresholds): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PoolVotingThresholds
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.PoolVotingThresholds, PoolVotingThresholdsError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.PoolVotingThresholds.from_cbor_hex(cborBytes),
    catch: () => new PoolVotingThresholdsError({
      message: `PoolVotingThresholds.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls PoolVotingThresholds.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.PoolVotingThresholds =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of PoolVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.PoolVotingThresholds) => Effect.Effect<string, PoolVotingThresholdsError> = Effect.fn(
  (instance: CML.PoolVotingThresholds) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new PoolVotingThresholdsError({
          message: `PoolVotingThresholds.toJson failed PoolVotingThresholds is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.PoolVotingThresholds): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of PoolVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.PoolVotingThresholds) => Effect.Effect<any, PoolVotingThresholdsError> = Effect.fn(
  (instance: CML.PoolVotingThresholds) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new PoolVotingThresholdsError({
          message: `PoolVotingThresholds.toJsValue failed PoolVotingThresholds is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.PoolVotingThresholds): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of PoolVotingThresholds
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.PoolVotingThresholds, PoolVotingThresholdsError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.PoolVotingThresholds.from_json(json),
    catch: () => new PoolVotingThresholdsError({
      message: `PoolVotingThresholds.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls PoolVotingThresholds.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.PoolVotingThresholds =>
  Effect.runSync(fromJson(json));

/**
 * Method motionNoConfidence of PoolVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const motionNoConfidence: (instance: CML.PoolVotingThresholds) => Effect.Effect<CML.UnitInterval, PoolVotingThresholdsError> = Effect.fn(
  (instance: CML.PoolVotingThresholds) =>
    Effect.try({
      try: () => instance.motion_no_confidence(),
      catch: () =>
        new PoolVotingThresholdsError({
          message: `PoolVotingThresholds.motionNoConfidence failed `,
        }),
    })
);

/**
 * Unsafely calls instance.motionNoConfidence without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const motionNoConfidenceUnsafe = (instance: CML.PoolVotingThresholds): CML.UnitInterval =>
  Effect.runSync(motionNoConfidence(instance));

/**
 * Method committeeNormal of PoolVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const committeeNormal: (instance: CML.PoolVotingThresholds) => Effect.Effect<CML.UnitInterval, PoolVotingThresholdsError> = Effect.fn(
  (instance: CML.PoolVotingThresholds) =>
    Effect.try({
      try: () => instance.committee_normal(),
      catch: () =>
        new PoolVotingThresholdsError({
          message: `PoolVotingThresholds.committeeNormal failed `,
        }),
    })
);

/**
 * Unsafely calls instance.committeeNormal without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const committeeNormalUnsafe = (instance: CML.PoolVotingThresholds): CML.UnitInterval =>
  Effect.runSync(committeeNormal(instance));

/**
 * Method committeeNoConfidence of PoolVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const committeeNoConfidence: (instance: CML.PoolVotingThresholds) => Effect.Effect<CML.UnitInterval, PoolVotingThresholdsError> = Effect.fn(
  (instance: CML.PoolVotingThresholds) =>
    Effect.try({
      try: () => instance.committee_no_confidence(),
      catch: () =>
        new PoolVotingThresholdsError({
          message: `PoolVotingThresholds.committeeNoConfidence failed `,
        }),
    })
);

/**
 * Unsafely calls instance.committeeNoConfidence without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const committeeNoConfidenceUnsafe = (instance: CML.PoolVotingThresholds): CML.UnitInterval =>
  Effect.runSync(committeeNoConfidence(instance));

/**
 * Method hardForkInitiation of PoolVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const hardForkInitiation: (instance: CML.PoolVotingThresholds) => Effect.Effect<CML.UnitInterval, PoolVotingThresholdsError> = Effect.fn(
  (instance: CML.PoolVotingThresholds) =>
    Effect.try({
      try: () => instance.hard_fork_initiation(),
      catch: () =>
        new PoolVotingThresholdsError({
          message: `PoolVotingThresholds.hardForkInitiation failed `,
        }),
    })
);

/**
 * Unsafely calls instance.hardForkInitiation without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hardForkInitiationUnsafe = (instance: CML.PoolVotingThresholds): CML.UnitInterval =>
  Effect.runSync(hardForkInitiation(instance));

/**
 * Method securityRelevantParameterVotingThreshold of PoolVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const securityRelevantParameterVotingThreshold: (instance: CML.PoolVotingThresholds) => Effect.Effect<CML.UnitInterval, PoolVotingThresholdsError> = Effect.fn(
  (instance: CML.PoolVotingThresholds) =>
    Effect.try({
      try: () => instance.security_relevant_parameter_voting_threshold(),
      catch: () =>
        new PoolVotingThresholdsError({
          message: `PoolVotingThresholds.securityRelevantParameterVotingThreshold failed `,
        }),
    })
);

/**
 * Unsafely calls instance.securityRelevantParameterVotingThreshold without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const securityRelevantParameterVotingThresholdUnsafe = (instance: CML.PoolVotingThresholds): CML.UnitInterval =>
  Effect.runSync(securityRelevantParameterVotingThreshold(instance));

/**
 * Static method _new of PoolVotingThresholds
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (motionNoConfidence: CML.UnitInterval, committeeNormal: CML.UnitInterval, committeeNoConfidence: CML.UnitInterval, hardForkInitiation: CML.UnitInterval, securityRelevantParameterVotingThreshold: CML.UnitInterval) => Effect.Effect<CML.PoolVotingThresholds, PoolVotingThresholdsError> = Effect.fn(function* (motionNoConfidence: CML.UnitInterval, committeeNormal: CML.UnitInterval, committeeNoConfidence: CML.UnitInterval, hardForkInitiation: CML.UnitInterval, securityRelevantParameterVotingThreshold: CML.UnitInterval) {
  return yield* Effect.try({
    try: () => CML.PoolVotingThresholds.new(motionNoConfidence, committeeNormal, committeeNoConfidence, hardForkInitiation, securityRelevantParameterVotingThreshold),
    catch: () => new PoolVotingThresholdsError({
      message: `PoolVotingThresholds._new failed with parameters: ${motionNoConfidence} (UnitInterval), ${committeeNormal} (UnitInterval), ${committeeNoConfidence} (UnitInterval), ${hardForkInitiation} (UnitInterval), ${securityRelevantParameterVotingThreshold} (UnitInterval). `,
    }),
  });
});

/**
 * Unsafely calls PoolVotingThresholds._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (motionNoConfidence: CML.UnitInterval, committeeNormal: CML.UnitInterval, committeeNoConfidence: CML.UnitInterval, hardForkInitiation: CML.UnitInterval, securityRelevantParameterVotingThreshold: CML.UnitInterval): CML.PoolVotingThresholds =>
  Effect.runSync(_new(motionNoConfidence, committeeNormal, committeeNoConfidence, hardForkInitiation, securityRelevantParameterVotingThreshold));

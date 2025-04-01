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
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.DRepVotingThresholds) => Effect.Effect<void, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.DRepVotingThresholds): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.DRepVotingThresholds) => Effect.Effect<Uint8Array, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.DRepVotingThresholds): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.DRepVotingThresholds) => Effect.Effect<Uint8Array, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.DRepVotingThresholds): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.DRepVotingThresholds, DRepVotingThresholdsError> = Effect.fn(function* (cborBytes: Uint8Array) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.DRepVotingThresholds =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.DRepVotingThresholds) => Effect.Effect<string, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.DRepVotingThresholds): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.DRepVotingThresholds) => Effect.Effect<string, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.DRepVotingThresholds): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.DRepVotingThresholds, DRepVotingThresholdsError> = Effect.fn(function* (cborBytes: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.DRepVotingThresholds =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.DRepVotingThresholds) => Effect.Effect<string, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.DRepVotingThresholds): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.DRepVotingThresholds) => Effect.Effect<any, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.DRepVotingThresholds): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.DRepVotingThresholds, DRepVotingThresholdsError> = Effect.fn(function* (json: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.DRepVotingThresholds =>
  Effect.runSync(fromJson(json));

/**
 * Method motionNoConfidence of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const motionNoConfidence: (instance: CML.DRepVotingThresholds) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const motionNoConfidenceUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(motionNoConfidence(instance));

/**
 * Method committeeNormal of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const committeeNormal: (instance: CML.DRepVotingThresholds) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const committeeNormalUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(committeeNormal(instance));

/**
 * Method committeeNoConfidence of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const committeeNoConfidence: (instance: CML.DRepVotingThresholds) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const committeeNoConfidenceUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(committeeNoConfidence(instance));

/**
 * Method updateConstitution of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const updateConstitution: (instance: CML.DRepVotingThresholds) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const updateConstitutionUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(updateConstitution(instance));

/**
 * Method hardForkInitiation of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const hardForkInitiation: (instance: CML.DRepVotingThresholds) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hardForkInitiationUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(hardForkInitiation(instance));

/**
 * Method ppNetworkGroup of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const ppNetworkGroup: (instance: CML.DRepVotingThresholds) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const ppNetworkGroupUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(ppNetworkGroup(instance));

/**
 * Method ppEconomicGroup of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const ppEconomicGroup: (instance: CML.DRepVotingThresholds) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const ppEconomicGroupUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(ppEconomicGroup(instance));

/**
 * Method ppTechnicalGroup of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const ppTechnicalGroup: (instance: CML.DRepVotingThresholds) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const ppTechnicalGroupUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(ppTechnicalGroup(instance));

/**
 * Method ppGovernanceGroup of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const ppGovernanceGroup: (instance: CML.DRepVotingThresholds) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const ppGovernanceGroupUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(ppGovernanceGroup(instance));

/**
 * Method treasuryWithdrawal of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Methods
 */
export const treasuryWithdrawal: (instance: CML.DRepVotingThresholds) => Effect.Effect<CML.UnitInterval, DRepVotingThresholdsError> = Effect.fn(
  (instance: CML.DRepVotingThresholds) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const treasuryWithdrawalUnsafe = (instance: CML.DRepVotingThresholds): CML.UnitInterval =>
  Effect.runSync(treasuryWithdrawal(instance));

/**
 * Static method _new of DRepVotingThresholds
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (motionNoConfidence: CML.UnitInterval, committeeNormal: CML.UnitInterval, committeeNoConfidence: CML.UnitInterval, updateConstitution: CML.UnitInterval, hardForkInitiation: CML.UnitInterval, ppNetworkGroup: CML.UnitInterval, ppEconomicGroup: CML.UnitInterval, ppTechnicalGroup: CML.UnitInterval, ppGovernanceGroup: CML.UnitInterval, treasuryWithdrawal: CML.UnitInterval) => Effect.Effect<CML.DRepVotingThresholds, DRepVotingThresholdsError> = Effect.fn(function* (motionNoConfidence: CML.UnitInterval, committeeNormal: CML.UnitInterval, committeeNoConfidence: CML.UnitInterval, updateConstitution: CML.UnitInterval, hardForkInitiation: CML.UnitInterval, ppNetworkGroup: CML.UnitInterval, ppEconomicGroup: CML.UnitInterval, ppTechnicalGroup: CML.UnitInterval, ppGovernanceGroup: CML.UnitInterval, treasuryWithdrawal: CML.UnitInterval) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (motionNoConfidence: CML.UnitInterval, committeeNormal: CML.UnitInterval, committeeNoConfidence: CML.UnitInterval, updateConstitution: CML.UnitInterval, hardForkInitiation: CML.UnitInterval, ppNetworkGroup: CML.UnitInterval, ppEconomicGroup: CML.UnitInterval, ppTechnicalGroup: CML.UnitInterval, ppGovernanceGroup: CML.UnitInterval, treasuryWithdrawal: CML.UnitInterval): CML.DRepVotingThresholds =>
  Effect.runSync(_new(motionNoConfidence, committeeNormal, committeeNoConfidence, updateConstitution, hardForkInitiation, ppNetworkGroup, ppEconomicGroup, ppTechnicalGroup, ppGovernanceGroup, treasuryWithdrawal));

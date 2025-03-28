import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type GovAction = CML.GovAction;

export class GovActionError extends Data.TaggedError("GovActionError")<{
  message?: string;
}> {}

/**
 * Method free of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovAction instance
 * const instance = ... ;
 *   const result = yield* GovAction.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.GovAction): Effect.Effect<void, GovActionError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new GovActionError({
          message: `GovAction.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.GovAction): void =>
  Effect.runSync(free(instance));

/**
 * Method scriptHash of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovAction instance
 * const instance = ... ;
 *   const result = yield* GovAction.scriptHash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const scriptHash = Effect.fn(
  (instance: CML.GovAction): Effect.Effect<CML.ScriptHash | undefined, GovActionError> =>
    Effect.try({
      try: () => instance.script_hash(),
      catch: () =>
        new GovActionError({
          message: `GovAction.scriptHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.scriptHash without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeScriptHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeScriptHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeScriptHash = (instance: CML.GovAction): CML.ScriptHash | undefined =>
  Effect.runSync(scriptHash(instance));

/**
 * Method toCborBytes of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovAction instance
 * const instance = ... ;
 *   const result = yield* GovAction.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.GovAction): Effect.Effect<Uint8Array, GovActionError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new GovActionError({
          message: `GovAction.toCborBytes failed GovAction is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.GovAction): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovAction instance
 * const instance = ... ;
 *   const result = yield* GovAction.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.GovAction): Effect.Effect<Uint8Array, GovActionError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new GovActionError({
          message: `GovAction.toCanonicalCborBytes failed GovAction is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.GovAction): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* GovAction.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.GovAction.from_cbor_bytes(cborBytes),
    catch: () => new GovActionError({
      message: `GovAction.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls GovAction.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovAction instance
 * const instance = ... ;
 *   const result = yield* GovAction.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.GovAction): Effect.Effect<string, GovActionError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new GovActionError({
          message: `GovAction.toCborHex failed GovAction is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.GovAction): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovAction instance
 * const instance = ... ;
 *   const result = yield* GovAction.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.GovAction): Effect.Effect<string, GovActionError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new GovActionError({
          message: `GovAction.toCanonicalCborHex failed GovAction is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.GovAction): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* GovAction.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.GovAction.from_cbor_hex(cborBytes),
    catch: () => new GovActionError({
      message: `GovAction.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls GovAction.fromCborHex without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovAction instance
 * const instance = ... ;
 *   const result = yield* GovAction.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.GovAction): Effect.Effect<string, GovActionError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new GovActionError({
          message: `GovAction.toJson failed GovAction is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.GovAction): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovAction instance
 * const instance = ... ;
 *   const result = yield* GovAction.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.GovAction): Effect.Effect<any, GovActionError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new GovActionError({
          message: `GovAction.toJsValue failed GovAction is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.GovAction): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* GovAction.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.GovAction.from_json(json),
    catch: () => new GovActionError({
      message: `GovAction.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls GovAction.fromJson without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Static method newParameterChangeAction of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* GovAction.newParameterChangeAction( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newParameterChangeAction = Effect.fn(function* (actionId: CML.GovActionId | undefined, update: CML.ProtocolParamUpdate, policyHash: CML.ScriptHash) {
  return yield* Effect.try({
    try: () => CML.GovAction.new_parameter_change_action(actionId, update, policyHash),
    catch: () => new GovActionError({
      message: `GovAction.newParameterChangeAction failed with parameters: ${actionId}, ${update} (ProtocolParamUpdate), ${policyHash} (ScriptHash). `,
    }),
  });
});

/**
 * Unsafely calls GovAction.newParameterChangeAction without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeNewParameterChangeAction( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeNewParameterChangeAction failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewParameterChangeAction = (actionId: CML.GovActionId | undefined, update: CML.ProtocolParamUpdate, policyHash: CML.ScriptHash) =>
  Effect.runSync(newParameterChangeAction(actionId, update, policyHash));

/**
 * Static method newHardForkInitiationAction of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* GovAction.newHardForkInitiationAction( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newHardForkInitiationAction = Effect.fn(function* (actionId: CML.GovActionId | undefined, version: CML.ProtocolVersion) {
  return yield* Effect.try({
    try: () => CML.GovAction.new_hard_fork_initiation_action(actionId, version),
    catch: () => new GovActionError({
      message: `GovAction.newHardForkInitiationAction failed with parameters: ${actionId}, ${version} (ProtocolVersion). `,
    }),
  });
});

/**
 * Unsafely calls GovAction.newHardForkInitiationAction without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeNewHardForkInitiationAction( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeNewHardForkInitiationAction failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewHardForkInitiationAction = (actionId: CML.GovActionId | undefined, version: CML.ProtocolVersion) =>
  Effect.runSync(newHardForkInitiationAction(actionId, version));

/**
 * Static method newTreasuryWithdrawalsAction of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* GovAction.newTreasuryWithdrawalsAction( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newTreasuryWithdrawalsAction = Effect.fn(function* (withdrawal: CML.MapRewardAccountToCoin, policyHash: CML.ScriptHash) {
  return yield* Effect.try({
    try: () => CML.GovAction.new_treasury_withdrawals_action(withdrawal, policyHash),
    catch: () => new GovActionError({
      message: `GovAction.newTreasuryWithdrawalsAction failed with parameters: ${withdrawal} (MapRewardAccountToCoin), ${policyHash} (ScriptHash). `,
    }),
  });
});

/**
 * Unsafely calls GovAction.newTreasuryWithdrawalsAction without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeNewTreasuryWithdrawalsAction( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeNewTreasuryWithdrawalsAction failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewTreasuryWithdrawalsAction = (withdrawal: CML.MapRewardAccountToCoin, policyHash: CML.ScriptHash) =>
  Effect.runSync(newTreasuryWithdrawalsAction(withdrawal, policyHash));

/**
 * Static method newNoConfidence of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* GovAction.newNoConfidence( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newNoConfidence = Effect.fn(function* (actionId: CML.GovActionId) {
  return yield* Effect.try({
    try: () => CML.GovAction.new_no_confidence(actionId),
    catch: () => new GovActionError({
      message: `GovAction.newNoConfidence failed with parameters: ${actionId} (GovActionId). `,
    }),
  });
});

/**
 * Unsafely calls GovAction.newNoConfidence without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeNewNoConfidence( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeNewNoConfidence failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewNoConfidence = (actionId: CML.GovActionId) =>
  Effect.runSync(newNoConfidence(actionId));

/**
 * Static method newUpdateCommittee of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* GovAction.newUpdateCommittee( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newUpdateCommittee = Effect.fn(function* (actionId: CML.GovActionId | undefined, coldCredentials: CML.CommitteeColdCredentialList, credentials: CML.MapCommitteeColdCredentialToEpoch, unitInterval: CML.UnitInterval) {
  return yield* Effect.try({
    try: () => CML.GovAction.new_update_committee(actionId, coldCredentials, credentials, unitInterval),
    catch: () => new GovActionError({
      message: `GovAction.newUpdateCommittee failed with parameters: ${actionId}, ${coldCredentials} (CommitteeColdCredentialList), ${credentials} (MapCommitteeColdCredentialToEpoch), ${unitInterval} (UnitInterval). `,
    }),
  });
});

/**
 * Unsafely calls GovAction.newUpdateCommittee without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeNewUpdateCommittee( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeNewUpdateCommittee failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewUpdateCommittee = (actionId: CML.GovActionId | undefined, coldCredentials: CML.CommitteeColdCredentialList, credentials: CML.MapCommitteeColdCredentialToEpoch, unitInterval: CML.UnitInterval) =>
  Effect.runSync(newUpdateCommittee(actionId, coldCredentials, credentials, unitInterval));

/**
 * Static method newNewConstitution of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* GovAction.newNewConstitution( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newNewConstitution = Effect.fn(function* (actionId: CML.GovActionId | undefined, constitution: CML.Constitution) {
  return yield* Effect.try({
    try: () => CML.GovAction.new_new_constitution(actionId, constitution),
    catch: () => new GovActionError({
      message: `GovAction.newNewConstitution failed with parameters: ${actionId}, ${constitution} (Constitution). `,
    }),
  });
});

/**
 * Unsafely calls GovAction.newNewConstitution without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeNewNewConstitution( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeNewNewConstitution failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewNewConstitution = (actionId: CML.GovActionId | undefined, constitution: CML.Constitution) =>
  Effect.runSync(newNewConstitution(actionId, constitution));

/**
 * Static method newInfoAction of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* GovAction.newInfoAction();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newInfoAction = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.GovAction.new_info_action(),
    catch: () => new GovActionError({
      message: `GovAction.newInfoAction failed `,
    }),
  });
});

/**
 * Unsafely calls GovAction.newInfoAction without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeNewInfoAction();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeNewInfoAction failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewInfoAction = () =>
  Effect.runSync(newInfoAction());

/**
 * Method kind of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovAction instance
 * const instance = ... ;
 *   const result = yield* GovAction.kind(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (instance: CML.GovAction): Effect.Effect<CML.GovActionKind, GovActionError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new GovActionError({
          message: `GovAction.kind failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeKind(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeKind failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKind = (instance: CML.GovAction): CML.GovActionKind =>
  Effect.runSync(kind(instance));

/**
 * Method asParameterChangeAction of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovAction instance
 * const instance = ... ;
 *   const result = yield* GovAction.asParameterChangeAction(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asParameterChangeAction = Effect.fn(
  (instance: CML.GovAction): Effect.Effect<CML.ParameterChangeAction | undefined, GovActionError> =>
    Effect.try({
      try: () => instance.as_parameter_change_action(),
      catch: () =>
        new GovActionError({
          message: `GovAction.asParameterChangeAction failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asParameterChangeAction without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeAsParameterChangeAction(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeAsParameterChangeAction failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsParameterChangeAction = (instance: CML.GovAction): CML.ParameterChangeAction | undefined =>
  Effect.runSync(asParameterChangeAction(instance));

/**
 * Method asHardForkInitiationAction of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovAction instance
 * const instance = ... ;
 *   const result = yield* GovAction.asHardForkInitiationAction(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asHardForkInitiationAction = Effect.fn(
  (instance: CML.GovAction): Effect.Effect<CML.HardForkInitiationAction | undefined, GovActionError> =>
    Effect.try({
      try: () => instance.as_hard_fork_initiation_action(),
      catch: () =>
        new GovActionError({
          message: `GovAction.asHardForkInitiationAction failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asHardForkInitiationAction without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeAsHardForkInitiationAction(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeAsHardForkInitiationAction failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsHardForkInitiationAction = (instance: CML.GovAction): CML.HardForkInitiationAction | undefined =>
  Effect.runSync(asHardForkInitiationAction(instance));

/**
 * Method asTreasuryWithdrawalsAction of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovAction instance
 * const instance = ... ;
 *   const result = yield* GovAction.asTreasuryWithdrawalsAction(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asTreasuryWithdrawalsAction = Effect.fn(
  (instance: CML.GovAction): Effect.Effect<CML.TreasuryWithdrawalsAction | undefined, GovActionError> =>
    Effect.try({
      try: () => instance.as_treasury_withdrawals_action(),
      catch: () =>
        new GovActionError({
          message: `GovAction.asTreasuryWithdrawalsAction failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asTreasuryWithdrawalsAction without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeAsTreasuryWithdrawalsAction(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeAsTreasuryWithdrawalsAction failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsTreasuryWithdrawalsAction = (instance: CML.GovAction): CML.TreasuryWithdrawalsAction | undefined =>
  Effect.runSync(asTreasuryWithdrawalsAction(instance));

/**
 * Method asNoConfidence of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovAction instance
 * const instance = ... ;
 *   const result = yield* GovAction.asNoConfidence(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asNoConfidence = Effect.fn(
  (instance: CML.GovAction): Effect.Effect<CML.NoConfidence | undefined, GovActionError> =>
    Effect.try({
      try: () => instance.as_no_confidence(),
      catch: () =>
        new GovActionError({
          message: `GovAction.asNoConfidence failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asNoConfidence without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeAsNoConfidence(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeAsNoConfidence failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsNoConfidence = (instance: CML.GovAction): CML.NoConfidence | undefined =>
  Effect.runSync(asNoConfidence(instance));

/**
 * Method asUpdateCommittee of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovAction instance
 * const instance = ... ;
 *   const result = yield* GovAction.asUpdateCommittee(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asUpdateCommittee = Effect.fn(
  (instance: CML.GovAction): Effect.Effect<CML.UpdateCommittee | undefined, GovActionError> =>
    Effect.try({
      try: () => instance.as_update_committee(),
      catch: () =>
        new GovActionError({
          message: `GovAction.asUpdateCommittee failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asUpdateCommittee without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeAsUpdateCommittee(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeAsUpdateCommittee failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsUpdateCommittee = (instance: CML.GovAction): CML.UpdateCommittee | undefined =>
  Effect.runSync(asUpdateCommittee(instance));

/**
 * Method asNewConstitution of GovAction
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovAction instance
 * const instance = ... ;
 *   const result = yield* GovAction.asNewConstitution(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asNewConstitution = Effect.fn(
  (instance: CML.GovAction): Effect.Effect<CML.NewConstitution | undefined, GovActionError> =>
    Effect.try({
      try: () => instance.as_new_constitution(),
      catch: () =>
        new GovActionError({
          message: `GovAction.asNewConstitution failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asNewConstitution without Effect wrapper
 * 
 * @example
 * import { GovAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovAction.unsafeAsNewConstitution(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovAction.unsafeAsNewConstitution failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsNewConstitution = (instance: CML.GovAction): CML.NewConstitution | undefined =>
  Effect.runSync(asNewConstitution(instance));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML GovAction class
 *
 * @since 2.0.0
 * @category Types
 */
export type GovAction = CML.GovAction;

/**
 * Error class for GovAction operations
 *
 * This error is thrown when operations on GovAction instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class GovActionError extends Data.TaggedError("GovActionError")<{
  message?: string;
}> {}

/**
 * Method free of GovAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.GovAction,
) => Effect.Effect<void, GovActionError> = Effect.fn(
  (instance: CML.GovAction) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new GovActionError({
          message: `GovAction.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.GovAction): void =>
  Effect.runSync(free(instance));

/**
 * Method scriptHash of GovAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const scriptHash: (
  instance: CML.GovAction,
) => Effect.Effect<CML.ScriptHash | undefined, GovActionError> = Effect.fn(
  (instance: CML.GovAction) =>
    Effect.try({
      try: () => instance.script_hash(),
      catch: () =>
        new GovActionError({
          message: `GovAction.scriptHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.scriptHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const scriptHashUnsafe = (
  instance: CML.GovAction,
): CML.ScriptHash | undefined => Effect.runSync(scriptHash(instance));

/**
 * Method toCborBytes of GovAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.GovAction,
) => Effect.Effect<Uint8Array, GovActionError> = Effect.fn(
  (instance: CML.GovAction) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new GovActionError({
          message: `GovAction.toCborBytes failed GovAction is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.GovAction): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of GovAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.GovAction,
) => Effect.Effect<Uint8Array, GovActionError> = Effect.fn(
  (instance: CML.GovAction) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new GovActionError({
          message: `GovAction.toCanonicalCborBytes failed GovAction is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.GovAction,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of GovAction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.GovAction, GovActionError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.GovAction.from_cbor_bytes(cborBytes),
    catch: () =>
      new GovActionError({
        message: `GovAction.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls GovAction.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.GovAction =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of GovAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.GovAction,
) => Effect.Effect<string, GovActionError> = Effect.fn(
  (instance: CML.GovAction) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new GovActionError({
          message: `GovAction.toCborHex failed GovAction is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.GovAction): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of GovAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.GovAction,
) => Effect.Effect<string, GovActionError> = Effect.fn(
  (instance: CML.GovAction) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new GovActionError({
          message: `GovAction.toCanonicalCborHex failed GovAction is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.GovAction): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of GovAction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.GovAction, GovActionError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.GovAction.from_cbor_hex(cborBytes),
    catch: () =>
      new GovActionError({
        message: `GovAction.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls GovAction.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.GovAction =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of GovAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.GovAction,
) => Effect.Effect<string, GovActionError> = Effect.fn(
  (instance: CML.GovAction) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new GovActionError({
          message: `GovAction.toJson failed GovAction is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.GovAction): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of GovAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.GovAction,
) => Effect.Effect<any, GovActionError> = Effect.fn((instance: CML.GovAction) =>
  Effect.try({
    try: () => instance.to_js_value(),
    catch: () =>
      new GovActionError({
        message: `GovAction.toJsValue failed GovAction is not valid for any conversion. `,
      }),
  }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.GovAction): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of GovAction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.GovAction, GovActionError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.GovAction.from_json(json),
    catch: () =>
      new GovActionError({
        message: `GovAction.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls GovAction.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.GovAction =>
  Effect.runSync(fromJson(json));

/**
 * Static method newParameterChangeAction of GovAction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newParameterChangeAction: (
  actionId: CML.GovActionId | undefined,
  update: CML.ProtocolParamUpdate,
  policyHash: CML.ScriptHash,
) => Effect.Effect<CML.GovAction, GovActionError> = Effect.fn(function* (
  actionId: CML.GovActionId | undefined,
  update: CML.ProtocolParamUpdate,
  policyHash: CML.ScriptHash,
) {
  return yield* Effect.try({
    try: () =>
      CML.GovAction.new_parameter_change_action(actionId, update, policyHash),
    catch: () =>
      new GovActionError({
        message: `GovAction.newParameterChangeAction failed with parameters: ${actionId}, ${update} (ProtocolParamUpdate), ${policyHash} (ScriptHash). `,
      }),
  });
});

/**
 * Unsafely calls GovAction.newParameterChangeAction without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newParameterChangeActionUnsafe = (
  actionId: CML.GovActionId | undefined,
  update: CML.ProtocolParamUpdate,
  policyHash: CML.ScriptHash,
): CML.GovAction =>
  Effect.runSync(newParameterChangeAction(actionId, update, policyHash));

/**
 * Static method newHardForkInitiationAction of GovAction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newHardForkInitiationAction: (
  actionId: CML.GovActionId | undefined,
  version: CML.ProtocolVersion,
) => Effect.Effect<CML.GovAction, GovActionError> = Effect.fn(function* (
  actionId: CML.GovActionId | undefined,
  version: CML.ProtocolVersion,
) {
  return yield* Effect.try({
    try: () => CML.GovAction.new_hard_fork_initiation_action(actionId, version),
    catch: () =>
      new GovActionError({
        message: `GovAction.newHardForkInitiationAction failed with parameters: ${actionId}, ${version} (ProtocolVersion). `,
      }),
  });
});

/**
 * Unsafely calls GovAction.newHardForkInitiationAction without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newHardForkInitiationActionUnsafe = (
  actionId: CML.GovActionId | undefined,
  version: CML.ProtocolVersion,
): CML.GovAction =>
  Effect.runSync(newHardForkInitiationAction(actionId, version));

/**
 * Static method newTreasuryWithdrawalsAction of GovAction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newTreasuryWithdrawalsAction: (
  withdrawal: CML.MapRewardAccountToCoin,
  policyHash: CML.ScriptHash,
) => Effect.Effect<CML.GovAction, GovActionError> = Effect.fn(function* (
  withdrawal: CML.MapRewardAccountToCoin,
  policyHash: CML.ScriptHash,
) {
  return yield* Effect.try({
    try: () =>
      CML.GovAction.new_treasury_withdrawals_action(withdrawal, policyHash),
    catch: () =>
      new GovActionError({
        message: `GovAction.newTreasuryWithdrawalsAction failed with parameters: ${withdrawal} (MapRewardAccountToCoin), ${policyHash} (ScriptHash). `,
      }),
  });
});

/**
 * Unsafely calls GovAction.newTreasuryWithdrawalsAction without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newTreasuryWithdrawalsActionUnsafe = (
  withdrawal: CML.MapRewardAccountToCoin,
  policyHash: CML.ScriptHash,
): CML.GovAction =>
  Effect.runSync(newTreasuryWithdrawalsAction(withdrawal, policyHash));

/**
 * Static method newNoConfidence of GovAction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newNoConfidence: (
  actionId: CML.GovActionId,
) => Effect.Effect<CML.GovAction, GovActionError> = Effect.fn(function* (
  actionId: CML.GovActionId,
) {
  return yield* Effect.try({
    try: () => CML.GovAction.new_no_confidence(actionId),
    catch: () =>
      new GovActionError({
        message: `GovAction.newNoConfidence failed with parameters: ${actionId} (GovActionId). `,
      }),
  });
});

/**
 * Unsafely calls GovAction.newNoConfidence without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newNoConfidenceUnsafe = (
  actionId: CML.GovActionId,
): CML.GovAction => Effect.runSync(newNoConfidence(actionId));

/**
 * Static method newUpdateCommittee of GovAction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newUpdateCommittee: (
  actionId: CML.GovActionId | undefined,
  coldCredentials: CML.CommitteeColdCredentialList,
  credentials: CML.MapCommitteeColdCredentialToEpoch,
  unitInterval: CML.UnitInterval,
) => Effect.Effect<CML.GovAction, GovActionError> = Effect.fn(function* (
  actionId: CML.GovActionId | undefined,
  coldCredentials: CML.CommitteeColdCredentialList,
  credentials: CML.MapCommitteeColdCredentialToEpoch,
  unitInterval: CML.UnitInterval,
) {
  return yield* Effect.try({
    try: () =>
      CML.GovAction.new_update_committee(
        actionId,
        coldCredentials,
        credentials,
        unitInterval,
      ),
    catch: () =>
      new GovActionError({
        message: `GovAction.newUpdateCommittee failed with parameters: ${actionId}, ${coldCredentials} (CommitteeColdCredentialList), ${credentials} (MapCommitteeColdCredentialToEpoch), ${unitInterval} (UnitInterval). `,
      }),
  });
});

/**
 * Unsafely calls GovAction.newUpdateCommittee without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newUpdateCommitteeUnsafe = (
  actionId: CML.GovActionId | undefined,
  coldCredentials: CML.CommitteeColdCredentialList,
  credentials: CML.MapCommitteeColdCredentialToEpoch,
  unitInterval: CML.UnitInterval,
): CML.GovAction =>
  Effect.runSync(
    newUpdateCommittee(actionId, coldCredentials, credentials, unitInterval),
  );

/**
 * Static method newNewConstitution of GovAction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newNewConstitution: (
  actionId: CML.GovActionId | undefined,
  constitution: CML.Constitution,
) => Effect.Effect<CML.GovAction, GovActionError> = Effect.fn(function* (
  actionId: CML.GovActionId | undefined,
  constitution: CML.Constitution,
) {
  return yield* Effect.try({
    try: () => CML.GovAction.new_new_constitution(actionId, constitution),
    catch: () =>
      new GovActionError({
        message: `GovAction.newNewConstitution failed with parameters: ${actionId}, ${constitution} (Constitution). `,
      }),
  });
});

/**
 * Unsafely calls GovAction.newNewConstitution without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newNewConstitutionUnsafe = (
  actionId: CML.GovActionId | undefined,
  constitution: CML.Constitution,
): CML.GovAction => Effect.runSync(newNewConstitution(actionId, constitution));

/**
 * Static method newInfoAction of GovAction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newInfoAction: () => Effect.Effect<CML.GovAction, GovActionError> =
  Effect.fn(function* () {
    return yield* Effect.try({
      try: () => CML.GovAction.new_info_action(),
      catch: () =>
        new GovActionError({
          message: `GovAction.newInfoAction failed `,
        }),
    });
  });

/**
 * Unsafely calls GovAction.newInfoAction without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newInfoActionUnsafe = (): CML.GovAction =>
  Effect.runSync(newInfoAction());

/**
 * Method kind of GovAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind: (
  instance: CML.GovAction,
) => Effect.Effect<CML.GovActionKind, GovActionError> = Effect.fn(
  (instance: CML.GovAction) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new GovActionError({
          message: `GovAction.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.GovAction): CML.GovActionKind =>
  Effect.runSync(kind(instance));

/**
 * Method asParameterChangeAction of GovAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const asParameterChangeAction: (
  instance: CML.GovAction,
) => Effect.Effect<CML.ParameterChangeAction | undefined, GovActionError> =
  Effect.fn((instance: CML.GovAction) =>
    Effect.try({
      try: () => instance.as_parameter_change_action(),
      catch: () =>
        new GovActionError({
          message: `GovAction.asParameterChangeAction failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.asParameterChangeAction without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asParameterChangeActionUnsafe = (
  instance: CML.GovAction,
): CML.ParameterChangeAction | undefined =>
  Effect.runSync(asParameterChangeAction(instance));

/**
 * Method asHardForkInitiationAction of GovAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const asHardForkInitiationAction: (
  instance: CML.GovAction,
) => Effect.Effect<CML.HardForkInitiationAction | undefined, GovActionError> =
  Effect.fn((instance: CML.GovAction) =>
    Effect.try({
      try: () => instance.as_hard_fork_initiation_action(),
      catch: () =>
        new GovActionError({
          message: `GovAction.asHardForkInitiationAction failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.asHardForkInitiationAction without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asHardForkInitiationActionUnsafe = (
  instance: CML.GovAction,
): CML.HardForkInitiationAction | undefined =>
  Effect.runSync(asHardForkInitiationAction(instance));

/**
 * Method asTreasuryWithdrawalsAction of GovAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const asTreasuryWithdrawalsAction: (
  instance: CML.GovAction,
) => Effect.Effect<CML.TreasuryWithdrawalsAction | undefined, GovActionError> =
  Effect.fn((instance: CML.GovAction) =>
    Effect.try({
      try: () => instance.as_treasury_withdrawals_action(),
      catch: () =>
        new GovActionError({
          message: `GovAction.asTreasuryWithdrawalsAction failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.asTreasuryWithdrawalsAction without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asTreasuryWithdrawalsActionUnsafe = (
  instance: CML.GovAction,
): CML.TreasuryWithdrawalsAction | undefined =>
  Effect.runSync(asTreasuryWithdrawalsAction(instance));

/**
 * Method asNoConfidence of GovAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const asNoConfidence: (
  instance: CML.GovAction,
) => Effect.Effect<CML.NoConfidence | undefined, GovActionError> = Effect.fn(
  (instance: CML.GovAction) =>
    Effect.try({
      try: () => instance.as_no_confidence(),
      catch: () =>
        new GovActionError({
          message: `GovAction.asNoConfidence failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asNoConfidence without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asNoConfidenceUnsafe = (
  instance: CML.GovAction,
): CML.NoConfidence | undefined => Effect.runSync(asNoConfidence(instance));

/**
 * Method asUpdateCommittee of GovAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const asUpdateCommittee: (
  instance: CML.GovAction,
) => Effect.Effect<CML.UpdateCommittee | undefined, GovActionError> = Effect.fn(
  (instance: CML.GovAction) =>
    Effect.try({
      try: () => instance.as_update_committee(),
      catch: () =>
        new GovActionError({
          message: `GovAction.asUpdateCommittee failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asUpdateCommittee without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asUpdateCommitteeUnsafe = (
  instance: CML.GovAction,
): CML.UpdateCommittee | undefined =>
  Effect.runSync(asUpdateCommittee(instance));

/**
 * Method asNewConstitution of GovAction
 *
 * @since 2.0.0
 * @category Methods
 */
export const asNewConstitution: (
  instance: CML.GovAction,
) => Effect.Effect<CML.NewConstitution | undefined, GovActionError> = Effect.fn(
  (instance: CML.GovAction) =>
    Effect.try({
      try: () => instance.as_new_constitution(),
      catch: () =>
        new GovActionError({
          message: `GovAction.asNewConstitution failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asNewConstitution without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asNewConstitutionUnsafe = (
  instance: CML.GovAction,
): CML.NewConstitution | undefined =>
  Effect.runSync(asNewConstitution(instance));

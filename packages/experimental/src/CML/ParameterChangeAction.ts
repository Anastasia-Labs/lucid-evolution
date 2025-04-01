/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ParameterChangeAction class
 *
 * @since 2.0.0
 * @category Types
 */
export type ParameterChangeAction = CML.ParameterChangeAction;

/**
 * Error class for ParameterChangeAction operations
 * 
 * This error is thrown when operations on ParameterChangeAction instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ParameterChangeActionError extends Data.TaggedError("ParameterChangeActionError")<{
  message?: string;
}> {}

/**
 * Method free of ParameterChangeAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.ParameterChangeAction) => Effect.Effect<void, ParameterChangeActionError> = Effect.fn(
  (instance: CML.ParameterChangeAction) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ParameterChangeActionError({
          message: `ParameterChangeAction.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ParameterChangeAction): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ParameterChangeAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.ParameterChangeAction) => Effect.Effect<Uint8Array, ParameterChangeActionError> = Effect.fn(
  (instance: CML.ParameterChangeAction) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ParameterChangeActionError({
          message: `ParameterChangeAction.toCborBytes failed ParameterChangeAction is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ParameterChangeAction): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ParameterChangeAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.ParameterChangeAction) => Effect.Effect<Uint8Array, ParameterChangeActionError> = Effect.fn(
  (instance: CML.ParameterChangeAction) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ParameterChangeActionError({
          message: `ParameterChangeAction.toCanonicalCborBytes failed ParameterChangeAction is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.ParameterChangeAction): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ParameterChangeAction
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.ParameterChangeAction, ParameterChangeActionError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ParameterChangeAction.from_cbor_bytes(cborBytes),
    catch: () => new ParameterChangeActionError({
      message: `ParameterChangeAction.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls ParameterChangeAction.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.ParameterChangeAction =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ParameterChangeAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.ParameterChangeAction) => Effect.Effect<string, ParameterChangeActionError> = Effect.fn(
  (instance: CML.ParameterChangeAction) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ParameterChangeActionError({
          message: `ParameterChangeAction.toCborHex failed ParameterChangeAction is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ParameterChangeAction): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ParameterChangeAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.ParameterChangeAction) => Effect.Effect<string, ParameterChangeActionError> = Effect.fn(
  (instance: CML.ParameterChangeAction) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ParameterChangeActionError({
          message: `ParameterChangeAction.toCanonicalCborHex failed ParameterChangeAction is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ParameterChangeAction): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ParameterChangeAction
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.ParameterChangeAction, ParameterChangeActionError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ParameterChangeAction.from_cbor_hex(cborBytes),
    catch: () => new ParameterChangeActionError({
      message: `ParameterChangeAction.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls ParameterChangeAction.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.ParameterChangeAction =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ParameterChangeAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.ParameterChangeAction) => Effect.Effect<string, ParameterChangeActionError> = Effect.fn(
  (instance: CML.ParameterChangeAction) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ParameterChangeActionError({
          message: `ParameterChangeAction.toJson failed ParameterChangeAction is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ParameterChangeAction): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ParameterChangeAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.ParameterChangeAction) => Effect.Effect<any, ParameterChangeActionError> = Effect.fn(
  (instance: CML.ParameterChangeAction) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ParameterChangeActionError({
          message: `ParameterChangeAction.toJsValue failed ParameterChangeAction is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ParameterChangeAction): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ParameterChangeAction
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.ParameterChangeAction, ParameterChangeActionError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ParameterChangeAction.from_json(json),
    catch: () => new ParameterChangeActionError({
      message: `ParameterChangeAction.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls ParameterChangeAction.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.ParameterChangeAction =>
  Effect.runSync(fromJson(json));

/**
 * Method actionId of ParameterChangeAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const actionId: (instance: CML.ParameterChangeAction) => Effect.Effect<CML.GovActionId | undefined, ParameterChangeActionError> = Effect.fn(
  (instance: CML.ParameterChangeAction) =>
    Effect.try({
      try: () => instance.action_id(),
      catch: () =>
        new ParameterChangeActionError({
          message: `ParameterChangeAction.actionId failed `,
        }),
    })
);

/**
 * Unsafely calls instance.actionId without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const actionIdUnsafe = (instance: CML.ParameterChangeAction): CML.GovActionId | undefined =>
  Effect.runSync(actionId(instance));

/**
 * Method update of ParameterChangeAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const update: (instance: CML.ParameterChangeAction) => Effect.Effect<CML.ProtocolParamUpdate, ParameterChangeActionError> = Effect.fn(
  (instance: CML.ParameterChangeAction) =>
    Effect.try({
      try: () => instance.update(),
      catch: () =>
        new ParameterChangeActionError({
          message: `ParameterChangeAction.update failed `,
        }),
    })
);

/**
 * Unsafely calls instance.update without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const updateUnsafe = (instance: CML.ParameterChangeAction): CML.ProtocolParamUpdate =>
  Effect.runSync(update(instance));

/**
 * Method policyHash of ParameterChangeAction
 * 
 * @since 2.0.0
 * @category Methods
 */
export const policyHash: (instance: CML.ParameterChangeAction) => Effect.Effect<CML.ScriptHash | undefined, ParameterChangeActionError> = Effect.fn(
  (instance: CML.ParameterChangeAction) =>
    Effect.try({
      try: () => instance.policy_hash(),
      catch: () =>
        new ParameterChangeActionError({
          message: `ParameterChangeAction.policyHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.policyHash without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const policyHashUnsafe = (instance: CML.ParameterChangeAction): CML.ScriptHash | undefined =>
  Effect.runSync(policyHash(instance));

/**
 * Static method _new of ParameterChangeAction
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (actionId: CML.GovActionId | undefined, update: CML.ProtocolParamUpdate, policyHash: CML.ScriptHash) => Effect.Effect<CML.ParameterChangeAction, ParameterChangeActionError> = Effect.fn(function* (actionId: CML.GovActionId | undefined, update: CML.ProtocolParamUpdate, policyHash: CML.ScriptHash) {
  return yield* Effect.try({
    try: () => CML.ParameterChangeAction.new(actionId, update, policyHash),
    catch: () => new ParameterChangeActionError({
      message: `ParameterChangeAction._new failed with parameters: ${actionId}, ${update} (ProtocolParamUpdate), ${policyHash} (ScriptHash). `,
    }),
  });
});

/**
 * Unsafely calls ParameterChangeAction._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (actionId: CML.GovActionId | undefined, update: CML.ProtocolParamUpdate, policyHash: CML.ScriptHash): CML.ParameterChangeAction =>
  Effect.runSync(_new(actionId, update, policyHash));

import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ParameterChangeAction = CML.ParameterChangeAction;

export class ParameterChangeActionError extends Data.TaggedError("ParameterChangeActionError")<{
  message?: string;
}> {}

/**
 * Method free of ParameterChangeAction
 * 
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 *   const result = yield* ParameterChangeAction.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ParameterChangeAction): Effect.Effect<void, ParameterChangeActionError> =>
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
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ParameterChangeAction.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ParameterChangeAction.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ParameterChangeAction): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ParameterChangeAction
 * 
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 *   const result = yield* ParameterChangeAction.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.ParameterChangeAction): Effect.Effect<Uint8Array, ParameterChangeActionError> =>
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
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ParameterChangeAction.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ParameterChangeAction.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.ParameterChangeAction): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ParameterChangeAction
 * 
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 *   const result = yield* ParameterChangeAction.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.ParameterChangeAction): Effect.Effect<Uint8Array, ParameterChangeActionError> =>
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
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ParameterChangeAction.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ParameterChangeAction.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.ParameterChangeAction): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ParameterChangeAction
 * 
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ParameterChangeAction.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
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
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ParameterChangeAction.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ParameterChangeAction.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ParameterChangeAction
 * 
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 *   const result = yield* ParameterChangeAction.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.ParameterChangeAction): Effect.Effect<string, ParameterChangeActionError> =>
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
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ParameterChangeAction.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ParameterChangeAction.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.ParameterChangeAction): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ParameterChangeAction
 * 
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 *   const result = yield* ParameterChangeAction.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.ParameterChangeAction): Effect.Effect<string, ParameterChangeActionError> =>
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
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ParameterChangeAction.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ParameterChangeAction.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.ParameterChangeAction): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ParameterChangeAction
 * 
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ParameterChangeAction.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
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
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ParameterChangeAction.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ParameterChangeAction.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ParameterChangeAction
 * 
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 *   const result = yield* ParameterChangeAction.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.ParameterChangeAction): Effect.Effect<string, ParameterChangeActionError> =>
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
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ParameterChangeAction.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ParameterChangeAction.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.ParameterChangeAction): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ParameterChangeAction
 * 
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 *   const result = yield* ParameterChangeAction.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.ParameterChangeAction): Effect.Effect<any, ParameterChangeActionError> =>
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
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ParameterChangeAction.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ParameterChangeAction.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.ParameterChangeAction): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ParameterChangeAction
 * 
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ParameterChangeAction.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
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
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ParameterChangeAction.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ParameterChangeAction.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method actionId of ParameterChangeAction
 * 
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 *   const result = yield* ParameterChangeAction.actionId(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const actionId = Effect.fn(
  (instance: CML.ParameterChangeAction): Effect.Effect<CML.GovActionId | undefined, ParameterChangeActionError> =>
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
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ParameterChangeAction.unsafeActionId(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ParameterChangeAction.unsafeActionId failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeActionId = (instance: CML.ParameterChangeAction): CML.GovActionId | undefined =>
  Effect.runSync(actionId(instance));

/**
 * Method update of ParameterChangeAction
 * 
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 *   const result = yield* ParameterChangeAction.update(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const update = Effect.fn(
  (instance: CML.ParameterChangeAction): Effect.Effect<CML.ProtocolParamUpdate, ParameterChangeActionError> =>
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
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ParameterChangeAction.unsafeUpdate(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ParameterChangeAction.unsafeUpdate failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeUpdate = (instance: CML.ParameterChangeAction): CML.ProtocolParamUpdate =>
  Effect.runSync(update(instance));

/**
 * Method policyHash of ParameterChangeAction
 * 
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 *   const result = yield* ParameterChangeAction.policyHash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const policyHash = Effect.fn(
  (instance: CML.ParameterChangeAction): Effect.Effect<CML.ScriptHash | undefined, ParameterChangeActionError> =>
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
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ParameterChangeAction instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ParameterChangeAction.unsafePolicyHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ParameterChangeAction.unsafePolicyHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePolicyHash = (instance: CML.ParameterChangeAction): CML.ScriptHash | undefined =>
  Effect.runSync(policyHash(instance));

/**
 * Static method _new of ParameterChangeAction
 * 
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ParameterChangeAction._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (actionId: CML.GovActionId | undefined, update: CML.ProtocolParamUpdate, policyHash: CML.ScriptHash) {
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
 * @example
 * import { ParameterChangeAction } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ParameterChangeAction.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ParameterChangeAction.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (actionId: CML.GovActionId | undefined, update: CML.ProtocolParamUpdate, policyHash: CML.ScriptHash) =>
  Effect.runSync(_new(actionId, update, policyHash));

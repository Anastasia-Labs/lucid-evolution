/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML NoConfidence class
 *
 * @since 2.0.0
 * @category Types
 */
export type NoConfidence = CML.NoConfidence;

/**
 * Error class for NoConfidence operations
 * 
 * This error is thrown when operations on NoConfidence instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class NoConfidenceError extends Data.TaggedError("NoConfidenceError")<{
  message?: string;
}> {}

/**
 * Method free of NoConfidence
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.NoConfidence) => Effect.Effect<void, NoConfidenceError> = Effect.fn(
  (instance: CML.NoConfidence) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new NoConfidenceError({
          message: `NoConfidence.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.NoConfidence): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of NoConfidence
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.NoConfidence) => Effect.Effect<Uint8Array, NoConfidenceError> = Effect.fn(
  (instance: CML.NoConfidence) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new NoConfidenceError({
          message: `NoConfidence.toCborBytes failed NoConfidence is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.NoConfidence): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of NoConfidence
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.NoConfidence) => Effect.Effect<Uint8Array, NoConfidenceError> = Effect.fn(
  (instance: CML.NoConfidence) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new NoConfidenceError({
          message: `NoConfidence.toCanonicalCborBytes failed NoConfidence is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.NoConfidence): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of NoConfidence
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.NoConfidence, NoConfidenceError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.NoConfidence.from_cbor_bytes(cborBytes),
    catch: () => new NoConfidenceError({
      message: `NoConfidence.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls NoConfidence.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.NoConfidence =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of NoConfidence
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.NoConfidence) => Effect.Effect<string, NoConfidenceError> = Effect.fn(
  (instance: CML.NoConfidence) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new NoConfidenceError({
          message: `NoConfidence.toCborHex failed NoConfidence is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.NoConfidence): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of NoConfidence
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.NoConfidence) => Effect.Effect<string, NoConfidenceError> = Effect.fn(
  (instance: CML.NoConfidence) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new NoConfidenceError({
          message: `NoConfidence.toCanonicalCborHex failed NoConfidence is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.NoConfidence): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of NoConfidence
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.NoConfidence, NoConfidenceError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.NoConfidence.from_cbor_hex(cborBytes),
    catch: () => new NoConfidenceError({
      message: `NoConfidence.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls NoConfidence.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.NoConfidence =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of NoConfidence
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.NoConfidence) => Effect.Effect<string, NoConfidenceError> = Effect.fn(
  (instance: CML.NoConfidence) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new NoConfidenceError({
          message: `NoConfidence.toJson failed NoConfidence is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.NoConfidence): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of NoConfidence
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.NoConfidence) => Effect.Effect<any, NoConfidenceError> = Effect.fn(
  (instance: CML.NoConfidence) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new NoConfidenceError({
          message: `NoConfidence.toJsValue failed NoConfidence is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.NoConfidence): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of NoConfidence
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.NoConfidence, NoConfidenceError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.NoConfidence.from_json(json),
    catch: () => new NoConfidenceError({
      message: `NoConfidence.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls NoConfidence.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.NoConfidence =>
  Effect.runSync(fromJson(json));

/**
 * Method actionId of NoConfidence
 * 
 * @since 2.0.0
 * @category Methods
 */
export const actionId: (instance: CML.NoConfidence) => Effect.Effect<CML.GovActionId | undefined, NoConfidenceError> = Effect.fn(
  (instance: CML.NoConfidence) =>
    Effect.try({
      try: () => instance.action_id(),
      catch: () =>
        new NoConfidenceError({
          message: `NoConfidence.actionId failed `,
        }),
    })
);

/**
 * Unsafely calls instance.actionId without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const actionIdUnsafe = (instance: CML.NoConfidence): CML.GovActionId | undefined =>
  Effect.runSync(actionId(instance));

/**
 * Static method _new of NoConfidence
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (actionId: CML.GovActionId) => Effect.Effect<CML.NoConfidence, NoConfidenceError> = Effect.fn(function* (actionId: CML.GovActionId) {
  return yield* Effect.try({
    try: () => CML.NoConfidence.new(actionId),
    catch: () => new NoConfidenceError({
      message: `NoConfidence._new failed with parameters: ${actionId} (GovActionId). `,
    }),
  });
});

/**
 * Unsafely calls NoConfidence._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (actionId: CML.GovActionId): CML.NoConfidence =>
  Effect.runSync(_new(actionId));

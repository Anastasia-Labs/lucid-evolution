/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ScriptInvalidHereafter class
 *
 * @since 2.0.0
 * @category Types
 */
export type ScriptInvalidHereafter = CML.ScriptInvalidHereafter;

/**
 * Error class for ScriptInvalidHereafter operations
 * 
 * This error is thrown when operations on ScriptInvalidHereafter instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ScriptInvalidHereafterError extends Data.TaggedError("ScriptInvalidHereafterError")<{
  message?: string;
}> {}

/**
 * Method free of ScriptInvalidHereafter
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.ScriptInvalidHereafter) => Effect.Effect<void, ScriptInvalidHereafterError> = Effect.fn(
  (instance: CML.ScriptInvalidHereafter) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptInvalidHereafterError({
          message: `ScriptInvalidHereafter.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ScriptInvalidHereafter): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ScriptInvalidHereafter
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.ScriptInvalidHereafter) => Effect.Effect<Uint8Array, ScriptInvalidHereafterError> = Effect.fn(
  (instance: CML.ScriptInvalidHereafter) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ScriptInvalidHereafterError({
          message: `ScriptInvalidHereafter.toCborBytes failed ScriptInvalidHereafter is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ScriptInvalidHereafter): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ScriptInvalidHereafter
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.ScriptInvalidHereafter) => Effect.Effect<Uint8Array, ScriptInvalidHereafterError> = Effect.fn(
  (instance: CML.ScriptInvalidHereafter) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ScriptInvalidHereafterError({
          message: `ScriptInvalidHereafter.toCanonicalCborBytes failed ScriptInvalidHereafter is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.ScriptInvalidHereafter): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ScriptInvalidHereafter
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.ScriptInvalidHereafter, ScriptInvalidHereafterError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ScriptInvalidHereafter.from_cbor_bytes(cborBytes),
    catch: () => new ScriptInvalidHereafterError({
      message: `ScriptInvalidHereafter.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls ScriptInvalidHereafter.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.ScriptInvalidHereafter =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ScriptInvalidHereafter
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.ScriptInvalidHereafter) => Effect.Effect<string, ScriptInvalidHereafterError> = Effect.fn(
  (instance: CML.ScriptInvalidHereafter) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ScriptInvalidHereafterError({
          message: `ScriptInvalidHereafter.toCborHex failed ScriptInvalidHereafter is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ScriptInvalidHereafter): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ScriptInvalidHereafter
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.ScriptInvalidHereafter) => Effect.Effect<string, ScriptInvalidHereafterError> = Effect.fn(
  (instance: CML.ScriptInvalidHereafter) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ScriptInvalidHereafterError({
          message: `ScriptInvalidHereafter.toCanonicalCborHex failed ScriptInvalidHereafter is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ScriptInvalidHereafter): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ScriptInvalidHereafter
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.ScriptInvalidHereafter, ScriptInvalidHereafterError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ScriptInvalidHereafter.from_cbor_hex(cborBytes),
    catch: () => new ScriptInvalidHereafterError({
      message: `ScriptInvalidHereafter.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls ScriptInvalidHereafter.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.ScriptInvalidHereafter =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ScriptInvalidHereafter
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.ScriptInvalidHereafter) => Effect.Effect<string, ScriptInvalidHereafterError> = Effect.fn(
  (instance: CML.ScriptInvalidHereafter) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ScriptInvalidHereafterError({
          message: `ScriptInvalidHereafter.toJson failed ScriptInvalidHereafter is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ScriptInvalidHereafter): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ScriptInvalidHereafter
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.ScriptInvalidHereafter) => Effect.Effect<any, ScriptInvalidHereafterError> = Effect.fn(
  (instance: CML.ScriptInvalidHereafter) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ScriptInvalidHereafterError({
          message: `ScriptInvalidHereafter.toJsValue failed ScriptInvalidHereafter is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ScriptInvalidHereafter): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ScriptInvalidHereafter
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.ScriptInvalidHereafter, ScriptInvalidHereafterError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ScriptInvalidHereafter.from_json(json),
    catch: () => new ScriptInvalidHereafterError({
      message: `ScriptInvalidHereafter.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls ScriptInvalidHereafter.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.ScriptInvalidHereafter =>
  Effect.runSync(fromJson(json));

/**
 * Method after of ScriptInvalidHereafter
 * 
 * @since 2.0.0
 * @category Methods
 */
export const after: (instance: CML.ScriptInvalidHereafter) => Effect.Effect<bigint, ScriptInvalidHereafterError> = Effect.fn(
  (instance: CML.ScriptInvalidHereafter) =>
    Effect.try({
      try: () => instance.after(),
      catch: () =>
        new ScriptInvalidHereafterError({
          message: `ScriptInvalidHereafter.after failed `,
        }),
    })
);

/**
 * Unsafely calls instance.after without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const afterUnsafe = (instance: CML.ScriptInvalidHereafter): bigint =>
  Effect.runSync(after(instance));

/**
 * Static method _new of ScriptInvalidHereafter
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (after: bigint) => Effect.Effect<CML.ScriptInvalidHereafter, ScriptInvalidHereafterError> = Effect.fn(function* (after: bigint) {
  return yield* Effect.try({
    try: () => CML.ScriptInvalidHereafter.new(after),
    catch: () => new ScriptInvalidHereafterError({
      message: `ScriptInvalidHereafter._new failed with parameters: ${after}. `,
    }),
  });
});

/**
 * Unsafely calls ScriptInvalidHereafter._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (after: bigint): CML.ScriptInvalidHereafter =>
  Effect.runSync(_new(after));

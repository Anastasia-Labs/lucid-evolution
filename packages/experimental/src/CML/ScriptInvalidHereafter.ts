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
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptInvalidHereafter instance
 * const instance = ... ;
 *   const result = yield* ScriptInvalidHereafter.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ScriptInvalidHereafter): Effect.Effect<void, ScriptInvalidHereafterError> =>
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
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptInvalidHereafter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptInvalidHereafter.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptInvalidHereafter.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ScriptInvalidHereafter): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ScriptInvalidHereafter
 * 
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptInvalidHereafter instance
 * const instance = ... ;
 *   const result = yield* ScriptInvalidHereafter.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.ScriptInvalidHereafter): Effect.Effect<Uint8Array, ScriptInvalidHereafterError> =>
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
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptInvalidHereafter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptInvalidHereafter.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptInvalidHereafter.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ScriptInvalidHereafter): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ScriptInvalidHereafter
 * 
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptInvalidHereafter instance
 * const instance = ... ;
 *   const result = yield* ScriptInvalidHereafter.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.ScriptInvalidHereafter): Effect.Effect<Uint8Array, ScriptInvalidHereafterError> =>
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
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptInvalidHereafter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptInvalidHereafter.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptInvalidHereafter.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.ScriptInvalidHereafter): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ScriptInvalidHereafter
 * 
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ScriptInvalidHereafter.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
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
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptInvalidHereafter.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptInvalidHereafter.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ScriptInvalidHereafter
 * 
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptInvalidHereafter instance
 * const instance = ... ;
 *   const result = yield* ScriptInvalidHereafter.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.ScriptInvalidHereafter): Effect.Effect<string, ScriptInvalidHereafterError> =>
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
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptInvalidHereafter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptInvalidHereafter.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptInvalidHereafter.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ScriptInvalidHereafter): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ScriptInvalidHereafter
 * 
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptInvalidHereafter instance
 * const instance = ... ;
 *   const result = yield* ScriptInvalidHereafter.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.ScriptInvalidHereafter): Effect.Effect<string, ScriptInvalidHereafterError> =>
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
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptInvalidHereafter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptInvalidHereafter.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptInvalidHereafter.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ScriptInvalidHereafter): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ScriptInvalidHereafter
 * 
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ScriptInvalidHereafter.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
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
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptInvalidHereafter.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptInvalidHereafter.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ScriptInvalidHereafter
 * 
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptInvalidHereafter instance
 * const instance = ... ;
 *   const result = yield* ScriptInvalidHereafter.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.ScriptInvalidHereafter): Effect.Effect<string, ScriptInvalidHereafterError> =>
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
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptInvalidHereafter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptInvalidHereafter.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptInvalidHereafter.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ScriptInvalidHereafter): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ScriptInvalidHereafter
 * 
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptInvalidHereafter instance
 * const instance = ... ;
 *   const result = yield* ScriptInvalidHereafter.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.ScriptInvalidHereafter): Effect.Effect<any, ScriptInvalidHereafterError> =>
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
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptInvalidHereafter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptInvalidHereafter.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptInvalidHereafter.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ScriptInvalidHereafter): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ScriptInvalidHereafter
 * 
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ScriptInvalidHereafter.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
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
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptInvalidHereafter.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptInvalidHereafter.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method after of ScriptInvalidHereafter
 * 
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptInvalidHereafter instance
 * const instance = ... ;
 *   const result = yield* ScriptInvalidHereafter.after(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const after = Effect.fn(
  (instance: CML.ScriptInvalidHereafter): Effect.Effect<bigint, ScriptInvalidHereafterError> =>
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
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptInvalidHereafter instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptInvalidHereafter.afterUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptInvalidHereafter.afterUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const afterUnsafe = (instance: CML.ScriptInvalidHereafter): bigint =>
  Effect.runSync(after(instance));

/**
 * Static method _new of ScriptInvalidHereafter
 * 
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ScriptInvalidHereafter._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (after: bigint) {
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
 * @example
 * import { ScriptInvalidHereafter } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptInvalidHereafter._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptInvalidHereafter._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (after: bigint) =>
  Effect.runSync(_new(after));

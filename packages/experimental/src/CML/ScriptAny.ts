/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ScriptAny class
 *
 * @since 2.0.0
 * @category Types
 */
export type ScriptAny = CML.ScriptAny;

/**
 * Error class for ScriptAny operations
 *
 * This error is thrown when operations on ScriptAny instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ScriptAnyError extends Data.TaggedError("ScriptAnyError")<{
  message?: string;
}> {}

/**
 * Method free of ScriptAny
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptAny instance
 * const instance = ... ;
 *   const result = yield* ScriptAny.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ScriptAny): Effect.Effect<void, ScriptAnyError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptAnyError({
          message: `ScriptAny.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptAny instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAny.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ScriptAny): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ScriptAny
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptAny instance
 * const instance = ... ;
 *   const result = yield* ScriptAny.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.ScriptAny): Effect.Effect<Uint8Array, ScriptAnyError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ScriptAnyError({
          message: `ScriptAny.toCborBytes failed ScriptAny is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptAny instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAny.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ScriptAny): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ScriptAny
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptAny instance
 * const instance = ... ;
 *   const result = yield* ScriptAny.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.ScriptAny): Effect.Effect<Uint8Array, ScriptAnyError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ScriptAnyError({
          message: `ScriptAny.toCanonicalCborBytes failed ScriptAny is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptAny instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAny.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.ScriptAny,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ScriptAny
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptAny.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ScriptAny.from_cbor_bytes(cborBytes),
    catch: () =>
      new ScriptAnyError({
        message: `ScriptAny.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ScriptAny.fromCborBytes without Effect wrapper
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAny.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ScriptAny
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptAny instance
 * const instance = ... ;
 *   const result = yield* ScriptAny.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.ScriptAny): Effect.Effect<string, ScriptAnyError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ScriptAnyError({
          message: `ScriptAny.toCborHex failed ScriptAny is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptAny instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAny.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ScriptAny): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ScriptAny
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptAny instance
 * const instance = ... ;
 *   const result = yield* ScriptAny.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.ScriptAny): Effect.Effect<string, ScriptAnyError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ScriptAnyError({
          message: `ScriptAny.toCanonicalCborHex failed ScriptAny is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptAny instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAny.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ScriptAny): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ScriptAny
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptAny.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ScriptAny.from_cbor_hex(cborBytes),
    catch: () =>
      new ScriptAnyError({
        message: `ScriptAny.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls ScriptAny.fromCborHex without Effect wrapper
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAny.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ScriptAny
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptAny instance
 * const instance = ... ;
 *   const result = yield* ScriptAny.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.ScriptAny): Effect.Effect<string, ScriptAnyError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ScriptAnyError({
          message: `ScriptAny.toJson failed ScriptAny is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptAny instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAny.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ScriptAny): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ScriptAny
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptAny instance
 * const instance = ... ;
 *   const result = yield* ScriptAny.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.ScriptAny): Effect.Effect<any, ScriptAnyError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ScriptAnyError({
          message: `ScriptAny.toJsValue failed ScriptAny is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptAny instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAny.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ScriptAny): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ScriptAny
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptAny.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ScriptAny.from_json(json),
    catch: () =>
      new ScriptAnyError({
        message: `ScriptAny.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls ScriptAny.fromJson without Effect wrapper
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAny.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method nativeScripts of ScriptAny
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptAny instance
 * const instance = ... ;
 *   const result = yield* ScriptAny.nativeScripts(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const nativeScripts = Effect.fn(
  (
    instance: CML.ScriptAny,
  ): Effect.Effect<CML.NativeScriptList, ScriptAnyError> =>
    Effect.try({
      try: () => instance.native_scripts(),
      catch: () =>
        new ScriptAnyError({
          message: `ScriptAny.nativeScripts failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.nativeScripts without Effect wrapper
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptAny instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAny.nativeScriptsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.nativeScriptsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nativeScriptsUnsafe = (
  instance: CML.ScriptAny,
): CML.NativeScriptList => Effect.runSync(nativeScripts(instance));

/**
 * Static method _new of ScriptAny
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptAny._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (nativeScripts: CML.NativeScriptList) {
  return yield* Effect.try({
    try: () => CML.ScriptAny.new(nativeScripts),
    catch: () =>
      new ScriptAnyError({
        message: `ScriptAny._new failed with parameters: ${nativeScripts} (NativeScriptList). `,
      }),
  });
});

/**
 * Unsafely calls ScriptAny._new without Effect wrapper
 *
 * @example
 * import { ScriptAny } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAny._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (nativeScripts: CML.NativeScriptList) =>
  Effect.runSync(_new(nativeScripts));

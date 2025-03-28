import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ScriptAny = CML.ScriptAny;

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
    })
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
 *   const result = ScriptAny.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ScriptAny): void =>
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
    })
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
 *   const result = ScriptAny.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.ScriptAny): Uint8Array =>
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
    })
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
 *   const result = ScriptAny.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.ScriptAny): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

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
    catch: () => new ScriptAnyError({
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
 *   const result = ScriptAny.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
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
    })
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
 *   const result = ScriptAny.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.ScriptAny): string =>
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
    })
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
 *   const result = ScriptAny.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.ScriptAny): string =>
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
    catch: () => new ScriptAnyError({
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
 *   const result = ScriptAny.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
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
    })
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
 *   const result = ScriptAny.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.ScriptAny): string =>
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
    })
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
 *   const result = ScriptAny.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.ScriptAny): any =>
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
    catch: () => new ScriptAnyError({
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
 *   const result = ScriptAny.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

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
  (instance: CML.ScriptAny): Effect.Effect<CML.NativeScriptList, ScriptAnyError> =>
    Effect.try({
      try: () => instance.native_scripts(),
      catch: () =>
        new ScriptAnyError({
          message: `ScriptAny.nativeScripts failed `,
        }),
    })
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
 *   const result = ScriptAny.unsafeNativeScripts(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.unsafeNativeScripts failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeNativeScripts = (instance: CML.ScriptAny): CML.NativeScriptList =>
  Effect.runSync(nativeScripts(instance));

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
    catch: () => new ScriptAnyError({
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
 *   const result = ScriptAny.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAny.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (nativeScripts: CML.NativeScriptList) =>
  Effect.runSync(_new(nativeScripts));

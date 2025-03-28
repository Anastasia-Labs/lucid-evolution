import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ScriptAll = CML.ScriptAll;

export class ScriptAllError extends Data.TaggedError("ScriptAllError")<{
  message?: string;
}> {}

/**
 * Method free of ScriptAll
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptAll instance
 * const instance = ... ;
 *   const result = yield* ScriptAll.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ScriptAll): Effect.Effect<void, ScriptAllError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptAllError({
          message: `ScriptAll.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptAll instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAll.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAll.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ScriptAll): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ScriptAll
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptAll instance
 * const instance = ... ;
 *   const result = yield* ScriptAll.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.ScriptAll): Effect.Effect<Uint8Array, ScriptAllError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ScriptAllError({
          message: `ScriptAll.toCborBytes failed ScriptAll is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptAll instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAll.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAll.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.ScriptAll): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ScriptAll
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptAll instance
 * const instance = ... ;
 *   const result = yield* ScriptAll.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.ScriptAll): Effect.Effect<Uint8Array, ScriptAllError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ScriptAllError({
          message: `ScriptAll.toCanonicalCborBytes failed ScriptAll is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptAll instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAll.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAll.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.ScriptAll,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ScriptAll
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptAll.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ScriptAll.from_cbor_bytes(cborBytes),
    catch: () =>
      new ScriptAllError({
        message: `ScriptAll.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ScriptAll.fromCborBytes without Effect wrapper
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAll.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAll.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ScriptAll
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptAll instance
 * const instance = ... ;
 *   const result = yield* ScriptAll.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.ScriptAll): Effect.Effect<string, ScriptAllError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ScriptAllError({
          message: `ScriptAll.toCborHex failed ScriptAll is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptAll instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAll.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAll.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.ScriptAll): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ScriptAll
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptAll instance
 * const instance = ... ;
 *   const result = yield* ScriptAll.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.ScriptAll): Effect.Effect<string, ScriptAllError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ScriptAllError({
          message: `ScriptAll.toCanonicalCborHex failed ScriptAll is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptAll instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAll.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAll.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.ScriptAll): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ScriptAll
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptAll.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ScriptAll.from_cbor_hex(cborBytes),
    catch: () =>
      new ScriptAllError({
        message: `ScriptAll.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls ScriptAll.fromCborHex without Effect wrapper
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAll.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAll.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ScriptAll
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptAll instance
 * const instance = ... ;
 *   const result = yield* ScriptAll.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.ScriptAll): Effect.Effect<string, ScriptAllError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ScriptAllError({
          message: `ScriptAll.toJson failed ScriptAll is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptAll instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAll.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAll.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.ScriptAll): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ScriptAll
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptAll instance
 * const instance = ... ;
 *   const result = yield* ScriptAll.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.ScriptAll): Effect.Effect<any, ScriptAllError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ScriptAllError({
          message: `ScriptAll.toJsValue failed ScriptAll is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptAll instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAll.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAll.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.ScriptAll): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ScriptAll
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptAll.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ScriptAll.from_json(json),
    catch: () =>
      new ScriptAllError({
        message: `ScriptAll.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls ScriptAll.fromJson without Effect wrapper
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAll.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAll.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method nativeScripts of ScriptAll
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptAll instance
 * const instance = ... ;
 *   const result = yield* ScriptAll.nativeScripts(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const nativeScripts = Effect.fn(
  (
    instance: CML.ScriptAll,
  ): Effect.Effect<CML.NativeScriptList, ScriptAllError> =>
    Effect.try({
      try: () => instance.native_scripts(),
      catch: () =>
        new ScriptAllError({
          message: `ScriptAll.nativeScripts failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.nativeScripts without Effect wrapper
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptAll instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAll.unsafeNativeScripts(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAll.unsafeNativeScripts failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeNativeScripts = (
  instance: CML.ScriptAll,
): CML.NativeScriptList => Effect.runSync(nativeScripts(instance));

/**
 * Static method _new of ScriptAll
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptAll._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (nativeScripts: CML.NativeScriptList) {
  return yield* Effect.try({
    try: () => CML.ScriptAll.new(nativeScripts),
    catch: () =>
      new ScriptAllError({
        message: `ScriptAll._new failed with parameters: ${nativeScripts} (NativeScriptList). `,
      }),
  });
});

/**
 * Unsafely calls ScriptAll._new without Effect wrapper
 *
 * @example
 * import { ScriptAll } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptAll.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptAll.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (nativeScripts: CML.NativeScriptList) =>
  Effect.runSync(_new(nativeScripts));

import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ScriptNOfK = CML.ScriptNOfK;

export class ScriptNOfKError extends Data.TaggedError("ScriptNOfKError")<{
  message?: string;
}> {}

/**
 * Method free of ScriptNOfK
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 *   const result = yield* ScriptNOfK.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ScriptNOfK): Effect.Effect<void, ScriptNOfKError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptNOfK.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptNOfK.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ScriptNOfK): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ScriptNOfK
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 *   const result = yield* ScriptNOfK.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.ScriptNOfK): Effect.Effect<Uint8Array, ScriptNOfKError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.toCborBytes failed ScriptNOfK is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptNOfK.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptNOfK.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.ScriptNOfK): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ScriptNOfK
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 *   const result = yield* ScriptNOfK.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.ScriptNOfK): Effect.Effect<Uint8Array, ScriptNOfKError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.toCanonicalCborBytes failed ScriptNOfK is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptNOfK.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptNOfK.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.ScriptNOfK): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ScriptNOfK
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ScriptNOfK.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ScriptNOfK.from_cbor_bytes(cborBytes),
    catch: () => new ScriptNOfKError({
      message: `ScriptNOfK.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls ScriptNOfK.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptNOfK.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptNOfK.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ScriptNOfK
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 *   const result = yield* ScriptNOfK.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.ScriptNOfK): Effect.Effect<string, ScriptNOfKError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.toCborHex failed ScriptNOfK is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptNOfK.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptNOfK.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.ScriptNOfK): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ScriptNOfK
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 *   const result = yield* ScriptNOfK.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.ScriptNOfK): Effect.Effect<string, ScriptNOfKError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.toCanonicalCborHex failed ScriptNOfK is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptNOfK.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptNOfK.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.ScriptNOfK): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ScriptNOfK
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ScriptNOfK.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ScriptNOfK.from_cbor_hex(cborBytes),
    catch: () => new ScriptNOfKError({
      message: `ScriptNOfK.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls ScriptNOfK.fromCborHex without Effect wrapper
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptNOfK.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptNOfK.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ScriptNOfK
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 *   const result = yield* ScriptNOfK.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.ScriptNOfK): Effect.Effect<string, ScriptNOfKError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.toJson failed ScriptNOfK is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptNOfK.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptNOfK.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.ScriptNOfK): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ScriptNOfK
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 *   const result = yield* ScriptNOfK.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.ScriptNOfK): Effect.Effect<any, ScriptNOfKError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.toJsValue failed ScriptNOfK is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptNOfK.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptNOfK.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.ScriptNOfK): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ScriptNOfK
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ScriptNOfK.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ScriptNOfK.from_json(json),
    catch: () => new ScriptNOfKError({
      message: `ScriptNOfK.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls ScriptNOfK.fromJson without Effect wrapper
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptNOfK.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptNOfK.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method n of ScriptNOfK
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 *   const result = yield* ScriptNOfK.n(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const n = Effect.fn(
  (instance: CML.ScriptNOfK): Effect.Effect<bigint, ScriptNOfKError> =>
    Effect.try({
      try: () => instance.n(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.n failed `,
        }),
    })
);

/**
 * Unsafely calls instance.n without Effect wrapper
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptNOfK.unsafeN(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptNOfK.unsafeN failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeN = (instance: CML.ScriptNOfK): bigint =>
  Effect.runSync(n(instance));

/**
 * Method nativeScripts of ScriptNOfK
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 *   const result = yield* ScriptNOfK.nativeScripts(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const nativeScripts = Effect.fn(
  (instance: CML.ScriptNOfK): Effect.Effect<CML.NativeScriptList, ScriptNOfKError> =>
    Effect.try({
      try: () => instance.native_scripts(),
      catch: () =>
        new ScriptNOfKError({
          message: `ScriptNOfK.nativeScripts failed `,
        }),
    })
);

/**
 * Unsafely calls instance.nativeScripts without Effect wrapper
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ScriptNOfK instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptNOfK.unsafeNativeScripts(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptNOfK.unsafeNativeScripts failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeNativeScripts = (instance: CML.ScriptNOfK): CML.NativeScriptList =>
  Effect.runSync(nativeScripts(instance));

/**
 * Static method _new of ScriptNOfK
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ScriptNOfK._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (n: bigint, nativeScripts: CML.NativeScriptList) {
  return yield* Effect.try({
    try: () => CML.ScriptNOfK.new(n, nativeScripts),
    catch: () => new ScriptNOfKError({
      message: `ScriptNOfK._new failed with parameters: ${n}, ${nativeScripts} (NativeScriptList). `,
    }),
  });
});

/**
 * Unsafely calls ScriptNOfK._new without Effect wrapper
 * 
 * @example
 * import { ScriptNOfK } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptNOfK.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptNOfK.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (n: bigint, nativeScripts: CML.NativeScriptList) =>
  Effect.runSync(_new(n, nativeScripts));

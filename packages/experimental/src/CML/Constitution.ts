/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Constitution class
 *
 * @since 2.0.0
 * @category Types
 */
export type Constitution = CML.Constitution;

/**
 * Error class for Constitution operations
 * 
 * This error is thrown when operations on Constitution instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ConstitutionError extends Data.TaggedError("ConstitutionError")<{
  message?: string;
}> {}

/**
 * Method free of Constitution
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Constitution instance
 * const instance = ... ;
 *   const result = yield* Constitution.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Constitution): Effect.Effect<void, ConstitutionError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Constitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Constitution.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Constitution.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Constitution): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Constitution
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Constitution instance
 * const instance = ... ;
 *   const result = yield* Constitution.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Constitution): Effect.Effect<Uint8Array, ConstitutionError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.toCborBytes failed Constitution is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Constitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Constitution.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Constitution.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Constitution): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Constitution
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Constitution instance
 * const instance = ... ;
 *   const result = yield* Constitution.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Constitution): Effect.Effect<Uint8Array, ConstitutionError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.toCanonicalCborBytes failed Constitution is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Constitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Constitution.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Constitution.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Constitution): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Constitution
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Constitution.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Constitution.from_cbor_bytes(cborBytes),
    catch: () => new ConstitutionError({
      message: `Constitution.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Constitution.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Constitution.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Constitution.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Constitution
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Constitution instance
 * const instance = ... ;
 *   const result = yield* Constitution.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Constitution): Effect.Effect<string, ConstitutionError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.toCborHex failed Constitution is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Constitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Constitution.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Constitution.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Constitution): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Constitution
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Constitution instance
 * const instance = ... ;
 *   const result = yield* Constitution.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Constitution): Effect.Effect<string, ConstitutionError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.toCanonicalCborHex failed Constitution is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Constitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Constitution.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Constitution.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Constitution): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Constitution
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Constitution.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Constitution.from_cbor_hex(cborBytes),
    catch: () => new ConstitutionError({
      message: `Constitution.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls Constitution.fromCborHex without Effect wrapper
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Constitution.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Constitution.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Constitution
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Constitution instance
 * const instance = ... ;
 *   const result = yield* Constitution.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Constitution): Effect.Effect<string, ConstitutionError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.toJson failed Constitution is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Constitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Constitution.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Constitution.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Constitution): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Constitution
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Constitution instance
 * const instance = ... ;
 *   const result = yield* Constitution.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Constitution): Effect.Effect<any, ConstitutionError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.toJsValue failed Constitution is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Constitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Constitution.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Constitution.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Constitution): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Constitution
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Constitution.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Constitution.from_json(json),
    catch: () => new ConstitutionError({
      message: `Constitution.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Constitution.fromJson without Effect wrapper
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Constitution.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Constitution.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method anchor of Constitution
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Constitution instance
 * const instance = ... ;
 *   const result = yield* Constitution.anchor(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const anchor = Effect.fn(
  (instance: CML.Constitution): Effect.Effect<CML.Anchor, ConstitutionError> =>
    Effect.try({
      try: () => instance.anchor(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.anchor failed `,
        }),
    })
);

/**
 * Unsafely calls instance.anchor without Effect wrapper
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Constitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Constitution.anchorUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Constitution.anchorUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const anchorUnsafe = (instance: CML.Constitution): CML.Anchor =>
  Effect.runSync(anchor(instance));

/**
 * Method scriptHash of Constitution
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Constitution instance
 * const instance = ... ;
 *   const result = yield* Constitution.scriptHash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const scriptHash = Effect.fn(
  (instance: CML.Constitution): Effect.Effect<CML.ScriptHash | undefined, ConstitutionError> =>
    Effect.try({
      try: () => instance.script_hash(),
      catch: () =>
        new ConstitutionError({
          message: `Constitution.scriptHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.scriptHash without Effect wrapper
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Constitution instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Constitution.scriptHashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Constitution.scriptHashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const scriptHashUnsafe = (instance: CML.Constitution): CML.ScriptHash | undefined =>
  Effect.runSync(scriptHash(instance));

/**
 * Static method _new of Constitution
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Constitution._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (anchor: CML.Anchor, scriptHash: CML.ScriptHash) {
  return yield* Effect.try({
    try: () => CML.Constitution.new(anchor, scriptHash),
    catch: () => new ConstitutionError({
      message: `Constitution._new failed with parameters: ${anchor} (Anchor), ${scriptHash} (ScriptHash). `,
    }),
  });
});

/**
 * Unsafely calls Constitution._new without Effect wrapper
 * 
 * @example
 * import { Constitution } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Constitution._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Constitution._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (anchor: CML.Anchor, scriptHash: CML.ScriptHash) =>
  Effect.runSync(_new(anchor, scriptHash));

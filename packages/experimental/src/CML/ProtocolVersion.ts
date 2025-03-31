/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ProtocolVersion class
 *
 * @since 2.0.0
 * @category Types
 */
export type ProtocolVersion = CML.ProtocolVersion;

/**
 * Error class for ProtocolVersion operations
 * 
 * This error is thrown when operations on ProtocolVersion instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ProtocolVersionError extends Data.TaggedError("ProtocolVersionError")<{
  message?: string;
}> {}

/**
 * Method free of ProtocolVersion
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 *   const result = yield* ProtocolVersion.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ProtocolVersion): Effect.Effect<void, ProtocolVersionError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolVersion.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolVersion.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ProtocolVersion): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ProtocolVersion
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 *   const result = yield* ProtocolVersion.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.ProtocolVersion): Effect.Effect<Uint8Array, ProtocolVersionError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.toCborBytes failed ProtocolVersion is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolVersion.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolVersion.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ProtocolVersion): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ProtocolVersion
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 *   const result = yield* ProtocolVersion.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.ProtocolVersion): Effect.Effect<Uint8Array, ProtocolVersionError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.toCanonicalCborBytes failed ProtocolVersion is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolVersion.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolVersion.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.ProtocolVersion): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ProtocolVersion
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ProtocolVersion.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ProtocolVersion.from_cbor_bytes(cborBytes),
    catch: () => new ProtocolVersionError({
      message: `ProtocolVersion.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls ProtocolVersion.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolVersion.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolVersion.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ProtocolVersion
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 *   const result = yield* ProtocolVersion.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.ProtocolVersion): Effect.Effect<string, ProtocolVersionError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.toCborHex failed ProtocolVersion is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolVersion.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolVersion.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ProtocolVersion): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ProtocolVersion
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 *   const result = yield* ProtocolVersion.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.ProtocolVersion): Effect.Effect<string, ProtocolVersionError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.toCanonicalCborHex failed ProtocolVersion is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolVersion.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolVersion.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ProtocolVersion): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ProtocolVersion
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ProtocolVersion.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ProtocolVersion.from_cbor_hex(cborBytes),
    catch: () => new ProtocolVersionError({
      message: `ProtocolVersion.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls ProtocolVersion.fromCborHex without Effect wrapper
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolVersion.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolVersion.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ProtocolVersion
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 *   const result = yield* ProtocolVersion.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.ProtocolVersion): Effect.Effect<string, ProtocolVersionError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.toJson failed ProtocolVersion is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolVersion.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolVersion.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ProtocolVersion): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ProtocolVersion
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 *   const result = yield* ProtocolVersion.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.ProtocolVersion): Effect.Effect<any, ProtocolVersionError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.toJsValue failed ProtocolVersion is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolVersion.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolVersion.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ProtocolVersion): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ProtocolVersion
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ProtocolVersion.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ProtocolVersion.from_json(json),
    catch: () => new ProtocolVersionError({
      message: `ProtocolVersion.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls ProtocolVersion.fromJson without Effect wrapper
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolVersion.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolVersion.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method major of ProtocolVersion
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 *   const result = yield* ProtocolVersion.major(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const major = Effect.fn(
  (instance: CML.ProtocolVersion): Effect.Effect<bigint, ProtocolVersionError> =>
    Effect.try({
      try: () => instance.major(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.major failed `,
        }),
    })
);

/**
 * Unsafely calls instance.major without Effect wrapper
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolVersion.majorUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolVersion.majorUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const majorUnsafe = (instance: CML.ProtocolVersion): bigint =>
  Effect.runSync(major(instance));

/**
 * Method minor of ProtocolVersion
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 *   const result = yield* ProtocolVersion.minor(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const minor = Effect.fn(
  (instance: CML.ProtocolVersion): Effect.Effect<bigint, ProtocolVersionError> =>
    Effect.try({
      try: () => instance.minor(),
      catch: () =>
        new ProtocolVersionError({
          message: `ProtocolVersion.minor failed `,
        }),
    })
);

/**
 * Unsafely calls instance.minor without Effect wrapper
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolVersion instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolVersion.minorUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolVersion.minorUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const minorUnsafe = (instance: CML.ProtocolVersion): bigint =>
  Effect.runSync(minor(instance));

/**
 * Static method _new of ProtocolVersion
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ProtocolVersion._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (major: bigint, minor: bigint) {
  return yield* Effect.try({
    try: () => CML.ProtocolVersion.new(major, minor),
    catch: () => new ProtocolVersionError({
      message: `ProtocolVersion._new failed with parameters: ${major}, ${minor}. `,
    }),
  });
});

/**
 * Unsafely calls ProtocolVersion._new without Effect wrapper
 * 
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolVersion._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolVersion._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (major: bigint, minor: bigint) =>
  Effect.runSync(_new(major, minor));

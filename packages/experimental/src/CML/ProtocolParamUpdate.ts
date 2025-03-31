/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ProtocolParamUpdate class
 *
 * @since 2.0.0
 * @category Types
 */
export type ProtocolParamUpdate = CML.ProtocolParamUpdate;

/**
 * Error class for ProtocolParamUpdate operations
 * 
 * This error is thrown when operations on ProtocolParamUpdate instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ProtocolParamUpdateError extends Data.TaggedError("ProtocolParamUpdateError")<{
  message?: string;
}> {}

/**
 * Method free of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ProtocolParamUpdate): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<Uint8Array, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toCborBytes failed ProtocolParamUpdate is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ProtocolParamUpdate): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<Uint8Array, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toCanonicalCborBytes failed ProtocolParamUpdate is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.ProtocolParamUpdate): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ProtocolParamUpdate.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ProtocolParamUpdate.from_cbor_bytes(cborBytes),
    catch: () => new ProtocolParamUpdateError({
      message: `ProtocolParamUpdate.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls ProtocolParamUpdate.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<string, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toCborHex failed ProtocolParamUpdate is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ProtocolParamUpdate): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<string, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toCanonicalCborHex failed ProtocolParamUpdate is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ProtocolParamUpdate): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ProtocolParamUpdate.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ProtocolParamUpdate.from_cbor_hex(cborBytes),
    catch: () => new ProtocolParamUpdateError({
      message: `ProtocolParamUpdate.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls ProtocolParamUpdate.fromCborHex without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<string, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toJson failed ProtocolParamUpdate is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ProtocolParamUpdate): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<any, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toJsValue failed ProtocolParamUpdate is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ProtocolParamUpdate): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ProtocolParamUpdate.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ProtocolParamUpdate.from_json(json),
    catch: () => new ProtocolParamUpdateError({
      message: `ProtocolParamUpdate.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls ProtocolParamUpdate.fromJson without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method setMinfeeA of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setMinfeeA(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMinfeeA = Effect.fn(
  (instance: CML.ProtocolParamUpdate, minfeeA: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_minfee_a(minfeeA),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMinfeeA failed with parameters: ${minfeeA}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMinfeeA without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setMinfeeAUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setMinfeeAUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMinfeeAUnsafe = (instance: CML.ProtocolParamUpdate, minfeeA: bigint): void =>
  Effect.runSync(setMinfeeA(instance, minfeeA));

/**
 * Method minfeeA of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.minfeeA(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const minfeeA = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.minfee_a(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.minfeeA failed `,
        }),
    })
);

/**
 * Unsafely calls instance.minfeeA without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.minfeeAUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.minfeeAUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const minfeeAUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(minfeeA(instance));

/**
 * Method setMinfeeB of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setMinfeeB(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMinfeeB = Effect.fn(
  (instance: CML.ProtocolParamUpdate, minfeeB: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_minfee_b(minfeeB),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMinfeeB failed with parameters: ${minfeeB}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMinfeeB without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setMinfeeBUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setMinfeeBUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMinfeeBUnsafe = (instance: CML.ProtocolParamUpdate, minfeeB: bigint): void =>
  Effect.runSync(setMinfeeB(instance, minfeeB));

/**
 * Method minfeeB of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.minfeeB(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const minfeeB = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.minfee_b(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.minfeeB failed `,
        }),
    })
);

/**
 * Unsafely calls instance.minfeeB without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.minfeeBUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.minfeeBUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const minfeeBUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(minfeeB(instance));

/**
 * Method setMaxBlockBodySize of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setMaxBlockBodySize(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMaxBlockBodySize = Effect.fn(
  (instance: CML.ProtocolParamUpdate, maxBlockBodySize: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_max_block_body_size(maxBlockBodySize),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxBlockBodySize failed with parameters: ${maxBlockBodySize}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMaxBlockBodySize without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setMaxBlockBodySizeUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setMaxBlockBodySizeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMaxBlockBodySizeUnsafe = (instance: CML.ProtocolParamUpdate, maxBlockBodySize: bigint): void =>
  Effect.runSync(setMaxBlockBodySize(instance, maxBlockBodySize));

/**
 * Method maxBlockBodySize of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.maxBlockBodySize(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxBlockBodySize = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.max_block_body_size(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxBlockBodySize failed `,
        }),
    })
);

/**
 * Unsafely calls instance.maxBlockBodySize without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.maxBlockBodySizeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.maxBlockBodySizeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxBlockBodySizeUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(maxBlockBodySize(instance));

/**
 * Method setMaxTransactionSize of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setMaxTransactionSize(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMaxTransactionSize = Effect.fn(
  (instance: CML.ProtocolParamUpdate, maxTransactionSize: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_max_transaction_size(maxTransactionSize),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxTransactionSize failed with parameters: ${maxTransactionSize}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMaxTransactionSize without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setMaxTransactionSizeUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setMaxTransactionSizeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMaxTransactionSizeUnsafe = (instance: CML.ProtocolParamUpdate, maxTransactionSize: bigint): void =>
  Effect.runSync(setMaxTransactionSize(instance, maxTransactionSize));

/**
 * Method maxTransactionSize of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.maxTransactionSize(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxTransactionSize = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.max_transaction_size(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxTransactionSize failed `,
        }),
    })
);

/**
 * Unsafely calls instance.maxTransactionSize without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.maxTransactionSizeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.maxTransactionSizeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxTransactionSizeUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(maxTransactionSize(instance));

/**
 * Method setMaxBlockHeaderSize of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setMaxBlockHeaderSize(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMaxBlockHeaderSize = Effect.fn(
  (instance: CML.ProtocolParamUpdate, maxBlockHeaderSize: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_max_block_header_size(maxBlockHeaderSize),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxBlockHeaderSize failed with parameters: ${maxBlockHeaderSize}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMaxBlockHeaderSize without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setMaxBlockHeaderSizeUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setMaxBlockHeaderSizeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMaxBlockHeaderSizeUnsafe = (instance: CML.ProtocolParamUpdate, maxBlockHeaderSize: bigint): void =>
  Effect.runSync(setMaxBlockHeaderSize(instance, maxBlockHeaderSize));

/**
 * Method maxBlockHeaderSize of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.maxBlockHeaderSize(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxBlockHeaderSize = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.max_block_header_size(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxBlockHeaderSize failed `,
        }),
    })
);

/**
 * Unsafely calls instance.maxBlockHeaderSize without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.maxBlockHeaderSizeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.maxBlockHeaderSizeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxBlockHeaderSizeUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(maxBlockHeaderSize(instance));

/**
 * Method setKeyDeposit of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setKeyDeposit(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setKeyDeposit = Effect.fn(
  (instance: CML.ProtocolParamUpdate, keyDeposit: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_key_deposit(keyDeposit),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setKeyDeposit failed with parameters: ${keyDeposit}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setKeyDeposit without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setKeyDepositUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setKeyDepositUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setKeyDepositUnsafe = (instance: CML.ProtocolParamUpdate, keyDeposit: bigint): void =>
  Effect.runSync(setKeyDeposit(instance, keyDeposit));

/**
 * Method keyDeposit of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.keyDeposit(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keyDeposit = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.key_deposit(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.keyDeposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.keyDeposit without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.keyDepositUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.keyDepositUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keyDepositUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(keyDeposit(instance));

/**
 * Method setPoolDeposit of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setPoolDeposit(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setPoolDeposit = Effect.fn(
  (instance: CML.ProtocolParamUpdate, poolDeposit: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_pool_deposit(poolDeposit),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setPoolDeposit failed with parameters: ${poolDeposit}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setPoolDeposit without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setPoolDepositUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setPoolDepositUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPoolDepositUnsafe = (instance: CML.ProtocolParamUpdate, poolDeposit: bigint): void =>
  Effect.runSync(setPoolDeposit(instance, poolDeposit));

/**
 * Method poolDeposit of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.poolDeposit(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const poolDeposit = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.pool_deposit(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.poolDeposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.poolDeposit without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.poolDepositUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.poolDepositUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolDepositUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(poolDeposit(instance));

/**
 * Method setMaximumEpoch of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setMaximumEpoch(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMaximumEpoch = Effect.fn(
  (instance: CML.ProtocolParamUpdate, maximumEpoch: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_maximum_epoch(maximumEpoch),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaximumEpoch failed with parameters: ${maximumEpoch}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMaximumEpoch without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setMaximumEpochUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setMaximumEpochUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMaximumEpochUnsafe = (instance: CML.ProtocolParamUpdate, maximumEpoch: bigint): void =>
  Effect.runSync(setMaximumEpoch(instance, maximumEpoch));

/**
 * Method maximumEpoch of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.maximumEpoch(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maximumEpoch = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.maximum_epoch(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maximumEpoch failed `,
        }),
    })
);

/**
 * Unsafely calls instance.maximumEpoch without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.maximumEpochUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.maximumEpochUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maximumEpochUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(maximumEpoch(instance));

/**
 * Method setNOpt of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setNOpt(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setNOpt = Effect.fn(
  (instance: CML.ProtocolParamUpdate, nOpt: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_n_opt(nOpt),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setNOpt failed with parameters: ${nOpt}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setNOpt without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setNOptUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setNOptUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setNOptUnsafe = (instance: CML.ProtocolParamUpdate, nOpt: bigint): void =>
  Effect.runSync(setNOpt(instance, nOpt));

/**
 * Method nOpt of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.nOpt(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const nOpt = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.n_opt(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.nOpt failed `,
        }),
    })
);

/**
 * Unsafely calls instance.nOpt without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.nOptUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.nOptUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nOptUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(nOpt(instance));

/**
 * Method setPoolPledgeInfluence of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setPoolPledgeInfluence(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setPoolPledgeInfluence = Effect.fn(
  (instance: CML.ProtocolParamUpdate, poolPledgeInfluence: CML.Rational): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_pool_pledge_influence(poolPledgeInfluence),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setPoolPledgeInfluence failed with parameters: ${poolPledgeInfluence} (Rational). `,
        }),
    })
);

/**
 * Unsafely calls instance.setPoolPledgeInfluence without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setPoolPledgeInfluenceUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setPoolPledgeInfluenceUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPoolPledgeInfluenceUnsafe = (instance: CML.ProtocolParamUpdate, poolPledgeInfluence: CML.Rational): void =>
  Effect.runSync(setPoolPledgeInfluence(instance, poolPledgeInfluence));

/**
 * Method poolPledgeInfluence of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.poolPledgeInfluence(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const poolPledgeInfluence = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<CML.Rational | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.pool_pledge_influence(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.poolPledgeInfluence failed `,
        }),
    })
);

/**
 * Unsafely calls instance.poolPledgeInfluence without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.poolPledgeInfluenceUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.poolPledgeInfluenceUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolPledgeInfluenceUnsafe = (instance: CML.ProtocolParamUpdate): CML.Rational | undefined =>
  Effect.runSync(poolPledgeInfluence(instance));

/**
 * Method setExpansionRate of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setExpansionRate(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setExpansionRate = Effect.fn(
  (instance: CML.ProtocolParamUpdate, expansionRate: CML.UnitInterval): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_expansion_rate(expansionRate),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setExpansionRate failed with parameters: ${expansionRate} (UnitInterval). `,
        }),
    })
);

/**
 * Unsafely calls instance.setExpansionRate without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setExpansionRateUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setExpansionRateUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setExpansionRateUnsafe = (instance: CML.ProtocolParamUpdate, expansionRate: CML.UnitInterval): void =>
  Effect.runSync(setExpansionRate(instance, expansionRate));

/**
 * Method expansionRate of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.expansionRate(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const expansionRate = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<CML.UnitInterval | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.expansion_rate(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.expansionRate failed `,
        }),
    })
);

/**
 * Unsafely calls instance.expansionRate without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.expansionRateUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.expansionRateUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const expansionRateUnsafe = (instance: CML.ProtocolParamUpdate): CML.UnitInterval | undefined =>
  Effect.runSync(expansionRate(instance));

/**
 * Method setTreasuryGrowthRate of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setTreasuryGrowthRate(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setTreasuryGrowthRate = Effect.fn(
  (instance: CML.ProtocolParamUpdate, treasuryGrowthRate: CML.UnitInterval): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_treasury_growth_rate(treasuryGrowthRate),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setTreasuryGrowthRate failed with parameters: ${treasuryGrowthRate} (UnitInterval). `,
        }),
    })
);

/**
 * Unsafely calls instance.setTreasuryGrowthRate without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setTreasuryGrowthRateUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setTreasuryGrowthRateUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setTreasuryGrowthRateUnsafe = (instance: CML.ProtocolParamUpdate, treasuryGrowthRate: CML.UnitInterval): void =>
  Effect.runSync(setTreasuryGrowthRate(instance, treasuryGrowthRate));

/**
 * Method treasuryGrowthRate of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.treasuryGrowthRate(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const treasuryGrowthRate = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<CML.UnitInterval | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.treasury_growth_rate(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.treasuryGrowthRate failed `,
        }),
    })
);

/**
 * Unsafely calls instance.treasuryGrowthRate without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.treasuryGrowthRateUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.treasuryGrowthRateUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const treasuryGrowthRateUnsafe = (instance: CML.ProtocolParamUpdate): CML.UnitInterval | undefined =>
  Effect.runSync(treasuryGrowthRate(instance));

/**
 * Method setMinPoolCost of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setMinPoolCost(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMinPoolCost = Effect.fn(
  (instance: CML.ProtocolParamUpdate, minPoolCost: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_min_pool_cost(minPoolCost),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMinPoolCost failed with parameters: ${minPoolCost}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMinPoolCost without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setMinPoolCostUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setMinPoolCostUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMinPoolCostUnsafe = (instance: CML.ProtocolParamUpdate, minPoolCost: bigint): void =>
  Effect.runSync(setMinPoolCost(instance, minPoolCost));

/**
 * Method minPoolCost of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.minPoolCost(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const minPoolCost = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.min_pool_cost(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.minPoolCost failed `,
        }),
    })
);

/**
 * Unsafely calls instance.minPoolCost without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.minPoolCostUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.minPoolCostUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const minPoolCostUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(minPoolCost(instance));

/**
 * Method setAdaPerUtxoByte of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setAdaPerUtxoByte(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setAdaPerUtxoByte = Effect.fn(
  (instance: CML.ProtocolParamUpdate, adaPerUtxoByte: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_ada_per_utxo_byte(adaPerUtxoByte),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setAdaPerUtxoByte failed with parameters: ${adaPerUtxoByte}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setAdaPerUtxoByte without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setAdaPerUtxoByteUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setAdaPerUtxoByteUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setAdaPerUtxoByteUnsafe = (instance: CML.ProtocolParamUpdate, adaPerUtxoByte: bigint): void =>
  Effect.runSync(setAdaPerUtxoByte(instance, adaPerUtxoByte));

/**
 * Method adaPerUtxoByte of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.adaPerUtxoByte(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const adaPerUtxoByte = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.ada_per_utxo_byte(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.adaPerUtxoByte failed `,
        }),
    })
);

/**
 * Unsafely calls instance.adaPerUtxoByte without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.adaPerUtxoByteUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.adaPerUtxoByteUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const adaPerUtxoByteUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(adaPerUtxoByte(instance));

/**
 * Method setCostModelsForScriptLanguages of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setCostModelsForScriptLanguages(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setCostModelsForScriptLanguages = Effect.fn(
  (instance: CML.ProtocolParamUpdate, costModelsForScriptLanguages: CML.CostModels): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_cost_models_for_script_languages(costModelsForScriptLanguages),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setCostModelsForScriptLanguages failed with parameters: ${costModelsForScriptLanguages} (CostModels). `,
        }),
    })
);

/**
 * Unsafely calls instance.setCostModelsForScriptLanguages without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setCostModelsForScriptLanguagesUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setCostModelsForScriptLanguagesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setCostModelsForScriptLanguagesUnsafe = (instance: CML.ProtocolParamUpdate, costModelsForScriptLanguages: CML.CostModels): void =>
  Effect.runSync(setCostModelsForScriptLanguages(instance, costModelsForScriptLanguages));

/**
 * Method costModelsForScriptLanguages of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.costModelsForScriptLanguages(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const costModelsForScriptLanguages = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<CML.CostModels | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.cost_models_for_script_languages(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.costModelsForScriptLanguages failed `,
        }),
    })
);

/**
 * Unsafely calls instance.costModelsForScriptLanguages without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.costModelsForScriptLanguagesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.costModelsForScriptLanguagesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const costModelsForScriptLanguagesUnsafe = (instance: CML.ProtocolParamUpdate): CML.CostModels | undefined =>
  Effect.runSync(costModelsForScriptLanguages(instance));

/**
 * Method setExecutionCosts of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setExecutionCosts(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setExecutionCosts = Effect.fn(
  (instance: CML.ProtocolParamUpdate, executionCosts: CML.ExUnitPrices): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_execution_costs(executionCosts),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setExecutionCosts failed with parameters: ${executionCosts} (ExUnitPrices). `,
        }),
    })
);

/**
 * Unsafely calls instance.setExecutionCosts without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setExecutionCostsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setExecutionCostsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setExecutionCostsUnsafe = (instance: CML.ProtocolParamUpdate, executionCosts: CML.ExUnitPrices): void =>
  Effect.runSync(setExecutionCosts(instance, executionCosts));

/**
 * Method executionCosts of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.executionCosts(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const executionCosts = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<CML.ExUnitPrices | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.execution_costs(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.executionCosts failed `,
        }),
    })
);

/**
 * Unsafely calls instance.executionCosts without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.executionCostsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.executionCostsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const executionCostsUnsafe = (instance: CML.ProtocolParamUpdate): CML.ExUnitPrices | undefined =>
  Effect.runSync(executionCosts(instance));

/**
 * Method setMaxTxExUnits of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setMaxTxExUnits(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMaxTxExUnits = Effect.fn(
  (instance: CML.ProtocolParamUpdate, maxTxExUnits: CML.ExUnits): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_max_tx_ex_units(maxTxExUnits),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxTxExUnits failed with parameters: ${maxTxExUnits} (ExUnits). `,
        }),
    })
);

/**
 * Unsafely calls instance.setMaxTxExUnits without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setMaxTxExUnitsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setMaxTxExUnitsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMaxTxExUnitsUnsafe = (instance: CML.ProtocolParamUpdate, maxTxExUnits: CML.ExUnits): void =>
  Effect.runSync(setMaxTxExUnits(instance, maxTxExUnits));

/**
 * Method maxTxExUnits of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.maxTxExUnits(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxTxExUnits = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<CML.ExUnits | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.max_tx_ex_units(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxTxExUnits failed `,
        }),
    })
);

/**
 * Unsafely calls instance.maxTxExUnits without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.maxTxExUnitsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.maxTxExUnitsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxTxExUnitsUnsafe = (instance: CML.ProtocolParamUpdate): CML.ExUnits | undefined =>
  Effect.runSync(maxTxExUnits(instance));

/**
 * Method setMaxBlockExUnits of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setMaxBlockExUnits(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMaxBlockExUnits = Effect.fn(
  (instance: CML.ProtocolParamUpdate, maxBlockExUnits: CML.ExUnits): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_max_block_ex_units(maxBlockExUnits),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxBlockExUnits failed with parameters: ${maxBlockExUnits} (ExUnits). `,
        }),
    })
);

/**
 * Unsafely calls instance.setMaxBlockExUnits without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setMaxBlockExUnitsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setMaxBlockExUnitsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMaxBlockExUnitsUnsafe = (instance: CML.ProtocolParamUpdate, maxBlockExUnits: CML.ExUnits): void =>
  Effect.runSync(setMaxBlockExUnits(instance, maxBlockExUnits));

/**
 * Method maxBlockExUnits of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.maxBlockExUnits(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxBlockExUnits = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<CML.ExUnits | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.max_block_ex_units(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxBlockExUnits failed `,
        }),
    })
);

/**
 * Unsafely calls instance.maxBlockExUnits without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.maxBlockExUnitsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.maxBlockExUnitsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxBlockExUnitsUnsafe = (instance: CML.ProtocolParamUpdate): CML.ExUnits | undefined =>
  Effect.runSync(maxBlockExUnits(instance));

/**
 * Method setMaxValueSize of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setMaxValueSize(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMaxValueSize = Effect.fn(
  (instance: CML.ProtocolParamUpdate, maxValueSize: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_max_value_size(maxValueSize),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxValueSize failed with parameters: ${maxValueSize}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMaxValueSize without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setMaxValueSizeUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setMaxValueSizeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMaxValueSizeUnsafe = (instance: CML.ProtocolParamUpdate, maxValueSize: bigint): void =>
  Effect.runSync(setMaxValueSize(instance, maxValueSize));

/**
 * Method maxValueSize of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.maxValueSize(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxValueSize = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.max_value_size(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxValueSize failed `,
        }),
    })
);

/**
 * Unsafely calls instance.maxValueSize without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.maxValueSizeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.maxValueSizeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxValueSizeUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(maxValueSize(instance));

/**
 * Method setCollateralPercentage of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setCollateralPercentage(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setCollateralPercentage = Effect.fn(
  (instance: CML.ProtocolParamUpdate, collateralPercentage: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_collateral_percentage(collateralPercentage),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setCollateralPercentage failed with parameters: ${collateralPercentage}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setCollateralPercentage without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setCollateralPercentageUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setCollateralPercentageUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setCollateralPercentageUnsafe = (instance: CML.ProtocolParamUpdate, collateralPercentage: bigint): void =>
  Effect.runSync(setCollateralPercentage(instance, collateralPercentage));

/**
 * Method collateralPercentage of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.collateralPercentage(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const collateralPercentage = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.collateral_percentage(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.collateralPercentage failed `,
        }),
    })
);

/**
 * Unsafely calls instance.collateralPercentage without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.collateralPercentageUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.collateralPercentageUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const collateralPercentageUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(collateralPercentage(instance));

/**
 * Method setMaxCollateralInputs of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setMaxCollateralInputs(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMaxCollateralInputs = Effect.fn(
  (instance: CML.ProtocolParamUpdate, maxCollateralInputs: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_max_collateral_inputs(maxCollateralInputs),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxCollateralInputs failed with parameters: ${maxCollateralInputs}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMaxCollateralInputs without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setMaxCollateralInputsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setMaxCollateralInputsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMaxCollateralInputsUnsafe = (instance: CML.ProtocolParamUpdate, maxCollateralInputs: bigint): void =>
  Effect.runSync(setMaxCollateralInputs(instance, maxCollateralInputs));

/**
 * Method maxCollateralInputs of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.maxCollateralInputs(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxCollateralInputs = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.max_collateral_inputs(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxCollateralInputs failed `,
        }),
    })
);

/**
 * Unsafely calls instance.maxCollateralInputs without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.maxCollateralInputsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.maxCollateralInputsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxCollateralInputsUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(maxCollateralInputs(instance));

/**
 * Method setPoolVotingThresholds of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setPoolVotingThresholds(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setPoolVotingThresholds = Effect.fn(
  (instance: CML.ProtocolParamUpdate, poolVotingThresholds: CML.PoolVotingThresholds): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_pool_voting_thresholds(poolVotingThresholds),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setPoolVotingThresholds failed with parameters: ${poolVotingThresholds} (PoolVotingThresholds). `,
        }),
    })
);

/**
 * Unsafely calls instance.setPoolVotingThresholds without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setPoolVotingThresholdsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setPoolVotingThresholdsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPoolVotingThresholdsUnsafe = (instance: CML.ProtocolParamUpdate, poolVotingThresholds: CML.PoolVotingThresholds): void =>
  Effect.runSync(setPoolVotingThresholds(instance, poolVotingThresholds));

/**
 * Method poolVotingThresholds of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.poolVotingThresholds(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const poolVotingThresholds = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<CML.PoolVotingThresholds | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.pool_voting_thresholds(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.poolVotingThresholds failed `,
        }),
    })
);

/**
 * Unsafely calls instance.poolVotingThresholds without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.poolVotingThresholdsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.poolVotingThresholdsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolVotingThresholdsUnsafe = (instance: CML.ProtocolParamUpdate): CML.PoolVotingThresholds | undefined =>
  Effect.runSync(poolVotingThresholds(instance));

/**
 * Method setDRepVotingThresholds of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setDRepVotingThresholds(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setDRepVotingThresholds = Effect.fn(
  (instance: CML.ProtocolParamUpdate, dRepVotingThresholds: CML.DRepVotingThresholds): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_d_rep_voting_thresholds(dRepVotingThresholds),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setDRepVotingThresholds failed with parameters: ${dRepVotingThresholds} (DRepVotingThresholds). `,
        }),
    })
);

/**
 * Unsafely calls instance.setDRepVotingThresholds without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setDRepVotingThresholdsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setDRepVotingThresholdsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setDRepVotingThresholdsUnsafe = (instance: CML.ProtocolParamUpdate, dRepVotingThresholds: CML.DRepVotingThresholds): void =>
  Effect.runSync(setDRepVotingThresholds(instance, dRepVotingThresholds));

/**
 * Method dRepVotingThresholds of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.dRepVotingThresholds(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const dRepVotingThresholds = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<CML.DRepVotingThresholds | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.d_rep_voting_thresholds(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.dRepVotingThresholds failed `,
        }),
    })
);

/**
 * Unsafely calls instance.dRepVotingThresholds without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.dRepVotingThresholdsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.dRepVotingThresholdsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dRepVotingThresholdsUnsafe = (instance: CML.ProtocolParamUpdate): CML.DRepVotingThresholds | undefined =>
  Effect.runSync(dRepVotingThresholds(instance));

/**
 * Method setMinCommitteeSize of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setMinCommitteeSize(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMinCommitteeSize = Effect.fn(
  (instance: CML.ProtocolParamUpdate, minCommitteeSize: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_min_committee_size(minCommitteeSize),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMinCommitteeSize failed with parameters: ${minCommitteeSize}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setMinCommitteeSize without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setMinCommitteeSizeUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setMinCommitteeSizeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMinCommitteeSizeUnsafe = (instance: CML.ProtocolParamUpdate, minCommitteeSize: bigint): void =>
  Effect.runSync(setMinCommitteeSize(instance, minCommitteeSize));

/**
 * Method minCommitteeSize of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.minCommitteeSize(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const minCommitteeSize = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.min_committee_size(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.minCommitteeSize failed `,
        }),
    })
);

/**
 * Unsafely calls instance.minCommitteeSize without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.minCommitteeSizeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.minCommitteeSizeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const minCommitteeSizeUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(minCommitteeSize(instance));

/**
 * Method setCommitteeTermLimit of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setCommitteeTermLimit(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setCommitteeTermLimit = Effect.fn(
  (instance: CML.ProtocolParamUpdate, committeeTermLimit: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_committee_term_limit(committeeTermLimit),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setCommitteeTermLimit failed with parameters: ${committeeTermLimit}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setCommitteeTermLimit without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setCommitteeTermLimitUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setCommitteeTermLimitUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setCommitteeTermLimitUnsafe = (instance: CML.ProtocolParamUpdate, committeeTermLimit: bigint): void =>
  Effect.runSync(setCommitteeTermLimit(instance, committeeTermLimit));

/**
 * Method committeeTermLimit of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.committeeTermLimit(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const committeeTermLimit = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.committee_term_limit(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.committeeTermLimit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.committeeTermLimit without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.committeeTermLimitUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.committeeTermLimitUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const committeeTermLimitUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(committeeTermLimit(instance));

/**
 * Method setGovernanceActionValidityPeriod of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setGovernanceActionValidityPeriod(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setGovernanceActionValidityPeriod = Effect.fn(
  (instance: CML.ProtocolParamUpdate, governanceActionValidityPeriod: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_governance_action_validity_period(governanceActionValidityPeriod),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setGovernanceActionValidityPeriod failed with parameters: ${governanceActionValidityPeriod}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setGovernanceActionValidityPeriod without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setGovernanceActionValidityPeriodUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setGovernanceActionValidityPeriodUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setGovernanceActionValidityPeriodUnsafe = (instance: CML.ProtocolParamUpdate, governanceActionValidityPeriod: bigint): void =>
  Effect.runSync(setGovernanceActionValidityPeriod(instance, governanceActionValidityPeriod));

/**
 * Method governanceActionValidityPeriod of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.governanceActionValidityPeriod(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const governanceActionValidityPeriod = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.governance_action_validity_period(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.governanceActionValidityPeriod failed `,
        }),
    })
);

/**
 * Unsafely calls instance.governanceActionValidityPeriod without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.governanceActionValidityPeriodUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.governanceActionValidityPeriodUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const governanceActionValidityPeriodUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(governanceActionValidityPeriod(instance));

/**
 * Method setGovernanceActionDeposit of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setGovernanceActionDeposit(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setGovernanceActionDeposit = Effect.fn(
  (instance: CML.ProtocolParamUpdate, governanceActionDeposit: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_governance_action_deposit(governanceActionDeposit),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setGovernanceActionDeposit failed with parameters: ${governanceActionDeposit}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setGovernanceActionDeposit without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setGovernanceActionDepositUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setGovernanceActionDepositUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setGovernanceActionDepositUnsafe = (instance: CML.ProtocolParamUpdate, governanceActionDeposit: bigint): void =>
  Effect.runSync(setGovernanceActionDeposit(instance, governanceActionDeposit));

/**
 * Method governanceActionDeposit of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.governanceActionDeposit(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const governanceActionDeposit = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.governance_action_deposit(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.governanceActionDeposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.governanceActionDeposit without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.governanceActionDepositUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.governanceActionDepositUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const governanceActionDepositUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(governanceActionDeposit(instance));

/**
 * Method setDRepDeposit of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setDRepDeposit(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setDRepDeposit = Effect.fn(
  (instance: CML.ProtocolParamUpdate, dRepDeposit: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_d_rep_deposit(dRepDeposit),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setDRepDeposit failed with parameters: ${dRepDeposit}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setDRepDeposit without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setDRepDepositUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setDRepDepositUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setDRepDepositUnsafe = (instance: CML.ProtocolParamUpdate, dRepDeposit: bigint): void =>
  Effect.runSync(setDRepDeposit(instance, dRepDeposit));

/**
 * Method dRepDeposit of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.dRepDeposit(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const dRepDeposit = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.d_rep_deposit(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.dRepDeposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.dRepDeposit without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.dRepDepositUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.dRepDepositUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dRepDepositUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(dRepDeposit(instance));

/**
 * Method setDRepInactivityPeriod of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setDRepInactivityPeriod(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setDRepInactivityPeriod = Effect.fn(
  (instance: CML.ProtocolParamUpdate, dRepInactivityPeriod: bigint): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_d_rep_inactivity_period(dRepInactivityPeriod),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setDRepInactivityPeriod failed with parameters: ${dRepInactivityPeriod}. `,
        }),
    })
);

/**
 * Unsafely calls instance.setDRepInactivityPeriod without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setDRepInactivityPeriodUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setDRepInactivityPeriodUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setDRepInactivityPeriodUnsafe = (instance: CML.ProtocolParamUpdate, dRepInactivityPeriod: bigint): void =>
  Effect.runSync(setDRepInactivityPeriod(instance, dRepInactivityPeriod));

/**
 * Method dRepInactivityPeriod of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.dRepInactivityPeriod(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const dRepInactivityPeriod = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.d_rep_inactivity_period(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.dRepInactivityPeriod failed `,
        }),
    })
);

/**
 * Unsafely calls instance.dRepInactivityPeriod without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.dRepInactivityPeriodUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.dRepInactivityPeriodUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dRepInactivityPeriodUnsafe = (instance: CML.ProtocolParamUpdate): bigint | undefined =>
  Effect.runSync(dRepInactivityPeriod(instance));

/**
 * Method setMinFeeRefScriptCostPerByte of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.setMinFeeRefScriptCostPerByte(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMinFeeRefScriptCostPerByte = Effect.fn(
  (instance: CML.ProtocolParamUpdate, minFeeRefScriptCostPerByte: CML.Rational): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_min_fee_ref_script_cost_per_byte(minFeeRefScriptCostPerByte),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMinFeeRefScriptCostPerByte failed with parameters: ${minFeeRefScriptCostPerByte} (Rational). `,
        }),
    })
);

/**
 * Unsafely calls instance.setMinFeeRefScriptCostPerByte without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.setMinFeeRefScriptCostPerByteUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.setMinFeeRefScriptCostPerByteUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMinFeeRefScriptCostPerByteUnsafe = (instance: CML.ProtocolParamUpdate, minFeeRefScriptCostPerByte: CML.Rational): void =>
  Effect.runSync(setMinFeeRefScriptCostPerByte(instance, minFeeRefScriptCostPerByte));

/**
 * Method minFeeRefScriptCostPerByte of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 *   const result = yield* ProtocolParamUpdate.minFeeRefScriptCostPerByte(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const minFeeRefScriptCostPerByte = Effect.fn(
  (instance: CML.ProtocolParamUpdate): Effect.Effect<CML.Rational | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.min_fee_ref_script_cost_per_byte(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.minFeeRefScriptCostPerByte failed `,
        }),
    })
);

/**
 * Unsafely calls instance.minFeeRefScriptCostPerByte without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ProtocolParamUpdate instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate.minFeeRefScriptCostPerByteUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.minFeeRefScriptCostPerByteUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const minFeeRefScriptCostPerByteUnsafe = (instance: CML.ProtocolParamUpdate): CML.Rational | undefined =>
  Effect.runSync(minFeeRefScriptCostPerByte(instance));

/**
 * Static method _new of ProtocolParamUpdate
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ProtocolParamUpdate._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.ProtocolParamUpdate.new(),
    catch: () => new ProtocolParamUpdateError({
      message: `ProtocolParamUpdate._new failed `,
    }),
  });
});

/**
 * Unsafely calls ProtocolParamUpdate._new without Effect wrapper
 * 
 * @example
 * import { ProtocolParamUpdate } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ProtocolParamUpdate._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () =>
  Effect.runSync(_new());

import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ProtocolParamUpdate = CML.ProtocolParamUpdate;

export class ProtocolParamUpdateError extends Data.TaggedError(
  "ProtocolParamUpdateError",
)<{
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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ProtocolParamUpdate): void =>
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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<Uint8Array, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toCborBytes failed ProtocolParamUpdate is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (
  instance: CML.ProtocolParamUpdate,
): Uint8Array => Effect.runSync(toCborBytes(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<Uint8Array, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toCanonicalCborBytes failed ProtocolParamUpdate is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.ProtocolParamUpdate,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

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
    catch: () =>
      new ProtocolParamUpdateError({
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
 *   const result = ProtocolParamUpdate.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<string, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toCborHex failed ProtocolParamUpdate is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.ProtocolParamUpdate): string =>
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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<string, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toCanonicalCborHex failed ProtocolParamUpdate is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (
  instance: CML.ProtocolParamUpdate,
): string => Effect.runSync(toCanonicalCborHex(instance));

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
    catch: () =>
      new ProtocolParamUpdateError({
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
 *   const result = ProtocolParamUpdate.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<string, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toJson failed ProtocolParamUpdate is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.ProtocolParamUpdate): string =>
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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<any, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.toJsValue failed ProtocolParamUpdate is not valid for any conversion. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.ProtocolParamUpdate): any =>
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
    catch: () =>
      new ProtocolParamUpdateError({
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
 *   const result = ProtocolParamUpdate.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

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
  (
    instance: CML.ProtocolParamUpdate,
    minfeeA: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_minfee_a(minfeeA),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMinfeeA failed with parameters: ${minfeeA}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetMinfeeA(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetMinfeeA failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetMinfeeA = (
  instance: CML.ProtocolParamUpdate,
  minfeeA: bigint,
): void => Effect.runSync(setMinfeeA(instance, minfeeA));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.minfee_a(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.minfeeA failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeMinfeeA(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeMinfeeA failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMinfeeA = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(minfeeA(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    minfeeB: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_minfee_b(minfeeB),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMinfeeB failed with parameters: ${minfeeB}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetMinfeeB(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetMinfeeB failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetMinfeeB = (
  instance: CML.ProtocolParamUpdate,
  minfeeB: bigint,
): void => Effect.runSync(setMinfeeB(instance, minfeeB));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.minfee_b(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.minfeeB failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeMinfeeB(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeMinfeeB failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMinfeeB = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(minfeeB(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    maxBlockBodySize: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_max_block_body_size(maxBlockBodySize),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxBlockBodySize failed with parameters: ${maxBlockBodySize}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetMaxBlockBodySize(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetMaxBlockBodySize failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetMaxBlockBodySize = (
  instance: CML.ProtocolParamUpdate,
  maxBlockBodySize: bigint,
): void => Effect.runSync(setMaxBlockBodySize(instance, maxBlockBodySize));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.max_block_body_size(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxBlockBodySize failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeMaxBlockBodySize(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeMaxBlockBodySize failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMaxBlockBodySize = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(maxBlockBodySize(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    maxTransactionSize: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_max_transaction_size(maxTransactionSize),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxTransactionSize failed with parameters: ${maxTransactionSize}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetMaxTransactionSize(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetMaxTransactionSize failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetMaxTransactionSize = (
  instance: CML.ProtocolParamUpdate,
  maxTransactionSize: bigint,
): void => Effect.runSync(setMaxTransactionSize(instance, maxTransactionSize));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.max_transaction_size(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxTransactionSize failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeMaxTransactionSize(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeMaxTransactionSize failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMaxTransactionSize = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(maxTransactionSize(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    maxBlockHeaderSize: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_max_block_header_size(maxBlockHeaderSize),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxBlockHeaderSize failed with parameters: ${maxBlockHeaderSize}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetMaxBlockHeaderSize(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetMaxBlockHeaderSize failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetMaxBlockHeaderSize = (
  instance: CML.ProtocolParamUpdate,
  maxBlockHeaderSize: bigint,
): void => Effect.runSync(setMaxBlockHeaderSize(instance, maxBlockHeaderSize));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.max_block_header_size(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxBlockHeaderSize failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeMaxBlockHeaderSize(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeMaxBlockHeaderSize failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMaxBlockHeaderSize = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(maxBlockHeaderSize(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    keyDeposit: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_key_deposit(keyDeposit),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setKeyDeposit failed with parameters: ${keyDeposit}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetKeyDeposit(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetKeyDeposit failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetKeyDeposit = (
  instance: CML.ProtocolParamUpdate,
  keyDeposit: bigint,
): void => Effect.runSync(setKeyDeposit(instance, keyDeposit));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.key_deposit(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.keyDeposit failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeKeyDeposit(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeKeyDeposit failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKeyDeposit = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(keyDeposit(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    poolDeposit: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_pool_deposit(poolDeposit),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setPoolDeposit failed with parameters: ${poolDeposit}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetPoolDeposit(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetPoolDeposit failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetPoolDeposit = (
  instance: CML.ProtocolParamUpdate,
  poolDeposit: bigint,
): void => Effect.runSync(setPoolDeposit(instance, poolDeposit));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.pool_deposit(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.poolDeposit failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafePoolDeposit(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafePoolDeposit failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafePoolDeposit = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(poolDeposit(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    maximumEpoch: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_maximum_epoch(maximumEpoch),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaximumEpoch failed with parameters: ${maximumEpoch}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetMaximumEpoch(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetMaximumEpoch failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetMaximumEpoch = (
  instance: CML.ProtocolParamUpdate,
  maximumEpoch: bigint,
): void => Effect.runSync(setMaximumEpoch(instance, maximumEpoch));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.maximum_epoch(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maximumEpoch failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeMaximumEpoch(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeMaximumEpoch failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMaximumEpoch = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(maximumEpoch(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    nOpt: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_n_opt(nOpt),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setNOpt failed with parameters: ${nOpt}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetNOpt(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetNOpt failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetNOpt = (
  instance: CML.ProtocolParamUpdate,
  nOpt: bigint,
): void => Effect.runSync(setNOpt(instance, nOpt));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.n_opt(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.nOpt failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeNOpt(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeNOpt failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeNOpt = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(nOpt(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    poolPledgeInfluence: CML.Rational,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_pool_pledge_influence(poolPledgeInfluence),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setPoolPledgeInfluence failed with parameters: ${poolPledgeInfluence} (Rational). `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetPoolPledgeInfluence(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetPoolPledgeInfluence failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetPoolPledgeInfluence = (
  instance: CML.ProtocolParamUpdate,
  poolPledgeInfluence: CML.Rational,
): void =>
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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<CML.Rational | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.pool_pledge_influence(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.poolPledgeInfluence failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafePoolPledgeInfluence(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafePoolPledgeInfluence failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafePoolPledgeInfluence = (
  instance: CML.ProtocolParamUpdate,
): CML.Rational | undefined => Effect.runSync(poolPledgeInfluence(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    expansionRate: CML.UnitInterval,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_expansion_rate(expansionRate),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setExpansionRate failed with parameters: ${expansionRate} (UnitInterval). `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetExpansionRate(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetExpansionRate failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetExpansionRate = (
  instance: CML.ProtocolParamUpdate,
  expansionRate: CML.UnitInterval,
): void => Effect.runSync(setExpansionRate(instance, expansionRate));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<CML.UnitInterval | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.expansion_rate(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.expansionRate failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeExpansionRate(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeExpansionRate failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeExpansionRate = (
  instance: CML.ProtocolParamUpdate,
): CML.UnitInterval | undefined => Effect.runSync(expansionRate(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    treasuryGrowthRate: CML.UnitInterval,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_treasury_growth_rate(treasuryGrowthRate),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setTreasuryGrowthRate failed with parameters: ${treasuryGrowthRate} (UnitInterval). `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetTreasuryGrowthRate(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetTreasuryGrowthRate failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetTreasuryGrowthRate = (
  instance: CML.ProtocolParamUpdate,
  treasuryGrowthRate: CML.UnitInterval,
): void => Effect.runSync(setTreasuryGrowthRate(instance, treasuryGrowthRate));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<CML.UnitInterval | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.treasury_growth_rate(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.treasuryGrowthRate failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeTreasuryGrowthRate(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeTreasuryGrowthRate failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeTreasuryGrowthRate = (
  instance: CML.ProtocolParamUpdate,
): CML.UnitInterval | undefined => Effect.runSync(treasuryGrowthRate(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    minPoolCost: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_min_pool_cost(minPoolCost),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMinPoolCost failed with parameters: ${minPoolCost}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetMinPoolCost(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetMinPoolCost failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetMinPoolCost = (
  instance: CML.ProtocolParamUpdate,
  minPoolCost: bigint,
): void => Effect.runSync(setMinPoolCost(instance, minPoolCost));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.min_pool_cost(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.minPoolCost failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeMinPoolCost(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeMinPoolCost failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMinPoolCost = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(minPoolCost(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    adaPerUtxoByte: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_ada_per_utxo_byte(adaPerUtxoByte),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setAdaPerUtxoByte failed with parameters: ${adaPerUtxoByte}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetAdaPerUtxoByte(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetAdaPerUtxoByte failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetAdaPerUtxoByte = (
  instance: CML.ProtocolParamUpdate,
  adaPerUtxoByte: bigint,
): void => Effect.runSync(setAdaPerUtxoByte(instance, adaPerUtxoByte));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.ada_per_utxo_byte(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.adaPerUtxoByte failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeAdaPerUtxoByte(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeAdaPerUtxoByte failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdaPerUtxoByte = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(adaPerUtxoByte(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    costModelsForScriptLanguages: CML.CostModels,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () =>
        instance.set_cost_models_for_script_languages(
          costModelsForScriptLanguages,
        ),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setCostModelsForScriptLanguages failed with parameters: ${costModelsForScriptLanguages} (CostModels). `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetCostModelsForScriptLanguages(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetCostModelsForScriptLanguages failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetCostModelsForScriptLanguages = (
  instance: CML.ProtocolParamUpdate,
  costModelsForScriptLanguages: CML.CostModels,
): void =>
  Effect.runSync(
    setCostModelsForScriptLanguages(instance, costModelsForScriptLanguages),
  );

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<CML.CostModels | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.cost_models_for_script_languages(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.costModelsForScriptLanguages failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeCostModelsForScriptLanguages(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeCostModelsForScriptLanguages failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCostModelsForScriptLanguages = (
  instance: CML.ProtocolParamUpdate,
): CML.CostModels | undefined =>
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
  (
    instance: CML.ProtocolParamUpdate,
    executionCosts: CML.ExUnitPrices,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_execution_costs(executionCosts),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setExecutionCosts failed with parameters: ${executionCosts} (ExUnitPrices). `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetExecutionCosts(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetExecutionCosts failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetExecutionCosts = (
  instance: CML.ProtocolParamUpdate,
  executionCosts: CML.ExUnitPrices,
): void => Effect.runSync(setExecutionCosts(instance, executionCosts));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<CML.ExUnitPrices | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.execution_costs(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.executionCosts failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeExecutionCosts(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeExecutionCosts failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeExecutionCosts = (
  instance: CML.ProtocolParamUpdate,
): CML.ExUnitPrices | undefined => Effect.runSync(executionCosts(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    maxTxExUnits: CML.ExUnits,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_max_tx_ex_units(maxTxExUnits),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxTxExUnits failed with parameters: ${maxTxExUnits} (ExUnits). `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetMaxTxExUnits(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetMaxTxExUnits failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetMaxTxExUnits = (
  instance: CML.ProtocolParamUpdate,
  maxTxExUnits: CML.ExUnits,
): void => Effect.runSync(setMaxTxExUnits(instance, maxTxExUnits));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<CML.ExUnits | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.max_tx_ex_units(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxTxExUnits failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeMaxTxExUnits(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeMaxTxExUnits failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMaxTxExUnits = (
  instance: CML.ProtocolParamUpdate,
): CML.ExUnits | undefined => Effect.runSync(maxTxExUnits(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    maxBlockExUnits: CML.ExUnits,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_max_block_ex_units(maxBlockExUnits),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxBlockExUnits failed with parameters: ${maxBlockExUnits} (ExUnits). `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetMaxBlockExUnits(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetMaxBlockExUnits failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetMaxBlockExUnits = (
  instance: CML.ProtocolParamUpdate,
  maxBlockExUnits: CML.ExUnits,
): void => Effect.runSync(setMaxBlockExUnits(instance, maxBlockExUnits));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<CML.ExUnits | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.max_block_ex_units(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxBlockExUnits failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeMaxBlockExUnits(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeMaxBlockExUnits failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMaxBlockExUnits = (
  instance: CML.ProtocolParamUpdate,
): CML.ExUnits | undefined => Effect.runSync(maxBlockExUnits(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    maxValueSize: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_max_value_size(maxValueSize),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxValueSize failed with parameters: ${maxValueSize}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetMaxValueSize(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetMaxValueSize failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetMaxValueSize = (
  instance: CML.ProtocolParamUpdate,
  maxValueSize: bigint,
): void => Effect.runSync(setMaxValueSize(instance, maxValueSize));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.max_value_size(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxValueSize failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeMaxValueSize(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeMaxValueSize failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMaxValueSize = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(maxValueSize(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    collateralPercentage: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_collateral_percentage(collateralPercentage),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setCollateralPercentage failed with parameters: ${collateralPercentage}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetCollateralPercentage(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetCollateralPercentage failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetCollateralPercentage = (
  instance: CML.ProtocolParamUpdate,
  collateralPercentage: bigint,
): void =>
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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.collateral_percentage(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.collateralPercentage failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeCollateralPercentage(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeCollateralPercentage failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCollateralPercentage = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(collateralPercentage(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    maxCollateralInputs: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_max_collateral_inputs(maxCollateralInputs),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMaxCollateralInputs failed with parameters: ${maxCollateralInputs}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetMaxCollateralInputs(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetMaxCollateralInputs failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetMaxCollateralInputs = (
  instance: CML.ProtocolParamUpdate,
  maxCollateralInputs: bigint,
): void =>
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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.max_collateral_inputs(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.maxCollateralInputs failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeMaxCollateralInputs(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeMaxCollateralInputs failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMaxCollateralInputs = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(maxCollateralInputs(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    poolVotingThresholds: CML.PoolVotingThresholds,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_pool_voting_thresholds(poolVotingThresholds),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setPoolVotingThresholds failed with parameters: ${poolVotingThresholds} (PoolVotingThresholds). `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetPoolVotingThresholds(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetPoolVotingThresholds failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetPoolVotingThresholds = (
  instance: CML.ProtocolParamUpdate,
  poolVotingThresholds: CML.PoolVotingThresholds,
): void =>
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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<
    CML.PoolVotingThresholds | undefined,
    ProtocolParamUpdateError
  > =>
    Effect.try({
      try: () => instance.pool_voting_thresholds(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.poolVotingThresholds failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafePoolVotingThresholds(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafePoolVotingThresholds failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafePoolVotingThresholds = (
  instance: CML.ProtocolParamUpdate,
): CML.PoolVotingThresholds | undefined =>
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
  (
    instance: CML.ProtocolParamUpdate,
    dRepVotingThresholds: CML.DRepVotingThresholds,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_d_rep_voting_thresholds(dRepVotingThresholds),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setDRepVotingThresholds failed with parameters: ${dRepVotingThresholds} (DRepVotingThresholds). `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetDRepVotingThresholds(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetDRepVotingThresholds failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetDRepVotingThresholds = (
  instance: CML.ProtocolParamUpdate,
  dRepVotingThresholds: CML.DRepVotingThresholds,
): void =>
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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<
    CML.DRepVotingThresholds | undefined,
    ProtocolParamUpdateError
  > =>
    Effect.try({
      try: () => instance.d_rep_voting_thresholds(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.dRepVotingThresholds failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeDRepVotingThresholds(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeDRepVotingThresholds failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDRepVotingThresholds = (
  instance: CML.ProtocolParamUpdate,
): CML.DRepVotingThresholds | undefined =>
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
  (
    instance: CML.ProtocolParamUpdate,
    minCommitteeSize: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_min_committee_size(minCommitteeSize),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMinCommitteeSize failed with parameters: ${minCommitteeSize}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetMinCommitteeSize(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetMinCommitteeSize failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetMinCommitteeSize = (
  instance: CML.ProtocolParamUpdate,
  minCommitteeSize: bigint,
): void => Effect.runSync(setMinCommitteeSize(instance, minCommitteeSize));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.min_committee_size(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.minCommitteeSize failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeMinCommitteeSize(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeMinCommitteeSize failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMinCommitteeSize = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(minCommitteeSize(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    committeeTermLimit: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_committee_term_limit(committeeTermLimit),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setCommitteeTermLimit failed with parameters: ${committeeTermLimit}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetCommitteeTermLimit(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetCommitteeTermLimit failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetCommitteeTermLimit = (
  instance: CML.ProtocolParamUpdate,
  committeeTermLimit: bigint,
): void => Effect.runSync(setCommitteeTermLimit(instance, committeeTermLimit));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.committee_term_limit(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.committeeTermLimit failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeCommitteeTermLimit(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeCommitteeTermLimit failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCommitteeTermLimit = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(committeeTermLimit(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    governanceActionValidityPeriod: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () =>
        instance.set_governance_action_validity_period(
          governanceActionValidityPeriod,
        ),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setGovernanceActionValidityPeriod failed with parameters: ${governanceActionValidityPeriod}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetGovernanceActionValidityPeriod(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetGovernanceActionValidityPeriod failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetGovernanceActionValidityPeriod = (
  instance: CML.ProtocolParamUpdate,
  governanceActionValidityPeriod: bigint,
): void =>
  Effect.runSync(
    setGovernanceActionValidityPeriod(instance, governanceActionValidityPeriod),
  );

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.governance_action_validity_period(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.governanceActionValidityPeriod failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeGovernanceActionValidityPeriod(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeGovernanceActionValidityPeriod failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGovernanceActionValidityPeriod = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined =>
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
  (
    instance: CML.ProtocolParamUpdate,
    governanceActionDeposit: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () =>
        instance.set_governance_action_deposit(governanceActionDeposit),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setGovernanceActionDeposit failed with parameters: ${governanceActionDeposit}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetGovernanceActionDeposit(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetGovernanceActionDeposit failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetGovernanceActionDeposit = (
  instance: CML.ProtocolParamUpdate,
  governanceActionDeposit: bigint,
): void =>
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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.governance_action_deposit(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.governanceActionDeposit failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeGovernanceActionDeposit(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeGovernanceActionDeposit failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGovernanceActionDeposit = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(governanceActionDeposit(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    dRepDeposit: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_d_rep_deposit(dRepDeposit),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setDRepDeposit failed with parameters: ${dRepDeposit}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetDRepDeposit(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetDRepDeposit failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetDRepDeposit = (
  instance: CML.ProtocolParamUpdate,
  dRepDeposit: bigint,
): void => Effect.runSync(setDRepDeposit(instance, dRepDeposit));

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.d_rep_deposit(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.dRepDeposit failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeDRepDeposit(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeDRepDeposit failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDRepDeposit = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(dRepDeposit(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    dRepInactivityPeriod: bigint,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.set_d_rep_inactivity_period(dRepInactivityPeriod),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setDRepInactivityPeriod failed with parameters: ${dRepInactivityPeriod}. `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetDRepInactivityPeriod(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetDRepInactivityPeriod failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetDRepInactivityPeriod = (
  instance: CML.ProtocolParamUpdate,
  dRepInactivityPeriod: bigint,
): void =>
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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<bigint | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.d_rep_inactivity_period(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.dRepInactivityPeriod failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeDRepInactivityPeriod(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeDRepInactivityPeriod failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDRepInactivityPeriod = (
  instance: CML.ProtocolParamUpdate,
): bigint | undefined => Effect.runSync(dRepInactivityPeriod(instance));

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
  (
    instance: CML.ProtocolParamUpdate,
    minFeeRefScriptCostPerByte: CML.Rational,
  ): Effect.Effect<void, ProtocolParamUpdateError> =>
    Effect.try({
      try: () =>
        instance.set_min_fee_ref_script_cost_per_byte(
          minFeeRefScriptCostPerByte,
        ),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.setMinFeeRefScriptCostPerByte failed with parameters: ${minFeeRefScriptCostPerByte} (Rational). `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeSetMinFeeRefScriptCostPerByte(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeSetMinFeeRefScriptCostPerByte failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSetMinFeeRefScriptCostPerByte = (
  instance: CML.ProtocolParamUpdate,
  minFeeRefScriptCostPerByte: CML.Rational,
): void =>
  Effect.runSync(
    setMinFeeRefScriptCostPerByte(instance, minFeeRefScriptCostPerByte),
  );

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
  (
    instance: CML.ProtocolParamUpdate,
  ): Effect.Effect<CML.Rational | undefined, ProtocolParamUpdateError> =>
    Effect.try({
      try: () => instance.min_fee_ref_script_cost_per_byte(),
      catch: () =>
        new ProtocolParamUpdateError({
          message: `ProtocolParamUpdate.minFeeRefScriptCostPerByte failed `,
        }),
    }),
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
 *   const result = ProtocolParamUpdate.unsafeMinFeeRefScriptCostPerByte(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafeMinFeeRefScriptCostPerByte failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMinFeeRefScriptCostPerByte = (
  instance: CML.ProtocolParamUpdate,
): CML.Rational | undefined =>
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
    catch: () =>
      new ProtocolParamUpdateError({
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
 *   const result = ProtocolParamUpdate.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProtocolParamUpdate.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

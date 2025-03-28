import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type NoConfidence = CML.NoConfidence;

export class NoConfidenceError extends Data.TaggedError("NoConfidenceError")<{
  message?: string;
}> {}

/**
 * Method free of NoConfidence
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NoConfidence instance
 * const instance = ... ;
 *   const result = yield* NoConfidence.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.NoConfidence): Effect.Effect<void, NoConfidenceError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new NoConfidenceError({
          message: `NoConfidence.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NoConfidence instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NoConfidence.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NoConfidence.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.NoConfidence): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of NoConfidence
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NoConfidence instance
 * const instance = ... ;
 *   const result = yield* NoConfidence.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.NoConfidence): Effect.Effect<Uint8Array, NoConfidenceError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new NoConfidenceError({
          message: `NoConfidence.toCborBytes failed NoConfidence is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NoConfidence instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NoConfidence.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NoConfidence.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.NoConfidence): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of NoConfidence
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NoConfidence instance
 * const instance = ... ;
 *   const result = yield* NoConfidence.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.NoConfidence): Effect.Effect<Uint8Array, NoConfidenceError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new NoConfidenceError({
          message: `NoConfidence.toCanonicalCborBytes failed NoConfidence is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NoConfidence instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NoConfidence.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NoConfidence.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.NoConfidence,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of NoConfidence
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NoConfidence.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.NoConfidence.from_cbor_bytes(cborBytes),
    catch: () =>
      new NoConfidenceError({
        message: `NoConfidence.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls NoConfidence.fromCborBytes without Effect wrapper
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NoConfidence.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NoConfidence.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of NoConfidence
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NoConfidence instance
 * const instance = ... ;
 *   const result = yield* NoConfidence.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.NoConfidence): Effect.Effect<string, NoConfidenceError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new NoConfidenceError({
          message: `NoConfidence.toCborHex failed NoConfidence is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NoConfidence instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NoConfidence.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NoConfidence.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.NoConfidence): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of NoConfidence
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NoConfidence instance
 * const instance = ... ;
 *   const result = yield* NoConfidence.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.NoConfidence): Effect.Effect<string, NoConfidenceError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new NoConfidenceError({
          message: `NoConfidence.toCanonicalCborHex failed NoConfidence is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NoConfidence instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NoConfidence.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NoConfidence.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.NoConfidence): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of NoConfidence
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NoConfidence.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.NoConfidence.from_cbor_hex(cborBytes),
    catch: () =>
      new NoConfidenceError({
        message: `NoConfidence.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls NoConfidence.fromCborHex without Effect wrapper
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NoConfidence.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NoConfidence.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of NoConfidence
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NoConfidence instance
 * const instance = ... ;
 *   const result = yield* NoConfidence.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.NoConfidence): Effect.Effect<string, NoConfidenceError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new NoConfidenceError({
          message: `NoConfidence.toJson failed NoConfidence is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NoConfidence instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NoConfidence.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NoConfidence.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.NoConfidence): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of NoConfidence
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NoConfidence instance
 * const instance = ... ;
 *   const result = yield* NoConfidence.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.NoConfidence): Effect.Effect<any, NoConfidenceError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new NoConfidenceError({
          message: `NoConfidence.toJsValue failed NoConfidence is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NoConfidence instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NoConfidence.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NoConfidence.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.NoConfidence): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of NoConfidence
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NoConfidence.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.NoConfidence.from_json(json),
    catch: () =>
      new NoConfidenceError({
        message: `NoConfidence.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls NoConfidence.fromJson without Effect wrapper
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NoConfidence.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NoConfidence.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method actionId of NoConfidence
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NoConfidence instance
 * const instance = ... ;
 *   const result = yield* NoConfidence.actionId(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const actionId = Effect.fn(
  (
    instance: CML.NoConfidence,
  ): Effect.Effect<CML.GovActionId | undefined, NoConfidenceError> =>
    Effect.try({
      try: () => instance.action_id(),
      catch: () =>
        new NoConfidenceError({
          message: `NoConfidence.actionId failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.actionId without Effect wrapper
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 *
 * // Assume we have a NoConfidence instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NoConfidence.unsafeActionId(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NoConfidence.unsafeActionId failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeActionId = (
  instance: CML.NoConfidence,
): CML.GovActionId | undefined => Effect.runSync(actionId(instance));

/**
 * Static method _new of NoConfidence
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* NoConfidence._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (actionId: CML.GovActionId) {
  return yield* Effect.try({
    try: () => CML.NoConfidence.new(actionId),
    catch: () =>
      new NoConfidenceError({
        message: `NoConfidence._new failed with parameters: ${actionId} (GovActionId). `,
      }),
  });
});

/**
 * Unsafely calls NoConfidence._new without Effect wrapper
 *
 * @example
 * import { NoConfidence } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = NoConfidence.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NoConfidence.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (actionId: CML.GovActionId) =>
  Effect.runSync(_new(actionId));

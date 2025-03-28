import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type GovActionId = CML.GovActionId;

export class GovActionIdError extends Data.TaggedError("GovActionIdError")<{
  message?: string;
}> {}

/**
 * Method free of GovActionId
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *   const result = yield* GovActionId.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.GovActionId): Effect.Effect<void, GovActionIdError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 *
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionId.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionId.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.GovActionId): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of GovActionId
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *   const result = yield* GovActionId.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.GovActionId): Effect.Effect<Uint8Array, GovActionIdError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.toCborBytes failed GovActionId is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 *
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionId.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionId.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.GovActionId): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of GovActionId
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *   const result = yield* GovActionId.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.GovActionId): Effect.Effect<Uint8Array, GovActionIdError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.toCanonicalCborBytes failed GovActionId is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 *
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionId.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionId.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.GovActionId,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of GovActionId
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* GovActionId.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.GovActionId.from_cbor_bytes(cborBytes),
    catch: () =>
      new GovActionIdError({
        message: `GovActionId.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls GovActionId.fromCborBytes without Effect wrapper
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionId.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionId.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of GovActionId
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *   const result = yield* GovActionId.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.GovActionId): Effect.Effect<string, GovActionIdError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.toCborHex failed GovActionId is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 *
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionId.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionId.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.GovActionId): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of GovActionId
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *   const result = yield* GovActionId.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.GovActionId): Effect.Effect<string, GovActionIdError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.toCanonicalCborHex failed GovActionId is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 *
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionId.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionId.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.GovActionId): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of GovActionId
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* GovActionId.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.GovActionId.from_cbor_hex(cborBytes),
    catch: () =>
      new GovActionIdError({
        message: `GovActionId.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls GovActionId.fromCborHex without Effect wrapper
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionId.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionId.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of GovActionId
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *   const result = yield* GovActionId.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.GovActionId): Effect.Effect<string, GovActionIdError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.toJson failed GovActionId is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 *
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionId.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionId.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.GovActionId): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of GovActionId
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *   const result = yield* GovActionId.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.GovActionId): Effect.Effect<any, GovActionIdError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.toJsValue failed GovActionId is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 *
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionId.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionId.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.GovActionId): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of GovActionId
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* GovActionId.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.GovActionId.from_json(json),
    catch: () =>
      new GovActionIdError({
        message: `GovActionId.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls GovActionId.fromJson without Effect wrapper
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionId.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionId.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method transactionId of GovActionId
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *   const result = yield* GovActionId.transactionId(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const transactionId = Effect.fn(
  (
    instance: CML.GovActionId,
  ): Effect.Effect<CML.TransactionHash, GovActionIdError> =>
    Effect.try({
      try: () => instance.transaction_id(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.transactionId failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.transactionId without Effect wrapper
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 *
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionId.unsafeTransactionId(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionId.unsafeTransactionId failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeTransactionId = (
  instance: CML.GovActionId,
): CML.TransactionHash => Effect.runSync(transactionId(instance));

/**
 * Method govActionIndex of GovActionId
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *   const result = yield* GovActionId.govActionIndex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const govActionIndex = Effect.fn(
  (instance: CML.GovActionId): Effect.Effect<bigint, GovActionIdError> =>
    Effect.try({
      try: () => instance.gov_action_index(),
      catch: () =>
        new GovActionIdError({
          message: `GovActionId.govActionIndex failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.govActionIndex without Effect wrapper
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 *
 * // Assume we have a GovActionId instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionId.unsafeGovActionIndex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionId.unsafeGovActionIndex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGovActionIndex = (instance: CML.GovActionId): bigint =>
  Effect.runSync(govActionIndex(instance));

/**
 * Static method _new of GovActionId
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* GovActionId._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  transactionId: CML.TransactionHash,
  govActionIndex: bigint,
) {
  return yield* Effect.try({
    try: () => CML.GovActionId.new(transactionId, govActionIndex),
    catch: () =>
      new GovActionIdError({
        message: `GovActionId._new failed with parameters: ${transactionId} (TransactionHash), ${govActionIndex}. `,
      }),
  });
});

/**
 * Unsafely calls GovActionId._new without Effect wrapper
 *
 * @example
 * import { GovActionId } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionId.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionId.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (
  transactionId: CML.TransactionHash,
  govActionIndex: bigint,
) => Effect.runSync(_new(transactionId, govActionIndex));

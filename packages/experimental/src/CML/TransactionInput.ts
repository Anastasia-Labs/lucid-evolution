import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type TransactionInput = CML.TransactionInput;

export class TransactionInputError extends Data.TaggedError("TransactionInputError")<{
  message?: string;
}> {}

/**
 * Method free of TransactionInput
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 *   const result = yield* TransactionInput.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.TransactionInput): Effect.Effect<void, TransactionInputError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionInputError({
          message: `TransactionInput.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInput.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInput.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.TransactionInput): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of TransactionInput
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 *   const result = yield* TransactionInput.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.TransactionInput): Effect.Effect<Uint8Array, TransactionInputError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new TransactionInputError({
          message: `TransactionInput.toCborBytes failed TransactionInput is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInput.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInput.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.TransactionInput): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of TransactionInput
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 *   const result = yield* TransactionInput.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.TransactionInput): Effect.Effect<Uint8Array, TransactionInputError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new TransactionInputError({
          message: `TransactionInput.toCanonicalCborBytes failed TransactionInput is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInput.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInput.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.TransactionInput): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of TransactionInput
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionInput.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.TransactionInput.from_cbor_bytes(cborBytes),
    catch: () => new TransactionInputError({
      message: `TransactionInput.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls TransactionInput.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInput.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInput.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of TransactionInput
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 *   const result = yield* TransactionInput.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.TransactionInput): Effect.Effect<string, TransactionInputError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new TransactionInputError({
          message: `TransactionInput.toCborHex failed TransactionInput is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInput.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInput.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.TransactionInput): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of TransactionInput
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 *   const result = yield* TransactionInput.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.TransactionInput): Effect.Effect<string, TransactionInputError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new TransactionInputError({
          message: `TransactionInput.toCanonicalCborHex failed TransactionInput is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInput.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInput.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.TransactionInput): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of TransactionInput
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionInput.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.TransactionInput.from_cbor_hex(cborBytes),
    catch: () => new TransactionInputError({
      message: `TransactionInput.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls TransactionInput.fromCborHex without Effect wrapper
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInput.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInput.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of TransactionInput
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 *   const result = yield* TransactionInput.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.TransactionInput): Effect.Effect<string, TransactionInputError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new TransactionInputError({
          message: `TransactionInput.toJson failed TransactionInput is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInput.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInput.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.TransactionInput): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of TransactionInput
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 *   const result = yield* TransactionInput.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.TransactionInput): Effect.Effect<any, TransactionInputError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new TransactionInputError({
          message: `TransactionInput.toJsValue failed TransactionInput is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInput.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInput.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.TransactionInput): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of TransactionInput
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionInput.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.TransactionInput.from_json(json),
    catch: () => new TransactionInputError({
      message: `TransactionInput.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls TransactionInput.fromJson without Effect wrapper
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInput.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInput.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method transactionId of TransactionInput
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 *   const result = yield* TransactionInput.transactionId(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const transactionId = Effect.fn(
  (instance: CML.TransactionInput): Effect.Effect<CML.TransactionHash, TransactionInputError> =>
    Effect.try({
      try: () => instance.transaction_id(),
      catch: () =>
        new TransactionInputError({
          message: `TransactionInput.transactionId failed `,
        }),
    })
);

/**
 * Unsafely calls instance.transactionId without Effect wrapper
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInput.unsafeTransactionId(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInput.unsafeTransactionId failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeTransactionId = (instance: CML.TransactionInput): CML.TransactionHash =>
  Effect.runSync(transactionId(instance));

/**
 * Method index of TransactionInput
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 *   const result = yield* TransactionInput.index(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const index = Effect.fn(
  (instance: CML.TransactionInput): Effect.Effect<bigint, TransactionInputError> =>
    Effect.try({
      try: () => instance.index(),
      catch: () =>
        new TransactionInputError({
          message: `TransactionInput.index failed `,
        }),
    })
);

/**
 * Unsafely calls instance.index without Effect wrapper
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionInput instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInput.unsafeIndex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInput.unsafeIndex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeIndex = (instance: CML.TransactionInput): bigint =>
  Effect.runSync(index(instance));

/**
 * Static method _new of TransactionInput
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionInput._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (transactionId: CML.TransactionHash, index: bigint) {
  return yield* Effect.try({
    try: () => CML.TransactionInput.new(transactionId, index),
    catch: () => new TransactionInputError({
      message: `TransactionInput._new failed with parameters: ${transactionId} (TransactionHash), ${index}. `,
    }),
  });
});

/**
 * Unsafely calls TransactionInput._new without Effect wrapper
 * 
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInput.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInput.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (transactionId: CML.TransactionHash, index: bigint) =>
  Effect.runSync(_new(transactionId, index));

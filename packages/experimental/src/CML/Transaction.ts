import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Transaction = CML.Transaction;

export class TransactionError extends Data.TaggedError("TransactionError")<{
  message?: string;
}> {}

/**
 * Method free of Transaction
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *   const result = yield* Transaction.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Transaction): Effect.Effect<void, TransactionError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionError({
          message: `Transaction.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Transaction.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Transaction): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Transaction
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *   const result = yield* Transaction.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Transaction): Effect.Effect<Uint8Array, TransactionError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new TransactionError({
          message: `Transaction.toCborBytes failed Transaction is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Transaction.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.Transaction): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Transaction
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *   const result = yield* Transaction.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Transaction): Effect.Effect<Uint8Array, TransactionError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new TransactionError({
          message: `Transaction.toCanonicalCborBytes failed Transaction is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Transaction.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.Transaction,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Transaction
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Transaction.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Transaction.from_cbor_bytes(cborBytes),
    catch: () =>
      new TransactionError({
        message: `Transaction.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Transaction.fromCborBytes without Effect wrapper
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Transaction.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Transaction
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *   const result = yield* Transaction.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Transaction): Effect.Effect<string, TransactionError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new TransactionError({
          message: `Transaction.toCborHex failed Transaction is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Transaction.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.Transaction): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Transaction
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *   const result = yield* Transaction.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Transaction): Effect.Effect<string, TransactionError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new TransactionError({
          message: `Transaction.toCanonicalCborHex failed Transaction is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Transaction.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.Transaction): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Transaction
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Transaction.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Transaction.from_cbor_hex(cborBytes),
    catch: () =>
      new TransactionError({
        message: `Transaction.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls Transaction.fromCborHex without Effect wrapper
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Transaction.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Transaction
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *   const result = yield* Transaction.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Transaction): Effect.Effect<string, TransactionError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new TransactionError({
          message: `Transaction.toJson failed Transaction is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Transaction.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.Transaction): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Transaction
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *   const result = yield* Transaction.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Transaction): Effect.Effect<any, TransactionError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new TransactionError({
          message: `Transaction.toJsValue failed Transaction is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Transaction.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.Transaction): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Transaction
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Transaction.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Transaction.from_json(json),
    catch: () =>
      new TransactionError({
        message: `Transaction.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls Transaction.fromJson without Effect wrapper
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Transaction.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method body of Transaction
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *   const result = yield* Transaction.body(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const body = Effect.fn(
  (
    instance: CML.Transaction,
  ): Effect.Effect<CML.TransactionBody, TransactionError> =>
    Effect.try({
      try: () => instance.body(),
      catch: () =>
        new TransactionError({
          message: `Transaction.body failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.body without Effect wrapper
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Transaction.unsafeBody(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.unsafeBody failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeBody = (instance: CML.Transaction): CML.TransactionBody =>
  Effect.runSync(body(instance));

/**
 * Method witnessSet of Transaction
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *   const result = yield* Transaction.witnessSet(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const witnessSet = Effect.fn(
  (
    instance: CML.Transaction,
  ): Effect.Effect<CML.TransactionWitnessSet, TransactionError> =>
    Effect.try({
      try: () => instance.witness_set(),
      catch: () =>
        new TransactionError({
          message: `Transaction.witnessSet failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.witnessSet without Effect wrapper
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Transaction.unsafeWitnessSet(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.unsafeWitnessSet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeWitnessSet = (
  instance: CML.Transaction,
): CML.TransactionWitnessSet => Effect.runSync(witnessSet(instance));

/**
 * Method isValid of Transaction
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *   const result = yield* Transaction.isValid(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const isValid = Effect.fn(
  (instance: CML.Transaction): Effect.Effect<boolean, TransactionError> =>
    Effect.try({
      try: () => instance.is_valid(),
      catch: () =>
        new TransactionError({
          message: `Transaction.isValid failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.isValid without Effect wrapper
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Transaction.unsafeIsValid(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.unsafeIsValid failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeIsValid = (instance: CML.Transaction): boolean =>
  Effect.runSync(isValid(instance));

/**
 * Method auxiliaryData of Transaction
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *   const result = yield* Transaction.auxiliaryData(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const auxiliaryData = Effect.fn(
  (
    instance: CML.Transaction,
  ): Effect.Effect<CML.AuxiliaryData | undefined, TransactionError> =>
    Effect.try({
      try: () => instance.auxiliary_data(),
      catch: () =>
        new TransactionError({
          message: `Transaction.auxiliaryData failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.auxiliaryData without Effect wrapper
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Transaction instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Transaction.unsafeAuxiliaryData(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.unsafeAuxiliaryData failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAuxiliaryData = (
  instance: CML.Transaction,
): CML.AuxiliaryData | undefined => Effect.runSync(auxiliaryData(instance));

/**
 * Static method _new of Transaction
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Transaction._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSet,
  isValid: boolean,
  auxiliaryData: CML.AuxiliaryData,
) {
  return yield* Effect.try({
    try: () => CML.Transaction.new(body, witnessSet, isValid, auxiliaryData),
    catch: () =>
      new TransactionError({
        message: `Transaction._new failed with parameters: ${body} (TransactionBody), ${witnessSet} (TransactionWitnessSet), ${isValid}, ${auxiliaryData} (AuxiliaryData). `,
      }),
  });
});

/**
 * Unsafely calls Transaction._new without Effect wrapper
 *
 * @example
 * import { Transaction } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Transaction.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSet,
  isValid: boolean,
  auxiliaryData: CML.AuxiliaryData,
) => Effect.runSync(_new(body, witnessSet, isValid, auxiliaryData));

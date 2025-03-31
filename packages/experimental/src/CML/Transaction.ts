/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Transaction class
 *
 * @since 2.0.0
 * @category Types
 */
export type Transaction = CML.Transaction;

/**
 * Error class for Transaction operations
 * 
 * This error is thrown when operations on Transaction instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
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
    })
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
 *   const result = Transaction.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Transaction): void =>
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
    })
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
 *   const result = Transaction.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Transaction): Uint8Array =>
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
    })
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
 *   const result = Transaction.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Transaction): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

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
    catch: () => new TransactionError({
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
 *   const result = Transaction.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
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
    })
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
 *   const result = Transaction.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Transaction): string =>
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
    })
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
 *   const result = Transaction.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Transaction): string =>
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
    catch: () => new TransactionError({
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
 *   const result = Transaction.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
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
    })
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
 *   const result = Transaction.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Transaction): string =>
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
    })
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
 *   const result = Transaction.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Transaction): any =>
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
    catch: () => new TransactionError({
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
 *   const result = Transaction.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

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
  (instance: CML.Transaction): Effect.Effect<CML.TransactionBody, TransactionError> =>
    Effect.try({
      try: () => instance.body(),
      catch: () =>
        new TransactionError({
          message: `Transaction.body failed `,
        }),
    })
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
 *   const result = Transaction.bodyUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.bodyUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const bodyUnsafe = (instance: CML.Transaction): CML.TransactionBody =>
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
  (instance: CML.Transaction): Effect.Effect<CML.TransactionWitnessSet, TransactionError> =>
    Effect.try({
      try: () => instance.witness_set(),
      catch: () =>
        new TransactionError({
          message: `Transaction.witnessSet failed `,
        }),
    })
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
 *   const result = Transaction.witnessSetUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.witnessSetUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const witnessSetUnsafe = (instance: CML.Transaction): CML.TransactionWitnessSet =>
  Effect.runSync(witnessSet(instance));

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
    })
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
 *   const result = Transaction.isValidUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.isValidUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const isValidUnsafe = (instance: CML.Transaction): boolean =>
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
  (instance: CML.Transaction): Effect.Effect<CML.AuxiliaryData | undefined, TransactionError> =>
    Effect.try({
      try: () => instance.auxiliary_data(),
      catch: () =>
        new TransactionError({
          message: `Transaction.auxiliaryData failed `,
        }),
    })
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
 *   const result = Transaction.auxiliaryDataUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction.auxiliaryDataUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const auxiliaryDataUnsafe = (instance: CML.Transaction): CML.AuxiliaryData | undefined =>
  Effect.runSync(auxiliaryData(instance));

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
export const _new = Effect.fn(function* (body: CML.TransactionBody, witnessSet: CML.TransactionWitnessSet, isValid: boolean, auxiliaryData: CML.AuxiliaryData) {
  return yield* Effect.try({
    try: () => CML.Transaction.new(body, witnessSet, isValid, auxiliaryData),
    catch: () => new TransactionError({
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
 *   const result = Transaction._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Transaction._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (body: CML.TransactionBody, witnessSet: CML.TransactionWitnessSet, isValid: boolean, auxiliaryData: CML.AuxiliaryData) =>
  Effect.runSync(_new(body, witnessSet, isValid, auxiliaryData));

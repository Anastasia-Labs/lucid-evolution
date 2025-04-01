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
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.Transaction,
) => Effect.Effect<void, TransactionError> = Effect.fn(
  (instance: CML.Transaction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Transaction): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Transaction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.Transaction,
) => Effect.Effect<Uint8Array, TransactionError> = Effect.fn(
  (instance: CML.Transaction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Transaction): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Transaction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.Transaction,
) => Effect.Effect<Uint8Array, TransactionError> = Effect.fn(
  (instance: CML.Transaction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.Transaction,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Transaction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Transaction, TransactionError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Transaction =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Transaction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.Transaction,
) => Effect.Effect<string, TransactionError> = Effect.fn(
  (instance: CML.Transaction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Transaction): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Transaction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.Transaction,
) => Effect.Effect<string, TransactionError> = Effect.fn(
  (instance: CML.Transaction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Transaction): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Transaction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Transaction, TransactionError> = Effect.fn(function* (
  cborBytes: string,
) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.Transaction =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Transaction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.Transaction,
) => Effect.Effect<string, TransactionError> = Effect.fn(
  (instance: CML.Transaction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Transaction): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Transaction
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.Transaction,
) => Effect.Effect<any, TransactionError> = Effect.fn(
  (instance: CML.Transaction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Transaction): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Transaction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.Transaction, TransactionError> = Effect.fn(function* (
  json: string,
) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Transaction =>
  Effect.runSync(fromJson(json));

/**
 * Method body of Transaction
 *
 * @since 2.0.0
 * @category Methods
 */
export const body: (
  instance: CML.Transaction,
) => Effect.Effect<CML.TransactionBody, TransactionError> = Effect.fn(
  (instance: CML.Transaction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const bodyUnsafe = (instance: CML.Transaction): CML.TransactionBody =>
  Effect.runSync(body(instance));

/**
 * Method witnessSet of Transaction
 *
 * @since 2.0.0
 * @category Methods
 */
export const witnessSet: (
  instance: CML.Transaction,
) => Effect.Effect<CML.TransactionWitnessSet, TransactionError> = Effect.fn(
  (instance: CML.Transaction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const witnessSetUnsafe = (
  instance: CML.Transaction,
): CML.TransactionWitnessSet => Effect.runSync(witnessSet(instance));

/**
 * Method isValid of Transaction
 *
 * @since 2.0.0
 * @category Methods
 */
export const isValid: (
  instance: CML.Transaction,
) => Effect.Effect<boolean, TransactionError> = Effect.fn(
  (instance: CML.Transaction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const isValidUnsafe = (instance: CML.Transaction): boolean =>
  Effect.runSync(isValid(instance));

/**
 * Method auxiliaryData of Transaction
 *
 * @since 2.0.0
 * @category Methods
 */
export const auxiliaryData: (
  instance: CML.Transaction,
) => Effect.Effect<CML.AuxiliaryData | undefined, TransactionError> = Effect.fn(
  (instance: CML.Transaction) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const auxiliaryDataUnsafe = (
  instance: CML.Transaction,
): CML.AuxiliaryData | undefined => Effect.runSync(auxiliaryData(instance));

/**
 * Static method _new of Transaction
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSet,
  isValid: boolean,
  auxiliaryData: CML.AuxiliaryData,
) => Effect.Effect<CML.Transaction, TransactionError> = Effect.fn(function* (
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSet,
  isValid: boolean,
  auxiliaryData: CML.AuxiliaryData,
): CML.Transaction =>
  Effect.runSync(_new(body, witnessSet, isValid, auxiliaryData));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionInput class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionInput = CML.TransactionInput;

/**
 * Error class for TransactionInput operations
 * 
 * This error is thrown when operations on TransactionInput instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionInputError extends Data.TaggedError("TransactionInputError")<{
  message?: string;
}> {}

/**
 * Method free of TransactionInput
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.TransactionInput) => Effect.Effect<void, TransactionInputError> = Effect.fn(
  (instance: CML.TransactionInput) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionInput): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of TransactionInput
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.TransactionInput) => Effect.Effect<Uint8Array, TransactionInputError> = Effect.fn(
  (instance: CML.TransactionInput) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.TransactionInput): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of TransactionInput
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.TransactionInput) => Effect.Effect<Uint8Array, TransactionInputError> = Effect.fn(
  (instance: CML.TransactionInput) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.TransactionInput): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of TransactionInput
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.TransactionInput, TransactionInputError> = Effect.fn(function* (cborBytes: Uint8Array) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.TransactionInput =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of TransactionInput
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.TransactionInput) => Effect.Effect<string, TransactionInputError> = Effect.fn(
  (instance: CML.TransactionInput) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.TransactionInput): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of TransactionInput
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.TransactionInput) => Effect.Effect<string, TransactionInputError> = Effect.fn(
  (instance: CML.TransactionInput) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.TransactionInput): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of TransactionInput
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.TransactionInput, TransactionInputError> = Effect.fn(function* (cborBytes: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.TransactionInput =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of TransactionInput
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.TransactionInput) => Effect.Effect<string, TransactionInputError> = Effect.fn(
  (instance: CML.TransactionInput) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.TransactionInput): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of TransactionInput
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.TransactionInput) => Effect.Effect<any, TransactionInputError> = Effect.fn(
  (instance: CML.TransactionInput) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.TransactionInput): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of TransactionInput
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.TransactionInput, TransactionInputError> = Effect.fn(function* (json: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.TransactionInput =>
  Effect.runSync(fromJson(json));

/**
 * Method transactionId of TransactionInput
 * 
 * @since 2.0.0
 * @category Methods
 */
export const transactionId: (instance: CML.TransactionInput) => Effect.Effect<CML.TransactionHash, TransactionInputError> = Effect.fn(
  (instance: CML.TransactionInput) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const transactionIdUnsafe = (instance: CML.TransactionInput): CML.TransactionHash =>
  Effect.runSync(transactionId(instance));

/**
 * Method index of TransactionInput
 * 
 * @since 2.0.0
 * @category Methods
 */
export const index: (instance: CML.TransactionInput) => Effect.Effect<bigint, TransactionInputError> = Effect.fn(
  (instance: CML.TransactionInput) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const indexUnsafe = (instance: CML.TransactionInput): bigint =>
  Effect.runSync(index(instance));

/**
 * Static method _new of TransactionInput
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (transactionId: CML.TransactionHash, index: bigint) => Effect.Effect<CML.TransactionInput, TransactionInputError> = Effect.fn(function* (transactionId: CML.TransactionHash, index: bigint) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (transactionId: CML.TransactionHash, index: bigint): CML.TransactionInput =>
  Effect.runSync(_new(transactionId, index));

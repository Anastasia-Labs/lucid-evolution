import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Block = CML.Block;

export class BlockError extends Data.TaggedError("BlockError")<{
  message?: string;
}> {}

/**
 * Method free of Block
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Block instance
 * const instance = ... ;
 *   const result = yield* Block.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Block): Effect.Effect<void, BlockError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new BlockError({
          message: `Block.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Block instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Block.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Block.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Block): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Block
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Block instance
 * const instance = ... ;
 *   const result = yield* Block.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Block): Effect.Effect<Uint8Array, BlockError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new BlockError({
          message: `Block.toCborBytes failed Block is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Block instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Block.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Block.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.Block): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Block
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Block instance
 * const instance = ... ;
 *   const result = yield* Block.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Block): Effect.Effect<Uint8Array, BlockError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new BlockError({
          message: `Block.toCanonicalCborBytes failed Block is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Block instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Block.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Block.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.Block): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Block
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Block.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Block.from_cbor_bytes(cborBytes),
    catch: () => new BlockError({
      message: `Block.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Block.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Block.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Block.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Block
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Block instance
 * const instance = ... ;
 *   const result = yield* Block.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Block): Effect.Effect<string, BlockError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new BlockError({
          message: `Block.toCborHex failed Block is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Block instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Block.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Block.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.Block): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Block
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Block instance
 * const instance = ... ;
 *   const result = yield* Block.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Block): Effect.Effect<string, BlockError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new BlockError({
          message: `Block.toCanonicalCborHex failed Block is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Block instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Block.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Block.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.Block): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Block
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Block.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Block.from_cbor_hex(cborBytes),
    catch: () => new BlockError({
      message: `Block.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls Block.fromCborHex without Effect wrapper
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Block.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Block.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Block
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Block instance
 * const instance = ... ;
 *   const result = yield* Block.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Block): Effect.Effect<string, BlockError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new BlockError({
          message: `Block.toJson failed Block is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Block instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Block.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Block.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.Block): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Block
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Block instance
 * const instance = ... ;
 *   const result = yield* Block.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Block): Effect.Effect<any, BlockError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new BlockError({
          message: `Block.toJsValue failed Block is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Block instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Block.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Block.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.Block): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Block
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Block.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Block.from_json(json),
    catch: () => new BlockError({
      message: `Block.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Block.fromJson without Effect wrapper
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Block.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Block.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method header of Block
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Block instance
 * const instance = ... ;
 *   const result = yield* Block.header(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const header = Effect.fn(
  (instance: CML.Block): Effect.Effect<CML.Header, BlockError> =>
    Effect.try({
      try: () => instance.header(),
      catch: () =>
        new BlockError({
          message: `Block.header failed `,
        }),
    })
);

/**
 * Unsafely calls instance.header without Effect wrapper
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Block instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Block.unsafeHeader(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Block.unsafeHeader failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeHeader = (instance: CML.Block): CML.Header =>
  Effect.runSync(header(instance));

/**
 * Method transactionBodies of Block
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Block instance
 * const instance = ... ;
 *   const result = yield* Block.transactionBodies(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const transactionBodies = Effect.fn(
  (instance: CML.Block): Effect.Effect<CML.TransactionBodyList, BlockError> =>
    Effect.try({
      try: () => instance.transaction_bodies(),
      catch: () =>
        new BlockError({
          message: `Block.transactionBodies failed `,
        }),
    })
);

/**
 * Unsafely calls instance.transactionBodies without Effect wrapper
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Block instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Block.unsafeTransactionBodies(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Block.unsafeTransactionBodies failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeTransactionBodies = (instance: CML.Block): CML.TransactionBodyList =>
  Effect.runSync(transactionBodies(instance));

/**
 * Method transactionWitnessSets of Block
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Block instance
 * const instance = ... ;
 *   const result = yield* Block.transactionWitnessSets(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const transactionWitnessSets = Effect.fn(
  (instance: CML.Block): Effect.Effect<CML.TransactionWitnessSetList, BlockError> =>
    Effect.try({
      try: () => instance.transaction_witness_sets(),
      catch: () =>
        new BlockError({
          message: `Block.transactionWitnessSets failed `,
        }),
    })
);

/**
 * Unsafely calls instance.transactionWitnessSets without Effect wrapper
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Block instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Block.unsafeTransactionWitnessSets(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Block.unsafeTransactionWitnessSets failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeTransactionWitnessSets = (instance: CML.Block): CML.TransactionWitnessSetList =>
  Effect.runSync(transactionWitnessSets(instance));

/**
 * Method auxiliaryDataSet of Block
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Block instance
 * const instance = ... ;
 *   const result = yield* Block.auxiliaryDataSet(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const auxiliaryDataSet = Effect.fn(
  (instance: CML.Block): Effect.Effect<CML.MapTransactionIndexToAuxiliaryData, BlockError> =>
    Effect.try({
      try: () => instance.auxiliary_data_set(),
      catch: () =>
        new BlockError({
          message: `Block.auxiliaryDataSet failed `,
        }),
    })
);

/**
 * Unsafely calls instance.auxiliaryDataSet without Effect wrapper
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Block instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Block.unsafeAuxiliaryDataSet(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Block.unsafeAuxiliaryDataSet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAuxiliaryDataSet = (instance: CML.Block): CML.MapTransactionIndexToAuxiliaryData =>
  Effect.runSync(auxiliaryDataSet(instance));

/**
 * Method invalidTransactions of Block
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Block instance
 * const instance = ... ;
 *   const result = yield* Block.invalidTransactions(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const invalidTransactions = Effect.fn(
  (instance: CML.Block): Effect.Effect<Uint16Array, BlockError> =>
    Effect.try({
      try: () => instance.invalid_transactions(),
      catch: () =>
        new BlockError({
          message: `Block.invalidTransactions failed `,
        }),
    })
);

/**
 * Unsafely calls instance.invalidTransactions without Effect wrapper
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Block instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Block.unsafeInvalidTransactions(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Block.unsafeInvalidTransactions failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeInvalidTransactions = (instance: CML.Block): Uint16Array =>
  Effect.runSync(invalidTransactions(instance));

/**
 * Static method _new of Block
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Block._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (header: CML.Header, transactionBodies: CML.TransactionBodyList, transactionWitnessSets: CML.TransactionWitnessSetList, auxiliaryDataSet: CML.MapTransactionIndexToAuxiliaryData, invalidTransactions: Uint16Array) {
  return yield* Effect.try({
    try: () => CML.Block.new(header, transactionBodies, transactionWitnessSets, auxiliaryDataSet, invalidTransactions),
    catch: () => new BlockError({
      message: `Block._new failed with parameters: ${header} (Header), ${transactionBodies} (TransactionBodyList), ${transactionWitnessSets} (TransactionWitnessSetList), ${auxiliaryDataSet} (MapTransactionIndexToAuxiliaryData), ${invalidTransactions}. `,
    }),
  });
});

/**
 * Unsafely calls Block._new without Effect wrapper
 * 
 * @example
 * import { Block } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Block.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Block.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (header: CML.Header, transactionBodies: CML.TransactionBodyList, transactionWitnessSets: CML.TransactionWitnessSetList, auxiliaryDataSet: CML.MapTransactionIndexToAuxiliaryData, invalidTransactions: Uint16Array) =>
  Effect.runSync(_new(header, transactionBodies, transactionWitnessSets, auxiliaryDataSet, invalidTransactions));

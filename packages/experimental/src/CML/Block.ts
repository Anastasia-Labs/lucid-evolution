/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Block class
 *
 * @since 2.0.0
 * @category Types
 */
export type Block = CML.Block;

/**
 * Error class for Block operations
 *
 * This error is thrown when operations on Block instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class BlockError extends Data.TaggedError("BlockError")<{
  message?: string;
}> {}

/**
 * Method free of Block
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Block) => Effect.Effect<void, BlockError> =
  Effect.fn((instance: CML.Block) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new BlockError({
          message: `Block.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
  );

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Block): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Block
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.Block,
) => Effect.Effect<Uint8Array, BlockError> = Effect.fn((instance: CML.Block) =>
  Effect.try({
    try: () => instance.to_cbor_bytes(),
    catch: () =>
      new BlockError({
        message: `Block.toCborBytes failed Block is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Block): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Block
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.Block,
) => Effect.Effect<Uint8Array, BlockError> = Effect.fn((instance: CML.Block) =>
  Effect.try({
    try: () => instance.to_canonical_cbor_bytes(),
    catch: () =>
      new BlockError({
        message: `Block.toCanonicalCborBytes failed Block is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Block): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Block
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Block, BlockError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.Block.from_cbor_bytes(cborBytes),
    catch: () =>
      new BlockError({
        message: `Block.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Block.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Block =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Block
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.Block,
) => Effect.Effect<string, BlockError> = Effect.fn((instance: CML.Block) =>
  Effect.try({
    try: () => instance.to_cbor_hex(),
    catch: () =>
      new BlockError({
        message: `Block.toCborHex failed Block is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Block): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Block
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.Block,
) => Effect.Effect<string, BlockError> = Effect.fn((instance: CML.Block) =>
  Effect.try({
    try: () => instance.to_canonical_cbor_hex(),
    catch: () =>
      new BlockError({
        message: `Block.toCanonicalCborHex failed Block is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Block): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Block
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Block, BlockError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.Block.from_cbor_hex(cborBytes),
    catch: () =>
      new BlockError({
        message: `Block.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls Block.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.Block =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Block
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.Block,
) => Effect.Effect<string, BlockError> = Effect.fn((instance: CML.Block) =>
  Effect.try({
    try: () => instance.to_json(),
    catch: () =>
      new BlockError({
        message: `Block.toJson failed Block is not valid for string conversion. Hint: Validate your JSON structure.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Block): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Block
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.Block,
) => Effect.Effect<any, BlockError> = Effect.fn((instance: CML.Block) =>
  Effect.try({
    try: () => instance.to_js_value(),
    catch: () =>
      new BlockError({
        message: `Block.toJsValue failed Block is not valid for any conversion. `,
      }),
  }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Block): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Block
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.Block, BlockError> =
  Effect.fn(function* (json: string) {
    return yield* Effect.try({
      try: () => CML.Block.from_json(json),
      catch: () =>
        new BlockError({
          message: `Block.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  });

/**
 * Unsafely calls Block.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Block =>
  Effect.runSync(fromJson(json));

/**
 * Method header of Block
 *
 * @since 2.0.0
 * @category Methods
 */
export const header: (
  instance: CML.Block,
) => Effect.Effect<CML.Header, BlockError> = Effect.fn((instance: CML.Block) =>
  Effect.try({
    try: () => instance.header(),
    catch: () =>
      new BlockError({
        message: `Block.header failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.header without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const headerUnsafe = (instance: CML.Block): CML.Header =>
  Effect.runSync(header(instance));

/**
 * Method transactionBodies of Block
 *
 * @since 2.0.0
 * @category Methods
 */
export const transactionBodies: (
  instance: CML.Block,
) => Effect.Effect<CML.TransactionBodyList, BlockError> = Effect.fn(
  (instance: CML.Block) =>
    Effect.try({
      try: () => instance.transaction_bodies(),
      catch: () =>
        new BlockError({
          message: `Block.transactionBodies failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.transactionBodies without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const transactionBodiesUnsafe = (
  instance: CML.Block,
): CML.TransactionBodyList => Effect.runSync(transactionBodies(instance));

/**
 * Method transactionWitnessSets of Block
 *
 * @since 2.0.0
 * @category Methods
 */
export const transactionWitnessSets: (
  instance: CML.Block,
) => Effect.Effect<CML.TransactionWitnessSetList, BlockError> = Effect.fn(
  (instance: CML.Block) =>
    Effect.try({
      try: () => instance.transaction_witness_sets(),
      catch: () =>
        new BlockError({
          message: `Block.transactionWitnessSets failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.transactionWitnessSets without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const transactionWitnessSetsUnsafe = (
  instance: CML.Block,
): CML.TransactionWitnessSetList =>
  Effect.runSync(transactionWitnessSets(instance));

/**
 * Method auxiliaryDataSet of Block
 *
 * @since 2.0.0
 * @category Methods
 */
export const auxiliaryDataSet: (
  instance: CML.Block,
) => Effect.Effect<CML.MapTransactionIndexToAuxiliaryData, BlockError> =
  Effect.fn((instance: CML.Block) =>
    Effect.try({
      try: () => instance.auxiliary_data_set(),
      catch: () =>
        new BlockError({
          message: `Block.auxiliaryDataSet failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.auxiliaryDataSet without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const auxiliaryDataSetUnsafe = (
  instance: CML.Block,
): CML.MapTransactionIndexToAuxiliaryData =>
  Effect.runSync(auxiliaryDataSet(instance));

/**
 * Method invalidTransactions of Block
 *
 * @since 2.0.0
 * @category Methods
 */
export const invalidTransactions: (
  instance: CML.Block,
) => Effect.Effect<Uint16Array, BlockError> = Effect.fn((instance: CML.Block) =>
  Effect.try({
    try: () => instance.invalid_transactions(),
    catch: () =>
      new BlockError({
        message: `Block.invalidTransactions failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.invalidTransactions without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const invalidTransactionsUnsafe = (instance: CML.Block): Uint16Array =>
  Effect.runSync(invalidTransactions(instance));

/**
 * Static method _new of Block
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  header: CML.Header,
  transactionBodies: CML.TransactionBodyList,
  transactionWitnessSets: CML.TransactionWitnessSetList,
  auxiliaryDataSet: CML.MapTransactionIndexToAuxiliaryData,
  invalidTransactions: Uint16Array,
) => Effect.Effect<CML.Block, BlockError> = Effect.fn(function* (
  header: CML.Header,
  transactionBodies: CML.TransactionBodyList,
  transactionWitnessSets: CML.TransactionWitnessSetList,
  auxiliaryDataSet: CML.MapTransactionIndexToAuxiliaryData,
  invalidTransactions: Uint16Array,
) {
  return yield* Effect.try({
    try: () =>
      CML.Block.new(
        header,
        transactionBodies,
        transactionWitnessSets,
        auxiliaryDataSet,
        invalidTransactions,
      ),
    catch: () =>
      new BlockError({
        message: `Block._new failed with parameters: ${header} (Header), ${transactionBodies} (TransactionBodyList), ${transactionWitnessSets} (TransactionWitnessSetList), ${auxiliaryDataSet} (MapTransactionIndexToAuxiliaryData), ${invalidTransactions}. `,
      }),
  });
});

/**
 * Unsafely calls Block._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  header: CML.Header,
  transactionBodies: CML.TransactionBodyList,
  transactionWitnessSets: CML.TransactionWitnessSetList,
  auxiliaryDataSet: CML.MapTransactionIndexToAuxiliaryData,
  invalidTransactions: Uint16Array,
): CML.Block =>
  Effect.runSync(
    _new(
      header,
      transactionBodies,
      transactionWitnessSets,
      auxiliaryDataSet,
      invalidTransactions,
    ),
  );

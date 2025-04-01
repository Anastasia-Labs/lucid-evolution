/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionBuilderConfigBuilder class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionBuilderConfigBuilder = CML.TransactionBuilderConfigBuilder;

/**
 * Error class for TransactionBuilderConfigBuilder operations
 * 
 * This error is thrown when operations on TransactionBuilderConfigBuilder instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionBuilderConfigBuilderError extends Data.TaggedError("TransactionBuilderConfigBuilderError")<{
  message?: string;
}> {}

/**
 * Method free of TransactionBuilderConfigBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.TransactionBuilderConfigBuilder) => Effect.Effect<void, TransactionBuilderConfigBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionBuilderConfigBuilderError({
          message: `TransactionBuilderConfigBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionBuilderConfigBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionBuilderConfigBuilder
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionBuilderConfigBuilder.new(),
    catch: () => new TransactionBuilderConfigBuilderError({
      message: `TransactionBuilderConfigBuilder._new failed `,
    }),
  });
});

/**
 * Unsafely calls TransactionBuilderConfigBuilder._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(_new());

/**
 * Method feeAlgo of TransactionBuilderConfigBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const feeAlgo: (instance: CML.TransactionBuilderConfigBuilder, _feeAlgo: CML.LinearFee) => Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _feeAlgo: CML.LinearFee) =>
    Effect.try({
      try: () => instance.fee_algo(_feeAlgo),
      catch: () =>
        new TransactionBuilderConfigBuilderError({
          message: `TransactionBuilderConfigBuilder.feeAlgo failed with parameters: ${_feeAlgo} (LinearFee). `,
        }),
    })
);

/**
 * Unsafely calls instance.feeAlgo without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const feeAlgoUnsafe = (instance: CML.TransactionBuilderConfigBuilder, _feeAlgo: CML.LinearFee): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(feeAlgo(instance, _feeAlgo));

/**
 * Method coinsPerUtxoByte of TransactionBuilderConfigBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const coinsPerUtxoByte: (instance: CML.TransactionBuilderConfigBuilder, _coinsPerUtxoByte: bigint) => Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _coinsPerUtxoByte: bigint) =>
    Effect.try({
      try: () => instance.coins_per_utxo_byte(_coinsPerUtxoByte),
      catch: () =>
        new TransactionBuilderConfigBuilderError({
          message: `TransactionBuilderConfigBuilder.coinsPerUtxoByte failed with parameters: ${_coinsPerUtxoByte}. `,
        }),
    })
);

/**
 * Unsafely calls instance.coinsPerUtxoByte without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const coinsPerUtxoByteUnsafe = (instance: CML.TransactionBuilderConfigBuilder, _coinsPerUtxoByte: bigint): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(coinsPerUtxoByte(instance, _coinsPerUtxoByte));

/**
 * Method poolDeposit of TransactionBuilderConfigBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const poolDeposit: (instance: CML.TransactionBuilderConfigBuilder, _poolDeposit: bigint) => Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _poolDeposit: bigint) =>
    Effect.try({
      try: () => instance.pool_deposit(_poolDeposit),
      catch: () =>
        new TransactionBuilderConfigBuilderError({
          message: `TransactionBuilderConfigBuilder.poolDeposit failed with parameters: ${_poolDeposit}. `,
        }),
    })
);

/**
 * Unsafely calls instance.poolDeposit without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolDepositUnsafe = (instance: CML.TransactionBuilderConfigBuilder, _poolDeposit: bigint): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(poolDeposit(instance, _poolDeposit));

/**
 * Method keyDeposit of TransactionBuilderConfigBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keyDeposit: (instance: CML.TransactionBuilderConfigBuilder, _keyDeposit: bigint) => Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _keyDeposit: bigint) =>
    Effect.try({
      try: () => instance.key_deposit(_keyDeposit),
      catch: () =>
        new TransactionBuilderConfigBuilderError({
          message: `TransactionBuilderConfigBuilder.keyDeposit failed with parameters: ${_keyDeposit}. `,
        }),
    })
);

/**
 * Unsafely calls instance.keyDeposit without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keyDepositUnsafe = (instance: CML.TransactionBuilderConfigBuilder, _keyDeposit: bigint): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(keyDeposit(instance, _keyDeposit));

/**
 * Method maxValueSize of TransactionBuilderConfigBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxValueSize: (instance: CML.TransactionBuilderConfigBuilder, _maxValueSize: number) => Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _maxValueSize: number) =>
    Effect.try({
      try: () => instance.max_value_size(_maxValueSize),
      catch: () =>
        new TransactionBuilderConfigBuilderError({
          message: `TransactionBuilderConfigBuilder.maxValueSize failed with parameters: ${_maxValueSize}. `,
        }),
    })
);

/**
 * Unsafely calls instance.maxValueSize without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxValueSizeUnsafe = (instance: CML.TransactionBuilderConfigBuilder, _maxValueSize: number): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(maxValueSize(instance, _maxValueSize));

/**
 * Method maxTxSize of TransactionBuilderConfigBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxTxSize: (instance: CML.TransactionBuilderConfigBuilder, _maxTxSize: number) => Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _maxTxSize: number) =>
    Effect.try({
      try: () => instance.max_tx_size(_maxTxSize),
      catch: () =>
        new TransactionBuilderConfigBuilderError({
          message: `TransactionBuilderConfigBuilder.maxTxSize failed with parameters: ${_maxTxSize}. `,
        }),
    })
);

/**
 * Unsafely calls instance.maxTxSize without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxTxSizeUnsafe = (instance: CML.TransactionBuilderConfigBuilder, _maxTxSize: number): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(maxTxSize(instance, _maxTxSize));

/**
 * Method preferPureChange of TransactionBuilderConfigBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const preferPureChange: (instance: CML.TransactionBuilderConfigBuilder, _preferPureChange: boolean) => Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _preferPureChange: boolean) =>
    Effect.try({
      try: () => instance.prefer_pure_change(_preferPureChange),
      catch: () =>
        new TransactionBuilderConfigBuilderError({
          message: `TransactionBuilderConfigBuilder.preferPureChange failed with parameters: ${_preferPureChange}. `,
        }),
    })
);

/**
 * Unsafely calls instance.preferPureChange without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const preferPureChangeUnsafe = (instance: CML.TransactionBuilderConfigBuilder, _preferPureChange: boolean): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(preferPureChange(instance, _preferPureChange));

/**
 * Method exUnitPrices of TransactionBuilderConfigBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const exUnitPrices: (instance: CML.TransactionBuilderConfigBuilder, _exUnitPrices: CML.ExUnitPrices) => Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _exUnitPrices: CML.ExUnitPrices) =>
    Effect.try({
      try: () => instance.ex_unit_prices(_exUnitPrices),
      catch: () =>
        new TransactionBuilderConfigBuilderError({
          message: `TransactionBuilderConfigBuilder.exUnitPrices failed with parameters: ${_exUnitPrices} (ExUnitPrices). `,
        }),
    })
);

/**
 * Unsafely calls instance.exUnitPrices without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const exUnitPricesUnsafe = (instance: CML.TransactionBuilderConfigBuilder, _exUnitPrices: CML.ExUnitPrices): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(exUnitPrices(instance, _exUnitPrices));

/**
 * Method costModels of TransactionBuilderConfigBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const costModels: (instance: CML.TransactionBuilderConfigBuilder, _costModels: CML.CostModels) => Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _costModels: CML.CostModels) =>
    Effect.try({
      try: () => instance.cost_models(_costModels),
      catch: () =>
        new TransactionBuilderConfigBuilderError({
          message: `TransactionBuilderConfigBuilder.costModels failed with parameters: ${_costModels} (CostModels). `,
        }),
    })
);

/**
 * Unsafely calls instance.costModels without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const costModelsUnsafe = (instance: CML.TransactionBuilderConfigBuilder, _costModels: CML.CostModels): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(costModels(instance, _costModels));

/**
 * Method collateralPercentage of TransactionBuilderConfigBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const collateralPercentage: (instance: CML.TransactionBuilderConfigBuilder, _collateralPercentage: number) => Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _collateralPercentage: number) =>
    Effect.try({
      try: () => instance.collateral_percentage(_collateralPercentage),
      catch: () =>
        new TransactionBuilderConfigBuilderError({
          message: `TransactionBuilderConfigBuilder.collateralPercentage failed with parameters: ${_collateralPercentage}. `,
        }),
    })
);

/**
 * Unsafely calls instance.collateralPercentage without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const collateralPercentageUnsafe = (instance: CML.TransactionBuilderConfigBuilder, _collateralPercentage: number): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(collateralPercentage(instance, _collateralPercentage));

/**
 * Method maxCollateralInputs of TransactionBuilderConfigBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxCollateralInputs: (instance: CML.TransactionBuilderConfigBuilder, _maxCollateralInputs: number) => Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _maxCollateralInputs: number) =>
    Effect.try({
      try: () => instance.max_collateral_inputs(_maxCollateralInputs),
      catch: () =>
        new TransactionBuilderConfigBuilderError({
          message: `TransactionBuilderConfigBuilder.maxCollateralInputs failed with parameters: ${_maxCollateralInputs}. `,
        }),
    })
);

/**
 * Unsafely calls instance.maxCollateralInputs without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const maxCollateralInputsUnsafe = (instance: CML.TransactionBuilderConfigBuilder, _maxCollateralInputs: number): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(maxCollateralInputs(instance, _maxCollateralInputs));

/**
 * Method build of TransactionBuilderConfigBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const build: (instance: CML.TransactionBuilderConfigBuilder) => Effect.Effect<CML.TransactionBuilderConfig, TransactionBuilderConfigBuilderError> = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder) =>
    Effect.try({
      try: () => instance.build(),
      catch: () =>
        new TransactionBuilderConfigBuilderError({
          message: `TransactionBuilderConfigBuilder.build failed `,
        }),
    })
);

/**
 * Unsafely calls instance.build without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const buildUnsafe = (instance: CML.TransactionBuilderConfigBuilder): CML.TransactionBuilderConfig =>
  Effect.runSync(build(instance));

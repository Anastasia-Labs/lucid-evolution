import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type TransactionBuilderConfigBuilder = CML.TransactionBuilderConfigBuilder;

export class TransactionBuilderConfigBuilderError extends Data.TaggedError("TransactionBuilderConfigBuilderError")<{
  message?: string;
}> {}

/**
 * Method free of TransactionBuilderConfigBuilder
 * 
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilderConfigBuilder.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder): Effect.Effect<void, TransactionBuilderConfigBuilderError> =>
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
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilderConfigBuilder.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilderConfigBuilder.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.TransactionBuilderConfigBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionBuilderConfigBuilder
 * 
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionBuilderConfigBuilder._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
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
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilderConfigBuilder.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilderConfigBuilder.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

/**
 * Method feeAlgo of TransactionBuilderConfigBuilder
 * 
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilderConfigBuilder.feeAlgo(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const feeAlgo = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _feeAlgo: CML.LinearFee): Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> =>
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
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilderConfigBuilder.unsafeFeeAlgo(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilderConfigBuilder.unsafeFeeAlgo failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFeeAlgo = (instance: CML.TransactionBuilderConfigBuilder, _feeAlgo: CML.LinearFee): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(feeAlgo(instance, _feeAlgo));

/**
 * Method coinsPerUtxoByte of TransactionBuilderConfigBuilder
 * 
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilderConfigBuilder.coinsPerUtxoByte(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const coinsPerUtxoByte = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _coinsPerUtxoByte: bigint): Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> =>
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
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilderConfigBuilder.unsafeCoinsPerUtxoByte(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilderConfigBuilder.unsafeCoinsPerUtxoByte failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCoinsPerUtxoByte = (instance: CML.TransactionBuilderConfigBuilder, _coinsPerUtxoByte: bigint): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(coinsPerUtxoByte(instance, _coinsPerUtxoByte));

/**
 * Method poolDeposit of TransactionBuilderConfigBuilder
 * 
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilderConfigBuilder.poolDeposit(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const poolDeposit = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _poolDeposit: bigint): Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> =>
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
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilderConfigBuilder.unsafePoolDeposit(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilderConfigBuilder.unsafePoolDeposit failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePoolDeposit = (instance: CML.TransactionBuilderConfigBuilder, _poolDeposit: bigint): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(poolDeposit(instance, _poolDeposit));

/**
 * Method keyDeposit of TransactionBuilderConfigBuilder
 * 
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilderConfigBuilder.keyDeposit(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keyDeposit = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _keyDeposit: bigint): Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> =>
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
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilderConfigBuilder.unsafeKeyDeposit(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilderConfigBuilder.unsafeKeyDeposit failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKeyDeposit = (instance: CML.TransactionBuilderConfigBuilder, _keyDeposit: bigint): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(keyDeposit(instance, _keyDeposit));

/**
 * Method maxValueSize of TransactionBuilderConfigBuilder
 * 
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilderConfigBuilder.maxValueSize(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxValueSize = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _maxValueSize: number): Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> =>
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
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilderConfigBuilder.unsafeMaxValueSize(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilderConfigBuilder.unsafeMaxValueSize failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMaxValueSize = (instance: CML.TransactionBuilderConfigBuilder, _maxValueSize: number): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(maxValueSize(instance, _maxValueSize));

/**
 * Method maxTxSize of TransactionBuilderConfigBuilder
 * 
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilderConfigBuilder.maxTxSize(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxTxSize = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _maxTxSize: number): Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> =>
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
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilderConfigBuilder.unsafeMaxTxSize(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilderConfigBuilder.unsafeMaxTxSize failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMaxTxSize = (instance: CML.TransactionBuilderConfigBuilder, _maxTxSize: number): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(maxTxSize(instance, _maxTxSize));

/**
 * Method preferPureChange of TransactionBuilderConfigBuilder
 * 
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilderConfigBuilder.preferPureChange(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const preferPureChange = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _preferPureChange: boolean): Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> =>
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
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilderConfigBuilder.unsafePreferPureChange(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilderConfigBuilder.unsafePreferPureChange failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePreferPureChange = (instance: CML.TransactionBuilderConfigBuilder, _preferPureChange: boolean): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(preferPureChange(instance, _preferPureChange));

/**
 * Method exUnitPrices of TransactionBuilderConfigBuilder
 * 
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilderConfigBuilder.exUnitPrices(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const exUnitPrices = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _exUnitPrices: CML.ExUnitPrices): Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> =>
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
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilderConfigBuilder.unsafeExUnitPrices(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilderConfigBuilder.unsafeExUnitPrices failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeExUnitPrices = (instance: CML.TransactionBuilderConfigBuilder, _exUnitPrices: CML.ExUnitPrices): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(exUnitPrices(instance, _exUnitPrices));

/**
 * Method costModels of TransactionBuilderConfigBuilder
 * 
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilderConfigBuilder.costModels(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const costModels = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _costModels: CML.CostModels): Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> =>
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
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilderConfigBuilder.unsafeCostModels(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilderConfigBuilder.unsafeCostModels failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCostModels = (instance: CML.TransactionBuilderConfigBuilder, _costModels: CML.CostModels): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(costModels(instance, _costModels));

/**
 * Method collateralPercentage of TransactionBuilderConfigBuilder
 * 
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilderConfigBuilder.collateralPercentage(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const collateralPercentage = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _collateralPercentage: number): Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> =>
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
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilderConfigBuilder.unsafeCollateralPercentage(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilderConfigBuilder.unsafeCollateralPercentage failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCollateralPercentage = (instance: CML.TransactionBuilderConfigBuilder, _collateralPercentage: number): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(collateralPercentage(instance, _collateralPercentage));

/**
 * Method maxCollateralInputs of TransactionBuilderConfigBuilder
 * 
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilderConfigBuilder.maxCollateralInputs(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const maxCollateralInputs = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder, _maxCollateralInputs: number): Effect.Effect<CML.TransactionBuilderConfigBuilder, TransactionBuilderConfigBuilderError> =>
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
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilderConfigBuilder.unsafeMaxCollateralInputs(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilderConfigBuilder.unsafeMaxCollateralInputs failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMaxCollateralInputs = (instance: CML.TransactionBuilderConfigBuilder, _maxCollateralInputs: number): CML.TransactionBuilderConfigBuilder =>
  Effect.runSync(maxCollateralInputs(instance, _maxCollateralInputs));

/**
 * Method build of TransactionBuilderConfigBuilder
 * 
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilderConfigBuilder.build(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const build = Effect.fn(
  (instance: CML.TransactionBuilderConfigBuilder): Effect.Effect<CML.TransactionBuilderConfig, TransactionBuilderConfigBuilderError> =>
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
 * @example
 * import { TransactionBuilderConfigBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionBuilderConfigBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilderConfigBuilder.unsafeBuild(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilderConfigBuilder.unsafeBuild failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeBuild = (instance: CML.TransactionBuilderConfigBuilder): CML.TransactionBuilderConfig =>
  Effect.runSync(build(instance));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionOutputAmountBuilder class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionOutputAmountBuilder = CML.TransactionOutputAmountBuilder;

/**
 * Error class for TransactionOutputAmountBuilder operations
 * 
 * This error is thrown when operations on TransactionOutputAmountBuilder instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionOutputAmountBuilderError extends Data.TaggedError("TransactionOutputAmountBuilderError")<{
  message?: string;
}> {}

/**
 * Method free of TransactionOutputAmountBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.TransactionOutputAmountBuilder) => Effect.Effect<void, TransactionOutputAmountBuilderError> = Effect.fn(
  (instance: CML.TransactionOutputAmountBuilder) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionOutputAmountBuilderError({
          message: `TransactionOutputAmountBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionOutputAmountBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Method withValue of TransactionOutputAmountBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const withValue: (instance: CML.TransactionOutputAmountBuilder, amount: CML.Value) => Effect.Effect<CML.TransactionOutputAmountBuilder, TransactionOutputAmountBuilderError> = Effect.fn(
  (instance: CML.TransactionOutputAmountBuilder, amount: CML.Value) =>
    Effect.try({
      try: () => instance.with_value(amount),
      catch: () =>
        new TransactionOutputAmountBuilderError({
          message: `TransactionOutputAmountBuilder.withValue failed with parameters: ${amount} (Value). `,
        }),
    })
);

/**
 * Unsafely calls instance.withValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withValueUnsafe = (instance: CML.TransactionOutputAmountBuilder, amount: CML.Value): CML.TransactionOutputAmountBuilder =>
  Effect.runSync(withValue(instance, amount));

/**
 * Method withAssetAndMinRequiredCoin of TransactionOutputAmountBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const withAssetAndMinRequiredCoin: (instance: CML.TransactionOutputAmountBuilder, multiasset: CML.MultiAsset, coinsPerUtxoByte: bigint) => Effect.Effect<CML.TransactionOutputAmountBuilder, TransactionOutputAmountBuilderError> = Effect.fn(
  (instance: CML.TransactionOutputAmountBuilder, multiasset: CML.MultiAsset, coinsPerUtxoByte: bigint) =>
    Effect.try({
      try: () => instance.with_asset_and_min_required_coin(multiasset, coinsPerUtxoByte),
      catch: () =>
        new TransactionOutputAmountBuilderError({
          message: `TransactionOutputAmountBuilder.withAssetAndMinRequiredCoin failed with parameters: ${multiasset} (MultiAsset), ${coinsPerUtxoByte}. `,
        }),
    })
);

/**
 * Unsafely calls instance.withAssetAndMinRequiredCoin without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withAssetAndMinRequiredCoinUnsafe = (instance: CML.TransactionOutputAmountBuilder, multiasset: CML.MultiAsset, coinsPerUtxoByte: bigint): CML.TransactionOutputAmountBuilder =>
  Effect.runSync(withAssetAndMinRequiredCoin(instance, multiasset, coinsPerUtxoByte));

/**
 * Method build of TransactionOutputAmountBuilder
 * 
 * @since 2.0.0
 * @category Methods
 */
export const build: (instance: CML.TransactionOutputAmountBuilder) => Effect.Effect<CML.SingleOutputBuilderResult, TransactionOutputAmountBuilderError> = Effect.fn(
  (instance: CML.TransactionOutputAmountBuilder) =>
    Effect.try({
      try: () => instance.build(),
      catch: () =>
        new TransactionOutputAmountBuilderError({
          message: `TransactionOutputAmountBuilder.build failed `,
        }),
    })
);

/**
 * Unsafely calls instance.build without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const buildUnsafe = (instance: CML.TransactionOutputAmountBuilder): CML.SingleOutputBuilderResult =>
  Effect.runSync(build(instance));

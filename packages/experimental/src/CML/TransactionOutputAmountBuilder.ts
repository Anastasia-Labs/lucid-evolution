import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type TransactionOutputAmountBuilder = CML.TransactionOutputAmountBuilder;

export class TransactionOutputAmountBuilderError extends Data.TaggedError(
  "TransactionOutputAmountBuilderError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionOutputAmountBuilder
 *
 * @example
 * import { TransactionOutputAmountBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutputAmountBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionOutputAmountBuilder.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.TransactionOutputAmountBuilder,
  ): Effect.Effect<void, TransactionOutputAmountBuilderError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionOutputAmountBuilderError({
          message: `TransactionOutputAmountBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { TransactionOutputAmountBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutputAmountBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutputAmountBuilder.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutputAmountBuilder.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (
  instance: CML.TransactionOutputAmountBuilder,
): void => Effect.runSync(free(instance));

/**
 * Method withValue of TransactionOutputAmountBuilder
 *
 * @example
 * import { TransactionOutputAmountBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutputAmountBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionOutputAmountBuilder.withValue(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const withValue = Effect.fn(
  (
    instance: CML.TransactionOutputAmountBuilder,
    amount: CML.Value,
  ): Effect.Effect<
    CML.TransactionOutputAmountBuilder,
    TransactionOutputAmountBuilderError
  > =>
    Effect.try({
      try: () => instance.with_value(amount),
      catch: () =>
        new TransactionOutputAmountBuilderError({
          message: `TransactionOutputAmountBuilder.withValue failed with parameters: ${amount} (Value). `,
        }),
    }),
);

/**
 * Unsafely calls instance.withValue without Effect wrapper
 *
 * @example
 * import { TransactionOutputAmountBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutputAmountBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutputAmountBuilder.unsafeWithValue(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutputAmountBuilder.unsafeWithValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeWithValue = (
  instance: CML.TransactionOutputAmountBuilder,
  amount: CML.Value,
): CML.TransactionOutputAmountBuilder =>
  Effect.runSync(withValue(instance, amount));

/**
 * Method withAssetAndMinRequiredCoin of TransactionOutputAmountBuilder
 *
 * @example
 * import { TransactionOutputAmountBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutputAmountBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionOutputAmountBuilder.withAssetAndMinRequiredCoin(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const withAssetAndMinRequiredCoin = Effect.fn(
  (
    instance: CML.TransactionOutputAmountBuilder,
    multiasset: CML.MultiAsset,
    coinsPerUtxoByte: bigint,
  ): Effect.Effect<
    CML.TransactionOutputAmountBuilder,
    TransactionOutputAmountBuilderError
  > =>
    Effect.try({
      try: () =>
        instance.with_asset_and_min_required_coin(multiasset, coinsPerUtxoByte),
      catch: () =>
        new TransactionOutputAmountBuilderError({
          message: `TransactionOutputAmountBuilder.withAssetAndMinRequiredCoin failed with parameters: ${multiasset} (MultiAsset), ${coinsPerUtxoByte}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.withAssetAndMinRequiredCoin without Effect wrapper
 *
 * @example
 * import { TransactionOutputAmountBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutputAmountBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutputAmountBuilder.unsafeWithAssetAndMinRequiredCoin(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutputAmountBuilder.unsafeWithAssetAndMinRequiredCoin failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeWithAssetAndMinRequiredCoin = (
  instance: CML.TransactionOutputAmountBuilder,
  multiasset: CML.MultiAsset,
  coinsPerUtxoByte: bigint,
): CML.TransactionOutputAmountBuilder =>
  Effect.runSync(
    withAssetAndMinRequiredCoin(instance, multiasset, coinsPerUtxoByte),
  );

/**
 * Method build of TransactionOutputAmountBuilder
 *
 * @example
 * import { TransactionOutputAmountBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutputAmountBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionOutputAmountBuilder.build(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const build = Effect.fn(
  (
    instance: CML.TransactionOutputAmountBuilder,
  ): Effect.Effect<
    CML.SingleOutputBuilderResult,
    TransactionOutputAmountBuilderError
  > =>
    Effect.try({
      try: () => instance.build(),
      catch: () =>
        new TransactionOutputAmountBuilderError({
          message: `TransactionOutputAmountBuilder.build failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.build without Effect wrapper
 *
 * @example
 * import { TransactionOutputAmountBuilder } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionOutputAmountBuilder instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutputAmountBuilder.unsafeBuild(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutputAmountBuilder.unsafeBuild failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeBuild = (
  instance: CML.TransactionOutputAmountBuilder,
): CML.SingleOutputBuilderResult => Effect.runSync(build(instance));

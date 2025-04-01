/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for min_fee function
 *
 * This error is thrown when the min_fee function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MinFeeError extends Data.TaggedError("MinFeeError")<{
  message?: string;
}> {}

/**
 * Wrapper for the min_fee function
 *
 * @example
 * import { minFee } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* minFee(Transaction instance , LinearFee instance , ExUnitPrices instance ,  appropriate value );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Functions
 */
export const minFee = Effect.fn(function* (
  tx: CML.Transaction,
  linearFee: CML.LinearFee,
  exUnitPrices: CML.ExUnitPrices,
  totalRefScriptSize: bigint,
) {
  return yield* Effect.try({
    try: () => CML.min_fee(tx, linearFee, exUnitPrices, totalRefScriptSize),
    catch: () =>
      new MinFeeError({
        message: `min_fee failed with parameters: tx (Transaction instance), linearFee (LinearFee instance), exUnitPrices (ExUnitPrices instance), ${totalRefScriptSize}.`,
      }),
  });
});

/**
 * Unsafely calls min_fee function without Effect wrapper
 *
 * @example
 * import { minFeeUnsafe } from "@lucid-evolution/experimental/CML/functions";
 *
 * try {
 *   const result = minFeeUnsafe(Transaction instance , LinearFee instance , ExUnitPrices instance ,  appropriate value );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`minFeeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const minFeeUnsafe = (
  tx: CML.Transaction,
  linearFee: CML.LinearFee,
  exUnitPrices: CML.ExUnitPrices,
  totalRefScriptSize: bigint,
): bigint =>
  Effect.runSync(minFee(tx, linearFee, exUnitPrices, totalRefScriptSize));

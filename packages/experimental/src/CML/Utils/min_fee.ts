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
 * @since 2.0.0
 * @category Functions
 */
export const minFee: (tx: CML.Transaction, linearFee: CML.LinearFee, exUnitPrices: CML.ExUnitPrices, totalRefScriptSize: bigint) => Effect.Effect<bigint, MinFeeError> = Effect.fn(function* (tx: CML.Transaction, linearFee: CML.LinearFee, exUnitPrices: CML.ExUnitPrices, totalRefScriptSize: bigint) {
  return yield* Effect.try({
    try: () => CML.min_fee(tx, linearFee, exUnitPrices, totalRefScriptSize),
    catch: () => new MinFeeError({
      message: `min_fee failed with parameters: tx (Transaction instance), linearFee (LinearFee instance), exUnitPrices (ExUnitPrices instance), ${totalRefScriptSize}.`,
    }),
  });
});

/**
 * Unsafely calls min_fee function without Effect wrapper
 * 
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const minFeeUnsafe = (tx: CML.Transaction, linearFee: CML.LinearFee, exUnitPrices: CML.ExUnitPrices, totalRefScriptSize: bigint): bigint =>
  Effect.runSync(minFee(tx, linearFee, exUnitPrices, totalRefScriptSize));

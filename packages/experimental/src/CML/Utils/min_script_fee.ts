/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for min_script_fee function
 * 
 * This error is thrown when the min_script_fee function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MinScriptFeeError extends Data.TaggedError("MinScriptFeeError")<{
  message?: string;
}> {}

/**
 * Wrapper for the min_script_fee function
 * 
 * @since 2.0.0
 * @category Functions
 */
export const minScriptFee: (tx: CML.Transaction, exUnitPrices: CML.ExUnitPrices) => Effect.Effect<bigint, MinScriptFeeError> = Effect.fn(function* (tx: CML.Transaction, exUnitPrices: CML.ExUnitPrices) {
  return yield* Effect.try({
    try: () => CML.min_script_fee(tx, exUnitPrices),
    catch: () => new MinScriptFeeError({
      message: `min_script_fee failed with parameters: tx (Transaction instance), exUnitPrices (ExUnitPrices instance).`,
    }),
  });
});

/**
 * Unsafely calls min_script_fee function without Effect wrapper
 * 
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const minScriptFeeUnsafe = (tx: CML.Transaction, exUnitPrices: CML.ExUnitPrices): bigint =>
  Effect.runSync(minScriptFee(tx, exUnitPrices));

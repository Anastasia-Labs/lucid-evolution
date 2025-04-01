/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for min_no_script_fee function
 *
 * This error is thrown when the min_no_script_fee function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MinNoScriptFeeError extends Data.TaggedError(
  "MinNoScriptFeeError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the min_no_script_fee function
 *
 * @since 2.0.0
 * @category Functions
 */
export const minNoScriptFee: (
  tx: CML.Transaction,
  linearFee: CML.LinearFee,
) => Effect.Effect<bigint, MinNoScriptFeeError> = Effect.fn(function* (
  tx: CML.Transaction,
  linearFee: CML.LinearFee,
) {
  return yield* Effect.try({
    try: () => CML.min_no_script_fee(tx, linearFee),
    catch: () =>
      new MinNoScriptFeeError({
        message: `min_no_script_fee failed with parameters: tx (Transaction instance), linearFee (LinearFee instance).`,
      }),
  });
});

/**
 * Unsafely calls min_no_script_fee function without Effect wrapper
 *
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const minNoScriptFeeUnsafe = (
  tx: CML.Transaction,
  linearFee: CML.LinearFee,
): bigint => Effect.runSync(minNoScriptFee(tx, linearFee));

import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class MinNoScriptFeeError extends Data.TaggedError("MinNoScriptFeeError")<{
  message?: string;
}> {}

/**
 * Wrapper for the min_no_script_fee function
 * 
 * @example
 * import { minNoScriptFee } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* minNoScriptFee(Transaction instance , LinearFee instance );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Functions
 */
export const minNoScriptFee = Effect.fn(function* (tx: CML.Transaction, linearFee: CML.LinearFee) {
  return yield* Effect.try({
    try: () => CML.min_no_script_fee(tx, linearFee),
    catch: () => new MinNoScriptFeeError({
      message: `min_no_script_fee failed with parameters: tx (Transaction instance), linearFee (LinearFee instance).`,
    }),
  });
});

/**
 * Unsafely calls min_no_script_fee function without Effect wrapper
 * 
 * @example
 * import { unsafeMinNoScriptFee } from "@lucid-evolution/experimental/CML/functions";
 * 
 * try {
 *   const result = unsafeMinNoScriptFee(Transaction instance , LinearFee instance );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeMinNoScriptFee failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Functions
 */
export const unsafeMinNoScriptFee = (tx: CML.Transaction, linearFee: CML.LinearFee): bigint =>
  Effect.runSync(minNoScriptFee(tx, linearFee));

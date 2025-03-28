import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class MinScriptFeeError extends Data.TaggedError("MinScriptFeeError")<{
  message?: string;
}> {}

/**
 * Wrapper for the min_script_fee function
 *
 * @example
 * import { minScriptFee } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* minScriptFee(Transaction instance , ExUnitPrices instance );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Functions
 */
export const minScriptFee = Effect.fn(function* (
  tx: CML.Transaction,
  exUnitPrices: CML.ExUnitPrices,
) {
  return yield* Effect.try({
    try: () => CML.min_script_fee(tx, exUnitPrices),
    catch: () =>
      new MinScriptFeeError({
        message: `min_script_fee failed with parameters: tx (Transaction instance), exUnitPrices (ExUnitPrices instance).`,
      }),
  });
});

/**
 * Unsafely calls min_script_fee function without Effect wrapper
 *
 * @example
 * import { unsafeMinScriptFee } from "@lucid-evolution/experimental/CML/functions";
 *
 * try {
 *   const result = unsafeMinScriptFee(Transaction instance , ExUnitPrices instance );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeMinScriptFee failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Functions
 */
export const unsafeMinScriptFee = (
  tx: CML.Transaction,
  exUnitPrices: CML.ExUnitPrices,
): bigint => Effect.runSync(minScriptFee(tx, exUnitPrices));

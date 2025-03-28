import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class MinAdaRequiredError extends Data.TaggedError("MinAdaRequiredError")<{
  message?: string;
}> {}

/**
 * Wrapper for the min_ada_required function
 * 
 * @example
 * import { minAdaRequired } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* minAdaRequired(TransactionOutput instance ,  appropriate value );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Functions
 */
export const minAdaRequired = Effect.fn(function* (output: CML.TransactionOutput, coinsPerUtxoByte: bigint) {
  return yield* Effect.try({
    try: () => CML.min_ada_required(output, coinsPerUtxoByte),
    catch: () => new MinAdaRequiredError({
      message: `min_ada_required failed with parameters: output (TransactionOutput instance), ${coinsPerUtxoByte}.`,
    }),
  });
});

/**
 * Unsafely calls min_ada_required function without Effect wrapper
 * 
 * @example
 * import { unsafeMinAdaRequired } from "@lucid-evolution/experimental/CML/functions";
 * 
 * try {
 *   const result = unsafeMinAdaRequired(TransactionOutput instance ,  appropriate value );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeMinAdaRequired failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Functions
 */
export const unsafeMinAdaRequired = (output: CML.TransactionOutput, coinsPerUtxoByte: bigint): bigint =>
  Effect.runSync(minAdaRequired(output, coinsPerUtxoByte));

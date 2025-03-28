import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class ComputeTotalExUnitsError extends Data.TaggedError("ComputeTotalExUnitsError")<{
  message?: string;
}> {}

/**
 * Wrapper for the compute_total_ex_units function
 * 
 * @example
 * import { computeTotalExUnits } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* computeTotalExUnits(Redeemers instance );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Functions
 */
export const computeTotalExUnits = Effect.fn(function* (redeemers: CML.Redeemers) {
  return yield* Effect.try({
    try: () => CML.compute_total_ex_units(redeemers),
    catch: () => new ComputeTotalExUnitsError({
      message: `compute_total_ex_units failed with parameters: redeemers (Redeemers instance).`,
    }),
  });
});

/**
 * Unsafely calls compute_total_ex_units function without Effect wrapper
 * 
 * @example
 * import { unsafeComputeTotalExUnits } from "@lucid-evolution/experimental/CML/functions";
 * 
 * try {
 *   const result = unsafeComputeTotalExUnits(Redeemers instance );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeComputeTotalExUnits failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Functions
 */
export const unsafeComputeTotalExUnits = (redeemers: CML.Redeemers): CML.ExUnits =>
  Effect.runSync(computeTotalExUnits(redeemers));

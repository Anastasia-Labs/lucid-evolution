/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for compute_total_ex_units function
 * 
 * This error is thrown when the compute_total_ex_units function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ComputeTotalExUnitsError extends Data.TaggedError("ComputeTotalExUnitsError")<{
  message?: string;
}> {}

/**
 * Wrapper for the compute_total_ex_units function
 * 
 * @since 2.0.0
 * @category Functions
 */
export const computeTotalExUnits: (redeemers: CML.Redeemers) => Effect.Effect<CML.ExUnits, ComputeTotalExUnitsError> = Effect.fn(function* (redeemers: CML.Redeemers) {
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
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const computeTotalExUnitsUnsafe = (redeemers: CML.Redeemers): CML.ExUnits =>
  Effect.runSync(computeTotalExUnits(redeemers));

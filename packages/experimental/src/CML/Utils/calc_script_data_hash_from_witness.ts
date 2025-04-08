/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for calc_script_data_hash_from_witness function
 *
 * This error is thrown when the calc_script_data_hash_from_witness function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CalcScriptDataHashFromWitnessError extends Data.TaggedError(
  "CalcScriptDataHashFromWitnessError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the calc_script_data_hash_from_witness function
 *
 * @since 2.0.0
 * @category Functions
 */
export const calcScriptDataHashFromWitness: (
  witnesses: CML.TransactionWitnessSet,
  costModels: CML.CostModels,
) => Effect.Effect<
  CML.ScriptDataHash | undefined,
  CalcScriptDataHashFromWitnessError
> = Effect.fn(function* (
  witnesses: CML.TransactionWitnessSet,
  costModels: CML.CostModels,
) {
  return yield* Effect.try({
    try: () => CML.calc_script_data_hash_from_witness(witnesses, costModels),
    catch: () =>
      new CalcScriptDataHashFromWitnessError({
        message: `calc_script_data_hash_from_witness failed with parameters: witnesses (TransactionWitnessSet instance), costModels (CostModels instance). Hint: Verify input data is valid for hashing.`,
      }),
  });
});

/**
 * Unsafely calls calc_script_data_hash_from_witness function without Effect wrapper
 *
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const calcScriptDataHashFromWitnessUnsafe = (
  witnesses: CML.TransactionWitnessSet,
  costModels: CML.CostModels,
): CML.ScriptDataHash | undefined =>
  Effect.runSync(calcScriptDataHashFromWitness(witnesses, costModels));

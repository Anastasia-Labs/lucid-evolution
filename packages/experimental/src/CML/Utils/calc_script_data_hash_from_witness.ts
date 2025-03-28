import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class CalcScriptDataHashFromWitnessError extends Data.TaggedError(
  "CalcScriptDataHashFromWitnessError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the calc_script_data_hash_from_witness function
 *
 * @example
 * import { calcScriptDataHashFromWitness } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* calcScriptDataHashFromWitness(TransactionWitnessSet instance , CostModels instance );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Functions
 */
export const calcScriptDataHashFromWitness = Effect.fn(function* (
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
 * @example
 * import { unsafeCalcScriptDataHashFromWitness } from "@lucid-evolution/experimental/CML/functions";
 *
 * try {
 *   const result = unsafeCalcScriptDataHashFromWitness(TransactionWitnessSet instance , CostModels instance );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeCalcScriptDataHashFromWitness failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Functions
 */
export const unsafeCalcScriptDataHashFromWitness = (
  witnesses: CML.TransactionWitnessSet,
  costModels: CML.CostModels,
): CML.ScriptDataHash | undefined =>
  Effect.runSync(calcScriptDataHashFromWitness(witnesses, costModels));

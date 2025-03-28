import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class HashScriptDataError extends Data.TaggedError("HashScriptDataError")<{
  message?: string;
}> {}

/**
 * Wrapper for the hash_script_data function
 * 
 * @example
 * import { hashScriptData } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* hashScriptData(Redeemers instance , CostModels instance , PlutusDataList instance );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Functions
 */
export const hashScriptData = Effect.fn(function* (redeemers: CML.Redeemers, costModels: CML.CostModels, datums: CML.PlutusDataList) {
  return yield* Effect.try({
    try: () => CML.hash_script_data(redeemers, costModels, datums),
    catch: () => new HashScriptDataError({
      message: `hash_script_data failed with parameters: redeemers (Redeemers instance), costModels (CostModels instance), datums (PlutusDataList instance). Hint: Verify input data is valid for hashing.`,
    }),
  });
});

/**
 * Unsafely calls hash_script_data function without Effect wrapper
 * 
 * @example
 * import { unsafeHashScriptData } from "@lucid-evolution/experimental/CML/functions";
 * 
 * try {
 *   const result = unsafeHashScriptData(Redeemers instance , CostModels instance , PlutusDataList instance );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeHashScriptData failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Functions
 */
export const unsafeHashScriptData = (redeemers: CML.Redeemers, costModels: CML.CostModels, datums: CML.PlutusDataList): CML.ScriptDataHash =>
  Effect.runSync(hashScriptData(redeemers, costModels, datums));

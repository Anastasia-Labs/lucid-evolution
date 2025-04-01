/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for calc_script_data_hash function
 * 
 * This error is thrown when the calc_script_data_hash function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CalcScriptDataHashError extends Data.TaggedError("CalcScriptDataHashError")<{
  message?: string;
}> {}

/**
 * Wrapper for the calc_script_data_hash function
 * 
 * @since 2.0.0
 * @category Functions
 */
export const calcScriptDataHash: (redeemers: CML.Redeemers, datums: CML.PlutusDataList, costModels: CML.CostModels, usedLangs: CML.LanguageList) => Effect.Effect<CML.ScriptDataHash | undefined, CalcScriptDataHashError> = Effect.fn(function* (redeemers: CML.Redeemers, datums: CML.PlutusDataList, costModels: CML.CostModels, usedLangs: CML.LanguageList) {
  return yield* Effect.try({
    try: () => CML.calc_script_data_hash(redeemers, datums, costModels, usedLangs),
    catch: () => new CalcScriptDataHashError({
      message: `calc_script_data_hash failed with parameters: redeemers (Redeemers instance), datums (PlutusDataList instance), costModels (CostModels instance), usedLangs (LanguageList instance). Hint: Verify input data is valid for hashing.`,
    }),
  });
});

/**
 * Unsafely calls calc_script_data_hash function without Effect wrapper
 * 
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const calcScriptDataHashUnsafe = (redeemers: CML.Redeemers, datums: CML.PlutusDataList, costModels: CML.CostModels, usedLangs: CML.LanguageList): CML.ScriptDataHash | undefined =>
  Effect.runSync(calcScriptDataHash(redeemers, datums, costModels, usedLangs));

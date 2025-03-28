import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class HashAuxiliaryDataError extends Data.TaggedError(
  "HashAuxiliaryDataError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the hash_auxiliary_data function
 *
 * @example
 * import { hashAuxiliaryData } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* hashAuxiliaryData(AuxiliaryData instance );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Functions
 */
export const hashAuxiliaryData = Effect.fn(function* (
  auxiliaryData: CML.AuxiliaryData,
) {
  return yield* Effect.try({
    try: () => CML.hash_auxiliary_data(auxiliaryData),
    catch: () =>
      new HashAuxiliaryDataError({
        message: `hash_auxiliary_data failed with parameters: auxiliaryData (AuxiliaryData instance). Hint: Verify input data is valid for hashing.`,
      }),
  });
});

/**
 * Unsafely calls hash_auxiliary_data function without Effect wrapper
 *
 * @example
 * import { unsafeHashAuxiliaryData } from "@lucid-evolution/experimental/CML/functions";
 *
 * try {
 *   const result = unsafeHashAuxiliaryData(AuxiliaryData instance );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeHashAuxiliaryData failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Functions
 */
export const unsafeHashAuxiliaryData = (
  auxiliaryData: CML.AuxiliaryData,
): CML.AuxiliaryDataHash => Effect.runSync(hashAuxiliaryData(auxiliaryData));

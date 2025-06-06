/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for hash_auxiliary_data function
 *
 * This error is thrown when the hash_auxiliary_data function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class HashAuxiliaryDataError extends Data.TaggedError(
  "HashAuxiliaryDataError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the hash_auxiliary_data function
 *
 * @since 2.0.0
 * @category Functions
 */
export const hashAuxiliaryData: (
  auxiliaryData: CML.AuxiliaryData,
) => Effect.Effect<CML.AuxiliaryDataHash, HashAuxiliaryDataError> = Effect.fn(
  function* (auxiliaryData: CML.AuxiliaryData) {
    return yield* Effect.try({
      try: () => CML.hash_auxiliary_data(auxiliaryData),
      catch: () =>
        new HashAuxiliaryDataError({
          message: `hash_auxiliary_data failed with parameters: auxiliaryData (AuxiliaryData instance). Hint: Verify input data is valid for hashing.`,
        }),
    });
  },
);

/**
 * Unsafely calls hash_auxiliary_data function without Effect wrapper
 *
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const hashAuxiliaryDataUnsafe = (
  auxiliaryData: CML.AuxiliaryData,
): CML.AuxiliaryDataHash => Effect.runSync(hashAuxiliaryData(auxiliaryData));

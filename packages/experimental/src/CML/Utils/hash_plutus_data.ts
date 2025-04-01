/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for hash_plutus_data function
 *
 * This error is thrown when the hash_plutus_data function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class HashPlutusDataError extends Data.TaggedError(
  "HashPlutusDataError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the hash_plutus_data function
 *
 * @since 2.0.0
 * @category Functions
 */
export const hashPlutusData: (
  plutusData: CML.PlutusData,
) => Effect.Effect<CML.DatumHash, HashPlutusDataError> = Effect.fn(function* (
  plutusData: CML.PlutusData,
) {
  return yield* Effect.try({
    try: () => CML.hash_plutus_data(plutusData),
    catch: () =>
      new HashPlutusDataError({
        message: `hash_plutus_data failed with parameters: plutusData (PlutusData instance). Hint: Verify input data is valid for hashing.`,
      }),
  });
});

/**
 * Unsafely calls hash_plutus_data function without Effect wrapper
 *
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const hashPlutusDataUnsafe = (
  plutusData: CML.PlutusData,
): CML.DatumHash => Effect.runSync(hashPlutusData(plutusData));

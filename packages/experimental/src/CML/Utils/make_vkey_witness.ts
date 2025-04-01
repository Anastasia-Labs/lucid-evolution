/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for make_vkey_witness function
 *
 * This error is thrown when the make_vkey_witness function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MakeVkeyWitnessError extends Data.TaggedError(
  "MakeVkeyWitnessError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the make_vkey_witness function
 *
 * @since 2.0.0
 * @category Functions
 */
export const makeVkeyWitness: (
  txBodyHash: CML.TransactionHash,
  sk: CML.PrivateKey,
) => Effect.Effect<CML.Vkeywitness, MakeVkeyWitnessError> = Effect.fn(
  function* (txBodyHash: CML.TransactionHash, sk: CML.PrivateKey) {
    return yield* Effect.try({
      try: () => CML.make_vkey_witness(txBodyHash, sk),
      catch: () =>
        new MakeVkeyWitnessError({
          message: `make_vkey_witness failed with parameters: txBodyHash (TransactionHash instance), sk (PrivateKey instance).`,
        }),
    });
  },
);

/**
 * Unsafely calls make_vkey_witness function without Effect wrapper
 *
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const makeVkeyWitnessUnsafe = (
  txBodyHash: CML.TransactionHash,
  sk: CML.PrivateKey,
): CML.Vkeywitness => Effect.runSync(makeVkeyWitness(txBodyHash, sk));

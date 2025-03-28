import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class MakeVkeyWitnessError extends Data.TaggedError(
  "MakeVkeyWitnessError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the make_vkey_witness function
 *
 * @example
 * import { makeVkeyWitness } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* makeVkeyWitness(TransactionHash instance , PrivateKey instance );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Functions
 */
export const makeVkeyWitness = Effect.fn(function* (
  txBodyHash: CML.TransactionHash,
  sk: CML.PrivateKey,
) {
  return yield* Effect.try({
    try: () => CML.make_vkey_witness(txBodyHash, sk),
    catch: () =>
      new MakeVkeyWitnessError({
        message: `make_vkey_witness failed with parameters: txBodyHash (TransactionHash instance), sk (PrivateKey instance).`,
      }),
  });
});

/**
 * Unsafely calls make_vkey_witness function without Effect wrapper
 *
 * @example
 * import { unsafeMakeVkeyWitness } from "@lucid-evolution/experimental/CML/functions";
 *
 * try {
 *   const result = unsafeMakeVkeyWitness(TransactionHash instance , PrivateKey instance );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeMakeVkeyWitness failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Functions
 */
export const unsafeMakeVkeyWitness = (
  txBodyHash: CML.TransactionHash,
  sk: CML.PrivateKey,
): CML.Vkeywitness => Effect.runSync(makeVkeyWitness(txBodyHash, sk));

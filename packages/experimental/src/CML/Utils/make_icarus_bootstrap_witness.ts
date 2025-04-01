/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for make_icarus_bootstrap_witness function
 *
 * This error is thrown when the make_icarus_bootstrap_witness function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MakeIcarusBootstrapWitnessError extends Data.TaggedError(
  "MakeIcarusBootstrapWitnessError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the make_icarus_bootstrap_witness function
 *
 * @example
 * import { makeIcarusBootstrapWitness } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* makeIcarusBootstrapWitness(TransactionHash instance , ByronAddress instance , Bip32PrivateKey instance );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Functions
 */
export const makeIcarusBootstrapWitness = Effect.fn(function* (
  txBodyHash: CML.TransactionHash,
  addr: CML.ByronAddress,
  key: CML.Bip32PrivateKey,
) {
  return yield* Effect.try({
    try: () => CML.make_icarus_bootstrap_witness(txBodyHash, addr, key),
    catch: () =>
      new MakeIcarusBootstrapWitnessError({
        message: `make_icarus_bootstrap_witness failed with parameters: txBodyHash (TransactionHash instance), addr (ByronAddress instance), key (Bip32PrivateKey instance).`,
      }),
  });
});

/**
 * Unsafely calls make_icarus_bootstrap_witness function without Effect wrapper
 *
 * @example
 * import { makeIcarusBootstrapWitnessUnsafe } from "@lucid-evolution/experimental/CML/functions";
 *
 * try {
 *   const result = makeIcarusBootstrapWitnessUnsafe(TransactionHash instance , ByronAddress instance , Bip32PrivateKey instance );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`makeIcarusBootstrapWitnessUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const makeIcarusBootstrapWitnessUnsafe = (
  txBodyHash: CML.TransactionHash,
  addr: CML.ByronAddress,
  key: CML.Bip32PrivateKey,
): CML.BootstrapWitness =>
  Effect.runSync(makeIcarusBootstrapWitness(txBodyHash, addr, key));

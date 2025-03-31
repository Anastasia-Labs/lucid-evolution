/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for make_daedalus_bootstrap_witness function
 * 
 * This error is thrown when the make_daedalus_bootstrap_witness function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MakeDaedalusBootstrapWitnessError extends Data.TaggedError("MakeDaedalusBootstrapWitnessError")<{
  message?: string;
}> {}

/**
 * Wrapper for the make_daedalus_bootstrap_witness function
 * 
 * @example
 * import { makeDaedalusBootstrapWitness } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* makeDaedalusBootstrapWitness(TransactionHash instance , ByronAddress instance , LegacyDaedalusPrivateKey instance );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Functions
 */
export const makeDaedalusBootstrapWitness = Effect.fn(function* (txBodyHash: CML.TransactionHash, addr: CML.ByronAddress, key: CML.LegacyDaedalusPrivateKey) {
  return yield* Effect.try({
    try: () => CML.make_daedalus_bootstrap_witness(txBodyHash, addr, key),
    catch: () => new MakeDaedalusBootstrapWitnessError({
      message: `make_daedalus_bootstrap_witness failed with parameters: txBodyHash (TransactionHash instance), addr (ByronAddress instance), key (LegacyDaedalusPrivateKey instance).`,
    }),
  });
});

/**
 * Unsafely calls make_daedalus_bootstrap_witness function without Effect wrapper
 * 
 * @example
 * import { makeDaedalusBootstrapWitnessUnsafe } from "@lucid-evolution/experimental/CML/functions";
 * 
 * try {
 *   const result = makeDaedalusBootstrapWitnessUnsafe(TransactionHash instance , ByronAddress instance , LegacyDaedalusPrivateKey instance );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`makeDaedalusBootstrapWitnessUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const makeDaedalusBootstrapWitnessUnsafe = (txBodyHash: CML.TransactionHash, addr: CML.ByronAddress, key: CML.LegacyDaedalusPrivateKey): CML.BootstrapWitness =>
  Effect.runSync(makeDaedalusBootstrapWitness(txBodyHash, addr, key));

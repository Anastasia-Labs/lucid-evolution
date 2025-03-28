import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class GetImplicitInputError extends Data.TaggedError("GetImplicitInputError")<{
  message?: string;
}> {}

/**
 * Wrapper for the get_implicit_input function
 * 
 * @example
 * import { getImplicitInput } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* getImplicitInput(TransactionBody instance ,  appropriate value ,  appropriate value );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Functions
 */
export const getImplicitInput = Effect.fn(function* (txbody: CML.TransactionBody, poolDeposit: bigint, keyDeposit: bigint) {
  return yield* Effect.try({
    try: () => CML.get_implicit_input(txbody, poolDeposit, keyDeposit),
    catch: () => new GetImplicitInputError({
      message: `get_implicit_input failed with parameters: txbody (TransactionBody instance), ${poolDeposit}, ${keyDeposit}.`,
    }),
  });
});

/**
 * Unsafely calls get_implicit_input function without Effect wrapper
 * 
 * @example
 * import { unsafeGetImplicitInput } from "@lucid-evolution/experimental/CML/functions";
 * 
 * try {
 *   const result = unsafeGetImplicitInput(TransactionBody instance ,  appropriate value ,  appropriate value );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeGetImplicitInput failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Functions
 */
export const unsafeGetImplicitInput = (txbody: CML.TransactionBody, poolDeposit: bigint, keyDeposit: bigint): CML.Value =>
  Effect.runSync(getImplicitInput(txbody, poolDeposit, keyDeposit));

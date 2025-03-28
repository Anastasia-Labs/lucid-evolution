import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class GetDepositError extends Data.TaggedError("GetDepositError")<{
  message?: string;
}> {}

/**
 * Wrapper for the get_deposit function
 * 
 * @example
 * import { getDeposit } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* getDeposit(TransactionBody instance ,  appropriate value ,  appropriate value );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Functions
 */
export const getDeposit = Effect.fn(function* (txbody: CML.TransactionBody, poolDeposit: bigint, keyDeposit: bigint) {
  return yield* Effect.try({
    try: () => CML.get_deposit(txbody, poolDeposit, keyDeposit),
    catch: () => new GetDepositError({
      message: `get_deposit failed with parameters: txbody (TransactionBody instance), ${poolDeposit}, ${keyDeposit}.`,
    }),
  });
});

/**
 * Unsafely calls get_deposit function without Effect wrapper
 * 
 * @example
 * import { unsafeGetDeposit } from "@lucid-evolution/experimental/CML/functions";
 * 
 * try {
 *   const result = unsafeGetDeposit(TransactionBody instance ,  appropriate value ,  appropriate value );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeGetDeposit failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Functions
 */
export const unsafeGetDeposit = (txbody: CML.TransactionBody, poolDeposit: bigint, keyDeposit: bigint): bigint =>
  Effect.runSync(getDeposit(txbody, poolDeposit, keyDeposit));

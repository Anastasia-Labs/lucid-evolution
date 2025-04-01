/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for get_deposit function
 * 
 * This error is thrown when the get_deposit function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class GetDepositError extends Data.TaggedError("GetDepositError")<{
  message?: string;
}> {}

/**
 * Wrapper for the get_deposit function
 * 
 * @since 2.0.0
 * @category Functions
 */
export const getDeposit: (txbody: CML.TransactionBody, poolDeposit: bigint, keyDeposit: bigint) => Effect.Effect<bigint, GetDepositError> = Effect.fn(function* (txbody: CML.TransactionBody, poolDeposit: bigint, keyDeposit: bigint) {
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
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const getDepositUnsafe = (txbody: CML.TransactionBody, poolDeposit: bigint, keyDeposit: bigint): bigint =>
  Effect.runSync(getDeposit(txbody, poolDeposit, keyDeposit));

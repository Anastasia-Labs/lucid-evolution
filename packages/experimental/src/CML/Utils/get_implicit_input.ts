/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for get_implicit_input function
 *
 * This error is thrown when the get_implicit_input function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class GetImplicitInputError extends Data.TaggedError(
  "GetImplicitInputError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the get_implicit_input function
 *
 * @since 2.0.0
 * @category Functions
 */
export const getImplicitInput: (
  txbody: CML.TransactionBody,
  poolDeposit: bigint,
  keyDeposit: bigint,
) => Effect.Effect<CML.Value, GetImplicitInputError> = Effect.fn(function* (
  txbody: CML.TransactionBody,
  poolDeposit: bigint,
  keyDeposit: bigint,
) {
  return yield* Effect.try({
    try: () => CML.get_implicit_input(txbody, poolDeposit, keyDeposit),
    catch: () =>
      new GetImplicitInputError({
        message: `get_implicit_input failed with parameters: txbody (TransactionBody instance), ${poolDeposit}, ${keyDeposit}.`,
      }),
  });
});

/**
 * Unsafely calls get_implicit_input function without Effect wrapper
 *
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const getImplicitInputUnsafe = (
  txbody: CML.TransactionBody,
  poolDeposit: bigint,
  keyDeposit: bigint,
): CML.Value =>
  Effect.runSync(getImplicitInput(txbody, poolDeposit, keyDeposit));

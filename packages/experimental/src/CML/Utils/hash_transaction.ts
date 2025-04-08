/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for hash_transaction function
 *
 * This error is thrown when the hash_transaction function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class HashTransactionError extends Data.TaggedError(
  "HashTransactionError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the hash_transaction function
 *
 * @since 2.0.0
 * @category Functions
 */
export const hashTransaction: (
  txBody: CML.TransactionBody,
) => Effect.Effect<CML.TransactionHash, HashTransactionError> = Effect.fn(
  function* (txBody: CML.TransactionBody) {
    return yield* Effect.try({
      try: () => CML.hash_transaction(txBody),
      catch: () =>
        new HashTransactionError({
          message: `hash_transaction failed with parameters: txBody (TransactionBody instance). Hint: Verify input data is valid for hashing.`,
        }),
    });
  },
);

/**
 * Unsafely calls hash_transaction function without Effect wrapper
 *
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const hashTransactionUnsafe = (
  txBody: CML.TransactionBody,
): CML.TransactionHash => Effect.runSync(hashTransaction(txBody));

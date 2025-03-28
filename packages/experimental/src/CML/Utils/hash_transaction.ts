import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class HashTransactionError extends Data.TaggedError("HashTransactionError")<{
  message?: string;
}> {}

/**
 * Wrapper for the hash_transaction function
 * 
 * @example
 * import { hashTransaction } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* hashTransaction(TransactionBody instance );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Functions
 */
export const hashTransaction = Effect.fn(function* (txBody: CML.TransactionBody) {
  return yield* Effect.try({
    try: () => CML.hash_transaction(txBody),
    catch: () => new HashTransactionError({
      message: `hash_transaction failed with parameters: txBody (TransactionBody instance). Hint: Verify input data is valid for hashing.`,
    }),
  });
});

/**
 * Unsafely calls hash_transaction function without Effect wrapper
 * 
 * @example
 * import { unsafeHashTransaction } from "@lucid-evolution/experimental/CML/functions";
 * 
 * try {
 *   const result = unsafeHashTransaction(TransactionBody instance );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeHashTransaction failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Functions
 */
export const unsafeHashTransaction = (txBody: CML.TransactionBody): CML.TransactionHash =>
  Effect.runSync(hashTransaction(txBody));

import { Data } from "effect";

/**
 * CDDL Specs
 * transaction = [transaction_body
 *               , transaction_witness_set
 *               , bool
 *               , auxiliary_data / nil]
 */

/**
 * Error thrown when transaction operations fail
 *
 * @since 2.0.0
 * @category model
 */
export class TransactionError extends Data.TaggedError("TransactionError")<{
  message: string;
  cause?: unknown;
}> { }

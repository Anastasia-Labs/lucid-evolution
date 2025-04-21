import { Data } from "effect";

/**
 * CDDL Specs
 * transaction_metadatum_label = uint .size 8
 */

/**
 * Error thrown when TransactionMetadatumLabelsError operations fail
 *
 * @since 2.0.0
 * @category model
 */
export class TransactionMetadatumLabelsError extends Data.TaggedError("TransactionMetadatumLabelsError")<{
  message: string;
  cause?: unknown;
}> { }

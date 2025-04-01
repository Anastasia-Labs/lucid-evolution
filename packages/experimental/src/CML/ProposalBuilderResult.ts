/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ProposalBuilderResult class
 *
 * @since 2.0.0
 * @category Types
 */
export type ProposalBuilderResult = CML.ProposalBuilderResult;

/**
 * Error class for ProposalBuilderResult operations
 *
 * This error is thrown when operations on ProposalBuilderResult instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ProposalBuilderResultError extends Data.TaggedError(
  "ProposalBuilderResultError",
)<{
  message?: string;
}> {}

/**
 * Method free of ProposalBuilderResult
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.ProposalBuilderResult,
) => Effect.Effect<void, ProposalBuilderResultError> = Effect.fn(
  (instance: CML.ProposalBuilderResult) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ProposalBuilderResultError({
          message: `ProposalBuilderResult.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ProposalBuilderResult): void =>
  Effect.runSync(free(instance));

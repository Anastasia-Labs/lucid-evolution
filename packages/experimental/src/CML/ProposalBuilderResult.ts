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
 * @example
 * import { ProposalBuilderResult } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalBuilderResult instance
 * const instance = ... ;
 *   const result = yield* ProposalBuilderResult.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.ProposalBuilderResult,
  ): Effect.Effect<void, ProposalBuilderResultError> =>
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
 * @example
 * import { ProposalBuilderResult } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ProposalBuilderResult instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalBuilderResult.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalBuilderResult.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ProposalBuilderResult): void =>
  Effect.runSync(free(instance));

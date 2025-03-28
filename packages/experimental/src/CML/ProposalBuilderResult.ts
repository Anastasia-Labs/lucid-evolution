import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ProposalBuilderResult = CML.ProposalBuilderResult;

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
 *   const result = ProposalBuilderResult.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalBuilderResult.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ProposalBuilderResult): void =>
  Effect.runSync(free(instance));

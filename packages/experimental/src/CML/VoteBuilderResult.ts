import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type VoteBuilderResult = CML.VoteBuilderResult;

export class VoteBuilderResultError extends Data.TaggedError("VoteBuilderResultError")<{
  message?: string;
}> {}

/**
 * Method free of VoteBuilderResult
 * 
 * @example
 * import { VoteBuilderResult } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoteBuilderResult instance
 * const instance = ... ;
 *   const result = yield* VoteBuilderResult.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.VoteBuilderResult): Effect.Effect<void, VoteBuilderResultError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VoteBuilderResultError({
          message: `VoteBuilderResult.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { VoteBuilderResult } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VoteBuilderResult instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoteBuilderResult.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoteBuilderResult.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.VoteBuilderResult): void =>
  Effect.runSync(free(instance));

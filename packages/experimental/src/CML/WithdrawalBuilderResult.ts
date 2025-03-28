import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type WithdrawalBuilderResult = CML.WithdrawalBuilderResult;

export class WithdrawalBuilderResultError extends Data.TaggedError("WithdrawalBuilderResultError")<{
  message?: string;
}> {}

/**
 * Method free of WithdrawalBuilderResult
 * 
 * @example
 * import { WithdrawalBuilderResult } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a WithdrawalBuilderResult instance
 * const instance = ... ;
 *   const result = yield* WithdrawalBuilderResult.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.WithdrawalBuilderResult): Effect.Effect<void, WithdrawalBuilderResultError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new WithdrawalBuilderResultError({
          message: `WithdrawalBuilderResult.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { WithdrawalBuilderResult } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a WithdrawalBuilderResult instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = WithdrawalBuilderResult.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`WithdrawalBuilderResult.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.WithdrawalBuilderResult): void =>
  Effect.runSync(free(instance));

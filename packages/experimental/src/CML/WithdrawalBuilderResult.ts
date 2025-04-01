/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML WithdrawalBuilderResult class
 *
 * @since 2.0.0
 * @category Types
 */
export type WithdrawalBuilderResult = CML.WithdrawalBuilderResult;

/**
 * Error class for WithdrawalBuilderResult operations
 * 
 * This error is thrown when operations on WithdrawalBuilderResult instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class WithdrawalBuilderResultError extends Data.TaggedError("WithdrawalBuilderResultError")<{
  message?: string;
}> {}

/**
 * Method free of WithdrawalBuilderResult
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.WithdrawalBuilderResult) => Effect.Effect<void, WithdrawalBuilderResultError> = Effect.fn(
  (instance: CML.WithdrawalBuilderResult) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.WithdrawalBuilderResult): void =>
  Effect.runSync(free(instance));

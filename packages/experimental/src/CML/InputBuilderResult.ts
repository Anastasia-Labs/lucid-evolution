/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML InputBuilderResult class
 *
 * @since 2.0.0
 * @category Types
 */
export type InputBuilderResult = CML.InputBuilderResult;

/**
 * Error class for InputBuilderResult operations
 * 
 * This error is thrown when operations on InputBuilderResult instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class InputBuilderResultError extends Data.TaggedError("InputBuilderResultError")<{
  message?: string;
}> {}

/**
 * Method free of InputBuilderResult
 * 
 * @example
 * import { InputBuilderResult } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a InputBuilderResult instance
 * const instance = ... ;
 *   const result = yield* InputBuilderResult.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.InputBuilderResult): Effect.Effect<void, InputBuilderResultError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new InputBuilderResultError({
          message: `InputBuilderResult.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { InputBuilderResult } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a InputBuilderResult instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = InputBuilderResult.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`InputBuilderResult.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.InputBuilderResult): void =>
  Effect.runSync(free(instance));

import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type MintBuilderResult = CML.MintBuilderResult;

export class MintBuilderResultError extends Data.TaggedError("MintBuilderResultError")<{
  message?: string;
}> {}

/**
 * Method free of MintBuilderResult
 * 
 * @example
 * import { MintBuilderResult } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MintBuilderResult instance
 * const instance = ... ;
 *   const result = yield* MintBuilderResult.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.MintBuilderResult): Effect.Effect<void, MintBuilderResultError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MintBuilderResultError({
          message: `MintBuilderResult.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { MintBuilderResult } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MintBuilderResult instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MintBuilderResult.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MintBuilderResult.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.MintBuilderResult): void =>
  Effect.runSync(free(instance));

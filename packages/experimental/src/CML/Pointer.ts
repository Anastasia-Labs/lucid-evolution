/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Pointer class
 *
 * @since 2.0.0
 * @category Types
 */
export type Pointer = CML.Pointer;

/**
 * Error class for Pointer operations
 *
 * This error is thrown when operations on Pointer instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PointerError extends Data.TaggedError("PointerError")<{
  message?: string;
}> {}

/**
 * Method free of Pointer
 *
 * @example
 * import { Pointer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Pointer instance
 * const instance = ... ;
 *   const result = yield* Pointer.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Pointer): Effect.Effect<void, PointerError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PointerError({
          message: `Pointer.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { Pointer } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Pointer instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Pointer.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Pointer.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Pointer): void =>
  Effect.runSync(free(instance));

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
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Pointer) => Effect.Effect<void, PointerError> = Effect.fn(
  (instance: CML.Pointer) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PointerError({
          message: `Pointer.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Pointer): void =>
  Effect.runSync(free(instance));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML UntaggedRedeemer class
 *
 * @since 2.0.0
 * @category Types
 */
export type UntaggedRedeemer = CML.UntaggedRedeemer;

/**
 * Error class for UntaggedRedeemer operations
 * 
 * This error is thrown when operations on UntaggedRedeemer instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class UntaggedRedeemerError extends Data.TaggedError("UntaggedRedeemerError")<{
  message?: string;
}> {}

/**
 * Method free of UntaggedRedeemer
 * 
 * @example
 * import { UntaggedRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UntaggedRedeemer instance
 * const instance = ... ;
 *   const result = yield* UntaggedRedeemer.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.UntaggedRedeemer): Effect.Effect<void, UntaggedRedeemerError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new UntaggedRedeemerError({
          message: `UntaggedRedeemer.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { UntaggedRedeemer } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UntaggedRedeemer instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UntaggedRedeemer.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UntaggedRedeemer.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.UntaggedRedeemer): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of UntaggedRedeemer
 * 
 * @example
 * import { UntaggedRedeemer } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UntaggedRedeemer._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (data: CML.PlutusData, exUnits: CML.ExUnits) {
  return yield* Effect.try({
    try: () => CML.UntaggedRedeemer.new(data, exUnits),
    catch: () => new UntaggedRedeemerError({
      message: `UntaggedRedeemer._new failed with parameters: ${data} (PlutusData), ${exUnits} (ExUnits). `,
    }),
  });
});

/**
 * Unsafely calls UntaggedRedeemer._new without Effect wrapper
 * 
 * @example
 * import { UntaggedRedeemer } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UntaggedRedeemer._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UntaggedRedeemer._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (data: CML.PlutusData, exUnits: CML.ExUnits) =>
  Effect.runSync(_new(data, exUnits));

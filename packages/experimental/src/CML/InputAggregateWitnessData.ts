/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML InputAggregateWitnessData class
 *
 * @since 2.0.0
 * @category Types
 */
export type InputAggregateWitnessData = CML.InputAggregateWitnessData;

/**
 * Error class for InputAggregateWitnessData operations
 *
 * This error is thrown when operations on InputAggregateWitnessData instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class InputAggregateWitnessDataError extends Data.TaggedError(
  "InputAggregateWitnessDataError",
)<{
  message?: string;
}> {}

/**
 * Method free of InputAggregateWitnessData
 *
 * @example
 * import { InputAggregateWitnessData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a InputAggregateWitnessData instance
 * const instance = ... ;
 *   const result = yield* InputAggregateWitnessData.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.InputAggregateWitnessData,
  ): Effect.Effect<void, InputAggregateWitnessDataError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new InputAggregateWitnessDataError({
          message: `InputAggregateWitnessData.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { InputAggregateWitnessData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a InputAggregateWitnessData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = InputAggregateWitnessData.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`InputAggregateWitnessData.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.InputAggregateWitnessData): void =>
  Effect.runSync(free(instance));

/**
 * Method plutusData of InputAggregateWitnessData
 *
 * @example
 * import { InputAggregateWitnessData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a InputAggregateWitnessData instance
 * const instance = ... ;
 *   const result = yield* InputAggregateWitnessData.plutusData(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const plutusData = Effect.fn(
  (
    instance: CML.InputAggregateWitnessData,
  ): Effect.Effect<
    CML.PlutusData | undefined,
    InputAggregateWitnessDataError
  > =>
    Effect.try({
      try: () => instance.plutus_data(),
      catch: () =>
        new InputAggregateWitnessDataError({
          message: `InputAggregateWitnessData.plutusData failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.plutusData without Effect wrapper
 *
 * @example
 * import { InputAggregateWitnessData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a InputAggregateWitnessData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = InputAggregateWitnessData.plutusDataUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`InputAggregateWitnessData.plutusDataUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusDataUnsafe = (
  instance: CML.InputAggregateWitnessData,
): CML.PlutusData | undefined => Effect.runSync(plutusData(instance));

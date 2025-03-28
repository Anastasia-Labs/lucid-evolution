import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type InputAggregateWitnessData = CML.InputAggregateWitnessData;

export class InputAggregateWitnessDataError extends Data.TaggedError("InputAggregateWitnessDataError")<{
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
  (instance: CML.InputAggregateWitnessData): Effect.Effect<void, InputAggregateWitnessDataError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new InputAggregateWitnessDataError({
          message: `InputAggregateWitnessData.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
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
 *   const result = InputAggregateWitnessData.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`InputAggregateWitnessData.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.InputAggregateWitnessData): void =>
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
  (instance: CML.InputAggregateWitnessData): Effect.Effect<CML.PlutusData | undefined, InputAggregateWitnessDataError> =>
    Effect.try({
      try: () => instance.plutus_data(),
      catch: () =>
        new InputAggregateWitnessDataError({
          message: `InputAggregateWitnessData.plutusData failed `,
        }),
    })
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
 *   const result = InputAggregateWitnessData.unsafePlutusData(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`InputAggregateWitnessData.unsafePlutusData failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePlutusData = (instance: CML.InputAggregateWitnessData): CML.PlutusData | undefined =>
  Effect.runSync(plutusData(instance));

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
export class InputAggregateWitnessDataError extends Data.TaggedError("InputAggregateWitnessDataError")<{
  message?: string;
}> {}

/**
 * Method free of InputAggregateWitnessData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.InputAggregateWitnessData) => Effect.Effect<void, InputAggregateWitnessDataError> = Effect.fn(
  (instance: CML.InputAggregateWitnessData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.InputAggregateWitnessData): void =>
  Effect.runSync(free(instance));

/**
 * Method plutusData of InputAggregateWitnessData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const plutusData: (instance: CML.InputAggregateWitnessData) => Effect.Effect<CML.PlutusData | undefined, InputAggregateWitnessDataError> = Effect.fn(
  (instance: CML.InputAggregateWitnessData) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusDataUnsafe = (instance: CML.InputAggregateWitnessData): CML.PlutusData | undefined =>
  Effect.runSync(plutusData(instance));

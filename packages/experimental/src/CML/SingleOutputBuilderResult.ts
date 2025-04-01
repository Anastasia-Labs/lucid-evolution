/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML SingleOutputBuilderResult class
 *
 * @since 2.0.0
 * @category Types
 */
export type SingleOutputBuilderResult = CML.SingleOutputBuilderResult;

/**
 * Error class for SingleOutputBuilderResult operations
 * 
 * This error is thrown when operations on SingleOutputBuilderResult instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class SingleOutputBuilderResultError extends Data.TaggedError("SingleOutputBuilderResultError")<{
  message?: string;
}> {}

/**
 * Method free of SingleOutputBuilderResult
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.SingleOutputBuilderResult) => Effect.Effect<void, SingleOutputBuilderResultError> = Effect.fn(
  (instance: CML.SingleOutputBuilderResult) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new SingleOutputBuilderResultError({
          message: `SingleOutputBuilderResult.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.SingleOutputBuilderResult): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of SingleOutputBuilderResult
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (output: CML.TransactionOutput) => Effect.Effect<CML.SingleOutputBuilderResult, SingleOutputBuilderResultError> = Effect.fn(function* (output: CML.TransactionOutput) {
  return yield* Effect.try({
    try: () => CML.SingleOutputBuilderResult.new(output),
    catch: () => new SingleOutputBuilderResultError({
      message: `SingleOutputBuilderResult._new failed with parameters: ${output} (TransactionOutput). `,
    }),
  });
});

/**
 * Unsafely calls SingleOutputBuilderResult._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (output: CML.TransactionOutput): CML.SingleOutputBuilderResult =>
  Effect.runSync(_new(output));

/**
 * Method output of SingleOutputBuilderResult
 * 
 * @since 2.0.0
 * @category Methods
 */
export const output: (instance: CML.SingleOutputBuilderResult) => Effect.Effect<CML.TransactionOutput, SingleOutputBuilderResultError> = Effect.fn(
  (instance: CML.SingleOutputBuilderResult) =>
    Effect.try({
      try: () => instance.output(),
      catch: () =>
        new SingleOutputBuilderResultError({
          message: `SingleOutputBuilderResult.output failed `,
        }),
    })
);

/**
 * Unsafely calls instance.output without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const outputUnsafe = (instance: CML.SingleOutputBuilderResult): CML.TransactionOutput =>
  Effect.runSync(output(instance));

/**
 * Method communicationDatum of SingleOutputBuilderResult
 * 
 * @since 2.0.0
 * @category Methods
 */
export const communicationDatum: (instance: CML.SingleOutputBuilderResult) => Effect.Effect<CML.PlutusData | undefined, SingleOutputBuilderResultError> = Effect.fn(
  (instance: CML.SingleOutputBuilderResult) =>
    Effect.try({
      try: () => instance.communication_datum(),
      catch: () =>
        new SingleOutputBuilderResultError({
          message: `SingleOutputBuilderResult.communicationDatum failed `,
        }),
    })
);

/**
 * Unsafely calls instance.communicationDatum without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const communicationDatumUnsafe = (instance: CML.SingleOutputBuilderResult): CML.PlutusData | undefined =>
  Effect.runSync(communicationDatum(instance));

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
export class SingleOutputBuilderResultError extends Data.TaggedError(
  "SingleOutputBuilderResultError",
)<{
  message?: string;
}> {}

/**
 * Method free of SingleOutputBuilderResult
 *
 * @example
 * import { SingleOutputBuilderResult } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleOutputBuilderResult instance
 * const instance = ... ;
 *   const result = yield* SingleOutputBuilderResult.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.SingleOutputBuilderResult,
  ): Effect.Effect<void, SingleOutputBuilderResultError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new SingleOutputBuilderResultError({
          message: `SingleOutputBuilderResult.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { SingleOutputBuilderResult } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleOutputBuilderResult instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleOutputBuilderResult.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleOutputBuilderResult.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.SingleOutputBuilderResult): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of SingleOutputBuilderResult
 *
 * @example
 * import { SingleOutputBuilderResult } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* SingleOutputBuilderResult._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (output: CML.TransactionOutput) {
  return yield* Effect.try({
    try: () => CML.SingleOutputBuilderResult.new(output),
    catch: () =>
      new SingleOutputBuilderResultError({
        message: `SingleOutputBuilderResult._new failed with parameters: ${output} (TransactionOutput). `,
      }),
  });
});

/**
 * Unsafely calls SingleOutputBuilderResult._new without Effect wrapper
 *
 * @example
 * import { SingleOutputBuilderResult } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleOutputBuilderResult._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleOutputBuilderResult._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (output: CML.TransactionOutput) =>
  Effect.runSync(_new(output));

/**
 * Method output of SingleOutputBuilderResult
 *
 * @example
 * import { SingleOutputBuilderResult } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleOutputBuilderResult instance
 * const instance = ... ;
 *   const result = yield* SingleOutputBuilderResult.output(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const output = Effect.fn(
  (
    instance: CML.SingleOutputBuilderResult,
  ): Effect.Effect<CML.TransactionOutput, SingleOutputBuilderResultError> =>
    Effect.try({
      try: () => instance.output(),
      catch: () =>
        new SingleOutputBuilderResultError({
          message: `SingleOutputBuilderResult.output failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.output without Effect wrapper
 *
 * @example
 * import { SingleOutputBuilderResult } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleOutputBuilderResult instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleOutputBuilderResult.outputUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleOutputBuilderResult.outputUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const outputUnsafe = (
  instance: CML.SingleOutputBuilderResult,
): CML.TransactionOutput => Effect.runSync(output(instance));

/**
 * Method communicationDatum of SingleOutputBuilderResult
 *
 * @example
 * import { SingleOutputBuilderResult } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a SingleOutputBuilderResult instance
 * const instance = ... ;
 *   const result = yield* SingleOutputBuilderResult.communicationDatum(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const communicationDatum = Effect.fn(
  (
    instance: CML.SingleOutputBuilderResult,
  ): Effect.Effect<
    CML.PlutusData | undefined,
    SingleOutputBuilderResultError
  > =>
    Effect.try({
      try: () => instance.communication_datum(),
      catch: () =>
        new SingleOutputBuilderResultError({
          message: `SingleOutputBuilderResult.communicationDatum failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.communicationDatum without Effect wrapper
 *
 * @example
 * import { SingleOutputBuilderResult } from "@lucid-evolution/experimental";
 *
 * // Assume we have a SingleOutputBuilderResult instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = SingleOutputBuilderResult.communicationDatumUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleOutputBuilderResult.communicationDatumUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const communicationDatumUnsafe = (
  instance: CML.SingleOutputBuilderResult,
): CML.PlutusData | undefined => Effect.runSync(communicationDatum(instance));

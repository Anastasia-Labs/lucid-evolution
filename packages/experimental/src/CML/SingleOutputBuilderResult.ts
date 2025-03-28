import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type SingleOutputBuilderResult = CML.SingleOutputBuilderResult;

export class SingleOutputBuilderResultError extends Data.TaggedError("SingleOutputBuilderResultError")<{
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
  (instance: CML.SingleOutputBuilderResult): Effect.Effect<void, SingleOutputBuilderResultError> =>
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
 * @example
 * import { SingleOutputBuilderResult } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleOutputBuilderResult instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleOutputBuilderResult.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleOutputBuilderResult.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.SingleOutputBuilderResult): void =>
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
    catch: () => new SingleOutputBuilderResultError({
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
 *   const result = SingleOutputBuilderResult.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleOutputBuilderResult.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (output: CML.TransactionOutput) =>
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
  (instance: CML.SingleOutputBuilderResult): Effect.Effect<CML.TransactionOutput, SingleOutputBuilderResultError> =>
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
 * @example
 * import { SingleOutputBuilderResult } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleOutputBuilderResult instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleOutputBuilderResult.unsafeOutput(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleOutputBuilderResult.unsafeOutput failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeOutput = (instance: CML.SingleOutputBuilderResult): CML.TransactionOutput =>
  Effect.runSync(output(instance));

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
  (instance: CML.SingleOutputBuilderResult): Effect.Effect<CML.PlutusData | undefined, SingleOutputBuilderResultError> =>
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
 * @example
 * import { SingleOutputBuilderResult } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a SingleOutputBuilderResult instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = SingleOutputBuilderResult.unsafeCommunicationDatum(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`SingleOutputBuilderResult.unsafeCommunicationDatum failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCommunicationDatum = (instance: CML.SingleOutputBuilderResult): CML.PlutusData | undefined =>
  Effect.runSync(communicationDatum(instance));

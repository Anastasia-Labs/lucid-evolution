import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type TransactionBuilderConfig = CML.TransactionBuilderConfig;

export class TransactionBuilderConfigError extends Data.TaggedError(
  "TransactionBuilderConfigError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionBuilderConfig
 *
 * @example
 * import { TransactionBuilderConfig } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBuilderConfig instance
 * const instance = ... ;
 *   const result = yield* TransactionBuilderConfig.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.TransactionBuilderConfig,
  ): Effect.Effect<void, TransactionBuilderConfigError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionBuilderConfigError({
          message: `TransactionBuilderConfig.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { TransactionBuilderConfig } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBuilderConfig instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBuilderConfig.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBuilderConfig.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.TransactionBuilderConfig): void =>
  Effect.runSync(free(instance));

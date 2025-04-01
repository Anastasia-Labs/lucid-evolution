/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionBuilderConfig class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionBuilderConfig = CML.TransactionBuilderConfig;

/**
 * Error class for TransactionBuilderConfig operations
 * 
 * This error is thrown when operations on TransactionBuilderConfig instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionBuilderConfigError extends Data.TaggedError("TransactionBuilderConfigError")<{
  message?: string;
}> {}

/**
 * Method free of TransactionBuilderConfig
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.TransactionBuilderConfig) => Effect.Effect<void, TransactionBuilderConfigError> = Effect.fn(
  (instance: CML.TransactionBuilderConfig) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionBuilderConfigError({
          message: `TransactionBuilderConfig.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionBuilderConfig): void =>
  Effect.runSync(free(instance));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionOutputBuilder class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionOutputBuilder = CML.TransactionOutputBuilder;

/**
 * Error class for TransactionOutputBuilder operations
 * 
 * This error is thrown when operations on TransactionOutputBuilder instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionOutputBuilderError extends Data.TaggedError("TransactionOutputBuilderError")<{
  message?: string;
}> {}

/**
 * Method free of TransactionOutputBuilder
 * 
 * @example
 * import { TransactionOutputBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutputBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionOutputBuilder.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.TransactionOutputBuilder): Effect.Effect<void, TransactionOutputBuilderError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionOutputBuilderError({
          message: `TransactionOutputBuilder.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { TransactionOutputBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionOutputBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutputBuilder.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutputBuilder.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionOutputBuilder): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionOutputBuilder
 * 
 * @example
 * import { TransactionOutputBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionOutputBuilder._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionOutputBuilder.new(),
    catch: () => new TransactionOutputBuilderError({
      message: `TransactionOutputBuilder._new failed `,
    }),
  });
});

/**
 * Unsafely calls TransactionOutputBuilder._new without Effect wrapper
 * 
 * @example
 * import { TransactionOutputBuilder } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutputBuilder._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutputBuilder._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () =>
  Effect.runSync(_new());

/**
 * Method withAddress of TransactionOutputBuilder
 * 
 * @example
 * import { TransactionOutputBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutputBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionOutputBuilder.withAddress(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const withAddress = Effect.fn(
  (instance: CML.TransactionOutputBuilder, address: CML.Address): Effect.Effect<CML.TransactionOutputBuilder, TransactionOutputBuilderError> =>
    Effect.try({
      try: () => instance.with_address(address),
      catch: () =>
        new TransactionOutputBuilderError({
          message: `TransactionOutputBuilder.withAddress failed with parameters: ${address} (Address). `,
        }),
    })
);

/**
 * Unsafely calls instance.withAddress without Effect wrapper
 * 
 * @example
 * import { TransactionOutputBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionOutputBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutputBuilder.withAddressUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutputBuilder.withAddressUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withAddressUnsafe = (instance: CML.TransactionOutputBuilder, address: CML.Address): CML.TransactionOutputBuilder =>
  Effect.runSync(withAddress(instance, address));

/**
 * Method withCommunicationData of TransactionOutputBuilder
 * 
 * @example
 * import { TransactionOutputBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutputBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionOutputBuilder.withCommunicationData(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const withCommunicationData = Effect.fn(
  (instance: CML.TransactionOutputBuilder, datum: CML.PlutusData): Effect.Effect<CML.TransactionOutputBuilder, TransactionOutputBuilderError> =>
    Effect.try({
      try: () => instance.with_communication_data(datum),
      catch: () =>
        new TransactionOutputBuilderError({
          message: `TransactionOutputBuilder.withCommunicationData failed with parameters: ${datum} (PlutusData). `,
        }),
    })
);

/**
 * Unsafely calls instance.withCommunicationData without Effect wrapper
 * 
 * @example
 * import { TransactionOutputBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionOutputBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutputBuilder.withCommunicationDataUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutputBuilder.withCommunicationDataUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withCommunicationDataUnsafe = (instance: CML.TransactionOutputBuilder, datum: CML.PlutusData): CML.TransactionOutputBuilder =>
  Effect.runSync(withCommunicationData(instance, datum));

/**
 * Method withData of TransactionOutputBuilder
 * 
 * @example
 * import { TransactionOutputBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutputBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionOutputBuilder.withData(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const withData = Effect.fn(
  (instance: CML.TransactionOutputBuilder, datum: CML.DatumOption): Effect.Effect<CML.TransactionOutputBuilder, TransactionOutputBuilderError> =>
    Effect.try({
      try: () => instance.with_data(datum),
      catch: () =>
        new TransactionOutputBuilderError({
          message: `TransactionOutputBuilder.withData failed with parameters: ${datum} (DatumOption). `,
        }),
    })
);

/**
 * Unsafely calls instance.withData without Effect wrapper
 * 
 * @example
 * import { TransactionOutputBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionOutputBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutputBuilder.withDataUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutputBuilder.withDataUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withDataUnsafe = (instance: CML.TransactionOutputBuilder, datum: CML.DatumOption): CML.TransactionOutputBuilder =>
  Effect.runSync(withData(instance, datum));

/**
 * Method withReferenceScript of TransactionOutputBuilder
 * 
 * @example
 * import { TransactionOutputBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutputBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionOutputBuilder.withReferenceScript(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const withReferenceScript = Effect.fn(
  (instance: CML.TransactionOutputBuilder, scriptRef: CML.Script): Effect.Effect<CML.TransactionOutputBuilder, TransactionOutputBuilderError> =>
    Effect.try({
      try: () => instance.with_reference_script(scriptRef),
      catch: () =>
        new TransactionOutputBuilderError({
          message: `TransactionOutputBuilder.withReferenceScript failed with parameters: ${scriptRef} (Script). `,
        }),
    })
);

/**
 * Unsafely calls instance.withReferenceScript without Effect wrapper
 * 
 * @example
 * import { TransactionOutputBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionOutputBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutputBuilder.withReferenceScriptUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutputBuilder.withReferenceScriptUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const withReferenceScriptUnsafe = (instance: CML.TransactionOutputBuilder, scriptRef: CML.Script): CML.TransactionOutputBuilder =>
  Effect.runSync(withReferenceScript(instance, scriptRef));

/**
 * Method next of TransactionOutputBuilder
 * 
 * @example
 * import { TransactionOutputBuilder } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutputBuilder instance
 * const instance = ... ;
 *   const result = yield* TransactionOutputBuilder.next(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const next = Effect.fn(
  (instance: CML.TransactionOutputBuilder): Effect.Effect<CML.TransactionOutputAmountBuilder, TransactionOutputBuilderError> =>
    Effect.try({
      try: () => instance.next(),
      catch: () =>
        new TransactionOutputBuilderError({
          message: `TransactionOutputBuilder.next failed `,
        }),
    })
);

/**
 * Unsafely calls instance.next without Effect wrapper
 * 
 * @example
 * import { TransactionOutputBuilder } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionOutputBuilder instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutputBuilder.nextUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutputBuilder.nextUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nextUnsafe = (instance: CML.TransactionOutputBuilder): CML.TransactionOutputAmountBuilder =>
  Effect.runSync(next(instance));

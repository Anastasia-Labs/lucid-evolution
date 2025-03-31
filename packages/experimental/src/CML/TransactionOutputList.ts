/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionOutputList class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionOutputList = CML.TransactionOutputList;

/**
 * Error class for TransactionOutputList operations
 * 
 * This error is thrown when operations on TransactionOutputList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionOutputListError extends Data.TaggedError("TransactionOutputListError")<{
  message?: string;
}> {}

/**
 * Method free of TransactionOutputList
 * 
 * @example
 * import { TransactionOutputList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutputList instance
 * const instance = ... ;
 *   const result = yield* TransactionOutputList.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.TransactionOutputList): Effect.Effect<void, TransactionOutputListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionOutputListError({
          message: `TransactionOutputList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { TransactionOutputList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionOutputList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutputList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutputList.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionOutputList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionOutputList
 * 
 * @example
 * import { TransactionOutputList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionOutputList._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionOutputList.new(),
    catch: () => new TransactionOutputListError({
      message: `TransactionOutputList._new failed `,
    }),
  });
});

/**
 * Unsafely calls TransactionOutputList._new without Effect wrapper
 * 
 * @example
 * import { TransactionOutputList } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutputList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutputList._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () =>
  Effect.runSync(_new());

/**
 * Method len of TransactionOutputList
 * 
 * @example
 * import { TransactionOutputList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutputList instance
 * const instance = ... ;
 *   const result = yield* TransactionOutputList.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.TransactionOutputList): Effect.Effect<number, TransactionOutputListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new TransactionOutputListError({
          message: `TransactionOutputList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { TransactionOutputList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionOutputList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutputList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutputList.lenUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.TransactionOutputList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of TransactionOutputList
 * 
 * @example
 * import { TransactionOutputList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutputList instance
 * const instance = ... ;
 *   const result = yield* TransactionOutputList.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.TransactionOutputList, index: number): Effect.Effect<CML.TransactionOutput, TransactionOutputListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new TransactionOutputListError({
          message: `TransactionOutputList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { TransactionOutputList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionOutputList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutputList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutputList.getUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.TransactionOutputList, index: number): CML.TransactionOutput =>
  Effect.runSync(get(instance, index));

/**
 * Method add of TransactionOutputList
 * 
 * @example
 * import { TransactionOutputList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionOutputList instance
 * const instance = ... ;
 *   const result = yield* TransactionOutputList.add(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (instance: CML.TransactionOutputList, elem: CML.TransactionOutput): Effect.Effect<void, TransactionOutputListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new TransactionOutputListError({
          message: `TransactionOutputList.add failed with parameters: ${elem} (TransactionOutput). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @example
 * import { TransactionOutputList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionOutputList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionOutputList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionOutputList.addUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.TransactionOutputList, elem: CML.TransactionOutput): void =>
  Effect.runSync(add(instance, elem));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionInputList class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionInputList = CML.TransactionInputList;

/**
 * Error class for TransactionInputList operations
 * 
 * This error is thrown when operations on TransactionInputList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionInputListError extends Data.TaggedError("TransactionInputListError")<{
  message?: string;
}> {}

/**
 * Method free of TransactionInputList
 * 
 * @example
 * import { TransactionInputList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionInputList instance
 * const instance = ... ;
 *   const result = yield* TransactionInputList.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.TransactionInputList): Effect.Effect<void, TransactionInputListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionInputListError({
          message: `TransactionInputList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { TransactionInputList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionInputList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInputList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInputList.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionInputList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionInputList
 * 
 * @example
 * import { TransactionInputList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* TransactionInputList._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionInputList.new(),
    catch: () => new TransactionInputListError({
      message: `TransactionInputList._new failed `,
    }),
  });
});

/**
 * Unsafely calls TransactionInputList._new without Effect wrapper
 * 
 * @example
 * import { TransactionInputList } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInputList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInputList._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () =>
  Effect.runSync(_new());

/**
 * Method len of TransactionInputList
 * 
 * @example
 * import { TransactionInputList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionInputList instance
 * const instance = ... ;
 *   const result = yield* TransactionInputList.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.TransactionInputList): Effect.Effect<number, TransactionInputListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new TransactionInputListError({
          message: `TransactionInputList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { TransactionInputList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionInputList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInputList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInputList.lenUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.TransactionInputList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of TransactionInputList
 * 
 * @example
 * import { TransactionInputList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionInputList instance
 * const instance = ... ;
 *   const result = yield* TransactionInputList.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.TransactionInputList, index: number): Effect.Effect<CML.TransactionInput, TransactionInputListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new TransactionInputListError({
          message: `TransactionInputList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { TransactionInputList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionInputList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInputList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInputList.getUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.TransactionInputList, index: number): CML.TransactionInput =>
  Effect.runSync(get(instance, index));

/**
 * Method add of TransactionInputList
 * 
 * @example
 * import { TransactionInputList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionInputList instance
 * const instance = ... ;
 *   const result = yield* TransactionInputList.add(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (instance: CML.TransactionInputList, elem: CML.TransactionInput): Effect.Effect<void, TransactionInputListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new TransactionInputListError({
          message: `TransactionInputList.add failed with parameters: ${elem} (TransactionInput). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @example
 * import { TransactionInputList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a TransactionInputList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionInputList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInputList.addUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.TransactionInputList, elem: CML.TransactionInput): void =>
  Effect.runSync(add(instance, elem));

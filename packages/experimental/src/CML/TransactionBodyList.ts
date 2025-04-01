/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionBodyList class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionBodyList = CML.TransactionBodyList;

/**
 * Error class for TransactionBodyList operations
 *
 * This error is thrown when operations on TransactionBodyList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionBodyListError extends Data.TaggedError(
  "TransactionBodyListError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionBodyList
 *
 * @example
 * import { TransactionBodyList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBodyList instance
 * const instance = ... ;
 *   const result = yield* TransactionBodyList.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.TransactionBodyList,
  ): Effect.Effect<void, TransactionBodyListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionBodyListError({
          message: `TransactionBodyList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { TransactionBodyList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBodyList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBodyList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBodyList.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionBodyList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionBodyList
 *
 * @example
 * import { TransactionBodyList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionBodyList._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionBodyList.new(),
    catch: () =>
      new TransactionBodyListError({
        message: `TransactionBodyList._new failed `,
      }),
  });
});

/**
 * Unsafely calls TransactionBodyList._new without Effect wrapper
 *
 * @example
 * import { TransactionBodyList } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBodyList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBodyList._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () => Effect.runSync(_new());

/**
 * Method len of TransactionBodyList
 *
 * @example
 * import { TransactionBodyList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBodyList instance
 * const instance = ... ;
 *   const result = yield* TransactionBodyList.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.TransactionBodyList,
  ): Effect.Effect<number, TransactionBodyListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new TransactionBodyListError({
          message: `TransactionBodyList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { TransactionBodyList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBodyList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBodyList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBodyList.lenUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.TransactionBodyList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of TransactionBodyList
 *
 * @example
 * import { TransactionBodyList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBodyList instance
 * const instance = ... ;
 *   const result = yield* TransactionBodyList.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.TransactionBodyList,
    index: number,
  ): Effect.Effect<CML.TransactionBody, TransactionBodyListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new TransactionBodyListError({
          message: `TransactionBodyList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { TransactionBodyList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBodyList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBodyList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBodyList.getUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.TransactionBodyList,
  index: number,
): CML.TransactionBody => Effect.runSync(get(instance, index));

/**
 * Method add of TransactionBodyList
 *
 * @example
 * import { TransactionBodyList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionBodyList instance
 * const instance = ... ;
 *   const result = yield* TransactionBodyList.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.TransactionBodyList,
    elem: CML.TransactionBody,
  ): Effect.Effect<void, TransactionBodyListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new TransactionBodyListError({
          message: `TransactionBodyList.add failed with parameters: ${elem} (TransactionBody). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { TransactionBodyList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionBodyList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionBodyList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBodyList.addUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (
  instance: CML.TransactionBodyList,
  elem: CML.TransactionBody,
): void => Effect.runSync(add(instance, elem));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionWitnessSetList class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionWitnessSetList = CML.TransactionWitnessSetList;

/**
 * Error class for TransactionWitnessSetList operations
 *
 * This error is thrown when operations on TransactionWitnessSetList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionWitnessSetListError extends Data.TaggedError(
  "TransactionWitnessSetListError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionWitnessSetList
 *
 * @example
 * import { TransactionWitnessSetList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetList instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetList.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.TransactionWitnessSetList,
  ): Effect.Effect<void, TransactionWitnessSetListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionWitnessSetListError({
          message: `TransactionWitnessSetList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetList.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionWitnessSetList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionWitnessSetList
 *
 * @example
 * import { TransactionWitnessSetList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionWitnessSetList._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionWitnessSetList.new(),
    catch: () =>
      new TransactionWitnessSetListError({
        message: `TransactionWitnessSetList._new failed `,
      }),
  });
});

/**
 * Unsafely calls TransactionWitnessSetList._new without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetList } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetList._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () => Effect.runSync(_new());

/**
 * Method len of TransactionWitnessSetList
 *
 * @example
 * import { TransactionWitnessSetList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetList instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetList.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.TransactionWitnessSetList,
  ): Effect.Effect<number, TransactionWitnessSetListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new TransactionWitnessSetListError({
          message: `TransactionWitnessSetList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetList.lenUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.TransactionWitnessSetList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of TransactionWitnessSetList
 *
 * @example
 * import { TransactionWitnessSetList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetList instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetList.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.TransactionWitnessSetList,
    index: number,
  ): Effect.Effect<CML.TransactionWitnessSet, TransactionWitnessSetListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new TransactionWitnessSetListError({
          message: `TransactionWitnessSetList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetList.getUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.TransactionWitnessSetList,
  index: number,
): CML.TransactionWitnessSet => Effect.runSync(get(instance, index));

/**
 * Method add of TransactionWitnessSetList
 *
 * @example
 * import { TransactionWitnessSetList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSetList instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSetList.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.TransactionWitnessSetList,
    elem: CML.TransactionWitnessSet,
  ): Effect.Effect<void, TransactionWitnessSetListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new TransactionWitnessSetListError({
          message: `TransactionWitnessSetList.add failed with parameters: ${elem} (TransactionWitnessSet). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSetList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSetList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSetList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetList.addUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (
  instance: CML.TransactionWitnessSetList,
  elem: CML.TransactionWitnessSet,
): void => Effect.runSync(add(instance, elem));

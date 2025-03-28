import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type TransactionWitnessSetList = CML.TransactionWitnessSetList;

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
 *   const result = TransactionWitnessSetList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetList.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.TransactionWitnessSetList): void =>
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
 *   const result = TransactionWitnessSetList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetList.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

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
 *   const result = TransactionWitnessSetList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetList.unsafeLen failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.TransactionWitnessSetList): number =>
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
 *   const result = TransactionWitnessSetList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetList.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (
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
 *   const result = TransactionWitnessSetList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSetList.unsafeAdd failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (
  instance: CML.TransactionWitnessSetList,
  elem: CML.TransactionWitnessSet,
): void => Effect.runSync(add(instance, elem));

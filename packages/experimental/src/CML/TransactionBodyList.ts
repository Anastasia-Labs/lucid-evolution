import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type TransactionBodyList = CML.TransactionBodyList;

export class TransactionBodyListError extends Data.TaggedError("TransactionBodyListError")<{
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
  (instance: CML.TransactionBodyList): Effect.Effect<void, TransactionBodyListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionBodyListError({
          message: `TransactionBodyList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
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
 *   const result = TransactionBodyList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBodyList.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.TransactionBodyList): void =>
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
    catch: () => new TransactionBodyListError({
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
 *   const result = TransactionBodyList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBodyList.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

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
  (instance: CML.TransactionBodyList): Effect.Effect<number, TransactionBodyListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new TransactionBodyListError({
          message: `TransactionBodyList.len failed `,
        }),
    })
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
 *   const result = TransactionBodyList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBodyList.unsafeLen failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.TransactionBodyList): number =>
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
  (instance: CML.TransactionBodyList, index: number): Effect.Effect<CML.TransactionBody, TransactionBodyListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new TransactionBodyListError({
          message: `TransactionBodyList.get failed with parameters: ${index}. `,
        }),
    })
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
 *   const result = TransactionBodyList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBodyList.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.TransactionBodyList, index: number): CML.TransactionBody =>
  Effect.runSync(get(instance, index));

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
  (instance: CML.TransactionBodyList, elem: CML.TransactionBody): Effect.Effect<void, TransactionBodyListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new TransactionBodyListError({
          message: `TransactionBodyList.add failed with parameters: ${elem} (TransactionBody). `,
        }),
    })
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
 *   const result = TransactionBodyList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionBodyList.unsafeAdd failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (instance: CML.TransactionBodyList, elem: CML.TransactionBody): void =>
  Effect.runSync(add(instance, elem));

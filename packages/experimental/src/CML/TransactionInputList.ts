import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type TransactionInputList = CML.TransactionInputList;

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
 *   const result = TransactionInputList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInputList.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.TransactionInputList): void =>
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
 *   const result = TransactionInputList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInputList.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
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
 *   const result = TransactionInputList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInputList.unsafeLen failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.TransactionInputList): number =>
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
 *   const result = TransactionInputList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInputList.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.TransactionInputList, index: number): CML.TransactionInput =>
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
 *   const result = TransactionInputList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionInputList.unsafeAdd failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (instance: CML.TransactionInputList, elem: CML.TransactionInput): void =>
  Effect.runSync(add(instance, elem));

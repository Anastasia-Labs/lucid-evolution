import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type IntList = CML.IntList;

export class IntListError extends Data.TaggedError("IntListError")<{
  message?: string;
}> {}

/**
 * Method free of IntList
 * 
 * @example
 * import { IntList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a IntList instance
 * const instance = ... ;
 *   const result = yield* IntList.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.IntList): Effect.Effect<void, IntListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new IntListError({
          message: `IntList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { IntList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a IntList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = IntList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`IntList.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.IntList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of IntList
 * 
 * @example
 * import { IntList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* IntList._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.IntList.new(),
    catch: () => new IntListError({
      message: `IntList._new failed `,
    }),
  });
});

/**
 * Unsafely calls IntList._new without Effect wrapper
 * 
 * @example
 * import { IntList } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = IntList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`IntList.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

/**
 * Method len of IntList
 * 
 * @example
 * import { IntList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a IntList instance
 * const instance = ... ;
 *   const result = yield* IntList.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.IntList): Effect.Effect<number, IntListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new IntListError({
          message: `IntList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { IntList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a IntList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = IntList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`IntList.unsafeLen failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.IntList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of IntList
 * 
 * @example
 * import { IntList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a IntList instance
 * const instance = ... ;
 *   const result = yield* IntList.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.IntList, index: number): Effect.Effect<CML.Int, IntListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new IntListError({
          message: `IntList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { IntList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a IntList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = IntList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`IntList.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.IntList, index: number): CML.Int =>
  Effect.runSync(get(instance, index));

/**
 * Method add of IntList
 * 
 * @example
 * import { IntList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a IntList instance
 * const instance = ... ;
 *   const result = yield* IntList.add(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (instance: CML.IntList, elem: CML.Int): Effect.Effect<void, IntListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new IntListError({
          message: `IntList.add failed with parameters: ${elem} (Int). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @example
 * import { IntList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a IntList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = IntList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`IntList.unsafeAdd failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (instance: CML.IntList, elem: CML.Int): void =>
  Effect.runSync(add(instance, elem));

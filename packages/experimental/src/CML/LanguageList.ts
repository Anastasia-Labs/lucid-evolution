/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML LanguageList class
 *
 * @since 2.0.0
 * @category Types
 */
export type LanguageList = CML.LanguageList;

/**
 * Error class for LanguageList operations
 * 
 * This error is thrown when operations on LanguageList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class LanguageListError extends Data.TaggedError("LanguageListError")<{
  message?: string;
}> {}

/**
 * Method free of LanguageList
 * 
 * @example
 * import { LanguageList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LanguageList instance
 * const instance = ... ;
 *   const result = yield* LanguageList.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.LanguageList): Effect.Effect<void, LanguageListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new LanguageListError({
          message: `LanguageList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { LanguageList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LanguageList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LanguageList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LanguageList.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.LanguageList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of LanguageList
 * 
 * @example
 * import { LanguageList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* LanguageList._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.LanguageList.new(),
    catch: () => new LanguageListError({
      message: `LanguageList._new failed `,
    }),
  });
});

/**
 * Unsafely calls LanguageList._new without Effect wrapper
 * 
 * @example
 * import { LanguageList } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LanguageList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LanguageList._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () =>
  Effect.runSync(_new());

/**
 * Method len of LanguageList
 * 
 * @example
 * import { LanguageList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LanguageList instance
 * const instance = ... ;
 *   const result = yield* LanguageList.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.LanguageList): Effect.Effect<number, LanguageListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new LanguageListError({
          message: `LanguageList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { LanguageList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LanguageList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LanguageList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LanguageList.lenUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.LanguageList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of LanguageList
 * 
 * @example
 * import { LanguageList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LanguageList instance
 * const instance = ... ;
 *   const result = yield* LanguageList.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.LanguageList, index: number): Effect.Effect<CML.Language, LanguageListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new LanguageListError({
          message: `LanguageList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { LanguageList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LanguageList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LanguageList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LanguageList.getUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.LanguageList, index: number): CML.Language =>
  Effect.runSync(get(instance, index));

/**
 * Method add of LanguageList
 * 
 * @example
 * import { LanguageList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LanguageList instance
 * const instance = ... ;
 *   const result = yield* LanguageList.add(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (instance: CML.LanguageList, elem: CML.Language): Effect.Effect<void, LanguageListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new LanguageListError({
          message: `LanguageList.add failed with parameters: ${elem} (Language). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @example
 * import { LanguageList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LanguageList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LanguageList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LanguageList.addUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.LanguageList, elem: CML.Language): void =>
  Effect.runSync(add(instance, elem));

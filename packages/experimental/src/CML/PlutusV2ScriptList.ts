/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PlutusV2ScriptList class
 *
 * @since 2.0.0
 * @category Types
 */
export type PlutusV2ScriptList = CML.PlutusV2ScriptList;

/**
 * Error class for PlutusV2ScriptList operations
 * 
 * This error is thrown when operations on PlutusV2ScriptList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PlutusV2ScriptListError extends Data.TaggedError("PlutusV2ScriptListError")<{
  message?: string;
}> {}

/**
 * Method free of PlutusV2ScriptList
 * 
 * @example
 * import { PlutusV2ScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV2ScriptList instance
 * const instance = ... ;
 *   const result = yield* PlutusV2ScriptList.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PlutusV2ScriptList): Effect.Effect<void, PlutusV2ScriptListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusV2ScriptListError({
          message: `PlutusV2ScriptList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { PlutusV2ScriptList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV2ScriptList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2ScriptList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2ScriptList.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PlutusV2ScriptList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of PlutusV2ScriptList
 * 
 * @example
 * import { PlutusV2ScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PlutusV2ScriptList._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.PlutusV2ScriptList.new(),
    catch: () => new PlutusV2ScriptListError({
      message: `PlutusV2ScriptList._new failed `,
    }),
  });
});

/**
 * Unsafely calls PlutusV2ScriptList._new without Effect wrapper
 * 
 * @example
 * import { PlutusV2ScriptList } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2ScriptList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2ScriptList._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () =>
  Effect.runSync(_new());

/**
 * Method len of PlutusV2ScriptList
 * 
 * @example
 * import { PlutusV2ScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV2ScriptList instance
 * const instance = ... ;
 *   const result = yield* PlutusV2ScriptList.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.PlutusV2ScriptList): Effect.Effect<number, PlutusV2ScriptListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new PlutusV2ScriptListError({
          message: `PlutusV2ScriptList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { PlutusV2ScriptList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV2ScriptList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2ScriptList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2ScriptList.lenUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.PlutusV2ScriptList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of PlutusV2ScriptList
 * 
 * @example
 * import { PlutusV2ScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV2ScriptList instance
 * const instance = ... ;
 *   const result = yield* PlutusV2ScriptList.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.PlutusV2ScriptList, index: number): Effect.Effect<CML.PlutusV2Script, PlutusV2ScriptListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new PlutusV2ScriptListError({
          message: `PlutusV2ScriptList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { PlutusV2ScriptList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV2ScriptList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2ScriptList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2ScriptList.getUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.PlutusV2ScriptList, index: number): CML.PlutusV2Script =>
  Effect.runSync(get(instance, index));

/**
 * Method add of PlutusV2ScriptList
 * 
 * @example
 * import { PlutusV2ScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV2ScriptList instance
 * const instance = ... ;
 *   const result = yield* PlutusV2ScriptList.add(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (instance: CML.PlutusV2ScriptList, elem: CML.PlutusV2Script): Effect.Effect<void, PlutusV2ScriptListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new PlutusV2ScriptListError({
          message: `PlutusV2ScriptList.add failed with parameters: ${elem} (PlutusV2Script). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @example
 * import { PlutusV2ScriptList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV2ScriptList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2ScriptList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2ScriptList.addUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.PlutusV2ScriptList, elem: CML.PlutusV2Script): void =>
  Effect.runSync(add(instance, elem));

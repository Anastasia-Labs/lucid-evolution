import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type PlutusV1ScriptList = CML.PlutusV1ScriptList;

export class PlutusV1ScriptListError extends Data.TaggedError("PlutusV1ScriptListError")<{
  message?: string;
}> {}

/**
 * Method free of PlutusV1ScriptList
 * 
 * @example
 * import { PlutusV1ScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV1ScriptList instance
 * const instance = ... ;
 *   const result = yield* PlutusV1ScriptList.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PlutusV1ScriptList): Effect.Effect<void, PlutusV1ScriptListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusV1ScriptListError({
          message: `PlutusV1ScriptList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { PlutusV1ScriptList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV1ScriptList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1ScriptList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1ScriptList.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.PlutusV1ScriptList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of PlutusV1ScriptList
 * 
 * @example
 * import { PlutusV1ScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PlutusV1ScriptList._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.PlutusV1ScriptList.new(),
    catch: () => new PlutusV1ScriptListError({
      message: `PlutusV1ScriptList._new failed `,
    }),
  });
});

/**
 * Unsafely calls PlutusV1ScriptList._new without Effect wrapper
 * 
 * @example
 * import { PlutusV1ScriptList } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1ScriptList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1ScriptList.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

/**
 * Method len of PlutusV1ScriptList
 * 
 * @example
 * import { PlutusV1ScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV1ScriptList instance
 * const instance = ... ;
 *   const result = yield* PlutusV1ScriptList.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.PlutusV1ScriptList): Effect.Effect<number, PlutusV1ScriptListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new PlutusV1ScriptListError({
          message: `PlutusV1ScriptList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { PlutusV1ScriptList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV1ScriptList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1ScriptList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1ScriptList.unsafeLen failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.PlutusV1ScriptList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of PlutusV1ScriptList
 * 
 * @example
 * import { PlutusV1ScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV1ScriptList instance
 * const instance = ... ;
 *   const result = yield* PlutusV1ScriptList.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.PlutusV1ScriptList, index: number): Effect.Effect<CML.PlutusV1Script, PlutusV1ScriptListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new PlutusV1ScriptListError({
          message: `PlutusV1ScriptList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { PlutusV1ScriptList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV1ScriptList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1ScriptList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1ScriptList.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.PlutusV1ScriptList, index: number): CML.PlutusV1Script =>
  Effect.runSync(get(instance, index));

/**
 * Method add of PlutusV1ScriptList
 * 
 * @example
 * import { PlutusV1ScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV1ScriptList instance
 * const instance = ... ;
 *   const result = yield* PlutusV1ScriptList.add(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (instance: CML.PlutusV1ScriptList, elem: CML.PlutusV1Script): Effect.Effect<void, PlutusV1ScriptListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new PlutusV1ScriptListError({
          message: `PlutusV1ScriptList.add failed with parameters: ${elem} (PlutusV1Script). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @example
 * import { PlutusV1ScriptList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV1ScriptList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1ScriptList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1ScriptList.unsafeAdd failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (instance: CML.PlutusV1ScriptList, elem: CML.PlutusV1Script): void =>
  Effect.runSync(add(instance, elem));

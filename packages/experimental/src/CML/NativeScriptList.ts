/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML NativeScriptList class
 *
 * @since 2.0.0
 * @category Types
 */
export type NativeScriptList = CML.NativeScriptList;

/**
 * Error class for NativeScriptList operations
 * 
 * This error is thrown when operations on NativeScriptList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class NativeScriptListError extends Data.TaggedError("NativeScriptListError")<{
  message?: string;
}> {}

/**
 * Method free of NativeScriptList
 * 
 * @example
 * import { NativeScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScriptList instance
 * const instance = ... ;
 *   const result = yield* NativeScriptList.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.NativeScriptList): Effect.Effect<void, NativeScriptListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new NativeScriptListError({
          message: `NativeScriptList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { NativeScriptList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NativeScriptList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScriptList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScriptList.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.NativeScriptList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of NativeScriptList
 * 
 * @example
 * import { NativeScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* NativeScriptList._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.NativeScriptList.new(),
    catch: () => new NativeScriptListError({
      message: `NativeScriptList._new failed `,
    }),
  });
});

/**
 * Unsafely calls NativeScriptList._new without Effect wrapper
 * 
 * @example
 * import { NativeScriptList } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScriptList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScriptList._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () =>
  Effect.runSync(_new());

/**
 * Method len of NativeScriptList
 * 
 * @example
 * import { NativeScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScriptList instance
 * const instance = ... ;
 *   const result = yield* NativeScriptList.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.NativeScriptList): Effect.Effect<number, NativeScriptListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new NativeScriptListError({
          message: `NativeScriptList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { NativeScriptList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NativeScriptList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScriptList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScriptList.lenUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.NativeScriptList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of NativeScriptList
 * 
 * @example
 * import { NativeScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScriptList instance
 * const instance = ... ;
 *   const result = yield* NativeScriptList.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.NativeScriptList, index: number): Effect.Effect<CML.NativeScript, NativeScriptListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new NativeScriptListError({
          message: `NativeScriptList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { NativeScriptList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NativeScriptList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScriptList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScriptList.getUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.NativeScriptList, index: number): CML.NativeScript =>
  Effect.runSync(get(instance, index));

/**
 * Method add of NativeScriptList
 * 
 * @example
 * import { NativeScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a NativeScriptList instance
 * const instance = ... ;
 *   const result = yield* NativeScriptList.add(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (instance: CML.NativeScriptList, elem: CML.NativeScript): Effect.Effect<void, NativeScriptListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new NativeScriptListError({
          message: `NativeScriptList.add failed with parameters: ${elem} (NativeScript). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @example
 * import { NativeScriptList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a NativeScriptList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = NativeScriptList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`NativeScriptList.addUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.NativeScriptList, elem: CML.NativeScript): void =>
  Effect.runSync(add(instance, elem));

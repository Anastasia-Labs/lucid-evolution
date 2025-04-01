/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML AssetNameList class
 *
 * @since 2.0.0
 * @category Types
 */
export type AssetNameList = CML.AssetNameList;

/**
 * Error class for AssetNameList operations
 *
 * This error is thrown when operations on AssetNameList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class AssetNameListError extends Data.TaggedError("AssetNameListError")<{
  message?: string;
}> {}

/**
 * Method free of AssetNameList
 *
 * @example
 * import { AssetNameList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AssetNameList instance
 * const instance = ... ;
 *   const result = yield* AssetNameList.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.AssetNameList): Effect.Effect<void, AssetNameListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new AssetNameListError({
          message: `AssetNameList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { AssetNameList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AssetNameList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AssetNameList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetNameList.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.AssetNameList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of AssetNameList
 *
 * @example
 * import { AssetNameList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AssetNameList._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.AssetNameList.new(),
    catch: () =>
      new AssetNameListError({
        message: `AssetNameList._new failed `,
      }),
  });
});

/**
 * Unsafely calls AssetNameList._new without Effect wrapper
 *
 * @example
 * import { AssetNameList } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AssetNameList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetNameList._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () => Effect.runSync(_new());

/**
 * Method len of AssetNameList
 *
 * @example
 * import { AssetNameList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AssetNameList instance
 * const instance = ... ;
 *   const result = yield* AssetNameList.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.AssetNameList): Effect.Effect<number, AssetNameListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new AssetNameListError({
          message: `AssetNameList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { AssetNameList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AssetNameList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AssetNameList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetNameList.lenUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.AssetNameList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of AssetNameList
 *
 * @example
 * import { AssetNameList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AssetNameList instance
 * const instance = ... ;
 *   const result = yield* AssetNameList.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.AssetNameList,
    index: number,
  ): Effect.Effect<CML.AssetName, AssetNameListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new AssetNameListError({
          message: `AssetNameList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { AssetNameList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AssetNameList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AssetNameList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetNameList.getUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.AssetNameList,
  index: number,
): CML.AssetName => Effect.runSync(get(instance, index));

/**
 * Method add of AssetNameList
 *
 * @example
 * import { AssetNameList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AssetNameList instance
 * const instance = ... ;
 *   const result = yield* AssetNameList.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.AssetNameList,
    elem: CML.AssetName,
  ): Effect.Effect<void, AssetNameListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new AssetNameListError({
          message: `AssetNameList.add failed with parameters: ${elem} (AssetName). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { AssetNameList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AssetNameList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AssetNameList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AssetNameList.addUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (
  instance: CML.AssetNameList,
  elem: CML.AssetName,
): void => Effect.runSync(add(instance, elem));

import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type PlutusDataList = CML.PlutusDataList;

export class PlutusDataListError extends Data.TaggedError(
  "PlutusDataListError",
)<{
  message?: string;
}> {}

/**
 * Method free of PlutusDataList
 *
 * @example
 * import { PlutusDataList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusDataList instance
 * const instance = ... ;
 *   const result = yield* PlutusDataList.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PlutusDataList): Effect.Effect<void, PlutusDataListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusDataListError({
          message: `PlutusDataList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { PlutusDataList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusDataList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusDataList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusDataList.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.PlutusDataList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of PlutusDataList
 *
 * @example
 * import { PlutusDataList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusDataList._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.PlutusDataList.new(),
    catch: () =>
      new PlutusDataListError({
        message: `PlutusDataList._new failed `,
      }),
  });
});

/**
 * Unsafely calls PlutusDataList._new without Effect wrapper
 *
 * @example
 * import { PlutusDataList } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusDataList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusDataList.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method len of PlutusDataList
 *
 * @example
 * import { PlutusDataList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusDataList instance
 * const instance = ... ;
 *   const result = yield* PlutusDataList.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.PlutusDataList): Effect.Effect<number, PlutusDataListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new PlutusDataListError({
          message: `PlutusDataList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { PlutusDataList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusDataList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusDataList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusDataList.unsafeLen failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.PlutusDataList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of PlutusDataList
 *
 * @example
 * import { PlutusDataList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusDataList instance
 * const instance = ... ;
 *   const result = yield* PlutusDataList.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.PlutusDataList,
    index: number,
  ): Effect.Effect<CML.PlutusData, PlutusDataListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new PlutusDataListError({
          message: `PlutusDataList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { PlutusDataList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusDataList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusDataList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusDataList.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (
  instance: CML.PlutusDataList,
  index: number,
): CML.PlutusData => Effect.runSync(get(instance, index));

/**
 * Method add of PlutusDataList
 *
 * @example
 * import { PlutusDataList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusDataList instance
 * const instance = ... ;
 *   const result = yield* PlutusDataList.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.PlutusDataList,
    elem: CML.PlutusData,
  ): Effect.Effect<void, PlutusDataListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new PlutusDataListError({
          message: `PlutusDataList.add failed with parameters: ${elem} (PlutusData). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { PlutusDataList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusDataList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusDataList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusDataList.unsafeAdd failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (
  instance: CML.PlutusDataList,
  elem: CML.PlutusData,
): void => Effect.runSync(add(instance, elem));

import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type PlutusV3ScriptList = CML.PlutusV3ScriptList;

export class PlutusV3ScriptListError extends Data.TaggedError(
  "PlutusV3ScriptListError",
)<{
  message?: string;
}> {}

/**
 * Method free of PlutusV3ScriptList
 *
 * @example
 * import { PlutusV3ScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV3ScriptList instance
 * const instance = ... ;
 *   const result = yield* PlutusV3ScriptList.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.PlutusV3ScriptList,
  ): Effect.Effect<void, PlutusV3ScriptListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusV3ScriptListError({
          message: `PlutusV3ScriptList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { PlutusV3ScriptList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV3ScriptList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3ScriptList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3ScriptList.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.PlutusV3ScriptList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of PlutusV3ScriptList
 *
 * @example
 * import { PlutusV3ScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusV3ScriptList._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.PlutusV3ScriptList.new(),
    catch: () =>
      new PlutusV3ScriptListError({
        message: `PlutusV3ScriptList._new failed `,
      }),
  });
});

/**
 * Unsafely calls PlutusV3ScriptList._new without Effect wrapper
 *
 * @example
 * import { PlutusV3ScriptList } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3ScriptList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3ScriptList.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method len of PlutusV3ScriptList
 *
 * @example
 * import { PlutusV3ScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV3ScriptList instance
 * const instance = ... ;
 *   const result = yield* PlutusV3ScriptList.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.PlutusV3ScriptList,
  ): Effect.Effect<number, PlutusV3ScriptListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new PlutusV3ScriptListError({
          message: `PlutusV3ScriptList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { PlutusV3ScriptList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV3ScriptList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3ScriptList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3ScriptList.unsafeLen failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.PlutusV3ScriptList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of PlutusV3ScriptList
 *
 * @example
 * import { PlutusV3ScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV3ScriptList instance
 * const instance = ... ;
 *   const result = yield* PlutusV3ScriptList.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.PlutusV3ScriptList,
    index: number,
  ): Effect.Effect<CML.PlutusV3Script, PlutusV3ScriptListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new PlutusV3ScriptListError({
          message: `PlutusV3ScriptList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { PlutusV3ScriptList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV3ScriptList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3ScriptList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3ScriptList.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (
  instance: CML.PlutusV3ScriptList,
  index: number,
): CML.PlutusV3Script => Effect.runSync(get(instance, index));

/**
 * Method add of PlutusV3ScriptList
 *
 * @example
 * import { PlutusV3ScriptList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV3ScriptList instance
 * const instance = ... ;
 *   const result = yield* PlutusV3ScriptList.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.PlutusV3ScriptList,
    elem: CML.PlutusV3Script,
  ): Effect.Effect<void, PlutusV3ScriptListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new PlutusV3ScriptListError({
          message: `PlutusV3ScriptList.add failed with parameters: ${elem} (PlutusV3Script). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { PlutusV3ScriptList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV3ScriptList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3ScriptList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3ScriptList.unsafeAdd failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (
  instance: CML.PlutusV3ScriptList,
  elem: CML.PlutusV3Script,
): void => Effect.runSync(add(instance, elem));

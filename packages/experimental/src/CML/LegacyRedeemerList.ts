/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML LegacyRedeemerList class
 *
 * @since 2.0.0
 * @category Types
 */
export type LegacyRedeemerList = CML.LegacyRedeemerList;

/**
 * Error class for LegacyRedeemerList operations
 *
 * This error is thrown when operations on LegacyRedeemerList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class LegacyRedeemerListError extends Data.TaggedError(
  "LegacyRedeemerListError",
)<{
  message?: string;
}> {}

/**
 * Method free of LegacyRedeemerList
 *
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemerList instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemerList.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.LegacyRedeemerList,
  ): Effect.Effect<void, LegacyRedeemerListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new LegacyRedeemerListError({
          message: `LegacyRedeemerList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a LegacyRedeemerList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemerList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemerList.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.LegacyRedeemerList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of LegacyRedeemerList
 *
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* LegacyRedeemerList._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.LegacyRedeemerList.new(),
    catch: () =>
      new LegacyRedeemerListError({
        message: `LegacyRedeemerList._new failed `,
      }),
  });
});

/**
 * Unsafely calls LegacyRedeemerList._new without Effect wrapper
 *
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemerList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemerList._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () => Effect.runSync(_new());

/**
 * Method len of LegacyRedeemerList
 *
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemerList instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemerList.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.LegacyRedeemerList,
  ): Effect.Effect<number, LegacyRedeemerListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new LegacyRedeemerListError({
          message: `LegacyRedeemerList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a LegacyRedeemerList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemerList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemerList.lenUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.LegacyRedeemerList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of LegacyRedeemerList
 *
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemerList instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemerList.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.LegacyRedeemerList,
    index: number,
  ): Effect.Effect<CML.LegacyRedeemer, LegacyRedeemerListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new LegacyRedeemerListError({
          message: `LegacyRedeemerList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a LegacyRedeemerList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemerList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemerList.getUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.LegacyRedeemerList,
  index: number,
): CML.LegacyRedeemer => Effect.runSync(get(instance, index));

/**
 * Method add of LegacyRedeemerList
 *
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemerList instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemerList.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.LegacyRedeemerList,
    elem: CML.LegacyRedeemer,
  ): Effect.Effect<void, LegacyRedeemerListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new LegacyRedeemerListError({
          message: `LegacyRedeemerList.add failed with parameters: ${elem} (LegacyRedeemer). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a LegacyRedeemerList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemerList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemerList.addUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (
  instance: CML.LegacyRedeemerList,
  elem: CML.LegacyRedeemer,
): void => Effect.runSync(add(instance, elem));

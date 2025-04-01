/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML RewardAccountList class
 *
 * @since 2.0.0
 * @category Types
 */
export type RewardAccountList = CML.RewardAccountList;

/**
 * Error class for RewardAccountList operations
 *
 * This error is thrown when operations on RewardAccountList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class RewardAccountListError extends Data.TaggedError(
  "RewardAccountListError",
)<{
  message?: string;
}> {}

/**
 * Method free of RewardAccountList
 *
 * @example
 * import { RewardAccountList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RewardAccountList instance
 * const instance = ... ;
 *   const result = yield* RewardAccountList.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.RewardAccountList,
  ): Effect.Effect<void, RewardAccountListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RewardAccountListError({
          message: `RewardAccountList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { RewardAccountList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RewardAccountList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RewardAccountList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAccountList.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.RewardAccountList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of RewardAccountList
 *
 * @example
 * import { RewardAccountList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* RewardAccountList._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.RewardAccountList.new(),
    catch: () =>
      new RewardAccountListError({
        message: `RewardAccountList._new failed `,
      }),
  });
});

/**
 * Unsafely calls RewardAccountList._new without Effect wrapper
 *
 * @example
 * import { RewardAccountList } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RewardAccountList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAccountList._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () => Effect.runSync(_new());

/**
 * Method len of RewardAccountList
 *
 * @example
 * import { RewardAccountList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RewardAccountList instance
 * const instance = ... ;
 *   const result = yield* RewardAccountList.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.RewardAccountList,
  ): Effect.Effect<number, RewardAccountListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new RewardAccountListError({
          message: `RewardAccountList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { RewardAccountList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RewardAccountList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RewardAccountList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAccountList.lenUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.RewardAccountList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of RewardAccountList
 *
 * @example
 * import { RewardAccountList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RewardAccountList instance
 * const instance = ... ;
 *   const result = yield* RewardAccountList.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.RewardAccountList,
    index: number,
  ): Effect.Effect<CML.RewardAddress, RewardAccountListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new RewardAccountListError({
          message: `RewardAccountList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { RewardAccountList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RewardAccountList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RewardAccountList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAccountList.getUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.RewardAccountList,
  index: number,
): CML.RewardAddress => Effect.runSync(get(instance, index));

/**
 * Method add of RewardAccountList
 *
 * @example
 * import { RewardAccountList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RewardAccountList instance
 * const instance = ... ;
 *   const result = yield* RewardAccountList.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.RewardAccountList,
    elem: CML.RewardAddress,
  ): Effect.Effect<void, RewardAccountListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new RewardAccountListError({
          message: `RewardAccountList.add failed with parameters: ${elem} (RewardAddress). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { RewardAccountList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a RewardAccountList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = RewardAccountList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAccountList.addUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (
  instance: CML.RewardAccountList,
  elem: CML.RewardAddress,
): void => Effect.runSync(add(instance, elem));

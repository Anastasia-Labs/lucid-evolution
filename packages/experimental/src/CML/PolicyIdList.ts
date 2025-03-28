import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type PolicyIdList = CML.PolicyIdList;

export class PolicyIdListError extends Data.TaggedError("PolicyIdListError")<{
  message?: string;
}> {}

/**
 * Method free of PolicyIdList
 *
 * @example
 * import { PolicyIdList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PolicyIdList instance
 * const instance = ... ;
 *   const result = yield* PolicyIdList.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PolicyIdList): Effect.Effect<void, PolicyIdListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PolicyIdListError({
          message: `PolicyIdList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { PolicyIdList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PolicyIdList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PolicyIdList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PolicyIdList.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.PolicyIdList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of PolicyIdList
 *
 * @example
 * import { PolicyIdList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PolicyIdList._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.PolicyIdList.new(),
    catch: () =>
      new PolicyIdListError({
        message: `PolicyIdList._new failed `,
      }),
  });
});

/**
 * Unsafely calls PolicyIdList._new without Effect wrapper
 *
 * @example
 * import { PolicyIdList } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PolicyIdList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PolicyIdList.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method len of PolicyIdList
 *
 * @example
 * import { PolicyIdList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PolicyIdList instance
 * const instance = ... ;
 *   const result = yield* PolicyIdList.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.PolicyIdList): Effect.Effect<number, PolicyIdListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new PolicyIdListError({
          message: `PolicyIdList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { PolicyIdList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PolicyIdList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PolicyIdList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PolicyIdList.unsafeLen failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.PolicyIdList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of PolicyIdList
 *
 * @example
 * import { PolicyIdList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PolicyIdList instance
 * const instance = ... ;
 *   const result = yield* PolicyIdList.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.PolicyIdList,
    index: number,
  ): Effect.Effect<CML.ScriptHash, PolicyIdListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new PolicyIdListError({
          message: `PolicyIdList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { PolicyIdList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PolicyIdList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PolicyIdList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PolicyIdList.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (
  instance: CML.PolicyIdList,
  index: number,
): CML.ScriptHash => Effect.runSync(get(instance, index));

/**
 * Method add of PolicyIdList
 *
 * @example
 * import { PolicyIdList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PolicyIdList instance
 * const instance = ... ;
 *   const result = yield* PolicyIdList.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.PolicyIdList,
    elem: CML.ScriptHash,
  ): Effect.Effect<void, PolicyIdListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new PolicyIdListError({
          message: `PolicyIdList.add failed with parameters: ${elem} (ScriptHash). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { PolicyIdList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PolicyIdList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PolicyIdList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PolicyIdList.unsafeAdd failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (
  instance: CML.PolicyIdList,
  elem: CML.ScriptHash,
): void => Effect.runSync(add(instance, elem));

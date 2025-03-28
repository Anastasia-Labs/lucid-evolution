import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type RewardAccountList = CML.RewardAccountList;

export class RewardAccountListError extends Data.TaggedError("RewardAccountListError")<{
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
  (instance: CML.RewardAccountList): Effect.Effect<void, RewardAccountListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RewardAccountListError({
          message: `RewardAccountList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
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
 *   const result = RewardAccountList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAccountList.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.RewardAccountList): void =>
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
    catch: () => new RewardAccountListError({
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
 *   const result = RewardAccountList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAccountList.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

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
  (instance: CML.RewardAccountList): Effect.Effect<number, RewardAccountListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new RewardAccountListError({
          message: `RewardAccountList.len failed `,
        }),
    })
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
 *   const result = RewardAccountList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAccountList.unsafeLen failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.RewardAccountList): number =>
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
  (instance: CML.RewardAccountList, index: number): Effect.Effect<CML.RewardAddress, RewardAccountListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new RewardAccountListError({
          message: `RewardAccountList.get failed with parameters: ${index}. `,
        }),
    })
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
 *   const result = RewardAccountList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAccountList.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.RewardAccountList, index: number): CML.RewardAddress =>
  Effect.runSync(get(instance, index));

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
  (instance: CML.RewardAccountList, elem: CML.RewardAddress): Effect.Effect<void, RewardAccountListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new RewardAccountListError({
          message: `RewardAccountList.add failed with parameters: ${elem} (RewardAddress). `,
        }),
    })
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
 *   const result = RewardAccountList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RewardAccountList.unsafeAdd failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (instance: CML.RewardAccountList, elem: CML.RewardAddress): void =>
  Effect.runSync(add(instance, elem));

import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type CIP36DelegationList = CML.CIP36DelegationList;

export class CIP36DelegationListError extends Data.TaggedError(
  "CIP36DelegationListError",
)<{
  message?: string;
}> {}

/**
 * Method free of CIP36DelegationList
 *
 * @example
 * import { CIP36DelegationList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DelegationList instance
 * const instance = ... ;
 *   const result = yield* CIP36DelegationList.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.CIP36DelegationList,
  ): Effect.Effect<void, CIP36DelegationListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP36DelegationListError({
          message: `CIP36DelegationList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { CIP36DelegationList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36DelegationList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationList.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.CIP36DelegationList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of CIP36DelegationList
 *
 * @example
 * import { CIP36DelegationList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP36DelegationList._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.CIP36DelegationList.new(),
    catch: () =>
      new CIP36DelegationListError({
        message: `CIP36DelegationList._new failed `,
      }),
  });
});

/**
 * Unsafely calls CIP36DelegationList._new without Effect wrapper
 *
 * @example
 * import { CIP36DelegationList } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationList.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method len of CIP36DelegationList
 *
 * @example
 * import { CIP36DelegationList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DelegationList instance
 * const instance = ... ;
 *   const result = yield* CIP36DelegationList.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.CIP36DelegationList,
  ): Effect.Effect<number, CIP36DelegationListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new CIP36DelegationListError({
          message: `CIP36DelegationList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { CIP36DelegationList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36DelegationList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationList.unsafeLen failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.CIP36DelegationList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of CIP36DelegationList
 *
 * @example
 * import { CIP36DelegationList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DelegationList instance
 * const instance = ... ;
 *   const result = yield* CIP36DelegationList.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.CIP36DelegationList,
    index: number,
  ): Effect.Effect<CML.CIP36Delegation, CIP36DelegationListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new CIP36DelegationListError({
          message: `CIP36DelegationList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { CIP36DelegationList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36DelegationList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationList.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (
  instance: CML.CIP36DelegationList,
  index: number,
): CML.CIP36Delegation => Effect.runSync(get(instance, index));

/**
 * Method add of CIP36DelegationList
 *
 * @example
 * import { CIP36DelegationList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DelegationList instance
 * const instance = ... ;
 *   const result = yield* CIP36DelegationList.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.CIP36DelegationList,
    elem: CML.CIP36Delegation,
  ): Effect.Effect<void, CIP36DelegationListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new CIP36DelegationListError({
          message: `CIP36DelegationList.add failed with parameters: ${elem} (CIP36Delegation). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { CIP36DelegationList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36DelegationList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DelegationList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationList.unsafeAdd failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (
  instance: CML.CIP36DelegationList,
  elem: CML.CIP36Delegation,
): void => Effect.runSync(add(instance, elem));

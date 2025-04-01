/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP36DelegationList class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP36DelegationList = CML.CIP36DelegationList;

/**
 * Error class for CIP36DelegationList operations
 *
 * This error is thrown when operations on CIP36DelegationList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
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
 *   const result = CIP36DelegationList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationList.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP36DelegationList): void =>
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
 *   const result = CIP36DelegationList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationList._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () => Effect.runSync(_new());

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
 *   const result = CIP36DelegationList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationList.lenUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.CIP36DelegationList): number =>
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
 *   const result = CIP36DelegationList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationList.getUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
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
 *   const result = CIP36DelegationList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DelegationList.addUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (
  instance: CML.CIP36DelegationList,
  elem: CML.CIP36Delegation,
): void => Effect.runSync(add(instance, elem));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PolicyIdList class
 *
 * @since 2.0.0
 * @category Types
 */
export type PolicyIdList = CML.PolicyIdList;

/**
 * Error class for PolicyIdList operations
 *
 * This error is thrown when operations on PolicyIdList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PolicyIdListError extends Data.TaggedError("PolicyIdListError")<{
  message?: string;
}> {}

/**
 * Method free of PolicyIdList
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.PolicyIdList,
) => Effect.Effect<void, PolicyIdListError> = Effect.fn(
  (instance: CML.PolicyIdList) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PolicyIdList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of PolicyIdList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.PolicyIdList, PolicyIdListError> =
  Effect.fn(function* () {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.PolicyIdList => Effect.runSync(_new());

/**
 * Method len of PolicyIdList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.PolicyIdList,
) => Effect.Effect<number, PolicyIdListError> = Effect.fn(
  (instance: CML.PolicyIdList) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.PolicyIdList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of PolicyIdList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.PolicyIdList,
  index: number,
) => Effect.Effect<CML.ScriptHash, PolicyIdListError> = Effect.fn(
  (instance: CML.PolicyIdList, index: number) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.PolicyIdList,
  index: number,
): CML.ScriptHash => Effect.runSync(get(instance, index));

/**
 * Method add of PolicyIdList
 *
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.PolicyIdList,
  elem: CML.ScriptHash,
) => Effect.Effect<void, PolicyIdListError> = Effect.fn(
  (instance: CML.PolicyIdList, elem: CML.ScriptHash) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (
  instance: CML.PolicyIdList,
  elem: CML.ScriptHash,
): void => Effect.runSync(add(instance, elem));

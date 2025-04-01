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
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.RewardAccountList,
) => Effect.Effect<void, RewardAccountListError> = Effect.fn(
  (instance: CML.RewardAccountList) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.RewardAccountList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of RewardAccountList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.RewardAccountList,
  RewardAccountListError
> = Effect.fn(function* () {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.RewardAccountList => Effect.runSync(_new());

/**
 * Method len of RewardAccountList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.RewardAccountList,
) => Effect.Effect<number, RewardAccountListError> = Effect.fn(
  (instance: CML.RewardAccountList) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.RewardAccountList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of RewardAccountList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.RewardAccountList,
  index: number,
) => Effect.Effect<CML.RewardAddress, RewardAccountListError> = Effect.fn(
  (instance: CML.RewardAccountList, index: number) =>
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
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.RewardAccountList,
  elem: CML.RewardAddress,
) => Effect.Effect<void, RewardAccountListError> = Effect.fn(
  (instance: CML.RewardAccountList, elem: CML.RewardAddress) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (
  instance: CML.RewardAccountList,
  elem: CML.RewardAddress,
): void => Effect.runSync(add(instance, elem));

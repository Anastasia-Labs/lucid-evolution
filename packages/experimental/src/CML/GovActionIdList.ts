/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML GovActionIdList class
 *
 * @since 2.0.0
 * @category Types
 */
export type GovActionIdList = CML.GovActionIdList;

/**
 * Error class for GovActionIdList operations
 *
 * This error is thrown when operations on GovActionIdList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class GovActionIdListError extends Data.TaggedError(
  "GovActionIdListError",
)<{
  message?: string;
}> {}

/**
 * Method free of GovActionIdList
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.GovActionIdList,
) => Effect.Effect<void, GovActionIdListError> = Effect.fn(
  (instance: CML.GovActionIdList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new GovActionIdListError({
          message: `GovActionIdList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.GovActionIdList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of GovActionIdList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.GovActionIdList,
  GovActionIdListError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.GovActionIdList.new(),
    catch: () =>
      new GovActionIdListError({
        message: `GovActionIdList._new failed `,
      }),
  });
});

/**
 * Unsafely calls GovActionIdList._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.GovActionIdList => Effect.runSync(_new());

/**
 * Method len of GovActionIdList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.GovActionIdList,
) => Effect.Effect<number, GovActionIdListError> = Effect.fn(
  (instance: CML.GovActionIdList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new GovActionIdListError({
          message: `GovActionIdList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.GovActionIdList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of GovActionIdList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.GovActionIdList,
  index: number,
) => Effect.Effect<CML.GovActionId, GovActionIdListError> = Effect.fn(
  (instance: CML.GovActionIdList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new GovActionIdListError({
          message: `GovActionIdList.get failed with parameters: ${index}. `,
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
  instance: CML.GovActionIdList,
  index: number,
): CML.GovActionId => Effect.runSync(get(instance, index));

/**
 * Method add of GovActionIdList
 *
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.GovActionIdList,
  elem: CML.GovActionId,
) => Effect.Effect<void, GovActionIdListError> = Effect.fn(
  (instance: CML.GovActionIdList, elem: CML.GovActionId) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new GovActionIdListError({
          message: `GovActionIdList.add failed with parameters: ${elem} (GovActionId). `,
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
  instance: CML.GovActionIdList,
  elem: CML.GovActionId,
): void => Effect.runSync(add(instance, elem));

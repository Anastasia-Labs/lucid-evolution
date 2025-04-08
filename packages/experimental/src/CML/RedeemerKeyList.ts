/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML RedeemerKeyList class
 *
 * @since 2.0.0
 * @category Types
 */
export type RedeemerKeyList = CML.RedeemerKeyList;

/**
 * Error class for RedeemerKeyList operations
 *
 * This error is thrown when operations on RedeemerKeyList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class RedeemerKeyListError extends Data.TaggedError(
  "RedeemerKeyListError",
)<{
  message?: string;
}> {}

/**
 * Method free of RedeemerKeyList
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.RedeemerKeyList,
) => Effect.Effect<void, RedeemerKeyListError> = Effect.fn(
  (instance: CML.RedeemerKeyList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RedeemerKeyListError({
          message: `RedeemerKeyList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.RedeemerKeyList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of RedeemerKeyList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.RedeemerKeyList,
  RedeemerKeyListError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.RedeemerKeyList.new(),
    catch: () =>
      new RedeemerKeyListError({
        message: `RedeemerKeyList._new failed `,
      }),
  });
});

/**
 * Unsafely calls RedeemerKeyList._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.RedeemerKeyList => Effect.runSync(_new());

/**
 * Method len of RedeemerKeyList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.RedeemerKeyList,
) => Effect.Effect<number, RedeemerKeyListError> = Effect.fn(
  (instance: CML.RedeemerKeyList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new RedeemerKeyListError({
          message: `RedeemerKeyList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.RedeemerKeyList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of RedeemerKeyList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.RedeemerKeyList,
  index: number,
) => Effect.Effect<CML.RedeemerKey, RedeemerKeyListError> = Effect.fn(
  (instance: CML.RedeemerKeyList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new RedeemerKeyListError({
          message: `RedeemerKeyList.get failed with parameters: ${index}. `,
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
  instance: CML.RedeemerKeyList,
  index: number,
): CML.RedeemerKey => Effect.runSync(get(instance, index));

/**
 * Method add of RedeemerKeyList
 *
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.RedeemerKeyList,
  elem: CML.RedeemerKey,
) => Effect.Effect<void, RedeemerKeyListError> = Effect.fn(
  (instance: CML.RedeemerKeyList, elem: CML.RedeemerKey) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new RedeemerKeyListError({
          message: `RedeemerKeyList.add failed with parameters: ${elem} (RedeemerKey). `,
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
  instance: CML.RedeemerKeyList,
  elem: CML.RedeemerKey,
): void => Effect.runSync(add(instance, elem));

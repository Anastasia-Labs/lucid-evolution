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
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.LegacyRedeemerList,
) => Effect.Effect<void, LegacyRedeemerListError> = Effect.fn(
  (instance: CML.LegacyRedeemerList) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.LegacyRedeemerList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of LegacyRedeemerList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.LegacyRedeemerList,
  LegacyRedeemerListError
> = Effect.fn(function* () {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.LegacyRedeemerList => Effect.runSync(_new());

/**
 * Method len of LegacyRedeemerList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.LegacyRedeemerList,
) => Effect.Effect<number, LegacyRedeemerListError> = Effect.fn(
  (instance: CML.LegacyRedeemerList) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.LegacyRedeemerList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of LegacyRedeemerList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.LegacyRedeemerList,
  index: number,
) => Effect.Effect<CML.LegacyRedeemer, LegacyRedeemerListError> = Effect.fn(
  (instance: CML.LegacyRedeemerList, index: number) =>
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
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.LegacyRedeemerList,
  elem: CML.LegacyRedeemer,
) => Effect.Effect<void, LegacyRedeemerListError> = Effect.fn(
  (instance: CML.LegacyRedeemerList, elem: CML.LegacyRedeemer) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (
  instance: CML.LegacyRedeemerList,
  elem: CML.LegacyRedeemer,
): void => Effect.runSync(add(instance, elem));

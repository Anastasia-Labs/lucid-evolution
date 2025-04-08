/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML IntList class
 *
 * @since 2.0.0
 * @category Types
 */
export type IntList = CML.IntList;

/**
 * Error class for IntList operations
 *
 * This error is thrown when operations on IntList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class IntListError extends Data.TaggedError("IntListError")<{
  message?: string;
}> {}

/**
 * Method free of IntList
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.IntList,
) => Effect.Effect<void, IntListError> = Effect.fn((instance: CML.IntList) =>
  Effect.try({
    try: () => instance.free(),
    catch: () =>
      new IntListError({
        message: `IntList.free failed Hint: Check if you're calling free() more than once.`,
      }),
  }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.IntList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of IntList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.IntList, IntListError> = Effect.fn(
  function* () {
    return yield* Effect.try({
      try: () => CML.IntList.new(),
      catch: () =>
        new IntListError({
          message: `IntList._new failed `,
        }),
    });
  },
);

/**
 * Unsafely calls IntList._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.IntList => Effect.runSync(_new());

/**
 * Method len of IntList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.IntList,
) => Effect.Effect<number, IntListError> = Effect.fn((instance: CML.IntList) =>
  Effect.try({
    try: () => instance.len(),
    catch: () =>
      new IntListError({
        message: `IntList.len failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.IntList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of IntList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.IntList,
  index: number,
) => Effect.Effect<CML.Int, IntListError> = Effect.fn(
  (instance: CML.IntList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new IntListError({
          message: `IntList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.IntList, index: number): CML.Int =>
  Effect.runSync(get(instance, index));

/**
 * Method add of IntList
 *
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.IntList,
  elem: CML.Int,
) => Effect.Effect<void, IntListError> = Effect.fn(
  (instance: CML.IntList, elem: CML.Int) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new IntListError({
          message: `IntList.add failed with parameters: ${elem} (Int). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.IntList, elem: CML.Int): void =>
  Effect.runSync(add(instance, elem));

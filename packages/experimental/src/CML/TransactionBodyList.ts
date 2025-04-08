/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionBodyList class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionBodyList = CML.TransactionBodyList;

/**
 * Error class for TransactionBodyList operations
 *
 * This error is thrown when operations on TransactionBodyList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionBodyListError extends Data.TaggedError(
  "TransactionBodyListError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionBodyList
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.TransactionBodyList,
) => Effect.Effect<void, TransactionBodyListError> = Effect.fn(
  (instance: CML.TransactionBodyList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionBodyListError({
          message: `TransactionBodyList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionBodyList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionBodyList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.TransactionBodyList,
  TransactionBodyListError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionBodyList.new(),
    catch: () =>
      new TransactionBodyListError({
        message: `TransactionBodyList._new failed `,
      }),
  });
});

/**
 * Unsafely calls TransactionBodyList._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.TransactionBodyList => Effect.runSync(_new());

/**
 * Method len of TransactionBodyList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.TransactionBodyList,
) => Effect.Effect<number, TransactionBodyListError> = Effect.fn(
  (instance: CML.TransactionBodyList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new TransactionBodyListError({
          message: `TransactionBodyList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.TransactionBodyList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of TransactionBodyList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.TransactionBodyList,
  index: number,
) => Effect.Effect<CML.TransactionBody, TransactionBodyListError> = Effect.fn(
  (instance: CML.TransactionBodyList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new TransactionBodyListError({
          message: `TransactionBodyList.get failed with parameters: ${index}. `,
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
  instance: CML.TransactionBodyList,
  index: number,
): CML.TransactionBody => Effect.runSync(get(instance, index));

/**
 * Method add of TransactionBodyList
 *
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.TransactionBodyList,
  elem: CML.TransactionBody,
) => Effect.Effect<void, TransactionBodyListError> = Effect.fn(
  (instance: CML.TransactionBodyList, elem: CML.TransactionBody) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new TransactionBodyListError({
          message: `TransactionBodyList.add failed with parameters: ${elem} (TransactionBody). `,
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
  instance: CML.TransactionBodyList,
  elem: CML.TransactionBody,
): void => Effect.runSync(add(instance, elem));

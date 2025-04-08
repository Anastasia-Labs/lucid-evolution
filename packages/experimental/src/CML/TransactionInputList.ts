/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionInputList class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionInputList = CML.TransactionInputList;

/**
 * Error class for TransactionInputList operations
 *
 * This error is thrown when operations on TransactionInputList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionInputListError extends Data.TaggedError(
  "TransactionInputListError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionInputList
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.TransactionInputList,
) => Effect.Effect<void, TransactionInputListError> = Effect.fn(
  (instance: CML.TransactionInputList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionInputListError({
          message: `TransactionInputList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionInputList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionInputList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.TransactionInputList,
  TransactionInputListError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionInputList.new(),
    catch: () =>
      new TransactionInputListError({
        message: `TransactionInputList._new failed `,
      }),
  });
});

/**
 * Unsafely calls TransactionInputList._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.TransactionInputList =>
  Effect.runSync(_new());

/**
 * Method len of TransactionInputList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.TransactionInputList,
) => Effect.Effect<number, TransactionInputListError> = Effect.fn(
  (instance: CML.TransactionInputList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new TransactionInputListError({
          message: `TransactionInputList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.TransactionInputList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of TransactionInputList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.TransactionInputList,
  index: number,
) => Effect.Effect<CML.TransactionInput, TransactionInputListError> = Effect.fn(
  (instance: CML.TransactionInputList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new TransactionInputListError({
          message: `TransactionInputList.get failed with parameters: ${index}. `,
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
  instance: CML.TransactionInputList,
  index: number,
): CML.TransactionInput => Effect.runSync(get(instance, index));

/**
 * Method add of TransactionInputList
 *
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.TransactionInputList,
  elem: CML.TransactionInput,
) => Effect.Effect<void, TransactionInputListError> = Effect.fn(
  (instance: CML.TransactionInputList, elem: CML.TransactionInput) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new TransactionInputListError({
          message: `TransactionInputList.add failed with parameters: ${elem} (TransactionInput). `,
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
  instance: CML.TransactionInputList,
  elem: CML.TransactionInput,
): void => Effect.runSync(add(instance, elem));

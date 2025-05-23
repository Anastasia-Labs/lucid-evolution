/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionOutputList class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionOutputList = CML.TransactionOutputList;

/**
 * Error class for TransactionOutputList operations
 *
 * This error is thrown when operations on TransactionOutputList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionOutputListError extends Data.TaggedError(
  "TransactionOutputListError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionOutputList
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.TransactionOutputList,
) => Effect.Effect<void, TransactionOutputListError> = Effect.fn(
  (instance: CML.TransactionOutputList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionOutputListError({
          message: `TransactionOutputList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionOutputList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionOutputList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.TransactionOutputList,
  TransactionOutputListError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionOutputList.new(),
    catch: () =>
      new TransactionOutputListError({
        message: `TransactionOutputList._new failed `,
      }),
  });
});

/**
 * Unsafely calls TransactionOutputList._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.TransactionOutputList =>
  Effect.runSync(_new());

/**
 * Method len of TransactionOutputList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.TransactionOutputList,
) => Effect.Effect<number, TransactionOutputListError> = Effect.fn(
  (instance: CML.TransactionOutputList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new TransactionOutputListError({
          message: `TransactionOutputList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.TransactionOutputList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of TransactionOutputList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.TransactionOutputList,
  index: number,
) => Effect.Effect<CML.TransactionOutput, TransactionOutputListError> =
  Effect.fn((instance: CML.TransactionOutputList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new TransactionOutputListError({
          message: `TransactionOutputList.get failed with parameters: ${index}. `,
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
  instance: CML.TransactionOutputList,
  index: number,
): CML.TransactionOutput => Effect.runSync(get(instance, index));

/**
 * Method add of TransactionOutputList
 *
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.TransactionOutputList,
  elem: CML.TransactionOutput,
) => Effect.Effect<void, TransactionOutputListError> = Effect.fn(
  (instance: CML.TransactionOutputList, elem: CML.TransactionOutput) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new TransactionOutputListError({
          message: `TransactionOutputList.add failed with parameters: ${elem} (TransactionOutput). `,
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
  instance: CML.TransactionOutputList,
  elem: CML.TransactionOutput,
): void => Effect.runSync(add(instance, elem));

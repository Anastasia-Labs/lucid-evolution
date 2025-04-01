/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionWitnessSetList class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionWitnessSetList = CML.TransactionWitnessSetList;

/**
 * Error class for TransactionWitnessSetList operations
 *
 * This error is thrown when operations on TransactionWitnessSetList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionWitnessSetListError extends Data.TaggedError(
  "TransactionWitnessSetListError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionWitnessSetList
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.TransactionWitnessSetList,
) => Effect.Effect<void, TransactionWitnessSetListError> = Effect.fn(
  (instance: CML.TransactionWitnessSetList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionWitnessSetListError({
          message: `TransactionWitnessSetList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionWitnessSetList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionWitnessSetList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.TransactionWitnessSetList,
  TransactionWitnessSetListError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionWitnessSetList.new(),
    catch: () =>
      new TransactionWitnessSetListError({
        message: `TransactionWitnessSetList._new failed `,
      }),
  });
});

/**
 * Unsafely calls TransactionWitnessSetList._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.TransactionWitnessSetList =>
  Effect.runSync(_new());

/**
 * Method len of TransactionWitnessSetList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.TransactionWitnessSetList,
) => Effect.Effect<number, TransactionWitnessSetListError> = Effect.fn(
  (instance: CML.TransactionWitnessSetList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new TransactionWitnessSetListError({
          message: `TransactionWitnessSetList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.TransactionWitnessSetList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of TransactionWitnessSetList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.TransactionWitnessSetList,
  index: number,
) => Effect.Effect<CML.TransactionWitnessSet, TransactionWitnessSetListError> =
  Effect.fn((instance: CML.TransactionWitnessSetList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new TransactionWitnessSetListError({
          message: `TransactionWitnessSetList.get failed with parameters: ${index}. `,
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
  instance: CML.TransactionWitnessSetList,
  index: number,
): CML.TransactionWitnessSet => Effect.runSync(get(instance, index));

/**
 * Method add of TransactionWitnessSetList
 *
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.TransactionWitnessSetList,
  elem: CML.TransactionWitnessSet,
) => Effect.Effect<void, TransactionWitnessSetListError> = Effect.fn(
  (instance: CML.TransactionWitnessSetList, elem: CML.TransactionWitnessSet) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new TransactionWitnessSetListError({
          message: `TransactionWitnessSetList.add failed with parameters: ${elem} (TransactionWitnessSet). `,
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
  instance: CML.TransactionWitnessSetList,
  elem: CML.TransactionWitnessSet,
): void => Effect.runSync(add(instance, elem));

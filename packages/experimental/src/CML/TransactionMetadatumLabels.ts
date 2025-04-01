/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionMetadatumLabels class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionMetadatumLabels = CML.TransactionMetadatumLabels;

/**
 * Error class for TransactionMetadatumLabels operations
 *
 * This error is thrown when operations on TransactionMetadatumLabels instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionMetadatumLabelsError extends Data.TaggedError(
  "TransactionMetadatumLabelsError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionMetadatumLabels
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.TransactionMetadatumLabels,
) => Effect.Effect<void, TransactionMetadatumLabelsError> = Effect.fn(
  (instance: CML.TransactionMetadatumLabels) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionMetadatumLabelsError({
          message: `TransactionMetadatumLabels.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionMetadatumLabels): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionMetadatumLabels
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.TransactionMetadatumLabels,
  TransactionMetadatumLabelsError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatumLabels.new(),
    catch: () =>
      new TransactionMetadatumLabelsError({
        message: `TransactionMetadatumLabels._new failed `,
      }),
  });
});

/**
 * Unsafely calls TransactionMetadatumLabels._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.TransactionMetadatumLabels =>
  Effect.runSync(_new());

/**
 * Method len of TransactionMetadatumLabels
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.TransactionMetadatumLabels,
) => Effect.Effect<number, TransactionMetadatumLabelsError> = Effect.fn(
  (instance: CML.TransactionMetadatumLabels) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new TransactionMetadatumLabelsError({
          message: `TransactionMetadatumLabels.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.TransactionMetadatumLabels): number =>
  Effect.runSync(len(instance));

/**
 * Method get of TransactionMetadatumLabels
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.TransactionMetadatumLabels,
  index: number,
) => Effect.Effect<bigint, TransactionMetadatumLabelsError> = Effect.fn(
  (instance: CML.TransactionMetadatumLabels, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new TransactionMetadatumLabelsError({
          message: `TransactionMetadatumLabels.get failed with parameters: ${index}. `,
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
  instance: CML.TransactionMetadatumLabels,
  index: number,
): bigint => Effect.runSync(get(instance, index));

/**
 * Method add of TransactionMetadatumLabels
 *
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.TransactionMetadatumLabels,
  elem: bigint,
) => Effect.Effect<void, TransactionMetadatumLabelsError> = Effect.fn(
  (instance: CML.TransactionMetadatumLabels, elem: bigint) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new TransactionMetadatumLabelsError({
          message: `TransactionMetadatumLabels.add failed with parameters: ${elem}. `,
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
  instance: CML.TransactionMetadatumLabels,
  elem: bigint,
): void => Effect.runSync(add(instance, elem));

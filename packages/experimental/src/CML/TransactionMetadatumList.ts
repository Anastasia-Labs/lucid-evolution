/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionMetadatumList class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionMetadatumList = CML.TransactionMetadatumList;

/**
 * Error class for TransactionMetadatumList operations
 * 
 * This error is thrown when operations on TransactionMetadatumList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionMetadatumListError extends Data.TaggedError("TransactionMetadatumListError")<{
  message?: string;
}> {}

/**
 * Method free of TransactionMetadatumList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.TransactionMetadatumList) => Effect.Effect<void, TransactionMetadatumListError> = Effect.fn(
  (instance: CML.TransactionMetadatumList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionMetadatumListError({
          message: `TransactionMetadatumList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionMetadatumList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionMetadatumList
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.TransactionMetadatumList, TransactionMetadatumListError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatumList.new(),
    catch: () => new TransactionMetadatumListError({
      message: `TransactionMetadatumList._new failed `,
    }),
  });
});

/**
 * Unsafely calls TransactionMetadatumList._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.TransactionMetadatumList =>
  Effect.runSync(_new());

/**
 * Method len of TransactionMetadatumList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.TransactionMetadatumList) => Effect.Effect<number, TransactionMetadatumListError> = Effect.fn(
  (instance: CML.TransactionMetadatumList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new TransactionMetadatumListError({
          message: `TransactionMetadatumList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.TransactionMetadatumList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of TransactionMetadatumList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.TransactionMetadatumList, index: number) => Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumListError> = Effect.fn(
  (instance: CML.TransactionMetadatumList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new TransactionMetadatumListError({
          message: `TransactionMetadatumList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.TransactionMetadatumList, index: number): CML.TransactionMetadatum =>
  Effect.runSync(get(instance, index));

/**
 * Method add of TransactionMetadatumList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add: (instance: CML.TransactionMetadatumList, elem: CML.TransactionMetadatum) => Effect.Effect<void, TransactionMetadatumListError> = Effect.fn(
  (instance: CML.TransactionMetadatumList, elem: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new TransactionMetadatumListError({
          message: `TransactionMetadatumList.add failed with parameters: ${elem} (TransactionMetadatum). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.TransactionMetadatumList, elem: CML.TransactionMetadatum): void =>
  Effect.runSync(add(instance, elem));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MetadatumList class
 *
 * @since 2.0.0
 * @category Types
 */
export type MetadatumList = CML.MetadatumList;

/**
 * Error class for MetadatumList operations
 * 
 * This error is thrown when operations on MetadatumList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MetadatumListError extends Data.TaggedError("MetadatumListError")<{
  message?: string;
}> {}

/**
 * Method free of MetadatumList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.MetadatumList) => Effect.Effect<void, MetadatumListError> = Effect.fn(
  (instance: CML.MetadatumList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MetadatumListError({
          message: `MetadatumList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MetadatumList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MetadatumList
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.MetadatumList, MetadatumListError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MetadatumList.new(),
    catch: () => new MetadatumListError({
      message: `MetadatumList._new failed `,
    }),
  });
});

/**
 * Unsafely calls MetadatumList._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.MetadatumList =>
  Effect.runSync(_new());

/**
 * Method len of MetadatumList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.MetadatumList) => Effect.Effect<number, MetadatumListError> = Effect.fn(
  (instance: CML.MetadatumList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MetadatumListError({
          message: `MetadatumList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.MetadatumList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of MetadatumList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.MetadatumList, index: number) => Effect.Effect<CML.TransactionMetadatum, MetadatumListError> = Effect.fn(
  (instance: CML.MetadatumList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new MetadatumListError({
          message: `MetadatumList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.MetadatumList, index: number): CML.TransactionMetadatum =>
  Effect.runSync(get(instance, index));

/**
 * Method add of MetadatumList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add: (instance: CML.MetadatumList, elem: CML.TransactionMetadatum) => Effect.Effect<void, MetadatumListError> = Effect.fn(
  (instance: CML.MetadatumList, elem: CML.TransactionMetadatum) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new MetadatumListError({
          message: `MetadatumList.add failed with parameters: ${elem} (TransactionMetadatum). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.MetadatumList, elem: CML.TransactionMetadatum): void =>
  Effect.runSync(add(instance, elem));

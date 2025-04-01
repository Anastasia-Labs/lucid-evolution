/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PlutusDataList class
 *
 * @since 2.0.0
 * @category Types
 */
export type PlutusDataList = CML.PlutusDataList;

/**
 * Error class for PlutusDataList operations
 * 
 * This error is thrown when operations on PlutusDataList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PlutusDataListError extends Data.TaggedError("PlutusDataListError")<{
  message?: string;
}> {}

/**
 * Method free of PlutusDataList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.PlutusDataList) => Effect.Effect<void, PlutusDataListError> = Effect.fn(
  (instance: CML.PlutusDataList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusDataListError({
          message: `PlutusDataList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PlutusDataList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of PlutusDataList
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.PlutusDataList, PlutusDataListError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.PlutusDataList.new(),
    catch: () => new PlutusDataListError({
      message: `PlutusDataList._new failed `,
    }),
  });
});

/**
 * Unsafely calls PlutusDataList._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.PlutusDataList =>
  Effect.runSync(_new());

/**
 * Method len of PlutusDataList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.PlutusDataList) => Effect.Effect<number, PlutusDataListError> = Effect.fn(
  (instance: CML.PlutusDataList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new PlutusDataListError({
          message: `PlutusDataList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.PlutusDataList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of PlutusDataList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.PlutusDataList, index: number) => Effect.Effect<CML.PlutusData, PlutusDataListError> = Effect.fn(
  (instance: CML.PlutusDataList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new PlutusDataListError({
          message: `PlutusDataList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.PlutusDataList, index: number): CML.PlutusData =>
  Effect.runSync(get(instance, index));

/**
 * Method add of PlutusDataList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add: (instance: CML.PlutusDataList, elem: CML.PlutusData) => Effect.Effect<void, PlutusDataListError> = Effect.fn(
  (instance: CML.PlutusDataList, elem: CML.PlutusData) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new PlutusDataListError({
          message: `PlutusDataList.add failed with parameters: ${elem} (PlutusData). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.PlutusDataList, elem: CML.PlutusData): void =>
  Effect.runSync(add(instance, elem));

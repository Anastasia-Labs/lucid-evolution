/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML LanguageList class
 *
 * @since 2.0.0
 * @category Types
 */
export type LanguageList = CML.LanguageList;

/**
 * Error class for LanguageList operations
 * 
 * This error is thrown when operations on LanguageList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class LanguageListError extends Data.TaggedError("LanguageListError")<{
  message?: string;
}> {}

/**
 * Method free of LanguageList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.LanguageList) => Effect.Effect<void, LanguageListError> = Effect.fn(
  (instance: CML.LanguageList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new LanguageListError({
          message: `LanguageList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.LanguageList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of LanguageList
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.LanguageList, LanguageListError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.LanguageList.new(),
    catch: () => new LanguageListError({
      message: `LanguageList._new failed `,
    }),
  });
});

/**
 * Unsafely calls LanguageList._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.LanguageList =>
  Effect.runSync(_new());

/**
 * Method len of LanguageList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.LanguageList) => Effect.Effect<number, LanguageListError> = Effect.fn(
  (instance: CML.LanguageList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new LanguageListError({
          message: `LanguageList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.LanguageList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of LanguageList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.LanguageList, index: number) => Effect.Effect<CML.Language, LanguageListError> = Effect.fn(
  (instance: CML.LanguageList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new LanguageListError({
          message: `LanguageList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.LanguageList, index: number): CML.Language =>
  Effect.runSync(get(instance, index));

/**
 * Method add of LanguageList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add: (instance: CML.LanguageList, elem: CML.Language) => Effect.Effect<void, LanguageListError> = Effect.fn(
  (instance: CML.LanguageList, elem: CML.Language) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new LanguageListError({
          message: `LanguageList.add failed with parameters: ${elem} (Language). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.LanguageList, elem: CML.Language): void =>
  Effect.runSync(add(instance, elem));

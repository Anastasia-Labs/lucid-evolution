/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PlutusV3ScriptList class
 *
 * @since 2.0.0
 * @category Types
 */
export type PlutusV3ScriptList = CML.PlutusV3ScriptList;

/**
 * Error class for PlutusV3ScriptList operations
 * 
 * This error is thrown when operations on PlutusV3ScriptList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PlutusV3ScriptListError extends Data.TaggedError("PlutusV3ScriptListError")<{
  message?: string;
}> {}

/**
 * Method free of PlutusV3ScriptList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.PlutusV3ScriptList) => Effect.Effect<void, PlutusV3ScriptListError> = Effect.fn(
  (instance: CML.PlutusV3ScriptList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusV3ScriptListError({
          message: `PlutusV3ScriptList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PlutusV3ScriptList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of PlutusV3ScriptList
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.PlutusV3ScriptList, PlutusV3ScriptListError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.PlutusV3ScriptList.new(),
    catch: () => new PlutusV3ScriptListError({
      message: `PlutusV3ScriptList._new failed `,
    }),
  });
});

/**
 * Unsafely calls PlutusV3ScriptList._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.PlutusV3ScriptList =>
  Effect.runSync(_new());

/**
 * Method len of PlutusV3ScriptList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.PlutusV3ScriptList) => Effect.Effect<number, PlutusV3ScriptListError> = Effect.fn(
  (instance: CML.PlutusV3ScriptList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new PlutusV3ScriptListError({
          message: `PlutusV3ScriptList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.PlutusV3ScriptList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of PlutusV3ScriptList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.PlutusV3ScriptList, index: number) => Effect.Effect<CML.PlutusV3Script, PlutusV3ScriptListError> = Effect.fn(
  (instance: CML.PlutusV3ScriptList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new PlutusV3ScriptListError({
          message: `PlutusV3ScriptList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.PlutusV3ScriptList, index: number): CML.PlutusV3Script =>
  Effect.runSync(get(instance, index));

/**
 * Method add of PlutusV3ScriptList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add: (instance: CML.PlutusV3ScriptList, elem: CML.PlutusV3Script) => Effect.Effect<void, PlutusV3ScriptListError> = Effect.fn(
  (instance: CML.PlutusV3ScriptList, elem: CML.PlutusV3Script) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new PlutusV3ScriptListError({
          message: `PlutusV3ScriptList.add failed with parameters: ${elem} (PlutusV3Script). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.PlutusV3ScriptList, elem: CML.PlutusV3Script): void =>
  Effect.runSync(add(instance, elem));

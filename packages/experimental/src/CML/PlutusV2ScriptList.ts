/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PlutusV2ScriptList class
 *
 * @since 2.0.0
 * @category Types
 */
export type PlutusV2ScriptList = CML.PlutusV2ScriptList;

/**
 * Error class for PlutusV2ScriptList operations
 *
 * This error is thrown when operations on PlutusV2ScriptList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PlutusV2ScriptListError extends Data.TaggedError(
  "PlutusV2ScriptListError",
)<{
  message?: string;
}> {}

/**
 * Method free of PlutusV2ScriptList
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.PlutusV2ScriptList,
) => Effect.Effect<void, PlutusV2ScriptListError> = Effect.fn(
  (instance: CML.PlutusV2ScriptList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusV2ScriptListError({
          message: `PlutusV2ScriptList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PlutusV2ScriptList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of PlutusV2ScriptList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.PlutusV2ScriptList,
  PlutusV2ScriptListError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.PlutusV2ScriptList.new(),
    catch: () =>
      new PlutusV2ScriptListError({
        message: `PlutusV2ScriptList._new failed `,
      }),
  });
});

/**
 * Unsafely calls PlutusV2ScriptList._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.PlutusV2ScriptList => Effect.runSync(_new());

/**
 * Method len of PlutusV2ScriptList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.PlutusV2ScriptList,
) => Effect.Effect<number, PlutusV2ScriptListError> = Effect.fn(
  (instance: CML.PlutusV2ScriptList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new PlutusV2ScriptListError({
          message: `PlutusV2ScriptList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.PlutusV2ScriptList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of PlutusV2ScriptList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.PlutusV2ScriptList,
  index: number,
) => Effect.Effect<CML.PlutusV2Script, PlutusV2ScriptListError> = Effect.fn(
  (instance: CML.PlutusV2ScriptList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new PlutusV2ScriptListError({
          message: `PlutusV2ScriptList.get failed with parameters: ${index}. `,
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
  instance: CML.PlutusV2ScriptList,
  index: number,
): CML.PlutusV2Script => Effect.runSync(get(instance, index));

/**
 * Method add of PlutusV2ScriptList
 *
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.PlutusV2ScriptList,
  elem: CML.PlutusV2Script,
) => Effect.Effect<void, PlutusV2ScriptListError> = Effect.fn(
  (instance: CML.PlutusV2ScriptList, elem: CML.PlutusV2Script) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new PlutusV2ScriptListError({
          message: `PlutusV2ScriptList.add failed with parameters: ${elem} (PlutusV2Script). `,
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
  instance: CML.PlutusV2ScriptList,
  elem: CML.PlutusV2Script,
): void => Effect.runSync(add(instance, elem));

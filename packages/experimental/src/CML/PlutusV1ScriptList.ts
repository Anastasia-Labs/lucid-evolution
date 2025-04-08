/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PlutusV1ScriptList class
 *
 * @since 2.0.0
 * @category Types
 */
export type PlutusV1ScriptList = CML.PlutusV1ScriptList;

/**
 * Error class for PlutusV1ScriptList operations
 *
 * This error is thrown when operations on PlutusV1ScriptList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PlutusV1ScriptListError extends Data.TaggedError(
  "PlutusV1ScriptListError",
)<{
  message?: string;
}> {}

/**
 * Method free of PlutusV1ScriptList
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.PlutusV1ScriptList,
) => Effect.Effect<void, PlutusV1ScriptListError> = Effect.fn(
  (instance: CML.PlutusV1ScriptList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusV1ScriptListError({
          message: `PlutusV1ScriptList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PlutusV1ScriptList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of PlutusV1ScriptList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.PlutusV1ScriptList,
  PlutusV1ScriptListError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.PlutusV1ScriptList.new(),
    catch: () =>
      new PlutusV1ScriptListError({
        message: `PlutusV1ScriptList._new failed `,
      }),
  });
});

/**
 * Unsafely calls PlutusV1ScriptList._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.PlutusV1ScriptList => Effect.runSync(_new());

/**
 * Method len of PlutusV1ScriptList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.PlutusV1ScriptList,
) => Effect.Effect<number, PlutusV1ScriptListError> = Effect.fn(
  (instance: CML.PlutusV1ScriptList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new PlutusV1ScriptListError({
          message: `PlutusV1ScriptList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.PlutusV1ScriptList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of PlutusV1ScriptList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.PlutusV1ScriptList,
  index: number,
) => Effect.Effect<CML.PlutusV1Script, PlutusV1ScriptListError> = Effect.fn(
  (instance: CML.PlutusV1ScriptList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new PlutusV1ScriptListError({
          message: `PlutusV1ScriptList.get failed with parameters: ${index}. `,
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
  instance: CML.PlutusV1ScriptList,
  index: number,
): CML.PlutusV1Script => Effect.runSync(get(instance, index));

/**
 * Method add of PlutusV1ScriptList
 *
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.PlutusV1ScriptList,
  elem: CML.PlutusV1Script,
) => Effect.Effect<void, PlutusV1ScriptListError> = Effect.fn(
  (instance: CML.PlutusV1ScriptList, elem: CML.PlutusV1Script) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new PlutusV1ScriptListError({
          message: `PlutusV1ScriptList.add failed with parameters: ${elem} (PlutusV1Script). `,
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
  instance: CML.PlutusV1ScriptList,
  elem: CML.PlutusV1Script,
): void => Effect.runSync(add(instance, elem));

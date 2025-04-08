/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML NativeScriptList class
 *
 * @since 2.0.0
 * @category Types
 */
export type NativeScriptList = CML.NativeScriptList;

/**
 * Error class for NativeScriptList operations
 *
 * This error is thrown when operations on NativeScriptList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class NativeScriptListError extends Data.TaggedError(
  "NativeScriptListError",
)<{
  message?: string;
}> {}

/**
 * Method free of NativeScriptList
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.NativeScriptList,
) => Effect.Effect<void, NativeScriptListError> = Effect.fn(
  (instance: CML.NativeScriptList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new NativeScriptListError({
          message: `NativeScriptList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.NativeScriptList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of NativeScriptList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.NativeScriptList,
  NativeScriptListError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.NativeScriptList.new(),
    catch: () =>
      new NativeScriptListError({
        message: `NativeScriptList._new failed `,
      }),
  });
});

/**
 * Unsafely calls NativeScriptList._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.NativeScriptList => Effect.runSync(_new());

/**
 * Method len of NativeScriptList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.NativeScriptList,
) => Effect.Effect<number, NativeScriptListError> = Effect.fn(
  (instance: CML.NativeScriptList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new NativeScriptListError({
          message: `NativeScriptList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.NativeScriptList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of NativeScriptList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.NativeScriptList,
  index: number,
) => Effect.Effect<CML.NativeScript, NativeScriptListError> = Effect.fn(
  (instance: CML.NativeScriptList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new NativeScriptListError({
          message: `NativeScriptList.get failed with parameters: ${index}. `,
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
  instance: CML.NativeScriptList,
  index: number,
): CML.NativeScript => Effect.runSync(get(instance, index));

/**
 * Method add of NativeScriptList
 *
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.NativeScriptList,
  elem: CML.NativeScript,
) => Effect.Effect<void, NativeScriptListError> = Effect.fn(
  (instance: CML.NativeScriptList, elem: CML.NativeScript) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new NativeScriptListError({
          message: `NativeScriptList.add failed with parameters: ${elem} (NativeScript). `,
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
  instance: CML.NativeScriptList,
  elem: CML.NativeScript,
): void => Effect.runSync(add(instance, elem));

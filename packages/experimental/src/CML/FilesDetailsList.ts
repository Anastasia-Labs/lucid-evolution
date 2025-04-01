/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML FilesDetailsList class
 *
 * @since 2.0.0
 * @category Types
 */
export type FilesDetailsList = CML.FilesDetailsList;

/**
 * Error class for FilesDetailsList operations
 *
 * This error is thrown when operations on FilesDetailsList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class FilesDetailsListError extends Data.TaggedError(
  "FilesDetailsListError",
)<{
  message?: string;
}> {}

/**
 * Method free of FilesDetailsList
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.FilesDetailsList,
) => Effect.Effect<void, FilesDetailsListError> = Effect.fn(
  (instance: CML.FilesDetailsList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new FilesDetailsListError({
          message: `FilesDetailsList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.FilesDetailsList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of FilesDetailsList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.FilesDetailsList,
  FilesDetailsListError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.FilesDetailsList.new(),
    catch: () =>
      new FilesDetailsListError({
        message: `FilesDetailsList._new failed `,
      }),
  });
});

/**
 * Unsafely calls FilesDetailsList._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.FilesDetailsList => Effect.runSync(_new());

/**
 * Method len of FilesDetailsList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.FilesDetailsList,
) => Effect.Effect<number, FilesDetailsListError> = Effect.fn(
  (instance: CML.FilesDetailsList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new FilesDetailsListError({
          message: `FilesDetailsList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.FilesDetailsList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of FilesDetailsList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.FilesDetailsList,
  index: number,
) => Effect.Effect<CML.CIP25FilesDetails, FilesDetailsListError> = Effect.fn(
  (instance: CML.FilesDetailsList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new FilesDetailsListError({
          message: `FilesDetailsList.get failed with parameters: ${index}. `,
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
  instance: CML.FilesDetailsList,
  index: number,
): CML.CIP25FilesDetails => Effect.runSync(get(instance, index));

/**
 * Method add of FilesDetailsList
 *
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.FilesDetailsList,
  elem: CML.CIP25FilesDetails,
) => Effect.Effect<void, FilesDetailsListError> = Effect.fn(
  (instance: CML.FilesDetailsList, elem: CML.CIP25FilesDetails) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new FilesDetailsListError({
          message: `FilesDetailsList.add failed with parameters: ${elem} (CIP25FilesDetails). `,
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
  instance: CML.FilesDetailsList,
  elem: CML.CIP25FilesDetails,
): void => Effect.runSync(add(instance, elem));

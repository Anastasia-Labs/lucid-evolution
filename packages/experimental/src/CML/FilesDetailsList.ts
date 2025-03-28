import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type FilesDetailsList = CML.FilesDetailsList;

export class FilesDetailsListError extends Data.TaggedError(
  "FilesDetailsListError",
)<{
  message?: string;
}> {}

/**
 * Method free of FilesDetailsList
 *
 * @example
 * import { FilesDetailsList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a FilesDetailsList instance
 * const instance = ... ;
 *   const result = yield* FilesDetailsList.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.FilesDetailsList,
  ): Effect.Effect<void, FilesDetailsListError> =>
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
 * @example
 * import { FilesDetailsList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a FilesDetailsList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = FilesDetailsList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`FilesDetailsList.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.FilesDetailsList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of FilesDetailsList
 *
 * @example
 * import { FilesDetailsList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* FilesDetailsList._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
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
 * @example
 * import { FilesDetailsList } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = FilesDetailsList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`FilesDetailsList.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method len of FilesDetailsList
 *
 * @example
 * import { FilesDetailsList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a FilesDetailsList instance
 * const instance = ... ;
 *   const result = yield* FilesDetailsList.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.FilesDetailsList,
  ): Effect.Effect<number, FilesDetailsListError> =>
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
 * @example
 * import { FilesDetailsList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a FilesDetailsList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = FilesDetailsList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`FilesDetailsList.unsafeLen failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.FilesDetailsList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of FilesDetailsList
 *
 * @example
 * import { FilesDetailsList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a FilesDetailsList instance
 * const instance = ... ;
 *   const result = yield* FilesDetailsList.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.FilesDetailsList,
    index: number,
  ): Effect.Effect<CML.CIP25FilesDetails, FilesDetailsListError> =>
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
 * @example
 * import { FilesDetailsList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a FilesDetailsList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = FilesDetailsList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`FilesDetailsList.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (
  instance: CML.FilesDetailsList,
  index: number,
): CML.CIP25FilesDetails => Effect.runSync(get(instance, index));

/**
 * Method add of FilesDetailsList
 *
 * @example
 * import { FilesDetailsList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a FilesDetailsList instance
 * const instance = ... ;
 *   const result = yield* FilesDetailsList.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.FilesDetailsList,
    elem: CML.CIP25FilesDetails,
  ): Effect.Effect<void, FilesDetailsListError> =>
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
 * @example
 * import { FilesDetailsList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a FilesDetailsList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = FilesDetailsList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`FilesDetailsList.unsafeAdd failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (
  instance: CML.FilesDetailsList,
  elem: CML.CIP25FilesDetails,
): void => Effect.runSync(add(instance, elem));

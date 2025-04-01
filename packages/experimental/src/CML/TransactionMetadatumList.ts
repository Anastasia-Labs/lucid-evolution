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
export class TransactionMetadatumListError extends Data.TaggedError(
  "TransactionMetadatumListError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionMetadatumList
 *
 * @example
 * import { TransactionMetadatumList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatumList instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatumList.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.TransactionMetadatumList,
  ): Effect.Effect<void, TransactionMetadatumListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionMetadatumListError({
          message: `TransactionMetadatumList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { TransactionMetadatumList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionMetadatumList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatumList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatumList.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionMetadatumList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionMetadatumList
 *
 * @example
 * import { TransactionMetadatumList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionMetadatumList._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatumList.new(),
    catch: () =>
      new TransactionMetadatumListError({
        message: `TransactionMetadatumList._new failed `,
      }),
  });
});

/**
 * Unsafely calls TransactionMetadatumList._new without Effect wrapper
 *
 * @example
 * import { TransactionMetadatumList } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatumList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatumList._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () => Effect.runSync(_new());

/**
 * Method len of TransactionMetadatumList
 *
 * @example
 * import { TransactionMetadatumList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatumList instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatumList.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.TransactionMetadatumList,
  ): Effect.Effect<number, TransactionMetadatumListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new TransactionMetadatumListError({
          message: `TransactionMetadatumList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { TransactionMetadatumList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionMetadatumList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatumList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatumList.lenUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.TransactionMetadatumList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of TransactionMetadatumList
 *
 * @example
 * import { TransactionMetadatumList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatumList instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatumList.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.TransactionMetadatumList,
    index: number,
  ): Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new TransactionMetadatumListError({
          message: `TransactionMetadatumList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { TransactionMetadatumList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionMetadatumList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatumList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatumList.getUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.TransactionMetadatumList,
  index: number,
): CML.TransactionMetadatum => Effect.runSync(get(instance, index));

/**
 * Method add of TransactionMetadatumList
 *
 * @example
 * import { TransactionMetadatumList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatumList instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatumList.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.TransactionMetadatumList,
    elem: CML.TransactionMetadatum,
  ): Effect.Effect<void, TransactionMetadatumListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new TransactionMetadatumListError({
          message: `TransactionMetadatumList.add failed with parameters: ${elem} (TransactionMetadatum). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { TransactionMetadatumList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionMetadatumList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatumList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatumList.addUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (
  instance: CML.TransactionMetadatumList,
  elem: CML.TransactionMetadatum,
): void => Effect.runSync(add(instance, elem));

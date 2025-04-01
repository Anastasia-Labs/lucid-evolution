/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MetadatumMap class
 *
 * @since 2.0.0
 * @category Types
 */
export type MetadatumMap = CML.MetadatumMap;

/**
 * Error class for MetadatumMap operations
 *
 * This error is thrown when operations on MetadatumMap instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MetadatumMapError extends Data.TaggedError("MetadatumMapError")<{
  message?: string;
}> {}

/**
 * Method free of MetadatumMap
 *
 * @example
 * import { MetadatumMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MetadatumMap instance
 * const instance = ... ;
 *   const result = yield* MetadatumMap.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.MetadatumMap): Effect.Effect<void, MetadatumMapError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MetadatumMapError({
          message: `MetadatumMap.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { MetadatumMap } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MetadatumMap instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MetadatumMap.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MetadatumMap.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MetadatumMap): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MetadatumMap
 *
 * @example
 * import { MetadatumMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* MetadatumMap._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MetadatumMap.new(),
    catch: () =>
      new MetadatumMapError({
        message: `MetadatumMap._new failed `,
      }),
  });
});

/**
 * Unsafely calls MetadatumMap._new without Effect wrapper
 *
 * @example
 * import { MetadatumMap } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MetadatumMap._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MetadatumMap._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () => Effect.runSync(_new());

/**
 * Method len of MetadatumMap
 *
 * @example
 * import { MetadatumMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MetadatumMap instance
 * const instance = ... ;
 *   const result = yield* MetadatumMap.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.MetadatumMap): Effect.Effect<number, MetadatumMapError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MetadatumMapError({
          message: `MetadatumMap.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { MetadatumMap } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MetadatumMap instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MetadatumMap.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MetadatumMap.lenUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.MetadatumMap): number =>
  Effect.runSync(len(instance));

/**
 * Method set of MetadatumMap
 *
 * @example
 * import { MetadatumMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MetadatumMap instance
 * const instance = ... ;
 *   const result = yield* MetadatumMap.set(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const set = Effect.fn(
  (
    instance: CML.MetadatumMap,
    key: CML.TransactionMetadatum,
    value: CML.TransactionMetadatum,
  ): Effect.Effect<void, MetadatumMapError> =>
    Effect.try({
      try: () => instance.set(key, value),
      catch: () =>
        new MetadatumMapError({
          message: `MetadatumMap.set failed with parameters: ${key} (TransactionMetadatum), ${value} (TransactionMetadatum). `,
        }),
    }),
);

/**
 * Unsafely calls instance.set without Effect wrapper
 *
 * @example
 * import { MetadatumMap } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MetadatumMap instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MetadatumMap.setUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MetadatumMap.setUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setUnsafe = (
  instance: CML.MetadatumMap,
  key: CML.TransactionMetadatum,
  value: CML.TransactionMetadatum,
): void => Effect.runSync(set(instance, key, value));

/**
 * Method get of MetadatumMap
 *
 * @example
 * import { MetadatumMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MetadatumMap instance
 * const instance = ... ;
 *   const result = yield* MetadatumMap.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.MetadatumMap,
    key: CML.TransactionMetadatum,
  ): Effect.Effect<CML.TransactionMetadatum | undefined, MetadatumMapError> =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MetadatumMapError({
          message: `MetadatumMap.get failed with parameters: ${key} (TransactionMetadatum). `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { MetadatumMap } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MetadatumMap instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MetadatumMap.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MetadatumMap.getUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.MetadatumMap,
  key: CML.TransactionMetadatum,
): CML.TransactionMetadatum | undefined => Effect.runSync(get(instance, key));

/**
 * Method getAll of MetadatumMap
 *
 * @example
 * import { MetadatumMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MetadatumMap instance
 * const instance = ... ;
 *   const result = yield* MetadatumMap.getAll(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const getAll = Effect.fn(
  (
    instance: CML.MetadatumMap,
    key: CML.TransactionMetadatum,
  ): Effect.Effect<
    CML.TransactionMetadatumList | undefined,
    MetadatumMapError
  > =>
    Effect.try({
      try: () => instance.get_all(key),
      catch: () =>
        new MetadatumMapError({
          message: `MetadatumMap.getAll failed with parameters: ${key} (TransactionMetadatum). `,
        }),
    }),
);

/**
 * Unsafely calls instance.getAll without Effect wrapper
 *
 * @example
 * import { MetadatumMap } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MetadatumMap instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MetadatumMap.getAllUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MetadatumMap.getAllUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getAllUnsafe = (
  instance: CML.MetadatumMap,
  key: CML.TransactionMetadatum,
): CML.TransactionMetadatumList | undefined =>
  Effect.runSync(getAll(instance, key));

/**
 * Method keys of MetadatumMap
 *
 * @example
 * import { MetadatumMap } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MetadatumMap instance
 * const instance = ... ;
 *   const result = yield* MetadatumMap.keys(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const keys = Effect.fn(
  (
    instance: CML.MetadatumMap,
  ): Effect.Effect<CML.MetadatumList, MetadatumMapError> =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MetadatumMapError({
          message: `MetadatumMap.keys failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 *
 * @example
 * import { MetadatumMap } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MetadatumMap instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MetadatumMap.keysUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MetadatumMap.keysUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.MetadatumMap): CML.MetadatumList =>
  Effect.runSync(keys(instance));

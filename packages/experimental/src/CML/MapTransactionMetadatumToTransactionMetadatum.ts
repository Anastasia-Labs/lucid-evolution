import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type MapTransactionMetadatumToTransactionMetadatum =
  CML.MapTransactionMetadatumToTransactionMetadatum;

export class MapTransactionMetadatumToTransactionMetadatumError extends Data.TaggedError(
  "MapTransactionMetadatumToTransactionMetadatumError",
)<{
  message?: string;
}> {}

/**
 * Method free of MapTransactionMetadatumToTransactionMetadatum
 *
 * @example
 * import { MapTransactionMetadatumToTransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapTransactionMetadatumToTransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* MapTransactionMetadatumToTransactionMetadatum.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.MapTransactionMetadatumToTransactionMetadatum,
  ): Effect.Effect<void, MapTransactionMetadatumToTransactionMetadatumError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapTransactionMetadatumToTransactionMetadatumError({
          message: `MapTransactionMetadatumToTransactionMetadatum.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { MapTransactionMetadatumToTransactionMetadatum } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapTransactionMetadatumToTransactionMetadatum instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapTransactionMetadatumToTransactionMetadatum.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionMetadatumToTransactionMetadatum.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (
  instance: CML.MapTransactionMetadatumToTransactionMetadatum,
): void => Effect.runSync(free(instance));

/**
 * Static method _new of MapTransactionMetadatumToTransactionMetadatum
 *
 * @example
 * import { MapTransactionMetadatumToTransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* MapTransactionMetadatumToTransactionMetadatum._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MapTransactionMetadatumToTransactionMetadatum.new(),
    catch: () =>
      new MapTransactionMetadatumToTransactionMetadatumError({
        message: `MapTransactionMetadatumToTransactionMetadatum._new failed `,
      }),
  });
});

/**
 * Unsafely calls MapTransactionMetadatumToTransactionMetadatum._new without Effect wrapper
 *
 * @example
 * import { MapTransactionMetadatumToTransactionMetadatum } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapTransactionMetadatumToTransactionMetadatum.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionMetadatumToTransactionMetadatum.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method len of MapTransactionMetadatumToTransactionMetadatum
 *
 * @example
 * import { MapTransactionMetadatumToTransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapTransactionMetadatumToTransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* MapTransactionMetadatumToTransactionMetadatum.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.MapTransactionMetadatumToTransactionMetadatum,
  ): Effect.Effect<
    number,
    MapTransactionMetadatumToTransactionMetadatumError
  > =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapTransactionMetadatumToTransactionMetadatumError({
          message: `MapTransactionMetadatumToTransactionMetadatum.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { MapTransactionMetadatumToTransactionMetadatum } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapTransactionMetadatumToTransactionMetadatum instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapTransactionMetadatumToTransactionMetadatum.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionMetadatumToTransactionMetadatum.unsafeLen failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (
  instance: CML.MapTransactionMetadatumToTransactionMetadatum,
): number => Effect.runSync(len(instance));

/**
 * Method insert of MapTransactionMetadatumToTransactionMetadatum
 *
 * @example
 * import { MapTransactionMetadatumToTransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapTransactionMetadatumToTransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* MapTransactionMetadatumToTransactionMetadatum.insert(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const insert = Effect.fn(
  (
    instance: CML.MapTransactionMetadatumToTransactionMetadatum,
    key: CML.TransactionMetadatum,
    value: CML.TransactionMetadatum,
  ): Effect.Effect<
    CML.TransactionMetadatum | undefined,
    MapTransactionMetadatumToTransactionMetadatumError
  > =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapTransactionMetadatumToTransactionMetadatumError({
          message: `MapTransactionMetadatumToTransactionMetadatum.insert failed with parameters: ${key} (TransactionMetadatum), ${value} (TransactionMetadatum). `,
        }),
    }),
);

/**
 * Unsafely calls instance.insert without Effect wrapper
 *
 * @example
 * import { MapTransactionMetadatumToTransactionMetadatum } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapTransactionMetadatumToTransactionMetadatum instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapTransactionMetadatumToTransactionMetadatum.unsafeInsert(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionMetadatumToTransactionMetadatum.unsafeInsert failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeInsert = (
  instance: CML.MapTransactionMetadatumToTransactionMetadatum,
  key: CML.TransactionMetadatum,
  value: CML.TransactionMetadatum,
): CML.TransactionMetadatum | undefined =>
  Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapTransactionMetadatumToTransactionMetadatum
 *
 * @example
 * import { MapTransactionMetadatumToTransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapTransactionMetadatumToTransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* MapTransactionMetadatumToTransactionMetadatum.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.MapTransactionMetadatumToTransactionMetadatum,
    key: CML.TransactionMetadatum,
  ): Effect.Effect<
    CML.TransactionMetadatum | undefined,
    MapTransactionMetadatumToTransactionMetadatumError
  > =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapTransactionMetadatumToTransactionMetadatumError({
          message: `MapTransactionMetadatumToTransactionMetadatum.get failed with parameters: ${key} (TransactionMetadatum). `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { MapTransactionMetadatumToTransactionMetadatum } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapTransactionMetadatumToTransactionMetadatum instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapTransactionMetadatumToTransactionMetadatum.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionMetadatumToTransactionMetadatum.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (
  instance: CML.MapTransactionMetadatumToTransactionMetadatum,
  key: CML.TransactionMetadatum,
): CML.TransactionMetadatum | undefined => Effect.runSync(get(instance, key));

/**
 * Method keys of MapTransactionMetadatumToTransactionMetadatum
 *
 * @example
 * import { MapTransactionMetadatumToTransactionMetadatum } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapTransactionMetadatumToTransactionMetadatum instance
 * const instance = ... ;
 *   const result = yield* MapTransactionMetadatumToTransactionMetadatum.keys(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const keys = Effect.fn(
  (
    instance: CML.MapTransactionMetadatumToTransactionMetadatum,
  ): Effect.Effect<
    CML.TransactionMetadatumList,
    MapTransactionMetadatumToTransactionMetadatumError
  > =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapTransactionMetadatumToTransactionMetadatumError({
          message: `MapTransactionMetadatumToTransactionMetadatum.keys failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 *
 * @example
 * import { MapTransactionMetadatumToTransactionMetadatum } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapTransactionMetadatumToTransactionMetadatum instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapTransactionMetadatumToTransactionMetadatum.unsafeKeys(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapTransactionMetadatumToTransactionMetadatum.unsafeKeys failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKeys = (
  instance: CML.MapTransactionMetadatumToTransactionMetadatum,
): CML.TransactionMetadatumList => Effect.runSync(keys(instance));

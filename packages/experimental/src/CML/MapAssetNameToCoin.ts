import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type MapAssetNameToCoin = CML.MapAssetNameToCoin;

export class MapAssetNameToCoinError extends Data.TaggedError(
  "MapAssetNameToCoinError",
)<{
  message?: string;
}> {}

/**
 * Method free of MapAssetNameToCoin
 *
 * @example
 * import { MapAssetNameToCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapAssetNameToCoin instance
 * const instance = ... ;
 *   const result = yield* MapAssetNameToCoin.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.MapAssetNameToCoin,
  ): Effect.Effect<void, MapAssetNameToCoinError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapAssetNameToCoinError({
          message: `MapAssetNameToCoin.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { MapAssetNameToCoin } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapAssetNameToCoin instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapAssetNameToCoin.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapAssetNameToCoin.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.MapAssetNameToCoin): void =>
  Effect.runSync(free(instance));

/**
 * Method get of MapAssetNameToCoin
 *
 * @example
 * import { MapAssetNameToCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapAssetNameToCoin instance
 * const instance = ... ;
 *   const result = yield* MapAssetNameToCoin.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.MapAssetNameToCoin,
    key: CML.AssetName,
  ): Effect.Effect<bigint | undefined, MapAssetNameToCoinError> =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapAssetNameToCoinError({
          message: `MapAssetNameToCoin.get failed with parameters: ${key} (AssetName). `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { MapAssetNameToCoin } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapAssetNameToCoin instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapAssetNameToCoin.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapAssetNameToCoin.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (
  instance: CML.MapAssetNameToCoin,
  key: CML.AssetName,
): bigint | undefined => Effect.runSync(get(instance, key));

/**
 * Method insert of MapAssetNameToCoin
 *
 * @example
 * import { MapAssetNameToCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapAssetNameToCoin instance
 * const instance = ... ;
 *   const result = yield* MapAssetNameToCoin.insert(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const insert = Effect.fn(
  (
    instance: CML.MapAssetNameToCoin,
    key: CML.AssetName,
    value: bigint,
  ): Effect.Effect<bigint | undefined, MapAssetNameToCoinError> =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapAssetNameToCoinError({
          message: `MapAssetNameToCoin.insert failed with parameters: ${key} (AssetName), ${value}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.insert without Effect wrapper
 *
 * @example
 * import { MapAssetNameToCoin } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapAssetNameToCoin instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapAssetNameToCoin.unsafeInsert(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapAssetNameToCoin.unsafeInsert failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeInsert = (
  instance: CML.MapAssetNameToCoin,
  key: CML.AssetName,
  value: bigint,
): bigint | undefined => Effect.runSync(insert(instance, key, value));

/**
 * Static method _new of MapAssetNameToCoin
 *
 * @example
 * import { MapAssetNameToCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* MapAssetNameToCoin._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MapAssetNameToCoin.new(),
    catch: () =>
      new MapAssetNameToCoinError({
        message: `MapAssetNameToCoin._new failed `,
      }),
  });
});

/**
 * Unsafely calls MapAssetNameToCoin._new without Effect wrapper
 *
 * @example
 * import { MapAssetNameToCoin } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapAssetNameToCoin.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapAssetNameToCoin.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method len of MapAssetNameToCoin
 *
 * @example
 * import { MapAssetNameToCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapAssetNameToCoin instance
 * const instance = ... ;
 *   const result = yield* MapAssetNameToCoin.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.MapAssetNameToCoin,
  ): Effect.Effect<number, MapAssetNameToCoinError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapAssetNameToCoinError({
          message: `MapAssetNameToCoin.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { MapAssetNameToCoin } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapAssetNameToCoin instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapAssetNameToCoin.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapAssetNameToCoin.unsafeLen failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.MapAssetNameToCoin): number =>
  Effect.runSync(len(instance));

/**
 * Method isEmpty of MapAssetNameToCoin
 *
 * @example
 * import { MapAssetNameToCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapAssetNameToCoin instance
 * const instance = ... ;
 *   const result = yield* MapAssetNameToCoin.isEmpty(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const isEmpty = Effect.fn(
  (
    instance: CML.MapAssetNameToCoin,
  ): Effect.Effect<boolean, MapAssetNameToCoinError> =>
    Effect.try({
      try: () => instance.is_empty(),
      catch: () =>
        new MapAssetNameToCoinError({
          message: `MapAssetNameToCoin.isEmpty failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.isEmpty without Effect wrapper
 *
 * @example
 * import { MapAssetNameToCoin } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapAssetNameToCoin instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapAssetNameToCoin.unsafeIsEmpty(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapAssetNameToCoin.unsafeIsEmpty failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeIsEmpty = (instance: CML.MapAssetNameToCoin): boolean =>
  Effect.runSync(isEmpty(instance));

/**
 * Method keys of MapAssetNameToCoin
 *
 * @example
 * import { MapAssetNameToCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapAssetNameToCoin instance
 * const instance = ... ;
 *   const result = yield* MapAssetNameToCoin.keys(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const keys = Effect.fn(
  (
    instance: CML.MapAssetNameToCoin,
  ): Effect.Effect<CML.AssetNameList, MapAssetNameToCoinError> =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapAssetNameToCoinError({
          message: `MapAssetNameToCoin.keys failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 *
 * @example
 * import { MapAssetNameToCoin } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapAssetNameToCoin instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapAssetNameToCoin.unsafeKeys(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapAssetNameToCoin.unsafeKeys failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKeys = (
  instance: CML.MapAssetNameToCoin,
): CML.AssetNameList => Effect.runSync(keys(instance));

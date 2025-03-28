import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type MapAssetNameToNonZeroInt64 = CML.MapAssetNameToNonZeroInt64;

export class MapAssetNameToNonZeroInt64Error extends Data.TaggedError(
  "MapAssetNameToNonZeroInt64Error",
)<{
  message?: string;
}> {}

/**
 * Method free of MapAssetNameToNonZeroInt64
 *
 * @example
 * import { MapAssetNameToNonZeroInt64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapAssetNameToNonZeroInt64 instance
 * const instance = ... ;
 *   const result = yield* MapAssetNameToNonZeroInt64.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.MapAssetNameToNonZeroInt64,
  ): Effect.Effect<void, MapAssetNameToNonZeroInt64Error> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapAssetNameToNonZeroInt64Error({
          message: `MapAssetNameToNonZeroInt64.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { MapAssetNameToNonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapAssetNameToNonZeroInt64 instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapAssetNameToNonZeroInt64.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapAssetNameToNonZeroInt64.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.MapAssetNameToNonZeroInt64): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MapAssetNameToNonZeroInt64
 *
 * @example
 * import { MapAssetNameToNonZeroInt64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* MapAssetNameToNonZeroInt64._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MapAssetNameToNonZeroInt64.new(),
    catch: () =>
      new MapAssetNameToNonZeroInt64Error({
        message: `MapAssetNameToNonZeroInt64._new failed `,
      }),
  });
});

/**
 * Unsafely calls MapAssetNameToNonZeroInt64._new without Effect wrapper
 *
 * @example
 * import { MapAssetNameToNonZeroInt64 } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapAssetNameToNonZeroInt64.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapAssetNameToNonZeroInt64.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method len of MapAssetNameToNonZeroInt64
 *
 * @example
 * import { MapAssetNameToNonZeroInt64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapAssetNameToNonZeroInt64 instance
 * const instance = ... ;
 *   const result = yield* MapAssetNameToNonZeroInt64.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.MapAssetNameToNonZeroInt64,
  ): Effect.Effect<number, MapAssetNameToNonZeroInt64Error> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapAssetNameToNonZeroInt64Error({
          message: `MapAssetNameToNonZeroInt64.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { MapAssetNameToNonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapAssetNameToNonZeroInt64 instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapAssetNameToNonZeroInt64.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapAssetNameToNonZeroInt64.unsafeLen failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.MapAssetNameToNonZeroInt64): number =>
  Effect.runSync(len(instance));

/**
 * Method insert of MapAssetNameToNonZeroInt64
 *
 * @example
 * import { MapAssetNameToNonZeroInt64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapAssetNameToNonZeroInt64 instance
 * const instance = ... ;
 *   const result = yield* MapAssetNameToNonZeroInt64.insert(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const insert = Effect.fn(
  (
    instance: CML.MapAssetNameToNonZeroInt64,
    key: CML.AssetName,
    value: bigint,
  ): Effect.Effect<bigint | undefined, MapAssetNameToNonZeroInt64Error> =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapAssetNameToNonZeroInt64Error({
          message: `MapAssetNameToNonZeroInt64.insert failed with parameters: ${key} (AssetName), ${value}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.insert without Effect wrapper
 *
 * @example
 * import { MapAssetNameToNonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapAssetNameToNonZeroInt64 instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapAssetNameToNonZeroInt64.unsafeInsert(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapAssetNameToNonZeroInt64.unsafeInsert failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeInsert = (
  instance: CML.MapAssetNameToNonZeroInt64,
  key: CML.AssetName,
  value: bigint,
): bigint | undefined => Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapAssetNameToNonZeroInt64
 *
 * @example
 * import { MapAssetNameToNonZeroInt64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapAssetNameToNonZeroInt64 instance
 * const instance = ... ;
 *   const result = yield* MapAssetNameToNonZeroInt64.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.MapAssetNameToNonZeroInt64,
    key: CML.AssetName,
  ): Effect.Effect<bigint | undefined, MapAssetNameToNonZeroInt64Error> =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapAssetNameToNonZeroInt64Error({
          message: `MapAssetNameToNonZeroInt64.get failed with parameters: ${key} (AssetName). `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { MapAssetNameToNonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapAssetNameToNonZeroInt64 instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapAssetNameToNonZeroInt64.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapAssetNameToNonZeroInt64.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (
  instance: CML.MapAssetNameToNonZeroInt64,
  key: CML.AssetName,
): bigint | undefined => Effect.runSync(get(instance, key));

/**
 * Method keys of MapAssetNameToNonZeroInt64
 *
 * @example
 * import { MapAssetNameToNonZeroInt64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapAssetNameToNonZeroInt64 instance
 * const instance = ... ;
 *   const result = yield* MapAssetNameToNonZeroInt64.keys(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const keys = Effect.fn(
  (
    instance: CML.MapAssetNameToNonZeroInt64,
  ): Effect.Effect<CML.AssetNameList, MapAssetNameToNonZeroInt64Error> =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapAssetNameToNonZeroInt64Error({
          message: `MapAssetNameToNonZeroInt64.keys failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 *
 * @example
 * import { MapAssetNameToNonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapAssetNameToNonZeroInt64 instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapAssetNameToNonZeroInt64.unsafeKeys(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapAssetNameToNonZeroInt64.unsafeKeys failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKeys = (
  instance: CML.MapAssetNameToNonZeroInt64,
): CML.AssetNameList => Effect.runSync(keys(instance));

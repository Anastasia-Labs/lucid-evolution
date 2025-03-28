import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type MapRewardAccountToCoin = CML.MapRewardAccountToCoin;

export class MapRewardAccountToCoinError extends Data.TaggedError("MapRewardAccountToCoinError")<{
  message?: string;
}> {}

/**
 * Method free of MapRewardAccountToCoin
 * 
 * @example
 * import { MapRewardAccountToCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapRewardAccountToCoin instance
 * const instance = ... ;
 *   const result = yield* MapRewardAccountToCoin.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.MapRewardAccountToCoin): Effect.Effect<void, MapRewardAccountToCoinError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapRewardAccountToCoinError({
          message: `MapRewardAccountToCoin.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { MapRewardAccountToCoin } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapRewardAccountToCoin instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapRewardAccountToCoin.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRewardAccountToCoin.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.MapRewardAccountToCoin): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MapRewardAccountToCoin
 * 
 * @example
 * import { MapRewardAccountToCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* MapRewardAccountToCoin._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MapRewardAccountToCoin.new(),
    catch: () => new MapRewardAccountToCoinError({
      message: `MapRewardAccountToCoin._new failed `,
    }),
  });
});

/**
 * Unsafely calls MapRewardAccountToCoin._new without Effect wrapper
 * 
 * @example
 * import { MapRewardAccountToCoin } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapRewardAccountToCoin.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRewardAccountToCoin.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

/**
 * Method len of MapRewardAccountToCoin
 * 
 * @example
 * import { MapRewardAccountToCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapRewardAccountToCoin instance
 * const instance = ... ;
 *   const result = yield* MapRewardAccountToCoin.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.MapRewardAccountToCoin): Effect.Effect<number, MapRewardAccountToCoinError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapRewardAccountToCoinError({
          message: `MapRewardAccountToCoin.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { MapRewardAccountToCoin } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapRewardAccountToCoin instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapRewardAccountToCoin.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRewardAccountToCoin.unsafeLen failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.MapRewardAccountToCoin): number =>
  Effect.runSync(len(instance));

/**
 * Method insert of MapRewardAccountToCoin
 * 
 * @example
 * import { MapRewardAccountToCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapRewardAccountToCoin instance
 * const instance = ... ;
 *   const result = yield* MapRewardAccountToCoin.insert(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const insert = Effect.fn(
  (instance: CML.MapRewardAccountToCoin, key: CML.RewardAddress, value: bigint): Effect.Effect<bigint | undefined, MapRewardAccountToCoinError> =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapRewardAccountToCoinError({
          message: `MapRewardAccountToCoin.insert failed with parameters: ${key} (RewardAddress), ${value}. `,
        }),
    })
);

/**
 * Unsafely calls instance.insert without Effect wrapper
 * 
 * @example
 * import { MapRewardAccountToCoin } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapRewardAccountToCoin instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapRewardAccountToCoin.unsafeInsert(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRewardAccountToCoin.unsafeInsert failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeInsert = (instance: CML.MapRewardAccountToCoin, key: CML.RewardAddress, value: bigint): bigint | undefined =>
  Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapRewardAccountToCoin
 * 
 * @example
 * import { MapRewardAccountToCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapRewardAccountToCoin instance
 * const instance = ... ;
 *   const result = yield* MapRewardAccountToCoin.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.MapRewardAccountToCoin, key: CML.RewardAddress): Effect.Effect<bigint | undefined, MapRewardAccountToCoinError> =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapRewardAccountToCoinError({
          message: `MapRewardAccountToCoin.get failed with parameters: ${key} (RewardAddress). `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { MapRewardAccountToCoin } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapRewardAccountToCoin instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapRewardAccountToCoin.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRewardAccountToCoin.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.MapRewardAccountToCoin, key: CML.RewardAddress): bigint | undefined =>
  Effect.runSync(get(instance, key));

/**
 * Method keys of MapRewardAccountToCoin
 * 
 * @example
 * import { MapRewardAccountToCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapRewardAccountToCoin instance
 * const instance = ... ;
 *   const result = yield* MapRewardAccountToCoin.keys(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keys = Effect.fn(
  (instance: CML.MapRewardAccountToCoin): Effect.Effect<CML.RewardAccountList, MapRewardAccountToCoinError> =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapRewardAccountToCoinError({
          message: `MapRewardAccountToCoin.keys failed `,
        }),
    })
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 * 
 * @example
 * import { MapRewardAccountToCoin } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapRewardAccountToCoin instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapRewardAccountToCoin.unsafeKeys(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRewardAccountToCoin.unsafeKeys failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKeys = (instance: CML.MapRewardAccountToCoin): CML.RewardAccountList =>
  Effect.runSync(keys(instance));

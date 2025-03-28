import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type MapStakeCredentialToDeltaCoin = CML.MapStakeCredentialToDeltaCoin;

export class MapStakeCredentialToDeltaCoinError extends Data.TaggedError(
  "MapStakeCredentialToDeltaCoinError",
)<{
  message?: string;
}> {}

/**
 * Method free of MapStakeCredentialToDeltaCoin
 *
 * @example
 * import { MapStakeCredentialToDeltaCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapStakeCredentialToDeltaCoin instance
 * const instance = ... ;
 *   const result = yield* MapStakeCredentialToDeltaCoin.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.MapStakeCredentialToDeltaCoin,
  ): Effect.Effect<void, MapStakeCredentialToDeltaCoinError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapStakeCredentialToDeltaCoinError({
          message: `MapStakeCredentialToDeltaCoin.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { MapStakeCredentialToDeltaCoin } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapStakeCredentialToDeltaCoin instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapStakeCredentialToDeltaCoin.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapStakeCredentialToDeltaCoin.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.MapStakeCredentialToDeltaCoin): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MapStakeCredentialToDeltaCoin
 *
 * @example
 * import { MapStakeCredentialToDeltaCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* MapStakeCredentialToDeltaCoin._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MapStakeCredentialToDeltaCoin.new(),
    catch: () =>
      new MapStakeCredentialToDeltaCoinError({
        message: `MapStakeCredentialToDeltaCoin._new failed `,
      }),
  });
});

/**
 * Unsafely calls MapStakeCredentialToDeltaCoin._new without Effect wrapper
 *
 * @example
 * import { MapStakeCredentialToDeltaCoin } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapStakeCredentialToDeltaCoin.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapStakeCredentialToDeltaCoin.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method len of MapStakeCredentialToDeltaCoin
 *
 * @example
 * import { MapStakeCredentialToDeltaCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapStakeCredentialToDeltaCoin instance
 * const instance = ... ;
 *   const result = yield* MapStakeCredentialToDeltaCoin.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.MapStakeCredentialToDeltaCoin,
  ): Effect.Effect<number, MapStakeCredentialToDeltaCoinError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapStakeCredentialToDeltaCoinError({
          message: `MapStakeCredentialToDeltaCoin.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { MapStakeCredentialToDeltaCoin } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapStakeCredentialToDeltaCoin instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapStakeCredentialToDeltaCoin.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapStakeCredentialToDeltaCoin.unsafeLen failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (
  instance: CML.MapStakeCredentialToDeltaCoin,
): number => Effect.runSync(len(instance));

/**
 * Method insert of MapStakeCredentialToDeltaCoin
 *
 * @example
 * import { MapStakeCredentialToDeltaCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapStakeCredentialToDeltaCoin instance
 * const instance = ... ;
 *   const result = yield* MapStakeCredentialToDeltaCoin.insert(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const insert = Effect.fn(
  (
    instance: CML.MapStakeCredentialToDeltaCoin,
    key: CML.Credential,
    value: CML.Int,
  ): Effect.Effect<CML.Int | undefined, MapStakeCredentialToDeltaCoinError> =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapStakeCredentialToDeltaCoinError({
          message: `MapStakeCredentialToDeltaCoin.insert failed with parameters: ${key} (Credential), ${value} (Int). `,
        }),
    }),
);

/**
 * Unsafely calls instance.insert without Effect wrapper
 *
 * @example
 * import { MapStakeCredentialToDeltaCoin } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapStakeCredentialToDeltaCoin instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapStakeCredentialToDeltaCoin.unsafeInsert(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapStakeCredentialToDeltaCoin.unsafeInsert failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeInsert = (
  instance: CML.MapStakeCredentialToDeltaCoin,
  key: CML.Credential,
  value: CML.Int,
): CML.Int | undefined => Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapStakeCredentialToDeltaCoin
 *
 * @example
 * import { MapStakeCredentialToDeltaCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapStakeCredentialToDeltaCoin instance
 * const instance = ... ;
 *   const result = yield* MapStakeCredentialToDeltaCoin.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.MapStakeCredentialToDeltaCoin,
    key: CML.Credential,
  ): Effect.Effect<CML.Int | undefined, MapStakeCredentialToDeltaCoinError> =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapStakeCredentialToDeltaCoinError({
          message: `MapStakeCredentialToDeltaCoin.get failed with parameters: ${key} (Credential). `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { MapStakeCredentialToDeltaCoin } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapStakeCredentialToDeltaCoin instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapStakeCredentialToDeltaCoin.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapStakeCredentialToDeltaCoin.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (
  instance: CML.MapStakeCredentialToDeltaCoin,
  key: CML.Credential,
): CML.Int | undefined => Effect.runSync(get(instance, key));

/**
 * Method keys of MapStakeCredentialToDeltaCoin
 *
 * @example
 * import { MapStakeCredentialToDeltaCoin } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapStakeCredentialToDeltaCoin instance
 * const instance = ... ;
 *   const result = yield* MapStakeCredentialToDeltaCoin.keys(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const keys = Effect.fn(
  (
    instance: CML.MapStakeCredentialToDeltaCoin,
  ): Effect.Effect<
    CML.StakeCredentialList,
    MapStakeCredentialToDeltaCoinError
  > =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapStakeCredentialToDeltaCoinError({
          message: `MapStakeCredentialToDeltaCoin.keys failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 *
 * @example
 * import { MapStakeCredentialToDeltaCoin } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapStakeCredentialToDeltaCoin instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapStakeCredentialToDeltaCoin.unsafeKeys(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapStakeCredentialToDeltaCoin.unsafeKeys failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKeys = (
  instance: CML.MapStakeCredentialToDeltaCoin,
): CML.StakeCredentialList => Effect.runSync(keys(instance));

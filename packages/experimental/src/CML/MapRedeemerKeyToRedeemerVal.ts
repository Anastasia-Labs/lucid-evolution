import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type MapRedeemerKeyToRedeemerVal = CML.MapRedeemerKeyToRedeemerVal;

export class MapRedeemerKeyToRedeemerValError extends Data.TaggedError(
  "MapRedeemerKeyToRedeemerValError",
)<{
  message?: string;
}> {}

/**
 * Method free of MapRedeemerKeyToRedeemerVal
 *
 * @example
 * import { MapRedeemerKeyToRedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapRedeemerKeyToRedeemerVal instance
 * const instance = ... ;
 *   const result = yield* MapRedeemerKeyToRedeemerVal.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.MapRedeemerKeyToRedeemerVal,
  ): Effect.Effect<void, MapRedeemerKeyToRedeemerValError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapRedeemerKeyToRedeemerValError({
          message: `MapRedeemerKeyToRedeemerVal.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { MapRedeemerKeyToRedeemerVal } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapRedeemerKeyToRedeemerVal instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapRedeemerKeyToRedeemerVal.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRedeemerKeyToRedeemerVal.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.MapRedeemerKeyToRedeemerVal): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MapRedeemerKeyToRedeemerVal
 *
 * @example
 * import { MapRedeemerKeyToRedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* MapRedeemerKeyToRedeemerVal._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MapRedeemerKeyToRedeemerVal.new(),
    catch: () =>
      new MapRedeemerKeyToRedeemerValError({
        message: `MapRedeemerKeyToRedeemerVal._new failed `,
      }),
  });
});

/**
 * Unsafely calls MapRedeemerKeyToRedeemerVal._new without Effect wrapper
 *
 * @example
 * import { MapRedeemerKeyToRedeemerVal } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapRedeemerKeyToRedeemerVal.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRedeemerKeyToRedeemerVal.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method len of MapRedeemerKeyToRedeemerVal
 *
 * @example
 * import { MapRedeemerKeyToRedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapRedeemerKeyToRedeemerVal instance
 * const instance = ... ;
 *   const result = yield* MapRedeemerKeyToRedeemerVal.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.MapRedeemerKeyToRedeemerVal,
  ): Effect.Effect<number, MapRedeemerKeyToRedeemerValError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapRedeemerKeyToRedeemerValError({
          message: `MapRedeemerKeyToRedeemerVal.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { MapRedeemerKeyToRedeemerVal } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapRedeemerKeyToRedeemerVal instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapRedeemerKeyToRedeemerVal.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRedeemerKeyToRedeemerVal.unsafeLen failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.MapRedeemerKeyToRedeemerVal): number =>
  Effect.runSync(len(instance));

/**
 * Method insert of MapRedeemerKeyToRedeemerVal
 *
 * @example
 * import { MapRedeemerKeyToRedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapRedeemerKeyToRedeemerVal instance
 * const instance = ... ;
 *   const result = yield* MapRedeemerKeyToRedeemerVal.insert(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const insert = Effect.fn(
  (
    instance: CML.MapRedeemerKeyToRedeemerVal,
    key: CML.RedeemerKey,
    value: CML.RedeemerVal,
  ): Effect.Effect<
    CML.RedeemerVal | undefined,
    MapRedeemerKeyToRedeemerValError
  > =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapRedeemerKeyToRedeemerValError({
          message: `MapRedeemerKeyToRedeemerVal.insert failed with parameters: ${key} (RedeemerKey), ${value} (RedeemerVal). `,
        }),
    }),
);

/**
 * Unsafely calls instance.insert without Effect wrapper
 *
 * @example
 * import { MapRedeemerKeyToRedeemerVal } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapRedeemerKeyToRedeemerVal instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapRedeemerKeyToRedeemerVal.unsafeInsert(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRedeemerKeyToRedeemerVal.unsafeInsert failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeInsert = (
  instance: CML.MapRedeemerKeyToRedeemerVal,
  key: CML.RedeemerKey,
  value: CML.RedeemerVal,
): CML.RedeemerVal | undefined => Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapRedeemerKeyToRedeemerVal
 *
 * @example
 * import { MapRedeemerKeyToRedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapRedeemerKeyToRedeemerVal instance
 * const instance = ... ;
 *   const result = yield* MapRedeemerKeyToRedeemerVal.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.MapRedeemerKeyToRedeemerVal,
    key: CML.RedeemerKey,
  ): Effect.Effect<
    CML.RedeemerVal | undefined,
    MapRedeemerKeyToRedeemerValError
  > =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapRedeemerKeyToRedeemerValError({
          message: `MapRedeemerKeyToRedeemerVal.get failed with parameters: ${key} (RedeemerKey). `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { MapRedeemerKeyToRedeemerVal } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapRedeemerKeyToRedeemerVal instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapRedeemerKeyToRedeemerVal.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRedeemerKeyToRedeemerVal.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (
  instance: CML.MapRedeemerKeyToRedeemerVal,
  key: CML.RedeemerKey,
): CML.RedeemerVal | undefined => Effect.runSync(get(instance, key));

/**
 * Method keys of MapRedeemerKeyToRedeemerVal
 *
 * @example
 * import { MapRedeemerKeyToRedeemerVal } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapRedeemerKeyToRedeemerVal instance
 * const instance = ... ;
 *   const result = yield* MapRedeemerKeyToRedeemerVal.keys(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const keys = Effect.fn(
  (
    instance: CML.MapRedeemerKeyToRedeemerVal,
  ): Effect.Effect<CML.RedeemerKeyList, MapRedeemerKeyToRedeemerValError> =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapRedeemerKeyToRedeemerValError({
          message: `MapRedeemerKeyToRedeemerVal.keys failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 *
 * @example
 * import { MapRedeemerKeyToRedeemerVal } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapRedeemerKeyToRedeemerVal instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapRedeemerKeyToRedeemerVal.unsafeKeys(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRedeemerKeyToRedeemerVal.unsafeKeys failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKeys = (
  instance: CML.MapRedeemerKeyToRedeemerVal,
): CML.RedeemerKeyList => Effect.runSync(keys(instance));

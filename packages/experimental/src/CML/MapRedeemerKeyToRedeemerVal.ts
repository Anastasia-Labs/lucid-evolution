/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MapRedeemerKeyToRedeemerVal class
 *
 * @since 2.0.0
 * @category Types
 */
export type MapRedeemerKeyToRedeemerVal = CML.MapRedeemerKeyToRedeemerVal;

/**
 * Error class for MapRedeemerKeyToRedeemerVal operations
 * 
 * This error is thrown when operations on MapRedeemerKeyToRedeemerVal instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MapRedeemerKeyToRedeemerValError extends Data.TaggedError("MapRedeemerKeyToRedeemerValError")<{
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
  (instance: CML.MapRedeemerKeyToRedeemerVal): Effect.Effect<void, MapRedeemerKeyToRedeemerValError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapRedeemerKeyToRedeemerValError({
          message: `MapRedeemerKeyToRedeemerVal.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
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
 *   const result = MapRedeemerKeyToRedeemerVal.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRedeemerKeyToRedeemerVal.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MapRedeemerKeyToRedeemerVal): void =>
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
    catch: () => new MapRedeemerKeyToRedeemerValError({
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
 *   const result = MapRedeemerKeyToRedeemerVal._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRedeemerKeyToRedeemerVal._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () =>
  Effect.runSync(_new());

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
  (instance: CML.MapRedeemerKeyToRedeemerVal): Effect.Effect<number, MapRedeemerKeyToRedeemerValError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapRedeemerKeyToRedeemerValError({
          message: `MapRedeemerKeyToRedeemerVal.len failed `,
        }),
    })
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
 *   const result = MapRedeemerKeyToRedeemerVal.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRedeemerKeyToRedeemerVal.lenUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.MapRedeemerKeyToRedeemerVal): number =>
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
  (instance: CML.MapRedeemerKeyToRedeemerVal, key: CML.RedeemerKey, value: CML.RedeemerVal): Effect.Effect<CML.RedeemerVal | undefined, MapRedeemerKeyToRedeemerValError> =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapRedeemerKeyToRedeemerValError({
          message: `MapRedeemerKeyToRedeemerVal.insert failed with parameters: ${key} (RedeemerKey), ${value} (RedeemerVal). `,
        }),
    })
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
 *   const result = MapRedeemerKeyToRedeemerVal.insertUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRedeemerKeyToRedeemerVal.insertUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const insertUnsafe = (instance: CML.MapRedeemerKeyToRedeemerVal, key: CML.RedeemerKey, value: CML.RedeemerVal): CML.RedeemerVal | undefined =>
  Effect.runSync(insert(instance, key, value));

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
  (instance: CML.MapRedeemerKeyToRedeemerVal, key: CML.RedeemerKey): Effect.Effect<CML.RedeemerVal | undefined, MapRedeemerKeyToRedeemerValError> =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapRedeemerKeyToRedeemerValError({
          message: `MapRedeemerKeyToRedeemerVal.get failed with parameters: ${key} (RedeemerKey). `,
        }),
    })
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
 *   const result = MapRedeemerKeyToRedeemerVal.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRedeemerKeyToRedeemerVal.getUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.MapRedeemerKeyToRedeemerVal, key: CML.RedeemerKey): CML.RedeemerVal | undefined =>
  Effect.runSync(get(instance, key));

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
  (instance: CML.MapRedeemerKeyToRedeemerVal): Effect.Effect<CML.RedeemerKeyList, MapRedeemerKeyToRedeemerValError> =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapRedeemerKeyToRedeemerValError({
          message: `MapRedeemerKeyToRedeemerVal.keys failed `,
        }),
    })
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
 *   const result = MapRedeemerKeyToRedeemerVal.keysUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapRedeemerKeyToRedeemerVal.keysUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.MapRedeemerKeyToRedeemerVal): CML.RedeemerKeyList =>
  Effect.runSync(keys(instance));

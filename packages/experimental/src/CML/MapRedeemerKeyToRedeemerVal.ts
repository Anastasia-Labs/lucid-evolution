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
export class MapRedeemerKeyToRedeemerValError extends Data.TaggedError(
  "MapRedeemerKeyToRedeemerValError",
)<{
  message?: string;
}> {}

/**
 * Method free of MapRedeemerKeyToRedeemerVal
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.MapRedeemerKeyToRedeemerVal,
) => Effect.Effect<void, MapRedeemerKeyToRedeemerValError> = Effect.fn(
  (instance: CML.MapRedeemerKeyToRedeemerVal) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MapRedeemerKeyToRedeemerVal): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MapRedeemerKeyToRedeemerVal
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.MapRedeemerKeyToRedeemerVal,
  MapRedeemerKeyToRedeemerValError
> = Effect.fn(function* () {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.MapRedeemerKeyToRedeemerVal =>
  Effect.runSync(_new());

/**
 * Method len of MapRedeemerKeyToRedeemerVal
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.MapRedeemerKeyToRedeemerVal,
) => Effect.Effect<number, MapRedeemerKeyToRedeemerValError> = Effect.fn(
  (instance: CML.MapRedeemerKeyToRedeemerVal) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.MapRedeemerKeyToRedeemerVal): number =>
  Effect.runSync(len(instance));

/**
 * Method insert of MapRedeemerKeyToRedeemerVal
 *
 * @since 2.0.0
 * @category Methods
 */
export const insert: (
  instance: CML.MapRedeemerKeyToRedeemerVal,
  key: CML.RedeemerKey,
  value: CML.RedeemerVal,
) => Effect.Effect<
  CML.RedeemerVal | undefined,
  MapRedeemerKeyToRedeemerValError
> = Effect.fn(
  (
    instance: CML.MapRedeemerKeyToRedeemerVal,
    key: CML.RedeemerKey,
    value: CML.RedeemerVal,
  ) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const insertUnsafe = (
  instance: CML.MapRedeemerKeyToRedeemerVal,
  key: CML.RedeemerKey,
  value: CML.RedeemerVal,
): CML.RedeemerVal | undefined => Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapRedeemerKeyToRedeemerVal
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.MapRedeemerKeyToRedeemerVal,
  key: CML.RedeemerKey,
) => Effect.Effect<
  CML.RedeemerVal | undefined,
  MapRedeemerKeyToRedeemerValError
> = Effect.fn(
  (instance: CML.MapRedeemerKeyToRedeemerVal, key: CML.RedeemerKey) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.MapRedeemerKeyToRedeemerVal,
  key: CML.RedeemerKey,
): CML.RedeemerVal | undefined => Effect.runSync(get(instance, key));

/**
 * Method keys of MapRedeemerKeyToRedeemerVal
 *
 * @since 2.0.0
 * @category Methods
 */
export const keys: (
  instance: CML.MapRedeemerKeyToRedeemerVal,
) => Effect.Effect<CML.RedeemerKeyList, MapRedeemerKeyToRedeemerValError> =
  Effect.fn((instance: CML.MapRedeemerKeyToRedeemerVal) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (
  instance: CML.MapRedeemerKeyToRedeemerVal,
): CML.RedeemerKeyList => Effect.runSync(keys(instance));

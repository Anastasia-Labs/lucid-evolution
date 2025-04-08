/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MapU64ToArrI64 class
 *
 * @since 2.0.0
 * @category Types
 */
export type MapU64ToArrI64 = CML.MapU64ToArrI64;

/**
 * Error class for MapU64ToArrI64 operations
 *
 * This error is thrown when operations on MapU64ToArrI64 instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MapU64ToArrI64Error extends Data.TaggedError(
  "MapU64ToArrI64Error",
)<{
  message?: string;
}> {}

/**
 * Method free of MapU64ToArrI64
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.MapU64ToArrI64,
) => Effect.Effect<void, MapU64ToArrI64Error> = Effect.fn(
  (instance: CML.MapU64ToArrI64) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapU64ToArrI64Error({
          message: `MapU64ToArrI64.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MapU64ToArrI64): void =>
  Effect.runSync(free(instance));

/**
 * Method get of MapU64ToArrI64
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.MapU64ToArrI64,
  key: bigint,
) => Effect.Effect<BigInt64Array | undefined, MapU64ToArrI64Error> = Effect.fn(
  (instance: CML.MapU64ToArrI64, key: bigint) =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapU64ToArrI64Error({
          message: `MapU64ToArrI64.get failed with parameters: ${key}. `,
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
  instance: CML.MapU64ToArrI64,
  key: bigint,
): BigInt64Array | undefined => Effect.runSync(get(instance, key));

/**
 * Method insert of MapU64ToArrI64
 *
 * @since 2.0.0
 * @category Methods
 */
export const insert: (
  instance: CML.MapU64ToArrI64,
  key: bigint,
  value: BigInt64Array,
) => Effect.Effect<BigInt64Array | undefined, MapU64ToArrI64Error> = Effect.fn(
  (instance: CML.MapU64ToArrI64, key: bigint, value: BigInt64Array) =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapU64ToArrI64Error({
          message: `MapU64ToArrI64.insert failed with parameters: ${key}, ${value}. `,
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
  instance: CML.MapU64ToArrI64,
  key: bigint,
  value: BigInt64Array,
): BigInt64Array | undefined => Effect.runSync(insert(instance, key, value));

/**
 * Static method _new of MapU64ToArrI64
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.MapU64ToArrI64,
  MapU64ToArrI64Error
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MapU64ToArrI64.new(),
    catch: () =>
      new MapU64ToArrI64Error({
        message: `MapU64ToArrI64._new failed `,
      }),
  });
});

/**
 * Unsafely calls MapU64ToArrI64._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.MapU64ToArrI64 => Effect.runSync(_new());

/**
 * Method len of MapU64ToArrI64
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.MapU64ToArrI64,
) => Effect.Effect<number, MapU64ToArrI64Error> = Effect.fn(
  (instance: CML.MapU64ToArrI64) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapU64ToArrI64Error({
          message: `MapU64ToArrI64.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.MapU64ToArrI64): number =>
  Effect.runSync(len(instance));

/**
 * Method isEmpty of MapU64ToArrI64
 *
 * @since 2.0.0
 * @category Methods
 */
export const isEmpty: (
  instance: CML.MapU64ToArrI64,
) => Effect.Effect<boolean, MapU64ToArrI64Error> = Effect.fn(
  (instance: CML.MapU64ToArrI64) =>
    Effect.try({
      try: () => instance.is_empty(),
      catch: () =>
        new MapU64ToArrI64Error({
          message: `MapU64ToArrI64.isEmpty failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.isEmpty without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const isEmptyUnsafe = (instance: CML.MapU64ToArrI64): boolean =>
  Effect.runSync(isEmpty(instance));

/**
 * Method keys of MapU64ToArrI64
 *
 * @since 2.0.0
 * @category Methods
 */
export const keys: (
  instance: CML.MapU64ToArrI64,
) => Effect.Effect<BigUint64Array, MapU64ToArrI64Error> = Effect.fn(
  (instance: CML.MapU64ToArrI64) =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapU64ToArrI64Error({
          message: `MapU64ToArrI64.keys failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.MapU64ToArrI64): BigUint64Array =>
  Effect.runSync(keys(instance));

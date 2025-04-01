/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MapStakeCredentialToDeltaCoin class
 *
 * @since 2.0.0
 * @category Types
 */
export type MapStakeCredentialToDeltaCoin = CML.MapStakeCredentialToDeltaCoin;

/**
 * Error class for MapStakeCredentialToDeltaCoin operations
 *
 * This error is thrown when operations on MapStakeCredentialToDeltaCoin instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MapStakeCredentialToDeltaCoinError extends Data.TaggedError(
  "MapStakeCredentialToDeltaCoinError",
)<{
  message?: string;
}> {}

/**
 * Method free of MapStakeCredentialToDeltaCoin
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.MapStakeCredentialToDeltaCoin,
) => Effect.Effect<void, MapStakeCredentialToDeltaCoinError> = Effect.fn(
  (instance: CML.MapStakeCredentialToDeltaCoin) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MapStakeCredentialToDeltaCoin): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MapStakeCredentialToDeltaCoin
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.MapStakeCredentialToDeltaCoin,
  MapStakeCredentialToDeltaCoinError
> = Effect.fn(function* () {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.MapStakeCredentialToDeltaCoin =>
  Effect.runSync(_new());

/**
 * Method len of MapStakeCredentialToDeltaCoin
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.MapStakeCredentialToDeltaCoin,
) => Effect.Effect<number, MapStakeCredentialToDeltaCoinError> = Effect.fn(
  (instance: CML.MapStakeCredentialToDeltaCoin) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (
  instance: CML.MapStakeCredentialToDeltaCoin,
): number => Effect.runSync(len(instance));

/**
 * Method insert of MapStakeCredentialToDeltaCoin
 *
 * @since 2.0.0
 * @category Methods
 */
export const insert: (
  instance: CML.MapStakeCredentialToDeltaCoin,
  key: CML.Credential,
  value: CML.Int,
) => Effect.Effect<CML.Int | undefined, MapStakeCredentialToDeltaCoinError> =
  Effect.fn(
    (
      instance: CML.MapStakeCredentialToDeltaCoin,
      key: CML.Credential,
      value: CML.Int,
    ) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const insertUnsafe = (
  instance: CML.MapStakeCredentialToDeltaCoin,
  key: CML.Credential,
  value: CML.Int,
): CML.Int | undefined => Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapStakeCredentialToDeltaCoin
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.MapStakeCredentialToDeltaCoin,
  key: CML.Credential,
) => Effect.Effect<CML.Int | undefined, MapStakeCredentialToDeltaCoinError> =
  Effect.fn(
    (instance: CML.MapStakeCredentialToDeltaCoin, key: CML.Credential) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.MapStakeCredentialToDeltaCoin,
  key: CML.Credential,
): CML.Int | undefined => Effect.runSync(get(instance, key));

/**
 * Method keys of MapStakeCredentialToDeltaCoin
 *
 * @since 2.0.0
 * @category Methods
 */
export const keys: (
  instance: CML.MapStakeCredentialToDeltaCoin,
) => Effect.Effect<
  CML.StakeCredentialList,
  MapStakeCredentialToDeltaCoinError
> = Effect.fn((instance: CML.MapStakeCredentialToDeltaCoin) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (
  instance: CML.MapStakeCredentialToDeltaCoin,
): CML.StakeCredentialList => Effect.runSync(keys(instance));

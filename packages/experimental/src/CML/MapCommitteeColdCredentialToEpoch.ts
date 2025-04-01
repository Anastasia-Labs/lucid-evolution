/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MapCommitteeColdCredentialToEpoch class
 *
 * @since 2.0.0
 * @category Types
 */
export type MapCommitteeColdCredentialToEpoch = CML.MapCommitteeColdCredentialToEpoch;

/**
 * Error class for MapCommitteeColdCredentialToEpoch operations
 * 
 * This error is thrown when operations on MapCommitteeColdCredentialToEpoch instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MapCommitteeColdCredentialToEpochError extends Data.TaggedError("MapCommitteeColdCredentialToEpochError")<{
  message?: string;
}> {}

/**
 * Method free of MapCommitteeColdCredentialToEpoch
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.MapCommitteeColdCredentialToEpoch) => Effect.Effect<void, MapCommitteeColdCredentialToEpochError> = Effect.fn(
  (instance: CML.MapCommitteeColdCredentialToEpoch) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapCommitteeColdCredentialToEpochError({
          message: `MapCommitteeColdCredentialToEpoch.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MapCommitteeColdCredentialToEpoch): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MapCommitteeColdCredentialToEpoch
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.MapCommitteeColdCredentialToEpoch, MapCommitteeColdCredentialToEpochError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MapCommitteeColdCredentialToEpoch.new(),
    catch: () => new MapCommitteeColdCredentialToEpochError({
      message: `MapCommitteeColdCredentialToEpoch._new failed `,
    }),
  });
});

/**
 * Unsafely calls MapCommitteeColdCredentialToEpoch._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.MapCommitteeColdCredentialToEpoch =>
  Effect.runSync(_new());

/**
 * Method len of MapCommitteeColdCredentialToEpoch
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.MapCommitteeColdCredentialToEpoch) => Effect.Effect<number, MapCommitteeColdCredentialToEpochError> = Effect.fn(
  (instance: CML.MapCommitteeColdCredentialToEpoch) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapCommitteeColdCredentialToEpochError({
          message: `MapCommitteeColdCredentialToEpoch.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.MapCommitteeColdCredentialToEpoch): number =>
  Effect.runSync(len(instance));

/**
 * Method insert of MapCommitteeColdCredentialToEpoch
 * 
 * @since 2.0.0
 * @category Methods
 */
export const insert: (instance: CML.MapCommitteeColdCredentialToEpoch, key: CML.Credential, value: bigint) => Effect.Effect<bigint | undefined, MapCommitteeColdCredentialToEpochError> = Effect.fn(
  (instance: CML.MapCommitteeColdCredentialToEpoch, key: CML.Credential, value: bigint) =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapCommitteeColdCredentialToEpochError({
          message: `MapCommitteeColdCredentialToEpoch.insert failed with parameters: ${key} (Credential), ${value}. `,
        }),
    })
);

/**
 * Unsafely calls instance.insert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const insertUnsafe = (instance: CML.MapCommitteeColdCredentialToEpoch, key: CML.Credential, value: bigint): bigint | undefined =>
  Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapCommitteeColdCredentialToEpoch
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.MapCommitteeColdCredentialToEpoch, key: CML.Credential) => Effect.Effect<bigint | undefined, MapCommitteeColdCredentialToEpochError> = Effect.fn(
  (instance: CML.MapCommitteeColdCredentialToEpoch, key: CML.Credential) =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapCommitteeColdCredentialToEpochError({
          message: `MapCommitteeColdCredentialToEpoch.get failed with parameters: ${key} (Credential). `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.MapCommitteeColdCredentialToEpoch, key: CML.Credential): bigint | undefined =>
  Effect.runSync(get(instance, key));

/**
 * Method keys of MapCommitteeColdCredentialToEpoch
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keys: (instance: CML.MapCommitteeColdCredentialToEpoch) => Effect.Effect<CML.CommitteeColdCredentialList, MapCommitteeColdCredentialToEpochError> = Effect.fn(
  (instance: CML.MapCommitteeColdCredentialToEpoch) =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapCommitteeColdCredentialToEpochError({
          message: `MapCommitteeColdCredentialToEpoch.keys failed `,
        }),
    })
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.MapCommitteeColdCredentialToEpoch): CML.CommitteeColdCredentialList =>
  Effect.runSync(keys(instance));

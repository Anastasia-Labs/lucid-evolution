/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MapGovActionIdToVotingProcedure class
 *
 * @since 2.0.0
 * @category Types
 */
export type MapGovActionIdToVotingProcedure = CML.MapGovActionIdToVotingProcedure;

/**
 * Error class for MapGovActionIdToVotingProcedure operations
 * 
 * This error is thrown when operations on MapGovActionIdToVotingProcedure instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MapGovActionIdToVotingProcedureError extends Data.TaggedError("MapGovActionIdToVotingProcedureError")<{
  message?: string;
}> {}

/**
 * Method free of MapGovActionIdToVotingProcedure
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.MapGovActionIdToVotingProcedure) => Effect.Effect<void, MapGovActionIdToVotingProcedureError> = Effect.fn(
  (instance: CML.MapGovActionIdToVotingProcedure) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapGovActionIdToVotingProcedureError({
          message: `MapGovActionIdToVotingProcedure.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MapGovActionIdToVotingProcedure): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MapGovActionIdToVotingProcedure
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.MapGovActionIdToVotingProcedure, MapGovActionIdToVotingProcedureError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MapGovActionIdToVotingProcedure.new(),
    catch: () => new MapGovActionIdToVotingProcedureError({
      message: `MapGovActionIdToVotingProcedure._new failed `,
    }),
  });
});

/**
 * Unsafely calls MapGovActionIdToVotingProcedure._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.MapGovActionIdToVotingProcedure =>
  Effect.runSync(_new());

/**
 * Method len of MapGovActionIdToVotingProcedure
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.MapGovActionIdToVotingProcedure) => Effect.Effect<number, MapGovActionIdToVotingProcedureError> = Effect.fn(
  (instance: CML.MapGovActionIdToVotingProcedure) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapGovActionIdToVotingProcedureError({
          message: `MapGovActionIdToVotingProcedure.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.MapGovActionIdToVotingProcedure): number =>
  Effect.runSync(len(instance));

/**
 * Method insert of MapGovActionIdToVotingProcedure
 * 
 * @since 2.0.0
 * @category Methods
 */
export const insert: (instance: CML.MapGovActionIdToVotingProcedure, key: CML.GovActionId, value: CML.VotingProcedure) => Effect.Effect<CML.VotingProcedure | undefined, MapGovActionIdToVotingProcedureError> = Effect.fn(
  (instance: CML.MapGovActionIdToVotingProcedure, key: CML.GovActionId, value: CML.VotingProcedure) =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapGovActionIdToVotingProcedureError({
          message: `MapGovActionIdToVotingProcedure.insert failed with parameters: ${key} (GovActionId), ${value} (VotingProcedure). `,
        }),
    })
);

/**
 * Unsafely calls instance.insert without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const insertUnsafe = (instance: CML.MapGovActionIdToVotingProcedure, key: CML.GovActionId, value: CML.VotingProcedure): CML.VotingProcedure | undefined =>
  Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapGovActionIdToVotingProcedure
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.MapGovActionIdToVotingProcedure, key: CML.GovActionId) => Effect.Effect<CML.VotingProcedure | undefined, MapGovActionIdToVotingProcedureError> = Effect.fn(
  (instance: CML.MapGovActionIdToVotingProcedure, key: CML.GovActionId) =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapGovActionIdToVotingProcedureError({
          message: `MapGovActionIdToVotingProcedure.get failed with parameters: ${key} (GovActionId). `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.MapGovActionIdToVotingProcedure, key: CML.GovActionId): CML.VotingProcedure | undefined =>
  Effect.runSync(get(instance, key));

/**
 * Method keys of MapGovActionIdToVotingProcedure
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keys: (instance: CML.MapGovActionIdToVotingProcedure) => Effect.Effect<CML.GovActionIdList, MapGovActionIdToVotingProcedureError> = Effect.fn(
  (instance: CML.MapGovActionIdToVotingProcedure) =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapGovActionIdToVotingProcedureError({
          message: `MapGovActionIdToVotingProcedure.keys failed `,
        }),
    })
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.MapGovActionIdToVotingProcedure): CML.GovActionIdList =>
  Effect.runSync(keys(instance));

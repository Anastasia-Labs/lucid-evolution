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
export type MapGovActionIdToVotingProcedure =
  CML.MapGovActionIdToVotingProcedure;

/**
 * Error class for MapGovActionIdToVotingProcedure operations
 *
 * This error is thrown when operations on MapGovActionIdToVotingProcedure instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MapGovActionIdToVotingProcedureError extends Data.TaggedError(
  "MapGovActionIdToVotingProcedureError",
)<{
  message?: string;
}> {}

/**
 * Method free of MapGovActionIdToVotingProcedure
 *
 * @example
 * import { MapGovActionIdToVotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapGovActionIdToVotingProcedure instance
 * const instance = ... ;
 *   const result = yield* MapGovActionIdToVotingProcedure.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.MapGovActionIdToVotingProcedure,
  ): Effect.Effect<void, MapGovActionIdToVotingProcedureError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MapGovActionIdToVotingProcedureError({
          message: `MapGovActionIdToVotingProcedure.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { MapGovActionIdToVotingProcedure } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapGovActionIdToVotingProcedure instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapGovActionIdToVotingProcedure.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapGovActionIdToVotingProcedure.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (
  instance: CML.MapGovActionIdToVotingProcedure,
): void => Effect.runSync(free(instance));

/**
 * Static method _new of MapGovActionIdToVotingProcedure
 *
 * @example
 * import { MapGovActionIdToVotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* MapGovActionIdToVotingProcedure._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MapGovActionIdToVotingProcedure.new(),
    catch: () =>
      new MapGovActionIdToVotingProcedureError({
        message: `MapGovActionIdToVotingProcedure._new failed `,
      }),
  });
});

/**
 * Unsafely calls MapGovActionIdToVotingProcedure._new without Effect wrapper
 *
 * @example
 * import { MapGovActionIdToVotingProcedure } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapGovActionIdToVotingProcedure._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapGovActionIdToVotingProcedure._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () => Effect.runSync(_new());

/**
 * Method len of MapGovActionIdToVotingProcedure
 *
 * @example
 * import { MapGovActionIdToVotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapGovActionIdToVotingProcedure instance
 * const instance = ... ;
 *   const result = yield* MapGovActionIdToVotingProcedure.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.MapGovActionIdToVotingProcedure,
  ): Effect.Effect<number, MapGovActionIdToVotingProcedureError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MapGovActionIdToVotingProcedureError({
          message: `MapGovActionIdToVotingProcedure.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { MapGovActionIdToVotingProcedure } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapGovActionIdToVotingProcedure instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapGovActionIdToVotingProcedure.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapGovActionIdToVotingProcedure.lenUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (
  instance: CML.MapGovActionIdToVotingProcedure,
): number => Effect.runSync(len(instance));

/**
 * Method insert of MapGovActionIdToVotingProcedure
 *
 * @example
 * import { MapGovActionIdToVotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapGovActionIdToVotingProcedure instance
 * const instance = ... ;
 *   const result = yield* MapGovActionIdToVotingProcedure.insert(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const insert = Effect.fn(
  (
    instance: CML.MapGovActionIdToVotingProcedure,
    key: CML.GovActionId,
    value: CML.VotingProcedure,
  ): Effect.Effect<
    CML.VotingProcedure | undefined,
    MapGovActionIdToVotingProcedureError
  > =>
    Effect.try({
      try: () => instance.insert(key, value),
      catch: () =>
        new MapGovActionIdToVotingProcedureError({
          message: `MapGovActionIdToVotingProcedure.insert failed with parameters: ${key} (GovActionId), ${value} (VotingProcedure). `,
        }),
    }),
);

/**
 * Unsafely calls instance.insert without Effect wrapper
 *
 * @example
 * import { MapGovActionIdToVotingProcedure } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapGovActionIdToVotingProcedure instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapGovActionIdToVotingProcedure.insertUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapGovActionIdToVotingProcedure.insertUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const insertUnsafe = (
  instance: CML.MapGovActionIdToVotingProcedure,
  key: CML.GovActionId,
  value: CML.VotingProcedure,
): CML.VotingProcedure | undefined =>
  Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapGovActionIdToVotingProcedure
 *
 * @example
 * import { MapGovActionIdToVotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapGovActionIdToVotingProcedure instance
 * const instance = ... ;
 *   const result = yield* MapGovActionIdToVotingProcedure.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.MapGovActionIdToVotingProcedure,
    key: CML.GovActionId,
  ): Effect.Effect<
    CML.VotingProcedure | undefined,
    MapGovActionIdToVotingProcedureError
  > =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new MapGovActionIdToVotingProcedureError({
          message: `MapGovActionIdToVotingProcedure.get failed with parameters: ${key} (GovActionId). `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { MapGovActionIdToVotingProcedure } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapGovActionIdToVotingProcedure instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapGovActionIdToVotingProcedure.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapGovActionIdToVotingProcedure.getUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.MapGovActionIdToVotingProcedure,
  key: CML.GovActionId,
): CML.VotingProcedure | undefined => Effect.runSync(get(instance, key));

/**
 * Method keys of MapGovActionIdToVotingProcedure
 *
 * @example
 * import { MapGovActionIdToVotingProcedure } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapGovActionIdToVotingProcedure instance
 * const instance = ... ;
 *   const result = yield* MapGovActionIdToVotingProcedure.keys(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const keys = Effect.fn(
  (
    instance: CML.MapGovActionIdToVotingProcedure,
  ): Effect.Effect<CML.GovActionIdList, MapGovActionIdToVotingProcedureError> =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new MapGovActionIdToVotingProcedureError({
          message: `MapGovActionIdToVotingProcedure.keys failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 *
 * @example
 * import { MapGovActionIdToVotingProcedure } from "@lucid-evolution/experimental";
 *
 * // Assume we have a MapGovActionIdToVotingProcedure instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = MapGovActionIdToVotingProcedure.keysUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapGovActionIdToVotingProcedure.keysUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (
  instance: CML.MapGovActionIdToVotingProcedure,
): CML.GovActionIdList => Effect.runSync(keys(instance));

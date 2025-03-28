import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type MapCommitteeColdCredentialToEpoch = CML.MapCommitteeColdCredentialToEpoch;

export class MapCommitteeColdCredentialToEpochError extends Data.TaggedError("MapCommitteeColdCredentialToEpochError")<{
  message?: string;
}> {}

/**
 * Method free of MapCommitteeColdCredentialToEpoch
 * 
 * @example
 * import { MapCommitteeColdCredentialToEpoch } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapCommitteeColdCredentialToEpoch instance
 * const instance = ... ;
 *   const result = yield* MapCommitteeColdCredentialToEpoch.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.MapCommitteeColdCredentialToEpoch): Effect.Effect<void, MapCommitteeColdCredentialToEpochError> =>
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
 * @example
 * import { MapCommitteeColdCredentialToEpoch } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapCommitteeColdCredentialToEpoch instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapCommitteeColdCredentialToEpoch.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapCommitteeColdCredentialToEpoch.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.MapCommitteeColdCredentialToEpoch): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MapCommitteeColdCredentialToEpoch
 * 
 * @example
 * import { MapCommitteeColdCredentialToEpoch } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* MapCommitteeColdCredentialToEpoch._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
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
 * @example
 * import { MapCommitteeColdCredentialToEpoch } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapCommitteeColdCredentialToEpoch.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapCommitteeColdCredentialToEpoch.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

/**
 * Method len of MapCommitteeColdCredentialToEpoch
 * 
 * @example
 * import { MapCommitteeColdCredentialToEpoch } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapCommitteeColdCredentialToEpoch instance
 * const instance = ... ;
 *   const result = yield* MapCommitteeColdCredentialToEpoch.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.MapCommitteeColdCredentialToEpoch): Effect.Effect<number, MapCommitteeColdCredentialToEpochError> =>
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
 * @example
 * import { MapCommitteeColdCredentialToEpoch } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapCommitteeColdCredentialToEpoch instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapCommitteeColdCredentialToEpoch.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapCommitteeColdCredentialToEpoch.unsafeLen failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.MapCommitteeColdCredentialToEpoch): number =>
  Effect.runSync(len(instance));

/**
 * Method insert of MapCommitteeColdCredentialToEpoch
 * 
 * @example
 * import { MapCommitteeColdCredentialToEpoch } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapCommitteeColdCredentialToEpoch instance
 * const instance = ... ;
 *   const result = yield* MapCommitteeColdCredentialToEpoch.insert(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const insert = Effect.fn(
  (instance: CML.MapCommitteeColdCredentialToEpoch, key: CML.Credential, value: bigint): Effect.Effect<bigint | undefined, MapCommitteeColdCredentialToEpochError> =>
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
 * @example
 * import { MapCommitteeColdCredentialToEpoch } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapCommitteeColdCredentialToEpoch instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapCommitteeColdCredentialToEpoch.unsafeInsert(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapCommitteeColdCredentialToEpoch.unsafeInsert failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeInsert = (instance: CML.MapCommitteeColdCredentialToEpoch, key: CML.Credential, value: bigint): bigint | undefined =>
  Effect.runSync(insert(instance, key, value));

/**
 * Method get of MapCommitteeColdCredentialToEpoch
 * 
 * @example
 * import { MapCommitteeColdCredentialToEpoch } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapCommitteeColdCredentialToEpoch instance
 * const instance = ... ;
 *   const result = yield* MapCommitteeColdCredentialToEpoch.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.MapCommitteeColdCredentialToEpoch, key: CML.Credential): Effect.Effect<bigint | undefined, MapCommitteeColdCredentialToEpochError> =>
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
 * @example
 * import { MapCommitteeColdCredentialToEpoch } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapCommitteeColdCredentialToEpoch instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapCommitteeColdCredentialToEpoch.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapCommitteeColdCredentialToEpoch.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.MapCommitteeColdCredentialToEpoch, key: CML.Credential): bigint | undefined =>
  Effect.runSync(get(instance, key));

/**
 * Method keys of MapCommitteeColdCredentialToEpoch
 * 
 * @example
 * import { MapCommitteeColdCredentialToEpoch } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MapCommitteeColdCredentialToEpoch instance
 * const instance = ... ;
 *   const result = yield* MapCommitteeColdCredentialToEpoch.keys(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keys = Effect.fn(
  (instance: CML.MapCommitteeColdCredentialToEpoch): Effect.Effect<CML.CommitteeColdCredentialList, MapCommitteeColdCredentialToEpochError> =>
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
 * @example
 * import { MapCommitteeColdCredentialToEpoch } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MapCommitteeColdCredentialToEpoch instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MapCommitteeColdCredentialToEpoch.unsafeKeys(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MapCommitteeColdCredentialToEpoch.unsafeKeys failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKeys = (instance: CML.MapCommitteeColdCredentialToEpoch): CML.CommitteeColdCredentialList =>
  Effect.runSync(keys(instance));

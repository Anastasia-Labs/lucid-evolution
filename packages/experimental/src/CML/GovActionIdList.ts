import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type GovActionIdList = CML.GovActionIdList;

export class GovActionIdListError extends Data.TaggedError("GovActionIdListError")<{
  message?: string;
}> {}

/**
 * Method free of GovActionIdList
 * 
 * @example
 * import { GovActionIdList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovActionIdList instance
 * const instance = ... ;
 *   const result = yield* GovActionIdList.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.GovActionIdList): Effect.Effect<void, GovActionIdListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new GovActionIdListError({
          message: `GovActionIdList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { GovActionIdList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovActionIdList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionIdList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionIdList.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.GovActionIdList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of GovActionIdList
 * 
 * @example
 * import { GovActionIdList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* GovActionIdList._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.GovActionIdList.new(),
    catch: () => new GovActionIdListError({
      message: `GovActionIdList._new failed `,
    }),
  });
});

/**
 * Unsafely calls GovActionIdList._new without Effect wrapper
 * 
 * @example
 * import { GovActionIdList } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionIdList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionIdList.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

/**
 * Method len of GovActionIdList
 * 
 * @example
 * import { GovActionIdList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovActionIdList instance
 * const instance = ... ;
 *   const result = yield* GovActionIdList.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.GovActionIdList): Effect.Effect<number, GovActionIdListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new GovActionIdListError({
          message: `GovActionIdList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { GovActionIdList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovActionIdList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionIdList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionIdList.unsafeLen failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.GovActionIdList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of GovActionIdList
 * 
 * @example
 * import { GovActionIdList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovActionIdList instance
 * const instance = ... ;
 *   const result = yield* GovActionIdList.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.GovActionIdList, index: number): Effect.Effect<CML.GovActionId, GovActionIdListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new GovActionIdListError({
          message: `GovActionIdList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { GovActionIdList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovActionIdList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionIdList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionIdList.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.GovActionIdList, index: number): CML.GovActionId =>
  Effect.runSync(get(instance, index));

/**
 * Method add of GovActionIdList
 * 
 * @example
 * import { GovActionIdList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GovActionIdList instance
 * const instance = ... ;
 *   const result = yield* GovActionIdList.add(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (instance: CML.GovActionIdList, elem: CML.GovActionId): Effect.Effect<void, GovActionIdListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new GovActionIdListError({
          message: `GovActionIdList.add failed with parameters: ${elem} (GovActionId). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @example
 * import { GovActionIdList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GovActionIdList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GovActionIdList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GovActionIdList.unsafeAdd failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (instance: CML.GovActionIdList, elem: CML.GovActionId): void =>
  Effect.runSync(add(instance, elem));

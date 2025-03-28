import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type LegacyRedeemerList = CML.LegacyRedeemerList;

export class LegacyRedeemerListError extends Data.TaggedError("LegacyRedeemerListError")<{
  message?: string;
}> {}

/**
 * Method free of LegacyRedeemerList
 * 
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemerList instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemerList.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.LegacyRedeemerList): Effect.Effect<void, LegacyRedeemerListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new LegacyRedeemerListError({
          message: `LegacyRedeemerList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyRedeemerList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemerList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemerList.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.LegacyRedeemerList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of LegacyRedeemerList
 * 
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* LegacyRedeemerList._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.LegacyRedeemerList.new(),
    catch: () => new LegacyRedeemerListError({
      message: `LegacyRedeemerList._new failed `,
    }),
  });
});

/**
 * Unsafely calls LegacyRedeemerList._new without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemerList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemerList.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

/**
 * Method len of LegacyRedeemerList
 * 
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemerList instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemerList.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.LegacyRedeemerList): Effect.Effect<number, LegacyRedeemerListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new LegacyRedeemerListError({
          message: `LegacyRedeemerList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyRedeemerList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemerList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemerList.unsafeLen failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.LegacyRedeemerList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of LegacyRedeemerList
 * 
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemerList instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemerList.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.LegacyRedeemerList, index: number): Effect.Effect<CML.LegacyRedeemer, LegacyRedeemerListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new LegacyRedeemerListError({
          message: `LegacyRedeemerList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyRedeemerList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemerList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemerList.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.LegacyRedeemerList, index: number): CML.LegacyRedeemer =>
  Effect.runSync(get(instance, index));

/**
 * Method add of LegacyRedeemerList
 * 
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a LegacyRedeemerList instance
 * const instance = ... ;
 *   const result = yield* LegacyRedeemerList.add(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (instance: CML.LegacyRedeemerList, elem: CML.LegacyRedeemer): Effect.Effect<void, LegacyRedeemerListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new LegacyRedeemerListError({
          message: `LegacyRedeemerList.add failed with parameters: ${elem} (LegacyRedeemer). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @example
 * import { LegacyRedeemerList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a LegacyRedeemerList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = LegacyRedeemerList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`LegacyRedeemerList.unsafeAdd failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (instance: CML.LegacyRedeemerList, elem: CML.LegacyRedeemer): void =>
  Effect.runSync(add(instance, elem));

import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type RelayList = CML.RelayList;

export class RelayListError extends Data.TaggedError("RelayListError")<{
  message?: string;
}> {}

/**
 * Method free of RelayList
 * 
 * @example
 * import { RelayList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RelayList instance
 * const instance = ... ;
 *   const result = yield* RelayList.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.RelayList): Effect.Effect<void, RelayListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RelayListError({
          message: `RelayList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { RelayList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RelayList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RelayList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RelayList.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.RelayList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of RelayList
 * 
 * @example
 * import { RelayList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* RelayList._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.RelayList.new(),
    catch: () => new RelayListError({
      message: `RelayList._new failed `,
    }),
  });
});

/**
 * Unsafely calls RelayList._new without Effect wrapper
 * 
 * @example
 * import { RelayList } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RelayList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RelayList.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

/**
 * Method len of RelayList
 * 
 * @example
 * import { RelayList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RelayList instance
 * const instance = ... ;
 *   const result = yield* RelayList.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.RelayList): Effect.Effect<number, RelayListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new RelayListError({
          message: `RelayList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { RelayList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RelayList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RelayList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RelayList.unsafeLen failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.RelayList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of RelayList
 * 
 * @example
 * import { RelayList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RelayList instance
 * const instance = ... ;
 *   const result = yield* RelayList.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.RelayList, index: number): Effect.Effect<CML.Relay, RelayListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new RelayListError({
          message: `RelayList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { RelayList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RelayList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RelayList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RelayList.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.RelayList, index: number): CML.Relay =>
  Effect.runSync(get(instance, index));

/**
 * Method add of RelayList
 * 
 * @example
 * import { RelayList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RelayList instance
 * const instance = ... ;
 *   const result = yield* RelayList.add(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (instance: CML.RelayList, elem: CML.Relay): Effect.Effect<void, RelayListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new RelayListError({
          message: `RelayList.add failed with parameters: ${elem} (Relay). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @example
 * import { RelayList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RelayList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RelayList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RelayList.unsafeAdd failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (instance: CML.RelayList, elem: CML.Relay): void =>
  Effect.runSync(add(instance, elem));

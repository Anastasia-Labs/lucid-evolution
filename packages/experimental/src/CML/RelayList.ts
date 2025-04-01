/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML RelayList class
 *
 * @since 2.0.0
 * @category Types
 */
export type RelayList = CML.RelayList;

/**
 * Error class for RelayList operations
 *
 * This error is thrown when operations on RelayList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
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
    }),
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
 *   const result = RelayList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RelayList.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.RelayList): void =>
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
    catch: () =>
      new RelayListError({
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
 *   const result = RelayList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RelayList._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () => Effect.runSync(_new());

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
    }),
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
 *   const result = RelayList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RelayList.lenUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.RelayList): number =>
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
  (
    instance: CML.RelayList,
    index: number,
  ): Effect.Effect<CML.Relay, RelayListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new RelayListError({
          message: `RelayList.get failed with parameters: ${index}. `,
        }),
    }),
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
 *   const result = RelayList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RelayList.getUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.RelayList, index: number): CML.Relay =>
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
  (
    instance: CML.RelayList,
    elem: CML.Relay,
  ): Effect.Effect<void, RelayListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new RelayListError({
          message: `RelayList.add failed with parameters: ${elem} (Relay). `,
        }),
    }),
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
 *   const result = RelayList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RelayList.addUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.RelayList, elem: CML.Relay): void =>
  Effect.runSync(add(instance, elem));

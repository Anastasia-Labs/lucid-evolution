/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Ed25519KeyHashList class
 *
 * @since 2.0.0
 * @category Types
 */
export type Ed25519KeyHashList = CML.Ed25519KeyHashList;

/**
 * Error class for Ed25519KeyHashList operations
 * 
 * This error is thrown when operations on Ed25519KeyHashList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class Ed25519KeyHashListError extends Data.TaggedError("Ed25519KeyHashListError")<{
  message?: string;
}> {}

/**
 * Method free of Ed25519KeyHashList
 * 
 * @example
 * import { Ed25519KeyHashList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ed25519KeyHashList instance
 * const instance = ... ;
 *   const result = yield* Ed25519KeyHashList.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Ed25519KeyHashList): Effect.Effect<void, Ed25519KeyHashListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new Ed25519KeyHashListError({
          message: `Ed25519KeyHashList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { Ed25519KeyHashList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ed25519KeyHashList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ed25519KeyHashList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ed25519KeyHashList.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Ed25519KeyHashList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of Ed25519KeyHashList
 * 
 * @example
 * import { Ed25519KeyHashList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Ed25519KeyHashList._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.Ed25519KeyHashList.new(),
    catch: () => new Ed25519KeyHashListError({
      message: `Ed25519KeyHashList._new failed `,
    }),
  });
});

/**
 * Unsafely calls Ed25519KeyHashList._new without Effect wrapper
 * 
 * @example
 * import { Ed25519KeyHashList } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ed25519KeyHashList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ed25519KeyHashList._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () =>
  Effect.runSync(_new());

/**
 * Method len of Ed25519KeyHashList
 * 
 * @example
 * import { Ed25519KeyHashList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ed25519KeyHashList instance
 * const instance = ... ;
 *   const result = yield* Ed25519KeyHashList.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.Ed25519KeyHashList): Effect.Effect<number, Ed25519KeyHashListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new Ed25519KeyHashListError({
          message: `Ed25519KeyHashList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { Ed25519KeyHashList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ed25519KeyHashList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ed25519KeyHashList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ed25519KeyHashList.lenUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.Ed25519KeyHashList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of Ed25519KeyHashList
 * 
 * @example
 * import { Ed25519KeyHashList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ed25519KeyHashList instance
 * const instance = ... ;
 *   const result = yield* Ed25519KeyHashList.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.Ed25519KeyHashList, index: number): Effect.Effect<CML.Ed25519KeyHash, Ed25519KeyHashListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new Ed25519KeyHashListError({
          message: `Ed25519KeyHashList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { Ed25519KeyHashList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ed25519KeyHashList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ed25519KeyHashList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ed25519KeyHashList.getUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.Ed25519KeyHashList, index: number): CML.Ed25519KeyHash =>
  Effect.runSync(get(instance, index));

/**
 * Method add of Ed25519KeyHashList
 * 
 * @example
 * import { Ed25519KeyHashList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ed25519KeyHashList instance
 * const instance = ... ;
 *   const result = yield* Ed25519KeyHashList.add(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (instance: CML.Ed25519KeyHashList, elem: CML.Ed25519KeyHash): Effect.Effect<void, Ed25519KeyHashListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new Ed25519KeyHashListError({
          message: `Ed25519KeyHashList.add failed with parameters: ${elem} (Ed25519KeyHash). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @example
 * import { Ed25519KeyHashList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ed25519KeyHashList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ed25519KeyHashList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ed25519KeyHashList.addUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.Ed25519KeyHashList, elem: CML.Ed25519KeyHash): void =>
  Effect.runSync(add(instance, elem));

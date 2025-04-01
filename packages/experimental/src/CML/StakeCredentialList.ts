/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML StakeCredentialList class
 *
 * @since 2.0.0
 * @category Types
 */
export type StakeCredentialList = CML.StakeCredentialList;

/**
 * Error class for StakeCredentialList operations
 *
 * This error is thrown when operations on StakeCredentialList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class StakeCredentialListError extends Data.TaggedError(
  "StakeCredentialListError",
)<{
  message?: string;
}> {}

/**
 * Method free of StakeCredentialList
 *
 * @example
 * import { StakeCredentialList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeCredentialList instance
 * const instance = ... ;
 *   const result = yield* StakeCredentialList.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.StakeCredentialList,
  ): Effect.Effect<void, StakeCredentialListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new StakeCredentialListError({
          message: `StakeCredentialList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { StakeCredentialList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeCredentialList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeCredentialList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeCredentialList.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.StakeCredentialList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of StakeCredentialList
 *
 * @example
 * import { StakeCredentialList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* StakeCredentialList._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.StakeCredentialList.new(),
    catch: () =>
      new StakeCredentialListError({
        message: `StakeCredentialList._new failed `,
      }),
  });
});

/**
 * Unsafely calls StakeCredentialList._new without Effect wrapper
 *
 * @example
 * import { StakeCredentialList } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeCredentialList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeCredentialList._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () => Effect.runSync(_new());

/**
 * Method len of StakeCredentialList
 *
 * @example
 * import { StakeCredentialList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeCredentialList instance
 * const instance = ... ;
 *   const result = yield* StakeCredentialList.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.StakeCredentialList,
  ): Effect.Effect<number, StakeCredentialListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new StakeCredentialListError({
          message: `StakeCredentialList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { StakeCredentialList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeCredentialList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeCredentialList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeCredentialList.lenUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.StakeCredentialList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of StakeCredentialList
 *
 * @example
 * import { StakeCredentialList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeCredentialList instance
 * const instance = ... ;
 *   const result = yield* StakeCredentialList.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.StakeCredentialList,
    index: number,
  ): Effect.Effect<CML.Credential, StakeCredentialListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new StakeCredentialListError({
          message: `StakeCredentialList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { StakeCredentialList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeCredentialList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeCredentialList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeCredentialList.getUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.StakeCredentialList,
  index: number,
): CML.Credential => Effect.runSync(get(instance, index));

/**
 * Method add of StakeCredentialList
 *
 * @example
 * import { StakeCredentialList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeCredentialList instance
 * const instance = ... ;
 *   const result = yield* StakeCredentialList.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.StakeCredentialList,
    elem: CML.Credential,
  ): Effect.Effect<void, StakeCredentialListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new StakeCredentialListError({
          message: `StakeCredentialList.add failed with parameters: ${elem} (Credential). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { StakeCredentialList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeCredentialList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeCredentialList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeCredentialList.addUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (
  instance: CML.StakeCredentialList,
  elem: CML.Credential,
): void => Effect.runSync(add(instance, elem));

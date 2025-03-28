import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type CommitteeColdCredentialList = CML.CommitteeColdCredentialList;

export class CommitteeColdCredentialListError extends Data.TaggedError(
  "CommitteeColdCredentialListError",
)<{
  message?: string;
}> {}

/**
 * Method free of CommitteeColdCredentialList
 *
 * @example
 * import { CommitteeColdCredentialList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CommitteeColdCredentialList instance
 * const instance = ... ;
 *   const result = yield* CommitteeColdCredentialList.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.CommitteeColdCredentialList,
  ): Effect.Effect<void, CommitteeColdCredentialListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CommitteeColdCredentialListError({
          message: `CommitteeColdCredentialList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { CommitteeColdCredentialList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CommitteeColdCredentialList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CommitteeColdCredentialList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CommitteeColdCredentialList.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.CommitteeColdCredentialList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of CommitteeColdCredentialList
 *
 * @example
 * import { CommitteeColdCredentialList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CommitteeColdCredentialList._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.CommitteeColdCredentialList.new(),
    catch: () =>
      new CommitteeColdCredentialListError({
        message: `CommitteeColdCredentialList._new failed `,
      }),
  });
});

/**
 * Unsafely calls CommitteeColdCredentialList._new without Effect wrapper
 *
 * @example
 * import { CommitteeColdCredentialList } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CommitteeColdCredentialList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CommitteeColdCredentialList.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method len of CommitteeColdCredentialList
 *
 * @example
 * import { CommitteeColdCredentialList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CommitteeColdCredentialList instance
 * const instance = ... ;
 *   const result = yield* CommitteeColdCredentialList.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.CommitteeColdCredentialList,
  ): Effect.Effect<number, CommitteeColdCredentialListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new CommitteeColdCredentialListError({
          message: `CommitteeColdCredentialList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { CommitteeColdCredentialList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CommitteeColdCredentialList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CommitteeColdCredentialList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CommitteeColdCredentialList.unsafeLen failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.CommitteeColdCredentialList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of CommitteeColdCredentialList
 *
 * @example
 * import { CommitteeColdCredentialList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CommitteeColdCredentialList instance
 * const instance = ... ;
 *   const result = yield* CommitteeColdCredentialList.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.CommitteeColdCredentialList,
    index: number,
  ): Effect.Effect<CML.Credential, CommitteeColdCredentialListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new CommitteeColdCredentialListError({
          message: `CommitteeColdCredentialList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { CommitteeColdCredentialList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CommitteeColdCredentialList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CommitteeColdCredentialList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CommitteeColdCredentialList.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (
  instance: CML.CommitteeColdCredentialList,
  index: number,
): CML.Credential => Effect.runSync(get(instance, index));

/**
 * Method add of CommitteeColdCredentialList
 *
 * @example
 * import { CommitteeColdCredentialList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CommitteeColdCredentialList instance
 * const instance = ... ;
 *   const result = yield* CommitteeColdCredentialList.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.CommitteeColdCredentialList,
    elem: CML.Credential,
  ): Effect.Effect<void, CommitteeColdCredentialListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new CommitteeColdCredentialListError({
          message: `CommitteeColdCredentialList.add failed with parameters: ${elem} (Credential). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { CommitteeColdCredentialList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CommitteeColdCredentialList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CommitteeColdCredentialList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CommitteeColdCredentialList.unsafeAdd failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (
  instance: CML.CommitteeColdCredentialList,
  elem: CML.Credential,
): void => Effect.runSync(add(instance, elem));

import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type MetadatumList = CML.MetadatumList;

export class MetadatumListError extends Data.TaggedError("MetadatumListError")<{
  message?: string;
}> {}

/**
 * Method free of MetadatumList
 * 
 * @example
 * import { MetadatumList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MetadatumList instance
 * const instance = ... ;
 *   const result = yield* MetadatumList.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.MetadatumList): Effect.Effect<void, MetadatumListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MetadatumListError({
          message: `MetadatumList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { MetadatumList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MetadatumList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MetadatumList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MetadatumList.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.MetadatumList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of MetadatumList
 * 
 * @example
 * import { MetadatumList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* MetadatumList._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.MetadatumList.new(),
    catch: () => new MetadatumListError({
      message: `MetadatumList._new failed `,
    }),
  });
});

/**
 * Unsafely calls MetadatumList._new without Effect wrapper
 * 
 * @example
 * import { MetadatumList } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MetadatumList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MetadatumList.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

/**
 * Method len of MetadatumList
 * 
 * @example
 * import { MetadatumList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MetadatumList instance
 * const instance = ... ;
 *   const result = yield* MetadatumList.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.MetadatumList): Effect.Effect<number, MetadatumListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MetadatumListError({
          message: `MetadatumList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { MetadatumList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MetadatumList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MetadatumList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MetadatumList.unsafeLen failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.MetadatumList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of MetadatumList
 * 
 * @example
 * import { MetadatumList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MetadatumList instance
 * const instance = ... ;
 *   const result = yield* MetadatumList.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.MetadatumList, index: number): Effect.Effect<CML.TransactionMetadatum, MetadatumListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new MetadatumListError({
          message: `MetadatumList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { MetadatumList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MetadatumList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MetadatumList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MetadatumList.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.MetadatumList, index: number): CML.TransactionMetadatum =>
  Effect.runSync(get(instance, index));

/**
 * Method add of MetadatumList
 * 
 * @example
 * import { MetadatumList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a MetadatumList instance
 * const instance = ... ;
 *   const result = yield* MetadatumList.add(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (instance: CML.MetadatumList, elem: CML.TransactionMetadatum): Effect.Effect<void, MetadatumListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new MetadatumListError({
          message: `MetadatumList.add failed with parameters: ${elem} (TransactionMetadatum). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @example
 * import { MetadatumList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a MetadatumList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = MetadatumList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`MetadatumList.unsafeAdd failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (instance: CML.MetadatumList, elem: CML.TransactionMetadatum): void =>
  Effect.runSync(add(instance, elem));

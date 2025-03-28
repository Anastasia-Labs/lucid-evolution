import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type VkeywitnessList = CML.VkeywitnessList;

export class VkeywitnessListError extends Data.TaggedError(
  "VkeywitnessListError",
)<{
  message?: string;
}> {}

/**
 * Method free of VkeywitnessList
 *
 * @example
 * import { VkeywitnessList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VkeywitnessList instance
 * const instance = ... ;
 *   const result = yield* VkeywitnessList.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.VkeywitnessList): Effect.Effect<void, VkeywitnessListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VkeywitnessListError({
          message: `VkeywitnessList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { VkeywitnessList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VkeywitnessList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VkeywitnessList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VkeywitnessList.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.VkeywitnessList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of VkeywitnessList
 *
 * @example
 * import { VkeywitnessList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* VkeywitnessList._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.VkeywitnessList.new(),
    catch: () =>
      new VkeywitnessListError({
        message: `VkeywitnessList._new failed `,
      }),
  });
});

/**
 * Unsafely calls VkeywitnessList._new without Effect wrapper
 *
 * @example
 * import { VkeywitnessList } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VkeywitnessList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VkeywitnessList.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method len of VkeywitnessList
 *
 * @example
 * import { VkeywitnessList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VkeywitnessList instance
 * const instance = ... ;
 *   const result = yield* VkeywitnessList.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.VkeywitnessList,
  ): Effect.Effect<number, VkeywitnessListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new VkeywitnessListError({
          message: `VkeywitnessList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { VkeywitnessList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VkeywitnessList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VkeywitnessList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VkeywitnessList.unsafeLen failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.VkeywitnessList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of VkeywitnessList
 *
 * @example
 * import { VkeywitnessList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VkeywitnessList instance
 * const instance = ... ;
 *   const result = yield* VkeywitnessList.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.VkeywitnessList,
    index: number,
  ): Effect.Effect<CML.Vkeywitness, VkeywitnessListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new VkeywitnessListError({
          message: `VkeywitnessList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { VkeywitnessList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VkeywitnessList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VkeywitnessList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VkeywitnessList.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (
  instance: CML.VkeywitnessList,
  index: number,
): CML.Vkeywitness => Effect.runSync(get(instance, index));

/**
 * Method add of VkeywitnessList
 *
 * @example
 * import { VkeywitnessList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VkeywitnessList instance
 * const instance = ... ;
 *   const result = yield* VkeywitnessList.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.VkeywitnessList,
    elem: CML.Vkeywitness,
  ): Effect.Effect<void, VkeywitnessListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new VkeywitnessListError({
          message: `VkeywitnessList.add failed with parameters: ${elem} (Vkeywitness). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { VkeywitnessList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a VkeywitnessList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = VkeywitnessList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VkeywitnessList.unsafeAdd failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (
  instance: CML.VkeywitnessList,
  elem: CML.Vkeywitness,
): void => Effect.runSync(add(instance, elem));

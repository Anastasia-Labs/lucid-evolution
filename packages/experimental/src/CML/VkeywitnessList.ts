/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML VkeywitnessList class
 *
 * @since 2.0.0
 * @category Types
 */
export type VkeywitnessList = CML.VkeywitnessList;

/**
 * Error class for VkeywitnessList operations
 * 
 * This error is thrown when operations on VkeywitnessList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class VkeywitnessListError extends Data.TaggedError("VkeywitnessListError")<{
  message?: string;
}> {}

/**
 * Method free of VkeywitnessList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.VkeywitnessList) => Effect.Effect<void, VkeywitnessListError> = Effect.fn(
  (instance: CML.VkeywitnessList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VkeywitnessListError({
          message: `VkeywitnessList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.VkeywitnessList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of VkeywitnessList
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.VkeywitnessList, VkeywitnessListError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.VkeywitnessList.new(),
    catch: () => new VkeywitnessListError({
      message: `VkeywitnessList._new failed `,
    }),
  });
});

/**
 * Unsafely calls VkeywitnessList._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.VkeywitnessList =>
  Effect.runSync(_new());

/**
 * Method len of VkeywitnessList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.VkeywitnessList) => Effect.Effect<number, VkeywitnessListError> = Effect.fn(
  (instance: CML.VkeywitnessList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new VkeywitnessListError({
          message: `VkeywitnessList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.VkeywitnessList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of VkeywitnessList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.VkeywitnessList, index: number) => Effect.Effect<CML.Vkeywitness, VkeywitnessListError> = Effect.fn(
  (instance: CML.VkeywitnessList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new VkeywitnessListError({
          message: `VkeywitnessList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.VkeywitnessList, index: number): CML.Vkeywitness =>
  Effect.runSync(get(instance, index));

/**
 * Method add of VkeywitnessList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add: (instance: CML.VkeywitnessList, elem: CML.Vkeywitness) => Effect.Effect<void, VkeywitnessListError> = Effect.fn(
  (instance: CML.VkeywitnessList, elem: CML.Vkeywitness) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new VkeywitnessListError({
          message: `VkeywitnessList.add failed with parameters: ${elem} (Vkeywitness). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.VkeywitnessList, elem: CML.Vkeywitness): void =>
  Effect.runSync(add(instance, elem));

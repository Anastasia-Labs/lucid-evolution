/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML BootstrapWitnessList class
 *
 * @since 2.0.0
 * @category Types
 */
export type BootstrapWitnessList = CML.BootstrapWitnessList;

/**
 * Error class for BootstrapWitnessList operations
 * 
 * This error is thrown when operations on BootstrapWitnessList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class BootstrapWitnessListError extends Data.TaggedError("BootstrapWitnessListError")<{
  message?: string;
}> {}

/**
 * Method free of BootstrapWitnessList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.BootstrapWitnessList) => Effect.Effect<void, BootstrapWitnessListError> = Effect.fn(
  (instance: CML.BootstrapWitnessList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new BootstrapWitnessListError({
          message: `BootstrapWitnessList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.BootstrapWitnessList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of BootstrapWitnessList
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.BootstrapWitnessList, BootstrapWitnessListError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.BootstrapWitnessList.new(),
    catch: () => new BootstrapWitnessListError({
      message: `BootstrapWitnessList._new failed `,
    }),
  });
});

/**
 * Unsafely calls BootstrapWitnessList._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.BootstrapWitnessList =>
  Effect.runSync(_new());

/**
 * Method len of BootstrapWitnessList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.BootstrapWitnessList) => Effect.Effect<number, BootstrapWitnessListError> = Effect.fn(
  (instance: CML.BootstrapWitnessList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new BootstrapWitnessListError({
          message: `BootstrapWitnessList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.BootstrapWitnessList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of BootstrapWitnessList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.BootstrapWitnessList, index: number) => Effect.Effect<CML.BootstrapWitness, BootstrapWitnessListError> = Effect.fn(
  (instance: CML.BootstrapWitnessList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new BootstrapWitnessListError({
          message: `BootstrapWitnessList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.BootstrapWitnessList, index: number): CML.BootstrapWitness =>
  Effect.runSync(get(instance, index));

/**
 * Method add of BootstrapWitnessList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add: (instance: CML.BootstrapWitnessList, elem: CML.BootstrapWitness) => Effect.Effect<void, BootstrapWitnessListError> = Effect.fn(
  (instance: CML.BootstrapWitnessList, elem: CML.BootstrapWitness) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new BootstrapWitnessListError({
          message: `BootstrapWitnessList.add failed with parameters: ${elem} (BootstrapWitness). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.BootstrapWitnessList, elem: CML.BootstrapWitness): void =>
  Effect.runSync(add(instance, elem));

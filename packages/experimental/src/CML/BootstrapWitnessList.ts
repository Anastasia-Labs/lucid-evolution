import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type BootstrapWitnessList = CML.BootstrapWitnessList;

export class BootstrapWitnessListError extends Data.TaggedError(
  "BootstrapWitnessListError",
)<{
  message?: string;
}> {}

/**
 * Method free of BootstrapWitnessList
 *
 * @example
 * import { BootstrapWitnessList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BootstrapWitnessList instance
 * const instance = ... ;
 *   const result = yield* BootstrapWitnessList.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.BootstrapWitnessList,
  ): Effect.Effect<void, BootstrapWitnessListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new BootstrapWitnessListError({
          message: `BootstrapWitnessList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { BootstrapWitnessList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BootstrapWitnessList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitnessList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitnessList.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.BootstrapWitnessList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of BootstrapWitnessList
 *
 * @example
 * import { BootstrapWitnessList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* BootstrapWitnessList._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.BootstrapWitnessList.new(),
    catch: () =>
      new BootstrapWitnessListError({
        message: `BootstrapWitnessList._new failed `,
      }),
  });
});

/**
 * Unsafely calls BootstrapWitnessList._new without Effect wrapper
 *
 * @example
 * import { BootstrapWitnessList } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitnessList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitnessList.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method len of BootstrapWitnessList
 *
 * @example
 * import { BootstrapWitnessList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BootstrapWitnessList instance
 * const instance = ... ;
 *   const result = yield* BootstrapWitnessList.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.BootstrapWitnessList,
  ): Effect.Effect<number, BootstrapWitnessListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new BootstrapWitnessListError({
          message: `BootstrapWitnessList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { BootstrapWitnessList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BootstrapWitnessList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitnessList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitnessList.unsafeLen failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.BootstrapWitnessList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of BootstrapWitnessList
 *
 * @example
 * import { BootstrapWitnessList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BootstrapWitnessList instance
 * const instance = ... ;
 *   const result = yield* BootstrapWitnessList.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.BootstrapWitnessList,
    index: number,
  ): Effect.Effect<CML.BootstrapWitness, BootstrapWitnessListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new BootstrapWitnessListError({
          message: `BootstrapWitnessList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { BootstrapWitnessList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BootstrapWitnessList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitnessList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitnessList.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (
  instance: CML.BootstrapWitnessList,
  index: number,
): CML.BootstrapWitness => Effect.runSync(get(instance, index));

/**
 * Method add of BootstrapWitnessList
 *
 * @example
 * import { BootstrapWitnessList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BootstrapWitnessList instance
 * const instance = ... ;
 *   const result = yield* BootstrapWitnessList.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.BootstrapWitnessList,
    elem: CML.BootstrapWitness,
  ): Effect.Effect<void, BootstrapWitnessListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new BootstrapWitnessListError({
          message: `BootstrapWitnessList.add failed with parameters: ${elem} (BootstrapWitness). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { BootstrapWitnessList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BootstrapWitnessList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BootstrapWitnessList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BootstrapWitnessList.unsafeAdd failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (
  instance: CML.BootstrapWitnessList,
  elem: CML.BootstrapWitness,
): void => Effect.runSync(add(instance, elem));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML VoterList class
 *
 * @since 2.0.0
 * @category Types
 */
export type VoterList = CML.VoterList;

/**
 * Error class for VoterList operations
 * 
 * This error is thrown when operations on VoterList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class VoterListError extends Data.TaggedError("VoterListError")<{
  message?: string;
}> {}

/**
 * Method free of VoterList
 * 
 * @example
 * import { VoterList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoterList instance
 * const instance = ... ;
 *   const result = yield* VoterList.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.VoterList): Effect.Effect<void, VoterListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VoterListError({
          message: `VoterList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { VoterList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VoterList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoterList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoterList.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.VoterList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of VoterList
 * 
 * @example
 * import { VoterList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* VoterList._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.VoterList.new(),
    catch: () => new VoterListError({
      message: `VoterList._new failed `,
    }),
  });
});

/**
 * Unsafely calls VoterList._new without Effect wrapper
 * 
 * @example
 * import { VoterList } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoterList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoterList._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () =>
  Effect.runSync(_new());

/**
 * Method len of VoterList
 * 
 * @example
 * import { VoterList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoterList instance
 * const instance = ... ;
 *   const result = yield* VoterList.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.VoterList): Effect.Effect<number, VoterListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new VoterListError({
          message: `VoterList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { VoterList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VoterList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoterList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoterList.lenUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.VoterList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of VoterList
 * 
 * @example
 * import { VoterList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoterList instance
 * const instance = ... ;
 *   const result = yield* VoterList.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.VoterList, index: number): Effect.Effect<CML.Voter, VoterListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new VoterListError({
          message: `VoterList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { VoterList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VoterList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoterList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoterList.getUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.VoterList, index: number): CML.Voter =>
  Effect.runSync(get(instance, index));

/**
 * Method add of VoterList
 * 
 * @example
 * import { VoterList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VoterList instance
 * const instance = ... ;
 *   const result = yield* VoterList.add(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (instance: CML.VoterList, elem: CML.Voter): Effect.Effect<void, VoterListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new VoterListError({
          message: `VoterList.add failed with parameters: ${elem} (Voter). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @example
 * import { VoterList } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VoterList instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VoterList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VoterList.addUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.VoterList, elem: CML.Voter): void =>
  Effect.runSync(add(instance, elem));

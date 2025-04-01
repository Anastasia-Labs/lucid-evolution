/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ProposalProcedureList class
 *
 * @since 2.0.0
 * @category Types
 */
export type ProposalProcedureList = CML.ProposalProcedureList;

/**
 * Error class for ProposalProcedureList operations
 *
 * This error is thrown when operations on ProposalProcedureList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ProposalProcedureListError extends Data.TaggedError(
  "ProposalProcedureListError",
)<{
  message?: string;
}> {}

/**
 * Method free of ProposalProcedureList
 *
 * @example
 * import { ProposalProcedureList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalProcedureList instance
 * const instance = ... ;
 *   const result = yield* ProposalProcedureList.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.ProposalProcedureList,
  ): Effect.Effect<void, ProposalProcedureListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ProposalProcedureListError({
          message: `ProposalProcedureList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { ProposalProcedureList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ProposalProcedureList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedureList.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedureList.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ProposalProcedureList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of ProposalProcedureList
 *
 * @example
 * import { ProposalProcedureList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ProposalProcedureList._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.ProposalProcedureList.new(),
    catch: () =>
      new ProposalProcedureListError({
        message: `ProposalProcedureList._new failed `,
      }),
  });
});

/**
 * Unsafely calls ProposalProcedureList._new without Effect wrapper
 *
 * @example
 * import { ProposalProcedureList } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedureList._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedureList._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () => Effect.runSync(_new());

/**
 * Method len of ProposalProcedureList
 *
 * @example
 * import { ProposalProcedureList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalProcedureList instance
 * const instance = ... ;
 *   const result = yield* ProposalProcedureList.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.ProposalProcedureList,
  ): Effect.Effect<number, ProposalProcedureListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new ProposalProcedureListError({
          message: `ProposalProcedureList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { ProposalProcedureList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ProposalProcedureList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedureList.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedureList.lenUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.ProposalProcedureList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of ProposalProcedureList
 *
 * @example
 * import { ProposalProcedureList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalProcedureList instance
 * const instance = ... ;
 *   const result = yield* ProposalProcedureList.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.ProposalProcedureList,
    index: number,
  ): Effect.Effect<CML.ProposalProcedure, ProposalProcedureListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new ProposalProcedureListError({
          message: `ProposalProcedureList.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { ProposalProcedureList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ProposalProcedureList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedureList.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedureList.getUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.ProposalProcedureList,
  index: number,
): CML.ProposalProcedure => Effect.runSync(get(instance, index));

/**
 * Method add of ProposalProcedureList
 *
 * @example
 * import { ProposalProcedureList } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ProposalProcedureList instance
 * const instance = ... ;
 *   const result = yield* ProposalProcedureList.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.ProposalProcedureList,
    elem: CML.ProposalProcedure,
  ): Effect.Effect<void, ProposalProcedureListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new ProposalProcedureListError({
          message: `ProposalProcedureList.add failed with parameters: ${elem} (ProposalProcedure). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { ProposalProcedureList } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ProposalProcedureList instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ProposalProcedureList.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedureList.addUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (
  instance: CML.ProposalProcedureList,
  elem: CML.ProposalProcedure,
): void => Effect.runSync(add(instance, elem));

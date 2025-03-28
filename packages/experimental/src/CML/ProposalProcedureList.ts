import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ProposalProcedureList = CML.ProposalProcedureList;

export class ProposalProcedureListError extends Data.TaggedError("ProposalProcedureListError")<{
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
  (instance: CML.ProposalProcedureList): Effect.Effect<void, ProposalProcedureListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ProposalProcedureListError({
          message: `ProposalProcedureList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
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
 *   const result = ProposalProcedureList.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedureList.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ProposalProcedureList): void =>
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
    catch: () => new ProposalProcedureListError({
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
 *   const result = ProposalProcedureList.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedureList.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

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
  (instance: CML.ProposalProcedureList): Effect.Effect<number, ProposalProcedureListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new ProposalProcedureListError({
          message: `ProposalProcedureList.len failed `,
        }),
    })
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
 *   const result = ProposalProcedureList.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedureList.unsafeLen failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.ProposalProcedureList): number =>
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
  (instance: CML.ProposalProcedureList, index: number): Effect.Effect<CML.ProposalProcedure, ProposalProcedureListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new ProposalProcedureListError({
          message: `ProposalProcedureList.get failed with parameters: ${index}. `,
        }),
    })
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
 *   const result = ProposalProcedureList.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedureList.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.ProposalProcedureList, index: number): CML.ProposalProcedure =>
  Effect.runSync(get(instance, index));

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
  (instance: CML.ProposalProcedureList, elem: CML.ProposalProcedure): Effect.Effect<void, ProposalProcedureListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new ProposalProcedureListError({
          message: `ProposalProcedureList.add failed with parameters: ${elem} (ProposalProcedure). `,
        }),
    })
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
 *   const result = ProposalProcedureList.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ProposalProcedureList.unsafeAdd failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (instance: CML.ProposalProcedureList, elem: CML.ProposalProcedure): void =>
  Effect.runSync(add(instance, elem));

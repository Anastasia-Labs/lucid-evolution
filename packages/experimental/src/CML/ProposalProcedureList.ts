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
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.ProposalProcedureList,
) => Effect.Effect<void, ProposalProcedureListError> = Effect.fn(
  (instance: CML.ProposalProcedureList) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ProposalProcedureList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of ProposalProcedureList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.ProposalProcedureList,
  ProposalProcedureListError
> = Effect.fn(function* () {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.ProposalProcedureList =>
  Effect.runSync(_new());

/**
 * Method len of ProposalProcedureList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.ProposalProcedureList,
) => Effect.Effect<number, ProposalProcedureListError> = Effect.fn(
  (instance: CML.ProposalProcedureList) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.ProposalProcedureList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of ProposalProcedureList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.ProposalProcedureList,
  index: number,
) => Effect.Effect<CML.ProposalProcedure, ProposalProcedureListError> =
  Effect.fn((instance: CML.ProposalProcedureList, index: number) =>
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
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.ProposalProcedureList,
  elem: CML.ProposalProcedure,
) => Effect.Effect<void, ProposalProcedureListError> = Effect.fn(
  (instance: CML.ProposalProcedureList, elem: CML.ProposalProcedure) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (
  instance: CML.ProposalProcedureList,
  elem: CML.ProposalProcedure,
): void => Effect.runSync(add(instance, elem));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP36DelegationList class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP36DelegationList = CML.CIP36DelegationList;

/**
 * Error class for CIP36DelegationList operations
 * 
 * This error is thrown when operations on CIP36DelegationList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CIP36DelegationListError extends Data.TaggedError("CIP36DelegationListError")<{
  message?: string;
}> {}

/**
 * Method free of CIP36DelegationList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.CIP36DelegationList) => Effect.Effect<void, CIP36DelegationListError> = Effect.fn(
  (instance: CML.CIP36DelegationList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP36DelegationListError({
          message: `CIP36DelegationList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP36DelegationList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of CIP36DelegationList
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.CIP36DelegationList, CIP36DelegationListError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.CIP36DelegationList.new(),
    catch: () => new CIP36DelegationListError({
      message: `CIP36DelegationList._new failed `,
    }),
  });
});

/**
 * Unsafely calls CIP36DelegationList._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.CIP36DelegationList =>
  Effect.runSync(_new());

/**
 * Method len of CIP36DelegationList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.CIP36DelegationList) => Effect.Effect<number, CIP36DelegationListError> = Effect.fn(
  (instance: CML.CIP36DelegationList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new CIP36DelegationListError({
          message: `CIP36DelegationList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.CIP36DelegationList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of CIP36DelegationList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.CIP36DelegationList, index: number) => Effect.Effect<CML.CIP36Delegation, CIP36DelegationListError> = Effect.fn(
  (instance: CML.CIP36DelegationList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new CIP36DelegationListError({
          message: `CIP36DelegationList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.CIP36DelegationList, index: number): CML.CIP36Delegation =>
  Effect.runSync(get(instance, index));

/**
 * Method add of CIP36DelegationList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add: (instance: CML.CIP36DelegationList, elem: CML.CIP36Delegation) => Effect.Effect<void, CIP36DelegationListError> = Effect.fn(
  (instance: CML.CIP36DelegationList, elem: CML.CIP36Delegation) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new CIP36DelegationListError({
          message: `CIP36DelegationList.add failed with parameters: ${elem} (CIP36Delegation). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.CIP36DelegationList, elem: CML.CIP36Delegation): void =>
  Effect.runSync(add(instance, elem));

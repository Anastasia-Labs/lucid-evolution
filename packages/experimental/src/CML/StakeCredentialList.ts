/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML StakeCredentialList class
 *
 * @since 2.0.0
 * @category Types
 */
export type StakeCredentialList = CML.StakeCredentialList;

/**
 * Error class for StakeCredentialList operations
 * 
 * This error is thrown when operations on StakeCredentialList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class StakeCredentialListError extends Data.TaggedError("StakeCredentialListError")<{
  message?: string;
}> {}

/**
 * Method free of StakeCredentialList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.StakeCredentialList) => Effect.Effect<void, StakeCredentialListError> = Effect.fn(
  (instance: CML.StakeCredentialList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new StakeCredentialListError({
          message: `StakeCredentialList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.StakeCredentialList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of StakeCredentialList
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.StakeCredentialList, StakeCredentialListError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.StakeCredentialList.new(),
    catch: () => new StakeCredentialListError({
      message: `StakeCredentialList._new failed `,
    }),
  });
});

/**
 * Unsafely calls StakeCredentialList._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.StakeCredentialList =>
  Effect.runSync(_new());

/**
 * Method len of StakeCredentialList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.StakeCredentialList) => Effect.Effect<number, StakeCredentialListError> = Effect.fn(
  (instance: CML.StakeCredentialList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new StakeCredentialListError({
          message: `StakeCredentialList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.StakeCredentialList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of StakeCredentialList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.StakeCredentialList, index: number) => Effect.Effect<CML.Credential, StakeCredentialListError> = Effect.fn(
  (instance: CML.StakeCredentialList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new StakeCredentialListError({
          message: `StakeCredentialList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.StakeCredentialList, index: number): CML.Credential =>
  Effect.runSync(get(instance, index));

/**
 * Method add of StakeCredentialList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add: (instance: CML.StakeCredentialList, elem: CML.Credential) => Effect.Effect<void, StakeCredentialListError> = Effect.fn(
  (instance: CML.StakeCredentialList, elem: CML.Credential) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new StakeCredentialListError({
          message: `StakeCredentialList.add failed with parameters: ${elem} (Credential). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.StakeCredentialList, elem: CML.Credential): void =>
  Effect.runSync(add(instance, elem));

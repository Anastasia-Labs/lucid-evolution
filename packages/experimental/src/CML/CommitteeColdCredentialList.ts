/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CommitteeColdCredentialList class
 *
 * @since 2.0.0
 * @category Types
 */
export type CommitteeColdCredentialList = CML.CommitteeColdCredentialList;

/**
 * Error class for CommitteeColdCredentialList operations
 *
 * This error is thrown when operations on CommitteeColdCredentialList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CommitteeColdCredentialListError extends Data.TaggedError(
  "CommitteeColdCredentialListError",
)<{
  message?: string;
}> {}

/**
 * Method free of CommitteeColdCredentialList
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.CommitteeColdCredentialList,
) => Effect.Effect<void, CommitteeColdCredentialListError> = Effect.fn(
  (instance: CML.CommitteeColdCredentialList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CommitteeColdCredentialListError({
          message: `CommitteeColdCredentialList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CommitteeColdCredentialList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of CommitteeColdCredentialList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.CommitteeColdCredentialList,
  CommitteeColdCredentialListError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.CommitteeColdCredentialList.new(),
    catch: () =>
      new CommitteeColdCredentialListError({
        message: `CommitteeColdCredentialList._new failed `,
      }),
  });
});

/**
 * Unsafely calls CommitteeColdCredentialList._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.CommitteeColdCredentialList =>
  Effect.runSync(_new());

/**
 * Method len of CommitteeColdCredentialList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.CommitteeColdCredentialList,
) => Effect.Effect<number, CommitteeColdCredentialListError> = Effect.fn(
  (instance: CML.CommitteeColdCredentialList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new CommitteeColdCredentialListError({
          message: `CommitteeColdCredentialList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.CommitteeColdCredentialList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of CommitteeColdCredentialList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.CommitteeColdCredentialList,
  index: number,
) => Effect.Effect<CML.Credential, CommitteeColdCredentialListError> =
  Effect.fn((instance: CML.CommitteeColdCredentialList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new CommitteeColdCredentialListError({
          message: `CommitteeColdCredentialList.get failed with parameters: ${index}. `,
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
  instance: CML.CommitteeColdCredentialList,
  index: number,
): CML.Credential => Effect.runSync(get(instance, index));

/**
 * Method add of CommitteeColdCredentialList
 *
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.CommitteeColdCredentialList,
  elem: CML.Credential,
) => Effect.Effect<void, CommitteeColdCredentialListError> = Effect.fn(
  (instance: CML.CommitteeColdCredentialList, elem: CML.Credential) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new CommitteeColdCredentialListError({
          message: `CommitteeColdCredentialList.add failed with parameters: ${elem} (Credential). `,
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
  instance: CML.CommitteeColdCredentialList,
  elem: CML.Credential,
): void => Effect.runSync(add(instance, elem));

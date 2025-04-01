/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CertificateList class
 *
 * @since 2.0.0
 * @category Types
 */
export type CertificateList = CML.CertificateList;

/**
 * Error class for CertificateList operations
 *
 * This error is thrown when operations on CertificateList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CertificateListError extends Data.TaggedError(
  "CertificateListError",
)<{
  message?: string;
}> {}

/**
 * Method free of CertificateList
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.CertificateList,
) => Effect.Effect<void, CertificateListError> = Effect.fn(
  (instance: CML.CertificateList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CertificateListError({
          message: `CertificateList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CertificateList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of CertificateList
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<
  CML.CertificateList,
  CertificateListError
> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.CertificateList.new(),
    catch: () =>
      new CertificateListError({
        message: `CertificateList._new failed `,
      }),
  });
});

/**
 * Unsafely calls CertificateList._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.CertificateList => Effect.runSync(_new());

/**
 * Method len of CertificateList
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.CertificateList,
) => Effect.Effect<number, CertificateListError> = Effect.fn(
  (instance: CML.CertificateList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new CertificateListError({
          message: `CertificateList.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.CertificateList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of CertificateList
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.CertificateList,
  index: number,
) => Effect.Effect<CML.Certificate, CertificateListError> = Effect.fn(
  (instance: CML.CertificateList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new CertificateListError({
          message: `CertificateList.get failed with parameters: ${index}. `,
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
  instance: CML.CertificateList,
  index: number,
): CML.Certificate => Effect.runSync(get(instance, index));

/**
 * Method add of CertificateList
 *
 * @since 2.0.0
 * @category Methods
 */
export const add: (
  instance: CML.CertificateList,
  elem: CML.Certificate,
) => Effect.Effect<void, CertificateListError> = Effect.fn(
  (instance: CML.CertificateList, elem: CML.Certificate) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new CertificateListError({
          message: `CertificateList.add failed with parameters: ${elem} (Certificate). `,
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
  instance: CML.CertificateList,
  elem: CML.Certificate,
): void => Effect.runSync(add(instance, elem));

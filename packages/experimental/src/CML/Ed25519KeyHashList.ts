/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Ed25519KeyHashList class
 *
 * @since 2.0.0
 * @category Types
 */
export type Ed25519KeyHashList = CML.Ed25519KeyHashList;

/**
 * Error class for Ed25519KeyHashList operations
 * 
 * This error is thrown when operations on Ed25519KeyHashList instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class Ed25519KeyHashListError extends Data.TaggedError("Ed25519KeyHashListError")<{
  message?: string;
}> {}

/**
 * Method free of Ed25519KeyHashList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Ed25519KeyHashList) => Effect.Effect<void, Ed25519KeyHashListError> = Effect.fn(
  (instance: CML.Ed25519KeyHashList) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new Ed25519KeyHashListError({
          message: `Ed25519KeyHashList.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Ed25519KeyHashList): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of Ed25519KeyHashList
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.Ed25519KeyHashList, Ed25519KeyHashListError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.Ed25519KeyHashList.new(),
    catch: () => new Ed25519KeyHashListError({
      message: `Ed25519KeyHashList._new failed `,
    }),
  });
});

/**
 * Unsafely calls Ed25519KeyHashList._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.Ed25519KeyHashList =>
  Effect.runSync(_new());

/**
 * Method len of Ed25519KeyHashList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.Ed25519KeyHashList) => Effect.Effect<number, Ed25519KeyHashListError> = Effect.fn(
  (instance: CML.Ed25519KeyHashList) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new Ed25519KeyHashListError({
          message: `Ed25519KeyHashList.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.Ed25519KeyHashList): number =>
  Effect.runSync(len(instance));

/**
 * Method get of Ed25519KeyHashList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.Ed25519KeyHashList, index: number) => Effect.Effect<CML.Ed25519KeyHash, Ed25519KeyHashListError> = Effect.fn(
  (instance: CML.Ed25519KeyHashList, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new Ed25519KeyHashListError({
          message: `Ed25519KeyHashList.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.Ed25519KeyHashList, index: number): CML.Ed25519KeyHash =>
  Effect.runSync(get(instance, index));

/**
 * Method add of Ed25519KeyHashList
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add: (instance: CML.Ed25519KeyHashList, elem: CML.Ed25519KeyHash) => Effect.Effect<void, Ed25519KeyHashListError> = Effect.fn(
  (instance: CML.Ed25519KeyHashList, elem: CML.Ed25519KeyHash) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new Ed25519KeyHashListError({
          message: `Ed25519KeyHashList.add failed with parameters: ${elem} (Ed25519KeyHash). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.Ed25519KeyHashList, elem: CML.Ed25519KeyHash): void =>
  Effect.runSync(add(instance, elem));

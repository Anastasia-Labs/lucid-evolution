/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP25String64List class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP25String64List = CML.CIP25String64List;

/**
 * Error class for CIP25String64List operations
 * 
 * This error is thrown when operations on CIP25String64List instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CIP25String64ListError extends Data.TaggedError("CIP25String64ListError")<{
  message?: string;
}> {}

/**
 * Method free of CIP25String64List
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.CIP25String64List) => Effect.Effect<void, CIP25String64ListError> = Effect.fn(
  (instance: CML.CIP25String64List) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP25String64ListError({
          message: `CIP25String64List.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP25String64List): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of CIP25String64List
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.CIP25String64List, CIP25String64ListError> = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.CIP25String64List.new(),
    catch: () => new CIP25String64ListError({
      message: `CIP25String64List._new failed `,
    }),
  });
});

/**
 * Unsafely calls CIP25String64List._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.CIP25String64List =>
  Effect.runSync(_new());

/**
 * Method len of CIP25String64List
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.CIP25String64List) => Effect.Effect<number, CIP25String64ListError> = Effect.fn(
  (instance: CML.CIP25String64List) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new CIP25String64ListError({
          message: `CIP25String64List.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.CIP25String64List): number =>
  Effect.runSync(len(instance));

/**
 * Method get of CIP25String64List
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.CIP25String64List, index: number) => Effect.Effect<CML.CIP25String64, CIP25String64ListError> = Effect.fn(
  (instance: CML.CIP25String64List, index: number) =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new CIP25String64ListError({
          message: `CIP25String64List.get failed with parameters: ${index}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.CIP25String64List, index: number): CML.CIP25String64 =>
  Effect.runSync(get(instance, index));

/**
 * Method add of CIP25String64List
 * 
 * @since 2.0.0
 * @category Methods
 */
export const add: (instance: CML.CIP25String64List, elem: CML.CIP25String64) => Effect.Effect<void, CIP25String64ListError> = Effect.fn(
  (instance: CML.CIP25String64List, elem: CML.CIP25String64) =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new CIP25String64ListError({
          message: `CIP25String64List.add failed with parameters: ${elem} (CIP25String64). `,
        }),
    })
);

/**
 * Unsafely calls instance.add without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (instance: CML.CIP25String64List, elem: CML.CIP25String64): void =>
  Effect.runSync(add(instance, elem));

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
export class CIP25String64ListError extends Data.TaggedError(
  "CIP25String64ListError",
)<{
  message?: string;
}> {}

/**
 * Method free of CIP25String64List
 *
 * @example
 * import { CIP25String64List } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25String64List instance
 * const instance = ... ;
 *   const result = yield* CIP25String64List.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.CIP25String64List,
  ): Effect.Effect<void, CIP25String64ListError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP25String64ListError({
          message: `CIP25String64List.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { CIP25String64List } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25String64List instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64List.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64List.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP25String64List): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of CIP25String64List
 *
 * @example
 * import { CIP25String64List } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25String64List._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.CIP25String64List.new(),
    catch: () =>
      new CIP25String64ListError({
        message: `CIP25String64List._new failed `,
      }),
  });
});

/**
 * Unsafely calls CIP25String64List._new without Effect wrapper
 *
 * @example
 * import { CIP25String64List } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64List._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64List._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () => Effect.runSync(_new());

/**
 * Method len of CIP25String64List
 *
 * @example
 * import { CIP25String64List } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25String64List instance
 * const instance = ... ;
 *   const result = yield* CIP25String64List.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.CIP25String64List,
  ): Effect.Effect<number, CIP25String64ListError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new CIP25String64ListError({
          message: `CIP25String64List.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { CIP25String64List } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25String64List instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64List.lenUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64List.lenUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.CIP25String64List): number =>
  Effect.runSync(len(instance));

/**
 * Method get of CIP25String64List
 *
 * @example
 * import { CIP25String64List } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25String64List instance
 * const instance = ... ;
 *   const result = yield* CIP25String64List.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.CIP25String64List,
    index: number,
  ): Effect.Effect<CML.CIP25String64, CIP25String64ListError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new CIP25String64ListError({
          message: `CIP25String64List.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { CIP25String64List } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25String64List instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64List.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64List.getUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.CIP25String64List,
  index: number,
): CML.CIP25String64 => Effect.runSync(get(instance, index));

/**
 * Method add of CIP25String64List
 *
 * @example
 * import { CIP25String64List } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25String64List instance
 * const instance = ... ;
 *   const result = yield* CIP25String64List.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.CIP25String64List,
    elem: CML.CIP25String64,
  ): Effect.Effect<void, CIP25String64ListError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new CIP25String64ListError({
          message: `CIP25String64List.add failed with parameters: ${elem} (CIP25String64). `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { CIP25String64List } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25String64List instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64List.addUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64List.addUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addUnsafe = (
  instance: CML.CIP25String64List,
  elem: CML.CIP25String64,
): void => Effect.runSync(add(instance, elem));

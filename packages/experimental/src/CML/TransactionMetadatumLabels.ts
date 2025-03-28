import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type TransactionMetadatumLabels = CML.TransactionMetadatumLabels;

export class TransactionMetadatumLabelsError extends Data.TaggedError(
  "TransactionMetadatumLabelsError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionMetadatumLabels
 *
 * @example
 * import { TransactionMetadatumLabels } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatumLabels instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatumLabels.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.TransactionMetadatumLabels,
  ): Effect.Effect<void, TransactionMetadatumLabelsError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionMetadatumLabelsError({
          message: `TransactionMetadatumLabels.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { TransactionMetadatumLabels } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionMetadatumLabels instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatumLabels.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatumLabels.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.TransactionMetadatumLabels): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of TransactionMetadatumLabels
 *
 * @example
 * import { TransactionMetadatumLabels } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionMetadatumLabels._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionMetadatumLabels.new(),
    catch: () =>
      new TransactionMetadatumLabelsError({
        message: `TransactionMetadatumLabels._new failed `,
      }),
  });
});

/**
 * Unsafely calls TransactionMetadatumLabels._new without Effect wrapper
 *
 * @example
 * import { TransactionMetadatumLabels } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatumLabels.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatumLabels.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () => Effect.runSync(_new());

/**
 * Method len of TransactionMetadatumLabels
 *
 * @example
 * import { TransactionMetadatumLabels } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatumLabels instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatumLabels.len(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (
    instance: CML.TransactionMetadatumLabels,
  ): Effect.Effect<number, TransactionMetadatumLabelsError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new TransactionMetadatumLabelsError({
          message: `TransactionMetadatumLabels.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @example
 * import { TransactionMetadatumLabels } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionMetadatumLabels instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatumLabels.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatumLabels.unsafeLen failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.TransactionMetadatumLabels): number =>
  Effect.runSync(len(instance));

/**
 * Method get of TransactionMetadatumLabels
 *
 * @example
 * import { TransactionMetadatumLabels } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatumLabels instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatumLabels.get(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (
    instance: CML.TransactionMetadatumLabels,
    index: number,
  ): Effect.Effect<bigint, TransactionMetadatumLabelsError> =>
    Effect.try({
      try: () => instance.get(index),
      catch: () =>
        new TransactionMetadatumLabelsError({
          message: `TransactionMetadatumLabels.get failed with parameters: ${index}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { TransactionMetadatumLabels } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionMetadatumLabels instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatumLabels.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatumLabels.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (
  instance: CML.TransactionMetadatumLabels,
  index: number,
): bigint => Effect.runSync(get(instance, index));

/**
 * Method add of TransactionMetadatumLabels
 *
 * @example
 * import { TransactionMetadatumLabels } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionMetadatumLabels instance
 * const instance = ... ;
 *   const result = yield* TransactionMetadatumLabels.add(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const add = Effect.fn(
  (
    instance: CML.TransactionMetadatumLabels,
    elem: bigint,
  ): Effect.Effect<void, TransactionMetadatumLabelsError> =>
    Effect.try({
      try: () => instance.add(elem),
      catch: () =>
        new TransactionMetadatumLabelsError({
          message: `TransactionMetadatumLabels.add failed with parameters: ${elem}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.add without Effect wrapper
 *
 * @example
 * import { TransactionMetadatumLabels } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionMetadatumLabels instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionMetadatumLabels.unsafeAdd(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionMetadatumLabels.unsafeAdd failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAdd = (
  instance: CML.TransactionMetadatumLabels,
  elem: bigint,
): void => Effect.runSync(add(instance, elem));

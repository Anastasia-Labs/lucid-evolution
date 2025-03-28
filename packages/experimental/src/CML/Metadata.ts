import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Metadata = CML.Metadata;

export class MetadataError extends Data.TaggedError("MetadataError")<{
  message?: string;
}> {}

/**
 * Method free of Metadata
 * 
 * @example
 * import { Metadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Metadata instance
 * const instance = ... ;
 *   const result = yield* Metadata.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Metadata): Effect.Effect<void, MetadataError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MetadataError({
          message: `Metadata.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { Metadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Metadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Metadata.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Metadata.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Metadata): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of Metadata
 * 
 * @example
 * import { Metadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Metadata._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.Metadata.new(),
    catch: () => new MetadataError({
      message: `Metadata._new failed `,
    }),
  });
});

/**
 * Unsafely calls Metadata._new without Effect wrapper
 * 
 * @example
 * import { Metadata } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Metadata.unsafe_new();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Metadata.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = () =>
  Effect.runSync(_new());

/**
 * Method len of Metadata
 * 
 * @example
 * import { Metadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Metadata instance
 * const instance = ... ;
 *   const result = yield* Metadata.len(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len = Effect.fn(
  (instance: CML.Metadata): Effect.Effect<number, MetadataError> =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new MetadataError({
          message: `Metadata.len failed `,
        }),
    })
);

/**
 * Unsafely calls instance.len without Effect wrapper
 * 
 * @example
 * import { Metadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Metadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Metadata.unsafeLen(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Metadata.unsafeLen failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLen = (instance: CML.Metadata): number =>
  Effect.runSync(len(instance));

/**
 * Method set of Metadata
 * 
 * @example
 * import { Metadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Metadata instance
 * const instance = ... ;
 *   const result = yield* Metadata.set(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const set = Effect.fn(
  (instance: CML.Metadata, key: bigint, value: CML.TransactionMetadatum): Effect.Effect<void, MetadataError> =>
    Effect.try({
      try: () => instance.set(key, value),
      catch: () =>
        new MetadataError({
          message: `Metadata.set failed with parameters: ${key}, ${value} (TransactionMetadatum). `,
        }),
    })
);

/**
 * Unsafely calls instance.set without Effect wrapper
 * 
 * @example
 * import { Metadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Metadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Metadata.unsafeSet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Metadata.unsafeSet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSet = (instance: CML.Metadata, key: bigint, value: CML.TransactionMetadatum): void =>
  Effect.runSync(set(instance, key, value));

/**
 * Method get of Metadata
 * 
 * @example
 * import { Metadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Metadata instance
 * const instance = ... ;
 *   const result = yield* Metadata.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.Metadata, label: bigint): Effect.Effect<CML.TransactionMetadatum | undefined, MetadataError> =>
    Effect.try({
      try: () => instance.get(label),
      catch: () =>
        new MetadataError({
          message: `Metadata.get failed with parameters: ${label}. `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { Metadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Metadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Metadata.unsafeGet(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Metadata.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.Metadata, label: bigint): CML.TransactionMetadatum | undefined =>
  Effect.runSync(get(instance, label));

/**
 * Method getAll of Metadata
 * 
 * @example
 * import { Metadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Metadata instance
 * const instance = ... ;
 *   const result = yield* Metadata.getAll(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getAll = Effect.fn(
  (instance: CML.Metadata, label: bigint): Effect.Effect<CML.TransactionMetadatumList | undefined, MetadataError> =>
    Effect.try({
      try: () => instance.get_all(label),
      catch: () =>
        new MetadataError({
          message: `Metadata.getAll failed with parameters: ${label}. `,
        }),
    })
);

/**
 * Unsafely calls instance.getAll without Effect wrapper
 * 
 * @example
 * import { Metadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Metadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Metadata.unsafeGetAll(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Metadata.unsafeGetAll failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGetAll = (instance: CML.Metadata, label: bigint): CML.TransactionMetadatumList | undefined =>
  Effect.runSync(getAll(instance, label));

/**
 * Method labels of Metadata
 * 
 * @example
 * import { Metadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Metadata instance
 * const instance = ... ;
 *   const result = yield* Metadata.labels(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const labels = Effect.fn(
  (instance: CML.Metadata): Effect.Effect<CML.TransactionMetadatumLabels, MetadataError> =>
    Effect.try({
      try: () => instance.labels(),
      catch: () =>
        new MetadataError({
          message: `Metadata.labels failed `,
        }),
    })
);

/**
 * Unsafely calls instance.labels without Effect wrapper
 * 
 * @example
 * import { Metadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Metadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Metadata.unsafeLabels(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Metadata.unsafeLabels failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeLabels = (instance: CML.Metadata): CML.TransactionMetadatumLabels =>
  Effect.runSync(labels(instance));

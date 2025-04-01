/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Metadata class
 *
 * @since 2.0.0
 * @category Types
 */
export type Metadata = CML.Metadata;

/**
 * Error class for Metadata operations
 * 
 * This error is thrown when operations on Metadata instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MetadataError extends Data.TaggedError("MetadataError")<{
  message?: string;
}> {}

/**
 * Method free of Metadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Metadata) => Effect.Effect<void, MetadataError> = Effect.fn(
  (instance: CML.Metadata) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Metadata): void =>
  Effect.runSync(free(instance));

/**
 * Static method _new of Metadata
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.Metadata, MetadataError> = Effect.fn(function* () {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.Metadata =>
  Effect.runSync(_new());

/**
 * Method len of Metadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const len: (instance: CML.Metadata) => Effect.Effect<number, MetadataError> = Effect.fn(
  (instance: CML.Metadata) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.Metadata): number =>
  Effect.runSync(len(instance));

/**
 * Method set of Metadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const set: (instance: CML.Metadata, key: bigint, value: CML.TransactionMetadatum) => Effect.Effect<void, MetadataError> = Effect.fn(
  (instance: CML.Metadata, key: bigint, value: CML.TransactionMetadatum) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setUnsafe = (instance: CML.Metadata, key: bigint, value: CML.TransactionMetadatum): void =>
  Effect.runSync(set(instance, key, value));

/**
 * Method get of Metadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.Metadata, label: bigint) => Effect.Effect<CML.TransactionMetadatum | undefined, MetadataError> = Effect.fn(
  (instance: CML.Metadata, label: bigint) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.Metadata, label: bigint): CML.TransactionMetadatum | undefined =>
  Effect.runSync(get(instance, label));

/**
 * Method getAll of Metadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getAll: (instance: CML.Metadata, label: bigint) => Effect.Effect<CML.TransactionMetadatumList | undefined, MetadataError> = Effect.fn(
  (instance: CML.Metadata, label: bigint) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getAllUnsafe = (instance: CML.Metadata, label: bigint): CML.TransactionMetadatumList | undefined =>
  Effect.runSync(getAll(instance, label));

/**
 * Method labels of Metadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const labels: (instance: CML.Metadata) => Effect.Effect<CML.TransactionMetadatumLabels, MetadataError> = Effect.fn(
  (instance: CML.Metadata) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const labelsUnsafe = (instance: CML.Metadata): CML.TransactionMetadatumLabels =>
  Effect.runSync(labels(instance));

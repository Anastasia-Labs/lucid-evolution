/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP25Metadata class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP25Metadata = CML.CIP25Metadata;

/**
 * Error class for CIP25Metadata operations
 *
 * This error is thrown when operations on CIP25Metadata instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CIP25MetadataError extends Data.TaggedError("CIP25MetadataError")<{
  message?: string;
}> {}

/**
 * Method free of CIP25Metadata
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.CIP25Metadata,
) => Effect.Effect<void, CIP25MetadataError> = Effect.fn(
  (instance: CML.CIP25Metadata) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP25MetadataError({
          message: `CIP25Metadata.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP25Metadata): void =>
  Effect.runSync(free(instance));

/**
 * Method toJson of CIP25Metadata
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.CIP25Metadata,
) => Effect.Effect<string, CIP25MetadataError> = Effect.fn(
  (instance: CML.CIP25Metadata) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP25MetadataError({
          message: `CIP25Metadata.toJson failed CIP25Metadata is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.CIP25Metadata): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP25Metadata
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.CIP25Metadata,
) => Effect.Effect<any, CIP25MetadataError> = Effect.fn(
  (instance: CML.CIP25Metadata) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP25MetadataError({
          message: `CIP25Metadata.toJsValue failed CIP25Metadata is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.CIP25Metadata): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP25Metadata
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.CIP25Metadata, CIP25MetadataError> = Effect.fn(
  function* (json: string) {
    return yield* Effect.try({
      try: () => CML.CIP25Metadata.from_json(json),
      catch: () =>
        new CIP25MetadataError({
          message: `CIP25Metadata.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  },
);

/**
 * Unsafely calls CIP25Metadata.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.CIP25Metadata =>
  Effect.runSync(fromJson(json));

/**
 * Method toCborBytes of CIP25Metadata
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.CIP25Metadata,
) => Effect.Effect<Uint8Array, CIP25MetadataError> = Effect.fn(
  (instance: CML.CIP25Metadata) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP25MetadataError({
          message: `CIP25Metadata.toCborBytes failed CIP25Metadata is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.CIP25Metadata): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of CIP25Metadata
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  data: Uint8Array,
) => Effect.Effect<CML.CIP25Metadata, CIP25MetadataError> = Effect.fn(
  function* (data: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.CIP25Metadata.from_cbor_bytes(data),
      catch: () =>
        new CIP25MetadataError({
          message: `CIP25Metadata.fromCborBytes failed with parameters: ${data}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls CIP25Metadata.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (data: Uint8Array): CML.CIP25Metadata =>
  Effect.runSync(fromCborBytes(data));

/**
 * Method key_721 of CIP25Metadata
 *
 * @since 2.0.0
 * @category Methods
 */
export const key_721: (
  instance: CML.CIP25Metadata,
) => Effect.Effect<CML.CIP25LabelMetadata, CIP25MetadataError> = Effect.fn(
  (instance: CML.CIP25Metadata) =>
    Effect.try({
      try: () => instance.key_721(),
      catch: () =>
        new CIP25MetadataError({
          message: `CIP25Metadata.key_721 failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.key_721 without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const key_721Unsafe = (
  instance: CML.CIP25Metadata,
): CML.CIP25LabelMetadata => Effect.runSync(key_721(instance));

/**
 * Static method _new of CIP25Metadata
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  key_721: CML.CIP25LabelMetadata,
) => Effect.Effect<CML.CIP25Metadata, CIP25MetadataError> = Effect.fn(
  function* (key_721: CML.CIP25LabelMetadata) {
    return yield* Effect.try({
      try: () => CML.CIP25Metadata.new(key_721),
      catch: () =>
        new CIP25MetadataError({
          message: `CIP25Metadata._new failed with parameters: ${key_721} (CIP25LabelMetadata). `,
        }),
    });
  },
);

/**
 * Unsafely calls CIP25Metadata._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  key_721: CML.CIP25LabelMetadata,
): CML.CIP25Metadata => Effect.runSync(_new(key_721));

/**
 * Method toMetadata of CIP25Metadata
 *
 * @since 2.0.0
 * @category Methods
 */
export const toMetadata: (
  instance: CML.CIP25Metadata,
) => Effect.Effect<CML.Metadata, CIP25MetadataError> = Effect.fn(
  (instance: CML.CIP25Metadata) =>
    Effect.try({
      try: () => instance.to_metadata(),
      catch: () =>
        new CIP25MetadataError({
          message: `CIP25Metadata.toMetadata failed CIP25Metadata is not valid for Metadata conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toMetadata without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toMetadataUnsafe = (instance: CML.CIP25Metadata): CML.Metadata =>
  Effect.runSync(toMetadata(instance));

/**
 * Static method fromMetadata of CIP25Metadata
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromMetadata: (
  metadata: CML.Metadata,
) => Effect.Effect<CML.CIP25Metadata, CIP25MetadataError> = Effect.fn(
  function* (metadata: CML.Metadata) {
    return yield* Effect.try({
      try: () => CML.CIP25Metadata.from_metadata(metadata),
      catch: () =>
        new CIP25MetadataError({
          message: `CIP25Metadata.fromMetadata failed with parameters: ${metadata} (Metadata). `,
        }),
    });
  },
);

/**
 * Unsafely calls CIP25Metadata.fromMetadata without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromMetadataUnsafe = (metadata: CML.Metadata): CML.CIP25Metadata =>
  Effect.runSync(fromMetadata(metadata));

/**
 * Method addToMetadata of CIP25Metadata
 *
 * @since 2.0.0
 * @category Methods
 */
export const addToMetadata: (
  instance: CML.CIP25Metadata,
  metadata: CML.Metadata,
) => Effect.Effect<void, CIP25MetadataError> = Effect.fn(
  (instance: CML.CIP25Metadata, metadata: CML.Metadata) =>
    Effect.try({
      try: () => instance.add_to_metadata(metadata),
      catch: () =>
        new CIP25MetadataError({
          message: `CIP25Metadata.addToMetadata failed with parameters: ${metadata} (Metadata). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addToMetadata without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addToMetadataUnsafe = (
  instance: CML.CIP25Metadata,
  metadata: CML.Metadata,
): void => Effect.runSync(addToMetadata(instance, metadata));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP25FilesDetails class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP25FilesDetails = CML.CIP25FilesDetails;

/**
 * Error class for CIP25FilesDetails operations
 *
 * This error is thrown when operations on CIP25FilesDetails instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CIP25FilesDetailsError extends Data.TaggedError(
  "CIP25FilesDetailsError",
)<{
  message?: string;
}> {}

/**
 * Method free of CIP25FilesDetails
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.CIP25FilesDetails,
) => Effect.Effect<void, CIP25FilesDetailsError> = Effect.fn(
  (instance: CML.CIP25FilesDetails) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP25FilesDetailsError({
          message: `CIP25FilesDetails.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP25FilesDetails): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP25FilesDetails
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.CIP25FilesDetails,
) => Effect.Effect<Uint8Array, CIP25FilesDetailsError> = Effect.fn(
  (instance: CML.CIP25FilesDetails) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP25FilesDetailsError({
          message: `CIP25FilesDetails.toCborBytes failed CIP25FilesDetails is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.CIP25FilesDetails,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of CIP25FilesDetails
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.CIP25FilesDetails, CIP25FilesDetailsError> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.CIP25FilesDetails.from_cbor_bytes(cborBytes),
      catch: () =>
        new CIP25FilesDetailsError({
          message: `CIP25FilesDetails.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls CIP25FilesDetails.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.CIP25FilesDetails => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP25FilesDetails
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.CIP25FilesDetails,
) => Effect.Effect<string, CIP25FilesDetailsError> = Effect.fn(
  (instance: CML.CIP25FilesDetails) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CIP25FilesDetailsError({
          message: `CIP25FilesDetails.toCborHex failed CIP25FilesDetails is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.CIP25FilesDetails): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of CIP25FilesDetails
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.CIP25FilesDetails, CIP25FilesDetailsError> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.CIP25FilesDetails.from_cbor_hex(cborBytes),
      catch: () =>
        new CIP25FilesDetailsError({
          message: `CIP25FilesDetails.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls CIP25FilesDetails.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.CIP25FilesDetails =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP25FilesDetails
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.CIP25FilesDetails,
) => Effect.Effect<string, CIP25FilesDetailsError> = Effect.fn(
  (instance: CML.CIP25FilesDetails) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP25FilesDetailsError({
          message: `CIP25FilesDetails.toJson failed CIP25FilesDetails is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.CIP25FilesDetails): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP25FilesDetails
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.CIP25FilesDetails,
) => Effect.Effect<any, CIP25FilesDetailsError> = Effect.fn(
  (instance: CML.CIP25FilesDetails) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP25FilesDetailsError({
          message: `CIP25FilesDetails.toJsValue failed CIP25FilesDetails is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.CIP25FilesDetails): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP25FilesDetails
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.CIP25FilesDetails, CIP25FilesDetailsError> = Effect.fn(
  function* (json: string) {
    return yield* Effect.try({
      try: () => CML.CIP25FilesDetails.from_json(json),
      catch: () =>
        new CIP25FilesDetailsError({
          message: `CIP25FilesDetails.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  },
);

/**
 * Unsafely calls CIP25FilesDetails.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.CIP25FilesDetails =>
  Effect.runSync(fromJson(json));

/**
 * Method name of CIP25FilesDetails
 *
 * @since 2.0.0
 * @category Methods
 */
export const name: (
  instance: CML.CIP25FilesDetails,
) => Effect.Effect<CML.CIP25String64, CIP25FilesDetailsError> = Effect.fn(
  (instance: CML.CIP25FilesDetails) =>
    Effect.try({
      try: () => instance.name(),
      catch: () =>
        new CIP25FilesDetailsError({
          message: `CIP25FilesDetails.name failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.name without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nameUnsafe = (
  instance: CML.CIP25FilesDetails,
): CML.CIP25String64 => Effect.runSync(name(instance));

/**
 * Method mediaType of CIP25FilesDetails
 *
 * @since 2.0.0
 * @category Methods
 */
export const mediaType: (
  instance: CML.CIP25FilesDetails,
) => Effect.Effect<CML.CIP25String64, CIP25FilesDetailsError> = Effect.fn(
  (instance: CML.CIP25FilesDetails) =>
    Effect.try({
      try: () => instance.media_type(),
      catch: () =>
        new CIP25FilesDetailsError({
          message: `CIP25FilesDetails.mediaType failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.mediaType without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const mediaTypeUnsafe = (
  instance: CML.CIP25FilesDetails,
): CML.CIP25String64 => Effect.runSync(mediaType(instance));

/**
 * Method src of CIP25FilesDetails
 *
 * @since 2.0.0
 * @category Methods
 */
export const src: (
  instance: CML.CIP25FilesDetails,
) => Effect.Effect<CML.CIP25ChunkableString, CIP25FilesDetailsError> =
  Effect.fn((instance: CML.CIP25FilesDetails) =>
    Effect.try({
      try: () => instance.src(),
      catch: () =>
        new CIP25FilesDetailsError({
          message: `CIP25FilesDetails.src failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.src without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const srcUnsafe = (
  instance: CML.CIP25FilesDetails,
): CML.CIP25ChunkableString => Effect.runSync(src(instance));

/**
 * Static method _new of CIP25FilesDetails
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  name: CML.CIP25String64,
  mediaType: CML.CIP25String64,
  src: CML.CIP25ChunkableString,
) => Effect.Effect<CML.CIP25FilesDetails, CIP25FilesDetailsError> = Effect.fn(
  function* (
    name: CML.CIP25String64,
    mediaType: CML.CIP25String64,
    src: CML.CIP25ChunkableString,
  ) {
    return yield* Effect.try({
      try: () => CML.CIP25FilesDetails.new(name, mediaType, src),
      catch: () =>
        new CIP25FilesDetailsError({
          message: `CIP25FilesDetails._new failed with parameters: ${name} (CIP25String64), ${mediaType} (CIP25String64), ${src} (CIP25ChunkableString). `,
        }),
    });
  },
);

/**
 * Unsafely calls CIP25FilesDetails._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  name: CML.CIP25String64,
  mediaType: CML.CIP25String64,
  src: CML.CIP25ChunkableString,
): CML.CIP25FilesDetails => Effect.runSync(_new(name, mediaType, src));

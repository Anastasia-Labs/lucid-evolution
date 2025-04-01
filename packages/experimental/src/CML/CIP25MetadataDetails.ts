/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP25MetadataDetails class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP25MetadataDetails = CML.CIP25MetadataDetails;

/**
 * Error class for CIP25MetadataDetails operations
 *
 * This error is thrown when operations on CIP25MetadataDetails instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CIP25MetadataDetailsError extends Data.TaggedError(
  "CIP25MetadataDetailsError",
)<{
  message?: string;
}> {}

/**
 * Method free of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MetadataDetails.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.CIP25MetadataDetails,
  ): Effect.Effect<void, CIP25MetadataDetailsError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP25MetadataDetailsError({
          message: `CIP25MetadataDetails.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP25MetadataDetails): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MetadataDetails.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.CIP25MetadataDetails,
  ): Effect.Effect<Uint8Array, CIP25MetadataDetailsError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP25MetadataDetailsError({
          message: `CIP25MetadataDetails.toCborBytes failed CIP25MetadataDetails is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.CIP25MetadataDetails,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25MetadataDetails.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.CIP25MetadataDetails.from_cbor_bytes(cborBytes),
    catch: () =>
      new CIP25MetadataDetailsError({
        message: `CIP25MetadataDetails.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls CIP25MetadataDetails.fromCborBytes without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MetadataDetails.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.CIP25MetadataDetails,
  ): Effect.Effect<string, CIP25MetadataDetailsError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CIP25MetadataDetailsError({
          message: `CIP25MetadataDetails.toCborHex failed CIP25MetadataDetails is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.CIP25MetadataDetails): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25MetadataDetails.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.CIP25MetadataDetails.from_cbor_hex(cborBytes),
    catch: () =>
      new CIP25MetadataDetailsError({
        message: `CIP25MetadataDetails.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls CIP25MetadataDetails.fromCborHex without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MetadataDetails.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.CIP25MetadataDetails,
  ): Effect.Effect<string, CIP25MetadataDetailsError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP25MetadataDetailsError({
          message: `CIP25MetadataDetails.toJson failed CIP25MetadataDetails is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.CIP25MetadataDetails): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MetadataDetails.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.CIP25MetadataDetails,
  ): Effect.Effect<any, CIP25MetadataDetailsError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP25MetadataDetailsError({
          message: `CIP25MetadataDetails.toJsValue failed CIP25MetadataDetails is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.CIP25MetadataDetails): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25MetadataDetails.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP25MetadataDetails.from_json(json),
    catch: () =>
      new CIP25MetadataDetailsError({
        message: `CIP25MetadataDetails.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls CIP25MetadataDetails.fromJson without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method name of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MetadataDetails.name(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const name = Effect.fn(
  (
    instance: CML.CIP25MetadataDetails,
  ): Effect.Effect<CML.CIP25String64, CIP25MetadataDetailsError> =>
    Effect.try({
      try: () => instance.name(),
      catch: () =>
        new CIP25MetadataDetailsError({
          message: `CIP25MetadataDetails.name failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.name without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails.nameUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails.nameUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nameUnsafe = (
  instance: CML.CIP25MetadataDetails,
): CML.CIP25String64 => Effect.runSync(name(instance));

/**
 * Method image of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MetadataDetails.image(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const image = Effect.fn(
  (
    instance: CML.CIP25MetadataDetails,
  ): Effect.Effect<CML.CIP25ChunkableString, CIP25MetadataDetailsError> =>
    Effect.try({
      try: () => instance.image(),
      catch: () =>
        new CIP25MetadataDetailsError({
          message: `CIP25MetadataDetails.image failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.image without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails.imageUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails.imageUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const imageUnsafe = (
  instance: CML.CIP25MetadataDetails,
): CML.CIP25ChunkableString => Effect.runSync(image(instance));

/**
 * Method setMediaType of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MetadataDetails.setMediaType(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setMediaType = Effect.fn(
  (
    instance: CML.CIP25MetadataDetails,
    mediaType: CML.CIP25String64,
  ): Effect.Effect<void, CIP25MetadataDetailsError> =>
    Effect.try({
      try: () => instance.set_media_type(mediaType),
      catch: () =>
        new CIP25MetadataDetailsError({
          message: `CIP25MetadataDetails.setMediaType failed with parameters: ${mediaType} (CIP25String64). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setMediaType without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails.setMediaTypeUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails.setMediaTypeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMediaTypeUnsafe = (
  instance: CML.CIP25MetadataDetails,
  mediaType: CML.CIP25String64,
): void => Effect.runSync(setMediaType(instance, mediaType));

/**
 * Method mediaType of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MetadataDetails.mediaType(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const mediaType = Effect.fn(
  (
    instance: CML.CIP25MetadataDetails,
  ): Effect.Effect<CML.CIP25String64 | undefined, CIP25MetadataDetailsError> =>
    Effect.try({
      try: () => instance.media_type(),
      catch: () =>
        new CIP25MetadataDetailsError({
          message: `CIP25MetadataDetails.mediaType failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.mediaType without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails.mediaTypeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails.mediaTypeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const mediaTypeUnsafe = (
  instance: CML.CIP25MetadataDetails,
): CML.CIP25String64 | undefined => Effect.runSync(mediaType(instance));

/**
 * Method setDescription of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MetadataDetails.setDescription(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setDescription = Effect.fn(
  (
    instance: CML.CIP25MetadataDetails,
    description: CML.CIP25ChunkableString,
  ): Effect.Effect<void, CIP25MetadataDetailsError> =>
    Effect.try({
      try: () => instance.set_description(description),
      catch: () =>
        new CIP25MetadataDetailsError({
          message: `CIP25MetadataDetails.setDescription failed with parameters: ${description} (CIP25ChunkableString). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setDescription without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails.setDescriptionUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails.setDescriptionUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setDescriptionUnsafe = (
  instance: CML.CIP25MetadataDetails,
  description: CML.CIP25ChunkableString,
): void => Effect.runSync(setDescription(instance, description));

/**
 * Method description of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MetadataDetails.description(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const description = Effect.fn(
  (
    instance: CML.CIP25MetadataDetails,
  ): Effect.Effect<
    CML.CIP25ChunkableString | undefined,
    CIP25MetadataDetailsError
  > =>
    Effect.try({
      try: () => instance.description(),
      catch: () =>
        new CIP25MetadataDetailsError({
          message: `CIP25MetadataDetails.description failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.description without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails.descriptionUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails.descriptionUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const descriptionUnsafe = (
  instance: CML.CIP25MetadataDetails,
): CML.CIP25ChunkableString | undefined =>
  Effect.runSync(description(instance));

/**
 * Method setFiles of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MetadataDetails.setFiles(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setFiles = Effect.fn(
  (
    instance: CML.CIP25MetadataDetails,
    files: CML.FilesDetailsList,
  ): Effect.Effect<void, CIP25MetadataDetailsError> =>
    Effect.try({
      try: () => instance.set_files(files),
      catch: () =>
        new CIP25MetadataDetailsError({
          message: `CIP25MetadataDetails.setFiles failed with parameters: ${files} (FilesDetailsList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setFiles without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails.setFilesUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails.setFilesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setFilesUnsafe = (
  instance: CML.CIP25MetadataDetails,
  files: CML.FilesDetailsList,
): void => Effect.runSync(setFiles(instance, files));

/**
 * Method files of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25MetadataDetails.files(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const files = Effect.fn(
  (
    instance: CML.CIP25MetadataDetails,
  ): Effect.Effect<
    CML.FilesDetailsList | undefined,
    CIP25MetadataDetailsError
  > =>
    Effect.try({
      try: () => instance.files(),
      catch: () =>
        new CIP25MetadataDetailsError({
          message: `CIP25MetadataDetails.files failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.files without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25MetadataDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails.filesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails.filesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const filesUnsafe = (
  instance: CML.CIP25MetadataDetails,
): CML.FilesDetailsList | undefined => Effect.runSync(files(instance));

/**
 * Static method _new of CIP25MetadataDetails
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25MetadataDetails._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  name: CML.CIP25String64,
  image: CML.CIP25ChunkableString,
) {
  return yield* Effect.try({
    try: () => CML.CIP25MetadataDetails.new(name, image),
    catch: () =>
      new CIP25MetadataDetailsError({
        message: `CIP25MetadataDetails._new failed with parameters: ${name} (CIP25String64), ${image} (CIP25ChunkableString). `,
      }),
  });
});

/**
 * Unsafely calls CIP25MetadataDetails._new without Effect wrapper
 *
 * @example
 * import { CIP25MetadataDetails } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25MetadataDetails._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25MetadataDetails._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  name: CML.CIP25String64,
  image: CML.CIP25ChunkableString,
) => Effect.runSync(_new(name, image));

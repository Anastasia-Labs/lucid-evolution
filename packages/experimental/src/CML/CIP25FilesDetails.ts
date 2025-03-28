import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type CIP25FilesDetails = CML.CIP25FilesDetails;

export class CIP25FilesDetailsError extends Data.TaggedError(
  "CIP25FilesDetailsError",
)<{
  message?: string;
}> {}

/**
 * Method free of CIP25FilesDetails
 *
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25FilesDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25FilesDetails.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.CIP25FilesDetails,
  ): Effect.Effect<void, CIP25FilesDetailsError> =>
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
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25FilesDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25FilesDetails.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25FilesDetails.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.CIP25FilesDetails): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP25FilesDetails
 *
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25FilesDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25FilesDetails.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.CIP25FilesDetails,
  ): Effect.Effect<Uint8Array, CIP25FilesDetailsError> =>
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
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25FilesDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25FilesDetails.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25FilesDetails.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (
  instance: CML.CIP25FilesDetails,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of CIP25FilesDetails
 *
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25FilesDetails.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.CIP25FilesDetails.from_cbor_bytes(cborBytes),
    catch: () =>
      new CIP25FilesDetailsError({
        message: `CIP25FilesDetails.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls CIP25FilesDetails.fromCborBytes without Effect wrapper
 *
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25FilesDetails.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25FilesDetails.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP25FilesDetails
 *
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25FilesDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25FilesDetails.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.CIP25FilesDetails,
  ): Effect.Effect<string, CIP25FilesDetailsError> =>
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
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25FilesDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25FilesDetails.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25FilesDetails.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.CIP25FilesDetails): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of CIP25FilesDetails
 *
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25FilesDetails.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.CIP25FilesDetails.from_cbor_hex(cborBytes),
    catch: () =>
      new CIP25FilesDetailsError({
        message: `CIP25FilesDetails.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls CIP25FilesDetails.fromCborHex without Effect wrapper
 *
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25FilesDetails.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25FilesDetails.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP25FilesDetails
 *
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25FilesDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25FilesDetails.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.CIP25FilesDetails,
  ): Effect.Effect<string, CIP25FilesDetailsError> =>
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
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25FilesDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25FilesDetails.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25FilesDetails.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.CIP25FilesDetails): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP25FilesDetails
 *
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25FilesDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25FilesDetails.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.CIP25FilesDetails,
  ): Effect.Effect<any, CIP25FilesDetailsError> =>
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
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25FilesDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25FilesDetails.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25FilesDetails.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.CIP25FilesDetails): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP25FilesDetails
 *
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25FilesDetails.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP25FilesDetails.from_json(json),
    catch: () =>
      new CIP25FilesDetailsError({
        message: `CIP25FilesDetails.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls CIP25FilesDetails.fromJson without Effect wrapper
 *
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25FilesDetails.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25FilesDetails.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method name of CIP25FilesDetails
 *
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25FilesDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25FilesDetails.name(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const name = Effect.fn(
  (
    instance: CML.CIP25FilesDetails,
  ): Effect.Effect<CML.CIP25String64, CIP25FilesDetailsError> =>
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
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25FilesDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25FilesDetails.unsafeName(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25FilesDetails.unsafeName failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeName = (
  instance: CML.CIP25FilesDetails,
): CML.CIP25String64 => Effect.runSync(name(instance));

/**
 * Method mediaType of CIP25FilesDetails
 *
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25FilesDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25FilesDetails.mediaType(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const mediaType = Effect.fn(
  (
    instance: CML.CIP25FilesDetails,
  ): Effect.Effect<CML.CIP25String64, CIP25FilesDetailsError> =>
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
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25FilesDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25FilesDetails.unsafeMediaType(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25FilesDetails.unsafeMediaType failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMediaType = (
  instance: CML.CIP25FilesDetails,
): CML.CIP25String64 => Effect.runSync(mediaType(instance));

/**
 * Method src of CIP25FilesDetails
 *
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25FilesDetails instance
 * const instance = ... ;
 *   const result = yield* CIP25FilesDetails.src(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const src = Effect.fn(
  (
    instance: CML.CIP25FilesDetails,
  ): Effect.Effect<CML.CIP25ChunkableString, CIP25FilesDetailsError> =>
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
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP25FilesDetails instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25FilesDetails.unsafeSrc(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25FilesDetails.unsafeSrc failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeSrc = (
  instance: CML.CIP25FilesDetails,
): CML.CIP25ChunkableString => Effect.runSync(src(instance));

/**
 * Static method _new of CIP25FilesDetails
 *
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP25FilesDetails._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
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
});

/**
 * Unsafely calls CIP25FilesDetails._new without Effect wrapper
 *
 * @example
 * import { CIP25FilesDetails } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25FilesDetails.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25FilesDetails.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (
  name: CML.CIP25String64,
  mediaType: CML.CIP25String64,
  src: CML.CIP25ChunkableString,
) => Effect.runSync(_new(name, mediaType, src));

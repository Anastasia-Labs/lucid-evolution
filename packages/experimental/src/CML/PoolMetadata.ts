/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PoolMetadata class
 *
 * @since 2.0.0
 * @category Types
 */
export type PoolMetadata = CML.PoolMetadata;

/**
 * Error class for PoolMetadata operations
 * 
 * This error is thrown when operations on PoolMetadata instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PoolMetadataError extends Data.TaggedError("PoolMetadataError")<{
  message?: string;
}> {}

/**
 * Method free of PoolMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.PoolMetadata) => Effect.Effect<void, PoolMetadataError> = Effect.fn(
  (instance: CML.PoolMetadata) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PoolMetadataError({
          message: `PoolMetadata.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PoolMetadata): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of PoolMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.PoolMetadata) => Effect.Effect<Uint8Array, PoolMetadataError> = Effect.fn(
  (instance: CML.PoolMetadata) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new PoolMetadataError({
          message: `PoolMetadata.toCborBytes failed PoolMetadata is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.PoolMetadata): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PoolMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.PoolMetadata) => Effect.Effect<Uint8Array, PoolMetadataError> = Effect.fn(
  (instance: CML.PoolMetadata) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new PoolMetadataError({
          message: `PoolMetadata.toCanonicalCborBytes failed PoolMetadata is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.PoolMetadata): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PoolMetadata
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.PoolMetadata, PoolMetadataError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PoolMetadata.from_cbor_bytes(cborBytes),
    catch: () => new PoolMetadataError({
      message: `PoolMetadata.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls PoolMetadata.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.PoolMetadata =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PoolMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.PoolMetadata) => Effect.Effect<string, PoolMetadataError> = Effect.fn(
  (instance: CML.PoolMetadata) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new PoolMetadataError({
          message: `PoolMetadata.toCborHex failed PoolMetadata is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.PoolMetadata): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PoolMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.PoolMetadata) => Effect.Effect<string, PoolMetadataError> = Effect.fn(
  (instance: CML.PoolMetadata) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new PoolMetadataError({
          message: `PoolMetadata.toCanonicalCborHex failed PoolMetadata is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.PoolMetadata): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PoolMetadata
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.PoolMetadata, PoolMetadataError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.PoolMetadata.from_cbor_hex(cborBytes),
    catch: () => new PoolMetadataError({
      message: `PoolMetadata.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls PoolMetadata.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.PoolMetadata =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of PoolMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.PoolMetadata) => Effect.Effect<string, PoolMetadataError> = Effect.fn(
  (instance: CML.PoolMetadata) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new PoolMetadataError({
          message: `PoolMetadata.toJson failed PoolMetadata is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.PoolMetadata): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of PoolMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.PoolMetadata) => Effect.Effect<any, PoolMetadataError> = Effect.fn(
  (instance: CML.PoolMetadata) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new PoolMetadataError({
          message: `PoolMetadata.toJsValue failed PoolMetadata is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.PoolMetadata): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of PoolMetadata
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.PoolMetadata, PoolMetadataError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.PoolMetadata.from_json(json),
    catch: () => new PoolMetadataError({
      message: `PoolMetadata.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls PoolMetadata.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.PoolMetadata =>
  Effect.runSync(fromJson(json));

/**
 * Method url of PoolMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const url: (instance: CML.PoolMetadata) => Effect.Effect<CML.Url, PoolMetadataError> = Effect.fn(
  (instance: CML.PoolMetadata) =>
    Effect.try({
      try: () => instance.url(),
      catch: () =>
        new PoolMetadataError({
          message: `PoolMetadata.url failed `,
        }),
    })
);

/**
 * Unsafely calls instance.url without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const urlUnsafe = (instance: CML.PoolMetadata): CML.Url =>
  Effect.runSync(url(instance));

/**
 * Method poolMetadataHash of PoolMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const poolMetadataHash: (instance: CML.PoolMetadata) => Effect.Effect<CML.PoolMetadataHash, PoolMetadataError> = Effect.fn(
  (instance: CML.PoolMetadata) =>
    Effect.try({
      try: () => instance.pool_metadata_hash(),
      catch: () =>
        new PoolMetadataError({
          message: `PoolMetadata.poolMetadataHash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.poolMetadataHash without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolMetadataHashUnsafe = (instance: CML.PoolMetadata): CML.PoolMetadataHash =>
  Effect.runSync(poolMetadataHash(instance));

/**
 * Static method _new of PoolMetadata
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (url: CML.Url, poolMetadataHash: CML.PoolMetadataHash) => Effect.Effect<CML.PoolMetadata, PoolMetadataError> = Effect.fn(function* (url: CML.Url, poolMetadataHash: CML.PoolMetadataHash) {
  return yield* Effect.try({
    try: () => CML.PoolMetadata.new(url, poolMetadataHash),
    catch: () => new PoolMetadataError({
      message: `PoolMetadata._new failed with parameters: ${url} (Url), ${poolMetadataHash} (PoolMetadataHash). `,
    }),
  });
});

/**
 * Unsafely calls PoolMetadata._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (url: CML.Url, poolMetadataHash: CML.PoolMetadataHash): CML.PoolMetadata =>
  Effect.runSync(_new(url, poolMetadataHash));

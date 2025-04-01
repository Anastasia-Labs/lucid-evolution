/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP25LabelMetadata class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP25LabelMetadata = CML.CIP25LabelMetadata;

/**
 * Error class for CIP25LabelMetadata operations
 * 
 * This error is thrown when operations on CIP25LabelMetadata instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CIP25LabelMetadataError extends Data.TaggedError("CIP25LabelMetadataError")<{
  message?: string;
}> {}

/**
 * Method free of CIP25LabelMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.CIP25LabelMetadata) => Effect.Effect<void, CIP25LabelMetadataError> = Effect.fn(
  (instance: CML.CIP25LabelMetadata) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP25LabelMetadataError({
          message: `CIP25LabelMetadata.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP25LabelMetadata): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP25LabelMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.CIP25LabelMetadata) => Effect.Effect<Uint8Array, CIP25LabelMetadataError> = Effect.fn(
  (instance: CML.CIP25LabelMetadata) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP25LabelMetadataError({
          message: `CIP25LabelMetadata.toCborBytes failed CIP25LabelMetadata is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.CIP25LabelMetadata): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of CIP25LabelMetadata
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.CIP25LabelMetadata, CIP25LabelMetadataError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.CIP25LabelMetadata.from_cbor_bytes(cborBytes),
    catch: () => new CIP25LabelMetadataError({
      message: `CIP25LabelMetadata.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls CIP25LabelMetadata.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.CIP25LabelMetadata =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP25LabelMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.CIP25LabelMetadata) => Effect.Effect<string, CIP25LabelMetadataError> = Effect.fn(
  (instance: CML.CIP25LabelMetadata) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CIP25LabelMetadataError({
          message: `CIP25LabelMetadata.toCborHex failed CIP25LabelMetadata is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.CIP25LabelMetadata): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of CIP25LabelMetadata
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.CIP25LabelMetadata, CIP25LabelMetadataError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.CIP25LabelMetadata.from_cbor_hex(cborBytes),
    catch: () => new CIP25LabelMetadataError({
      message: `CIP25LabelMetadata.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls CIP25LabelMetadata.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.CIP25LabelMetadata =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP25LabelMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.CIP25LabelMetadata) => Effect.Effect<string, CIP25LabelMetadataError> = Effect.fn(
  (instance: CML.CIP25LabelMetadata) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP25LabelMetadataError({
          message: `CIP25LabelMetadata.toJson failed CIP25LabelMetadata is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.CIP25LabelMetadata): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP25LabelMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.CIP25LabelMetadata) => Effect.Effect<any, CIP25LabelMetadataError> = Effect.fn(
  (instance: CML.CIP25LabelMetadata) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP25LabelMetadataError({
          message: `CIP25LabelMetadata.toJsValue failed CIP25LabelMetadata is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.CIP25LabelMetadata): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP25LabelMetadata
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.CIP25LabelMetadata, CIP25LabelMetadataError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP25LabelMetadata.from_json(json),
    catch: () => new CIP25LabelMetadataError({
      message: `CIP25LabelMetadata.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls CIP25LabelMetadata.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.CIP25LabelMetadata =>
  Effect.runSync(fromJson(json));

/**
 * Static method _new of CIP25LabelMetadata
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (version: CML.CIP25Version) => Effect.Effect<CML.CIP25LabelMetadata, CIP25LabelMetadataError> = Effect.fn(function* (version: CML.CIP25Version) {
  return yield* Effect.try({
    try: () => CML.CIP25LabelMetadata.new(version),
    catch: () => new CIP25LabelMetadataError({
      message: `CIP25LabelMetadata._new failed with parameters: ${version} (CIP25Version). `,
    }),
  });
});

/**
 * Unsafely calls CIP25LabelMetadata._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (version: CML.CIP25Version): CML.CIP25LabelMetadata =>
  Effect.runSync(_new(version));

/**
 * Method set of CIP25LabelMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const set: (instance: CML.CIP25LabelMetadata, policyId: CML.ScriptHash, assetName: CML.AssetName, details: CML.CIP25MetadataDetails) => Effect.Effect<CML.CIP25MetadataDetails | undefined, CIP25LabelMetadataError> = Effect.fn(
  (instance: CML.CIP25LabelMetadata, policyId: CML.ScriptHash, assetName: CML.AssetName, details: CML.CIP25MetadataDetails) =>
    Effect.try({
      try: () => instance.set(policyId, assetName, details),
      catch: () =>
        new CIP25LabelMetadataError({
          message: `CIP25LabelMetadata.set failed with parameters: ${policyId} (ScriptHash), ${assetName} (AssetName), ${details} (CIP25MetadataDetails). `,
        }),
    })
);

/**
 * Unsafely calls instance.set without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setUnsafe = (instance: CML.CIP25LabelMetadata, policyId: CML.ScriptHash, assetName: CML.AssetName, details: CML.CIP25MetadataDetails): CML.CIP25MetadataDetails | undefined =>
  Effect.runSync(set(instance, policyId, assetName, details));

/**
 * Method get of CIP25LabelMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.CIP25LabelMetadata, policyId: CML.ScriptHash, assetName: CML.AssetName) => Effect.Effect<CML.CIP25MetadataDetails | undefined, CIP25LabelMetadataError> = Effect.fn(
  (instance: CML.CIP25LabelMetadata, policyId: CML.ScriptHash, assetName: CML.AssetName) =>
    Effect.try({
      try: () => instance.get(policyId, assetName),
      catch: () =>
        new CIP25LabelMetadataError({
          message: `CIP25LabelMetadata.get failed with parameters: ${policyId} (ScriptHash), ${assetName} (AssetName). `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.CIP25LabelMetadata, policyId: CML.ScriptHash, assetName: CML.AssetName): CML.CIP25MetadataDetails | undefined =>
  Effect.runSync(get(instance, policyId, assetName));

/**
 * Method version of CIP25LabelMetadata
 * 
 * @since 2.0.0
 * @category Methods
 */
export const version: (instance: CML.CIP25LabelMetadata) => Effect.Effect<CML.CIP25Version, CIP25LabelMetadataError> = Effect.fn(
  (instance: CML.CIP25LabelMetadata) =>
    Effect.try({
      try: () => instance.version(),
      catch: () =>
        new CIP25LabelMetadataError({
          message: `CIP25LabelMetadata.version failed `,
        }),
    })
);

/**
 * Unsafely calls instance.version without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const versionUnsafe = (instance: CML.CIP25LabelMetadata): CML.CIP25Version =>
  Effect.runSync(version(instance));

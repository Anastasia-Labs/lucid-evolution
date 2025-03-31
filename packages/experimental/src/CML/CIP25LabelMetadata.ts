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
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25LabelMetadata instance
 * const instance = ... ;
 *   const result = yield* CIP25LabelMetadata.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.CIP25LabelMetadata): Effect.Effect<void, CIP25LabelMetadataError> =>
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
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP25LabelMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25LabelMetadata.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25LabelMetadata.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP25LabelMetadata): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP25LabelMetadata
 * 
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25LabelMetadata instance
 * const instance = ... ;
 *   const result = yield* CIP25LabelMetadata.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.CIP25LabelMetadata): Effect.Effect<Uint8Array, CIP25LabelMetadataError> =>
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
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP25LabelMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25LabelMetadata.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25LabelMetadata.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.CIP25LabelMetadata): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of CIP25LabelMetadata
 * 
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP25LabelMetadata.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
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
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25LabelMetadata.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25LabelMetadata.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP25LabelMetadata
 * 
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25LabelMetadata instance
 * const instance = ... ;
 *   const result = yield* CIP25LabelMetadata.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.CIP25LabelMetadata): Effect.Effect<string, CIP25LabelMetadataError> =>
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
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP25LabelMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25LabelMetadata.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25LabelMetadata.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.CIP25LabelMetadata): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of CIP25LabelMetadata
 * 
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP25LabelMetadata.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
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
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25LabelMetadata.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25LabelMetadata.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP25LabelMetadata
 * 
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25LabelMetadata instance
 * const instance = ... ;
 *   const result = yield* CIP25LabelMetadata.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.CIP25LabelMetadata): Effect.Effect<string, CIP25LabelMetadataError> =>
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
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP25LabelMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25LabelMetadata.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25LabelMetadata.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.CIP25LabelMetadata): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP25LabelMetadata
 * 
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25LabelMetadata instance
 * const instance = ... ;
 *   const result = yield* CIP25LabelMetadata.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.CIP25LabelMetadata): Effect.Effect<any, CIP25LabelMetadataError> =>
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
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP25LabelMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25LabelMetadata.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25LabelMetadata.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.CIP25LabelMetadata): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP25LabelMetadata
 * 
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP25LabelMetadata.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
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
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25LabelMetadata.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25LabelMetadata.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Static method _new of CIP25LabelMetadata
 * 
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP25LabelMetadata._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (version: CML.CIP25Version) {
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
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25LabelMetadata._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25LabelMetadata._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (version: CML.CIP25Version) =>
  Effect.runSync(_new(version));

/**
 * Method set of CIP25LabelMetadata
 * 
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25LabelMetadata instance
 * const instance = ... ;
 *   const result = yield* CIP25LabelMetadata.set(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const set = Effect.fn(
  (instance: CML.CIP25LabelMetadata, policyId: CML.ScriptHash, assetName: CML.AssetName, details: CML.CIP25MetadataDetails): Effect.Effect<CML.CIP25MetadataDetails | undefined, CIP25LabelMetadataError> =>
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
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP25LabelMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25LabelMetadata.setUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25LabelMetadata.setUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setUnsafe = (instance: CML.CIP25LabelMetadata, policyId: CML.ScriptHash, assetName: CML.AssetName, details: CML.CIP25MetadataDetails): CML.CIP25MetadataDetails | undefined =>
  Effect.runSync(set(instance, policyId, assetName, details));

/**
 * Method get of CIP25LabelMetadata
 * 
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25LabelMetadata instance
 * const instance = ... ;
 *   const result = yield* CIP25LabelMetadata.get(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.CIP25LabelMetadata, policyId: CML.ScriptHash, assetName: CML.AssetName): Effect.Effect<CML.CIP25MetadataDetails | undefined, CIP25LabelMetadataError> =>
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
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP25LabelMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25LabelMetadata.getUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25LabelMetadata.getUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.CIP25LabelMetadata, policyId: CML.ScriptHash, assetName: CML.AssetName): CML.CIP25MetadataDetails | undefined =>
  Effect.runSync(get(instance, policyId, assetName));

/**
 * Method version of CIP25LabelMetadata
 * 
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25LabelMetadata instance
 * const instance = ... ;
 *   const result = yield* CIP25LabelMetadata.version(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const version = Effect.fn(
  (instance: CML.CIP25LabelMetadata): Effect.Effect<CML.CIP25Version, CIP25LabelMetadataError> =>
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
 * @example
 * import { CIP25LabelMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP25LabelMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25LabelMetadata.versionUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25LabelMetadata.versionUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const versionUnsafe = (instance: CML.CIP25LabelMetadata): CML.CIP25Version =>
  Effect.runSync(version(instance));

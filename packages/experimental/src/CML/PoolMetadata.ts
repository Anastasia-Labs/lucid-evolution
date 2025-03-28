import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type PoolMetadata = CML.PoolMetadata;

export class PoolMetadataError extends Data.TaggedError("PoolMetadataError")<{
  message?: string;
}> {}

/**
 * Method free of PoolMetadata
 * 
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 *   const result = yield* PoolMetadata.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PoolMetadata): Effect.Effect<void, PoolMetadataError> =>
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
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadata.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadata.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.PoolMetadata): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of PoolMetadata
 * 
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 *   const result = yield* PoolMetadata.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.PoolMetadata): Effect.Effect<Uint8Array, PoolMetadataError> =>
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
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadata.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadata.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.PoolMetadata): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PoolMetadata
 * 
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 *   const result = yield* PoolMetadata.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.PoolMetadata): Effect.Effect<Uint8Array, PoolMetadataError> =>
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
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadata.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadata.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.PoolMetadata): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PoolMetadata
 * 
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PoolMetadata.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
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
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadata.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadata.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PoolMetadata
 * 
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 *   const result = yield* PoolMetadata.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.PoolMetadata): Effect.Effect<string, PoolMetadataError> =>
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
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadata.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadata.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.PoolMetadata): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PoolMetadata
 * 
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 *   const result = yield* PoolMetadata.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.PoolMetadata): Effect.Effect<string, PoolMetadataError> =>
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
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadata.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadata.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.PoolMetadata): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PoolMetadata
 * 
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PoolMetadata.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
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
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadata.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadata.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of PoolMetadata
 * 
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 *   const result = yield* PoolMetadata.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.PoolMetadata): Effect.Effect<string, PoolMetadataError> =>
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
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadata.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadata.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.PoolMetadata): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of PoolMetadata
 * 
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 *   const result = yield* PoolMetadata.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.PoolMetadata): Effect.Effect<any, PoolMetadataError> =>
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
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadata.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadata.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.PoolMetadata): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of PoolMetadata
 * 
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PoolMetadata.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
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
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadata.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadata.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method url of PoolMetadata
 * 
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 *   const result = yield* PoolMetadata.url(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const url = Effect.fn(
  (instance: CML.PoolMetadata): Effect.Effect<CML.Url, PoolMetadataError> =>
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
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadata.unsafeUrl(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadata.unsafeUrl failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeUrl = (instance: CML.PoolMetadata): CML.Url =>
  Effect.runSync(url(instance));

/**
 * Method poolMetadataHash of PoolMetadata
 * 
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 *   const result = yield* PoolMetadata.poolMetadataHash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const poolMetadataHash = Effect.fn(
  (instance: CML.PoolMetadata): Effect.Effect<CML.PoolMetadataHash, PoolMetadataError> =>
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
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PoolMetadata instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadata.unsafePoolMetadataHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadata.unsafePoolMetadataHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafePoolMetadataHash = (instance: CML.PoolMetadata): CML.PoolMetadataHash =>
  Effect.runSync(poolMetadataHash(instance));

/**
 * Static method _new of PoolMetadata
 * 
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PoolMetadata._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (url: CML.Url, poolMetadataHash: CML.PoolMetadataHash) {
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
 * @example
 * import { PoolMetadata } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadata.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadata.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (url: CML.Url, poolMetadataHash: CML.PoolMetadataHash) =>
  Effect.runSync(_new(url, poolMetadataHash));

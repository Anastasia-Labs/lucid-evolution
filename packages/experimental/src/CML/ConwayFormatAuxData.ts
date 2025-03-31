/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ConwayFormatAuxData class
 *
 * @since 2.0.0
 * @category Types
 */
export type ConwayFormatAuxData = CML.ConwayFormatAuxData;

/**
 * Error class for ConwayFormatAuxData operations
 * 
 * This error is thrown when operations on ConwayFormatAuxData instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ConwayFormatAuxDataError extends Data.TaggedError("ConwayFormatAuxDataError")<{
  message?: string;
}> {}

/**
 * Method free of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ConwayFormatAuxData): Effect.Effect<void, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ConwayFormatAuxData): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.ConwayFormatAuxData): Effect.Effect<Uint8Array, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.toCborBytes failed ConwayFormatAuxData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ConwayFormatAuxData): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.ConwayFormatAuxData): Effect.Effect<Uint8Array, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.toCanonicalCborBytes failed ConwayFormatAuxData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.ConwayFormatAuxData): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ConwayFormatAuxData.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ConwayFormatAuxData.from_cbor_bytes(cborBytes),
    catch: () => new ConwayFormatAuxDataError({
      message: `ConwayFormatAuxData.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls ConwayFormatAuxData.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.ConwayFormatAuxData): Effect.Effect<string, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.toCborHex failed ConwayFormatAuxData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ConwayFormatAuxData): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.ConwayFormatAuxData): Effect.Effect<string, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.toCanonicalCborHex failed ConwayFormatAuxData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ConwayFormatAuxData): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ConwayFormatAuxData.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ConwayFormatAuxData.from_cbor_hex(cborBytes),
    catch: () => new ConwayFormatAuxDataError({
      message: `ConwayFormatAuxData.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls ConwayFormatAuxData.fromCborHex without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.ConwayFormatAuxData): Effect.Effect<string, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.toJson failed ConwayFormatAuxData is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ConwayFormatAuxData): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.ConwayFormatAuxData): Effect.Effect<any, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.toJsValue failed ConwayFormatAuxData is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ConwayFormatAuxData): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ConwayFormatAuxData.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ConwayFormatAuxData.from_json(json),
    catch: () => new ConwayFormatAuxDataError({
      message: `ConwayFormatAuxData.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls ConwayFormatAuxData.fromJson without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method setMetadata of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.setMetadata(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setMetadata = Effect.fn(
  (instance: CML.ConwayFormatAuxData, metadata: CML.Metadata): Effect.Effect<void, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.set_metadata(metadata),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.setMetadata failed with parameters: ${metadata} (Metadata). `,
        }),
    })
);

/**
 * Unsafely calls instance.setMetadata without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.setMetadataUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.setMetadataUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setMetadataUnsafe = (instance: CML.ConwayFormatAuxData, metadata: CML.Metadata): void =>
  Effect.runSync(setMetadata(instance, metadata));

/**
 * Method metadata of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.metadata(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const metadata = Effect.fn(
  (instance: CML.ConwayFormatAuxData): Effect.Effect<CML.Metadata | undefined, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.metadata(),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.metadata failed `,
        }),
    })
);

/**
 * Unsafely calls instance.metadata without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.metadataUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.metadataUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const metadataUnsafe = (instance: CML.ConwayFormatAuxData): CML.Metadata | undefined =>
  Effect.runSync(metadata(instance));

/**
 * Method setNativeScripts of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.setNativeScripts(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setNativeScripts = Effect.fn(
  (instance: CML.ConwayFormatAuxData, nativeScripts: CML.NativeScriptList): Effect.Effect<void, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.set_native_scripts(nativeScripts),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.setNativeScripts failed with parameters: ${nativeScripts} (NativeScriptList). `,
        }),
    })
);

/**
 * Unsafely calls instance.setNativeScripts without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.setNativeScriptsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.setNativeScriptsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setNativeScriptsUnsafe = (instance: CML.ConwayFormatAuxData, nativeScripts: CML.NativeScriptList): void =>
  Effect.runSync(setNativeScripts(instance, nativeScripts));

/**
 * Method nativeScripts of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.nativeScripts(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const nativeScripts = Effect.fn(
  (instance: CML.ConwayFormatAuxData): Effect.Effect<CML.NativeScriptList | undefined, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.native_scripts(),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.nativeScripts failed `,
        }),
    })
);

/**
 * Unsafely calls instance.nativeScripts without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.nativeScriptsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.nativeScriptsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nativeScriptsUnsafe = (instance: CML.ConwayFormatAuxData): CML.NativeScriptList | undefined =>
  Effect.runSync(nativeScripts(instance));

/**
 * Method setPlutusV1Scripts of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.setPlutusV1Scripts(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setPlutusV1Scripts = Effect.fn(
  (instance: CML.ConwayFormatAuxData, plutusV1Scripts: CML.PlutusV1ScriptList): Effect.Effect<void, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.set_plutus_v1_scripts(plutusV1Scripts),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.setPlutusV1Scripts failed with parameters: ${plutusV1Scripts} (PlutusV1ScriptList). `,
        }),
    })
);

/**
 * Unsafely calls instance.setPlutusV1Scripts without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.setPlutusV1ScriptsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.setPlutusV1ScriptsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPlutusV1ScriptsUnsafe = (instance: CML.ConwayFormatAuxData, plutusV1Scripts: CML.PlutusV1ScriptList): void =>
  Effect.runSync(setPlutusV1Scripts(instance, plutusV1Scripts));

/**
 * Method plutusV1Scripts of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.plutusV1Scripts(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const plutusV1Scripts = Effect.fn(
  (instance: CML.ConwayFormatAuxData): Effect.Effect<CML.PlutusV1ScriptList | undefined, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.plutus_v1_scripts(),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.plutusV1Scripts failed `,
        }),
    })
);

/**
 * Unsafely calls instance.plutusV1Scripts without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.plutusV1ScriptsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.plutusV1ScriptsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusV1ScriptsUnsafe = (instance: CML.ConwayFormatAuxData): CML.PlutusV1ScriptList | undefined =>
  Effect.runSync(plutusV1Scripts(instance));

/**
 * Method setPlutusV2Scripts of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.setPlutusV2Scripts(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setPlutusV2Scripts = Effect.fn(
  (instance: CML.ConwayFormatAuxData, plutusV2Scripts: CML.PlutusV2ScriptList): Effect.Effect<void, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.set_plutus_v2_scripts(plutusV2Scripts),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.setPlutusV2Scripts failed with parameters: ${plutusV2Scripts} (PlutusV2ScriptList). `,
        }),
    })
);

/**
 * Unsafely calls instance.setPlutusV2Scripts without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.setPlutusV2ScriptsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.setPlutusV2ScriptsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPlutusV2ScriptsUnsafe = (instance: CML.ConwayFormatAuxData, plutusV2Scripts: CML.PlutusV2ScriptList): void =>
  Effect.runSync(setPlutusV2Scripts(instance, plutusV2Scripts));

/**
 * Method plutusV2Scripts of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.plutusV2Scripts(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const plutusV2Scripts = Effect.fn(
  (instance: CML.ConwayFormatAuxData): Effect.Effect<CML.PlutusV2ScriptList | undefined, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.plutus_v2_scripts(),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.plutusV2Scripts failed `,
        }),
    })
);

/**
 * Unsafely calls instance.plutusV2Scripts without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.plutusV2ScriptsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.plutusV2ScriptsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusV2ScriptsUnsafe = (instance: CML.ConwayFormatAuxData): CML.PlutusV2ScriptList | undefined =>
  Effect.runSync(plutusV2Scripts(instance));

/**
 * Method setPlutusV3Scripts of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.setPlutusV3Scripts(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const setPlutusV3Scripts = Effect.fn(
  (instance: CML.ConwayFormatAuxData, plutusV3Scripts: CML.PlutusV3ScriptList): Effect.Effect<void, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.set_plutus_v3_scripts(plutusV3Scripts),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.setPlutusV3Scripts failed with parameters: ${plutusV3Scripts} (PlutusV3ScriptList). `,
        }),
    })
);

/**
 * Unsafely calls instance.setPlutusV3Scripts without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.setPlutusV3ScriptsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.setPlutusV3ScriptsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPlutusV3ScriptsUnsafe = (instance: CML.ConwayFormatAuxData, plutusV3Scripts: CML.PlutusV3ScriptList): void =>
  Effect.runSync(setPlutusV3Scripts(instance, plutusV3Scripts));

/**
 * Method plutusV3Scripts of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ConwayFormatAuxData.plutusV3Scripts(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const plutusV3Scripts = Effect.fn(
  (instance: CML.ConwayFormatAuxData): Effect.Effect<CML.PlutusV3ScriptList | undefined, ConwayFormatAuxDataError> =>
    Effect.try({
      try: () => instance.plutus_v3_scripts(),
      catch: () =>
        new ConwayFormatAuxDataError({
          message: `ConwayFormatAuxData.plutusV3Scripts failed `,
        }),
    })
);

/**
 * Unsafely calls instance.plutusV3Scripts without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a ConwayFormatAuxData instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData.plutusV3ScriptsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData.plutusV3ScriptsUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusV3ScriptsUnsafe = (instance: CML.ConwayFormatAuxData): CML.PlutusV3ScriptList | undefined =>
  Effect.runSync(plutusV3Scripts(instance));

/**
 * Static method _new of ConwayFormatAuxData
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* ConwayFormatAuxData._new();
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.ConwayFormatAuxData.new(),
    catch: () => new ConwayFormatAuxDataError({
      message: `ConwayFormatAuxData._new failed `,
    }),
  });
});

/**
 * Unsafely calls ConwayFormatAuxData._new without Effect wrapper
 * 
 * @example
 * import { ConwayFormatAuxData } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ConwayFormatAuxData._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConwayFormatAuxData._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () =>
  Effect.runSync(_new());

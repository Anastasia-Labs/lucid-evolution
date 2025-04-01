/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ShelleyMAFormatAuxData class
 *
 * @since 2.0.0
 * @category Types
 */
export type ShelleyMAFormatAuxData = CML.ShelleyMAFormatAuxData;

/**
 * Error class for ShelleyMAFormatAuxData operations
 *
 * This error is thrown when operations on ShelleyMAFormatAuxData instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ShelleyMAFormatAuxDataError extends Data.TaggedError(
  "ShelleyMAFormatAuxDataError",
)<{
  message?: string;
}> {}

/**
 * Method free of ShelleyMAFormatAuxData
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ShelleyMAFormatAuxData.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.ShelleyMAFormatAuxData,
  ): Effect.Effect<void, ShelleyMAFormatAuxDataError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ShelleyMAFormatAuxData.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ShelleyMAFormatAuxData.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ShelleyMAFormatAuxData): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ShelleyMAFormatAuxData
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ShelleyMAFormatAuxData.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.ShelleyMAFormatAuxData,
  ): Effect.Effect<Uint8Array, ShelleyMAFormatAuxDataError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.toCborBytes failed ShelleyMAFormatAuxData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ShelleyMAFormatAuxData.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ShelleyMAFormatAuxData.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.ShelleyMAFormatAuxData,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ShelleyMAFormatAuxData
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ShelleyMAFormatAuxData.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.ShelleyMAFormatAuxData,
  ): Effect.Effect<Uint8Array, ShelleyMAFormatAuxDataError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.toCanonicalCborBytes failed ShelleyMAFormatAuxData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ShelleyMAFormatAuxData.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ShelleyMAFormatAuxData.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.ShelleyMAFormatAuxData,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ShelleyMAFormatAuxData
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ShelleyMAFormatAuxData.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ShelleyMAFormatAuxData.from_cbor_bytes(cborBytes),
    catch: () =>
      new ShelleyMAFormatAuxDataError({
        message: `ShelleyMAFormatAuxData.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ShelleyMAFormatAuxData.fromCborBytes without Effect wrapper
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ShelleyMAFormatAuxData.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ShelleyMAFormatAuxData.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ShelleyMAFormatAuxData
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ShelleyMAFormatAuxData.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.ShelleyMAFormatAuxData,
  ): Effect.Effect<string, ShelleyMAFormatAuxDataError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.toCborHex failed ShelleyMAFormatAuxData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ShelleyMAFormatAuxData.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ShelleyMAFormatAuxData.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ShelleyMAFormatAuxData): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ShelleyMAFormatAuxData
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ShelleyMAFormatAuxData.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.ShelleyMAFormatAuxData,
  ): Effect.Effect<string, ShelleyMAFormatAuxDataError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.toCanonicalCborHex failed ShelleyMAFormatAuxData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ShelleyMAFormatAuxData.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ShelleyMAFormatAuxData.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.ShelleyMAFormatAuxData,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ShelleyMAFormatAuxData
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ShelleyMAFormatAuxData.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ShelleyMAFormatAuxData.from_cbor_hex(cborBytes),
    catch: () =>
      new ShelleyMAFormatAuxDataError({
        message: `ShelleyMAFormatAuxData.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls ShelleyMAFormatAuxData.fromCborHex without Effect wrapper
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ShelleyMAFormatAuxData.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ShelleyMAFormatAuxData.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ShelleyMAFormatAuxData
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ShelleyMAFormatAuxData.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.ShelleyMAFormatAuxData,
  ): Effect.Effect<string, ShelleyMAFormatAuxDataError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.toJson failed ShelleyMAFormatAuxData is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ShelleyMAFormatAuxData.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ShelleyMAFormatAuxData.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ShelleyMAFormatAuxData): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ShelleyMAFormatAuxData
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ShelleyMAFormatAuxData.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.ShelleyMAFormatAuxData,
  ): Effect.Effect<any, ShelleyMAFormatAuxDataError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.toJsValue failed ShelleyMAFormatAuxData is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ShelleyMAFormatAuxData.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ShelleyMAFormatAuxData.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ShelleyMAFormatAuxData): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ShelleyMAFormatAuxData
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ShelleyMAFormatAuxData.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ShelleyMAFormatAuxData.from_json(json),
    catch: () =>
      new ShelleyMAFormatAuxDataError({
        message: `ShelleyMAFormatAuxData.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls ShelleyMAFormatAuxData.fromJson without Effect wrapper
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ShelleyMAFormatAuxData.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ShelleyMAFormatAuxData.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method transactionMetadata of ShelleyMAFormatAuxData
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ShelleyMAFormatAuxData.transactionMetadata(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const transactionMetadata = Effect.fn(
  (
    instance: CML.ShelleyMAFormatAuxData,
  ): Effect.Effect<CML.Metadata, ShelleyMAFormatAuxDataError> =>
    Effect.try({
      try: () => instance.transaction_metadata(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.transactionMetadata failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.transactionMetadata without Effect wrapper
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ShelleyMAFormatAuxData.transactionMetadataUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ShelleyMAFormatAuxData.transactionMetadataUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const transactionMetadataUnsafe = (
  instance: CML.ShelleyMAFormatAuxData,
): CML.Metadata => Effect.runSync(transactionMetadata(instance));

/**
 * Method auxiliaryScripts of ShelleyMAFormatAuxData
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *   const result = yield* ShelleyMAFormatAuxData.auxiliaryScripts(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const auxiliaryScripts = Effect.fn(
  (
    instance: CML.ShelleyMAFormatAuxData,
  ): Effect.Effect<CML.NativeScriptList, ShelleyMAFormatAuxDataError> =>
    Effect.try({
      try: () => instance.auxiliary_scripts(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.auxiliaryScripts failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.auxiliaryScripts without Effect wrapper
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ShelleyMAFormatAuxData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ShelleyMAFormatAuxData.auxiliaryScriptsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ShelleyMAFormatAuxData.auxiliaryScriptsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const auxiliaryScriptsUnsafe = (
  instance: CML.ShelleyMAFormatAuxData,
): CML.NativeScriptList => Effect.runSync(auxiliaryScripts(instance));

/**
 * Static method _new of ShelleyMAFormatAuxData
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ShelleyMAFormatAuxData._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  transactionMetadata: CML.Metadata,
  auxiliaryScripts: CML.NativeScriptList,
) {
  return yield* Effect.try({
    try: () =>
      CML.ShelleyMAFormatAuxData.new(transactionMetadata, auxiliaryScripts),
    catch: () =>
      new ShelleyMAFormatAuxDataError({
        message: `ShelleyMAFormatAuxData._new failed with parameters: ${transactionMetadata} (Metadata), ${auxiliaryScripts} (NativeScriptList). `,
      }),
  });
});

/**
 * Unsafely calls ShelleyMAFormatAuxData._new without Effect wrapper
 *
 * @example
 * import { ShelleyMAFormatAuxData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ShelleyMAFormatAuxData._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ShelleyMAFormatAuxData._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  transactionMetadata: CML.Metadata,
  auxiliaryScripts: CML.NativeScriptList,
) => Effect.runSync(_new(transactionMetadata, auxiliaryScripts));

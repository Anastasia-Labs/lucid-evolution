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
export class ShelleyMAFormatAuxDataError extends Data.TaggedError("ShelleyMAFormatAuxDataError")<{
  message?: string;
}> {}

/**
 * Method free of ShelleyMAFormatAuxData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.ShelleyMAFormatAuxData) => Effect.Effect<void, ShelleyMAFormatAuxDataError> = Effect.fn(
  (instance: CML.ShelleyMAFormatAuxData) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ShelleyMAFormatAuxData): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ShelleyMAFormatAuxData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.ShelleyMAFormatAuxData) => Effect.Effect<Uint8Array, ShelleyMAFormatAuxDataError> = Effect.fn(
  (instance: CML.ShelleyMAFormatAuxData) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.toCborBytes failed ShelleyMAFormatAuxData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ShelleyMAFormatAuxData): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ShelleyMAFormatAuxData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.ShelleyMAFormatAuxData) => Effect.Effect<Uint8Array, ShelleyMAFormatAuxDataError> = Effect.fn(
  (instance: CML.ShelleyMAFormatAuxData) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.toCanonicalCborBytes failed ShelleyMAFormatAuxData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.ShelleyMAFormatAuxData): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ShelleyMAFormatAuxData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.ShelleyMAFormatAuxData, ShelleyMAFormatAuxDataError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ShelleyMAFormatAuxData.from_cbor_bytes(cborBytes),
    catch: () => new ShelleyMAFormatAuxDataError({
      message: `ShelleyMAFormatAuxData.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls ShelleyMAFormatAuxData.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.ShelleyMAFormatAuxData =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ShelleyMAFormatAuxData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.ShelleyMAFormatAuxData) => Effect.Effect<string, ShelleyMAFormatAuxDataError> = Effect.fn(
  (instance: CML.ShelleyMAFormatAuxData) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.toCborHex failed ShelleyMAFormatAuxData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ShelleyMAFormatAuxData): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ShelleyMAFormatAuxData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.ShelleyMAFormatAuxData) => Effect.Effect<string, ShelleyMAFormatAuxDataError> = Effect.fn(
  (instance: CML.ShelleyMAFormatAuxData) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.toCanonicalCborHex failed ShelleyMAFormatAuxData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ShelleyMAFormatAuxData): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ShelleyMAFormatAuxData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.ShelleyMAFormatAuxData, ShelleyMAFormatAuxDataError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ShelleyMAFormatAuxData.from_cbor_hex(cborBytes),
    catch: () => new ShelleyMAFormatAuxDataError({
      message: `ShelleyMAFormatAuxData.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls ShelleyMAFormatAuxData.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.ShelleyMAFormatAuxData =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ShelleyMAFormatAuxData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.ShelleyMAFormatAuxData) => Effect.Effect<string, ShelleyMAFormatAuxDataError> = Effect.fn(
  (instance: CML.ShelleyMAFormatAuxData) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.toJson failed ShelleyMAFormatAuxData is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ShelleyMAFormatAuxData): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ShelleyMAFormatAuxData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.ShelleyMAFormatAuxData) => Effect.Effect<any, ShelleyMAFormatAuxDataError> = Effect.fn(
  (instance: CML.ShelleyMAFormatAuxData) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.toJsValue failed ShelleyMAFormatAuxData is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ShelleyMAFormatAuxData): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ShelleyMAFormatAuxData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.ShelleyMAFormatAuxData, ShelleyMAFormatAuxDataError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ShelleyMAFormatAuxData.from_json(json),
    catch: () => new ShelleyMAFormatAuxDataError({
      message: `ShelleyMAFormatAuxData.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls ShelleyMAFormatAuxData.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.ShelleyMAFormatAuxData =>
  Effect.runSync(fromJson(json));

/**
 * Method transactionMetadata of ShelleyMAFormatAuxData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const transactionMetadata: (instance: CML.ShelleyMAFormatAuxData) => Effect.Effect<CML.Metadata, ShelleyMAFormatAuxDataError> = Effect.fn(
  (instance: CML.ShelleyMAFormatAuxData) =>
    Effect.try({
      try: () => instance.transaction_metadata(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.transactionMetadata failed `,
        }),
    })
);

/**
 * Unsafely calls instance.transactionMetadata without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const transactionMetadataUnsafe = (instance: CML.ShelleyMAFormatAuxData): CML.Metadata =>
  Effect.runSync(transactionMetadata(instance));

/**
 * Method auxiliaryScripts of ShelleyMAFormatAuxData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const auxiliaryScripts: (instance: CML.ShelleyMAFormatAuxData) => Effect.Effect<CML.NativeScriptList, ShelleyMAFormatAuxDataError> = Effect.fn(
  (instance: CML.ShelleyMAFormatAuxData) =>
    Effect.try({
      try: () => instance.auxiliary_scripts(),
      catch: () =>
        new ShelleyMAFormatAuxDataError({
          message: `ShelleyMAFormatAuxData.auxiliaryScripts failed `,
        }),
    })
);

/**
 * Unsafely calls instance.auxiliaryScripts without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const auxiliaryScriptsUnsafe = (instance: CML.ShelleyMAFormatAuxData): CML.NativeScriptList =>
  Effect.runSync(auxiliaryScripts(instance));

/**
 * Static method _new of ShelleyMAFormatAuxData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (transactionMetadata: CML.Metadata, auxiliaryScripts: CML.NativeScriptList) => Effect.Effect<CML.ShelleyMAFormatAuxData, ShelleyMAFormatAuxDataError> = Effect.fn(function* (transactionMetadata: CML.Metadata, auxiliaryScripts: CML.NativeScriptList) {
  return yield* Effect.try({
    try: () => CML.ShelleyMAFormatAuxData.new(transactionMetadata, auxiliaryScripts),
    catch: () => new ShelleyMAFormatAuxDataError({
      message: `ShelleyMAFormatAuxData._new failed with parameters: ${transactionMetadata} (Metadata), ${auxiliaryScripts} (NativeScriptList). `,
    }),
  });
});

/**
 * Unsafely calls ShelleyMAFormatAuxData._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (transactionMetadata: CML.Metadata, auxiliaryScripts: CML.NativeScriptList): CML.ShelleyMAFormatAuxData =>
  Effect.runSync(_new(transactionMetadata, auxiliaryScripts));

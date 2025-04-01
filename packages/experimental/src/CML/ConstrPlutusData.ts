/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ConstrPlutusData class
 *
 * @since 2.0.0
 * @category Types
 */
export type ConstrPlutusData = CML.ConstrPlutusData;

/**
 * Error class for ConstrPlutusData operations
 * 
 * This error is thrown when operations on ConstrPlutusData instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ConstrPlutusDataError extends Data.TaggedError("ConstrPlutusDataError")<{
  message?: string;
}> {}

/**
 * Method free of ConstrPlutusData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.ConstrPlutusData) => Effect.Effect<void, ConstrPlutusDataError> = Effect.fn(
  (instance: CML.ConstrPlutusData) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ConstrPlutusData): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ConstrPlutusData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.ConstrPlutusData) => Effect.Effect<Uint8Array, ConstrPlutusDataError> = Effect.fn(
  (instance: CML.ConstrPlutusData) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.toCborBytes failed ConstrPlutusData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ConstrPlutusData): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ConstrPlutusData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.ConstrPlutusData) => Effect.Effect<Uint8Array, ConstrPlutusDataError> = Effect.fn(
  (instance: CML.ConstrPlutusData) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.toCanonicalCborBytes failed ConstrPlutusData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.ConstrPlutusData): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ConstrPlutusData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.ConstrPlutusData, ConstrPlutusDataError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ConstrPlutusData.from_cbor_bytes(cborBytes),
    catch: () => new ConstrPlutusDataError({
      message: `ConstrPlutusData.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls ConstrPlutusData.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.ConstrPlutusData =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ConstrPlutusData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.ConstrPlutusData) => Effect.Effect<string, ConstrPlutusDataError> = Effect.fn(
  (instance: CML.ConstrPlutusData) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.toCborHex failed ConstrPlutusData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ConstrPlutusData): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ConstrPlutusData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.ConstrPlutusData) => Effect.Effect<string, ConstrPlutusDataError> = Effect.fn(
  (instance: CML.ConstrPlutusData) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.toCanonicalCborHex failed ConstrPlutusData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ConstrPlutusData): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ConstrPlutusData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.ConstrPlutusData, ConstrPlutusDataError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ConstrPlutusData.from_cbor_hex(cborBytes),
    catch: () => new ConstrPlutusDataError({
      message: `ConstrPlutusData.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls ConstrPlutusData.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.ConstrPlutusData =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ConstrPlutusData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.ConstrPlutusData) => Effect.Effect<string, ConstrPlutusDataError> = Effect.fn(
  (instance: CML.ConstrPlutusData) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.toJson failed ConstrPlutusData is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ConstrPlutusData): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ConstrPlutusData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.ConstrPlutusData) => Effect.Effect<any, ConstrPlutusDataError> = Effect.fn(
  (instance: CML.ConstrPlutusData) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.toJsValue failed ConstrPlutusData is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ConstrPlutusData): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ConstrPlutusData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.ConstrPlutusData, ConstrPlutusDataError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ConstrPlutusData.from_json(json),
    catch: () => new ConstrPlutusDataError({
      message: `ConstrPlutusData.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls ConstrPlutusData.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.ConstrPlutusData =>
  Effect.runSync(fromJson(json));

/**
 * Method alternative of ConstrPlutusData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const alternative: (instance: CML.ConstrPlutusData) => Effect.Effect<bigint, ConstrPlutusDataError> = Effect.fn(
  (instance: CML.ConstrPlutusData) =>
    Effect.try({
      try: () => instance.alternative(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.alternative failed `,
        }),
    })
);

/**
 * Unsafely calls instance.alternative without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const alternativeUnsafe = (instance: CML.ConstrPlutusData): bigint =>
  Effect.runSync(alternative(instance));

/**
 * Method fields of ConstrPlutusData
 * 
 * @since 2.0.0
 * @category Methods
 */
export const fields: (instance: CML.ConstrPlutusData) => Effect.Effect<CML.PlutusDataList, ConstrPlutusDataError> = Effect.fn(
  (instance: CML.ConstrPlutusData) =>
    Effect.try({
      try: () => instance.fields(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.fields failed `,
        }),
    })
);

/**
 * Unsafely calls instance.fields without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const fieldsUnsafe = (instance: CML.ConstrPlutusData): CML.PlutusDataList =>
  Effect.runSync(fields(instance));

/**
 * Static method _new of ConstrPlutusData
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (alternative: bigint, fields: CML.PlutusDataList) => Effect.Effect<CML.ConstrPlutusData, ConstrPlutusDataError> = Effect.fn(function* (alternative: bigint, fields: CML.PlutusDataList) {
  return yield* Effect.try({
    try: () => CML.ConstrPlutusData.new(alternative, fields),
    catch: () => new ConstrPlutusDataError({
      message: `ConstrPlutusData._new failed with parameters: ${alternative}, ${fields} (PlutusDataList). `,
    }),
  });
});

/**
 * Unsafely calls ConstrPlutusData._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (alternative: bigint, fields: CML.PlutusDataList): CML.ConstrPlutusData =>
  Effect.runSync(_new(alternative, fields));

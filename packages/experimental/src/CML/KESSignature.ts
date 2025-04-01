/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML KESSignature class
 *
 * @since 2.0.0
 * @category Types
 */
export type KESSignature = CML.KESSignature;

/**
 * Error class for KESSignature operations
 * 
 * This error is thrown when operations on KESSignature instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class KESSignatureError extends Data.TaggedError("KESSignatureError")<{
  message?: string;
}> {}

/**
 * Method free of KESSignature
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.KESSignature) => Effect.Effect<void, KESSignatureError> = Effect.fn(
  (instance: CML.KESSignature) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new KESSignatureError({
          message: `KESSignature.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.KESSignature): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of KESSignature
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.KESSignature) => Effect.Effect<Uint8Array, KESSignatureError> = Effect.fn(
  (instance: CML.KESSignature) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new KESSignatureError({
          message: `KESSignature.toCborBytes failed KESSignature is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.KESSignature): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of KESSignature
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.KESSignature) => Effect.Effect<Uint8Array, KESSignatureError> = Effect.fn(
  (instance: CML.KESSignature) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new KESSignatureError({
          message: `KESSignature.toCanonicalCborBytes failed KESSignature is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.KESSignature): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of KESSignature
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.KESSignature, KESSignatureError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.KESSignature.from_cbor_bytes(cborBytes),
    catch: () => new KESSignatureError({
      message: `KESSignature.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls KESSignature.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.KESSignature =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of KESSignature
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.KESSignature) => Effect.Effect<string, KESSignatureError> = Effect.fn(
  (instance: CML.KESSignature) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new KESSignatureError({
          message: `KESSignature.toCborHex failed KESSignature is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.KESSignature): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of KESSignature
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.KESSignature) => Effect.Effect<string, KESSignatureError> = Effect.fn(
  (instance: CML.KESSignature) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new KESSignatureError({
          message: `KESSignature.toCanonicalCborHex failed KESSignature is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.KESSignature): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of KESSignature
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.KESSignature, KESSignatureError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.KESSignature.from_cbor_hex(cborBytes),
    catch: () => new KESSignatureError({
      message: `KESSignature.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls KESSignature.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.KESSignature =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of KESSignature
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.KESSignature) => Effect.Effect<string, KESSignatureError> = Effect.fn(
  (instance: CML.KESSignature) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new KESSignatureError({
          message: `KESSignature.toJson failed KESSignature is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.KESSignature): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of KESSignature
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.KESSignature) => Effect.Effect<any, KESSignatureError> = Effect.fn(
  (instance: CML.KESSignature) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new KESSignatureError({
          message: `KESSignature.toJsValue failed KESSignature is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.KESSignature): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of KESSignature
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.KESSignature, KESSignatureError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.KESSignature.from_json(json),
    catch: () => new KESSignatureError({
      message: `KESSignature.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls KESSignature.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.KESSignature =>
  Effect.runSync(fromJson(json));

/**
 * Method get of KESSignature
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.KESSignature) => Effect.Effect<Uint8Array, KESSignatureError> = Effect.fn(
  (instance: CML.KESSignature) =>
    Effect.try({
      try: () => instance.get(),
      catch: () =>
        new KESSignatureError({
          message: `KESSignature.get failed `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.KESSignature): Uint8Array =>
  Effect.runSync(get(instance));

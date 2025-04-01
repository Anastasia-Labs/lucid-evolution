/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML AssetName class
 *
 * @since 2.0.0
 * @category Types
 */
export type AssetName = CML.AssetName;

/**
 * Error class for AssetName operations
 * 
 * This error is thrown when operations on AssetName instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class AssetNameError extends Data.TaggedError("AssetNameError")<{
  message?: string;
}> {}

/**
 * Method free of AssetName
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.AssetName) => Effect.Effect<void, AssetNameError> = Effect.fn(
  (instance: CML.AssetName) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.AssetName): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of AssetName
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.AssetName) => Effect.Effect<Uint8Array, AssetNameError> = Effect.fn(
  (instance: CML.AssetName) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toCborBytes failed AssetName is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.AssetName): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of AssetName
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.AssetName) => Effect.Effect<Uint8Array, AssetNameError> = Effect.fn(
  (instance: CML.AssetName) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toCanonicalCborBytes failed AssetName is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.AssetName): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of AssetName
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.AssetName, AssetNameError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.AssetName.from_cbor_bytes(cborBytes),
    catch: () => new AssetNameError({
      message: `AssetName.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls AssetName.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.AssetName =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of AssetName
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.AssetName) => Effect.Effect<string, AssetNameError> = Effect.fn(
  (instance: CML.AssetName) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toCborHex failed AssetName is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.AssetName): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of AssetName
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.AssetName) => Effect.Effect<string, AssetNameError> = Effect.fn(
  (instance: CML.AssetName) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toCanonicalCborHex failed AssetName is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.AssetName): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of AssetName
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.AssetName, AssetNameError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.AssetName.from_cbor_hex(cborBytes),
    catch: () => new AssetNameError({
      message: `AssetName.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls AssetName.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.AssetName =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of AssetName
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.AssetName) => Effect.Effect<string, AssetNameError> = Effect.fn(
  (instance: CML.AssetName) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toJson failed AssetName is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.AssetName): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of AssetName
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.AssetName) => Effect.Effect<any, AssetNameError> = Effect.fn(
  (instance: CML.AssetName) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toJsValue failed AssetName is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.AssetName): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of AssetName
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.AssetName, AssetNameError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.AssetName.from_json(json),
    catch: () => new AssetNameError({
      message: `AssetName.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls AssetName.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.AssetName =>
  Effect.runSync(fromJson(json));

/**
 * Static method fromStr of AssetName
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromStr: (utf8Str: string) => Effect.Effect<CML.AssetName, AssetNameError> = Effect.fn(function* (utf8Str: string) {
  return yield* Effect.try({
    try: () => CML.AssetName.from_str(utf8Str),
    catch: () => new AssetNameError({
      message: `AssetName.fromStr failed with parameters: ${utf8Str}. Hint: Not all AssetName instances can be stringified.`,
    }),
  });
});

/**
 * Unsafely calls AssetName.fromStr without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromStrUnsafe = (utf8Str: string): CML.AssetName =>
  Effect.runSync(fromStr(utf8Str));

/**
 * Method toStr of AssetName
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toStr: (instance: CML.AssetName) => Effect.Effect<string, AssetNameError> = Effect.fn(
  (instance: CML.AssetName) =>
    Effect.try({
      try: () => instance.to_str(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toStr failed AssetName is not valid for string conversion. Hint: Not all AssetName instances can be stringified.`,
        }),
    })
);

/**
 * Unsafely calls instance.toStr without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toStrUnsafe = (instance: CML.AssetName): string =>
  Effect.runSync(toStr(instance));

/**
 * Method toRawBytes of AssetName
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (instance: CML.AssetName) => Effect.Effect<Uint8Array, AssetNameError> = Effect.fn(
  (instance: CML.AssetName) =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toRawBytes failed AssetName is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.AssetName): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of AssetName
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.AssetName, AssetNameError> = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.AssetName.from_raw_bytes(bytes),
    catch: () => new AssetNameError({
      message: `AssetName.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls AssetName.fromRawBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.AssetName =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of AssetName
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (instance: CML.AssetName) => Effect.Effect<string, AssetNameError> = Effect.fn(
  (instance: CML.AssetName) =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new AssetNameError({
          message: `AssetName.toHex failed AssetName is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    })
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.AssetName): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of AssetName
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (input: string) => Effect.Effect<CML.AssetName, AssetNameError> = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.AssetName.from_hex(input),
    catch: () => new AssetNameError({
      message: `AssetName.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
    }),
  });
});

/**
 * Unsafely calls AssetName.fromHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.AssetName =>
  Effect.runSync(fromHex(input));

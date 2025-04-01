/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP25ChunkableString class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP25ChunkableString = CML.CIP25ChunkableString;

/**
 * Error class for CIP25ChunkableString operations
 * 
 * This error is thrown when operations on CIP25ChunkableString instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CIP25ChunkableStringError extends Data.TaggedError("CIP25ChunkableStringError")<{
  message?: string;
}> {}

/**
 * Method free of CIP25ChunkableString
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.CIP25ChunkableString) => Effect.Effect<void, CIP25ChunkableStringError> = Effect.fn(
  (instance: CML.CIP25ChunkableString) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP25ChunkableString): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP25ChunkableString
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.CIP25ChunkableString) => Effect.Effect<Uint8Array, CIP25ChunkableStringError> = Effect.fn(
  (instance: CML.CIP25ChunkableString) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.toCborBytes failed CIP25ChunkableString is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.CIP25ChunkableString): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of CIP25ChunkableString
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.CIP25ChunkableString, CIP25ChunkableStringError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.CIP25ChunkableString.from_cbor_bytes(cborBytes),
    catch: () => new CIP25ChunkableStringError({
      message: `CIP25ChunkableString.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls CIP25ChunkableString.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.CIP25ChunkableString =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP25ChunkableString
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.CIP25ChunkableString) => Effect.Effect<string, CIP25ChunkableStringError> = Effect.fn(
  (instance: CML.CIP25ChunkableString) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.toCborHex failed CIP25ChunkableString is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.CIP25ChunkableString): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of CIP25ChunkableString
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.CIP25ChunkableString, CIP25ChunkableStringError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.CIP25ChunkableString.from_cbor_hex(cborBytes),
    catch: () => new CIP25ChunkableStringError({
      message: `CIP25ChunkableString.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls CIP25ChunkableString.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.CIP25ChunkableString =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP25ChunkableString
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.CIP25ChunkableString) => Effect.Effect<string, CIP25ChunkableStringError> = Effect.fn(
  (instance: CML.CIP25ChunkableString) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.toJson failed CIP25ChunkableString is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.CIP25ChunkableString): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP25ChunkableString
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.CIP25ChunkableString) => Effect.Effect<any, CIP25ChunkableStringError> = Effect.fn(
  (instance: CML.CIP25ChunkableString) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.toJsValue failed CIP25ChunkableString is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.CIP25ChunkableString): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP25ChunkableString
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.CIP25ChunkableString, CIP25ChunkableStringError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP25ChunkableString.from_json(json),
    catch: () => new CIP25ChunkableStringError({
      message: `CIP25ChunkableString.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls CIP25ChunkableString.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.CIP25ChunkableString =>
  Effect.runSync(fromJson(json));

/**
 * Static method newSingle of CIP25ChunkableString
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newSingle: (single: CML.CIP25String64) => Effect.Effect<CML.CIP25ChunkableString, CIP25ChunkableStringError> = Effect.fn(function* (single: CML.CIP25String64) {
  return yield* Effect.try({
    try: () => CML.CIP25ChunkableString.new_single(single),
    catch: () => new CIP25ChunkableStringError({
      message: `CIP25ChunkableString.newSingle failed with parameters: ${single} (CIP25String64). `,
    }),
  });
});

/**
 * Unsafely calls CIP25ChunkableString.newSingle without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newSingleUnsafe = (single: CML.CIP25String64): CML.CIP25ChunkableString =>
  Effect.runSync(newSingle(single));

/**
 * Static method newChunked of CIP25ChunkableString
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newChunked: (chunked: CML.CIP25String64List) => Effect.Effect<CML.CIP25ChunkableString, CIP25ChunkableStringError> = Effect.fn(function* (chunked: CML.CIP25String64List) {
  return yield* Effect.try({
    try: () => CML.CIP25ChunkableString.new_chunked(chunked),
    catch: () => new CIP25ChunkableStringError({
      message: `CIP25ChunkableString.newChunked failed with parameters: ${chunked} (CIP25String64List). `,
    }),
  });
});

/**
 * Unsafely calls CIP25ChunkableString.newChunked without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newChunkedUnsafe = (chunked: CML.CIP25String64List): CML.CIP25ChunkableString =>
  Effect.runSync(newChunked(chunked));

/**
 * Method kind of CIP25ChunkableString
 * 
 * @since 2.0.0
 * @category Methods
 */
export const kind: (instance: CML.CIP25ChunkableString) => Effect.Effect<CML.ChunkableStringKind, CIP25ChunkableStringError> = Effect.fn(
  (instance: CML.CIP25ChunkableString) =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.kind failed `,
        }),
    })
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.CIP25ChunkableString): CML.ChunkableStringKind =>
  Effect.runSync(kind(instance));

/**
 * Method asSingle of CIP25ChunkableString
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asSingle: (instance: CML.CIP25ChunkableString) => Effect.Effect<CML.CIP25String64 | undefined, CIP25ChunkableStringError> = Effect.fn(
  (instance: CML.CIP25ChunkableString) =>
    Effect.try({
      try: () => instance.as_single(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.asSingle failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asSingle without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asSingleUnsafe = (instance: CML.CIP25ChunkableString): CML.CIP25String64 | undefined =>
  Effect.runSync(asSingle(instance));

/**
 * Method asChunked of CIP25ChunkableString
 * 
 * @since 2.0.0
 * @category Methods
 */
export const asChunked: (instance: CML.CIP25ChunkableString) => Effect.Effect<CML.CIP25String64List | undefined, CIP25ChunkableStringError> = Effect.fn(
  (instance: CML.CIP25ChunkableString) =>
    Effect.try({
      try: () => instance.as_chunked(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.asChunked failed `,
        }),
    })
);

/**
 * Unsafely calls instance.asChunked without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asChunkedUnsafe = (instance: CML.CIP25ChunkableString): CML.CIP25String64List | undefined =>
  Effect.runSync(asChunked(instance));

/**
 * Static method fromString of CIP25ChunkableString
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromString: (str: string) => Effect.Effect<CML.CIP25ChunkableString, CIP25ChunkableStringError> = Effect.fn(function* (str: string) {
  return yield* Effect.try({
    try: () => CML.CIP25ChunkableString.from_string(str),
    catch: () => new CIP25ChunkableStringError({
      message: `CIP25ChunkableString.fromString failed with parameters: ${str}. Hint: Not all CIP25ChunkableString instances can be stringified.`,
    }),
  });
});

/**
 * Unsafely calls CIP25ChunkableString.fromString without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromStringUnsafe = (str: string): CML.CIP25ChunkableString =>
  Effect.runSync(fromString(str));

/**
 * Method toString of CIP25ChunkableString
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toString: (instance: CML.CIP25ChunkableString) => Effect.Effect<string, CIP25ChunkableStringError> = Effect.fn(
  (instance: CML.CIP25ChunkableString) =>
    Effect.try({
      try: () => instance.to_string(),
      catch: () =>
        new CIP25ChunkableStringError({
          message: `CIP25ChunkableString.toString failed CIP25ChunkableString is not valid for string conversion. Hint: Not all CIP25ChunkableString instances can be stringified.`,
        }),
    })
);

/**
 * Unsafely calls instance.toString without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toStringUnsafe = (instance: CML.CIP25ChunkableString): string =>
  Effect.runSync(toString(instance));

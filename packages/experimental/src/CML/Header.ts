/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Header class
 *
 * @since 2.0.0
 * @category Types
 */
export type Header = CML.Header;

/**
 * Error class for Header operations
 *
 * This error is thrown when operations on Header instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class HeaderError extends Data.TaggedError("HeaderError")<{
  message?: string;
}> {}

/**
 * Method free of Header
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Header) => Effect.Effect<void, HeaderError> =
  Effect.fn((instance: CML.Header) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new HeaderError({
          message: `Header.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
  );

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Header): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Header
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.Header,
) => Effect.Effect<Uint8Array, HeaderError> = Effect.fn(
  (instance: CML.Header) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new HeaderError({
          message: `Header.toCborBytes failed Header is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Header): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Header
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.Header,
) => Effect.Effect<Uint8Array, HeaderError> = Effect.fn(
  (instance: CML.Header) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new HeaderError({
          message: `Header.toCanonicalCborBytes failed Header is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Header): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Header
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Header, HeaderError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.Header.from_cbor_bytes(cborBytes),
    catch: () =>
      new HeaderError({
        message: `Header.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Header.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Header =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Header
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.Header,
) => Effect.Effect<string, HeaderError> = Effect.fn((instance: CML.Header) =>
  Effect.try({
    try: () => instance.to_cbor_hex(),
    catch: () =>
      new HeaderError({
        message: `Header.toCborHex failed Header is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Header): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Header
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.Header,
) => Effect.Effect<string, HeaderError> = Effect.fn((instance: CML.Header) =>
  Effect.try({
    try: () => instance.to_canonical_cbor_hex(),
    catch: () =>
      new HeaderError({
        message: `Header.toCanonicalCborHex failed Header is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Header): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Header
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Header, HeaderError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.Header.from_cbor_hex(cborBytes),
    catch: () =>
      new HeaderError({
        message: `Header.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls Header.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.Header =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Header
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.Header,
) => Effect.Effect<string, HeaderError> = Effect.fn((instance: CML.Header) =>
  Effect.try({
    try: () => instance.to_json(),
    catch: () =>
      new HeaderError({
        message: `Header.toJson failed Header is not valid for string conversion. Hint: Validate your JSON structure.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Header): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Header
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.Header,
) => Effect.Effect<any, HeaderError> = Effect.fn((instance: CML.Header) =>
  Effect.try({
    try: () => instance.to_js_value(),
    catch: () =>
      new HeaderError({
        message: `Header.toJsValue failed Header is not valid for any conversion. `,
      }),
  }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Header): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Header
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.Header, HeaderError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.Header.from_json(json),
    catch: () =>
      new HeaderError({
        message: `Header.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls Header.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Header =>
  Effect.runSync(fromJson(json));

/**
 * Method headerBody of Header
 *
 * @since 2.0.0
 * @category Methods
 */
export const headerBody: (
  instance: CML.Header,
) => Effect.Effect<CML.HeaderBody, HeaderError> = Effect.fn(
  (instance: CML.Header) =>
    Effect.try({
      try: () => instance.header_body(),
      catch: () =>
        new HeaderError({
          message: `Header.headerBody failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.headerBody without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const headerBodyUnsafe = (instance: CML.Header): CML.HeaderBody =>
  Effect.runSync(headerBody(instance));

/**
 * Method bodySignature of Header
 *
 * @since 2.0.0
 * @category Methods
 */
export const bodySignature: (
  instance: CML.Header,
) => Effect.Effect<CML.KESSignature, HeaderError> = Effect.fn(
  (instance: CML.Header) =>
    Effect.try({
      try: () => instance.body_signature(),
      catch: () =>
        new HeaderError({
          message: `Header.bodySignature failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.bodySignature without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const bodySignatureUnsafe = (instance: CML.Header): CML.KESSignature =>
  Effect.runSync(bodySignature(instance));

/**
 * Static method _new of Header
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  headerBody: CML.HeaderBody,
  bodySignature: CML.KESSignature,
) => Effect.Effect<CML.Header, HeaderError> = Effect.fn(function* (
  headerBody: CML.HeaderBody,
  bodySignature: CML.KESSignature,
) {
  return yield* Effect.try({
    try: () => CML.Header.new(headerBody, bodySignature),
    catch: () =>
      new HeaderError({
        message: `Header._new failed with parameters: ${headerBody} (HeaderBody), ${bodySignature} (KESSignature). `,
      }),
  });
});

/**
 * Unsafely calls Header._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  headerBody: CML.HeaderBody,
  bodySignature: CML.KESSignature,
): CML.Header => Effect.runSync(_new(headerBody, bodySignature));

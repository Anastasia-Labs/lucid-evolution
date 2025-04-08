/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Url class
 *
 * @since 2.0.0
 * @category Types
 */
export type Url = CML.Url;

/**
 * Error class for Url operations
 *
 * This error is thrown when operations on Url instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class UrlError extends Data.TaggedError("UrlError")<{
  message?: string;
}> {}

/**
 * Method free of Url
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Url) => Effect.Effect<void, UrlError> =
  Effect.fn((instance: CML.Url) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new UrlError({
          message: `Url.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
  );

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Url): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Url
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.Url,
) => Effect.Effect<Uint8Array, UrlError> = Effect.fn((instance: CML.Url) =>
  Effect.try({
    try: () => instance.to_cbor_bytes(),
    catch: () =>
      new UrlError({
        message: `Url.toCborBytes failed Url is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Url): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Url
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.Url,
) => Effect.Effect<Uint8Array, UrlError> = Effect.fn((instance: CML.Url) =>
  Effect.try({
    try: () => instance.to_canonical_cbor_bytes(),
    catch: () =>
      new UrlError({
        message: `Url.toCanonicalCborBytes failed Url is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Url): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Url
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Url, UrlError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.Url.from_cbor_bytes(cborBytes),
    catch: () =>
      new UrlError({
        message: `Url.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Url.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Url =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Url
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.Url) => Effect.Effect<string, UrlError> =
  Effect.fn((instance: CML.Url) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new UrlError({
          message: `Url.toCborHex failed Url is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
  );

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Url): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Url
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.Url,
) => Effect.Effect<string, UrlError> = Effect.fn((instance: CML.Url) =>
  Effect.try({
    try: () => instance.to_canonical_cbor_hex(),
    catch: () =>
      new UrlError({
        message: `Url.toCanonicalCborHex failed Url is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Url): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Url
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Url, UrlError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.Url.from_cbor_hex(cborBytes),
    catch: () =>
      new UrlError({
        message: `Url.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls Url.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.Url =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Url
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.Url) => Effect.Effect<string, UrlError> =
  Effect.fn((instance: CML.Url) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new UrlError({
          message: `Url.toJson failed Url is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
  );

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Url): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Url
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.Url) => Effect.Effect<any, UrlError> =
  Effect.fn((instance: CML.Url) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new UrlError({
          message: `Url.toJsValue failed Url is not valid for any conversion. `,
        }),
    }),
  );

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Url): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Url
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.Url, UrlError> =
  Effect.fn(function* (json: string) {
    return yield* Effect.try({
      try: () => CML.Url.from_json(json),
      catch: () =>
        new UrlError({
          message: `Url.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  });

/**
 * Unsafely calls Url.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Url =>
  Effect.runSync(fromJson(json));

/**
 * Method get of Url
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.Url) => Effect.Effect<string, UrlError> =
  Effect.fn((instance: CML.Url) =>
    Effect.try({
      try: () => instance.get(),
      catch: () =>
        new UrlError({
          message: `Url.get failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.Url): string =>
  Effect.runSync(get(instance));

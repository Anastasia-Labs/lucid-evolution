/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Anchor class
 *
 * @since 2.0.0
 * @category Types
 */
export type Anchor = CML.Anchor;

/**
 * Error class for Anchor operations
 *
 * This error is thrown when operations on Anchor instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class AnchorError extends Data.TaggedError("AnchorError")<{
  message?: string;
}> {}

/**
 * Method free of Anchor
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Anchor) => Effect.Effect<void, AnchorError> =
  Effect.fn((instance: CML.Anchor) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new AnchorError({
          message: `Anchor.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
  );

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Anchor): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Anchor
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.Anchor,
) => Effect.Effect<Uint8Array, AnchorError> = Effect.fn(
  (instance: CML.Anchor) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new AnchorError({
          message: `Anchor.toCborBytes failed Anchor is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Anchor): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Anchor
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.Anchor,
) => Effect.Effect<Uint8Array, AnchorError> = Effect.fn(
  (instance: CML.Anchor) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new AnchorError({
          message: `Anchor.toCanonicalCborBytes failed Anchor is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Anchor): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Anchor
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Anchor, AnchorError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.Anchor.from_cbor_bytes(cborBytes),
    catch: () =>
      new AnchorError({
        message: `Anchor.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Anchor.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Anchor =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Anchor
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.Anchor,
) => Effect.Effect<string, AnchorError> = Effect.fn((instance: CML.Anchor) =>
  Effect.try({
    try: () => instance.to_cbor_hex(),
    catch: () =>
      new AnchorError({
        message: `Anchor.toCborHex failed Anchor is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Anchor): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Anchor
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.Anchor,
) => Effect.Effect<string, AnchorError> = Effect.fn((instance: CML.Anchor) =>
  Effect.try({
    try: () => instance.to_canonical_cbor_hex(),
    catch: () =>
      new AnchorError({
        message: `Anchor.toCanonicalCborHex failed Anchor is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Anchor): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Anchor
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Anchor, AnchorError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.Anchor.from_cbor_hex(cborBytes),
    catch: () =>
      new AnchorError({
        message: `Anchor.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls Anchor.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.Anchor =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Anchor
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.Anchor,
) => Effect.Effect<string, AnchorError> = Effect.fn((instance: CML.Anchor) =>
  Effect.try({
    try: () => instance.to_json(),
    catch: () =>
      new AnchorError({
        message: `Anchor.toJson failed Anchor is not valid for string conversion. Hint: Validate your JSON structure.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Anchor): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Anchor
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.Anchor,
) => Effect.Effect<any, AnchorError> = Effect.fn((instance: CML.Anchor) =>
  Effect.try({
    try: () => instance.to_js_value(),
    catch: () =>
      new AnchorError({
        message: `Anchor.toJsValue failed Anchor is not valid for any conversion. `,
      }),
  }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Anchor): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Anchor
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.Anchor, AnchorError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.Anchor.from_json(json),
    catch: () =>
      new AnchorError({
        message: `Anchor.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls Anchor.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Anchor =>
  Effect.runSync(fromJson(json));

/**
 * Method anchorUrl of Anchor
 *
 * @since 2.0.0
 * @category Methods
 */
export const anchorUrl: (
  instance: CML.Anchor,
) => Effect.Effect<CML.Url, AnchorError> = Effect.fn((instance: CML.Anchor) =>
  Effect.try({
    try: () => instance.anchor_url(),
    catch: () =>
      new AnchorError({
        message: `Anchor.anchorUrl failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.anchorUrl without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const anchorUrlUnsafe = (instance: CML.Anchor): CML.Url =>
  Effect.runSync(anchorUrl(instance));

/**
 * Method anchorDocHash of Anchor
 *
 * @since 2.0.0
 * @category Methods
 */
export const anchorDocHash: (
  instance: CML.Anchor,
) => Effect.Effect<CML.AnchorDocHash, AnchorError> = Effect.fn(
  (instance: CML.Anchor) =>
    Effect.try({
      try: () => instance.anchor_doc_hash(),
      catch: () =>
        new AnchorError({
          message: `Anchor.anchorDocHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.anchorDocHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const anchorDocHashUnsafe = (instance: CML.Anchor): CML.AnchorDocHash =>
  Effect.runSync(anchorDocHash(instance));

/**
 * Static method _new of Anchor
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  anchorUrl: CML.Url,
  anchorDocHash: CML.AnchorDocHash,
) => Effect.Effect<CML.Anchor, AnchorError> = Effect.fn(function* (
  anchorUrl: CML.Url,
  anchorDocHash: CML.AnchorDocHash,
) {
  return yield* Effect.try({
    try: () => CML.Anchor.new(anchorUrl, anchorDocHash),
    catch: () =>
      new AnchorError({
        message: `Anchor._new failed with parameters: ${anchorUrl} (Url), ${anchorDocHash} (AnchorDocHash). `,
      }),
  });
});

/**
 * Unsafely calls Anchor._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  anchorUrl: CML.Url,
  anchorDocHash: CML.AnchorDocHash,
): CML.Anchor => Effect.runSync(_new(anchorUrl, anchorDocHash));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML RedeemerKey class
 *
 * @since 2.0.0
 * @category Types
 */
export type RedeemerKey = CML.RedeemerKey;

/**
 * Error class for RedeemerKey operations
 *
 * This error is thrown when operations on RedeemerKey instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class RedeemerKeyError extends Data.TaggedError("RedeemerKeyError")<{
  message?: string;
}> {}

/**
 * Method free of RedeemerKey
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.RedeemerKey,
) => Effect.Effect<void, RedeemerKeyError> = Effect.fn(
  (instance: CML.RedeemerKey) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.RedeemerKey): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of RedeemerKey
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.RedeemerKey,
) => Effect.Effect<Uint8Array, RedeemerKeyError> = Effect.fn(
  (instance: CML.RedeemerKey) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.toCborBytes failed RedeemerKey is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.RedeemerKey): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of RedeemerKey
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.RedeemerKey,
) => Effect.Effect<Uint8Array, RedeemerKeyError> = Effect.fn(
  (instance: CML.RedeemerKey) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.toCanonicalCborBytes failed RedeemerKey is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.RedeemerKey,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of RedeemerKey
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.RedeemerKey, RedeemerKeyError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.RedeemerKey.from_cbor_bytes(cborBytes),
    catch: () =>
      new RedeemerKeyError({
        message: `RedeemerKey.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls RedeemerKey.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.RedeemerKey =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of RedeemerKey
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.RedeemerKey,
) => Effect.Effect<string, RedeemerKeyError> = Effect.fn(
  (instance: CML.RedeemerKey) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.toCborHex failed RedeemerKey is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.RedeemerKey): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of RedeemerKey
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.RedeemerKey,
) => Effect.Effect<string, RedeemerKeyError> = Effect.fn(
  (instance: CML.RedeemerKey) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.toCanonicalCborHex failed RedeemerKey is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.RedeemerKey): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of RedeemerKey
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.RedeemerKey, RedeemerKeyError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.RedeemerKey.from_cbor_hex(cborBytes),
    catch: () =>
      new RedeemerKeyError({
        message: `RedeemerKey.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls RedeemerKey.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.RedeemerKey =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of RedeemerKey
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.RedeemerKey,
) => Effect.Effect<string, RedeemerKeyError> = Effect.fn(
  (instance: CML.RedeemerKey) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.toJson failed RedeemerKey is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.RedeemerKey): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of RedeemerKey
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.RedeemerKey,
) => Effect.Effect<any, RedeemerKeyError> = Effect.fn(
  (instance: CML.RedeemerKey) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.toJsValue failed RedeemerKey is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.RedeemerKey): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of RedeemerKey
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.RedeemerKey, RedeemerKeyError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.RedeemerKey.from_json(json),
    catch: () =>
      new RedeemerKeyError({
        message: `RedeemerKey.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls RedeemerKey.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.RedeemerKey =>
  Effect.runSync(fromJson(json));

/**
 * Method tag of RedeemerKey
 *
 * @since 2.0.0
 * @category Methods
 */
export const tag: (
  instance: CML.RedeemerKey,
) => Effect.Effect<CML.RedeemerTag, RedeemerKeyError> = Effect.fn(
  (instance: CML.RedeemerKey) =>
    Effect.try({
      try: () => instance.tag(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.tag failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.tag without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const tagUnsafe = (instance: CML.RedeemerKey): CML.RedeemerTag =>
  Effect.runSync(tag(instance));

/**
 * Method index of RedeemerKey
 *
 * @since 2.0.0
 * @category Methods
 */
export const index: (
  instance: CML.RedeemerKey,
) => Effect.Effect<bigint, RedeemerKeyError> = Effect.fn(
  (instance: CML.RedeemerKey) =>
    Effect.try({
      try: () => instance.index(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.index failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.index without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const indexUnsafe = (instance: CML.RedeemerKey): bigint =>
  Effect.runSync(index(instance));

/**
 * Static method _new of RedeemerKey
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  tag: CML.RedeemerTag,
  index: bigint,
) => Effect.Effect<CML.RedeemerKey, RedeemerKeyError> = Effect.fn(function* (
  tag: CML.RedeemerTag,
  index: bigint,
) {
  return yield* Effect.try({
    try: () => CML.RedeemerKey.new(tag, index),
    catch: () =>
      new RedeemerKeyError({
        message: `RedeemerKey._new failed with parameters: ${tag} (RedeemerTag), ${index}. `,
      }),
  });
});

/**
 * Unsafely calls RedeemerKey._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  tag: CML.RedeemerTag,
  index: bigint,
): CML.RedeemerKey => Effect.runSync(_new(tag, index));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Vkeywitness class
 *
 * @since 2.0.0
 * @category Types
 */
export type Vkeywitness = CML.Vkeywitness;

/**
 * Error class for Vkeywitness operations
 *
 * This error is thrown when operations on Vkeywitness instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class VkeywitnessError extends Data.TaggedError("VkeywitnessError")<{
  message?: string;
}> {}

/**
 * Method free of Vkeywitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.Vkeywitness,
) => Effect.Effect<void, VkeywitnessError> = Effect.fn(
  (instance: CML.Vkeywitness) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Vkeywitness): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Vkeywitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.Vkeywitness,
) => Effect.Effect<Uint8Array, VkeywitnessError> = Effect.fn(
  (instance: CML.Vkeywitness) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.toCborBytes failed Vkeywitness is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Vkeywitness): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Vkeywitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.Vkeywitness,
) => Effect.Effect<Uint8Array, VkeywitnessError> = Effect.fn(
  (instance: CML.Vkeywitness) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.toCanonicalCborBytes failed Vkeywitness is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.Vkeywitness,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Vkeywitness
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Vkeywitness, VkeywitnessError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.Vkeywitness.from_cbor_bytes(cborBytes),
    catch: () =>
      new VkeywitnessError({
        message: `Vkeywitness.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Vkeywitness.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Vkeywitness =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Vkeywitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.Vkeywitness,
) => Effect.Effect<string, VkeywitnessError> = Effect.fn(
  (instance: CML.Vkeywitness) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.toCborHex failed Vkeywitness is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Vkeywitness): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Vkeywitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.Vkeywitness,
) => Effect.Effect<string, VkeywitnessError> = Effect.fn(
  (instance: CML.Vkeywitness) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.toCanonicalCborHex failed Vkeywitness is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Vkeywitness): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Vkeywitness
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Vkeywitness, VkeywitnessError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.Vkeywitness.from_cbor_hex(cborBytes),
    catch: () =>
      new VkeywitnessError({
        message: `Vkeywitness.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls Vkeywitness.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.Vkeywitness =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Vkeywitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.Vkeywitness,
) => Effect.Effect<string, VkeywitnessError> = Effect.fn(
  (instance: CML.Vkeywitness) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.toJson failed Vkeywitness is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Vkeywitness): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Vkeywitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.Vkeywitness,
) => Effect.Effect<any, VkeywitnessError> = Effect.fn(
  (instance: CML.Vkeywitness) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.toJsValue failed Vkeywitness is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Vkeywitness): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Vkeywitness
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.Vkeywitness, VkeywitnessError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.Vkeywitness.from_json(json),
    catch: () =>
      new VkeywitnessError({
        message: `Vkeywitness.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls Vkeywitness.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Vkeywitness =>
  Effect.runSync(fromJson(json));

/**
 * Method vkey of Vkeywitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const vkey: (
  instance: CML.Vkeywitness,
) => Effect.Effect<CML.PublicKey, VkeywitnessError> = Effect.fn(
  (instance: CML.Vkeywitness) =>
    Effect.try({
      try: () => instance.vkey(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.vkey failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.vkey without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const vkeyUnsafe = (instance: CML.Vkeywitness): CML.PublicKey =>
  Effect.runSync(vkey(instance));

/**
 * Method ed25519Signature of Vkeywitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const ed25519Signature: (
  instance: CML.Vkeywitness,
) => Effect.Effect<CML.Ed25519Signature, VkeywitnessError> = Effect.fn(
  (instance: CML.Vkeywitness) =>
    Effect.try({
      try: () => instance.ed25519_signature(),
      catch: () =>
        new VkeywitnessError({
          message: `Vkeywitness.ed25519Signature failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.ed25519Signature without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const ed25519SignatureUnsafe = (
  instance: CML.Vkeywitness,
): CML.Ed25519Signature => Effect.runSync(ed25519Signature(instance));

/**
 * Static method _new of Vkeywitness
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  vkey: CML.PublicKey,
  ed25519Signature: CML.Ed25519Signature,
) => Effect.Effect<CML.Vkeywitness, VkeywitnessError> = Effect.fn(function* (
  vkey: CML.PublicKey,
  ed25519Signature: CML.Ed25519Signature,
) {
  return yield* Effect.try({
    try: () => CML.Vkeywitness.new(vkey, ed25519Signature),
    catch: () =>
      new VkeywitnessError({
        message: `Vkeywitness._new failed with parameters: ${vkey} (PublicKey), ${ed25519Signature} (Ed25519Signature). `,
      }),
  });
});

/**
 * Unsafely calls Vkeywitness._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  vkey: CML.PublicKey,
  ed25519Signature: CML.Ed25519Signature,
): CML.Vkeywitness => Effect.runSync(_new(vkey, ed25519Signature));

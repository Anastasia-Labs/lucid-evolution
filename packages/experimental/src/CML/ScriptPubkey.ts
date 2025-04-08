/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ScriptPubkey class
 *
 * @since 2.0.0
 * @category Types
 */
export type ScriptPubkey = CML.ScriptPubkey;

/**
 * Error class for ScriptPubkey operations
 *
 * This error is thrown when operations on ScriptPubkey instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ScriptPubkeyError extends Data.TaggedError("ScriptPubkeyError")<{
  message?: string;
}> {}

/**
 * Method free of ScriptPubkey
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.ScriptPubkey,
) => Effect.Effect<void, ScriptPubkeyError> = Effect.fn(
  (instance: CML.ScriptPubkey) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptPubkeyError({
          message: `ScriptPubkey.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ScriptPubkey): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ScriptPubkey
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.ScriptPubkey,
) => Effect.Effect<Uint8Array, ScriptPubkeyError> = Effect.fn(
  (instance: CML.ScriptPubkey) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ScriptPubkeyError({
          message: `ScriptPubkey.toCborBytes failed ScriptPubkey is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ScriptPubkey): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ScriptPubkey
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.ScriptPubkey,
) => Effect.Effect<Uint8Array, ScriptPubkeyError> = Effect.fn(
  (instance: CML.ScriptPubkey) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ScriptPubkeyError({
          message: `ScriptPubkey.toCanonicalCborBytes failed ScriptPubkey is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.ScriptPubkey,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ScriptPubkey
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ScriptPubkey, ScriptPubkeyError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.ScriptPubkey.from_cbor_bytes(cborBytes),
    catch: () =>
      new ScriptPubkeyError({
        message: `ScriptPubkey.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ScriptPubkey.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.ScriptPubkey =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ScriptPubkey
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.ScriptPubkey,
) => Effect.Effect<string, ScriptPubkeyError> = Effect.fn(
  (instance: CML.ScriptPubkey) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ScriptPubkeyError({
          message: `ScriptPubkey.toCborHex failed ScriptPubkey is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ScriptPubkey): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ScriptPubkey
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.ScriptPubkey,
) => Effect.Effect<string, ScriptPubkeyError> = Effect.fn(
  (instance: CML.ScriptPubkey) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ScriptPubkeyError({
          message: `ScriptPubkey.toCanonicalCborHex failed ScriptPubkey is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ScriptPubkey): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ScriptPubkey
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ScriptPubkey, ScriptPubkeyError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.ScriptPubkey.from_cbor_hex(cborBytes),
    catch: () =>
      new ScriptPubkeyError({
        message: `ScriptPubkey.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls ScriptPubkey.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.ScriptPubkey =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ScriptPubkey
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.ScriptPubkey,
) => Effect.Effect<string, ScriptPubkeyError> = Effect.fn(
  (instance: CML.ScriptPubkey) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ScriptPubkeyError({
          message: `ScriptPubkey.toJson failed ScriptPubkey is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ScriptPubkey): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ScriptPubkey
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.ScriptPubkey,
) => Effect.Effect<any, ScriptPubkeyError> = Effect.fn(
  (instance: CML.ScriptPubkey) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ScriptPubkeyError({
          message: `ScriptPubkey.toJsValue failed ScriptPubkey is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ScriptPubkey): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ScriptPubkey
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.ScriptPubkey, ScriptPubkeyError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.ScriptPubkey.from_json(json),
    catch: () =>
      new ScriptPubkeyError({
        message: `ScriptPubkey.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls ScriptPubkey.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.ScriptPubkey =>
  Effect.runSync(fromJson(json));

/**
 * Method ed25519KeyHash of ScriptPubkey
 *
 * @since 2.0.0
 * @category Methods
 */
export const ed25519KeyHash: (
  instance: CML.ScriptPubkey,
) => Effect.Effect<CML.Ed25519KeyHash, ScriptPubkeyError> = Effect.fn(
  (instance: CML.ScriptPubkey) =>
    Effect.try({
      try: () => instance.ed25519_key_hash(),
      catch: () =>
        new ScriptPubkeyError({
          message: `ScriptPubkey.ed25519KeyHash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.ed25519KeyHash without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const ed25519KeyHashUnsafe = (
  instance: CML.ScriptPubkey,
): CML.Ed25519KeyHash => Effect.runSync(ed25519KeyHash(instance));

/**
 * Static method _new of ScriptPubkey
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  ed25519KeyHash: CML.Ed25519KeyHash,
) => Effect.Effect<CML.ScriptPubkey, ScriptPubkeyError> = Effect.fn(function* (
  ed25519KeyHash: CML.Ed25519KeyHash,
) {
  return yield* Effect.try({
    try: () => CML.ScriptPubkey.new(ed25519KeyHash),
    catch: () =>
      new ScriptPubkeyError({
        message: `ScriptPubkey._new failed with parameters: ${ed25519KeyHash} (Ed25519KeyHash). `,
      }),
  });
});

/**
 * Unsafely calls ScriptPubkey._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  ed25519KeyHash: CML.Ed25519KeyHash,
): CML.ScriptPubkey => Effect.runSync(_new(ed25519KeyHash));

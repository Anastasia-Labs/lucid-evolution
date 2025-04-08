/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML BootstrapWitness class
 *
 * @since 2.0.0
 * @category Types
 */
export type BootstrapWitness = CML.BootstrapWitness;

/**
 * Error class for BootstrapWitness operations
 *
 * This error is thrown when operations on BootstrapWitness instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class BootstrapWitnessError extends Data.TaggedError(
  "BootstrapWitnessError",
)<{
  message?: string;
}> {}

/**
 * Method free of BootstrapWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<void, BootstrapWitnessError> = Effect.fn(
  (instance: CML.BootstrapWitness) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.BootstrapWitness): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of BootstrapWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<Uint8Array, BootstrapWitnessError> = Effect.fn(
  (instance: CML.BootstrapWitness) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.toCborBytes failed BootstrapWitness is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.BootstrapWitness): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of BootstrapWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<Uint8Array, BootstrapWitnessError> = Effect.fn(
  (instance: CML.BootstrapWitness) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.toCanonicalCborBytes failed BootstrapWitness is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.BootstrapWitness,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of BootstrapWitness
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.BootstrapWitness, BootstrapWitnessError> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.BootstrapWitness.from_cbor_bytes(cborBytes),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls BootstrapWitness.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (
  cborBytes: Uint8Array,
): CML.BootstrapWitness => Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of BootstrapWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<string, BootstrapWitnessError> = Effect.fn(
  (instance: CML.BootstrapWitness) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.toCborHex failed BootstrapWitness is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.BootstrapWitness): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of BootstrapWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<string, BootstrapWitnessError> = Effect.fn(
  (instance: CML.BootstrapWitness) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.toCanonicalCborHex failed BootstrapWitness is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.BootstrapWitness,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of BootstrapWitness
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.BootstrapWitness, BootstrapWitnessError> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.BootstrapWitness.from_cbor_hex(cborBytes),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls BootstrapWitness.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.BootstrapWitness =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of BootstrapWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<string, BootstrapWitnessError> = Effect.fn(
  (instance: CML.BootstrapWitness) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.toJson failed BootstrapWitness is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.BootstrapWitness): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of BootstrapWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<any, BootstrapWitnessError> = Effect.fn(
  (instance: CML.BootstrapWitness) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.toJsValue failed BootstrapWitness is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.BootstrapWitness): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of BootstrapWitness
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.BootstrapWitness, BootstrapWitnessError> = Effect.fn(
  function* (json: string) {
    return yield* Effect.try({
      try: () => CML.BootstrapWitness.from_json(json),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  },
);

/**
 * Unsafely calls BootstrapWitness.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.BootstrapWitness =>
  Effect.runSync(fromJson(json));

/**
 * Method publicKey of BootstrapWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const publicKey: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<CML.PublicKey, BootstrapWitnessError> = Effect.fn(
  (instance: CML.BootstrapWitness) =>
    Effect.try({
      try: () => instance.public_key(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.publicKey failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.publicKey without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const publicKeyUnsafe = (
  instance: CML.BootstrapWitness,
): CML.PublicKey => Effect.runSync(publicKey(instance));

/**
 * Method signature of BootstrapWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const signature: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<CML.Ed25519Signature, BootstrapWitnessError> = Effect.fn(
  (instance: CML.BootstrapWitness) =>
    Effect.try({
      try: () => instance.signature(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.signature failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.signature without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const signatureUnsafe = (
  instance: CML.BootstrapWitness,
): CML.Ed25519Signature => Effect.runSync(signature(instance));

/**
 * Method chainCode of BootstrapWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const chainCode: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<Uint8Array, BootstrapWitnessError> = Effect.fn(
  (instance: CML.BootstrapWitness) =>
    Effect.try({
      try: () => instance.chain_code(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.chainCode failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.chainCode without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const chainCodeUnsafe = (instance: CML.BootstrapWitness): Uint8Array =>
  Effect.runSync(chainCode(instance));

/**
 * Method attributes of BootstrapWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const attributes: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<CML.AddrAttributes, BootstrapWitnessError> = Effect.fn(
  (instance: CML.BootstrapWitness) =>
    Effect.try({
      try: () => instance.attributes(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.attributes failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.attributes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const attributesUnsafe = (
  instance: CML.BootstrapWitness,
): CML.AddrAttributes => Effect.runSync(attributes(instance));

/**
 * Static method _new of BootstrapWitness
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  publicKey: CML.PublicKey,
  signature: CML.Ed25519Signature,
  chainCode: Uint8Array,
  attributes: CML.AddrAttributes,
) => Effect.Effect<CML.BootstrapWitness, BootstrapWitnessError> = Effect.fn(
  function* (
    publicKey: CML.PublicKey,
    signature: CML.Ed25519Signature,
    chainCode: Uint8Array,
    attributes: CML.AddrAttributes,
  ) {
    return yield* Effect.try({
      try: () =>
        CML.BootstrapWitness.new(publicKey, signature, chainCode, attributes),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness._new failed with parameters: ${publicKey} (PublicKey), ${signature} (Ed25519Signature), ${chainCode}, ${attributes} (AddrAttributes). `,
        }),
    });
  },
);

/**
 * Unsafely calls BootstrapWitness._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  publicKey: CML.PublicKey,
  signature: CML.Ed25519Signature,
  chainCode: Uint8Array,
  attributes: CML.AddrAttributes,
): CML.BootstrapWitness =>
  Effect.runSync(_new(publicKey, signature, chainCode, attributes));

/**
 * Method toAddress of BootstrapWitness
 *
 * @since 2.0.0
 * @category Methods
 */
export const toAddress: (
  instance: CML.BootstrapWitness,
) => Effect.Effect<CML.AddressContent, BootstrapWitnessError> = Effect.fn(
  (instance: CML.BootstrapWitness) =>
    Effect.try({
      try: () => instance.to_address(),
      catch: () =>
        new BootstrapWitnessError({
          message: `BootstrapWitness.toAddress failed BootstrapWitness is not valid for AddressContent conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toAddress without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toAddressUnsafe = (
  instance: CML.BootstrapWitness,
): CML.AddressContent => Effect.runSync(toAddress(instance));

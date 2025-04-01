/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML VRFCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type VRFCert = CML.VRFCert;

/**
 * Error class for VRFCert operations
 *
 * This error is thrown when operations on VRFCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class VRFCertError extends Data.TaggedError("VRFCertError")<{
  message?: string;
}> {}

/**
 * Method free of VRFCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.VRFCert,
) => Effect.Effect<void, VRFCertError> = Effect.fn((instance: CML.VRFCert) =>
  Effect.try({
    try: () => instance.free(),
    catch: () =>
      new VRFCertError({
        message: `VRFCert.free failed Hint: Check if you're calling free() more than once.`,
      }),
  }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.VRFCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of VRFCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.VRFCert,
) => Effect.Effect<Uint8Array, VRFCertError> = Effect.fn(
  (instance: CML.VRFCert) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new VRFCertError({
          message: `VRFCert.toCborBytes failed VRFCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.VRFCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of VRFCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.VRFCert,
) => Effect.Effect<Uint8Array, VRFCertError> = Effect.fn(
  (instance: CML.VRFCert) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new VRFCertError({
          message: `VRFCert.toCanonicalCborBytes failed VRFCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.VRFCert): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of VRFCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.VRFCert, VRFCertError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.VRFCert.from_cbor_bytes(cborBytes),
    catch: () =>
      new VRFCertError({
        message: `VRFCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls VRFCert.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.VRFCert =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of VRFCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.VRFCert,
) => Effect.Effect<string, VRFCertError> = Effect.fn((instance: CML.VRFCert) =>
  Effect.try({
    try: () => instance.to_cbor_hex(),
    catch: () =>
      new VRFCertError({
        message: `VRFCert.toCborHex failed VRFCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.VRFCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of VRFCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.VRFCert,
) => Effect.Effect<string, VRFCertError> = Effect.fn((instance: CML.VRFCert) =>
  Effect.try({
    try: () => instance.to_canonical_cbor_hex(),
    catch: () =>
      new VRFCertError({
        message: `VRFCert.toCanonicalCborHex failed VRFCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.VRFCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of VRFCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.VRFCert, VRFCertError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.VRFCert.from_cbor_hex(cborBytes),
    catch: () =>
      new VRFCertError({
        message: `VRFCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls VRFCert.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.VRFCert =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of VRFCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.VRFCert,
) => Effect.Effect<string, VRFCertError> = Effect.fn((instance: CML.VRFCert) =>
  Effect.try({
    try: () => instance.to_json(),
    catch: () =>
      new VRFCertError({
        message: `VRFCert.toJson failed VRFCert is not valid for string conversion. Hint: Validate your JSON structure.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.VRFCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of VRFCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.VRFCert,
) => Effect.Effect<any, VRFCertError> = Effect.fn((instance: CML.VRFCert) =>
  Effect.try({
    try: () => instance.to_js_value(),
    catch: () =>
      new VRFCertError({
        message: `VRFCert.toJsValue failed VRFCert is not valid for any conversion. `,
      }),
  }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.VRFCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of VRFCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.VRFCert, VRFCertError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.VRFCert.from_json(json),
    catch: () =>
      new VRFCertError({
        message: `VRFCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls VRFCert.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.VRFCert =>
  Effect.runSync(fromJson(json));

/**
 * Method output of VRFCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const output: (
  instance: CML.VRFCert,
) => Effect.Effect<Uint8Array, VRFCertError> = Effect.fn(
  (instance: CML.VRFCert) =>
    Effect.try({
      try: () => instance.output(),
      catch: () =>
        new VRFCertError({
          message: `VRFCert.output failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.output without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const outputUnsafe = (instance: CML.VRFCert): Uint8Array =>
  Effect.runSync(output(instance));

/**
 * Method proof of VRFCert
 *
 * @since 2.0.0
 * @category Methods
 */
export const proof: (
  instance: CML.VRFCert,
) => Effect.Effect<Uint8Array, VRFCertError> = Effect.fn(
  (instance: CML.VRFCert) =>
    Effect.try({
      try: () => instance.proof(),
      catch: () =>
        new VRFCertError({
          message: `VRFCert.proof failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.proof without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const proofUnsafe = (instance: CML.VRFCert): Uint8Array =>
  Effect.runSync(proof(instance));

/**
 * Static method _new of VRFCert
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  output: Uint8Array,
  proof: Uint8Array,
) => Effect.Effect<CML.VRFCert, VRFCertError> = Effect.fn(function* (
  output: Uint8Array,
  proof: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.VRFCert.new(output, proof),
    catch: () =>
      new VRFCertError({
        message: `VRFCert._new failed with parameters: ${output}, ${proof}. `,
      }),
  });
});

/**
 * Unsafely calls VRFCert._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  output: Uint8Array,
  proof: Uint8Array,
): CML.VRFCert => Effect.runSync(_new(output, proof));

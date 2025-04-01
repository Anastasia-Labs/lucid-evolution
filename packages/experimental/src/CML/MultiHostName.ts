/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MultiHostName class
 *
 * @since 2.0.0
 * @category Types
 */
export type MultiHostName = CML.MultiHostName;

/**
 * Error class for MultiHostName operations
 *
 * This error is thrown when operations on MultiHostName instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class MultiHostNameError extends Data.TaggedError("MultiHostNameError")<{
  message?: string;
}> {}

/**
 * Method free of MultiHostName
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.MultiHostName,
) => Effect.Effect<void, MultiHostNameError> = Effect.fn(
  (instance: CML.MultiHostName) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.MultiHostName): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of MultiHostName
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.MultiHostName,
) => Effect.Effect<Uint8Array, MultiHostNameError> = Effect.fn(
  (instance: CML.MultiHostName) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.toCborBytes failed MultiHostName is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.MultiHostName): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of MultiHostName
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.MultiHostName,
) => Effect.Effect<Uint8Array, MultiHostNameError> = Effect.fn(
  (instance: CML.MultiHostName) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.toCanonicalCborBytes failed MultiHostName is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.MultiHostName,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of MultiHostName
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.MultiHostName, MultiHostNameError> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.MultiHostName.from_cbor_bytes(cborBytes),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls MultiHostName.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.MultiHostName =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of MultiHostName
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.MultiHostName,
) => Effect.Effect<string, MultiHostNameError> = Effect.fn(
  (instance: CML.MultiHostName) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.toCborHex failed MultiHostName is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.MultiHostName): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of MultiHostName
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.MultiHostName,
) => Effect.Effect<string, MultiHostNameError> = Effect.fn(
  (instance: CML.MultiHostName) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.toCanonicalCborHex failed MultiHostName is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.MultiHostName): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of MultiHostName
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.MultiHostName, MultiHostNameError> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.MultiHostName.from_cbor_hex(cborBytes),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls MultiHostName.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.MultiHostName =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of MultiHostName
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.MultiHostName,
) => Effect.Effect<string, MultiHostNameError> = Effect.fn(
  (instance: CML.MultiHostName) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.toJson failed MultiHostName is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.MultiHostName): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of MultiHostName
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.MultiHostName,
) => Effect.Effect<any, MultiHostNameError> = Effect.fn(
  (instance: CML.MultiHostName) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.toJsValue failed MultiHostName is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.MultiHostName): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of MultiHostName
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.MultiHostName, MultiHostNameError> = Effect.fn(
  function* (json: string) {
    return yield* Effect.try({
      try: () => CML.MultiHostName.from_json(json),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  },
);

/**
 * Unsafely calls MultiHostName.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.MultiHostName =>
  Effect.runSync(fromJson(json));

/**
 * Method dnsName of MultiHostName
 *
 * @since 2.0.0
 * @category Methods
 */
export const dnsName: (
  instance: CML.MultiHostName,
) => Effect.Effect<CML.DNSName, MultiHostNameError> = Effect.fn(
  (instance: CML.MultiHostName) =>
    Effect.try({
      try: () => instance.dns_name(),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName.dnsName failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.dnsName without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dnsNameUnsafe = (instance: CML.MultiHostName): CML.DNSName =>
  Effect.runSync(dnsName(instance));

/**
 * Static method _new of MultiHostName
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  dnsName: CML.DNSName,
) => Effect.Effect<CML.MultiHostName, MultiHostNameError> = Effect.fn(
  function* (dnsName: CML.DNSName) {
    return yield* Effect.try({
      try: () => CML.MultiHostName.new(dnsName),
      catch: () =>
        new MultiHostNameError({
          message: `MultiHostName._new failed with parameters: ${dnsName} (DNSName). `,
        }),
    });
  },
);

/**
 * Unsafely calls MultiHostName._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (dnsName: CML.DNSName): CML.MultiHostName =>
  Effect.runSync(_new(dnsName));

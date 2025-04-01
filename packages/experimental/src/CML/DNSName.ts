/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML DNSName class
 *
 * @since 2.0.0
 * @category Types
 */
export type DNSName = CML.DNSName;

/**
 * Error class for DNSName operations
 *
 * This error is thrown when operations on DNSName instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class DNSNameError extends Data.TaggedError("DNSNameError")<{
  message?: string;
}> {}

/**
 * Method free of DNSName
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.DNSName,
) => Effect.Effect<void, DNSNameError> = Effect.fn((instance: CML.DNSName) =>
  Effect.try({
    try: () => instance.free(),
    catch: () =>
      new DNSNameError({
        message: `DNSName.free failed Hint: Check if you're calling free() more than once.`,
      }),
  }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.DNSName): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of DNSName
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.DNSName,
) => Effect.Effect<Uint8Array, DNSNameError> = Effect.fn(
  (instance: CML.DNSName) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new DNSNameError({
          message: `DNSName.toCborBytes failed DNSName is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.DNSName): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of DNSName
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.DNSName,
) => Effect.Effect<Uint8Array, DNSNameError> = Effect.fn(
  (instance: CML.DNSName) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new DNSNameError({
          message: `DNSName.toCanonicalCborBytes failed DNSName is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.DNSName): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of DNSName
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.DNSName, DNSNameError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.DNSName.from_cbor_bytes(cborBytes),
    catch: () =>
      new DNSNameError({
        message: `DNSName.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls DNSName.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.DNSName =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of DNSName
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.DNSName,
) => Effect.Effect<string, DNSNameError> = Effect.fn((instance: CML.DNSName) =>
  Effect.try({
    try: () => instance.to_cbor_hex(),
    catch: () =>
      new DNSNameError({
        message: `DNSName.toCborHex failed DNSName is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.DNSName): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of DNSName
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.DNSName,
) => Effect.Effect<string, DNSNameError> = Effect.fn((instance: CML.DNSName) =>
  Effect.try({
    try: () => instance.to_canonical_cbor_hex(),
    catch: () =>
      new DNSNameError({
        message: `DNSName.toCanonicalCborHex failed DNSName is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.DNSName): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of DNSName
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.DNSName, DNSNameError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.DNSName.from_cbor_hex(cborBytes),
    catch: () =>
      new DNSNameError({
        message: `DNSName.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls DNSName.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.DNSName =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of DNSName
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.DNSName,
) => Effect.Effect<string, DNSNameError> = Effect.fn((instance: CML.DNSName) =>
  Effect.try({
    try: () => instance.to_json(),
    catch: () =>
      new DNSNameError({
        message: `DNSName.toJson failed DNSName is not valid for string conversion. Hint: Validate your JSON structure.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.DNSName): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of DNSName
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.DNSName,
) => Effect.Effect<any, DNSNameError> = Effect.fn((instance: CML.DNSName) =>
  Effect.try({
    try: () => instance.to_js_value(),
    catch: () =>
      new DNSNameError({
        message: `DNSName.toJsValue failed DNSName is not valid for any conversion. `,
      }),
  }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.DNSName): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of DNSName
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.DNSName, DNSNameError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.DNSName.from_json(json),
    catch: () =>
      new DNSNameError({
        message: `DNSName.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls DNSName.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.DNSName =>
  Effect.runSync(fromJson(json));

/**
 * Method get of DNSName
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.DNSName,
) => Effect.Effect<string, DNSNameError> = Effect.fn((instance: CML.DNSName) =>
  Effect.try({
    try: () => instance.get(),
    catch: () =>
      new DNSNameError({
        message: `DNSName.get failed `,
      }),
  }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.DNSName): string =>
  Effect.runSync(get(instance));

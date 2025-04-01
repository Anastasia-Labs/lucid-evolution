/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Ipv4 class
 *
 * @since 2.0.0
 * @category Types
 */
export type Ipv4 = CML.Ipv4;

/**
 * Error class for Ipv4 operations
 *
 * This error is thrown when operations on Ipv4 instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class Ipv4Error extends Data.TaggedError("Ipv4Error")<{
  message?: string;
}> {}

/**
 * Method free of Ipv4
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.Ipv4) => Effect.Effect<void, Ipv4Error> =
  Effect.fn((instance: CML.Ipv4) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new Ipv4Error({
          message: `Ipv4.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
  );

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Ipv4): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Ipv4
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.Ipv4,
) => Effect.Effect<Uint8Array, Ipv4Error> = Effect.fn((instance: CML.Ipv4) =>
  Effect.try({
    try: () => instance.to_cbor_bytes(),
    catch: () =>
      new Ipv4Error({
        message: `Ipv4.toCborBytes failed Ipv4 is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Ipv4): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Ipv4
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.Ipv4,
) => Effect.Effect<Uint8Array, Ipv4Error> = Effect.fn((instance: CML.Ipv4) =>
  Effect.try({
    try: () => instance.to_canonical_cbor_bytes(),
    catch: () =>
      new Ipv4Error({
        message: `Ipv4.toCanonicalCborBytes failed Ipv4 is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Ipv4): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Ipv4
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Ipv4, Ipv4Error> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.Ipv4.from_cbor_bytes(cborBytes),
    catch: () =>
      new Ipv4Error({
        message: `Ipv4.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Ipv4.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.Ipv4 =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Ipv4
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.Ipv4,
) => Effect.Effect<string, Ipv4Error> = Effect.fn((instance: CML.Ipv4) =>
  Effect.try({
    try: () => instance.to_cbor_hex(),
    catch: () =>
      new Ipv4Error({
        message: `Ipv4.toCborHex failed Ipv4 is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Ipv4): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Ipv4
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.Ipv4,
) => Effect.Effect<string, Ipv4Error> = Effect.fn((instance: CML.Ipv4) =>
  Effect.try({
    try: () => instance.to_canonical_cbor_hex(),
    catch: () =>
      new Ipv4Error({
        message: `Ipv4.toCanonicalCborHex failed Ipv4 is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Ipv4): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Ipv4
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Ipv4, Ipv4Error> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.Ipv4.from_cbor_hex(cborBytes),
    catch: () =>
      new Ipv4Error({
        message: `Ipv4.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls Ipv4.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.Ipv4 =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Ipv4
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.Ipv4) => Effect.Effect<string, Ipv4Error> =
  Effect.fn((instance: CML.Ipv4) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new Ipv4Error({
          message: `Ipv4.toJson failed Ipv4 is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
  );

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Ipv4): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Ipv4
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.Ipv4) => Effect.Effect<any, Ipv4Error> =
  Effect.fn((instance: CML.Ipv4) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new Ipv4Error({
          message: `Ipv4.toJsValue failed Ipv4 is not valid for any conversion. `,
        }),
    }),
  );

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Ipv4): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Ipv4
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.Ipv4, Ipv4Error> =
  Effect.fn(function* (json: string) {
    return yield* Effect.try({
      try: () => CML.Ipv4.from_json(json),
      catch: () =>
        new Ipv4Error({
          message: `Ipv4.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  });

/**
 * Unsafely calls Ipv4.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.Ipv4 =>
  Effect.runSync(fromJson(json));

/**
 * Method get of Ipv4
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (instance: CML.Ipv4) => Effect.Effect<Uint8Array, Ipv4Error> =
  Effect.fn((instance: CML.Ipv4) =>
    Effect.try({
      try: () => instance.get(),
      catch: () =>
        new Ipv4Error({
          message: `Ipv4.get failed `,
        }),
    }),
  );

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.Ipv4): Uint8Array =>
  Effect.runSync(get(instance));

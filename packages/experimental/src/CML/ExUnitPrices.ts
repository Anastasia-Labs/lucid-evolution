/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ExUnitPrices class
 *
 * @since 2.0.0
 * @category Types
 */
export type ExUnitPrices = CML.ExUnitPrices;

/**
 * Error class for ExUnitPrices operations
 *
 * This error is thrown when operations on ExUnitPrices instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ExUnitPricesError extends Data.TaggedError("ExUnitPricesError")<{
  message?: string;
}> {}

/**
 * Method free of ExUnitPrices
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<void, ExUnitPricesError> = Effect.fn(
  (instance: CML.ExUnitPrices) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ExUnitPricesError({
          message: `ExUnitPrices.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ExUnitPrices): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ExUnitPrices
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<Uint8Array, ExUnitPricesError> = Effect.fn(
  (instance: CML.ExUnitPrices) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ExUnitPricesError({
          message: `ExUnitPrices.toCborBytes failed ExUnitPrices is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ExUnitPrices): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ExUnitPrices
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<Uint8Array, ExUnitPricesError> = Effect.fn(
  (instance: CML.ExUnitPrices) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ExUnitPricesError({
          message: `ExUnitPrices.toCanonicalCborBytes failed ExUnitPrices is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.ExUnitPrices,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ExUnitPrices
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ExUnitPrices, ExUnitPricesError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.ExUnitPrices.from_cbor_bytes(cborBytes),
    catch: () =>
      new ExUnitPricesError({
        message: `ExUnitPrices.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ExUnitPrices.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.ExUnitPrices =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ExUnitPrices
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<string, ExUnitPricesError> = Effect.fn(
  (instance: CML.ExUnitPrices) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ExUnitPricesError({
          message: `ExUnitPrices.toCborHex failed ExUnitPrices is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ExUnitPrices): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ExUnitPrices
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<string, ExUnitPricesError> = Effect.fn(
  (instance: CML.ExUnitPrices) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ExUnitPricesError({
          message: `ExUnitPrices.toCanonicalCborHex failed ExUnitPrices is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.ExUnitPrices): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ExUnitPrices
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ExUnitPrices, ExUnitPricesError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.ExUnitPrices.from_cbor_hex(cborBytes),
    catch: () =>
      new ExUnitPricesError({
        message: `ExUnitPrices.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls ExUnitPrices.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.ExUnitPrices =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ExUnitPrices
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<string, ExUnitPricesError> = Effect.fn(
  (instance: CML.ExUnitPrices) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ExUnitPricesError({
          message: `ExUnitPrices.toJson failed ExUnitPrices is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ExUnitPrices): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ExUnitPrices
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<any, ExUnitPricesError> = Effect.fn(
  (instance: CML.ExUnitPrices) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ExUnitPricesError({
          message: `ExUnitPrices.toJsValue failed ExUnitPrices is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ExUnitPrices): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ExUnitPrices
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.ExUnitPrices, ExUnitPricesError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.ExUnitPrices.from_json(json),
    catch: () =>
      new ExUnitPricesError({
        message: `ExUnitPrices.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls ExUnitPrices.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.ExUnitPrices =>
  Effect.runSync(fromJson(json));

/**
 * Method memPrice of ExUnitPrices
 *
 * @since 2.0.0
 * @category Methods
 */
export const memPrice: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<CML.Rational, ExUnitPricesError> = Effect.fn(
  (instance: CML.ExUnitPrices) =>
    Effect.try({
      try: () => instance.mem_price(),
      catch: () =>
        new ExUnitPricesError({
          message: `ExUnitPrices.memPrice failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.memPrice without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const memPriceUnsafe = (instance: CML.ExUnitPrices): CML.Rational =>
  Effect.runSync(memPrice(instance));

/**
 * Method stepPrice of ExUnitPrices
 *
 * @since 2.0.0
 * @category Methods
 */
export const stepPrice: (
  instance: CML.ExUnitPrices,
) => Effect.Effect<CML.Rational, ExUnitPricesError> = Effect.fn(
  (instance: CML.ExUnitPrices) =>
    Effect.try({
      try: () => instance.step_price(),
      catch: () =>
        new ExUnitPricesError({
          message: `ExUnitPrices.stepPrice failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.stepPrice without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stepPriceUnsafe = (instance: CML.ExUnitPrices): CML.Rational =>
  Effect.runSync(stepPrice(instance));

/**
 * Static method _new of ExUnitPrices
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  memPrice: CML.Rational,
  stepPrice: CML.Rational,
) => Effect.Effect<CML.ExUnitPrices, ExUnitPricesError> = Effect.fn(function* (
  memPrice: CML.Rational,
  stepPrice: CML.Rational,
) {
  return yield* Effect.try({
    try: () => CML.ExUnitPrices.new(memPrice, stepPrice),
    catch: () =>
      new ExUnitPricesError({
        message: `ExUnitPrices._new failed with parameters: ${memPrice} (Rational), ${stepPrice} (Rational). `,
      }),
  });
});

/**
 * Unsafely calls ExUnitPrices._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  memPrice: CML.Rational,
  stepPrice: CML.Rational,
): CML.ExUnitPrices => Effect.runSync(_new(memPrice, stepPrice));

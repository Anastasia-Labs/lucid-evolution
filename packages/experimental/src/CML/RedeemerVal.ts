/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML RedeemerVal class
 *
 * @since 2.0.0
 * @category Types
 */
export type RedeemerVal = CML.RedeemerVal;

/**
 * Error class for RedeemerVal operations
 *
 * This error is thrown when operations on RedeemerVal instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class RedeemerValError extends Data.TaggedError("RedeemerValError")<{
  message?: string;
}> {}

/**
 * Method free of RedeemerVal
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.RedeemerVal,
) => Effect.Effect<void, RedeemerValError> = Effect.fn(
  (instance: CML.RedeemerVal) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.RedeemerVal): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of RedeemerVal
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.RedeemerVal,
) => Effect.Effect<Uint8Array, RedeemerValError> = Effect.fn(
  (instance: CML.RedeemerVal) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.toCborBytes failed RedeemerVal is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.RedeemerVal): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of RedeemerVal
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.RedeemerVal,
) => Effect.Effect<Uint8Array, RedeemerValError> = Effect.fn(
  (instance: CML.RedeemerVal) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.toCanonicalCborBytes failed RedeemerVal is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.RedeemerVal,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of RedeemerVal
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.RedeemerVal, RedeemerValError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.RedeemerVal.from_cbor_bytes(cborBytes),
    catch: () =>
      new RedeemerValError({
        message: `RedeemerVal.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls RedeemerVal.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.RedeemerVal =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of RedeemerVal
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.RedeemerVal,
) => Effect.Effect<string, RedeemerValError> = Effect.fn(
  (instance: CML.RedeemerVal) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.toCborHex failed RedeemerVal is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.RedeemerVal): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of RedeemerVal
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.RedeemerVal,
) => Effect.Effect<string, RedeemerValError> = Effect.fn(
  (instance: CML.RedeemerVal) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.toCanonicalCborHex failed RedeemerVal is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.RedeemerVal): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of RedeemerVal
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.RedeemerVal, RedeemerValError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.RedeemerVal.from_cbor_hex(cborBytes),
    catch: () =>
      new RedeemerValError({
        message: `RedeemerVal.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls RedeemerVal.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.RedeemerVal =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of RedeemerVal
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.RedeemerVal,
) => Effect.Effect<string, RedeemerValError> = Effect.fn(
  (instance: CML.RedeemerVal) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.toJson failed RedeemerVal is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.RedeemerVal): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of RedeemerVal
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.RedeemerVal,
) => Effect.Effect<any, RedeemerValError> = Effect.fn(
  (instance: CML.RedeemerVal) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.toJsValue failed RedeemerVal is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.RedeemerVal): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of RedeemerVal
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.RedeemerVal, RedeemerValError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.RedeemerVal.from_json(json),
    catch: () =>
      new RedeemerValError({
        message: `RedeemerVal.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls RedeemerVal.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.RedeemerVal =>
  Effect.runSync(fromJson(json));

/**
 * Method data of RedeemerVal
 *
 * @since 2.0.0
 * @category Methods
 */
export const data: (
  instance: CML.RedeemerVal,
) => Effect.Effect<CML.PlutusData, RedeemerValError> = Effect.fn(
  (instance: CML.RedeemerVal) =>
    Effect.try({
      try: () => instance.data(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.data failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.data without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dataUnsafe = (instance: CML.RedeemerVal): CML.PlutusData =>
  Effect.runSync(data(instance));

/**
 * Method exUnits of RedeemerVal
 *
 * @since 2.0.0
 * @category Methods
 */
export const exUnits: (
  instance: CML.RedeemerVal,
) => Effect.Effect<CML.ExUnits, RedeemerValError> = Effect.fn(
  (instance: CML.RedeemerVal) =>
    Effect.try({
      try: () => instance.ex_units(),
      catch: () =>
        new RedeemerValError({
          message: `RedeemerVal.exUnits failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.exUnits without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const exUnitsUnsafe = (instance: CML.RedeemerVal): CML.ExUnits =>
  Effect.runSync(exUnits(instance));

/**
 * Static method _new of RedeemerVal
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  data: CML.PlutusData,
  exUnits: CML.ExUnits,
) => Effect.Effect<CML.RedeemerVal, RedeemerValError> = Effect.fn(function* (
  data: CML.PlutusData,
  exUnits: CML.ExUnits,
) {
  return yield* Effect.try({
    try: () => CML.RedeemerVal.new(data, exUnits),
    catch: () =>
      new RedeemerValError({
        message: `RedeemerVal._new failed with parameters: ${data} (PlutusData), ${exUnits} (ExUnits). `,
      }),
  });
});

/**
 * Unsafely calls RedeemerVal._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  data: CML.PlutusData,
  exUnits: CML.ExUnits,
): CML.RedeemerVal => Effect.runSync(_new(data, exUnits));

/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CostModels class
 *
 * @since 2.0.0
 * @category Types
 */
export type CostModels = CML.CostModels;

/**
 * Error class for CostModels operations
 *
 * This error is thrown when operations on CostModels instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CostModelsError extends Data.TaggedError("CostModelsError")<{
  message?: string;
}> {}

/**
 * Method free of CostModels
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.CostModels,
) => Effect.Effect<void, CostModelsError> = Effect.fn(
  (instance: CML.CostModels) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CostModelsError({
          message: `CostModels.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CostModels): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CostModels
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.CostModels,
) => Effect.Effect<Uint8Array, CostModelsError> = Effect.fn(
  (instance: CML.CostModels) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CostModelsError({
          message: `CostModels.toCborBytes failed CostModels is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.CostModels): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of CostModels
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.CostModels,
) => Effect.Effect<Uint8Array, CostModelsError> = Effect.fn(
  (instance: CML.CostModels) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new CostModelsError({
          message: `CostModels.toCanonicalCborBytes failed CostModels is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.CostModels,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of CostModels
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.CostModels, CostModelsError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.CostModels.from_cbor_bytes(cborBytes),
    catch: () =>
      new CostModelsError({
        message: `CostModels.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls CostModels.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.CostModels =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CostModels
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.CostModels,
) => Effect.Effect<string, CostModelsError> = Effect.fn(
  (instance: CML.CostModels) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CostModelsError({
          message: `CostModels.toCborHex failed CostModels is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.CostModels): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of CostModels
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.CostModels,
) => Effect.Effect<string, CostModelsError> = Effect.fn(
  (instance: CML.CostModels) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new CostModelsError({
          message: `CostModels.toCanonicalCborHex failed CostModels is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.CostModels): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of CostModels
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.CostModels, CostModelsError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.CostModels.from_cbor_hex(cborBytes),
    catch: () =>
      new CostModelsError({
        message: `CostModels.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls CostModels.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.CostModels =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CostModels
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.CostModels,
) => Effect.Effect<string, CostModelsError> = Effect.fn(
  (instance: CML.CostModels) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CostModelsError({
          message: `CostModels.toJson failed CostModels is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.CostModels): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CostModels
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.CostModels,
) => Effect.Effect<any, CostModelsError> = Effect.fn(
  (instance: CML.CostModels) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CostModelsError({
          message: `CostModels.toJsValue failed CostModels is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.CostModels): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CostModels
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.CostModels, CostModelsError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.CostModels.from_json(json),
    catch: () =>
      new CostModelsError({
        message: `CostModels.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls CostModels.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.CostModels =>
  Effect.runSync(fromJson(json));

/**
 * Method inner of CostModels
 *
 * @since 2.0.0
 * @category Methods
 */
export const inner: (
  instance: CML.CostModels,
) => Effect.Effect<CML.MapU64ToArrI64, CostModelsError> = Effect.fn(
  (instance: CML.CostModels) =>
    Effect.try({
      try: () => instance.inner(),
      catch: () =>
        new CostModelsError({
          message: `CostModels.inner failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.inner without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const innerUnsafe = (instance: CML.CostModels): CML.MapU64ToArrI64 =>
  Effect.runSync(inner(instance));

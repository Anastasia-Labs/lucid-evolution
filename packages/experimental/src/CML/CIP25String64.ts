/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP25String64 class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP25String64 = CML.CIP25String64;

/**
 * Error class for CIP25String64 operations
 *
 * This error is thrown when operations on CIP25String64 instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CIP25String64Error extends Data.TaggedError("CIP25String64Error")<{
  message?: string;
}> {}

/**
 * Method free of CIP25String64
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.CIP25String64,
) => Effect.Effect<void, CIP25String64Error> = Effect.fn(
  (instance: CML.CIP25String64) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP25String64): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP25String64
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.CIP25String64,
) => Effect.Effect<Uint8Array, CIP25String64Error> = Effect.fn(
  (instance: CML.CIP25String64) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.toCborBytes failed CIP25String64 is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.CIP25String64): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of CIP25String64
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.CIP25String64, CIP25String64Error> = Effect.fn(
  function* (cborBytes: Uint8Array) {
    return yield* Effect.try({
      try: () => CML.CIP25String64.from_cbor_bytes(cborBytes),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
        }),
    });
  },
);

/**
 * Unsafely calls CIP25String64.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.CIP25String64 =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP25String64
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.CIP25String64,
) => Effect.Effect<string, CIP25String64Error> = Effect.fn(
  (instance: CML.CIP25String64) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.toCborHex failed CIP25String64 is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.CIP25String64): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of CIP25String64
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.CIP25String64, CIP25String64Error> = Effect.fn(
  function* (cborBytes: string) {
    return yield* Effect.try({
      try: () => CML.CIP25String64.from_cbor_hex(cborBytes),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    });
  },
);

/**
 * Unsafely calls CIP25String64.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.CIP25String64 =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP25String64
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.CIP25String64,
) => Effect.Effect<string, CIP25String64Error> = Effect.fn(
  (instance: CML.CIP25String64) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.toJson failed CIP25String64 is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.CIP25String64): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP25String64
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.CIP25String64,
) => Effect.Effect<any, CIP25String64Error> = Effect.fn(
  (instance: CML.CIP25String64) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.toJsValue failed CIP25String64 is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.CIP25String64): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP25String64
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.CIP25String64, CIP25String64Error> = Effect.fn(
  function* (json: string) {
    return yield* Effect.try({
      try: () => CML.CIP25String64.from_json(json),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
        }),
    });
  },
);

/**
 * Unsafely calls CIP25String64.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.CIP25String64 =>
  Effect.runSync(fromJson(json));

/**
 * Method get of CIP25String64
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.CIP25String64,
) => Effect.Effect<string, CIP25String64Error> = Effect.fn(
  (instance: CML.CIP25String64) =>
    Effect.try({
      try: () => instance.get(),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.get failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.CIP25String64): string =>
  Effect.runSync(get(instance));

/**
 * Static method _new of CIP25String64
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (
  s: string,
) => Effect.Effect<CML.CIP25String64, CIP25String64Error> = Effect.fn(
  function* (s: string) {
    return yield* Effect.try({
      try: () => CML.CIP25String64.new(s),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64._new failed with parameters: ${s}. `,
        }),
    });
  },
);

/**
 * Unsafely calls CIP25String64._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (s: string): CML.CIP25String64 =>
  Effect.runSync(_new(s));

/**
 * Method toStr of CIP25String64
 *
 * @since 2.0.0
 * @category Methods
 */
export const toStr: (
  instance: CML.CIP25String64,
) => Effect.Effect<string, CIP25String64Error> = Effect.fn(
  (instance: CML.CIP25String64) =>
    Effect.try({
      try: () => instance.to_str(),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.toStr failed CIP25String64 is not valid for string conversion. Hint: Not all CIP25String64 instances can be stringified.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toStr without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toStrUnsafe = (instance: CML.CIP25String64): string =>
  Effect.runSync(toStr(instance));

/**
 * Method getStr of CIP25String64
 *
 * @since 2.0.0
 * @category Methods
 */
export const getStr: (
  instance: CML.CIP25String64,
) => Effect.Effect<string, CIP25String64Error> = Effect.fn(
  (instance: CML.CIP25String64) =>
    Effect.try({
      try: () => instance.get_str(),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.getStr failed Hint: Not all CIP25String64 instances can be stringified.`,
        }),
    }),
);

/**
 * Unsafely calls instance.getStr without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getStrUnsafe = (instance: CML.CIP25String64): string =>
  Effect.runSync(getStr(instance));

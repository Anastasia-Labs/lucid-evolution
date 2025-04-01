/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML BigInteger class
 *
 * @since 2.0.0
 * @category Types
 */
export type BigInteger = CML.BigInteger;

/**
 * Error class for BigInteger operations
 *
 * This error is thrown when operations on BigInteger instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class BigIntegerError extends Data.TaggedError("BigIntegerError")<{
  message?: string;
}> {}

/**
 * Method free of BigInteger
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.BigInteger,
) => Effect.Effect<void, BigIntegerError> = Effect.fn(
  (instance: CML.BigInteger) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new BigIntegerError({
          message: `BigInteger.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.BigInteger): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of BigInteger
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.BigInteger,
) => Effect.Effect<Uint8Array, BigIntegerError> = Effect.fn(
  (instance: CML.BigInteger) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new BigIntegerError({
          message: `BigInteger.toCborBytes failed BigInteger is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.BigInteger): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of BigInteger
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.BigInteger,
) => Effect.Effect<Uint8Array, BigIntegerError> = Effect.fn(
  (instance: CML.BigInteger) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new BigIntegerError({
          message: `BigInteger.toCanonicalCborBytes failed BigInteger is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
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
  instance: CML.BigInteger,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of BigInteger
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.BigInteger, BigIntegerError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.BigInteger.from_cbor_bytes(cborBytes),
    catch: () =>
      new BigIntegerError({
        message: `BigInteger.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls BigInteger.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.BigInteger =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of BigInteger
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.BigInteger,
) => Effect.Effect<string, BigIntegerError> = Effect.fn(
  (instance: CML.BigInteger) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new BigIntegerError({
          message: `BigInteger.toCborHex failed BigInteger is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.BigInteger): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of BigInteger
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.BigInteger,
) => Effect.Effect<string, BigIntegerError> = Effect.fn(
  (instance: CML.BigInteger) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new BigIntegerError({
          message: `BigInteger.toCanonicalCborHex failed BigInteger is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.BigInteger): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of BigInteger
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.BigInteger, BigIntegerError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.BigInteger.from_cbor_hex(cborBytes),
    catch: () =>
      new BigIntegerError({
        message: `BigInteger.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls BigInteger.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.BigInteger =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of BigInteger
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (
  instance: CML.BigInteger,
) => Effect.Effect<string, BigIntegerError> = Effect.fn(
  (instance: CML.BigInteger) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new BigIntegerError({
          message: `BigInteger.toJson failed BigInteger is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.BigInteger): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of BigInteger
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (
  instance: CML.BigInteger,
) => Effect.Effect<any, BigIntegerError> = Effect.fn(
  (instance: CML.BigInteger) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new BigIntegerError({
          message: `BigInteger.toJsValue failed BigInteger is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.BigInteger): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of BigInteger
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (
  json: string,
) => Effect.Effect<CML.BigInteger, BigIntegerError> = Effect.fn(function* (
  json: string,
) {
  return yield* Effect.try({
    try: () => CML.BigInteger.from_json(json),
    catch: () =>
      new BigIntegerError({
        message: `BigInteger.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls BigInteger.fromJson without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.BigInteger =>
  Effect.runSync(fromJson(json));

/**
 * Static method fromInt of BigInteger
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromInt: (
  x: CML.Int,
) => Effect.Effect<CML.BigInteger, BigIntegerError> = Effect.fn(function* (
  x: CML.Int,
) {
  return yield* Effect.try({
    try: () => CML.BigInteger.from_int(x),
    catch: () =>
      new BigIntegerError({
        message: `BigInteger.fromInt failed with parameters: ${x} (Int). `,
      }),
  });
});

/**
 * Unsafely calls BigInteger.fromInt without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromIntUnsafe = (x: CML.Int): CML.BigInteger =>
  Effect.runSync(fromInt(x));

/**
 * Static method fromStr of BigInteger
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromStr: (
  s: string,
) => Effect.Effect<CML.BigInteger, BigIntegerError> = Effect.fn(function* (
  s: string,
) {
  return yield* Effect.try({
    try: () => CML.BigInteger.from_str(s),
    catch: () =>
      new BigIntegerError({
        message: `BigInteger.fromStr failed with parameters: ${s}. Hint: Not all BigInteger instances can be stringified.`,
      }),
  });
});

/**
 * Unsafely calls BigInteger.fromStr without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromStrUnsafe = (s: string): CML.BigInteger =>
  Effect.runSync(fromStr(s));

/**
 * Method toStr of BigInteger
 *
 * @since 2.0.0
 * @category Methods
 */
export const toStr: (
  instance: CML.BigInteger,
) => Effect.Effect<string, BigIntegerError> = Effect.fn(
  (instance: CML.BigInteger) =>
    Effect.try({
      try: () => instance.to_str(),
      catch: () =>
        new BigIntegerError({
          message: `BigInteger.toStr failed BigInteger is not valid for string conversion. Hint: Not all BigInteger instances can be stringified.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toStr without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toStrUnsafe = (instance: CML.BigInteger): string =>
  Effect.runSync(toStr(instance));

/**
 * Method asU64 of BigInteger
 *
 * @since 2.0.0
 * @category Methods
 */
export const asU64: (
  instance: CML.BigInteger,
) => Effect.Effect<bigint | undefined, BigIntegerError> = Effect.fn(
  (instance: CML.BigInteger) =>
    Effect.try({
      try: () => instance.as_u64(),
      catch: () =>
        new BigIntegerError({
          message: `BigInteger.asU64 failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asU64 without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asU64Unsafe = (instance: CML.BigInteger): bigint | undefined =>
  Effect.runSync(asU64(instance));

/**
 * Method asInt of BigInteger
 *
 * @since 2.0.0
 * @category Methods
 */
export const asInt: (
  instance: CML.BigInteger,
) => Effect.Effect<CML.Int | undefined, BigIntegerError> = Effect.fn(
  (instance: CML.BigInteger) =>
    Effect.try({
      try: () => instance.as_int(),
      catch: () =>
        new BigIntegerError({
          message: `BigInteger.asInt failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asInt without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asIntUnsafe = (instance: CML.BigInteger): CML.Int | undefined =>
  Effect.runSync(asInt(instance));

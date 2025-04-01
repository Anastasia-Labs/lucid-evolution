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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *   const result = yield* BigInteger.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.BigInteger): Effect.Effect<void, BigIntegerError> =>
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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BigInteger.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.BigInteger): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of BigInteger
 *
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *   const result = yield* BigInteger.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.BigInteger): Effect.Effect<Uint8Array, BigIntegerError> =>
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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BigInteger.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.BigInteger): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of BigInteger
 *
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *   const result = yield* BigInteger.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.BigInteger): Effect.Effect<Uint8Array, BigIntegerError> =>
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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BigInteger.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* BigInteger.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BigInteger.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of BigInteger
 *
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *   const result = yield* BigInteger.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.BigInteger): Effect.Effect<string, BigIntegerError> =>
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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BigInteger.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.BigInteger): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of BigInteger
 *
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *   const result = yield* BigInteger.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.BigInteger): Effect.Effect<string, BigIntegerError> =>
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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BigInteger.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.BigInteger): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of BigInteger
 *
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* BigInteger.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BigInteger.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of BigInteger
 *
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *   const result = yield* BigInteger.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.BigInteger): Effect.Effect<string, BigIntegerError> =>
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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BigInteger.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.BigInteger): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of BigInteger
 *
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *   const result = yield* BigInteger.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.BigInteger): Effect.Effect<any, BigIntegerError> =>
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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BigInteger.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.BigInteger): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of BigInteger
 *
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* BigInteger.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BigInteger.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Static method fromInt of BigInteger
 *
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* BigInteger.fromInt( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromInt = Effect.fn(function* (x: CML.Int) {
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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BigInteger.fromIntUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.fromIntUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromIntUnsafe = (x: CML.Int) => Effect.runSync(fromInt(x));

/**
 * Static method fromStr of BigInteger
 *
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* BigInteger.fromStr( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromStr = Effect.fn(function* (s: string) {
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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BigInteger.fromStrUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.fromStrUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromStrUnsafe = (s: string) => Effect.runSync(fromStr(s));

/**
 * Method toStr of BigInteger
 *
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *   const result = yield* BigInteger.toStr(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toStr = Effect.fn(
  (instance: CML.BigInteger): Effect.Effect<string, BigIntegerError> =>
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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BigInteger.toStrUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.toStrUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toStrUnsafe = (instance: CML.BigInteger): string =>
  Effect.runSync(toStr(instance));

/**
 * Method asU64 of BigInteger
 *
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *   const result = yield* BigInteger.asU64(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asU64 = Effect.fn(
  (
    instance: CML.BigInteger,
  ): Effect.Effect<bigint | undefined, BigIntegerError> =>
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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BigInteger.asU64Unsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.asU64Unsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asU64Unsafe = (instance: CML.BigInteger): bigint | undefined =>
  Effect.runSync(asU64(instance));

/**
 * Method asInt of BigInteger
 *
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *   const result = yield* BigInteger.asInt(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asInt = Effect.fn(
  (
    instance: CML.BigInteger,
  ): Effect.Effect<CML.Int | undefined, BigIntegerError> =>
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
 * @example
 * import { BigInteger } from "@lucid-evolution/experimental";
 *
 * // Assume we have a BigInteger instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = BigInteger.asIntUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.asIntUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asIntUnsafe = (instance: CML.BigInteger): CML.Int | undefined =>
  Effect.runSync(asInt(instance));

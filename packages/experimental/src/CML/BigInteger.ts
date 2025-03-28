import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type BigInteger = CML.BigInteger;

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
    })
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
 *   const result = BigInteger.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.BigInteger): void =>
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
    })
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
 *   const result = BigInteger.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.BigInteger): Uint8Array =>
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
    })
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
 *   const result = BigInteger.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.BigInteger): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

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
    catch: () => new BigIntegerError({
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
 *   const result = BigInteger.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
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
    })
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
 *   const result = BigInteger.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.BigInteger): string =>
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
    })
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
 *   const result = BigInteger.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.BigInteger): string =>
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
    catch: () => new BigIntegerError({
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
 *   const result = BigInteger.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
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
    })
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
 *   const result = BigInteger.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.BigInteger): string =>
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
    })
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
 *   const result = BigInteger.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.BigInteger): any =>
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
    catch: () => new BigIntegerError({
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
 *   const result = BigInteger.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

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
    catch: () => new BigIntegerError({
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
 *   const result = BigInteger.unsafeFromInt( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.unsafeFromInt failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromInt = (x: CML.Int) =>
  Effect.runSync(fromInt(x));

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
    catch: () => new BigIntegerError({
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
 *   const result = BigInteger.unsafeFromStr( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.unsafeFromStr failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromStr = (s: string) =>
  Effect.runSync(fromStr(s));

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
    })
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
 *   const result = BigInteger.unsafeToStr(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.unsafeToStr failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToStr = (instance: CML.BigInteger): string =>
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
  (instance: CML.BigInteger): Effect.Effect<bigint | undefined, BigIntegerError> =>
    Effect.try({
      try: () => instance.as_u64(),
      catch: () =>
        new BigIntegerError({
          message: `BigInteger.asU64 failed `,
        }),
    })
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
 *   const result = BigInteger.unsafeAsU64(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.unsafeAsU64 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsU64 = (instance: CML.BigInteger): bigint | undefined =>
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
  (instance: CML.BigInteger): Effect.Effect<CML.Int | undefined, BigIntegerError> =>
    Effect.try({
      try: () => instance.as_int(),
      catch: () =>
        new BigIntegerError({
          message: `BigInteger.asInt failed `,
        }),
    })
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
 *   const result = BigInteger.unsafeAsInt(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`BigInteger.unsafeAsInt failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAsInt = (instance: CML.BigInteger): CML.Int | undefined =>
  Effect.runSync(asInt(instance));

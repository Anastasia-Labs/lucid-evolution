/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Rational class
 *
 * @since 2.0.0
 * @category Types
 */
export type Rational = CML.Rational;

/**
 * Error class for Rational operations
 * 
 * This error is thrown when operations on Rational instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class RationalError extends Data.TaggedError("RationalError")<{
  message?: string;
}> {}

/**
 * Method free of Rational
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Rational instance
 * const instance = ... ;
 *   const result = yield* Rational.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Rational): Effect.Effect<void, RationalError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RationalError({
          message: `Rational.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Rational instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Rational.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Rational.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Rational): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Rational
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Rational instance
 * const instance = ... ;
 *   const result = yield* Rational.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Rational): Effect.Effect<Uint8Array, RationalError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new RationalError({
          message: `Rational.toCborBytes failed Rational is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Rational instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Rational.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Rational.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Rational): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Rational
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Rational instance
 * const instance = ... ;
 *   const result = yield* Rational.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Rational): Effect.Effect<Uint8Array, RationalError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new RationalError({
          message: `Rational.toCanonicalCborBytes failed Rational is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Rational instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Rational.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Rational.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Rational): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Rational
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Rational.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Rational.from_cbor_bytes(cborBytes),
    catch: () => new RationalError({
      message: `Rational.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Rational.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Rational.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Rational.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Rational
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Rational instance
 * const instance = ... ;
 *   const result = yield* Rational.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Rational): Effect.Effect<string, RationalError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new RationalError({
          message: `Rational.toCborHex failed Rational is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Rational instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Rational.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Rational.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Rational): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Rational
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Rational instance
 * const instance = ... ;
 *   const result = yield* Rational.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Rational): Effect.Effect<string, RationalError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new RationalError({
          message: `Rational.toCanonicalCborHex failed Rational is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Rational instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Rational.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Rational.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Rational): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Rational
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Rational.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Rational.from_cbor_hex(cborBytes),
    catch: () => new RationalError({
      message: `Rational.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls Rational.fromCborHex without Effect wrapper
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Rational.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Rational.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Rational
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Rational instance
 * const instance = ... ;
 *   const result = yield* Rational.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Rational): Effect.Effect<string, RationalError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new RationalError({
          message: `Rational.toJson failed Rational is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Rational instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Rational.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Rational.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Rational): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Rational
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Rational instance
 * const instance = ... ;
 *   const result = yield* Rational.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Rational): Effect.Effect<any, RationalError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new RationalError({
          message: `Rational.toJsValue failed Rational is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Rational instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Rational.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Rational.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Rational): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Rational
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Rational.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Rational.from_json(json),
    catch: () => new RationalError({
      message: `Rational.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Rational.fromJson without Effect wrapper
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Rational.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Rational.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method numerator of Rational
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Rational instance
 * const instance = ... ;
 *   const result = yield* Rational.numerator(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const numerator = Effect.fn(
  (instance: CML.Rational): Effect.Effect<bigint, RationalError> =>
    Effect.try({
      try: () => instance.numerator(),
      catch: () =>
        new RationalError({
          message: `Rational.numerator failed `,
        }),
    })
);

/**
 * Unsafely calls instance.numerator without Effect wrapper
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Rational instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Rational.numeratorUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Rational.numeratorUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const numeratorUnsafe = (instance: CML.Rational): bigint =>
  Effect.runSync(numerator(instance));

/**
 * Method denominator of Rational
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Rational instance
 * const instance = ... ;
 *   const result = yield* Rational.denominator(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const denominator = Effect.fn(
  (instance: CML.Rational): Effect.Effect<bigint, RationalError> =>
    Effect.try({
      try: () => instance.denominator(),
      catch: () =>
        new RationalError({
          message: `Rational.denominator failed `,
        }),
    })
);

/**
 * Unsafely calls instance.denominator without Effect wrapper
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Rational instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Rational.denominatorUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Rational.denominatorUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const denominatorUnsafe = (instance: CML.Rational): bigint =>
  Effect.runSync(denominator(instance));

/**
 * Static method _new of Rational
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Rational._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (numerator: bigint, denominator: bigint) {
  return yield* Effect.try({
    try: () => CML.Rational.new(numerator, denominator),
    catch: () => new RationalError({
      message: `Rational._new failed with parameters: ${numerator}, ${denominator}. `,
    }),
  });
});

/**
 * Unsafely calls Rational._new without Effect wrapper
 * 
 * @example
 * import { Rational } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Rational._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Rational._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (numerator: bigint, denominator: bigint) =>
  Effect.runSync(_new(numerator, denominator));

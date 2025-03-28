import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ExUnitPrices = CML.ExUnitPrices;

export class ExUnitPricesError extends Data.TaggedError("ExUnitPricesError")<{
  message?: string;
}> {}

/**
 * Method free of ExUnitPrices
 *
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *   const result = yield* ExUnitPrices.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ExUnitPrices): Effect.Effect<void, ExUnitPricesError> =>
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
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnitPrices.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnitPrices.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ExUnitPrices): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ExUnitPrices
 *
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *   const result = yield* ExUnitPrices.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.ExUnitPrices): Effect.Effect<Uint8Array, ExUnitPricesError> =>
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
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnitPrices.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnitPrices.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.ExUnitPrices): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ExUnitPrices
 *
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *   const result = yield* ExUnitPrices.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.ExUnitPrices): Effect.Effect<Uint8Array, ExUnitPricesError> =>
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
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnitPrices.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnitPrices.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.ExUnitPrices,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ExUnitPrices
 *
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ExUnitPrices.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
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
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnitPrices.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnitPrices.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ExUnitPrices
 *
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *   const result = yield* ExUnitPrices.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.ExUnitPrices): Effect.Effect<string, ExUnitPricesError> =>
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
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnitPrices.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnitPrices.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.ExUnitPrices): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ExUnitPrices
 *
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *   const result = yield* ExUnitPrices.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.ExUnitPrices): Effect.Effect<string, ExUnitPricesError> =>
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
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnitPrices.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnitPrices.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.ExUnitPrices): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ExUnitPrices
 *
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ExUnitPrices.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
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
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnitPrices.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnitPrices.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ExUnitPrices
 *
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *   const result = yield* ExUnitPrices.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.ExUnitPrices): Effect.Effect<string, ExUnitPricesError> =>
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
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnitPrices.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnitPrices.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.ExUnitPrices): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ExUnitPrices
 *
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *   const result = yield* ExUnitPrices.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.ExUnitPrices): Effect.Effect<any, ExUnitPricesError> =>
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
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnitPrices.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnitPrices.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.ExUnitPrices): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ExUnitPrices
 *
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ExUnitPrices.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
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
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnitPrices.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnitPrices.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method memPrice of ExUnitPrices
 *
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *   const result = yield* ExUnitPrices.memPrice(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const memPrice = Effect.fn(
  (
    instance: CML.ExUnitPrices,
  ): Effect.Effect<CML.Rational, ExUnitPricesError> =>
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
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnitPrices.unsafeMemPrice(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnitPrices.unsafeMemPrice failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeMemPrice = (instance: CML.ExUnitPrices): CML.Rational =>
  Effect.runSync(memPrice(instance));

/**
 * Method stepPrice of ExUnitPrices
 *
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *   const result = yield* ExUnitPrices.stepPrice(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const stepPrice = Effect.fn(
  (
    instance: CML.ExUnitPrices,
  ): Effect.Effect<CML.Rational, ExUnitPricesError> =>
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
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ExUnitPrices instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnitPrices.unsafeStepPrice(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnitPrices.unsafeStepPrice failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeStepPrice = (instance: CML.ExUnitPrices): CML.Rational =>
  Effect.runSync(stepPrice(instance));

/**
 * Static method _new of ExUnitPrices
 *
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ExUnitPrices._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
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
 * @example
 * import { ExUnitPrices } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ExUnitPrices.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ExUnitPrices.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (memPrice: CML.Rational, stepPrice: CML.Rational) =>
  Effect.runSync(_new(memPrice, stepPrice));

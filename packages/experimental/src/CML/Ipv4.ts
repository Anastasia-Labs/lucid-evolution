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
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ipv4 instance
 * const instance = ... ;
 *   const result = yield* Ipv4.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Ipv4): Effect.Effect<void, Ipv4Error> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new Ipv4Error({
          message: `Ipv4.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ipv4 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv4.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Ipv4): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Ipv4
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ipv4 instance
 * const instance = ... ;
 *   const result = yield* Ipv4.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Ipv4): Effect.Effect<Uint8Array, Ipv4Error> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new Ipv4Error({
          message: `Ipv4.toCborBytes failed Ipv4 is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ipv4 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv4.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Ipv4): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Ipv4
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ipv4 instance
 * const instance = ... ;
 *   const result = yield* Ipv4.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Ipv4): Effect.Effect<Uint8Array, Ipv4Error> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new Ipv4Error({
          message: `Ipv4.toCanonicalCborBytes failed Ipv4 is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ipv4 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv4.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Ipv4): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Ipv4
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Ipv4.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Ipv4.from_cbor_bytes(cborBytes),
    catch: () => new Ipv4Error({
      message: `Ipv4.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Ipv4.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv4.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Ipv4
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ipv4 instance
 * const instance = ... ;
 *   const result = yield* Ipv4.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Ipv4): Effect.Effect<string, Ipv4Error> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new Ipv4Error({
          message: `Ipv4.toCborHex failed Ipv4 is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ipv4 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv4.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Ipv4): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Ipv4
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ipv4 instance
 * const instance = ... ;
 *   const result = yield* Ipv4.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Ipv4): Effect.Effect<string, Ipv4Error> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new Ipv4Error({
          message: `Ipv4.toCanonicalCborHex failed Ipv4 is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ipv4 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv4.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Ipv4): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Ipv4
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Ipv4.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Ipv4.from_cbor_hex(cborBytes),
    catch: () => new Ipv4Error({
      message: `Ipv4.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls Ipv4.fromCborHex without Effect wrapper
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv4.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Ipv4
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ipv4 instance
 * const instance = ... ;
 *   const result = yield* Ipv4.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Ipv4): Effect.Effect<string, Ipv4Error> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new Ipv4Error({
          message: `Ipv4.toJson failed Ipv4 is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ipv4 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv4.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Ipv4): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Ipv4
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ipv4 instance
 * const instance = ... ;
 *   const result = yield* Ipv4.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Ipv4): Effect.Effect<any, Ipv4Error> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new Ipv4Error({
          message: `Ipv4.toJsValue failed Ipv4 is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ipv4 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv4.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Ipv4): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Ipv4
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Ipv4.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Ipv4.from_json(json),
    catch: () => new Ipv4Error({
      message: `Ipv4.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Ipv4.fromJson without Effect wrapper
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv4.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method get of Ipv4
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ipv4 instance
 * const instance = ... ;
 *   const result = yield* Ipv4.get(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.Ipv4): Effect.Effect<Uint8Array, Ipv4Error> =>
    Effect.try({
      try: () => instance.get(),
      catch: () =>
        new Ipv4Error({
          message: `Ipv4.get failed `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { Ipv4 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ipv4 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv4.getUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.getUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.Ipv4): Uint8Array =>
  Effect.runSync(get(instance));

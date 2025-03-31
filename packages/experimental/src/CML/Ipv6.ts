/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Ipv6 class
 *
 * @since 2.0.0
 * @category Types
 */
export type Ipv6 = CML.Ipv6;

/**
 * Error class for Ipv6 operations
 * 
 * This error is thrown when operations on Ipv6 instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class Ipv6Error extends Data.TaggedError("Ipv6Error")<{
  message?: string;
}> {}

/**
 * Method free of Ipv6
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ipv6 instance
 * const instance = ... ;
 *   const result = yield* Ipv6.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Ipv6): Effect.Effect<void, Ipv6Error> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new Ipv6Error({
          message: `Ipv6.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ipv6 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv6.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.Ipv6): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Ipv6
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ipv6 instance
 * const instance = ... ;
 *   const result = yield* Ipv6.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Ipv6): Effect.Effect<Uint8Array, Ipv6Error> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new Ipv6Error({
          message: `Ipv6.toCborBytes failed Ipv6 is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ipv6 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv6.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.Ipv6): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Ipv6
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ipv6 instance
 * const instance = ... ;
 *   const result = yield* Ipv6.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Ipv6): Effect.Effect<Uint8Array, Ipv6Error> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new Ipv6Error({
          message: `Ipv6.toCanonicalCborBytes failed Ipv6 is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ipv6 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv6.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.Ipv6): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Ipv6
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Ipv6.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Ipv6.from_cbor_bytes(cborBytes),
    catch: () => new Ipv6Error({
      message: `Ipv6.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Ipv6.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv6.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Ipv6
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ipv6 instance
 * const instance = ... ;
 *   const result = yield* Ipv6.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Ipv6): Effect.Effect<string, Ipv6Error> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new Ipv6Error({
          message: `Ipv6.toCborHex failed Ipv6 is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ipv6 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv6.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.Ipv6): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Ipv6
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ipv6 instance
 * const instance = ... ;
 *   const result = yield* Ipv6.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Ipv6): Effect.Effect<string, Ipv6Error> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new Ipv6Error({
          message: `Ipv6.toCanonicalCborHex failed Ipv6 is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ipv6 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv6.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.Ipv6): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Ipv6
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Ipv6.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Ipv6.from_cbor_hex(cborBytes),
    catch: () => new Ipv6Error({
      message: `Ipv6.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls Ipv6.fromCborHex without Effect wrapper
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv6.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Ipv6
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ipv6 instance
 * const instance = ... ;
 *   const result = yield* Ipv6.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Ipv6): Effect.Effect<string, Ipv6Error> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new Ipv6Error({
          message: `Ipv6.toJson failed Ipv6 is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ipv6 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv6.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.Ipv6): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Ipv6
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ipv6 instance
 * const instance = ... ;
 *   const result = yield* Ipv6.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Ipv6): Effect.Effect<any, Ipv6Error> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new Ipv6Error({
          message: `Ipv6.toJsValue failed Ipv6 is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ipv6 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv6.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.Ipv6): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Ipv6
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Ipv6.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Ipv6.from_json(json),
    catch: () => new Ipv6Error({
      message: `Ipv6.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Ipv6.fromJson without Effect wrapper
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv6.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method get of Ipv6
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ipv6 instance
 * const instance = ... ;
 *   const result = yield* Ipv6.get(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.Ipv6): Effect.Effect<Uint8Array, Ipv6Error> =>
    Effect.try({
      try: () => instance.get(),
      catch: () =>
        new Ipv6Error({
          message: `Ipv6.get failed `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { Ipv6 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Ipv6 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Ipv6.getUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.getUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (instance: CML.Ipv6): Uint8Array =>
  Effect.runSync(get(instance));

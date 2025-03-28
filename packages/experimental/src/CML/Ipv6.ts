import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Ipv6 = CML.Ipv6;

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
    }),
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
 *   const result = Ipv6.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Ipv6): void =>
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
    }),
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
 *   const result = Ipv6.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.Ipv6): Uint8Array =>
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
    }),
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
 *   const result = Ipv6.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.Ipv6): Uint8Array =>
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
    catch: () =>
      new Ipv6Error({
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
 *   const result = Ipv6.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
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
    }),
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
 *   const result = Ipv6.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.Ipv6): string =>
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
    }),
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
 *   const result = Ipv6.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.Ipv6): string =>
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
    catch: () =>
      new Ipv6Error({
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
 *   const result = Ipv6.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
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
    }),
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
 *   const result = Ipv6.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.Ipv6): string =>
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
    }),
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
 *   const result = Ipv6.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.Ipv6): any =>
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
    catch: () =>
      new Ipv6Error({
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
 *   const result = Ipv6.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

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
    }),
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
 *   const result = Ipv6.unsafeGet(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv6.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.Ipv6): Uint8Array =>
  Effect.runSync(get(instance));

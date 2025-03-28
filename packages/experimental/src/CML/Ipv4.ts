import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Ipv4 = CML.Ipv4;

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
 *   const result = Ipv4.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Ipv4): void =>
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
 *   const result = Ipv4.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.Ipv4): Uint8Array =>
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
 *   const result = Ipv4.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.Ipv4): Uint8Array =>
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
 *   const result = Ipv4.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
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
 *   const result = Ipv4.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.Ipv4): string =>
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
 *   const result = Ipv4.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.Ipv4): string =>
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
 *   const result = Ipv4.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
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
 *   const result = Ipv4.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.Ipv4): string =>
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
 *   const result = Ipv4.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.Ipv4): any =>
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
 *   const result = Ipv4.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
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
 *   const result = Ipv4.unsafeGet(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ipv4.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.Ipv4): Uint8Array =>
  Effect.runSync(get(instance));

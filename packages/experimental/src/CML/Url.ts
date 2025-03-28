import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Url = CML.Url;

export class UrlError extends Data.TaggedError("UrlError")<{
  message?: string;
}> {}

/**
 * Method free of Url
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Url instance
 * const instance = ... ;
 *   const result = yield* Url.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Url): Effect.Effect<void, UrlError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new UrlError({
          message: `Url.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Url instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Url.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Url.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Url): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Url
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Url instance
 * const instance = ... ;
 *   const result = yield* Url.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Url): Effect.Effect<Uint8Array, UrlError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new UrlError({
          message: `Url.toCborBytes failed Url is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Url instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Url.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Url.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.Url): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of Url
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Url instance
 * const instance = ... ;
 *   const result = yield* Url.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.Url): Effect.Effect<Uint8Array, UrlError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new UrlError({
          message: `Url.toCanonicalCborBytes failed Url is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Url instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Url.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Url.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.Url): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of Url
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Url.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Url.from_cbor_bytes(cborBytes),
    catch: () => new UrlError({
      message: `Url.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Url.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Url.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Url.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of Url
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Url instance
 * const instance = ... ;
 *   const result = yield* Url.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.Url): Effect.Effect<string, UrlError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new UrlError({
          message: `Url.toCborHex failed Url is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Url instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Url.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Url.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.Url): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of Url
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Url instance
 * const instance = ... ;
 *   const result = yield* Url.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.Url): Effect.Effect<string, UrlError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new UrlError({
          message: `Url.toCanonicalCborHex failed Url is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Url instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Url.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Url.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.Url): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of Url
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Url.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.Url.from_cbor_hex(cborBytes),
    catch: () => new UrlError({
      message: `Url.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls Url.fromCborHex without Effect wrapper
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Url.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Url.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of Url
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Url instance
 * const instance = ... ;
 *   const result = yield* Url.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Url): Effect.Effect<string, UrlError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new UrlError({
          message: `Url.toJson failed Url is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Url instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Url.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Url.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.Url): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of Url
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Url instance
 * const instance = ... ;
 *   const result = yield* Url.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.Url): Effect.Effect<any, UrlError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new UrlError({
          message: `Url.toJsValue failed Url is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Url instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Url.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Url.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.Url): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of Url
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Url.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Url.from_json(json),
    catch: () => new UrlError({
      message: `Url.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Url.fromJson without Effect wrapper
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Url.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Url.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method get of Url
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Url instance
 * const instance = ... ;
 *   const result = yield* Url.get(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.Url): Effect.Effect<string, UrlError> =>
    Effect.try({
      try: () => instance.get(),
      catch: () =>
        new UrlError({
          message: `Url.get failed `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Url instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Url.unsafeGet(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Url.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.Url): string =>
  Effect.runSync(get(instance));

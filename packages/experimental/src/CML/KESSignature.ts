import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type KESSignature = CML.KESSignature;

export class KESSignatureError extends Data.TaggedError("KESSignatureError")<{
  message?: string;
}> {}

/**
 * Method free of KESSignature
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a KESSignature instance
 * const instance = ... ;
 *   const result = yield* KESSignature.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.KESSignature): Effect.Effect<void, KESSignatureError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new KESSignatureError({
          message: `KESSignature.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 *
 * // Assume we have a KESSignature instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESSignature.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESSignature.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.KESSignature): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of KESSignature
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a KESSignature instance
 * const instance = ... ;
 *   const result = yield* KESSignature.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.KESSignature): Effect.Effect<Uint8Array, KESSignatureError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new KESSignatureError({
          message: `KESSignature.toCborBytes failed KESSignature is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 *
 * // Assume we have a KESSignature instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESSignature.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESSignature.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.KESSignature): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of KESSignature
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a KESSignature instance
 * const instance = ... ;
 *   const result = yield* KESSignature.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.KESSignature): Effect.Effect<Uint8Array, KESSignatureError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new KESSignatureError({
          message: `KESSignature.toCanonicalCborBytes failed KESSignature is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 *
 * // Assume we have a KESSignature instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESSignature.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESSignature.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.KESSignature,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of KESSignature
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* KESSignature.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.KESSignature.from_cbor_bytes(cborBytes),
    catch: () =>
      new KESSignatureError({
        message: `KESSignature.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls KESSignature.fromCborBytes without Effect wrapper
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESSignature.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESSignature.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of KESSignature
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a KESSignature instance
 * const instance = ... ;
 *   const result = yield* KESSignature.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.KESSignature): Effect.Effect<string, KESSignatureError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new KESSignatureError({
          message: `KESSignature.toCborHex failed KESSignature is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 *
 * // Assume we have a KESSignature instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESSignature.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESSignature.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.KESSignature): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of KESSignature
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a KESSignature instance
 * const instance = ... ;
 *   const result = yield* KESSignature.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.KESSignature): Effect.Effect<string, KESSignatureError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new KESSignatureError({
          message: `KESSignature.toCanonicalCborHex failed KESSignature is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 *
 * // Assume we have a KESSignature instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESSignature.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESSignature.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.KESSignature): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of KESSignature
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* KESSignature.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.KESSignature.from_cbor_hex(cborBytes),
    catch: () =>
      new KESSignatureError({
        message: `KESSignature.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls KESSignature.fromCborHex without Effect wrapper
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESSignature.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESSignature.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of KESSignature
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a KESSignature instance
 * const instance = ... ;
 *   const result = yield* KESSignature.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.KESSignature): Effect.Effect<string, KESSignatureError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new KESSignatureError({
          message: `KESSignature.toJson failed KESSignature is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 *
 * // Assume we have a KESSignature instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESSignature.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESSignature.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.KESSignature): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of KESSignature
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a KESSignature instance
 * const instance = ... ;
 *   const result = yield* KESSignature.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.KESSignature): Effect.Effect<any, KESSignatureError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new KESSignatureError({
          message: `KESSignature.toJsValue failed KESSignature is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 *
 * // Assume we have a KESSignature instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESSignature.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESSignature.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.KESSignature): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of KESSignature
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* KESSignature.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.KESSignature.from_json(json),
    catch: () =>
      new KESSignatureError({
        message: `KESSignature.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls KESSignature.fromJson without Effect wrapper
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESSignature.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESSignature.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method get of KESSignature
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a KESSignature instance
 * const instance = ... ;
 *   const result = yield* KESSignature.get(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.KESSignature): Effect.Effect<Uint8Array, KESSignatureError> =>
    Effect.try({
      try: () => instance.get(),
      catch: () =>
        new KESSignatureError({
          message: `KESSignature.get failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @example
 * import { KESSignature } from "@lucid-evolution/experimental";
 *
 * // Assume we have a KESSignature instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESSignature.unsafeGet(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESSignature.unsafeGet failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.KESSignature): Uint8Array =>
  Effect.runSync(get(instance));

import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type RedeemerKey = CML.RedeemerKey;

export class RedeemerKeyError extends Data.TaggedError("RedeemerKeyError")<{
  message?: string;
}> {}

/**
 * Method free of RedeemerKey
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 *   const result = yield* RedeemerKey.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.RedeemerKey): Effect.Effect<void, RedeemerKeyError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerKey.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerKey.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.RedeemerKey): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of RedeemerKey
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 *   const result = yield* RedeemerKey.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.RedeemerKey): Effect.Effect<Uint8Array, RedeemerKeyError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.toCborBytes failed RedeemerKey is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerKey.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerKey.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.RedeemerKey): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of RedeemerKey
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 *   const result = yield* RedeemerKey.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.RedeemerKey): Effect.Effect<Uint8Array, RedeemerKeyError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.toCanonicalCborBytes failed RedeemerKey is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerKey.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerKey.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.RedeemerKey): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of RedeemerKey
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* RedeemerKey.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.RedeemerKey.from_cbor_bytes(cborBytes),
    catch: () => new RedeemerKeyError({
      message: `RedeemerKey.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls RedeemerKey.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerKey.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerKey.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of RedeemerKey
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 *   const result = yield* RedeemerKey.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.RedeemerKey): Effect.Effect<string, RedeemerKeyError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.toCborHex failed RedeemerKey is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerKey.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerKey.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.RedeemerKey): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of RedeemerKey
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 *   const result = yield* RedeemerKey.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.RedeemerKey): Effect.Effect<string, RedeemerKeyError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.toCanonicalCborHex failed RedeemerKey is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerKey.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerKey.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.RedeemerKey): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of RedeemerKey
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* RedeemerKey.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.RedeemerKey.from_cbor_hex(cborBytes),
    catch: () => new RedeemerKeyError({
      message: `RedeemerKey.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls RedeemerKey.fromCborHex without Effect wrapper
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerKey.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerKey.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of RedeemerKey
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 *   const result = yield* RedeemerKey.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.RedeemerKey): Effect.Effect<string, RedeemerKeyError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.toJson failed RedeemerKey is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerKey.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerKey.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.RedeemerKey): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of RedeemerKey
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 *   const result = yield* RedeemerKey.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.RedeemerKey): Effect.Effect<any, RedeemerKeyError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.toJsValue failed RedeemerKey is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerKey.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerKey.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.RedeemerKey): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of RedeemerKey
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* RedeemerKey.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.RedeemerKey.from_json(json),
    catch: () => new RedeemerKeyError({
      message: `RedeemerKey.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls RedeemerKey.fromJson without Effect wrapper
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerKey.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerKey.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method tag of RedeemerKey
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 *   const result = yield* RedeemerKey.tag(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const tag = Effect.fn(
  (instance: CML.RedeemerKey): Effect.Effect<CML.RedeemerTag, RedeemerKeyError> =>
    Effect.try({
      try: () => instance.tag(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.tag failed `,
        }),
    })
);

/**
 * Unsafely calls instance.tag without Effect wrapper
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerKey.unsafeTag(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerKey.unsafeTag failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeTag = (instance: CML.RedeemerKey): CML.RedeemerTag =>
  Effect.runSync(tag(instance));

/**
 * Method index of RedeemerKey
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 *   const result = yield* RedeemerKey.index(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const index = Effect.fn(
  (instance: CML.RedeemerKey): Effect.Effect<bigint, RedeemerKeyError> =>
    Effect.try({
      try: () => instance.index(),
      catch: () =>
        new RedeemerKeyError({
          message: `RedeemerKey.index failed `,
        }),
    })
);

/**
 * Unsafely calls instance.index without Effect wrapper
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a RedeemerKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerKey.unsafeIndex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerKey.unsafeIndex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeIndex = (instance: CML.RedeemerKey): bigint =>
  Effect.runSync(index(instance));

/**
 * Static method _new of RedeemerKey
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* RedeemerKey._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (tag: CML.RedeemerTag, index: bigint) {
  return yield* Effect.try({
    try: () => CML.RedeemerKey.new(tag, index),
    catch: () => new RedeemerKeyError({
      message: `RedeemerKey._new failed with parameters: ${tag} (RedeemerTag), ${index}. `,
    }),
  });
});

/**
 * Unsafely calls RedeemerKey._new without Effect wrapper
 * 
 * @example
 * import { RedeemerKey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = RedeemerKey.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`RedeemerKey.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (tag: CML.RedeemerTag, index: bigint) =>
  Effect.runSync(_new(tag, index));

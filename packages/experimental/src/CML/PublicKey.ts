/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PublicKey class
 *
 * @since 2.0.0
 * @category Types
 */
export type PublicKey = CML.PublicKey;

/**
 * Error class for PublicKey operations
 * 
 * This error is thrown when operations on PublicKey instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PublicKeyError extends Data.TaggedError("PublicKeyError")<{
  message?: string;
}> {}

/**
 * Method free of PublicKey
 * 
 * @example
 * import { PublicKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PublicKey instance
 * const instance = ... ;
 *   const result = yield* PublicKey.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PublicKey): Effect.Effect<void, PublicKeyError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PublicKeyError({
          message: `PublicKey.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { PublicKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PublicKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PublicKey.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PublicKey.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PublicKey): void =>
  Effect.runSync(free(instance));

/**
 * Static method fromBech32 of PublicKey
 * 
 * @example
 * import { PublicKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PublicKey.fromBech32( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.PublicKey.from_bech32(bech32Str),
    catch: () => new PublicKeyError({
      message: `PublicKey.fromBech32 failed with parameters: ${bech32Str}. `,
    }),
  });
});

/**
 * Unsafely calls PublicKey.fromBech32 without Effect wrapper
 * 
 * @example
 * import { PublicKey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PublicKey.fromBech32Unsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PublicKey.fromBech32Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toBech32 of PublicKey
 * 
 * @example
 * import { PublicKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PublicKey instance
 * const instance = ... ;
 *   const result = yield* PublicKey.toBech32(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (instance: CML.PublicKey): Effect.Effect<string, PublicKeyError> =>
    Effect.try({
      try: () => instance.to_bech32(),
      catch: () =>
        new PublicKeyError({
          message: `PublicKey.toBech32 failed PublicKey is not valid for string conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 * 
 * @example
 * import { PublicKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PublicKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PublicKey.toBech32Unsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PublicKey.toBech32Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.PublicKey): string =>
  Effect.runSync(toBech32(instance));

/**
 * Method toRawBytes of PublicKey
 * 
 * @example
 * import { PublicKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PublicKey instance
 * const instance = ... ;
 *   const result = yield* PublicKey.toRawBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.PublicKey): Effect.Effect<Uint8Array, PublicKeyError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new PublicKeyError({
          message: `PublicKey.toRawBytes failed PublicKey is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @example
 * import { PublicKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PublicKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PublicKey.toRawBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PublicKey.toRawBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.PublicKey): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromBytes of PublicKey
 * 
 * @example
 * import { PublicKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PublicKey.fromBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PublicKey.from_bytes(bytes),
    catch: () => new PublicKeyError({
      message: `PublicKey.fromBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls PublicKey.fromBytes without Effect wrapper
 * 
 * @example
 * import { PublicKey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PublicKey.fromBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PublicKey.fromBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBytesUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(fromBytes(bytes));

/**
 * Method verify of PublicKey
 * 
 * @example
 * import { PublicKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PublicKey instance
 * const instance = ... ;
 *   const result = yield* PublicKey.verify(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const verify = Effect.fn(
  (instance: CML.PublicKey, data: Uint8Array, signature: CML.Ed25519Signature): Effect.Effect<boolean, PublicKeyError> =>
    Effect.try({
      try: () => instance.verify(data, signature),
      catch: () =>
        new PublicKeyError({
          message: `PublicKey.verify failed with parameters: ${data}, ${signature} (Ed25519Signature). `,
        }),
    })
);

/**
 * Unsafely calls instance.verify without Effect wrapper
 * 
 * @example
 * import { PublicKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PublicKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PublicKey.verifyUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PublicKey.verifyUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const verifyUnsafe = (instance: CML.PublicKey, data: Uint8Array, signature: CML.Ed25519Signature): boolean =>
  Effect.runSync(verify(instance, data, signature));

/**
 * Method hash of PublicKey
 * 
 * @example
 * import { PublicKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PublicKey instance
 * const instance = ... ;
 *   const result = yield* PublicKey.hash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const hash = Effect.fn(
  (instance: CML.PublicKey): Effect.Effect<CML.Ed25519KeyHash, PublicKeyError> =>
    Effect.try({
      try: () => instance.hash(),
      catch: () =>
        new PublicKeyError({
          message: `PublicKey.hash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.hash without Effect wrapper
 * 
 * @example
 * import { PublicKey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PublicKey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PublicKey.hashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PublicKey.hashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hashUnsafe = (instance: CML.PublicKey): CML.Ed25519KeyHash =>
  Effect.runSync(hash(instance));

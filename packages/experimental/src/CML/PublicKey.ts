import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type PublicKey = CML.PublicKey;

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
 *   const result = PublicKey.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PublicKey.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.PublicKey): void =>
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
 *   const result = PublicKey.unsafeFromBech32( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PublicKey.unsafeFromBech32 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromBech32 = (bech32Str: string) =>
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
 *   const result = PublicKey.unsafeToBech32(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PublicKey.unsafeToBech32 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToBech32 = (instance: CML.PublicKey): string =>
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
 *   const result = PublicKey.unsafeToRawBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PublicKey.unsafeToRawBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawBytes = (instance: CML.PublicKey): Uint8Array =>
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
 *   const result = PublicKey.unsafeFromBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PublicKey.unsafeFromBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromBytes = (bytes: Uint8Array) =>
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
 *   const result = PublicKey.unsafeVerify(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PublicKey.unsafeVerify failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeVerify = (instance: CML.PublicKey, data: Uint8Array, signature: CML.Ed25519Signature): boolean =>
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
 *   const result = PublicKey.unsafeHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PublicKey.unsafeHash failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeHash = (instance: CML.PublicKey): CML.Ed25519KeyHash =>
  Effect.runSync(hash(instance));

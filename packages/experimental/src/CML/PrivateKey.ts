/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PrivateKey class
 *
 * @since 2.0.0
 * @category Types
 */
export type PrivateKey = CML.PrivateKey;

/**
 * Error class for PrivateKey operations
 *
 * This error is thrown when operations on PrivateKey instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PrivateKeyError extends Data.TaggedError("PrivateKeyError")<{
  message?: string;
}> {}

/**
 * Method free of PrivateKey
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PrivateKey instance
 * const instance = ... ;
 *   const result = yield* PrivateKey.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PrivateKey): Effect.Effect<void, PrivateKeyError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PrivateKeyError({
          message: `PrivateKey.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PrivateKey instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PrivateKey.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PrivateKey.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PrivateKey): void =>
  Effect.runSync(free(instance));

/**
 * Method toPublic of PrivateKey
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PrivateKey instance
 * const instance = ... ;
 *   const result = yield* PrivateKey.toPublic(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toPublic = Effect.fn(
  (instance: CML.PrivateKey): Effect.Effect<CML.PublicKey, PrivateKeyError> =>
    Effect.try({
      try: () => instance.to_public(),
      catch: () =>
        new PrivateKeyError({
          message: `PrivateKey.toPublic failed PrivateKey is not valid for PublicKey conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toPublic without Effect wrapper
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PrivateKey instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PrivateKey.toPublicUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PrivateKey.toPublicUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toPublicUnsafe = (instance: CML.PrivateKey): CML.PublicKey =>
  Effect.runSync(toPublic(instance));

/**
 * Static method generateEd25519 of PrivateKey
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PrivateKey.generateEd25519();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const generateEd25519 = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.PrivateKey.generate_ed25519(),
    catch: () =>
      new PrivateKeyError({
        message: `PrivateKey.generateEd25519 failed `,
      }),
  });
});

/**
 * Unsafely calls PrivateKey.generateEd25519 without Effect wrapper
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PrivateKey.generateEd25519Unsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PrivateKey.generateEd25519Unsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const generateEd25519Unsafe = () => Effect.runSync(generateEd25519());

/**
 * Static method generateEd25519extended of PrivateKey
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PrivateKey.generateEd25519extended();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const generateEd25519extended = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.PrivateKey.generate_ed25519extended(),
    catch: () =>
      new PrivateKeyError({
        message: `PrivateKey.generateEd25519extended failed `,
      }),
  });
});

/**
 * Unsafely calls PrivateKey.generateEd25519extended without Effect wrapper
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PrivateKey.generateEd25519extendedUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PrivateKey.generateEd25519extendedUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const generateEd25519extendedUnsafe = () =>
  Effect.runSync(generateEd25519extended());

/**
 * Static method fromBech32 of PrivateKey
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PrivateKey.fromBech32( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.PrivateKey.from_bech32(bech32Str),
    catch: () =>
      new PrivateKeyError({
        message: `PrivateKey.fromBech32 failed with parameters: ${bech32Str}. `,
      }),
  });
});

/**
 * Unsafely calls PrivateKey.fromBech32 without Effect wrapper
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PrivateKey.fromBech32Unsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PrivateKey.fromBech32Unsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toBech32 of PrivateKey
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PrivateKey instance
 * const instance = ... ;
 *   const result = yield* PrivateKey.toBech32(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (instance: CML.PrivateKey): Effect.Effect<string, PrivateKeyError> =>
    Effect.try({
      try: () => instance.to_bech32(),
      catch: () =>
        new PrivateKeyError({
          message: `PrivateKey.toBech32 failed PrivateKey is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PrivateKey instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PrivateKey.toBech32Unsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PrivateKey.toBech32Unsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.PrivateKey): string =>
  Effect.runSync(toBech32(instance));

/**
 * Method toRawBytes of PrivateKey
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PrivateKey instance
 * const instance = ... ;
 *   const result = yield* PrivateKey.toRawBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.PrivateKey): Effect.Effect<Uint8Array, PrivateKeyError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new PrivateKeyError({
          message: `PrivateKey.toRawBytes failed PrivateKey is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PrivateKey instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PrivateKey.toRawBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PrivateKey.toRawBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.PrivateKey): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromExtendedBytes of PrivateKey
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PrivateKey.fromExtendedBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromExtendedBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PrivateKey.from_extended_bytes(bytes),
    catch: () =>
      new PrivateKeyError({
        message: `PrivateKey.fromExtendedBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls PrivateKey.fromExtendedBytes without Effect wrapper
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PrivateKey.fromExtendedBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PrivateKey.fromExtendedBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromExtendedBytesUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(fromExtendedBytes(bytes));

/**
 * Static method fromNormalBytes of PrivateKey
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PrivateKey.fromNormalBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromNormalBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PrivateKey.from_normal_bytes(bytes),
    catch: () =>
      new PrivateKeyError({
        message: `PrivateKey.fromNormalBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls PrivateKey.fromNormalBytes without Effect wrapper
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PrivateKey.fromNormalBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PrivateKey.fromNormalBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromNormalBytesUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(fromNormalBytes(bytes));

/**
 * Method sign of PrivateKey
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PrivateKey instance
 * const instance = ... ;
 *   const result = yield* PrivateKey.sign(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const sign = Effect.fn(
  (
    instance: CML.PrivateKey,
    message: Uint8Array,
  ): Effect.Effect<CML.Ed25519Signature, PrivateKeyError> =>
    Effect.try({
      try: () => instance.sign(message),
      catch: () =>
        new PrivateKeyError({
          message: `PrivateKey.sign failed with parameters: ${message}. `,
        }),
    }),
);

/**
 * Unsafely calls instance.sign without Effect wrapper
 *
 * @example
 * import { PrivateKey } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PrivateKey instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PrivateKey.signUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PrivateKey.signUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const signUnsafe = (
  instance: CML.PrivateKey,
  message: Uint8Array,
): CML.Ed25519Signature => Effect.runSync(sign(instance, message));

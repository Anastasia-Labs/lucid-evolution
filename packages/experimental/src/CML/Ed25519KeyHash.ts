import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Ed25519KeyHash = CML.Ed25519KeyHash;

export class Ed25519KeyHashError extends Data.TaggedError(
  "Ed25519KeyHashError",
)<{
  message?: string;
}> {}

/**
 * Method free of Ed25519KeyHash
 *
 * @example
 * import { Ed25519KeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ed25519KeyHash instance
 * const instance = ... ;
 *   const result = yield* Ed25519KeyHash.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Ed25519KeyHash): Effect.Effect<void, Ed25519KeyHashError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new Ed25519KeyHashError({
          message: `Ed25519KeyHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { Ed25519KeyHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Ed25519KeyHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Ed25519KeyHash.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ed25519KeyHash.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Ed25519KeyHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of Ed25519KeyHash
 *
 * @example
 * import { Ed25519KeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ed25519KeyHash instance
 * const instance = ... ;
 *   const result = yield* Ed25519KeyHash.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (
    instance: CML.Ed25519KeyHash,
    prefix: string,
  ): Effect.Effect<string, Ed25519KeyHashError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new Ed25519KeyHashError({
          message: `Ed25519KeyHash.toBech32 failed with parameters: ${prefix}. Ed25519KeyHash is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @example
 * import { Ed25519KeyHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Ed25519KeyHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Ed25519KeyHash.unsafeToBech32(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ed25519KeyHash.unsafeToBech32 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToBech32 = (
  instance: CML.Ed25519KeyHash,
  prefix: string,
): string => Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of Ed25519KeyHash
 *
 * @example
 * import { Ed25519KeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Ed25519KeyHash.fromBech32( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.Ed25519KeyHash.from_bech32(bech32Str),
    catch: () =>
      new Ed25519KeyHashError({
        message: `Ed25519KeyHash.fromBech32 failed with parameters: ${bech32Str}. `,
      }),
  });
});

/**
 * Unsafely calls Ed25519KeyHash.fromBech32 without Effect wrapper
 *
 * @example
 * import { Ed25519KeyHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Ed25519KeyHash.unsafeFromBech32( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ed25519KeyHash.unsafeFromBech32 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromBech32 = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of Ed25519KeyHash
 *
 * @example
 * import { Ed25519KeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ed25519KeyHash instance
 * const instance = ... ;
 *   const result = yield* Ed25519KeyHash.toRawBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (
    instance: CML.Ed25519KeyHash,
  ): Effect.Effect<Uint8Array, Ed25519KeyHashError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new Ed25519KeyHashError({
          message: `Ed25519KeyHash.toRawBytes failed Ed25519KeyHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @example
 * import { Ed25519KeyHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Ed25519KeyHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Ed25519KeyHash.unsafeToRawBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ed25519KeyHash.unsafeToRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawBytes = (instance: CML.Ed25519KeyHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of Ed25519KeyHash
 *
 * @example
 * import { Ed25519KeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Ed25519KeyHash.fromRawBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Ed25519KeyHash.from_raw_bytes(bytes),
    catch: () =>
      new Ed25519KeyHashError({
        message: `Ed25519KeyHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls Ed25519KeyHash.fromRawBytes without Effect wrapper
 *
 * @example
 * import { Ed25519KeyHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Ed25519KeyHash.unsafeFromRawBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ed25519KeyHash.unsafeFromRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromRawBytes = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of Ed25519KeyHash
 *
 * @example
 * import { Ed25519KeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Ed25519KeyHash instance
 * const instance = ... ;
 *   const result = yield* Ed25519KeyHash.toHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.Ed25519KeyHash): Effect.Effect<string, Ed25519KeyHashError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new Ed25519KeyHashError({
          message: `Ed25519KeyHash.toHex failed Ed25519KeyHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @example
 * import { Ed25519KeyHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a Ed25519KeyHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Ed25519KeyHash.unsafeToHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ed25519KeyHash.unsafeToHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToHex = (instance: CML.Ed25519KeyHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of Ed25519KeyHash
 *
 * @example
 * import { Ed25519KeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* Ed25519KeyHash.fromHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.Ed25519KeyHash.from_hex(input),
    catch: () =>
      new Ed25519KeyHashError({
        message: `Ed25519KeyHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
      }),
  });
});

/**
 * Unsafely calls Ed25519KeyHash.fromHex without Effect wrapper
 *
 * @example
 * import { Ed25519KeyHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = Ed25519KeyHash.unsafeFromHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Ed25519KeyHash.unsafeFromHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromHex = (input: string) => Effect.runSync(fromHex(input));

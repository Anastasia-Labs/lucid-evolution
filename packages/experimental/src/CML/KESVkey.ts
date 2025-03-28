import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type KESVkey = CML.KESVkey;

export class KESVkeyError extends Data.TaggedError("KESVkeyError")<{
  message?: string;
}> {}

/**
 * Method free of KESVkey
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a KESVkey instance
 * const instance = ... ;
 *   const result = yield* KESVkey.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.KESVkey): Effect.Effect<void, KESVkeyError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new KESVkeyError({
          message: `KESVkey.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 *
 * // Assume we have a KESVkey instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESVkey.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESVkey.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.KESVkey): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of KESVkey
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a KESVkey instance
 * const instance = ... ;
 *   const result = yield* KESVkey.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (
    instance: CML.KESVkey,
    prefix: string,
  ): Effect.Effect<string, KESVkeyError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new KESVkeyError({
          message: `KESVkey.toBech32 failed with parameters: ${prefix}. KESVkey is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 *
 * // Assume we have a KESVkey instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESVkey.unsafeToBech32(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESVkey.unsafeToBech32 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToBech32 = (instance: CML.KESVkey, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of KESVkey
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* KESVkey.fromBech32( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.KESVkey.from_bech32(bech32Str),
    catch: () =>
      new KESVkeyError({
        message: `KESVkey.fromBech32 failed with parameters: ${bech32Str}. `,
      }),
  });
});

/**
 * Unsafely calls KESVkey.fromBech32 without Effect wrapper
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESVkey.unsafeFromBech32( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESVkey.unsafeFromBech32 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromBech32 = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of KESVkey
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a KESVkey instance
 * const instance = ... ;
 *   const result = yield* KESVkey.toRawBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.KESVkey): Effect.Effect<Uint8Array, KESVkeyError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new KESVkeyError({
          message: `KESVkey.toRawBytes failed KESVkey is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 *
 * // Assume we have a KESVkey instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESVkey.unsafeToRawBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESVkey.unsafeToRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawBytes = (instance: CML.KESVkey): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of KESVkey
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* KESVkey.fromRawBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.KESVkey.from_raw_bytes(bytes),
    catch: () =>
      new KESVkeyError({
        message: `KESVkey.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls KESVkey.fromRawBytes without Effect wrapper
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESVkey.unsafeFromRawBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESVkey.unsafeFromRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromRawBytes = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of KESVkey
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a KESVkey instance
 * const instance = ... ;
 *   const result = yield* KESVkey.toHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.KESVkey): Effect.Effect<string, KESVkeyError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new KESVkeyError({
          message: `KESVkey.toHex failed KESVkey is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 *
 * // Assume we have a KESVkey instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESVkey.unsafeToHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESVkey.unsafeToHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToHex = (instance: CML.KESVkey): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of KESVkey
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* KESVkey.fromHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.KESVkey.from_hex(input),
    catch: () =>
      new KESVkeyError({
        message: `KESVkey.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
      }),
  });
});

/**
 * Unsafely calls KESVkey.fromHex without Effect wrapper
 *
 * @example
 * import { KESVkey } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = KESVkey.unsafeFromHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`KESVkey.unsafeFromHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromHex = (input: string) => Effect.runSync(fromHex(input));

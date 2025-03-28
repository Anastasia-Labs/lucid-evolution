import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type GenesisDelegateHash = CML.GenesisDelegateHash;

export class GenesisDelegateHashError extends Data.TaggedError(
  "GenesisDelegateHashError",
)<{
  message?: string;
}> {}

/**
 * Method free of GenesisDelegateHash
 *
 * @example
 * import { GenesisDelegateHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GenesisDelegateHash instance
 * const instance = ... ;
 *   const result = yield* GenesisDelegateHash.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.GenesisDelegateHash,
  ): Effect.Effect<void, GenesisDelegateHashError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new GenesisDelegateHashError({
          message: `GenesisDelegateHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { GenesisDelegateHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a GenesisDelegateHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GenesisDelegateHash.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GenesisDelegateHash.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.GenesisDelegateHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of GenesisDelegateHash
 *
 * @example
 * import { GenesisDelegateHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GenesisDelegateHash instance
 * const instance = ... ;
 *   const result = yield* GenesisDelegateHash.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (
    instance: CML.GenesisDelegateHash,
    prefix: string,
  ): Effect.Effect<string, GenesisDelegateHashError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new GenesisDelegateHashError({
          message: `GenesisDelegateHash.toBech32 failed with parameters: ${prefix}. GenesisDelegateHash is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @example
 * import { GenesisDelegateHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a GenesisDelegateHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GenesisDelegateHash.unsafeToBech32(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GenesisDelegateHash.unsafeToBech32 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToBech32 = (
  instance: CML.GenesisDelegateHash,
  prefix: string,
): string => Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of GenesisDelegateHash
 *
 * @example
 * import { GenesisDelegateHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* GenesisDelegateHash.fromBech32( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.GenesisDelegateHash.from_bech32(bech32Str),
    catch: () =>
      new GenesisDelegateHashError({
        message: `GenesisDelegateHash.fromBech32 failed with parameters: ${bech32Str}. `,
      }),
  });
});

/**
 * Unsafely calls GenesisDelegateHash.fromBech32 without Effect wrapper
 *
 * @example
 * import { GenesisDelegateHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GenesisDelegateHash.unsafeFromBech32( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GenesisDelegateHash.unsafeFromBech32 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromBech32 = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of GenesisDelegateHash
 *
 * @example
 * import { GenesisDelegateHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GenesisDelegateHash instance
 * const instance = ... ;
 *   const result = yield* GenesisDelegateHash.toRawBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (
    instance: CML.GenesisDelegateHash,
  ): Effect.Effect<Uint8Array, GenesisDelegateHashError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new GenesisDelegateHashError({
          message: `GenesisDelegateHash.toRawBytes failed GenesisDelegateHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @example
 * import { GenesisDelegateHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a GenesisDelegateHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GenesisDelegateHash.unsafeToRawBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GenesisDelegateHash.unsafeToRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawBytes = (
  instance: CML.GenesisDelegateHash,
): Uint8Array => Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of GenesisDelegateHash
 *
 * @example
 * import { GenesisDelegateHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* GenesisDelegateHash.fromRawBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.GenesisDelegateHash.from_raw_bytes(bytes),
    catch: () =>
      new GenesisDelegateHashError({
        message: `GenesisDelegateHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls GenesisDelegateHash.fromRawBytes without Effect wrapper
 *
 * @example
 * import { GenesisDelegateHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GenesisDelegateHash.unsafeFromRawBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GenesisDelegateHash.unsafeFromRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromRawBytes = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of GenesisDelegateHash
 *
 * @example
 * import { GenesisDelegateHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GenesisDelegateHash instance
 * const instance = ... ;
 *   const result = yield* GenesisDelegateHash.toHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (
    instance: CML.GenesisDelegateHash,
  ): Effect.Effect<string, GenesisDelegateHashError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new GenesisDelegateHashError({
          message: `GenesisDelegateHash.toHex failed GenesisDelegateHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @example
 * import { GenesisDelegateHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a GenesisDelegateHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GenesisDelegateHash.unsafeToHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GenesisDelegateHash.unsafeToHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToHex = (instance: CML.GenesisDelegateHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of GenesisDelegateHash
 *
 * @example
 * import { GenesisDelegateHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* GenesisDelegateHash.fromHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.GenesisDelegateHash.from_hex(input),
    catch: () =>
      new GenesisDelegateHashError({
        message: `GenesisDelegateHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
      }),
  });
});

/**
 * Unsafely calls GenesisDelegateHash.fromHex without Effect wrapper
 *
 * @example
 * import { GenesisDelegateHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = GenesisDelegateHash.unsafeFromHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GenesisDelegateHash.unsafeFromHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromHex = (input: string) => Effect.runSync(fromHex(input));

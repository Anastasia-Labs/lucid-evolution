import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type TransactionHash = CML.TransactionHash;

export class TransactionHashError extends Data.TaggedError(
  "TransactionHashError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionHash
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionHash instance
 * const instance = ... ;
 *   const result = yield* TransactionHash.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.TransactionHash): Effect.Effect<void, TransactionHashError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionHashError({
          message: `TransactionHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionHash.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionHash.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.TransactionHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of TransactionHash
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionHash instance
 * const instance = ... ;
 *   const result = yield* TransactionHash.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (
    instance: CML.TransactionHash,
    prefix: string,
  ): Effect.Effect<string, TransactionHashError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new TransactionHashError({
          message: `TransactionHash.toBech32 failed with parameters: ${prefix}. TransactionHash is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionHash.unsafeToBech32(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionHash.unsafeToBech32 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToBech32 = (
  instance: CML.TransactionHash,
  prefix: string,
): string => Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of TransactionHash
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionHash.fromBech32( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.TransactionHash.from_bech32(bech32Str),
    catch: () =>
      new TransactionHashError({
        message: `TransactionHash.fromBech32 failed with parameters: ${bech32Str}. `,
      }),
  });
});

/**
 * Unsafely calls TransactionHash.fromBech32 without Effect wrapper
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionHash.unsafeFromBech32( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionHash.unsafeFromBech32 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromBech32 = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of TransactionHash
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionHash instance
 * const instance = ... ;
 *   const result = yield* TransactionHash.toRawBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (
    instance: CML.TransactionHash,
  ): Effect.Effect<Uint8Array, TransactionHashError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new TransactionHashError({
          message: `TransactionHash.toRawBytes failed TransactionHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionHash.unsafeToRawBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionHash.unsafeToRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawBytes = (instance: CML.TransactionHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of TransactionHash
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionHash.fromRawBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.TransactionHash.from_raw_bytes(bytes),
    catch: () =>
      new TransactionHashError({
        message: `TransactionHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls TransactionHash.fromRawBytes without Effect wrapper
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionHash.unsafeFromRawBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionHash.unsafeFromRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromRawBytes = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of TransactionHash
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionHash instance
 * const instance = ... ;
 *   const result = yield* TransactionHash.toHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (
    instance: CML.TransactionHash,
  ): Effect.Effect<string, TransactionHashError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new TransactionHashError({
          message: `TransactionHash.toHex failed TransactionHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionHash.unsafeToHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionHash.unsafeToHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToHex = (instance: CML.TransactionHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of TransactionHash
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionHash.fromHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.TransactionHash.from_hex(input),
    catch: () =>
      new TransactionHashError({
        message: `TransactionHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
      }),
  });
});

/**
 * Unsafely calls TransactionHash.fromHex without Effect wrapper
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionHash.unsafeFromHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionHash.unsafeFromHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromHex = (input: string) => Effect.runSync(fromHex(input));

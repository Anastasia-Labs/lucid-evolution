import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type PoolMetadataHash = CML.PoolMetadataHash;

export class PoolMetadataHashError extends Data.TaggedError(
  "PoolMetadataHashError",
)<{
  message?: string;
}> {}

/**
 * Method free of PoolMetadataHash
 *
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadataHash instance
 * const instance = ... ;
 *   const result = yield* PoolMetadataHash.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.PoolMetadataHash,
  ): Effect.Effect<void, PoolMetadataHashError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PoolMetadataHashError({
          message: `PoolMetadataHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PoolMetadataHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadataHash.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadataHash.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.PoolMetadataHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of PoolMetadataHash
 *
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadataHash instance
 * const instance = ... ;
 *   const result = yield* PoolMetadataHash.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (
    instance: CML.PoolMetadataHash,
    prefix: string,
  ): Effect.Effect<string, PoolMetadataHashError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new PoolMetadataHashError({
          message: `PoolMetadataHash.toBech32 failed with parameters: ${prefix}. PoolMetadataHash is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PoolMetadataHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadataHash.unsafeToBech32(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadataHash.unsafeToBech32 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToBech32 = (
  instance: CML.PoolMetadataHash,
  prefix: string,
): string => Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of PoolMetadataHash
 *
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PoolMetadataHash.fromBech32( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.PoolMetadataHash.from_bech32(bech32Str),
    catch: () =>
      new PoolMetadataHashError({
        message: `PoolMetadataHash.fromBech32 failed with parameters: ${bech32Str}. `,
      }),
  });
});

/**
 * Unsafely calls PoolMetadataHash.fromBech32 without Effect wrapper
 *
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadataHash.unsafeFromBech32( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadataHash.unsafeFromBech32 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromBech32 = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of PoolMetadataHash
 *
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadataHash instance
 * const instance = ... ;
 *   const result = yield* PoolMetadataHash.toRawBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (
    instance: CML.PoolMetadataHash,
  ): Effect.Effect<Uint8Array, PoolMetadataHashError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new PoolMetadataHashError({
          message: `PoolMetadataHash.toRawBytes failed PoolMetadataHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PoolMetadataHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadataHash.unsafeToRawBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadataHash.unsafeToRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawBytes = (instance: CML.PoolMetadataHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of PoolMetadataHash
 *
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PoolMetadataHash.fromRawBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PoolMetadataHash.from_raw_bytes(bytes),
    catch: () =>
      new PoolMetadataHashError({
        message: `PoolMetadataHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls PoolMetadataHash.fromRawBytes without Effect wrapper
 *
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadataHash.unsafeFromRawBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadataHash.unsafeFromRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromRawBytes = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of PoolMetadataHash
 *
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PoolMetadataHash instance
 * const instance = ... ;
 *   const result = yield* PoolMetadataHash.toHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (
    instance: CML.PoolMetadataHash,
  ): Effect.Effect<string, PoolMetadataHashError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new PoolMetadataHashError({
          message: `PoolMetadataHash.toHex failed PoolMetadataHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PoolMetadataHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadataHash.unsafeToHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadataHash.unsafeToHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToHex = (instance: CML.PoolMetadataHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of PoolMetadataHash
 *
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PoolMetadataHash.fromHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.PoolMetadataHash.from_hex(input),
    catch: () =>
      new PoolMetadataHashError({
        message: `PoolMetadataHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
      }),
  });
});

/**
 * Unsafely calls PoolMetadataHash.fromHex without Effect wrapper
 *
 * @example
 * import { PoolMetadataHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PoolMetadataHash.unsafeFromHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PoolMetadataHash.unsafeFromHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromHex = (input: string) => Effect.runSync(fromHex(input));

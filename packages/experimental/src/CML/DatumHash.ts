import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type DatumHash = CML.DatumHash;

export class DatumHashError extends Data.TaggedError("DatumHashError")<{
  message?: string;
}> {}

/**
 * Method free of DatumHash
 *
 * @example
 * import { DatumHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DatumHash instance
 * const instance = ... ;
 *   const result = yield* DatumHash.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.DatumHash): Effect.Effect<void, DatumHashError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new DatumHashError({
          message: `DatumHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { DatumHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DatumHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DatumHash.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumHash.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.DatumHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of DatumHash
 *
 * @example
 * import { DatumHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DatumHash instance
 * const instance = ... ;
 *   const result = yield* DatumHash.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (
    instance: CML.DatumHash,
    prefix: string,
  ): Effect.Effect<string, DatumHashError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new DatumHashError({
          message: `DatumHash.toBech32 failed with parameters: ${prefix}. DatumHash is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @example
 * import { DatumHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DatumHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DatumHash.unsafeToBech32(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumHash.unsafeToBech32 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToBech32 = (
  instance: CML.DatumHash,
  prefix: string,
): string => Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of DatumHash
 *
 * @example
 * import { DatumHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* DatumHash.fromBech32( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.DatumHash.from_bech32(bech32Str),
    catch: () =>
      new DatumHashError({
        message: `DatumHash.fromBech32 failed with parameters: ${bech32Str}. `,
      }),
  });
});

/**
 * Unsafely calls DatumHash.fromBech32 without Effect wrapper
 *
 * @example
 * import { DatumHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DatumHash.unsafeFromBech32( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumHash.unsafeFromBech32 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromBech32 = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of DatumHash
 *
 * @example
 * import { DatumHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DatumHash instance
 * const instance = ... ;
 *   const result = yield* DatumHash.toRawBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.DatumHash): Effect.Effect<Uint8Array, DatumHashError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new DatumHashError({
          message: `DatumHash.toRawBytes failed DatumHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @example
 * import { DatumHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DatumHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DatumHash.unsafeToRawBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumHash.unsafeToRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawBytes = (instance: CML.DatumHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of DatumHash
 *
 * @example
 * import { DatumHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* DatumHash.fromRawBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.DatumHash.from_raw_bytes(bytes),
    catch: () =>
      new DatumHashError({
        message: `DatumHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls DatumHash.fromRawBytes without Effect wrapper
 *
 * @example
 * import { DatumHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DatumHash.unsafeFromRawBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumHash.unsafeFromRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromRawBytes = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of DatumHash
 *
 * @example
 * import { DatumHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a DatumHash instance
 * const instance = ... ;
 *   const result = yield* DatumHash.toHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.DatumHash): Effect.Effect<string, DatumHashError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new DatumHashError({
          message: `DatumHash.toHex failed DatumHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @example
 * import { DatumHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a DatumHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DatumHash.unsafeToHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumHash.unsafeToHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToHex = (instance: CML.DatumHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of DatumHash
 *
 * @example
 * import { DatumHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* DatumHash.fromHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.DatumHash.from_hex(input),
    catch: () =>
      new DatumHashError({
        message: `DatumHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
      }),
  });
});

/**
 * Unsafely calls DatumHash.fromHex without Effect wrapper
 *
 * @example
 * import { DatumHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = DatumHash.unsafeFromHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`DatumHash.unsafeFromHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromHex = (input: string) => Effect.runSync(fromHex(input));

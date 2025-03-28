import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ScriptDataHash = CML.ScriptDataHash;

export class ScriptDataHashError extends Data.TaggedError(
  "ScriptDataHashError",
)<{
  message?: string;
}> {}

/**
 * Method free of ScriptDataHash
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptDataHash instance
 * const instance = ... ;
 *   const result = yield* ScriptDataHash.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ScriptDataHash): Effect.Effect<void, ScriptDataHashError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ScriptDataHashError({
          message: `ScriptDataHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptDataHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptDataHash.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptDataHash.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ScriptDataHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of ScriptDataHash
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptDataHash instance
 * const instance = ... ;
 *   const result = yield* ScriptDataHash.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (
    instance: CML.ScriptDataHash,
    prefix: string,
  ): Effect.Effect<string, ScriptDataHashError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new ScriptDataHashError({
          message: `ScriptDataHash.toBech32 failed with parameters: ${prefix}. ScriptDataHash is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptDataHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptDataHash.unsafeToBech32(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptDataHash.unsafeToBech32 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToBech32 = (
  instance: CML.ScriptDataHash,
  prefix: string,
): string => Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of ScriptDataHash
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptDataHash.fromBech32( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.ScriptDataHash.from_bech32(bech32Str),
    catch: () =>
      new ScriptDataHashError({
        message: `ScriptDataHash.fromBech32 failed with parameters: ${bech32Str}. `,
      }),
  });
});

/**
 * Unsafely calls ScriptDataHash.fromBech32 without Effect wrapper
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptDataHash.unsafeFromBech32( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptDataHash.unsafeFromBech32 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromBech32 = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of ScriptDataHash
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptDataHash instance
 * const instance = ... ;
 *   const result = yield* ScriptDataHash.toRawBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (
    instance: CML.ScriptDataHash,
  ): Effect.Effect<Uint8Array, ScriptDataHashError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new ScriptDataHashError({
          message: `ScriptDataHash.toRawBytes failed ScriptDataHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptDataHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptDataHash.unsafeToRawBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptDataHash.unsafeToRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawBytes = (instance: CML.ScriptDataHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of ScriptDataHash
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptDataHash.fromRawBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ScriptDataHash.from_raw_bytes(bytes),
    catch: () =>
      new ScriptDataHashError({
        message: `ScriptDataHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ScriptDataHash.fromRawBytes without Effect wrapper
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptDataHash.unsafeFromRawBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptDataHash.unsafeFromRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromRawBytes = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of ScriptDataHash
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ScriptDataHash instance
 * const instance = ... ;
 *   const result = yield* ScriptDataHash.toHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.ScriptDataHash): Effect.Effect<string, ScriptDataHashError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new ScriptDataHashError({
          message: `ScriptDataHash.toHex failed ScriptDataHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ScriptDataHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptDataHash.unsafeToHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptDataHash.unsafeToHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToHex = (instance: CML.ScriptDataHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of ScriptDataHash
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ScriptDataHash.fromHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.ScriptDataHash.from_hex(input),
    catch: () =>
      new ScriptDataHashError({
        message: `ScriptDataHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
      }),
  });
});

/**
 * Unsafely calls ScriptDataHash.fromHex without Effect wrapper
 *
 * @example
 * import { ScriptDataHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ScriptDataHash.unsafeFromHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ScriptDataHash.unsafeFromHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromHex = (input: string) => Effect.runSync(fromHex(input));

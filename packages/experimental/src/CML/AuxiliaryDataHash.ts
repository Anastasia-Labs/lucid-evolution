import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type AuxiliaryDataHash = CML.AuxiliaryDataHash;

export class AuxiliaryDataHashError extends Data.TaggedError(
  "AuxiliaryDataHashError",
)<{
  message?: string;
}> {}

/**
 * Method free of AuxiliaryDataHash
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryDataHash instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryDataHash.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.AuxiliaryDataHash,
  ): Effect.Effect<void, AuxiliaryDataHashError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new AuxiliaryDataHashError({
          message: `AuxiliaryDataHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AuxiliaryDataHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryDataHash.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryDataHash.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.AuxiliaryDataHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of AuxiliaryDataHash
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryDataHash instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryDataHash.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (
    instance: CML.AuxiliaryDataHash,
    prefix: string,
  ): Effect.Effect<string, AuxiliaryDataHashError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new AuxiliaryDataHashError({
          message: `AuxiliaryDataHash.toBech32 failed with parameters: ${prefix}. AuxiliaryDataHash is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AuxiliaryDataHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryDataHash.unsafeToBech32(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryDataHash.unsafeToBech32 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToBech32 = (
  instance: CML.AuxiliaryDataHash,
  prefix: string,
): string => Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of AuxiliaryDataHash
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AuxiliaryDataHash.fromBech32( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.AuxiliaryDataHash.from_bech32(bech32Str),
    catch: () =>
      new AuxiliaryDataHashError({
        message: `AuxiliaryDataHash.fromBech32 failed with parameters: ${bech32Str}. `,
      }),
  });
});

/**
 * Unsafely calls AuxiliaryDataHash.fromBech32 without Effect wrapper
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryDataHash.unsafeFromBech32( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryDataHash.unsafeFromBech32 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromBech32 = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of AuxiliaryDataHash
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryDataHash instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryDataHash.toRawBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (
    instance: CML.AuxiliaryDataHash,
  ): Effect.Effect<Uint8Array, AuxiliaryDataHashError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new AuxiliaryDataHashError({
          message: `AuxiliaryDataHash.toRawBytes failed AuxiliaryDataHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AuxiliaryDataHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryDataHash.unsafeToRawBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryDataHash.unsafeToRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawBytes = (instance: CML.AuxiliaryDataHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of AuxiliaryDataHash
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AuxiliaryDataHash.fromRawBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.AuxiliaryDataHash.from_raw_bytes(bytes),
    catch: () =>
      new AuxiliaryDataHashError({
        message: `AuxiliaryDataHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls AuxiliaryDataHash.fromRawBytes without Effect wrapper
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryDataHash.unsafeFromRawBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryDataHash.unsafeFromRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromRawBytes = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of AuxiliaryDataHash
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuxiliaryDataHash instance
 * const instance = ... ;
 *   const result = yield* AuxiliaryDataHash.toHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (
    instance: CML.AuxiliaryDataHash,
  ): Effect.Effect<string, AuxiliaryDataHashError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new AuxiliaryDataHashError({
          message: `AuxiliaryDataHash.toHex failed AuxiliaryDataHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AuxiliaryDataHash instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryDataHash.unsafeToHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryDataHash.unsafeToHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToHex = (instance: CML.AuxiliaryDataHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of AuxiliaryDataHash
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AuxiliaryDataHash.fromHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.AuxiliaryDataHash.from_hex(input),
    catch: () =>
      new AuxiliaryDataHashError({
        message: `AuxiliaryDataHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
      }),
  });
});

/**
 * Unsafely calls AuxiliaryDataHash.fromHex without Effect wrapper
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuxiliaryDataHash.unsafeFromHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuxiliaryDataHash.unsafeFromHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromHex = (input: string) => Effect.runSync(fromHex(input));

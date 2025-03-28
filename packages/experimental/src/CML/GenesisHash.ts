import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type GenesisHash = CML.GenesisHash;

export class GenesisHashError extends Data.TaggedError("GenesisHashError")<{
  message?: string;
}> {}

/**
 * Method free of GenesisHash
 * 
 * @example
 * import { GenesisHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GenesisHash instance
 * const instance = ... ;
 *   const result = yield* GenesisHash.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.GenesisHash): Effect.Effect<void, GenesisHashError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new GenesisHashError({
          message: `GenesisHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { GenesisHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GenesisHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GenesisHash.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GenesisHash.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.GenesisHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of GenesisHash
 * 
 * @example
 * import { GenesisHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GenesisHash instance
 * const instance = ... ;
 *   const result = yield* GenesisHash.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (instance: CML.GenesisHash, prefix: string): Effect.Effect<string, GenesisHashError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new GenesisHashError({
          message: `GenesisHash.toBech32 failed with parameters: ${prefix}. GenesisHash is not valid for string conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 * 
 * @example
 * import { GenesisHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GenesisHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GenesisHash.unsafeToBech32(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GenesisHash.unsafeToBech32 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToBech32 = (instance: CML.GenesisHash, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of GenesisHash
 * 
 * @example
 * import { GenesisHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* GenesisHash.fromBech32( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.GenesisHash.from_bech32(bech32Str),
    catch: () => new GenesisHashError({
      message: `GenesisHash.fromBech32 failed with parameters: ${bech32Str}. `,
    }),
  });
});

/**
 * Unsafely calls GenesisHash.fromBech32 without Effect wrapper
 * 
 * @example
 * import { GenesisHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GenesisHash.unsafeFromBech32( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GenesisHash.unsafeFromBech32 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromBech32 = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of GenesisHash
 * 
 * @example
 * import { GenesisHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GenesisHash instance
 * const instance = ... ;
 *   const result = yield* GenesisHash.toRawBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.GenesisHash): Effect.Effect<Uint8Array, GenesisHashError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new GenesisHashError({
          message: `GenesisHash.toRawBytes failed GenesisHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @example
 * import { GenesisHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GenesisHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GenesisHash.unsafeToRawBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GenesisHash.unsafeToRawBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawBytes = (instance: CML.GenesisHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of GenesisHash
 * 
 * @example
 * import { GenesisHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* GenesisHash.fromRawBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.GenesisHash.from_raw_bytes(bytes),
    catch: () => new GenesisHashError({
      message: `GenesisHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls GenesisHash.fromRawBytes without Effect wrapper
 * 
 * @example
 * import { GenesisHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GenesisHash.unsafeFromRawBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GenesisHash.unsafeFromRawBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromRawBytes = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of GenesisHash
 * 
 * @example
 * import { GenesisHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a GenesisHash instance
 * const instance = ... ;
 *   const result = yield* GenesisHash.toHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.GenesisHash): Effect.Effect<string, GenesisHashError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new GenesisHashError({
          message: `GenesisHash.toHex failed GenesisHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    })
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 * 
 * @example
 * import { GenesisHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a GenesisHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GenesisHash.unsafeToHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GenesisHash.unsafeToHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToHex = (instance: CML.GenesisHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of GenesisHash
 * 
 * @example
 * import { GenesisHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* GenesisHash.fromHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.GenesisHash.from_hex(input),
    catch: () => new GenesisHashError({
      message: `GenesisHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
    }),
  });
});

/**
 * Unsafely calls GenesisHash.fromHex without Effect wrapper
 * 
 * @example
 * import { GenesisHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = GenesisHash.unsafeFromHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`GenesisHash.unsafeFromHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromHex = (input: string) =>
  Effect.runSync(fromHex(input));

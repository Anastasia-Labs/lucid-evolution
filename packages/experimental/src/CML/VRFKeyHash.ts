import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type VRFKeyHash = CML.VRFKeyHash;

export class VRFKeyHashError extends Data.TaggedError("VRFKeyHashError")<{
  message?: string;
}> {}

/**
 * Method free of VRFKeyHash
 * 
 * @example
 * import { VRFKeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFKeyHash instance
 * const instance = ... ;
 *   const result = yield* VRFKeyHash.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.VRFKeyHash): Effect.Effect<void, VRFKeyHashError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VRFKeyHashError({
          message: `VRFKeyHash.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { VRFKeyHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VRFKeyHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VRFKeyHash.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFKeyHash.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.VRFKeyHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of VRFKeyHash
 * 
 * @example
 * import { VRFKeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFKeyHash instance
 * const instance = ... ;
 *   const result = yield* VRFKeyHash.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (instance: CML.VRFKeyHash, prefix: string): Effect.Effect<string, VRFKeyHashError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new VRFKeyHashError({
          message: `VRFKeyHash.toBech32 failed with parameters: ${prefix}. VRFKeyHash is not valid for string conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 * 
 * @example
 * import { VRFKeyHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VRFKeyHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VRFKeyHash.unsafeToBech32(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFKeyHash.unsafeToBech32 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToBech32 = (instance: CML.VRFKeyHash, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of VRFKeyHash
 * 
 * @example
 * import { VRFKeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* VRFKeyHash.fromBech32( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.VRFKeyHash.from_bech32(bech32Str),
    catch: () => new VRFKeyHashError({
      message: `VRFKeyHash.fromBech32 failed with parameters: ${bech32Str}. `,
    }),
  });
});

/**
 * Unsafely calls VRFKeyHash.fromBech32 without Effect wrapper
 * 
 * @example
 * import { VRFKeyHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VRFKeyHash.unsafeFromBech32( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFKeyHash.unsafeFromBech32 failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromBech32 = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of VRFKeyHash
 * 
 * @example
 * import { VRFKeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFKeyHash instance
 * const instance = ... ;
 *   const result = yield* VRFKeyHash.toRawBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.VRFKeyHash): Effect.Effect<Uint8Array, VRFKeyHashError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new VRFKeyHashError({
          message: `VRFKeyHash.toRawBytes failed VRFKeyHash is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @example
 * import { VRFKeyHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VRFKeyHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VRFKeyHash.unsafeToRawBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFKeyHash.unsafeToRawBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawBytes = (instance: CML.VRFKeyHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of VRFKeyHash
 * 
 * @example
 * import { VRFKeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* VRFKeyHash.fromRawBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.VRFKeyHash.from_raw_bytes(bytes),
    catch: () => new VRFKeyHashError({
      message: `VRFKeyHash.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls VRFKeyHash.fromRawBytes without Effect wrapper
 * 
 * @example
 * import { VRFKeyHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VRFKeyHash.unsafeFromRawBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFKeyHash.unsafeFromRawBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromRawBytes = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of VRFKeyHash
 * 
 * @example
 * import { VRFKeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFKeyHash instance
 * const instance = ... ;
 *   const result = yield* VRFKeyHash.toHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.VRFKeyHash): Effect.Effect<string, VRFKeyHashError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new VRFKeyHashError({
          message: `VRFKeyHash.toHex failed VRFKeyHash is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    })
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 * 
 * @example
 * import { VRFKeyHash } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VRFKeyHash instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VRFKeyHash.unsafeToHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFKeyHash.unsafeToHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToHex = (instance: CML.VRFKeyHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of VRFKeyHash
 * 
 * @example
 * import { VRFKeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* VRFKeyHash.fromHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.VRFKeyHash.from_hex(input),
    catch: () => new VRFKeyHashError({
      message: `VRFKeyHash.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
    }),
  });
});

/**
 * Unsafely calls VRFKeyHash.fromHex without Effect wrapper
 * 
 * @example
 * import { VRFKeyHash } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VRFKeyHash.unsafeFromHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFKeyHash.unsafeFromHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromHex = (input: string) =>
  Effect.runSync(fromHex(input));

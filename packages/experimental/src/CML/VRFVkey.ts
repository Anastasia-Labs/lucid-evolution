/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML VRFVkey class
 *
 * @since 2.0.0
 * @category Types
 */
export type VRFVkey = CML.VRFVkey;

/**
 * Error class for VRFVkey operations
 * 
 * This error is thrown when operations on VRFVkey instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class VRFVkeyError extends Data.TaggedError("VRFVkeyError")<{
  message?: string;
}> {}

/**
 * Method free of VRFVkey
 * 
 * @example
 * import { VRFVkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFVkey instance
 * const instance = ... ;
 *   const result = yield* VRFVkey.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.VRFVkey): Effect.Effect<void, VRFVkeyError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new VRFVkeyError({
          message: `VRFVkey.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { VRFVkey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VRFVkey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VRFVkey.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFVkey.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.VRFVkey): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of VRFVkey
 * 
 * @example
 * import { VRFVkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFVkey instance
 * const instance = ... ;
 *   const result = yield* VRFVkey.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (instance: CML.VRFVkey, prefix: string): Effect.Effect<string, VRFVkeyError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new VRFVkeyError({
          message: `VRFVkey.toBech32 failed with parameters: ${prefix}. VRFVkey is not valid for string conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 * 
 * @example
 * import { VRFVkey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VRFVkey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VRFVkey.toBech32Unsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFVkey.toBech32Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.VRFVkey, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of VRFVkey
 * 
 * @example
 * import { VRFVkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* VRFVkey.fromBech32( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.VRFVkey.from_bech32(bech32Str),
    catch: () => new VRFVkeyError({
      message: `VRFVkey.fromBech32 failed with parameters: ${bech32Str}. `,
    }),
  });
});

/**
 * Unsafely calls VRFVkey.fromBech32 without Effect wrapper
 * 
 * @example
 * import { VRFVkey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VRFVkey.fromBech32Unsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFVkey.fromBech32Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of VRFVkey
 * 
 * @example
 * import { VRFVkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFVkey instance
 * const instance = ... ;
 *   const result = yield* VRFVkey.toRawBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.VRFVkey): Effect.Effect<Uint8Array, VRFVkeyError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new VRFVkeyError({
          message: `VRFVkey.toRawBytes failed VRFVkey is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @example
 * import { VRFVkey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VRFVkey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VRFVkey.toRawBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFVkey.toRawBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.VRFVkey): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of VRFVkey
 * 
 * @example
 * import { VRFVkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* VRFVkey.fromRawBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.VRFVkey.from_raw_bytes(bytes),
    catch: () => new VRFVkeyError({
      message: `VRFVkey.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls VRFVkey.fromRawBytes without Effect wrapper
 * 
 * @example
 * import { VRFVkey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VRFVkey.fromRawBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFVkey.fromRawBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of VRFVkey
 * 
 * @example
 * import { VRFVkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a VRFVkey instance
 * const instance = ... ;
 *   const result = yield* VRFVkey.toHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.VRFVkey): Effect.Effect<string, VRFVkeyError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new VRFVkeyError({
          message: `VRFVkey.toHex failed VRFVkey is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    })
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 * 
 * @example
 * import { VRFVkey } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a VRFVkey instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VRFVkey.toHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFVkey.toHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.VRFVkey): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of VRFVkey
 * 
 * @example
 * import { VRFVkey } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* VRFVkey.fromHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.VRFVkey.from_hex(input),
    catch: () => new VRFVkeyError({
      message: `VRFVkey.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
    }),
  });
});

/**
 * Unsafely calls VRFVkey.fromHex without Effect wrapper
 * 
 * @example
 * import { VRFVkey } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = VRFVkey.fromHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`VRFVkey.fromHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string) =>
  Effect.runSync(fromHex(input));

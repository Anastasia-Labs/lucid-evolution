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
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.VRFVkey) => Effect.Effect<void, VRFVkeyError> = Effect.fn(
  (instance: CML.VRFVkey) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.VRFVkey): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of VRFVkey
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32: (instance: CML.VRFVkey, prefix: string) => Effect.Effect<string, VRFVkeyError> = Effect.fn(
  (instance: CML.VRFVkey, prefix: string) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.VRFVkey, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of VRFVkey
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32: (bech32Str: string) => Effect.Effect<CML.VRFVkey, VRFVkeyError> = Effect.fn(function* (bech32Str: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string): CML.VRFVkey =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of VRFVkey
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (instance: CML.VRFVkey) => Effect.Effect<Uint8Array, VRFVkeyError> = Effect.fn(
  (instance: CML.VRFVkey) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.VRFVkey): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of VRFVkey
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.VRFVkey, VRFVkeyError> = Effect.fn(function* (bytes: Uint8Array) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.VRFVkey =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of VRFVkey
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (instance: CML.VRFVkey) => Effect.Effect<string, VRFVkeyError> = Effect.fn(
  (instance: CML.VRFVkey) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.VRFVkey): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of VRFVkey
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (input: string) => Effect.Effect<CML.VRFVkey, VRFVkeyError> = Effect.fn(function* (input: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.VRFVkey =>
  Effect.runSync(fromHex(input));

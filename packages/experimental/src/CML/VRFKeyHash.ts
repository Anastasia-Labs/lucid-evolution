/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML VRFKeyHash class
 *
 * @since 2.0.0
 * @category Types
 */
export type VRFKeyHash = CML.VRFKeyHash;

/**
 * Error class for VRFKeyHash operations
 * 
 * This error is thrown when operations on VRFKeyHash instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class VRFKeyHashError extends Data.TaggedError("VRFKeyHashError")<{
  message?: string;
}> {}

/**
 * Method free of VRFKeyHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.VRFKeyHash) => Effect.Effect<void, VRFKeyHashError> = Effect.fn(
  (instance: CML.VRFKeyHash) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.VRFKeyHash): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of VRFKeyHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32: (instance: CML.VRFKeyHash, prefix: string) => Effect.Effect<string, VRFKeyHashError> = Effect.fn(
  (instance: CML.VRFKeyHash, prefix: string) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.VRFKeyHash, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of VRFKeyHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32: (bech32Str: string) => Effect.Effect<CML.VRFKeyHash, VRFKeyHashError> = Effect.fn(function* (bech32Str: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string): CML.VRFKeyHash =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of VRFKeyHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes: (instance: CML.VRFKeyHash) => Effect.Effect<Uint8Array, VRFKeyHashError> = Effect.fn(
  (instance: CML.VRFKeyHash) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.VRFKeyHash): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of VRFKeyHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes: (bytes: Uint8Array) => Effect.Effect<CML.VRFKeyHash, VRFKeyHashError> = Effect.fn(function* (bytes: Uint8Array) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array): CML.VRFKeyHash =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of VRFKeyHash
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex: (instance: CML.VRFKeyHash) => Effect.Effect<string, VRFKeyHashError> = Effect.fn(
  (instance: CML.VRFKeyHash) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.VRFKeyHash): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of VRFKeyHash
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex: (input: string) => Effect.Effect<CML.VRFKeyHash, VRFKeyHashError> = Effect.fn(function* (input: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string): CML.VRFKeyHash =>
  Effect.runSync(fromHex(input));

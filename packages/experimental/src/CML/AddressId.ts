/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML AddressId class
 *
 * @since 2.0.0
 * @category Types
 */
export type AddressId = CML.AddressId;

/**
 * Error class for AddressId operations
 *
 * This error is thrown when operations on AddressId instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class AddressIdError extends Data.TaggedError("AddressIdError")<{
  message?: string;
}> {}

/**
 * Method free of AddressId
 *
 * @example
 * import { AddressId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddressId instance
 * const instance = ... ;
 *   const result = yield* AddressId.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.AddressId): Effect.Effect<void, AddressIdError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new AddressIdError({
          message: `AddressId.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { AddressId } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AddressId instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddressId.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressId.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.AddressId): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of AddressId
 *
 * @example
 * import { AddressId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddressId instance
 * const instance = ... ;
 *   const result = yield* AddressId.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (
    instance: CML.AddressId,
    prefix: string,
  ): Effect.Effect<string, AddressIdError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new AddressIdError({
          message: `AddressId.toBech32 failed with parameters: ${prefix}. AddressId is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 *
 * @example
 * import { AddressId } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AddressId instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddressId.toBech32Unsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressId.toBech32Unsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (
  instance: CML.AddressId,
  prefix: string,
): string => Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of AddressId
 *
 * @example
 * import { AddressId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AddressId.fromBech32( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.AddressId.from_bech32(bech32Str),
    catch: () =>
      new AddressIdError({
        message: `AddressId.fromBech32 failed with parameters: ${bech32Str}. `,
      }),
  });
});

/**
 * Unsafely calls AddressId.fromBech32 without Effect wrapper
 *
 * @example
 * import { AddressId } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddressId.fromBech32Unsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressId.fromBech32Unsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of AddressId
 *
 * @example
 * import { AddressId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddressId instance
 * const instance = ... ;
 *   const result = yield* AddressId.toRawBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.AddressId): Effect.Effect<Uint8Array, AddressIdError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new AddressIdError({
          message: `AddressId.toRawBytes failed AddressId is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @example
 * import { AddressId } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AddressId instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddressId.toRawBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressId.toRawBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.AddressId): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of AddressId
 *
 * @example
 * import { AddressId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AddressId.fromRawBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.AddressId.from_raw_bytes(bytes),
    catch: () =>
      new AddressIdError({
        message: `AddressId.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls AddressId.fromRawBytes without Effect wrapper
 *
 * @example
 * import { AddressId } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddressId.fromRawBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressId.fromRawBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of AddressId
 *
 * @example
 * import { AddressId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddressId instance
 * const instance = ... ;
 *   const result = yield* AddressId.toHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.AddressId): Effect.Effect<string, AddressIdError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new AddressIdError({
          message: `AddressId.toHex failed AddressId is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @example
 * import { AddressId } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AddressId instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddressId.toHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressId.toHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.AddressId): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of AddressId
 *
 * @example
 * import { AddressId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AddressId.fromHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.AddressId.from_hex(input),
    catch: () =>
      new AddressIdError({
        message: `AddressId.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
      }),
  });
});

/**
 * Unsafely calls AddressId.fromHex without Effect wrapper
 *
 * @example
 * import { AddressId } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddressId.fromHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressId.fromHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string) => Effect.runSync(fromHex(input));

/**
 * Static method _new of AddressId
 *
 * @example
 * import { AddressId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AddressId._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  addrType: CML.ByronAddrType,
  spendingData: CML.SpendingData,
  attrs: CML.AddrAttributes,
) {
  return yield* Effect.try({
    try: () => CML.AddressId.new(addrType, spendingData, attrs),
    catch: () =>
      new AddressIdError({
        message: `AddressId._new failed with parameters: ${addrType} (ByronAddrType), ${spendingData} (SpendingData), ${attrs} (AddrAttributes). `,
      }),
  });
});

/**
 * Unsafely calls AddressId._new without Effect wrapper
 *
 * @example
 * import { AddressId } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AddressId._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressId._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  addrType: CML.ByronAddrType,
  spendingData: CML.SpendingData,
  attrs: CML.AddrAttributes,
) => Effect.runSync(_new(addrType, spendingData, attrs));

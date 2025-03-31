/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML StakeholderId class
 *
 * @since 2.0.0
 * @category Types
 */
export type StakeholderId = CML.StakeholderId;

/**
 * Error class for StakeholderId operations
 * 
 * This error is thrown when operations on StakeholderId instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class StakeholderIdError extends Data.TaggedError("StakeholderIdError")<{
  message?: string;
}> {}

/**
 * Method free of StakeholderId
 * 
 * @example
 * import { StakeholderId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeholderId instance
 * const instance = ... ;
 *   const result = yield* StakeholderId.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.StakeholderId): Effect.Effect<void, StakeholderIdError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new StakeholderIdError({
          message: `StakeholderId.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { StakeholderId } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeholderId instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeholderId.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeholderId.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.StakeholderId): void =>
  Effect.runSync(free(instance));

/**
 * Method toBech32 of StakeholderId
 * 
 * @example
 * import { StakeholderId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeholderId instance
 * const instance = ... ;
 *   const result = yield* StakeholderId.toBech32(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBech32 = Effect.fn(
  (instance: CML.StakeholderId, prefix: string): Effect.Effect<string, StakeholderIdError> =>
    Effect.try({
      try: () => instance.to_bech32(prefix),
      catch: () =>
        new StakeholderIdError({
          message: `StakeholderId.toBech32 failed with parameters: ${prefix}. StakeholderId is not valid for string conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toBech32 without Effect wrapper
 * 
 * @example
 * import { StakeholderId } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeholderId instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeholderId.toBech32Unsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeholderId.toBech32Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBech32Unsafe = (instance: CML.StakeholderId, prefix: string): string =>
  Effect.runSync(toBech32(instance, prefix));

/**
 * Static method fromBech32 of StakeholderId
 * 
 * @example
 * import { StakeholderId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeholderId.fromBech32( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBech32 = Effect.fn(function* (bech32Str: string) {
  return yield* Effect.try({
    try: () => CML.StakeholderId.from_bech32(bech32Str),
    catch: () => new StakeholderIdError({
      message: `StakeholderId.fromBech32 failed with parameters: ${bech32Str}. `,
    }),
  });
});

/**
 * Unsafely calls StakeholderId.fromBech32 without Effect wrapper
 * 
 * @example
 * import { StakeholderId } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeholderId.fromBech32Unsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeholderId.fromBech32Unsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBech32Unsafe = (bech32Str: string) =>
  Effect.runSync(fromBech32(bech32Str));

/**
 * Method toRawBytes of StakeholderId
 * 
 * @example
 * import { StakeholderId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeholderId instance
 * const instance = ... ;
 *   const result = yield* StakeholderId.toRawBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.StakeholderId): Effect.Effect<Uint8Array, StakeholderIdError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new StakeholderIdError({
          message: `StakeholderId.toRawBytes failed StakeholderId is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @example
 * import { StakeholderId } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeholderId instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeholderId.toRawBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeholderId.toRawBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.StakeholderId): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of StakeholderId
 * 
 * @example
 * import { StakeholderId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeholderId.fromRawBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.StakeholderId.from_raw_bytes(bytes),
    catch: () => new StakeholderIdError({
      message: `StakeholderId.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls StakeholderId.fromRawBytes without Effect wrapper
 * 
 * @example
 * import { StakeholderId } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeholderId.fromRawBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeholderId.fromRawBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of StakeholderId
 * 
 * @example
 * import { StakeholderId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeholderId instance
 * const instance = ... ;
 *   const result = yield* StakeholderId.toHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.StakeholderId): Effect.Effect<string, StakeholderIdError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new StakeholderIdError({
          message: `StakeholderId.toHex failed StakeholderId is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    })
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 * 
 * @example
 * import { StakeholderId } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeholderId instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeholderId.toHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeholderId.toHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.StakeholderId): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of StakeholderId
 * 
 * @example
 * import { StakeholderId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeholderId.fromHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.StakeholderId.from_hex(input),
    catch: () => new StakeholderIdError({
      message: `StakeholderId.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
    }),
  });
});

/**
 * Unsafely calls StakeholderId.fromHex without Effect wrapper
 * 
 * @example
 * import { StakeholderId } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeholderId.fromHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeholderId.fromHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string) =>
  Effect.runSync(fromHex(input));

/**
 * Static method _new of StakeholderId
 * 
 * @example
 * import { StakeholderId } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeholderId._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (pubk: CML.Bip32PublicKey) {
  return yield* Effect.try({
    try: () => CML.StakeholderId.new(pubk),
    catch: () => new StakeholderIdError({
      message: `StakeholderId._new failed with parameters: ${pubk} (Bip32PublicKey). `,
    }),
  });
});

/**
 * Unsafely calls StakeholderId._new without Effect wrapper
 * 
 * @example
 * import { StakeholderId } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeholderId._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeholderId._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (pubk: CML.Bip32PublicKey) =>
  Effect.runSync(_new(pubk));

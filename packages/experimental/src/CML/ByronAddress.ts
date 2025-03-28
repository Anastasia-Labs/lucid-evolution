import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ByronAddress = CML.ByronAddress;

export class ByronAddressError extends Data.TaggedError("ByronAddressError")<{
  message?: string;
}> {}

/**
 * Method free of ByronAddress
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ByronAddress instance
 * const instance = ... ;
 *   const result = yield* ByronAddress.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.ByronAddress): Effect.Effect<void, ByronAddressError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ByronAddressError({
          message: `ByronAddress.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ByronAddress instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronAddress.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronAddress.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ByronAddress): void =>
  Effect.runSync(free(instance));

/**
 * Method toBase58 of ByronAddress
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ByronAddress instance
 * const instance = ... ;
 *   const result = yield* ByronAddress.toBase58(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toBase58 = Effect.fn(
  (instance: CML.ByronAddress): Effect.Effect<string, ByronAddressError> =>
    Effect.try({
      try: () => instance.to_base58(),
      catch: () =>
        new ByronAddressError({
          message: `ByronAddress.toBase58 failed ByronAddress is not valid for string conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toBase58 without Effect wrapper
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ByronAddress instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronAddress.unsafeToBase58(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronAddress.unsafeToBase58 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToBase58 = (instance: CML.ByronAddress): string =>
  Effect.runSync(toBase58(instance));

/**
 * Static method fromBase58 of ByronAddress
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ByronAddress.fromBase58( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromBase58 = Effect.fn(function* (s: string) {
  return yield* Effect.try({
    try: () => CML.ByronAddress.from_base58(s),
    catch: () =>
      new ByronAddressError({
        message: `ByronAddress.fromBase58 failed with parameters: ${s}. `,
      }),
  });
});

/**
 * Unsafely calls ByronAddress.fromBase58 without Effect wrapper
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronAddress.unsafeFromBase58( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronAddress.unsafeFromBase58 failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromBase58 = (s: string) => Effect.runSync(fromBase58(s));

/**
 * Static method isValid of ByronAddress
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ByronAddress.isValid( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const isValid = Effect.fn(function* (s: string) {
  return yield* Effect.try({
    try: () => CML.ByronAddress.is_valid(s),
    catch: () =>
      new ByronAddressError({
        message: `ByronAddress.isValid failed with parameters: ${s}. `,
      }),
  });
});

/**
 * Unsafely calls ByronAddress.isValid without Effect wrapper
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronAddress.unsafeIsValid( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronAddress.unsafeIsValid failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeIsValid = (s: string) => Effect.runSync(isValid(s));

/**
 * Method toAddress of ByronAddress
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ByronAddress instance
 * const instance = ... ;
 *   const result = yield* ByronAddress.toAddress(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toAddress = Effect.fn(
  (instance: CML.ByronAddress): Effect.Effect<CML.Address, ByronAddressError> =>
    Effect.try({
      try: () => instance.to_address(),
      catch: () =>
        new ByronAddressError({
          message: `ByronAddress.toAddress failed ByronAddress is not valid for Address conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toAddress without Effect wrapper
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ByronAddress instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronAddress.unsafeToAddress(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronAddress.unsafeToAddress failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToAddress = (instance: CML.ByronAddress): CML.Address =>
  Effect.runSync(toAddress(instance));

/**
 * Static method fromAddress of ByronAddress
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ByronAddress.fromAddress( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromAddress = Effect.fn(function* (addr: CML.Address) {
  return yield* Effect.try({
    try: () => CML.ByronAddress.from_address(addr),
    catch: () =>
      new ByronAddressError({
        message: `ByronAddress.fromAddress failed with parameters: ${addr} (Address). `,
      }),
  });
});

/**
 * Unsafely calls ByronAddress.fromAddress without Effect wrapper
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronAddress.unsafeFromAddress( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronAddress.unsafeFromAddress failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromAddress = (addr: CML.Address) =>
  Effect.runSync(fromAddress(addr));

/**
 * Static method fromAddressContent of ByronAddress
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ByronAddress.fromAddressContent( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromAddressContent = Effect.fn(function* (
  addressContent: CML.AddressContent,
) {
  return yield* Effect.try({
    try: () => CML.ByronAddress.from_address_content(addressContent),
    catch: () =>
      new ByronAddressError({
        message: `ByronAddress.fromAddressContent failed with parameters: ${addressContent} (AddressContent). `,
      }),
  });
});

/**
 * Unsafely calls ByronAddress.fromAddressContent without Effect wrapper
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronAddress.unsafeFromAddressContent( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronAddress.unsafeFromAddressContent failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromAddressContent = (addressContent: CML.AddressContent) =>
  Effect.runSync(fromAddressContent(addressContent));

/**
 * Method toCborBytes of ByronAddress
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ByronAddress instance
 * const instance = ... ;
 *   const result = yield* ByronAddress.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.ByronAddress): Effect.Effect<Uint8Array, ByronAddressError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ByronAddressError({
          message: `ByronAddress.toCborBytes failed ByronAddress is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ByronAddress instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronAddress.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronAddress.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.ByronAddress): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of ByronAddress
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ByronAddress.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ByronAddress.from_cbor_bytes(cborBytes),
    catch: () =>
      new ByronAddressError({
        message: `ByronAddress.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ByronAddress.fromCborBytes without Effect wrapper
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronAddress.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronAddress.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ByronAddress
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ByronAddress instance
 * const instance = ... ;
 *   const result = yield* ByronAddress.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.ByronAddress): Effect.Effect<string, ByronAddressError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ByronAddressError({
          message: `ByronAddress.toCborHex failed ByronAddress is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ByronAddress instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronAddress.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronAddress.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.ByronAddress): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of ByronAddress
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ByronAddress.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ByronAddress.from_cbor_hex(cborBytes),
    catch: () =>
      new ByronAddressError({
        message: `ByronAddress.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls ByronAddress.fromCborHex without Effect wrapper
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronAddress.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronAddress.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method content of ByronAddress
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ByronAddress instance
 * const instance = ... ;
 *   const result = yield* ByronAddress.content(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const content = Effect.fn(
  (
    instance: CML.ByronAddress,
  ): Effect.Effect<CML.AddressContent, ByronAddressError> =>
    Effect.try({
      try: () => instance.content(),
      catch: () =>
        new ByronAddressError({
          message: `ByronAddress.content failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.content without Effect wrapper
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ByronAddress instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronAddress.unsafeContent(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronAddress.unsafeContent failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeContent = (instance: CML.ByronAddress): CML.AddressContent =>
  Effect.runSync(content(instance));

/**
 * Method crc of ByronAddress
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ByronAddress instance
 * const instance = ... ;
 *   const result = yield* ByronAddress.crc(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const crc = Effect.fn(
  (instance: CML.ByronAddress): Effect.Effect<CML.Crc32, ByronAddressError> =>
    Effect.try({
      try: () => instance.crc(),
      catch: () =>
        new ByronAddressError({
          message: `ByronAddress.crc failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.crc without Effect wrapper
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ByronAddress instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronAddress.unsafeCrc(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronAddress.unsafeCrc failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCrc = (instance: CML.ByronAddress): CML.Crc32 =>
  Effect.runSync(crc(instance));

/**
 * Static method _new of ByronAddress
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ByronAddress._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  content: CML.AddressContent,
  crc: CML.Crc32,
) {
  return yield* Effect.try({
    try: () => CML.ByronAddress.new(content, crc),
    catch: () =>
      new ByronAddressError({
        message: `ByronAddress._new failed with parameters: ${content} (AddressContent), ${crc} (Crc32). `,
      }),
  });
});

/**
 * Unsafely calls ByronAddress._new without Effect wrapper
 *
 * @example
 * import { ByronAddress } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ByronAddress.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ByronAddress.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (content: CML.AddressContent, crc: CML.Crc32) =>
  Effect.runSync(_new(content, crc));

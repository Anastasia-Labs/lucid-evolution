/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ByronAddress class
 *
 * @since 2.0.0
 * @category Types
 */
export type ByronAddress = CML.ByronAddress;

/**
 * Error class for ByronAddress operations
 * 
 * This error is thrown when operations on ByronAddress instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ByronAddressError extends Data.TaggedError("ByronAddressError")<{
  message?: string;
}> {}

/**
 * Method free of ByronAddress
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.ByronAddress) => Effect.Effect<void, ByronAddressError> = Effect.fn(
  (instance: CML.ByronAddress) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ByronAddressError({
          message: `ByronAddress.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ByronAddress): void =>
  Effect.runSync(free(instance));

/**
 * Method toBase58 of ByronAddress
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toBase58: (instance: CML.ByronAddress) => Effect.Effect<string, ByronAddressError> = Effect.fn(
  (instance: CML.ByronAddress) =>
    Effect.try({
      try: () => instance.to_base58(),
      catch: () =>
        new ByronAddressError({
          message: `ByronAddress.toBase58 failed ByronAddress is not valid for string conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toBase58 without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toBase58Unsafe = (instance: CML.ByronAddress): string =>
  Effect.runSync(toBase58(instance));

/**
 * Static method fromBase58 of ByronAddress
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromBase58: (s: string) => Effect.Effect<CML.ByronAddress, ByronAddressError> = Effect.fn(function* (s: string) {
  return yield* Effect.try({
    try: () => CML.ByronAddress.from_base58(s),
    catch: () => new ByronAddressError({
      message: `ByronAddress.fromBase58 failed with parameters: ${s}. `,
    }),
  });
});

/**
 * Unsafely calls ByronAddress.fromBase58 without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromBase58Unsafe = (s: string): CML.ByronAddress =>
  Effect.runSync(fromBase58(s));

/**
 * Static method isValid of ByronAddress
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const isValid: (s: string) => Effect.Effect<boolean, ByronAddressError> = Effect.fn(function* (s: string) {
  return yield* Effect.try({
    try: () => CML.ByronAddress.is_valid(s),
    catch: () => new ByronAddressError({
      message: `ByronAddress.isValid failed with parameters: ${s}. `,
    }),
  });
});

/**
 * Unsafely calls ByronAddress.isValid without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const isValidUnsafe = (s: string): boolean =>
  Effect.runSync(isValid(s));

/**
 * Method toAddress of ByronAddress
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toAddress: (instance: CML.ByronAddress) => Effect.Effect<CML.Address, ByronAddressError> = Effect.fn(
  (instance: CML.ByronAddress) =>
    Effect.try({
      try: () => instance.to_address(),
      catch: () =>
        new ByronAddressError({
          message: `ByronAddress.toAddress failed ByronAddress is not valid for Address conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toAddress without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toAddressUnsafe = (instance: CML.ByronAddress): CML.Address =>
  Effect.runSync(toAddress(instance));

/**
 * Static method fromAddress of ByronAddress
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromAddress: (addr: CML.Address) => Effect.Effect<CML.ByronAddress | undefined, ByronAddressError> = Effect.fn(function* (addr: CML.Address) {
  return yield* Effect.try({
    try: () => CML.ByronAddress.from_address(addr),
    catch: () => new ByronAddressError({
      message: `ByronAddress.fromAddress failed with parameters: ${addr} (Address). `,
    }),
  });
});

/**
 * Unsafely calls ByronAddress.fromAddress without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromAddressUnsafe = (addr: CML.Address): CML.ByronAddress | undefined =>
  Effect.runSync(fromAddress(addr));

/**
 * Static method fromAddressContent of ByronAddress
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromAddressContent: (addressContent: CML.AddressContent) => Effect.Effect<CML.ByronAddress, ByronAddressError> = Effect.fn(function* (addressContent: CML.AddressContent) {
  return yield* Effect.try({
    try: () => CML.ByronAddress.from_address_content(addressContent),
    catch: () => new ByronAddressError({
      message: `ByronAddress.fromAddressContent failed with parameters: ${addressContent} (AddressContent). `,
    }),
  });
});

/**
 * Unsafely calls ByronAddress.fromAddressContent without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromAddressContentUnsafe = (addressContent: CML.AddressContent): CML.ByronAddress =>
  Effect.runSync(fromAddressContent(addressContent));

/**
 * Method toCborBytes of ByronAddress
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.ByronAddress) => Effect.Effect<Uint8Array, ByronAddressError> = Effect.fn(
  (instance: CML.ByronAddress) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ByronAddressError({
          message: `ByronAddress.toCborBytes failed ByronAddress is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.ByronAddress): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of ByronAddress
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.ByronAddress, ByronAddressError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ByronAddress.from_cbor_bytes(cborBytes),
    catch: () => new ByronAddressError({
      message: `ByronAddress.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls ByronAddress.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.ByronAddress =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ByronAddress
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.ByronAddress) => Effect.Effect<string, ByronAddressError> = Effect.fn(
  (instance: CML.ByronAddress) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ByronAddressError({
          message: `ByronAddress.toCborHex failed ByronAddress is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.ByronAddress): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of ByronAddress
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.ByronAddress, ByronAddressError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ByronAddress.from_cbor_hex(cborBytes),
    catch: () => new ByronAddressError({
      message: `ByronAddress.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls ByronAddress.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.ByronAddress =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method content of ByronAddress
 * 
 * @since 2.0.0
 * @category Methods
 */
export const content: (instance: CML.ByronAddress) => Effect.Effect<CML.AddressContent, ByronAddressError> = Effect.fn(
  (instance: CML.ByronAddress) =>
    Effect.try({
      try: () => instance.content(),
      catch: () =>
        new ByronAddressError({
          message: `ByronAddress.content failed `,
        }),
    })
);

/**
 * Unsafely calls instance.content without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const contentUnsafe = (instance: CML.ByronAddress): CML.AddressContent =>
  Effect.runSync(content(instance));

/**
 * Method crc of ByronAddress
 * 
 * @since 2.0.0
 * @category Methods
 */
export const crc: (instance: CML.ByronAddress) => Effect.Effect<CML.Crc32, ByronAddressError> = Effect.fn(
  (instance: CML.ByronAddress) =>
    Effect.try({
      try: () => instance.crc(),
      catch: () =>
        new ByronAddressError({
          message: `ByronAddress.crc failed `,
        }),
    })
);

/**
 * Unsafely calls instance.crc without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const crcUnsafe = (instance: CML.ByronAddress): CML.Crc32 =>
  Effect.runSync(crc(instance));

/**
 * Static method _new of ByronAddress
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (content: CML.AddressContent, crc: CML.Crc32) => Effect.Effect<CML.ByronAddress, ByronAddressError> = Effect.fn(function* (content: CML.AddressContent, crc: CML.Crc32) {
  return yield* Effect.try({
    try: () => CML.ByronAddress.new(content, crc),
    catch: () => new ByronAddressError({
      message: `ByronAddress._new failed with parameters: ${content} (AddressContent), ${crc} (Crc32). `,
    }),
  });
});

/**
 * Unsafely calls ByronAddress._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (content: CML.AddressContent, crc: CML.Crc32): CML.ByronAddress =>
  Effect.runSync(_new(content, crc));

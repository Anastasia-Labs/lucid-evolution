import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type AddressContent = CML.AddressContent;

export class AddressContentError extends Data.TaggedError("AddressContentError")<{
  message?: string;
}> {}

/**
 * Method free of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 *   const result = yield* AddressContent.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.AddressContent): Effect.Effect<void, AddressContentError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new AddressContentError({
          message: `AddressContent.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.AddressContent): void =>
  Effect.runSync(free(instance));

/**
 * Static method hashAndCreate of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AddressContent.hashAndCreate( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const hashAndCreate = Effect.fn(function* (addrType: CML.ByronAddrType, spendingData: CML.SpendingData, attributes: CML.AddrAttributes) {
  return yield* Effect.try({
    try: () => CML.AddressContent.hash_and_create(addrType, spendingData, attributes),
    catch: () => new AddressContentError({
      message: `AddressContent.hashAndCreate failed with parameters: ${addrType} (ByronAddrType), ${spendingData} (SpendingData), ${attributes} (AddrAttributes). `,
    }),
  });
});

/**
 * Unsafely calls AddressContent.hashAndCreate without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafeHashAndCreate( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafeHashAndCreate failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeHashAndCreate = (addrType: CML.ByronAddrType, spendingData: CML.SpendingData, attributes: CML.AddrAttributes) =>
  Effect.runSync(hashAndCreate(addrType, spendingData, attributes));

/**
 * Static method newRedeem of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AddressContent.newRedeem( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newRedeem = Effect.fn(function* (pubkey: CML.PublicKey, protocolMagic: CML.ProtocolMagic) {
  return yield* Effect.try({
    try: () => CML.AddressContent.new_redeem(pubkey, protocolMagic),
    catch: () => new AddressContentError({
      message: `AddressContent.newRedeem failed with parameters: ${pubkey} (PublicKey), ${protocolMagic} (ProtocolMagic). `,
    }),
  });
});

/**
 * Unsafely calls AddressContent.newRedeem without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafeNewRedeem( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafeNewRedeem failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewRedeem = (pubkey: CML.PublicKey, protocolMagic: CML.ProtocolMagic) =>
  Effect.runSync(newRedeem(pubkey, protocolMagic));

/**
 * Static method newSimple of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AddressContent.newSimple( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newSimple = Effect.fn(function* (xpub: CML.Bip32PublicKey, protocolMagic: CML.ProtocolMagic) {
  return yield* Effect.try({
    try: () => CML.AddressContent.new_simple(xpub, protocolMagic),
    catch: () => new AddressContentError({
      message: `AddressContent.newSimple failed with parameters: ${xpub} (Bip32PublicKey), ${protocolMagic} (ProtocolMagic). `,
    }),
  });
});

/**
 * Unsafely calls AddressContent.newSimple without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafeNewSimple( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafeNewSimple failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeNewSimple = (xpub: CML.Bip32PublicKey, protocolMagic: CML.ProtocolMagic) =>
  Effect.runSync(newSimple(xpub, protocolMagic));

/**
 * Method toAddress of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 *   const result = yield* AddressContent.toAddress(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toAddress = Effect.fn(
  (instance: CML.AddressContent): Effect.Effect<CML.ByronAddress, AddressContentError> =>
    Effect.try({
      try: () => instance.to_address(),
      catch: () =>
        new AddressContentError({
          message: `AddressContent.toAddress failed AddressContent is not valid for ByronAddress conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toAddress without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafeToAddress(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafeToAddress failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToAddress = (instance: CML.AddressContent): CML.ByronAddress =>
  Effect.runSync(toAddress(instance));

/**
 * Method byronProtocolMagic of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 *   const result = yield* AddressContent.byronProtocolMagic(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const byronProtocolMagic = Effect.fn(
  (instance: CML.AddressContent): Effect.Effect<CML.ProtocolMagic, AddressContentError> =>
    Effect.try({
      try: () => instance.byron_protocol_magic(),
      catch: () =>
        new AddressContentError({
          message: `AddressContent.byronProtocolMagic failed `,
        }),
    })
);

/**
 * Unsafely calls instance.byronProtocolMagic without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafeByronProtocolMagic(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafeByronProtocolMagic failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeByronProtocolMagic = (instance: CML.AddressContent): CML.ProtocolMagic =>
  Effect.runSync(byronProtocolMagic(instance));

/**
 * Method networkId of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 *   const result = yield* AddressContent.networkId(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const networkId = Effect.fn(
  (instance: CML.AddressContent): Effect.Effect<number, AddressContentError> =>
    Effect.try({
      try: () => instance.network_id(),
      catch: () =>
        new AddressContentError({
          message: `AddressContent.networkId failed `,
        }),
    })
);

/**
 * Unsafely calls instance.networkId without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafeNetworkId(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafeNetworkId failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeNetworkId = (instance: CML.AddressContent): number =>
  Effect.runSync(networkId(instance));

/**
 * Static method icarusFromKey of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AddressContent.icarusFromKey( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const icarusFromKey = Effect.fn(function* (key: CML.Bip32PublicKey, protocolMagic: CML.ProtocolMagic) {
  return yield* Effect.try({
    try: () => CML.AddressContent.icarus_from_key(key, protocolMagic),
    catch: () => new AddressContentError({
      message: `AddressContent.icarusFromKey failed with parameters: ${key} (Bip32PublicKey), ${protocolMagic} (ProtocolMagic). `,
    }),
  });
});

/**
 * Unsafely calls AddressContent.icarusFromKey without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafeIcarusFromKey( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafeIcarusFromKey failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeIcarusFromKey = (key: CML.Bip32PublicKey, protocolMagic: CML.ProtocolMagic) =>
  Effect.runSync(icarusFromKey(key, protocolMagic));

/**
 * Method identicalWithPubkey of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 *   const result = yield* AddressContent.identicalWithPubkey(instance,  parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const identicalWithPubkey = Effect.fn(
  (instance: CML.AddressContent, xpub: CML.Bip32PublicKey): Effect.Effect<boolean, AddressContentError> =>
    Effect.try({
      try: () => instance.identical_with_pubkey(xpub),
      catch: () =>
        new AddressContentError({
          message: `AddressContent.identicalWithPubkey failed with parameters: ${xpub} (Bip32PublicKey). `,
        }),
    })
);

/**
 * Unsafely calls instance.identicalWithPubkey without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafeIdenticalWithPubkey(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafeIdenticalWithPubkey failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeIdenticalWithPubkey = (instance: CML.AddressContent, xpub: CML.Bip32PublicKey): boolean =>
  Effect.runSync(identicalWithPubkey(instance, xpub));

/**
 * Method toCborBytes of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 *   const result = yield* AddressContent.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.AddressContent): Effect.Effect<Uint8Array, AddressContentError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new AddressContentError({
          message: `AddressContent.toCborBytes failed AddressContent is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.AddressContent): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AddressContent.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.AddressContent.from_cbor_bytes(cborBytes),
    catch: () => new AddressContentError({
      message: `AddressContent.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls AddressContent.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 *   const result = yield* AddressContent.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.AddressContent): Effect.Effect<string, AddressContentError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new AddressContentError({
          message: `AddressContent.toCborHex failed AddressContent is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.AddressContent): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AddressContent.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.AddressContent.from_cbor_hex(cborBytes),
    catch: () => new AddressContentError({
      message: `AddressContent.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls AddressContent.fromCborHex without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method addressId of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 *   const result = yield* AddressContent.addressId(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addressId = Effect.fn(
  (instance: CML.AddressContent): Effect.Effect<CML.AddressId, AddressContentError> =>
    Effect.try({
      try: () => instance.address_id(),
      catch: () =>
        new AddressContentError({
          message: `AddressContent.addressId failed `,
        }),
    })
);

/**
 * Unsafely calls instance.addressId without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafeAddressId(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafeAddressId failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddressId = (instance: CML.AddressContent): CML.AddressId =>
  Effect.runSync(addressId(instance));

/**
 * Method addrAttributes of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 *   const result = yield* AddressContent.addrAttributes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addrAttributes = Effect.fn(
  (instance: CML.AddressContent): Effect.Effect<CML.AddrAttributes, AddressContentError> =>
    Effect.try({
      try: () => instance.addr_attributes(),
      catch: () =>
        new AddressContentError({
          message: `AddressContent.addrAttributes failed `,
        }),
    })
);

/**
 * Unsafely calls instance.addrAttributes without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafeAddrAttributes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafeAddrAttributes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddrAttributes = (instance: CML.AddressContent): CML.AddrAttributes =>
  Effect.runSync(addrAttributes(instance));

/**
 * Method addrType of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 *   const result = yield* AddressContent.addrType(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addrType = Effect.fn(
  (instance: CML.AddressContent): Effect.Effect<CML.ByronAddrType, AddressContentError> =>
    Effect.try({
      try: () => instance.addr_type(),
      catch: () =>
        new AddressContentError({
          message: `AddressContent.addrType failed `,
        }),
    })
);

/**
 * Unsafely calls instance.addrType without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a AddressContent instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafeAddrType(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafeAddrType failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAddrType = (instance: CML.AddressContent): CML.ByronAddrType =>
  Effect.runSync(addrType(instance));

/**
 * Static method _new of AddressContent
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* AddressContent._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (addressId: CML.AddressId, addrAttributes: CML.AddrAttributes, addrType: CML.ByronAddrType) {
  return yield* Effect.try({
    try: () => CML.AddressContent.new(addressId, addrAttributes, addrType),
    catch: () => new AddressContentError({
      message: `AddressContent._new failed with parameters: ${addressId} (AddressId), ${addrAttributes} (AddrAttributes), ${addrType} (ByronAddrType). `,
    }),
  });
});

/**
 * Unsafely calls AddressContent._new without Effect wrapper
 * 
 * @example
 * import { AddressContent } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = AddressContent.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AddressContent.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (addressId: CML.AddressId, addrAttributes: CML.AddrAttributes, addrType: CML.ByronAddrType) =>
  Effect.runSync(_new(addressId, addrAttributes, addrType));

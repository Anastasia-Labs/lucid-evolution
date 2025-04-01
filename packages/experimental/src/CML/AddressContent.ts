/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML AddressContent class
 *
 * @since 2.0.0
 * @category Types
 */
export type AddressContent = CML.AddressContent;

/**
 * Error class for AddressContent operations
 * 
 * This error is thrown when operations on AddressContent instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class AddressContentError extends Data.TaggedError("AddressContentError")<{
  message?: string;
}> {}

/**
 * Method free of AddressContent
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.AddressContent) => Effect.Effect<void, AddressContentError> = Effect.fn(
  (instance: CML.AddressContent) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.AddressContent): void =>
  Effect.runSync(free(instance));

/**
 * Static method hashAndCreate of AddressContent
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const hashAndCreate: (addrType: CML.ByronAddrType, spendingData: CML.SpendingData, attributes: CML.AddrAttributes) => Effect.Effect<CML.AddressContent, AddressContentError> = Effect.fn(function* (addrType: CML.ByronAddrType, spendingData: CML.SpendingData, attributes: CML.AddrAttributes) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const hashAndCreateUnsafe = (addrType: CML.ByronAddrType, spendingData: CML.SpendingData, attributes: CML.AddrAttributes): CML.AddressContent =>
  Effect.runSync(hashAndCreate(addrType, spendingData, attributes));

/**
 * Static method newRedeem of AddressContent
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newRedeem: (pubkey: CML.PublicKey, protocolMagic: CML.ProtocolMagic) => Effect.Effect<CML.AddressContent, AddressContentError> = Effect.fn(function* (pubkey: CML.PublicKey, protocolMagic: CML.ProtocolMagic) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newRedeemUnsafe = (pubkey: CML.PublicKey, protocolMagic: CML.ProtocolMagic): CML.AddressContent =>
  Effect.runSync(newRedeem(pubkey, protocolMagic));

/**
 * Static method newSimple of AddressContent
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const newSimple: (xpub: CML.Bip32PublicKey, protocolMagic: CML.ProtocolMagic) => Effect.Effect<CML.AddressContent, AddressContentError> = Effect.fn(function* (xpub: CML.Bip32PublicKey, protocolMagic: CML.ProtocolMagic) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newSimpleUnsafe = (xpub: CML.Bip32PublicKey, protocolMagic: CML.ProtocolMagic): CML.AddressContent =>
  Effect.runSync(newSimple(xpub, protocolMagic));

/**
 * Method toAddress of AddressContent
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toAddress: (instance: CML.AddressContent) => Effect.Effect<CML.ByronAddress, AddressContentError> = Effect.fn(
  (instance: CML.AddressContent) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toAddressUnsafe = (instance: CML.AddressContent): CML.ByronAddress =>
  Effect.runSync(toAddress(instance));

/**
 * Method byronProtocolMagic of AddressContent
 * 
 * @since 2.0.0
 * @category Methods
 */
export const byronProtocolMagic: (instance: CML.AddressContent) => Effect.Effect<CML.ProtocolMagic, AddressContentError> = Effect.fn(
  (instance: CML.AddressContent) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const byronProtocolMagicUnsafe = (instance: CML.AddressContent): CML.ProtocolMagic =>
  Effect.runSync(byronProtocolMagic(instance));

/**
 * Method networkId of AddressContent
 * 
 * @since 2.0.0
 * @category Methods
 */
export const networkId: (instance: CML.AddressContent) => Effect.Effect<number, AddressContentError> = Effect.fn(
  (instance: CML.AddressContent) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const networkIdUnsafe = (instance: CML.AddressContent): number =>
  Effect.runSync(networkId(instance));

/**
 * Static method icarusFromKey of AddressContent
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const icarusFromKey: (key: CML.Bip32PublicKey, protocolMagic: CML.ProtocolMagic) => Effect.Effect<CML.AddressContent, AddressContentError> = Effect.fn(function* (key: CML.Bip32PublicKey, protocolMagic: CML.ProtocolMagic) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const icarusFromKeyUnsafe = (key: CML.Bip32PublicKey, protocolMagic: CML.ProtocolMagic): CML.AddressContent =>
  Effect.runSync(icarusFromKey(key, protocolMagic));

/**
 * Method identicalWithPubkey of AddressContent
 * 
 * @since 2.0.0
 * @category Methods
 */
export const identicalWithPubkey: (instance: CML.AddressContent, xpub: CML.Bip32PublicKey) => Effect.Effect<boolean, AddressContentError> = Effect.fn(
  (instance: CML.AddressContent, xpub: CML.Bip32PublicKey) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const identicalWithPubkeyUnsafe = (instance: CML.AddressContent, xpub: CML.Bip32PublicKey): boolean =>
  Effect.runSync(identicalWithPubkey(instance, xpub));

/**
 * Method toCborBytes of AddressContent
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.AddressContent) => Effect.Effect<Uint8Array, AddressContentError> = Effect.fn(
  (instance: CML.AddressContent) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.AddressContent): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of AddressContent
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.AddressContent, AddressContentError> = Effect.fn(function* (cborBytes: Uint8Array) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.AddressContent =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of AddressContent
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.AddressContent) => Effect.Effect<string, AddressContentError> = Effect.fn(
  (instance: CML.AddressContent) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.AddressContent): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of AddressContent
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.AddressContent, AddressContentError> = Effect.fn(function* (cborBytes: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.AddressContent =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method addressId of AddressContent
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addressId: (instance: CML.AddressContent) => Effect.Effect<CML.AddressId, AddressContentError> = Effect.fn(
  (instance: CML.AddressContent) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addressIdUnsafe = (instance: CML.AddressContent): CML.AddressId =>
  Effect.runSync(addressId(instance));

/**
 * Method addrAttributes of AddressContent
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addrAttributes: (instance: CML.AddressContent) => Effect.Effect<CML.AddrAttributes, AddressContentError> = Effect.fn(
  (instance: CML.AddressContent) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addrAttributesUnsafe = (instance: CML.AddressContent): CML.AddrAttributes =>
  Effect.runSync(addrAttributes(instance));

/**
 * Method addrType of AddressContent
 * 
 * @since 2.0.0
 * @category Methods
 */
export const addrType: (instance: CML.AddressContent) => Effect.Effect<CML.ByronAddrType, AddressContentError> = Effect.fn(
  (instance: CML.AddressContent) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addrTypeUnsafe = (instance: CML.AddressContent): CML.ByronAddrType =>
  Effect.runSync(addrType(instance));

/**
 * Static method _new of AddressContent
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (addressId: CML.AddressId, addrAttributes: CML.AddrAttributes, addrType: CML.ByronAddrType) => Effect.Effect<CML.AddressContent, AddressContentError> = Effect.fn(function* (addressId: CML.AddressId, addrAttributes: CML.AddrAttributes, addrType: CML.ByronAddrType) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (addressId: CML.AddressId, addrAttributes: CML.AddrAttributes, addrType: CML.ByronAddrType): CML.AddressContent =>
  Effect.runSync(_new(addressId, addrAttributes, addrType));

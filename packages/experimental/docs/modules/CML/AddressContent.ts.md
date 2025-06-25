---
title: CML/AddressContent.ts
nav_order: 10
parent: Modules
---

## AddressContent overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [hashAndCreate](#hashandcreate)
  - [icarusFromKey](#icarusfromkey)
  - [newRedeem](#newredeem)
  - [newSimple](#newsimple)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [hashAndCreateUnsafe](#hashandcreateunsafe)
  - [icarusFromKeyUnsafe](#icarusfromkeyunsafe)
  - [newRedeemUnsafe](#newredeemunsafe)
  - [newSimpleUnsafe](#newsimpleunsafe)
- [Errors](#errors)
  - [AddressContentError (class)](#addresscontenterror-class)
- [Methods](#methods)
  - [addrAttributes](#addrattributes)
  - [addrType](#addrtype)
  - [addressId](#addressid)
  - [byronProtocolMagic](#byronprotocolmagic)
  - [free](#free)
  - [identicalWithPubkey](#identicalwithpubkey)
  - [networkId](#networkid)
  - [toAddress](#toaddress)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
- [MethodsUnsafe](#methodsunsafe)
  - [addrAttributesUnsafe](#addrattributesunsafe)
  - [addrTypeUnsafe](#addrtypeunsafe)
  - [addressIdUnsafe](#addressidunsafe)
  - [byronProtocolMagicUnsafe](#byronprotocolmagicunsafe)
  - [freeUnsafe](#freeunsafe)
  - [identicalWithPubkeyUnsafe](#identicalwithpubkeyunsafe)
  - [networkIdUnsafe](#networkidunsafe)
  - [toAddressUnsafe](#toaddressunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
- [Types](#types)
  - [AddressContent (type alias)](#addresscontent-type-alias)

---

# Constructors

## \_new

Static method \_new of AddressContent

**Signature**

```ts
export declare const _new: (
  addressId: CML.AddressId,
  addrAttributes: CML.AddrAttributes,
  addrType: CML.ByronAddrType,
) => Effect.Effect<CML.AddressContent, AddressContentError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of AddressContent

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.AddressContent, AddressContentError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of AddressContent

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.AddressContent, AddressContentError>;
```

Added in v2.0.0

## hashAndCreate

Static method hashAndCreate of AddressContent

**Signature**

```ts
export declare const hashAndCreate: (
  addrType: CML.ByronAddrType,
  spendingData: CML.SpendingData,
  attributes: CML.AddrAttributes,
) => Effect.Effect<CML.AddressContent, AddressContentError>;
```

Added in v2.0.0

## icarusFromKey

Static method icarusFromKey of AddressContent

**Signature**

```ts
export declare const icarusFromKey: (
  key: CML.Bip32PublicKey,
  protocolMagic: CML.ProtocolMagic,
) => Effect.Effect<CML.AddressContent, AddressContentError>;
```

Added in v2.0.0

## newRedeem

Static method newRedeem of AddressContent

**Signature**

```ts
export declare const newRedeem: (
  pubkey: CML.PublicKey,
  protocolMagic: CML.ProtocolMagic,
) => Effect.Effect<CML.AddressContent, AddressContentError>;
```

Added in v2.0.0

## newSimple

Static method newSimple of AddressContent

**Signature**

```ts
export declare const newSimple: (
  xpub: CML.Bip32PublicKey,
  protocolMagic: CML.ProtocolMagic,
) => Effect.Effect<CML.AddressContent, AddressContentError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls AddressContent.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  addressId: CML.AddressId,
  addrAttributes: CML.AddrAttributes,
  addrType: CML.ByronAddrType,
) => CML.AddressContent;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls AddressContent.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.AddressContent;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls AddressContent.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.AddressContent;
```

Added in v2.0.0

## hashAndCreateUnsafe

Unsafely calls AddressContent.hashAndCreate without Effect wrapper

**Signature**

```ts
export declare const hashAndCreateUnsafe: (
  addrType: CML.ByronAddrType,
  spendingData: CML.SpendingData,
  attributes: CML.AddrAttributes,
) => CML.AddressContent;
```

Added in v2.0.0

## icarusFromKeyUnsafe

Unsafely calls AddressContent.icarusFromKey without Effect wrapper

**Signature**

```ts
export declare const icarusFromKeyUnsafe: (
  key: CML.Bip32PublicKey,
  protocolMagic: CML.ProtocolMagic,
) => CML.AddressContent;
```

Added in v2.0.0

## newRedeemUnsafe

Unsafely calls AddressContent.newRedeem without Effect wrapper

**Signature**

```ts
export declare const newRedeemUnsafe: (
  pubkey: CML.PublicKey,
  protocolMagic: CML.ProtocolMagic,
) => CML.AddressContent;
```

Added in v2.0.0

## newSimpleUnsafe

Unsafely calls AddressContent.newSimple without Effect wrapper

**Signature**

```ts
export declare const newSimpleUnsafe: (
  xpub: CML.Bip32PublicKey,
  protocolMagic: CML.ProtocolMagic,
) => CML.AddressContent;
```

Added in v2.0.0

# Errors

## AddressContentError (class)

Error class for AddressContent operations

This error is thrown when operations on AddressContent instances fail.

**Signature**

```ts
export declare class AddressContentError
```

Added in v2.0.0

# Methods

## addrAttributes

Method addrAttributes of AddressContent

**Signature**

```ts
export declare const addrAttributes: (
  instance: CML.AddressContent,
) => Effect.Effect<CML.AddrAttributes, AddressContentError>;
```

Added in v2.0.0

## addrType

Method addrType of AddressContent

**Signature**

```ts
export declare const addrType: (
  instance: CML.AddressContent,
) => Effect.Effect<CML.ByronAddrType, AddressContentError>;
```

Added in v2.0.0

## addressId

Method addressId of AddressContent

**Signature**

```ts
export declare const addressId: (
  instance: CML.AddressContent,
) => Effect.Effect<CML.AddressId, AddressContentError>;
```

Added in v2.0.0

## byronProtocolMagic

Method byronProtocolMagic of AddressContent

**Signature**

```ts
export declare const byronProtocolMagic: (
  instance: CML.AddressContent,
) => Effect.Effect<CML.ProtocolMagic, AddressContentError>;
```

Added in v2.0.0

## free

Method free of AddressContent

**Signature**

```ts
export declare const free: (
  instance: CML.AddressContent,
) => Effect.Effect<void, AddressContentError>;
```

Added in v2.0.0

## identicalWithPubkey

Method identicalWithPubkey of AddressContent

**Signature**

```ts
export declare const identicalWithPubkey: (
  instance: CML.AddressContent,
  xpub: CML.Bip32PublicKey,
) => Effect.Effect<boolean, AddressContentError>;
```

Added in v2.0.0

## networkId

Method networkId of AddressContent

**Signature**

```ts
export declare const networkId: (
  instance: CML.AddressContent,
) => Effect.Effect<number, AddressContentError>;
```

Added in v2.0.0

## toAddress

Method toAddress of AddressContent

**Signature**

```ts
export declare const toAddress: (
  instance: CML.AddressContent,
) => Effect.Effect<CML.ByronAddress, AddressContentError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of AddressContent

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.AddressContent,
) => Effect.Effect<Uint8Array, AddressContentError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of AddressContent

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.AddressContent,
) => Effect.Effect<string, AddressContentError>;
```

Added in v2.0.0

# MethodsUnsafe

## addrAttributesUnsafe

Unsafely calls instance.addrAttributes without Effect wrapper

**Signature**

```ts
export declare const addrAttributesUnsafe: (
  instance: CML.AddressContent,
) => CML.AddrAttributes;
```

Added in v2.0.0

## addrTypeUnsafe

Unsafely calls instance.addrType without Effect wrapper

**Signature**

```ts
export declare const addrTypeUnsafe: (
  instance: CML.AddressContent,
) => CML.ByronAddrType;
```

Added in v2.0.0

## addressIdUnsafe

Unsafely calls instance.addressId without Effect wrapper

**Signature**

```ts
export declare const addressIdUnsafe: (
  instance: CML.AddressContent,
) => CML.AddressId;
```

Added in v2.0.0

## byronProtocolMagicUnsafe

Unsafely calls instance.byronProtocolMagic without Effect wrapper

**Signature**

```ts
export declare const byronProtocolMagicUnsafe: (
  instance: CML.AddressContent,
) => CML.ProtocolMagic;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.AddressContent) => void;
```

Added in v2.0.0

## identicalWithPubkeyUnsafe

Unsafely calls instance.identicalWithPubkey without Effect wrapper

**Signature**

```ts
export declare const identicalWithPubkeyUnsafe: (
  instance: CML.AddressContent,
  xpub: CML.Bip32PublicKey,
) => boolean;
```

Added in v2.0.0

## networkIdUnsafe

Unsafely calls instance.networkId without Effect wrapper

**Signature**

```ts
export declare const networkIdUnsafe: (instance: CML.AddressContent) => number;
```

Added in v2.0.0

## toAddressUnsafe

Unsafely calls instance.toAddress without Effect wrapper

**Signature**

```ts
export declare const toAddressUnsafe: (
  instance: CML.AddressContent,
) => CML.ByronAddress;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.AddressContent,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.AddressContent) => string;
```

Added in v2.0.0

# Types

## AddressContent (type alias)

Type alias for the CML AddressContent class

**Signature**

```ts
export type AddressContent = CML.AddressContent;
```

Added in v2.0.0

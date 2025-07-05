---
title: CML/AddrAttributes.ts
nav_order: 8
parent: Modules
---

## AddrAttributes overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [newBootstrapEra](#newbootstrapera)
  - [newSingleKey](#newsinglekey)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [newBootstrapEraUnsafe](#newbootstraperaunsafe)
  - [newSingleKeyUnsafe](#newsinglekeyunsafe)
- [Errors](#errors)
  - [AddrAttributesError (class)](#addrattributeserror-class)
- [Methods](#methods)
  - [derivationPath](#derivationpath)
  - [free](#free)
  - [protocolMagic](#protocolmagic)
  - [setDerivationPath](#setderivationpath)
  - [setProtocolMagic](#setprotocolmagic)
  - [setStakeDistribution](#setstakedistribution)
  - [stakeDistribution](#stakedistribution)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
- [MethodsUnsafe](#methodsunsafe)
  - [derivationPathUnsafe](#derivationpathunsafe)
  - [freeUnsafe](#freeunsafe)
  - [protocolMagicUnsafe](#protocolmagicunsafe)
  - [setDerivationPathUnsafe](#setderivationpathunsafe)
  - [setProtocolMagicUnsafe](#setprotocolmagicunsafe)
  - [setStakeDistributionUnsafe](#setstakedistributionunsafe)
  - [stakeDistributionUnsafe](#stakedistributionunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
- [Types](#types)
  - [AddrAttributes (type alias)](#addrattributes-type-alias)

---

# Constructors

## \_new

Static method \_new of AddrAttributes

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.AddrAttributes,
  AddrAttributesError
>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of AddrAttributes

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.AddrAttributes, AddrAttributesError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of AddrAttributes

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.AddrAttributes, AddrAttributesError>;
```

Added in v2.0.0

## newBootstrapEra

Static method newBootstrapEra of AddrAttributes

**Signature**

```ts
export declare const newBootstrapEra: (
  hdap: CML.HDAddressPayload,
  protocolMagic: CML.ProtocolMagic,
) => Effect.Effect<CML.AddrAttributes, AddrAttributesError>;
```

Added in v2.0.0

## newSingleKey

Static method newSingleKey of AddrAttributes

**Signature**

```ts
export declare const newSingleKey: (
  pubk: CML.Bip32PublicKey,
  hdap: CML.HDAddressPayload | undefined,
  protocolMagic: CML.ProtocolMagic,
) => Effect.Effect<CML.AddrAttributes, AddrAttributesError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls AddrAttributes.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.AddrAttributes;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls AddrAttributes.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.AddrAttributes;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls AddrAttributes.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.AddrAttributes;
```

Added in v2.0.0

## newBootstrapEraUnsafe

Unsafely calls AddrAttributes.newBootstrapEra without Effect wrapper

**Signature**

```ts
export declare const newBootstrapEraUnsafe: (
  hdap: CML.HDAddressPayload,
  protocolMagic: CML.ProtocolMagic,
) => CML.AddrAttributes;
```

Added in v2.0.0

## newSingleKeyUnsafe

Unsafely calls AddrAttributes.newSingleKey without Effect wrapper

**Signature**

```ts
export declare const newSingleKeyUnsafe: (
  pubk: CML.Bip32PublicKey,
  hdap: CML.HDAddressPayload | undefined,
  protocolMagic: CML.ProtocolMagic,
) => CML.AddrAttributes;
```

Added in v2.0.0

# Errors

## AddrAttributesError (class)

Error class for AddrAttributes operations

This error is thrown when operations on AddrAttributes instances fail.

**Signature**

```ts
export declare class AddrAttributesError
```

Added in v2.0.0

# Methods

## derivationPath

Method derivationPath of AddrAttributes

**Signature**

```ts
export declare const derivationPath: (
  instance: CML.AddrAttributes,
) => Effect.Effect<CML.HDAddressPayload | undefined, AddrAttributesError>;
```

Added in v2.0.0

## free

Method free of AddrAttributes

**Signature**

```ts
export declare const free: (
  instance: CML.AddrAttributes,
) => Effect.Effect<void, AddrAttributesError>;
```

Added in v2.0.0

## protocolMagic

Method protocolMagic of AddrAttributes

**Signature**

```ts
export declare const protocolMagic: (
  instance: CML.AddrAttributes,
) => Effect.Effect<CML.ProtocolMagic | undefined, AddrAttributesError>;
```

Added in v2.0.0

## setDerivationPath

Method setDerivationPath of AddrAttributes

**Signature**

```ts
export declare const setDerivationPath: (
  instance: CML.AddrAttributes,
  derivationPath: CML.HDAddressPayload,
) => Effect.Effect<void, AddrAttributesError>;
```

Added in v2.0.0

## setProtocolMagic

Method setProtocolMagic of AddrAttributes

**Signature**

```ts
export declare const setProtocolMagic: (
  instance: CML.AddrAttributes,
  protocolMagic: CML.ProtocolMagic,
) => Effect.Effect<void, AddrAttributesError>;
```

Added in v2.0.0

## setStakeDistribution

Method setStakeDistribution of AddrAttributes

**Signature**

```ts
export declare const setStakeDistribution: (
  instance: CML.AddrAttributes,
  stakeDistribution: CML.StakeDistribution,
) => Effect.Effect<void, AddrAttributesError>;
```

Added in v2.0.0

## stakeDistribution

Method stakeDistribution of AddrAttributes

**Signature**

```ts
export declare const stakeDistribution: (
  instance: CML.AddrAttributes,
) => Effect.Effect<CML.StakeDistribution | undefined, AddrAttributesError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of AddrAttributes

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.AddrAttributes,
) => Effect.Effect<Uint8Array, AddrAttributesError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of AddrAttributes

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.AddrAttributes,
) => Effect.Effect<string, AddrAttributesError>;
```

Added in v2.0.0

# MethodsUnsafe

## derivationPathUnsafe

Unsafely calls instance.derivationPath without Effect wrapper

**Signature**

```ts
export declare const derivationPathUnsafe: (
  instance: CML.AddrAttributes,
) => CML.HDAddressPayload | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.AddrAttributes) => void;
```

Added in v2.0.0

## protocolMagicUnsafe

Unsafely calls instance.protocolMagic without Effect wrapper

**Signature**

```ts
export declare const protocolMagicUnsafe: (
  instance: CML.AddrAttributes,
) => CML.ProtocolMagic | undefined;
```

Added in v2.0.0

## setDerivationPathUnsafe

Unsafely calls instance.setDerivationPath without Effect wrapper

**Signature**

```ts
export declare const setDerivationPathUnsafe: (
  instance: CML.AddrAttributes,
  derivationPath: CML.HDAddressPayload,
) => void;
```

Added in v2.0.0

## setProtocolMagicUnsafe

Unsafely calls instance.setProtocolMagic without Effect wrapper

**Signature**

```ts
export declare const setProtocolMagicUnsafe: (
  instance: CML.AddrAttributes,
  protocolMagic: CML.ProtocolMagic,
) => void;
```

Added in v2.0.0

## setStakeDistributionUnsafe

Unsafely calls instance.setStakeDistribution without Effect wrapper

**Signature**

```ts
export declare const setStakeDistributionUnsafe: (
  instance: CML.AddrAttributes,
  stakeDistribution: CML.StakeDistribution,
) => void;
```

Added in v2.0.0

## stakeDistributionUnsafe

Unsafely calls instance.stakeDistribution without Effect wrapper

**Signature**

```ts
export declare const stakeDistributionUnsafe: (
  instance: CML.AddrAttributes,
) => CML.StakeDistribution | undefined;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.AddrAttributes,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.AddrAttributes) => string;
```

Added in v2.0.0

# Types

## AddrAttributes (type alias)

Type alias for the CML AddrAttributes class

**Signature**

```ts
export type AddrAttributes = CML.AddrAttributes;
```

Added in v2.0.0

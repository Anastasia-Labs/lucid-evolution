---
title: CML/SpendingData.ts
nav_order: 215
parent: Modules
---

## SpendingData overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [newSpendingDataPubKey](#newspendingdatapubkey)
  - [newSpendingDataRedeem](#newspendingdataredeem)
  - [newSpendingDataScript](#newspendingdatascript)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [newSpendingDataPubKeyUnsafe](#newspendingdatapubkeyunsafe)
  - [newSpendingDataRedeemUnsafe](#newspendingdataredeemunsafe)
  - [newSpendingDataScriptUnsafe](#newspendingdatascriptunsafe)
- [Errors](#errors)
  - [SpendingDataError (class)](#spendingdataerror-class)
- [Methods](#methods)
  - [asSpendingDataPubKey](#asspendingdatapubkey)
  - [asSpendingDataRedeem](#asspendingdataredeem)
  - [asSpendingDataScript](#asspendingdatascript)
  - [free](#free)
  - [kind](#kind)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
- [MethodsUnsafe](#methodsunsafe)
  - [asSpendingDataPubKeyUnsafe](#asspendingdatapubkeyunsafe)
  - [asSpendingDataRedeemUnsafe](#asspendingdataredeemunsafe)
  - [asSpendingDataScriptUnsafe](#asspendingdatascriptunsafe)
  - [freeUnsafe](#freeunsafe)
  - [kindUnsafe](#kindunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
- [Types](#types)
  - [SpendingData (type alias)](#spendingdata-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of SpendingData

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.SpendingData, SpendingDataError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of SpendingData

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.SpendingData, SpendingDataError>
```

Added in v2.0.0

## newSpendingDataPubKey

Static method newSpendingDataPubKey of SpendingData

**Signature**

```ts
export declare const newSpendingDataPubKey: (
  pubkey: CML.Bip32PublicKey
) => Effect.Effect<CML.SpendingData, SpendingDataError>
```

Added in v2.0.0

## newSpendingDataRedeem

Static method newSpendingDataRedeem of SpendingData

**Signature**

```ts
export declare const newSpendingDataRedeem: (
  redeem: CML.PublicKey
) => Effect.Effect<CML.SpendingData, SpendingDataError>
```

Added in v2.0.0

## newSpendingDataScript

Static method newSpendingDataScript of SpendingData

**Signature**

```ts
export declare const newSpendingDataScript: (
  script: CML.ByronScript
) => Effect.Effect<CML.SpendingData, SpendingDataError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls SpendingData.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.SpendingData
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls SpendingData.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.SpendingData
```

Added in v2.0.0

## newSpendingDataPubKeyUnsafe

Unsafely calls SpendingData.newSpendingDataPubKey without Effect wrapper

**Signature**

```ts
export declare const newSpendingDataPubKeyUnsafe: (pubkey: CML.Bip32PublicKey) => CML.SpendingData
```

Added in v2.0.0

## newSpendingDataRedeemUnsafe

Unsafely calls SpendingData.newSpendingDataRedeem without Effect wrapper

**Signature**

```ts
export declare const newSpendingDataRedeemUnsafe: (redeem: CML.PublicKey) => CML.SpendingData
```

Added in v2.0.0

## newSpendingDataScriptUnsafe

Unsafely calls SpendingData.newSpendingDataScript without Effect wrapper

**Signature**

```ts
export declare const newSpendingDataScriptUnsafe: (script: CML.ByronScript) => CML.SpendingData
```

Added in v2.0.0

# Errors

## SpendingDataError (class)

Error class for SpendingData operations

This error is thrown when operations on SpendingData instances fail.

**Signature**

```ts
export declare class SpendingDataError
```

Added in v2.0.0

# Methods

## asSpendingDataPubKey

Method asSpendingDataPubKey of SpendingData

**Signature**

```ts
export declare const asSpendingDataPubKey: (
  instance: CML.SpendingData
) => Effect.Effect<CML.Bip32PublicKey | undefined, SpendingDataError>
```

Added in v2.0.0

## asSpendingDataRedeem

Method asSpendingDataRedeem of SpendingData

**Signature**

```ts
export declare const asSpendingDataRedeem: (
  instance: CML.SpendingData
) => Effect.Effect<CML.PublicKey | undefined, SpendingDataError>
```

Added in v2.0.0

## asSpendingDataScript

Method asSpendingDataScript of SpendingData

**Signature**

```ts
export declare const asSpendingDataScript: (
  instance: CML.SpendingData
) => Effect.Effect<CML.ByronScript | undefined, SpendingDataError>
```

Added in v2.0.0

## free

Method free of SpendingData

**Signature**

```ts
export declare const free: (instance: CML.SpendingData) => Effect.Effect<void, SpendingDataError>
```

Added in v2.0.0

## kind

Method kind of SpendingData

**Signature**

```ts
export declare const kind: (instance: CML.SpendingData) => Effect.Effect<CML.SpendingDataKind, SpendingDataError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of SpendingData

**Signature**

```ts
export declare const toCborBytes: (instance: CML.SpendingData) => Effect.Effect<Uint8Array, SpendingDataError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of SpendingData

**Signature**

```ts
export declare const toCborHex: (instance: CML.SpendingData) => Effect.Effect<string, SpendingDataError>
```

Added in v2.0.0

# MethodsUnsafe

## asSpendingDataPubKeyUnsafe

Unsafely calls instance.asSpendingDataPubKey without Effect wrapper

**Signature**

```ts
export declare const asSpendingDataPubKeyUnsafe: (instance: CML.SpendingData) => CML.Bip32PublicKey | undefined
```

Added in v2.0.0

## asSpendingDataRedeemUnsafe

Unsafely calls instance.asSpendingDataRedeem without Effect wrapper

**Signature**

```ts
export declare const asSpendingDataRedeemUnsafe: (instance: CML.SpendingData) => CML.PublicKey | undefined
```

Added in v2.0.0

## asSpendingDataScriptUnsafe

Unsafely calls instance.asSpendingDataScript without Effect wrapper

**Signature**

```ts
export declare const asSpendingDataScriptUnsafe: (instance: CML.SpendingData) => CML.ByronScript | undefined
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.SpendingData) => void
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (instance: CML.SpendingData) => CML.SpendingDataKind
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.SpendingData) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.SpendingData) => string
```

Added in v2.0.0

# Types

## SpendingData (type alias)

Type alias for the CML SpendingData class

**Signature**

```ts
export type SpendingData = CML.SpendingData
```

Added in v2.0.0

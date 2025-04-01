---
title: CML/Value.ts
nav_order: 273
parent: Modules
---

## Value overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromCoin](#fromcoin)
  - [fromJson](#fromjson)
  - [zero](#zero)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromCoinUnsafe](#fromcoinunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [zeroUnsafe](#zerounsafe)
- [Errors](#errors)
  - [ValueError (class)](#valueerror-class)
- [Methods](#methods)
  - [checkedAdd](#checkedadd)
  - [checkedSub](#checkedsub)
  - [clampedSub](#clampedsub)
  - [coin](#coin)
  - [free](#free)
  - [hasMultiassets](#hasmultiassets)
  - [isZero](#iszero)
  - [multiAsset](#multiasset)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [checkedAddUnsafe](#checkedaddunsafe)
  - [checkedSubUnsafe](#checkedsubunsafe)
  - [clampedSubUnsafe](#clampedsubunsafe)
  - [coinUnsafe](#coinunsafe)
  - [freeUnsafe](#freeunsafe)
  - [hasMultiassetsUnsafe](#hasmultiassetsunsafe)
  - [isZeroUnsafe](#iszerounsafe)
  - [multiAssetUnsafe](#multiassetunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [Value (type alias)](#value-type-alias)

---

# Constructors

## \_new

Static method \_new of Value

**Signature**

```ts
export declare const _new: (coin: bigint, multiasset: CML.MultiAsset) => Effect.Effect<CML.Value, ValueError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of Value

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.Value, ValueError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Value

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.Value, ValueError>
```

Added in v2.0.0

## fromCoin

Static method fromCoin of Value

**Signature**

```ts
export declare const fromCoin: (coin: bigint) => Effect.Effect<CML.Value, ValueError>
```

Added in v2.0.0

## fromJson

Static method fromJson of Value

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.Value, ValueError>
```

Added in v2.0.0

## zero

Static method zero of Value

**Signature**

```ts
export declare const zero: () => Effect.Effect<CML.Value, ValueError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls Value.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (coin: bigint, multiasset: CML.MultiAsset) => CML.Value
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls Value.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.Value
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Value.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Value
```

Added in v2.0.0

## fromCoinUnsafe

Unsafely calls Value.fromCoin without Effect wrapper

**Signature**

```ts
export declare const fromCoinUnsafe: (coin: bigint) => CML.Value
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Value.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Value
```

Added in v2.0.0

## zeroUnsafe

Unsafely calls Value.zero without Effect wrapper

**Signature**

```ts
export declare const zeroUnsafe: () => CML.Value
```

Added in v2.0.0

# Errors

## ValueError (class)

Error class for Value operations

This error is thrown when operations on Value instances fail.

**Signature**

```ts
export declare class ValueError
```

Added in v2.0.0

# Methods

## checkedAdd

Method checkedAdd of Value

**Signature**

```ts
export declare const checkedAdd: (instance: CML.Value, rhs: CML.Value) => Effect.Effect<CML.Value, ValueError>
```

Added in v2.0.0

## checkedSub

Method checkedSub of Value

**Signature**

```ts
export declare const checkedSub: (instance: CML.Value, rhs: CML.Value) => Effect.Effect<CML.Value, ValueError>
```

Added in v2.0.0

## clampedSub

Method clampedSub of Value

**Signature**

```ts
export declare const clampedSub: (instance: CML.Value, rhs: CML.Value) => Effect.Effect<CML.Value, ValueError>
```

Added in v2.0.0

## coin

Method coin of Value

**Signature**

```ts
export declare const coin: (instance: CML.Value) => Effect.Effect<bigint, ValueError>
```

Added in v2.0.0

## free

Method free of Value

**Signature**

```ts
export declare const free: (instance: CML.Value) => Effect.Effect<void, ValueError>
```

Added in v2.0.0

## hasMultiassets

Method hasMultiassets of Value

**Signature**

```ts
export declare const hasMultiassets: (instance: CML.Value) => Effect.Effect<boolean, ValueError>
```

Added in v2.0.0

## isZero

Method isZero of Value

**Signature**

```ts
export declare const isZero: (instance: CML.Value) => Effect.Effect<boolean, ValueError>
```

Added in v2.0.0

## multiAsset

Method multiAsset of Value

**Signature**

```ts
export declare const multiAsset: (instance: CML.Value) => Effect.Effect<CML.MultiAsset, ValueError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Value

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.Value) => Effect.Effect<Uint8Array, ValueError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Value

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.Value) => Effect.Effect<string, ValueError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Value

**Signature**

```ts
export declare const toCborBytes: (instance: CML.Value) => Effect.Effect<Uint8Array, ValueError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of Value

**Signature**

```ts
export declare const toCborHex: (instance: CML.Value) => Effect.Effect<string, ValueError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of Value

**Signature**

```ts
export declare const toJsValue: (instance: CML.Value) => Effect.Effect<any, ValueError>
```

Added in v2.0.0

## toJson

Method toJson of Value

**Signature**

```ts
export declare const toJson: (instance: CML.Value) => Effect.Effect<string, ValueError>
```

Added in v2.0.0

# MethodsUnsafe

## checkedAddUnsafe

Unsafely calls instance.checkedAdd without Effect wrapper

**Signature**

```ts
export declare const checkedAddUnsafe: (instance: CML.Value, rhs: CML.Value) => CML.Value
```

Added in v2.0.0

## checkedSubUnsafe

Unsafely calls instance.checkedSub without Effect wrapper

**Signature**

```ts
export declare const checkedSubUnsafe: (instance: CML.Value, rhs: CML.Value) => CML.Value
```

Added in v2.0.0

## clampedSubUnsafe

Unsafely calls instance.clampedSub without Effect wrapper

**Signature**

```ts
export declare const clampedSubUnsafe: (instance: CML.Value, rhs: CML.Value) => CML.Value
```

Added in v2.0.0

## coinUnsafe

Unsafely calls instance.coin without Effect wrapper

**Signature**

```ts
export declare const coinUnsafe: (instance: CML.Value) => bigint
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Value) => void
```

Added in v2.0.0

## hasMultiassetsUnsafe

Unsafely calls instance.hasMultiassets without Effect wrapper

**Signature**

```ts
export declare const hasMultiassetsUnsafe: (instance: CML.Value) => boolean
```

Added in v2.0.0

## isZeroUnsafe

Unsafely calls instance.isZero without Effect wrapper

**Signature**

```ts
export declare const isZeroUnsafe: (instance: CML.Value) => boolean
```

Added in v2.0.0

## multiAssetUnsafe

Unsafely calls instance.multiAsset without Effect wrapper

**Signature**

```ts
export declare const multiAssetUnsafe: (instance: CML.Value) => CML.MultiAsset
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.Value) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.Value) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.Value) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Value) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Value) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Value) => string
```

Added in v2.0.0

# Types

## Value (type alias)

Type alias for the CML Value class

**Signature**

```ts
export type Value = CML.Value
```

Added in v2.0.0

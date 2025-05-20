---
title: CML/LegacyRedeemer.ts
nav_order: 120
parent: Modules
---

## LegacyRedeemer overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
- [Errors](#errors)
  - [LegacyRedeemerError (class)](#legacyredeemererror-class)
- [Methods](#methods)
  - [data](#data)
  - [exUnits](#exunits)
  - [free](#free)
  - [index](#index)
  - [tag](#tag)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [dataUnsafe](#dataunsafe)
  - [exUnitsUnsafe](#exunitsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [indexUnsafe](#indexunsafe)
  - [tagUnsafe](#tagunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [LegacyRedeemer (type alias)](#legacyredeemer-type-alias)

---

# Constructors

## \_new

Static method \_new of LegacyRedeemer

**Signature**

```ts
export declare const _new: (
  tag: CML.RedeemerTag,
  index: bigint,
  data: CML.PlutusData,
  exUnits: CML.ExUnits
) => Effect.Effect<CML.LegacyRedeemer, LegacyRedeemerError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of LegacyRedeemer

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.LegacyRedeemer, LegacyRedeemerError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of LegacyRedeemer

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.LegacyRedeemer, LegacyRedeemerError>
```

Added in v2.0.0

## fromJson

Static method fromJson of LegacyRedeemer

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.LegacyRedeemer, LegacyRedeemerError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls LegacyRedeemer.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  tag: CML.RedeemerTag,
  index: bigint,
  data: CML.PlutusData,
  exUnits: CML.ExUnits
) => CML.LegacyRedeemer
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls LegacyRedeemer.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.LegacyRedeemer
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls LegacyRedeemer.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.LegacyRedeemer
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls LegacyRedeemer.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.LegacyRedeemer
```

Added in v2.0.0

# Errors

## LegacyRedeemerError (class)

Error class for LegacyRedeemer operations

This error is thrown when operations on LegacyRedeemer instances fail.

**Signature**

```ts
export declare class LegacyRedeemerError
```

Added in v2.0.0

# Methods

## data

Method data of LegacyRedeemer

**Signature**

```ts
export declare const data: (instance: CML.LegacyRedeemer) => Effect.Effect<CML.PlutusData, LegacyRedeemerError>
```

Added in v2.0.0

## exUnits

Method exUnits of LegacyRedeemer

**Signature**

```ts
export declare const exUnits: (instance: CML.LegacyRedeemer) => Effect.Effect<CML.ExUnits, LegacyRedeemerError>
```

Added in v2.0.0

## free

Method free of LegacyRedeemer

**Signature**

```ts
export declare const free: (instance: CML.LegacyRedeemer) => Effect.Effect<void, LegacyRedeemerError>
```

Added in v2.0.0

## index

Method index of LegacyRedeemer

**Signature**

```ts
export declare const index: (instance: CML.LegacyRedeemer) => Effect.Effect<bigint, LegacyRedeemerError>
```

Added in v2.0.0

## tag

Method tag of LegacyRedeemer

**Signature**

```ts
export declare const tag: (instance: CML.LegacyRedeemer) => Effect.Effect<CML.RedeemerTag, LegacyRedeemerError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of LegacyRedeemer

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.LegacyRedeemer
) => Effect.Effect<Uint8Array, LegacyRedeemerError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of LegacyRedeemer

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.LegacyRedeemer) => Effect.Effect<string, LegacyRedeemerError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of LegacyRedeemer

**Signature**

```ts
export declare const toCborBytes: (instance: CML.LegacyRedeemer) => Effect.Effect<Uint8Array, LegacyRedeemerError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of LegacyRedeemer

**Signature**

```ts
export declare const toCborHex: (instance: CML.LegacyRedeemer) => Effect.Effect<string, LegacyRedeemerError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of LegacyRedeemer

**Signature**

```ts
export declare const toJsValue: (instance: CML.LegacyRedeemer) => Effect.Effect<any, LegacyRedeemerError>
```

Added in v2.0.0

## toJson

Method toJson of LegacyRedeemer

**Signature**

```ts
export declare const toJson: (instance: CML.LegacyRedeemer) => Effect.Effect<string, LegacyRedeemerError>
```

Added in v2.0.0

# MethodsUnsafe

## dataUnsafe

Unsafely calls instance.data without Effect wrapper

**Signature**

```ts
export declare const dataUnsafe: (instance: CML.LegacyRedeemer) => CML.PlutusData
```

Added in v2.0.0

## exUnitsUnsafe

Unsafely calls instance.exUnits without Effect wrapper

**Signature**

```ts
export declare const exUnitsUnsafe: (instance: CML.LegacyRedeemer) => CML.ExUnits
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.LegacyRedeemer) => void
```

Added in v2.0.0

## indexUnsafe

Unsafely calls instance.index without Effect wrapper

**Signature**

```ts
export declare const indexUnsafe: (instance: CML.LegacyRedeemer) => bigint
```

Added in v2.0.0

## tagUnsafe

Unsafely calls instance.tag without Effect wrapper

**Signature**

```ts
export declare const tagUnsafe: (instance: CML.LegacyRedeemer) => CML.RedeemerTag
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.LegacyRedeemer) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.LegacyRedeemer) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.LegacyRedeemer) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.LegacyRedeemer) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.LegacyRedeemer) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.LegacyRedeemer) => string
```

Added in v2.0.0

# Types

## LegacyRedeemer (type alias)

Type alias for the CML LegacyRedeemer class

**Signature**

```ts
export type LegacyRedeemer = CML.LegacyRedeemer
```

Added in v2.0.0

---
title: CML/Redeemers.ts
nav_order: 185
parent: Modules
---

## Redeemers overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [newArrLegacyRedeemer](#newarrlegacyredeemer)
  - [newMapRedeemerKeyToRedeemerVal](#newmapredeemerkeytoredeemerval)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [newArrLegacyRedeemerUnsafe](#newarrlegacyredeemerunsafe)
  - [newMapRedeemerKeyToRedeemerValUnsafe](#newmapredeemerkeytoredeemervalunsafe)
- [Errors](#errors)
  - [RedeemersError (class)](#redeemerserror-class)
- [Methods](#methods)
  - [asArrLegacyRedeemer](#asarrlegacyredeemer)
  - [asMapRedeemerKeyToRedeemerVal](#asmapredeemerkeytoredeemerval)
  - [free](#free)
  - [kind](#kind)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toFlatFormat](#toflatformat)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [asArrLegacyRedeemerUnsafe](#asarrlegacyredeemerunsafe)
  - [asMapRedeemerKeyToRedeemerValUnsafe](#asmapredeemerkeytoredeemervalunsafe)
  - [freeUnsafe](#freeunsafe)
  - [kindUnsafe](#kindunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toFlatFormatUnsafe](#toflatformatunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [Redeemers (type alias)](#redeemers-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of Redeemers

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.Redeemers, RedeemersError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Redeemers

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.Redeemers, RedeemersError>
```

Added in v2.0.0

## fromJson

Static method fromJson of Redeemers

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.Redeemers, RedeemersError>
```

Added in v2.0.0

## newArrLegacyRedeemer

Static method newArrLegacyRedeemer of Redeemers

**Signature**

```ts
export declare const newArrLegacyRedeemer: (
  arrLegacyRedeemer: CML.LegacyRedeemerList
) => Effect.Effect<CML.Redeemers, RedeemersError>
```

Added in v2.0.0

## newMapRedeemerKeyToRedeemerVal

Static method newMapRedeemerKeyToRedeemerVal of Redeemers

**Signature**

```ts
export declare const newMapRedeemerKeyToRedeemerVal: (
  mapRedeemerKeyToRedeemerVal: CML.MapRedeemerKeyToRedeemerVal
) => Effect.Effect<CML.Redeemers, RedeemersError>
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls Redeemers.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.Redeemers
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Redeemers.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Redeemers
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Redeemers.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Redeemers
```

Added in v2.0.0

## newArrLegacyRedeemerUnsafe

Unsafely calls Redeemers.newArrLegacyRedeemer without Effect wrapper

**Signature**

```ts
export declare const newArrLegacyRedeemerUnsafe: (arrLegacyRedeemer: CML.LegacyRedeemerList) => CML.Redeemers
```

Added in v2.0.0

## newMapRedeemerKeyToRedeemerValUnsafe

Unsafely calls Redeemers.newMapRedeemerKeyToRedeemerVal without Effect wrapper

**Signature**

```ts
export declare const newMapRedeemerKeyToRedeemerValUnsafe: (
  mapRedeemerKeyToRedeemerVal: CML.MapRedeemerKeyToRedeemerVal
) => CML.Redeemers
```

Added in v2.0.0

# Errors

## RedeemersError (class)

Error class for Redeemers operations

This error is thrown when operations on Redeemers instances fail.

**Signature**

```ts
export declare class RedeemersError
```

Added in v2.0.0

# Methods

## asArrLegacyRedeemer

Method asArrLegacyRedeemer of Redeemers

**Signature**

```ts
export declare const asArrLegacyRedeemer: (
  instance: CML.Redeemers
) => Effect.Effect<CML.LegacyRedeemerList | undefined, RedeemersError>
```

Added in v2.0.0

## asMapRedeemerKeyToRedeemerVal

Method asMapRedeemerKeyToRedeemerVal of Redeemers

**Signature**

```ts
export declare const asMapRedeemerKeyToRedeemerVal: (
  instance: CML.Redeemers
) => Effect.Effect<CML.MapRedeemerKeyToRedeemerVal | undefined, RedeemersError>
```

Added in v2.0.0

## free

Method free of Redeemers

**Signature**

```ts
export declare const free: (instance: CML.Redeemers) => Effect.Effect<void, RedeemersError>
```

Added in v2.0.0

## kind

Method kind of Redeemers

**Signature**

```ts
export declare const kind: (instance: CML.Redeemers) => Effect.Effect<CML.RedeemersKind, RedeemersError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Redeemers

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.Redeemers) => Effect.Effect<Uint8Array, RedeemersError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Redeemers

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.Redeemers) => Effect.Effect<string, RedeemersError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Redeemers

**Signature**

```ts
export declare const toCborBytes: (instance: CML.Redeemers) => Effect.Effect<Uint8Array, RedeemersError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of Redeemers

**Signature**

```ts
export declare const toCborHex: (instance: CML.Redeemers) => Effect.Effect<string, RedeemersError>
```

Added in v2.0.0

## toFlatFormat

Method toFlatFormat of Redeemers

**Signature**

```ts
export declare const toFlatFormat: (instance: CML.Redeemers) => Effect.Effect<CML.LegacyRedeemerList, RedeemersError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of Redeemers

**Signature**

```ts
export declare const toJsValue: (instance: CML.Redeemers) => Effect.Effect<any, RedeemersError>
```

Added in v2.0.0

## toJson

Method toJson of Redeemers

**Signature**

```ts
export declare const toJson: (instance: CML.Redeemers) => Effect.Effect<string, RedeemersError>
```

Added in v2.0.0

# MethodsUnsafe

## asArrLegacyRedeemerUnsafe

Unsafely calls instance.asArrLegacyRedeemer without Effect wrapper

**Signature**

```ts
export declare const asArrLegacyRedeemerUnsafe: (instance: CML.Redeemers) => CML.LegacyRedeemerList | undefined
```

Added in v2.0.0

## asMapRedeemerKeyToRedeemerValUnsafe

Unsafely calls instance.asMapRedeemerKeyToRedeemerVal without Effect wrapper

**Signature**

```ts
export declare const asMapRedeemerKeyToRedeemerValUnsafe: (
  instance: CML.Redeemers
) => CML.MapRedeemerKeyToRedeemerVal | undefined
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Redeemers) => void
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (instance: CML.Redeemers) => CML.RedeemersKind
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.Redeemers) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.Redeemers) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.Redeemers) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Redeemers) => string
```

Added in v2.0.0

## toFlatFormatUnsafe

Unsafely calls instance.toFlatFormat without Effect wrapper

**Signature**

```ts
export declare const toFlatFormatUnsafe: (instance: CML.Redeemers) => CML.LegacyRedeemerList
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Redeemers) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Redeemers) => string
```

Added in v2.0.0

# Types

## Redeemers (type alias)

Type alias for the CML Redeemers class

**Signature**

```ts
export type Redeemers = CML.Redeemers
```

Added in v2.0.0

---
title: CML/RedeemerVal.ts
nav_order: 188
parent: Modules
---

## RedeemerVal overview

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
  - [RedeemerValError (class)](#redeemervalerror-class)
- [Methods](#methods)
  - [data](#data)
  - [exUnits](#exunits)
  - [free](#free)
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
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [RedeemerVal (type alias)](#redeemerval-type-alias)

---

# Constructors

## \_new

Static method \_new of RedeemerVal

**Signature**

```ts
export declare const _new: (
  data: CML.PlutusData,
  exUnits: CML.ExUnits
) => Effect.Effect<CML.RedeemerVal, RedeemerValError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of RedeemerVal

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.RedeemerVal, RedeemerValError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of RedeemerVal

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.RedeemerVal, RedeemerValError>
```

Added in v2.0.0

## fromJson

Static method fromJson of RedeemerVal

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.RedeemerVal, RedeemerValError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls RedeemerVal.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (data: CML.PlutusData, exUnits: CML.ExUnits) => CML.RedeemerVal
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls RedeemerVal.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.RedeemerVal
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls RedeemerVal.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.RedeemerVal
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls RedeemerVal.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.RedeemerVal
```

Added in v2.0.0

# Errors

## RedeemerValError (class)

Error class for RedeemerVal operations

This error is thrown when operations on RedeemerVal instances fail.

**Signature**

```ts
export declare class RedeemerValError
```

Added in v2.0.0

# Methods

## data

Method data of RedeemerVal

**Signature**

```ts
export declare const data: (instance: CML.RedeemerVal) => Effect.Effect<CML.PlutusData, RedeemerValError>
```

Added in v2.0.0

## exUnits

Method exUnits of RedeemerVal

**Signature**

```ts
export declare const exUnits: (instance: CML.RedeemerVal) => Effect.Effect<CML.ExUnits, RedeemerValError>
```

Added in v2.0.0

## free

Method free of RedeemerVal

**Signature**

```ts
export declare const free: (instance: CML.RedeemerVal) => Effect.Effect<void, RedeemerValError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of RedeemerVal

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.RedeemerVal) => Effect.Effect<Uint8Array, RedeemerValError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of RedeemerVal

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.RedeemerVal) => Effect.Effect<string, RedeemerValError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of RedeemerVal

**Signature**

```ts
export declare const toCborBytes: (instance: CML.RedeemerVal) => Effect.Effect<Uint8Array, RedeemerValError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of RedeemerVal

**Signature**

```ts
export declare const toCborHex: (instance: CML.RedeemerVal) => Effect.Effect<string, RedeemerValError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of RedeemerVal

**Signature**

```ts
export declare const toJsValue: (instance: CML.RedeemerVal) => Effect.Effect<any, RedeemerValError>
```

Added in v2.0.0

## toJson

Method toJson of RedeemerVal

**Signature**

```ts
export declare const toJson: (instance: CML.RedeemerVal) => Effect.Effect<string, RedeemerValError>
```

Added in v2.0.0

# MethodsUnsafe

## dataUnsafe

Unsafely calls instance.data without Effect wrapper

**Signature**

```ts
export declare const dataUnsafe: (instance: CML.RedeemerVal) => CML.PlutusData
```

Added in v2.0.0

## exUnitsUnsafe

Unsafely calls instance.exUnits without Effect wrapper

**Signature**

```ts
export declare const exUnitsUnsafe: (instance: CML.RedeemerVal) => CML.ExUnits
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.RedeemerVal) => void
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.RedeemerVal) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.RedeemerVal) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.RedeemerVal) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.RedeemerVal) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.RedeemerVal) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.RedeemerVal) => string
```

Added in v2.0.0

# Types

## RedeemerVal (type alias)

Type alias for the CML RedeemerVal class

**Signature**

```ts
export type RedeemerVal = CML.RedeemerVal
```

Added in v2.0.0

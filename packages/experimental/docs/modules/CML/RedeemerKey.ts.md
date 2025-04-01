---
title: CML/RedeemerKey.ts
nav_order: 178
parent: Modules
---

## RedeemerKey overview

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
  - [RedeemerKeyError (class)](#redeemerkeyerror-class)
- [Methods](#methods)
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
  - [RedeemerKey (type alias)](#redeemerkey-type-alias)

---

# Constructors

## \_new

Static method \_new of RedeemerKey

**Signature**

```ts
export declare const _new: (tag: CML.RedeemerTag, index: bigint) => Effect.Effect<CML.RedeemerKey, RedeemerKeyError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of RedeemerKey

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.RedeemerKey, RedeemerKeyError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of RedeemerKey

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.RedeemerKey, RedeemerKeyError>
```

Added in v2.0.0

## fromJson

Static method fromJson of RedeemerKey

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.RedeemerKey, RedeemerKeyError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls RedeemerKey.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (tag: CML.RedeemerTag, index: bigint) => CML.RedeemerKey
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls RedeemerKey.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.RedeemerKey
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls RedeemerKey.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.RedeemerKey
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls RedeemerKey.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.RedeemerKey
```

Added in v2.0.0

# Errors

## RedeemerKeyError (class)

Error class for RedeemerKey operations

This error is thrown when operations on RedeemerKey instances fail.

**Signature**

```ts
export declare class RedeemerKeyError
```

Added in v2.0.0

# Methods

## free

Method free of RedeemerKey

**Signature**

```ts
export declare const free: (instance: CML.RedeemerKey) => Effect.Effect<void, RedeemerKeyError>
```

Added in v2.0.0

## index

Method index of RedeemerKey

**Signature**

```ts
export declare const index: (instance: CML.RedeemerKey) => Effect.Effect<bigint, RedeemerKeyError>
```

Added in v2.0.0

## tag

Method tag of RedeemerKey

**Signature**

```ts
export declare const tag: (instance: CML.RedeemerKey) => Effect.Effect<CML.RedeemerTag, RedeemerKeyError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of RedeemerKey

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.RedeemerKey) => Effect.Effect<Uint8Array, RedeemerKeyError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of RedeemerKey

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.RedeemerKey) => Effect.Effect<string, RedeemerKeyError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of RedeemerKey

**Signature**

```ts
export declare const toCborBytes: (instance: CML.RedeemerKey) => Effect.Effect<Uint8Array, RedeemerKeyError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of RedeemerKey

**Signature**

```ts
export declare const toCborHex: (instance: CML.RedeemerKey) => Effect.Effect<string, RedeemerKeyError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of RedeemerKey

**Signature**

```ts
export declare const toJsValue: (instance: CML.RedeemerKey) => Effect.Effect<any, RedeemerKeyError>
```

Added in v2.0.0

## toJson

Method toJson of RedeemerKey

**Signature**

```ts
export declare const toJson: (instance: CML.RedeemerKey) => Effect.Effect<string, RedeemerKeyError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.RedeemerKey) => void
```

Added in v2.0.0

## indexUnsafe

Unsafely calls instance.index without Effect wrapper

**Signature**

```ts
export declare const indexUnsafe: (instance: CML.RedeemerKey) => bigint
```

Added in v2.0.0

## tagUnsafe

Unsafely calls instance.tag without Effect wrapper

**Signature**

```ts
export declare const tagUnsafe: (instance: CML.RedeemerKey) => CML.RedeemerTag
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.RedeemerKey) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.RedeemerKey) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.RedeemerKey) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.RedeemerKey) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.RedeemerKey) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.RedeemerKey) => string
```

Added in v2.0.0

# Types

## RedeemerKey (type alias)

Type alias for the CML RedeemerKey class

**Signature**

```ts
export type RedeemerKey = CML.RedeemerKey
```

Added in v2.0.0

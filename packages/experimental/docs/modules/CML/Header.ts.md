---
title: CML/Header.ts
nav_order: 107
parent: Modules
---

## Header overview

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
  - [HeaderError (class)](#headererror-class)
- [Methods](#methods)
  - [bodySignature](#bodysignature)
  - [free](#free)
  - [headerBody](#headerbody)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [bodySignatureUnsafe](#bodysignatureunsafe)
  - [freeUnsafe](#freeunsafe)
  - [headerBodyUnsafe](#headerbodyunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [Header (type alias)](#header-type-alias)

---

# Constructors

## \_new

Static method \_new of Header

**Signature**

```ts
export declare const _new: (
  headerBody: CML.HeaderBody,
  bodySignature: CML.KESSignature
) => Effect.Effect<CML.Header, HeaderError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of Header

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.Header, HeaderError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Header

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.Header, HeaderError>
```

Added in v2.0.0

## fromJson

Static method fromJson of Header

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.Header, HeaderError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls Header.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (headerBody: CML.HeaderBody, bodySignature: CML.KESSignature) => CML.Header
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls Header.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.Header
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Header.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Header
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Header.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Header
```

Added in v2.0.0

# Errors

## HeaderError (class)

Error class for Header operations

This error is thrown when operations on Header instances fail.

**Signature**

```ts
export declare class HeaderError
```

Added in v2.0.0

# Methods

## bodySignature

Method bodySignature of Header

**Signature**

```ts
export declare const bodySignature: (instance: CML.Header) => Effect.Effect<CML.KESSignature, HeaderError>
```

Added in v2.0.0

## free

Method free of Header

**Signature**

```ts
export declare const free: (instance: CML.Header) => Effect.Effect<void, HeaderError>
```

Added in v2.0.0

## headerBody

Method headerBody of Header

**Signature**

```ts
export declare const headerBody: (instance: CML.Header) => Effect.Effect<CML.HeaderBody, HeaderError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Header

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.Header) => Effect.Effect<Uint8Array, HeaderError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Header

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.Header) => Effect.Effect<string, HeaderError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Header

**Signature**

```ts
export declare const toCborBytes: (instance: CML.Header) => Effect.Effect<Uint8Array, HeaderError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of Header

**Signature**

```ts
export declare const toCborHex: (instance: CML.Header) => Effect.Effect<string, HeaderError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of Header

**Signature**

```ts
export declare const toJsValue: (instance: CML.Header) => Effect.Effect<any, HeaderError>
```

Added in v2.0.0

## toJson

Method toJson of Header

**Signature**

```ts
export declare const toJson: (instance: CML.Header) => Effect.Effect<string, HeaderError>
```

Added in v2.0.0

# MethodsUnsafe

## bodySignatureUnsafe

Unsafely calls instance.bodySignature without Effect wrapper

**Signature**

```ts
export declare const bodySignatureUnsafe: (instance: CML.Header) => CML.KESSignature
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Header) => void
```

Added in v2.0.0

## headerBodyUnsafe

Unsafely calls instance.headerBody without Effect wrapper

**Signature**

```ts
export declare const headerBodyUnsafe: (instance: CML.Header) => CML.HeaderBody
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.Header) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.Header) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.Header) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Header) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Header) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Header) => string
```

Added in v2.0.0

# Types

## Header (type alias)

Type alias for the CML Header class

**Signature**

```ts
export type Header = CML.Header
```

Added in v2.0.0

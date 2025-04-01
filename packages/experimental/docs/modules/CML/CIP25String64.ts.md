---
title: CML/CIP25String64.ts
nav_order: 34
parent: Modules
---

## CIP25String64 overview

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
  - [CIP25String64Error (class)](#cip25string64error-class)
- [Methods](#methods)
  - [free](#free)
  - [get](#get)
  - [getStr](#getstr)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [toStr](#tostr)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getStrUnsafe](#getstrunsafe)
  - [getUnsafe](#getunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [toStrUnsafe](#tostrunsafe)
- [Types](#types)
  - [CIP25String64 (type alias)](#cip25string64-type-alias)

---

# Constructors

## \_new

Static method \_new of CIP25String64

**Signature**

```ts
export declare const _new: (s: string) => Effect.Effect<CML.CIP25String64, CIP25String64Error>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of CIP25String64

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.CIP25String64, CIP25String64Error>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of CIP25String64

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.CIP25String64, CIP25String64Error>
```

Added in v2.0.0

## fromJson

Static method fromJson of CIP25String64

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.CIP25String64, CIP25String64Error>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls CIP25String64.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (s: string) => CML.CIP25String64
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls CIP25String64.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.CIP25String64
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls CIP25String64.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.CIP25String64
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls CIP25String64.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.CIP25String64
```

Added in v2.0.0

# Errors

## CIP25String64Error (class)

Error class for CIP25String64 operations

This error is thrown when operations on CIP25String64 instances fail.

**Signature**

```ts
export declare class CIP25String64Error
```

Added in v2.0.0

# Methods

## free

Method free of CIP25String64

**Signature**

```ts
export declare const free: (instance: CML.CIP25String64) => Effect.Effect<void, CIP25String64Error>
```

Added in v2.0.0

## get

Method get of CIP25String64

**Signature**

```ts
export declare const get: (instance: CML.CIP25String64) => Effect.Effect<string, CIP25String64Error>
```

Added in v2.0.0

## getStr

Method getStr of CIP25String64

**Signature**

```ts
export declare const getStr: (instance: CML.CIP25String64) => Effect.Effect<string, CIP25String64Error>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of CIP25String64

**Signature**

```ts
export declare const toCborBytes: (instance: CML.CIP25String64) => Effect.Effect<Uint8Array, CIP25String64Error>
```

Added in v2.0.0

## toCborHex

Method toCborHex of CIP25String64

**Signature**

```ts
export declare const toCborHex: (instance: CML.CIP25String64) => Effect.Effect<string, CIP25String64Error>
```

Added in v2.0.0

## toJsValue

Method toJsValue of CIP25String64

**Signature**

```ts
export declare const toJsValue: (instance: CML.CIP25String64) => Effect.Effect<any, CIP25String64Error>
```

Added in v2.0.0

## toJson

Method toJson of CIP25String64

**Signature**

```ts
export declare const toJson: (instance: CML.CIP25String64) => Effect.Effect<string, CIP25String64Error>
```

Added in v2.0.0

## toStr

Method toStr of CIP25String64

**Signature**

```ts
export declare const toStr: (instance: CML.CIP25String64) => Effect.Effect<string, CIP25String64Error>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.CIP25String64) => void
```

Added in v2.0.0

## getStrUnsafe

Unsafely calls instance.getStr without Effect wrapper

**Signature**

```ts
export declare const getStrUnsafe: (instance: CML.CIP25String64) => string
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.CIP25String64) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.CIP25String64) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.CIP25String64) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.CIP25String64) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.CIP25String64) => string
```

Added in v2.0.0

## toStrUnsafe

Unsafely calls instance.toStr without Effect wrapper

**Signature**

```ts
export declare const toStrUnsafe: (instance: CML.CIP25String64) => string
```

Added in v2.0.0

# Types

## CIP25String64 (type alias)

Type alias for the CML CIP25String64 class

**Signature**

```ts
export type CIP25String64 = CML.CIP25String64
```

Added in v2.0.0

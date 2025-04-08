---
title: CML/Url.ts
nav_order: 248
parent: Modules
---

## Url overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
- [Errors](#errors)
  - [UrlError (class)](#urlerror-class)
- [Methods](#methods)
  - [free](#free)
  - [get](#get)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getUnsafe](#getunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [Url (type alias)](#url-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of Url

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Url, UrlError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Url

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Url, UrlError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of Url

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.Url, UrlError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls Url.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.Url;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Url.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Url;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Url.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Url;
```

Added in v2.0.0

# Errors

## UrlError (class)

Error class for Url operations

This error is thrown when operations on Url instances fail.

**Signature**

```ts
export declare class UrlError
```

Added in v2.0.0

# Methods

## free

Method free of Url

**Signature**

```ts
export declare const free: (instance: CML.Url) => Effect.Effect<void, UrlError>;
```

Added in v2.0.0

## get

Method get of Url

**Signature**

```ts
export declare const get: (
  instance: CML.Url,
) => Effect.Effect<string, UrlError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Url

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.Url,
) => Effect.Effect<Uint8Array, UrlError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Url

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.Url,
) => Effect.Effect<string, UrlError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Url

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.Url,
) => Effect.Effect<Uint8Array, UrlError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of Url

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.Url,
) => Effect.Effect<string, UrlError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of Url

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.Url,
) => Effect.Effect<any, UrlError>;
```

Added in v2.0.0

## toJson

Method toJson of Url

**Signature**

```ts
export declare const toJson: (
  instance: CML.Url,
) => Effect.Effect<string, UrlError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Url) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.Url) => string;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.Url,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.Url) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.Url) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Url) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Url) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Url) => string;
```

Added in v2.0.0

# Types

## Url (type alias)

Type alias for the CML Url class

**Signature**

```ts
export type Url = CML.Url;
```

Added in v2.0.0

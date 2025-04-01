---
title: CML/PlutusMap.ts
nav_order: 150
parent: Modules
---

## PlutusMap overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
- [Errors](#errors)
  - [PlutusMapError (class)](#plutusmaperror-class)
- [Methods](#methods)
  - [free](#free)
  - [get](#get)
  - [getAll](#getall)
  - [isEmpty](#isempty)
  - [keys](#keys)
  - [len](#len)
  - [set](#set)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getAllUnsafe](#getallunsafe)
  - [getUnsafe](#getunsafe)
  - [isEmptyUnsafe](#isemptyunsafe)
  - [keysUnsafe](#keysunsafe)
  - [lenUnsafe](#lenunsafe)
  - [setUnsafe](#setunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
- [Types](#types)
  - [PlutusMap (type alias)](#plutusmap-type-alias)

---

# Constructors

## \_new

Static method \_new of PlutusMap

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.PlutusMap, PlutusMapError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of PlutusMap

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.PlutusMap, PlutusMapError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of PlutusMap

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.PlutusMap, PlutusMapError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls PlutusMap.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.PlutusMap;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls PlutusMap.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.PlutusMap;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls PlutusMap.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.PlutusMap;
```

Added in v2.0.0

# Errors

## PlutusMapError (class)

Error class for PlutusMap operations

This error is thrown when operations on PlutusMap instances fail.

**Signature**

```ts
export declare class PlutusMapError
```

Added in v2.0.0

# Methods

## free

Method free of PlutusMap

**Signature**

```ts
export declare const free: (
  instance: CML.PlutusMap,
) => Effect.Effect<void, PlutusMapError>;
```

Added in v2.0.0

## get

Method get of PlutusMap

**Signature**

```ts
export declare const get: (
  instance: CML.PlutusMap,
  key: CML.PlutusData,
) => Effect.Effect<CML.PlutusData | undefined, PlutusMapError>;
```

Added in v2.0.0

## getAll

Method getAll of PlutusMap

**Signature**

```ts
export declare const getAll: (
  instance: CML.PlutusMap,
  key: CML.PlutusData,
) => Effect.Effect<CML.PlutusDataList | undefined, PlutusMapError>;
```

Added in v2.0.0

## isEmpty

Method isEmpty of PlutusMap

**Signature**

```ts
export declare const isEmpty: (
  instance: CML.PlutusMap,
) => Effect.Effect<boolean, PlutusMapError>;
```

Added in v2.0.0

## keys

Method keys of PlutusMap

**Signature**

```ts
export declare const keys: (
  instance: CML.PlutusMap,
) => Effect.Effect<CML.PlutusDataList, PlutusMapError>;
```

Added in v2.0.0

## len

Method len of PlutusMap

**Signature**

```ts
export declare const len: (
  instance: CML.PlutusMap,
) => Effect.Effect<number, PlutusMapError>;
```

Added in v2.0.0

## set

Method set of PlutusMap

**Signature**

```ts
export declare const set: (
  instance: CML.PlutusMap,
  key: CML.PlutusData,
  value: CML.PlutusData,
) => Effect.Effect<void, PlutusMapError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of PlutusMap

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.PlutusMap,
) => Effect.Effect<Uint8Array, PlutusMapError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of PlutusMap

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.PlutusMap,
) => Effect.Effect<string, PlutusMapError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of PlutusMap

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.PlutusMap,
) => Effect.Effect<Uint8Array, PlutusMapError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of PlutusMap

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.PlutusMap,
) => Effect.Effect<string, PlutusMapError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PlutusMap) => void;
```

Added in v2.0.0

## getAllUnsafe

Unsafely calls instance.getAll without Effect wrapper

**Signature**

```ts
export declare const getAllUnsafe: (
  instance: CML.PlutusMap,
  key: CML.PlutusData,
) => CML.PlutusDataList | undefined;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.PlutusMap,
  key: CML.PlutusData,
) => CML.PlutusData | undefined;
```

Added in v2.0.0

## isEmptyUnsafe

Unsafely calls instance.isEmpty without Effect wrapper

**Signature**

```ts
export declare const isEmptyUnsafe: (instance: CML.PlutusMap) => boolean;
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (
  instance: CML.PlutusMap,
) => CML.PlutusDataList;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.PlutusMap) => number;
```

Added in v2.0.0

## setUnsafe

Unsafely calls instance.set without Effect wrapper

**Signature**

```ts
export declare const setUnsafe: (
  instance: CML.PlutusMap,
  key: CML.PlutusData,
  value: CML.PlutusData,
) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.PlutusMap,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.PlutusMap,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.PlutusMap) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.PlutusMap) => string;
```

Added in v2.0.0

# Types

## PlutusMap (type alias)

Type alias for the CML PlutusMap class

**Signature**

```ts
export type PlutusMap = CML.PlutusMap;
```

Added in v2.0.0

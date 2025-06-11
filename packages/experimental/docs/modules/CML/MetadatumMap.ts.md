---
title: CML/MetadatumMap.ts
nav_order: 136
parent: Modules
---

## MetadatumMap overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MetadatumMapError (class)](#metadatummaperror-class)
- [Methods](#methods)
  - [free](#free)
  - [get](#get)
  - [getAll](#getall)
  - [keys](#keys)
  - [len](#len)
  - [set](#set)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getAllUnsafe](#getallunsafe)
  - [getUnsafe](#getunsafe)
  - [keysUnsafe](#keysunsafe)
  - [lenUnsafe](#lenunsafe)
  - [setUnsafe](#setunsafe)
- [Types](#types)
  - [MetadatumMap (type alias)](#metadatummap-type-alias)

---

# Constructors

## \_new

Static method \_new of MetadatumMap

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.MetadatumMap, MetadatumMapError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls MetadatumMap.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.MetadatumMap
```

Added in v2.0.0

# Errors

## MetadatumMapError (class)

Error class for MetadatumMap operations

This error is thrown when operations on MetadatumMap instances fail.

**Signature**

```ts
export declare class MetadatumMapError
```

Added in v2.0.0

# Methods

## free

Method free of MetadatumMap

**Signature**

```ts
export declare const free: (instance: CML.MetadatumMap) => Effect.Effect<void, MetadatumMapError>
```

Added in v2.0.0

## get

Method get of MetadatumMap

**Signature**

```ts
export declare const get: (
  instance: CML.MetadatumMap,
  key: CML.TransactionMetadatum
) => Effect.Effect<CML.TransactionMetadatum | undefined, MetadatumMapError>
```

Added in v2.0.0

## getAll

Method getAll of MetadatumMap

**Signature**

```ts
export declare const getAll: (
  instance: CML.MetadatumMap,
  key: CML.TransactionMetadatum
) => Effect.Effect<CML.TransactionMetadatumList | undefined, MetadatumMapError>
```

Added in v2.0.0

## keys

Method keys of MetadatumMap

**Signature**

```ts
export declare const keys: (instance: CML.MetadatumMap) => Effect.Effect<CML.MetadatumList, MetadatumMapError>
```

Added in v2.0.0

## len

Method len of MetadatumMap

**Signature**

```ts
export declare const len: (instance: CML.MetadatumMap) => Effect.Effect<number, MetadatumMapError>
```

Added in v2.0.0

## set

Method set of MetadatumMap

**Signature**

```ts
export declare const set: (
  instance: CML.MetadatumMap,
  key: CML.TransactionMetadatum,
  value: CML.TransactionMetadatum
) => Effect.Effect<void, MetadatumMapError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.MetadatumMap) => void
```

Added in v2.0.0

## getAllUnsafe

Unsafely calls instance.getAll without Effect wrapper

**Signature**

```ts
export declare const getAllUnsafe: (
  instance: CML.MetadatumMap,
  key: CML.TransactionMetadatum
) => CML.TransactionMetadatumList | undefined
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.MetadatumMap,
  key: CML.TransactionMetadatum
) => CML.TransactionMetadatum | undefined
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (instance: CML.MetadatumMap) => CML.MetadatumList
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.MetadatumMap) => number
```

Added in v2.0.0

## setUnsafe

Unsafely calls instance.set without Effect wrapper

**Signature**

```ts
export declare const setUnsafe: (
  instance: CML.MetadatumMap,
  key: CML.TransactionMetadatum,
  value: CML.TransactionMetadatum
) => void
```

Added in v2.0.0

# Types

## MetadatumMap (type alias)

Type alias for the CML MetadatumMap class

**Signature**

```ts
export type MetadatumMap = CML.MetadatumMap
```

Added in v2.0.0

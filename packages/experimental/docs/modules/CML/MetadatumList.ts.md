---
title: CML/MetadatumList.ts
nav_order: 130
parent: Modules
---

## MetadatumList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MetadatumListError (class)](#metadatumlisterror-class)
- [Methods](#methods)
  - [add](#add)
  - [free](#free)
  - [get](#get)
  - [len](#len)
- [MethodsUnsafe](#methodsunsafe)
  - [addUnsafe](#addunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getUnsafe](#getunsafe)
  - [lenUnsafe](#lenunsafe)
- [Types](#types)
  - [MetadatumList (type alias)](#metadatumlist-type-alias)

---

# Constructors

## \_new

Static method \_new of MetadatumList

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.MetadatumList, MetadatumListError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls MetadatumList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.MetadatumList
```

Added in v2.0.0

# Errors

## MetadatumListError (class)

Error class for MetadatumList operations

This error is thrown when operations on MetadatumList instances fail.

**Signature**

```ts
export declare class MetadatumListError
```

Added in v2.0.0

# Methods

## add

Method add of MetadatumList

**Signature**

```ts
export declare const add: (
  instance: CML.MetadatumList,
  elem: CML.TransactionMetadatum
) => Effect.Effect<void, MetadatumListError>
```

Added in v2.0.0

## free

Method free of MetadatumList

**Signature**

```ts
export declare const free: (instance: CML.MetadatumList) => Effect.Effect<void, MetadatumListError>
```

Added in v2.0.0

## get

Method get of MetadatumList

**Signature**

```ts
export declare const get: (
  instance: CML.MetadatumList,
  index: number
) => Effect.Effect<CML.TransactionMetadatum, MetadatumListError>
```

Added in v2.0.0

## len

Method len of MetadatumList

**Signature**

```ts
export declare const len: (instance: CML.MetadatumList) => Effect.Effect<number, MetadatumListError>
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (instance: CML.MetadatumList, elem: CML.TransactionMetadatum) => void
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.MetadatumList) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.MetadatumList, index: number) => CML.TransactionMetadatum
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.MetadatumList) => number
```

Added in v2.0.0

# Types

## MetadatumList (type alias)

Type alias for the CML MetadatumList class

**Signature**

```ts
export type MetadatumList = CML.MetadatumList
```

Added in v2.0.0

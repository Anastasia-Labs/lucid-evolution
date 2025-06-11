---
title: CML/TransactionMetadatumList.ts
nav_order: 236
parent: Modules
---

## TransactionMetadatumList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [TransactionMetadatumListError (class)](#transactionmetadatumlisterror-class)
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
  - [TransactionMetadatumList (type alias)](#transactionmetadatumlist-type-alias)

---

# Constructors

## \_new

Static method \_new of TransactionMetadatumList

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.TransactionMetadatumList, TransactionMetadatumListError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls TransactionMetadatumList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.TransactionMetadatumList
```

Added in v2.0.0

# Errors

## TransactionMetadatumListError (class)

Error class for TransactionMetadatumList operations

This error is thrown when operations on TransactionMetadatumList instances fail.

**Signature**

```ts
export declare class TransactionMetadatumListError
```

Added in v2.0.0

# Methods

## add

Method add of TransactionMetadatumList

**Signature**

```ts
export declare const add: (
  instance: CML.TransactionMetadatumList,
  elem: CML.TransactionMetadatum
) => Effect.Effect<void, TransactionMetadatumListError>
```

Added in v2.0.0

## free

Method free of TransactionMetadatumList

**Signature**

```ts
export declare const free: (
  instance: CML.TransactionMetadatumList
) => Effect.Effect<void, TransactionMetadatumListError>
```

Added in v2.0.0

## get

Method get of TransactionMetadatumList

**Signature**

```ts
export declare const get: (
  instance: CML.TransactionMetadatumList,
  index: number
) => Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumListError>
```

Added in v2.0.0

## len

Method len of TransactionMetadatumList

**Signature**

```ts
export declare const len: (
  instance: CML.TransactionMetadatumList
) => Effect.Effect<number, TransactionMetadatumListError>
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (instance: CML.TransactionMetadatumList, elem: CML.TransactionMetadatum) => void
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.TransactionMetadatumList) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.TransactionMetadatumList, index: number) => CML.TransactionMetadatum
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.TransactionMetadatumList) => number
```

Added in v2.0.0

# Types

## TransactionMetadatumList (type alias)

Type alias for the CML TransactionMetadatumList class

**Signature**

```ts
export type TransactionMetadatumList = CML.TransactionMetadatumList
```

Added in v2.0.0

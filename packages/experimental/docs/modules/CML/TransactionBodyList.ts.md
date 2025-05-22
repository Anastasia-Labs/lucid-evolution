---
title: CML/TransactionBodyList.ts
nav_order: 228
parent: Modules
---

## TransactionBodyList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [TransactionBodyListError (class)](#transactionbodylisterror-class)
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
  - [TransactionBodyList (type alias)](#transactionbodylist-type-alias)

---

# Constructors

## \_new

Static method \_new of TransactionBodyList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.TransactionBodyList,
  TransactionBodyListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls TransactionBodyList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.TransactionBodyList;
```

Added in v2.0.0

# Errors

## TransactionBodyListError (class)

Error class for TransactionBodyList operations

This error is thrown when operations on TransactionBodyList instances fail.

**Signature**

```ts
export declare class TransactionBodyListError
```

Added in v2.0.0

# Methods

## add

Method add of TransactionBodyList

**Signature**

```ts
export declare const add: (
  instance: CML.TransactionBodyList,
  elem: CML.TransactionBody,
) => Effect.Effect<void, TransactionBodyListError>;
```

Added in v2.0.0

## free

Method free of TransactionBodyList

**Signature**

```ts
export declare const free: (
  instance: CML.TransactionBodyList,
) => Effect.Effect<void, TransactionBodyListError>;
```

Added in v2.0.0

## get

Method get of TransactionBodyList

**Signature**

```ts
export declare const get: (
  instance: CML.TransactionBodyList,
  index: number,
) => Effect.Effect<CML.TransactionBody, TransactionBodyListError>;
```

Added in v2.0.0

## len

Method len of TransactionBodyList

**Signature**

```ts
export declare const len: (
  instance: CML.TransactionBodyList,
) => Effect.Effect<number, TransactionBodyListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.TransactionBodyList,
  elem: CML.TransactionBody,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.TransactionBodyList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.TransactionBodyList,
  index: number,
) => CML.TransactionBody;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.TransactionBodyList) => number;
```

Added in v2.0.0

# Types

## TransactionBodyList (type alias)

Type alias for the CML TransactionBodyList class

**Signature**

```ts
export type TransactionBodyList = CML.TransactionBodyList;
```

Added in v2.0.0

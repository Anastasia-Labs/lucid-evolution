---
title: CML/TransactionInputList.ts
nav_order: 228
parent: Modules
---

## TransactionInputList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [TransactionInputListError (class)](#transactioninputlisterror-class)
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
  - [TransactionInputList (type alias)](#transactioninputlist-type-alias)

---

# Constructors

## \_new

Static method \_new of TransactionInputList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.TransactionInputList,
  TransactionInputListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls TransactionInputList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.TransactionInputList;
```

Added in v2.0.0

# Errors

## TransactionInputListError (class)

Error class for TransactionInputList operations

This error is thrown when operations on TransactionInputList instances fail.

**Signature**

```ts
export declare class TransactionInputListError
```

Added in v2.0.0

# Methods

## add

Method add of TransactionInputList

**Signature**

```ts
export declare const add: (
  instance: CML.TransactionInputList,
  elem: CML.TransactionInput,
) => Effect.Effect<void, TransactionInputListError>;
```

Added in v2.0.0

## free

Method free of TransactionInputList

**Signature**

```ts
export declare const free: (
  instance: CML.TransactionInputList,
) => Effect.Effect<void, TransactionInputListError>;
```

Added in v2.0.0

## get

Method get of TransactionInputList

**Signature**

```ts
export declare const get: (
  instance: CML.TransactionInputList,
  index: number,
) => Effect.Effect<CML.TransactionInput, TransactionInputListError>;
```

Added in v2.0.0

## len

Method len of TransactionInputList

**Signature**

```ts
export declare const len: (
  instance: CML.TransactionInputList,
) => Effect.Effect<number, TransactionInputListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.TransactionInputList,
  elem: CML.TransactionInput,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.TransactionInputList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.TransactionInputList,
  index: number,
) => CML.TransactionInput;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.TransactionInputList) => number;
```

Added in v2.0.0

# Types

## TransactionInputList (type alias)

Type alias for the CML TransactionInputList class

**Signature**

```ts
export type TransactionInputList = CML.TransactionInputList;
```

Added in v2.0.0

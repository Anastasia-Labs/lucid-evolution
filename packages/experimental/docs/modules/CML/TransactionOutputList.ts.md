---
title: CML/TransactionOutputList.ts
nav_order: 241
parent: Modules
---

## TransactionOutputList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [TransactionOutputListError (class)](#transactionoutputlisterror-class)
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
  - [TransactionOutputList (type alias)](#transactionoutputlist-type-alias)

---

# Constructors

## \_new

Static method \_new of TransactionOutputList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.TransactionOutputList,
  TransactionOutputListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls TransactionOutputList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.TransactionOutputList;
```

Added in v2.0.0

# Errors

## TransactionOutputListError (class)

Error class for TransactionOutputList operations

This error is thrown when operations on TransactionOutputList instances fail.

**Signature**

```ts
export declare class TransactionOutputListError
```

Added in v2.0.0

# Methods

## add

Method add of TransactionOutputList

**Signature**

```ts
export declare const add: (
  instance: CML.TransactionOutputList,
  elem: CML.TransactionOutput,
) => Effect.Effect<void, TransactionOutputListError>;
```

Added in v2.0.0

## free

Method free of TransactionOutputList

**Signature**

```ts
export declare const free: (
  instance: CML.TransactionOutputList,
) => Effect.Effect<void, TransactionOutputListError>;
```

Added in v2.0.0

## get

Method get of TransactionOutputList

**Signature**

```ts
export declare const get: (
  instance: CML.TransactionOutputList,
  index: number,
) => Effect.Effect<CML.TransactionOutput, TransactionOutputListError>;
```

Added in v2.0.0

## len

Method len of TransactionOutputList

**Signature**

```ts
export declare const len: (
  instance: CML.TransactionOutputList,
) => Effect.Effect<number, TransactionOutputListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.TransactionOutputList,
  elem: CML.TransactionOutput,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.TransactionOutputList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.TransactionOutputList,
  index: number,
) => CML.TransactionOutput;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.TransactionOutputList) => number;
```

Added in v2.0.0

# Types

## TransactionOutputList (type alias)

Type alias for the CML TransactionOutputList class

**Signature**

```ts
export type TransactionOutputList = CML.TransactionOutputList;
```

Added in v2.0.0

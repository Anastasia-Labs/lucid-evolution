---
title: CML/TransactionWitnessSetList.ts
nav_order: 245
parent: Modules
---

## TransactionWitnessSetList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [TransactionWitnessSetListError (class)](#transactionwitnesssetlisterror-class)
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
  - [TransactionWitnessSetList (type alias)](#transactionwitnesssetlist-type-alias)

---

# Constructors

## \_new

Static method \_new of TransactionWitnessSetList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.TransactionWitnessSetList,
  TransactionWitnessSetListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls TransactionWitnessSetList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.TransactionWitnessSetList;
```

Added in v2.0.0

# Errors

## TransactionWitnessSetListError (class)

Error class for TransactionWitnessSetList operations

This error is thrown when operations on TransactionWitnessSetList instances fail.

**Signature**

```ts
export declare class TransactionWitnessSetListError
```

Added in v2.0.0

# Methods

## add

Method add of TransactionWitnessSetList

**Signature**

```ts
export declare const add: (
  instance: CML.TransactionWitnessSetList,
  elem: CML.TransactionWitnessSet,
) => Effect.Effect<void, TransactionWitnessSetListError>;
```

Added in v2.0.0

## free

Method free of TransactionWitnessSetList

**Signature**

```ts
export declare const free: (
  instance: CML.TransactionWitnessSetList,
) => Effect.Effect<void, TransactionWitnessSetListError>;
```

Added in v2.0.0

## get

Method get of TransactionWitnessSetList

**Signature**

```ts
export declare const get: (
  instance: CML.TransactionWitnessSetList,
  index: number,
) => Effect.Effect<CML.TransactionWitnessSet, TransactionWitnessSetListError>;
```

Added in v2.0.0

## len

Method len of TransactionWitnessSetList

**Signature**

```ts
export declare const len: (
  instance: CML.TransactionWitnessSetList,
) => Effect.Effect<number, TransactionWitnessSetListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.TransactionWitnessSetList,
  elem: CML.TransactionWitnessSet,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.TransactionWitnessSetList,
) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.TransactionWitnessSetList,
  index: number,
) => CML.TransactionWitnessSet;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (
  instance: CML.TransactionWitnessSetList,
) => number;
```

Added in v2.0.0

# Types

## TransactionWitnessSetList (type alias)

Type alias for the CML TransactionWitnessSetList class

**Signature**

```ts
export type TransactionWitnessSetList = CML.TransactionWitnessSetList;
```

Added in v2.0.0

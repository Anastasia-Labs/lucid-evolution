---
title: CML/TransactionMetadatumLabels.ts
nav_order: 236
parent: Modules
---

## TransactionMetadatumLabels overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [TransactionMetadatumLabelsError (class)](#transactionmetadatumlabelserror-class)
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
  - [TransactionMetadatumLabels (type alias)](#transactionmetadatumlabels-type-alias)

---

# Constructors

## \_new

Static method \_new of TransactionMetadatumLabels

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.TransactionMetadatumLabels, TransactionMetadatumLabelsError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls TransactionMetadatumLabels.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.TransactionMetadatumLabels
```

Added in v2.0.0

# Errors

## TransactionMetadatumLabelsError (class)

Error class for TransactionMetadatumLabels operations

This error is thrown when operations on TransactionMetadatumLabels instances fail.

**Signature**

```ts
export declare class TransactionMetadatumLabelsError
```

Added in v2.0.0

# Methods

## add

Method add of TransactionMetadatumLabels

**Signature**

```ts
export declare const add: (
  instance: CML.TransactionMetadatumLabels,
  elem: bigint
) => Effect.Effect<void, TransactionMetadatumLabelsError>
```

Added in v2.0.0

## free

Method free of TransactionMetadatumLabels

**Signature**

```ts
export declare const free: (
  instance: CML.TransactionMetadatumLabels
) => Effect.Effect<void, TransactionMetadatumLabelsError>
```

Added in v2.0.0

## get

Method get of TransactionMetadatumLabels

**Signature**

```ts
export declare const get: (
  instance: CML.TransactionMetadatumLabels,
  index: number
) => Effect.Effect<bigint, TransactionMetadatumLabelsError>
```

Added in v2.0.0

## len

Method len of TransactionMetadatumLabels

**Signature**

```ts
export declare const len: (
  instance: CML.TransactionMetadatumLabels
) => Effect.Effect<number, TransactionMetadatumLabelsError>
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (instance: CML.TransactionMetadatumLabels, elem: bigint) => void
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.TransactionMetadatumLabels) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.TransactionMetadatumLabels, index: number) => bigint
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.TransactionMetadatumLabels) => number
```

Added in v2.0.0

# Types

## TransactionMetadatumLabels (type alias)

Type alias for the CML TransactionMetadatumLabels class

**Signature**

```ts
export type TransactionMetadatumLabels = CML.TransactionMetadatumLabels
```

Added in v2.0.0

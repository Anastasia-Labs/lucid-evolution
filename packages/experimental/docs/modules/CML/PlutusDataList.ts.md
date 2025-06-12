---
title: CML/PlutusDataList.ts
nav_order: 154
parent: Modules
---

## PlutusDataList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [PlutusDataListError (class)](#plutusdatalisterror-class)
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
  - [PlutusDataList (type alias)](#plutusdatalist-type-alias)

---

# Constructors

## \_new

Static method \_new of PlutusDataList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.PlutusDataList,
  PlutusDataListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls PlutusDataList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.PlutusDataList;
```

Added in v2.0.0

# Errors

## PlutusDataListError (class)

Error class for PlutusDataList operations

This error is thrown when operations on PlutusDataList instances fail.

**Signature**

```ts
export declare class PlutusDataListError
```

Added in v2.0.0

# Methods

## add

Method add of PlutusDataList

**Signature**

```ts
export declare const add: (
  instance: CML.PlutusDataList,
  elem: CML.PlutusData,
) => Effect.Effect<void, PlutusDataListError>;
```

Added in v2.0.0

## free

Method free of PlutusDataList

**Signature**

```ts
export declare const free: (
  instance: CML.PlutusDataList,
) => Effect.Effect<void, PlutusDataListError>;
```

Added in v2.0.0

## get

Method get of PlutusDataList

**Signature**

```ts
export declare const get: (
  instance: CML.PlutusDataList,
  index: number,
) => Effect.Effect<CML.PlutusData, PlutusDataListError>;
```

Added in v2.0.0

## len

Method len of PlutusDataList

**Signature**

```ts
export declare const len: (
  instance: CML.PlutusDataList,
) => Effect.Effect<number, PlutusDataListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.PlutusDataList,
  elem: CML.PlutusData,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PlutusDataList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.PlutusDataList,
  index: number,
) => CML.PlutusData;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.PlutusDataList) => number;
```

Added in v2.0.0

# Types

## PlutusDataList (type alias)

Type alias for the CML PlutusDataList class

**Signature**

```ts
export type PlutusDataList = CML.PlutusDataList;
```

Added in v2.0.0

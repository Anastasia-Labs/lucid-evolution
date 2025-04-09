---
title: CML/AssetNameList.ts
nav_order: 10
parent: Modules
---

## AssetNameList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [AssetNameListError (class)](#assetnamelisterror-class)
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
  - [AssetNameList (type alias)](#assetnamelist-type-alias)

---

# Constructors

## \_new

Static method \_new of AssetNameList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.AssetNameList,
  AssetNameListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls AssetNameList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.AssetNameList;
```

Added in v2.0.0

# Errors

## AssetNameListError (class)

Error class for AssetNameList operations

This error is thrown when operations on AssetNameList instances fail.

**Signature**

```ts
export declare class AssetNameListError
```

Added in v2.0.0

# Methods

## add

Method add of AssetNameList

**Signature**

```ts
export declare const add: (
  instance: CML.AssetNameList,
  elem: CML.AssetName,
) => Effect.Effect<void, AssetNameListError>;
```

Added in v2.0.0

## free

Method free of AssetNameList

**Signature**

```ts
export declare const free: (
  instance: CML.AssetNameList,
) => Effect.Effect<void, AssetNameListError>;
```

Added in v2.0.0

## get

Method get of AssetNameList

**Signature**

```ts
export declare const get: (
  instance: CML.AssetNameList,
  index: number,
) => Effect.Effect<CML.AssetName, AssetNameListError>;
```

Added in v2.0.0

## len

Method len of AssetNameList

**Signature**

```ts
export declare const len: (
  instance: CML.AssetNameList,
) => Effect.Effect<number, AssetNameListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.AssetNameList,
  elem: CML.AssetName,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.AssetNameList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.AssetNameList,
  index: number,
) => CML.AssetName;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.AssetNameList) => number;
```

Added in v2.0.0

# Types

## AssetNameList (type alias)

Type alias for the CML AssetNameList class

**Signature**

```ts
export type AssetNameList = CML.AssetNameList;
```

Added in v2.0.0

---
title: CML/GovActionIdList.ts
nav_order: 99
parent: Modules
---

## GovActionIdList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [GovActionIdListError (class)](#govactionidlisterror-class)
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
  - [GovActionIdList (type alias)](#govactionidlist-type-alias)

---

# Constructors

## \_new

Static method \_new of GovActionIdList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.GovActionIdList,
  GovActionIdListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls GovActionIdList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.GovActionIdList;
```

Added in v2.0.0

# Errors

## GovActionIdListError (class)

Error class for GovActionIdList operations

This error is thrown when operations on GovActionIdList instances fail.

**Signature**

```ts
export declare class GovActionIdListError
```

Added in v2.0.0

# Methods

## add

Method add of GovActionIdList

**Signature**

```ts
export declare const add: (
  instance: CML.GovActionIdList,
  elem: CML.GovActionId,
) => Effect.Effect<void, GovActionIdListError>;
```

Added in v2.0.0

## free

Method free of GovActionIdList

**Signature**

```ts
export declare const free: (
  instance: CML.GovActionIdList,
) => Effect.Effect<void, GovActionIdListError>;
```

Added in v2.0.0

## get

Method get of GovActionIdList

**Signature**

```ts
export declare const get: (
  instance: CML.GovActionIdList,
  index: number,
) => Effect.Effect<CML.GovActionId, GovActionIdListError>;
```

Added in v2.0.0

## len

Method len of GovActionIdList

**Signature**

```ts
export declare const len: (
  instance: CML.GovActionIdList,
) => Effect.Effect<number, GovActionIdListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.GovActionIdList,
  elem: CML.GovActionId,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.GovActionIdList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.GovActionIdList,
  index: number,
) => CML.GovActionId;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.GovActionIdList) => number;
```

Added in v2.0.0

# Types

## GovActionIdList (type alias)

Type alias for the CML GovActionIdList class

**Signature**

```ts
export type GovActionIdList = CML.GovActionIdList;
```

Added in v2.0.0

---
title: CML/RewardAccountList.ts
nav_order: 196
parent: Modules
---

## RewardAccountList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [RewardAccountListError (class)](#rewardaccountlisterror-class)
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
  - [RewardAccountList (type alias)](#rewardaccountlist-type-alias)

---

# Constructors

## \_new

Static method \_new of RewardAccountList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.RewardAccountList,
  RewardAccountListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls RewardAccountList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.RewardAccountList;
```

Added in v2.0.0

# Errors

## RewardAccountListError (class)

Error class for RewardAccountList operations

This error is thrown when operations on RewardAccountList instances fail.

**Signature**

```ts
export declare class RewardAccountListError
```

Added in v2.0.0

# Methods

## add

Method add of RewardAccountList

**Signature**

```ts
export declare const add: (
  instance: CML.RewardAccountList,
  elem: CML.RewardAddress,
) => Effect.Effect<void, RewardAccountListError>;
```

Added in v2.0.0

## free

Method free of RewardAccountList

**Signature**

```ts
export declare const free: (
  instance: CML.RewardAccountList,
) => Effect.Effect<void, RewardAccountListError>;
```

Added in v2.0.0

## get

Method get of RewardAccountList

**Signature**

```ts
export declare const get: (
  instance: CML.RewardAccountList,
  index: number,
) => Effect.Effect<CML.RewardAddress, RewardAccountListError>;
```

Added in v2.0.0

## len

Method len of RewardAccountList

**Signature**

```ts
export declare const len: (
  instance: CML.RewardAccountList,
) => Effect.Effect<number, RewardAccountListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.RewardAccountList,
  elem: CML.RewardAddress,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.RewardAccountList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.RewardAccountList,
  index: number,
) => CML.RewardAddress;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.RewardAccountList) => number;
```

Added in v2.0.0

# Types

## RewardAccountList (type alias)

Type alias for the CML RewardAccountList class

**Signature**

```ts
export type RewardAccountList = CML.RewardAccountList;
```

Added in v2.0.0

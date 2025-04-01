---
title: CML/RedeemerKeyList.ts
nav_order: 179
parent: Modules
---

## RedeemerKeyList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [RedeemerKeyListError (class)](#redeemerkeylisterror-class)
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
  - [RedeemerKeyList (type alias)](#redeemerkeylist-type-alias)

---

# Constructors

## \_new

Static method \_new of RedeemerKeyList

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.RedeemerKeyList, RedeemerKeyListError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls RedeemerKeyList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.RedeemerKeyList
```

Added in v2.0.0

# Errors

## RedeemerKeyListError (class)

Error class for RedeemerKeyList operations

This error is thrown when operations on RedeemerKeyList instances fail.

**Signature**

```ts
export declare class RedeemerKeyListError
```

Added in v2.0.0

# Methods

## add

Method add of RedeemerKeyList

**Signature**

```ts
export declare const add: (
  instance: CML.RedeemerKeyList,
  elem: CML.RedeemerKey
) => Effect.Effect<void, RedeemerKeyListError>
```

Added in v2.0.0

## free

Method free of RedeemerKeyList

**Signature**

```ts
export declare const free: (instance: CML.RedeemerKeyList) => Effect.Effect<void, RedeemerKeyListError>
```

Added in v2.0.0

## get

Method get of RedeemerKeyList

**Signature**

```ts
export declare const get: (
  instance: CML.RedeemerKeyList,
  index: number
) => Effect.Effect<CML.RedeemerKey, RedeemerKeyListError>
```

Added in v2.0.0

## len

Method len of RedeemerKeyList

**Signature**

```ts
export declare const len: (instance: CML.RedeemerKeyList) => Effect.Effect<number, RedeemerKeyListError>
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (instance: CML.RedeemerKeyList, elem: CML.RedeemerKey) => void
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.RedeemerKeyList) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.RedeemerKeyList, index: number) => CML.RedeemerKey
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.RedeemerKeyList) => number
```

Added in v2.0.0

# Types

## RedeemerKeyList (type alias)

Type alias for the CML RedeemerKeyList class

**Signature**

```ts
export type RedeemerKeyList = CML.RedeemerKeyList
```

Added in v2.0.0

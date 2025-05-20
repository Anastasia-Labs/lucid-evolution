---
title: CML/CIP36DelegationList.ts
nav_order: 44
parent: Modules
---

## CIP36DelegationList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [CIP36DelegationListError (class)](#cip36delegationlisterror-class)
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
  - [CIP36DelegationList (type alias)](#cip36delegationlist-type-alias)

---

# Constructors

## \_new

Static method \_new of CIP36DelegationList

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.CIP36DelegationList, CIP36DelegationListError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls CIP36DelegationList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.CIP36DelegationList
```

Added in v2.0.0

# Errors

## CIP36DelegationListError (class)

Error class for CIP36DelegationList operations

This error is thrown when operations on CIP36DelegationList instances fail.

**Signature**

```ts
export declare class CIP36DelegationListError
```

Added in v2.0.0

# Methods

## add

Method add of CIP36DelegationList

**Signature**

```ts
export declare const add: (
  instance: CML.CIP36DelegationList,
  elem: CML.CIP36Delegation
) => Effect.Effect<void, CIP36DelegationListError>
```

Added in v2.0.0

## free

Method free of CIP36DelegationList

**Signature**

```ts
export declare const free: (instance: CML.CIP36DelegationList) => Effect.Effect<void, CIP36DelegationListError>
```

Added in v2.0.0

## get

Method get of CIP36DelegationList

**Signature**

```ts
export declare const get: (
  instance: CML.CIP36DelegationList,
  index: number
) => Effect.Effect<CML.CIP36Delegation, CIP36DelegationListError>
```

Added in v2.0.0

## len

Method len of CIP36DelegationList

**Signature**

```ts
export declare const len: (instance: CML.CIP36DelegationList) => Effect.Effect<number, CIP36DelegationListError>
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (instance: CML.CIP36DelegationList, elem: CML.CIP36Delegation) => void
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.CIP36DelegationList) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.CIP36DelegationList, index: number) => CML.CIP36Delegation
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.CIP36DelegationList) => number
```

Added in v2.0.0

# Types

## CIP36DelegationList (type alias)

Type alias for the CML CIP36DelegationList class

**Signature**

```ts
export type CIP36DelegationList = CML.CIP36DelegationList
```

Added in v2.0.0

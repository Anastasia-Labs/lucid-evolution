---
title: CML/PolicyIdList.ts
nav_order: 161
parent: Modules
---

## PolicyIdList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [PolicyIdListError (class)](#policyidlisterror-class)
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
  - [PolicyIdList (type alias)](#policyidlist-type-alias)

---

# Constructors

## \_new

Static method \_new of PolicyIdList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.PolicyIdList,
  PolicyIdListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls PolicyIdList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.PolicyIdList;
```

Added in v2.0.0

# Errors

## PolicyIdListError (class)

Error class for PolicyIdList operations

This error is thrown when operations on PolicyIdList instances fail.

**Signature**

```ts
export declare class PolicyIdListError
```

Added in v2.0.0

# Methods

## add

Method add of PolicyIdList

**Signature**

```ts
export declare const add: (
  instance: CML.PolicyIdList,
  elem: CML.ScriptHash,
) => Effect.Effect<void, PolicyIdListError>;
```

Added in v2.0.0

## free

Method free of PolicyIdList

**Signature**

```ts
export declare const free: (
  instance: CML.PolicyIdList,
) => Effect.Effect<void, PolicyIdListError>;
```

Added in v2.0.0

## get

Method get of PolicyIdList

**Signature**

```ts
export declare const get: (
  instance: CML.PolicyIdList,
  index: number,
) => Effect.Effect<CML.ScriptHash, PolicyIdListError>;
```

Added in v2.0.0

## len

Method len of PolicyIdList

**Signature**

```ts
export declare const len: (
  instance: CML.PolicyIdList,
) => Effect.Effect<number, PolicyIdListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.PolicyIdList,
  elem: CML.ScriptHash,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PolicyIdList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.PolicyIdList,
  index: number,
) => CML.ScriptHash;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.PolicyIdList) => number;
```

Added in v2.0.0

# Types

## PolicyIdList (type alias)

Type alias for the CML PolicyIdList class

**Signature**

```ts
export type PolicyIdList = CML.PolicyIdList;
```

Added in v2.0.0

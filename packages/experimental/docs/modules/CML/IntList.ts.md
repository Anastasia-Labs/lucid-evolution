---
title: CML/IntList.ts
nav_order: 108
parent: Modules
---

## IntList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [IntListError (class)](#intlisterror-class)
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
  - [IntList (type alias)](#intlist-type-alias)

---

# Constructors

## \_new

Static method \_new of IntList

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.IntList, IntListError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls IntList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.IntList;
```

Added in v2.0.0

# Errors

## IntListError (class)

Error class for IntList operations

This error is thrown when operations on IntList instances fail.

**Signature**

```ts
export declare class IntListError
```

Added in v2.0.0

# Methods

## add

Method add of IntList

**Signature**

```ts
export declare const add: (
  instance: CML.IntList,
  elem: CML.Int,
) => Effect.Effect<void, IntListError>;
```

Added in v2.0.0

## free

Method free of IntList

**Signature**

```ts
export declare const free: (
  instance: CML.IntList,
) => Effect.Effect<void, IntListError>;
```

Added in v2.0.0

## get

Method get of IntList

**Signature**

```ts
export declare const get: (
  instance: CML.IntList,
  index: number,
) => Effect.Effect<CML.Int, IntListError>;
```

Added in v2.0.0

## len

Method len of IntList

**Signature**

```ts
export declare const len: (
  instance: CML.IntList,
) => Effect.Effect<number, IntListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (instance: CML.IntList, elem: CML.Int) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.IntList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.IntList,
  index: number,
) => CML.Int;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.IntList) => number;
```

Added in v2.0.0

# Types

## IntList (type alias)

Type alias for the CML IntList class

**Signature**

```ts
export type IntList = CML.IntList;
```

Added in v2.0.0

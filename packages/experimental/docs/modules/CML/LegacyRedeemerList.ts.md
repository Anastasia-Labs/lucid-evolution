---
title: CML/LegacyRedeemerList.ts
nav_order: 116
parent: Modules
---

## LegacyRedeemerList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [LegacyRedeemerListError (class)](#legacyredeemerlisterror-class)
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
  - [LegacyRedeemerList (type alias)](#legacyredeemerlist-type-alias)

---

# Constructors

## \_new

Static method \_new of LegacyRedeemerList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.LegacyRedeemerList,
  LegacyRedeemerListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls LegacyRedeemerList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.LegacyRedeemerList;
```

Added in v2.0.0

# Errors

## LegacyRedeemerListError (class)

Error class for LegacyRedeemerList operations

This error is thrown when operations on LegacyRedeemerList instances fail.

**Signature**

```ts
export declare class LegacyRedeemerListError
```

Added in v2.0.0

# Methods

## add

Method add of LegacyRedeemerList

**Signature**

```ts
export declare const add: (
  instance: CML.LegacyRedeemerList,
  elem: CML.LegacyRedeemer,
) => Effect.Effect<void, LegacyRedeemerListError>;
```

Added in v2.0.0

## free

Method free of LegacyRedeemerList

**Signature**

```ts
export declare const free: (
  instance: CML.LegacyRedeemerList,
) => Effect.Effect<void, LegacyRedeemerListError>;
```

Added in v2.0.0

## get

Method get of LegacyRedeemerList

**Signature**

```ts
export declare const get: (
  instance: CML.LegacyRedeemerList,
  index: number,
) => Effect.Effect<CML.LegacyRedeemer, LegacyRedeemerListError>;
```

Added in v2.0.0

## len

Method len of LegacyRedeemerList

**Signature**

```ts
export declare const len: (
  instance: CML.LegacyRedeemerList,
) => Effect.Effect<number, LegacyRedeemerListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.LegacyRedeemerList,
  elem: CML.LegacyRedeemer,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.LegacyRedeemerList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.LegacyRedeemerList,
  index: number,
) => CML.LegacyRedeemer;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.LegacyRedeemerList) => number;
```

Added in v2.0.0

# Types

## LegacyRedeemerList (type alias)

Type alias for the CML LegacyRedeemerList class

**Signature**

```ts
export type LegacyRedeemerList = CML.LegacyRedeemerList;
```

Added in v2.0.0

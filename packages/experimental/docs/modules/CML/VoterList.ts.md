---
title: CML/VoterList.ts
nav_order: 286
parent: Modules
---

## VoterList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [VoterListError (class)](#voterlisterror-class)
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
  - [VoterList (type alias)](#voterlist-type-alias)

---

# Constructors

## \_new

Static method \_new of VoterList

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.VoterList, VoterListError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls VoterList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.VoterList;
```

Added in v2.0.0

# Errors

## VoterListError (class)

Error class for VoterList operations

This error is thrown when operations on VoterList instances fail.

**Signature**

```ts
export declare class VoterListError
```

Added in v2.0.0

# Methods

## add

Method add of VoterList

**Signature**

```ts
export declare const add: (
  instance: CML.VoterList,
  elem: CML.Voter,
) => Effect.Effect<void, VoterListError>;
```

Added in v2.0.0

## free

Method free of VoterList

**Signature**

```ts
export declare const free: (
  instance: CML.VoterList,
) => Effect.Effect<void, VoterListError>;
```

Added in v2.0.0

## get

Method get of VoterList

**Signature**

```ts
export declare const get: (
  instance: CML.VoterList,
  index: number,
) => Effect.Effect<CML.Voter, VoterListError>;
```

Added in v2.0.0

## len

Method len of VoterList

**Signature**

```ts
export declare const len: (
  instance: CML.VoterList,
) => Effect.Effect<number, VoterListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.VoterList,
  elem: CML.Voter,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.VoterList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.VoterList,
  index: number,
) => CML.Voter;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.VoterList) => number;
```

Added in v2.0.0

# Types

## VoterList (type alias)

Type alias for the CML VoterList class

**Signature**

```ts
export type VoterList = CML.VoterList;
```

Added in v2.0.0

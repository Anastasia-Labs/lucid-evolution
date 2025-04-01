---
title: CML/Ed25519KeyHashList.ts
nav_order: 59
parent: Modules
---

## Ed25519KeyHashList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [Ed25519KeyHashListError (class)](#ed25519keyhashlisterror-class)
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
  - [Ed25519KeyHashList (type alias)](#ed25519keyhashlist-type-alias)

---

# Constructors

## \_new

Static method \_new of Ed25519KeyHashList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.Ed25519KeyHashList,
  Ed25519KeyHashListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls Ed25519KeyHashList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.Ed25519KeyHashList;
```

Added in v2.0.0

# Errors

## Ed25519KeyHashListError (class)

Error class for Ed25519KeyHashList operations

This error is thrown when operations on Ed25519KeyHashList instances fail.

**Signature**

```ts
export declare class Ed25519KeyHashListError
```

Added in v2.0.0

# Methods

## add

Method add of Ed25519KeyHashList

**Signature**

```ts
export declare const add: (
  instance: CML.Ed25519KeyHashList,
  elem: CML.Ed25519KeyHash,
) => Effect.Effect<void, Ed25519KeyHashListError>;
```

Added in v2.0.0

## free

Method free of Ed25519KeyHashList

**Signature**

```ts
export declare const free: (
  instance: CML.Ed25519KeyHashList,
) => Effect.Effect<void, Ed25519KeyHashListError>;
```

Added in v2.0.0

## get

Method get of Ed25519KeyHashList

**Signature**

```ts
export declare const get: (
  instance: CML.Ed25519KeyHashList,
  index: number,
) => Effect.Effect<CML.Ed25519KeyHash, Ed25519KeyHashListError>;
```

Added in v2.0.0

## len

Method len of Ed25519KeyHashList

**Signature**

```ts
export declare const len: (
  instance: CML.Ed25519KeyHashList,
) => Effect.Effect<number, Ed25519KeyHashListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.Ed25519KeyHashList,
  elem: CML.Ed25519KeyHash,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Ed25519KeyHashList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.Ed25519KeyHashList,
  index: number,
) => CML.Ed25519KeyHash;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.Ed25519KeyHashList) => number;
```

Added in v2.0.0

# Types

## Ed25519KeyHashList (type alias)

Type alias for the CML Ed25519KeyHashList class

**Signature**

```ts
export type Ed25519KeyHashList = CML.Ed25519KeyHashList;
```

Added in v2.0.0

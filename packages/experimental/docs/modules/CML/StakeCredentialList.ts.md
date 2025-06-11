---
title: CML/StakeCredentialList.ts
nav_order: 216
parent: Modules
---

## StakeCredentialList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [StakeCredentialListError (class)](#stakecredentiallisterror-class)
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
  - [StakeCredentialList (type alias)](#stakecredentiallist-type-alias)

---

# Constructors

## \_new

Static method \_new of StakeCredentialList

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.StakeCredentialList, StakeCredentialListError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls StakeCredentialList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.StakeCredentialList
```

Added in v2.0.0

# Errors

## StakeCredentialListError (class)

Error class for StakeCredentialList operations

This error is thrown when operations on StakeCredentialList instances fail.

**Signature**

```ts
export declare class StakeCredentialListError
```

Added in v2.0.0

# Methods

## add

Method add of StakeCredentialList

**Signature**

```ts
export declare const add: (
  instance: CML.StakeCredentialList,
  elem: CML.Credential
) => Effect.Effect<void, StakeCredentialListError>
```

Added in v2.0.0

## free

Method free of StakeCredentialList

**Signature**

```ts
export declare const free: (instance: CML.StakeCredentialList) => Effect.Effect<void, StakeCredentialListError>
```

Added in v2.0.0

## get

Method get of StakeCredentialList

**Signature**

```ts
export declare const get: (
  instance: CML.StakeCredentialList,
  index: number
) => Effect.Effect<CML.Credential, StakeCredentialListError>
```

Added in v2.0.0

## len

Method len of StakeCredentialList

**Signature**

```ts
export declare const len: (instance: CML.StakeCredentialList) => Effect.Effect<number, StakeCredentialListError>
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (instance: CML.StakeCredentialList, elem: CML.Credential) => void
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.StakeCredentialList) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.StakeCredentialList, index: number) => CML.Credential
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.StakeCredentialList) => number
```

Added in v2.0.0

# Types

## StakeCredentialList (type alias)

Type alias for the CML StakeCredentialList class

**Signature**

```ts
export type StakeCredentialList = CML.StakeCredentialList
```

Added in v2.0.0

---
title: CML/CommitteeColdCredentialList.ts
nav_order: 45
parent: Modules
---

## CommitteeColdCredentialList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [CommitteeColdCredentialListError (class)](#committeecoldcredentiallisterror-class)
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
  - [CommitteeColdCredentialList (type alias)](#committeecoldcredentiallist-type-alias)

---

# Constructors

## \_new

Static method \_new of CommitteeColdCredentialList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.CommitteeColdCredentialList,
  CommitteeColdCredentialListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls CommitteeColdCredentialList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.CommitteeColdCredentialList;
```

Added in v2.0.0

# Errors

## CommitteeColdCredentialListError (class)

Error class for CommitteeColdCredentialList operations

This error is thrown when operations on CommitteeColdCredentialList instances fail.

**Signature**

```ts
export declare class CommitteeColdCredentialListError
```

Added in v2.0.0

# Methods

## add

Method add of CommitteeColdCredentialList

**Signature**

```ts
export declare const add: (
  instance: CML.CommitteeColdCredentialList,
  elem: CML.Credential,
) => Effect.Effect<void, CommitteeColdCredentialListError>;
```

Added in v2.0.0

## free

Method free of CommitteeColdCredentialList

**Signature**

```ts
export declare const free: (
  instance: CML.CommitteeColdCredentialList,
) => Effect.Effect<void, CommitteeColdCredentialListError>;
```

Added in v2.0.0

## get

Method get of CommitteeColdCredentialList

**Signature**

```ts
export declare const get: (
  instance: CML.CommitteeColdCredentialList,
  index: number,
) => Effect.Effect<CML.Credential, CommitteeColdCredentialListError>;
```

Added in v2.0.0

## len

Method len of CommitteeColdCredentialList

**Signature**

```ts
export declare const len: (
  instance: CML.CommitteeColdCredentialList,
) => Effect.Effect<number, CommitteeColdCredentialListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.CommitteeColdCredentialList,
  elem: CML.Credential,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.CommitteeColdCredentialList,
) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.CommitteeColdCredentialList,
  index: number,
) => CML.Credential;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (
  instance: CML.CommitteeColdCredentialList,
) => number;
```

Added in v2.0.0

# Types

## CommitteeColdCredentialList (type alias)

Type alias for the CML CommitteeColdCredentialList class

**Signature**

```ts
export type CommitteeColdCredentialList = CML.CommitteeColdCredentialList;
```

Added in v2.0.0

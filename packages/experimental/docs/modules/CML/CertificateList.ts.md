---
title: CML/CertificateList.ts
nav_order: 34
parent: Modules
---

## CertificateList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [CertificateListError (class)](#certificatelisterror-class)
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
  - [CertificateList (type alias)](#certificatelist-type-alias)

---

# Constructors

## \_new

Static method \_new of CertificateList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.CertificateList,
  CertificateListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls CertificateList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.CertificateList;
```

Added in v2.0.0

# Errors

## CertificateListError (class)

Error class for CertificateList operations

This error is thrown when operations on CertificateList instances fail.

**Signature**

```ts
export declare class CertificateListError
```

Added in v2.0.0

# Methods

## add

Method add of CertificateList

**Signature**

```ts
export declare const add: (
  instance: CML.CertificateList,
  elem: CML.Certificate,
) => Effect.Effect<void, CertificateListError>;
```

Added in v2.0.0

## free

Method free of CertificateList

**Signature**

```ts
export declare const free: (
  instance: CML.CertificateList,
) => Effect.Effect<void, CertificateListError>;
```

Added in v2.0.0

## get

Method get of CertificateList

**Signature**

```ts
export declare const get: (
  instance: CML.CertificateList,
  index: number,
) => Effect.Effect<CML.Certificate, CertificateListError>;
```

Added in v2.0.0

## len

Method len of CertificateList

**Signature**

```ts
export declare const len: (
  instance: CML.CertificateList,
) => Effect.Effect<number, CertificateListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.CertificateList,
  elem: CML.Certificate,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.CertificateList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.CertificateList,
  index: number,
) => CML.Certificate;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.CertificateList) => number;
```

Added in v2.0.0

# Types

## CertificateList (type alias)

Type alias for the CML CertificateList class

**Signature**

```ts
export type CertificateList = CML.CertificateList;
```

Added in v2.0.0

---
title: CML/FilesDetailsList.ts
nav_order: 100
parent: Modules
---

## FilesDetailsList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [FilesDetailsListError (class)](#filesdetailslisterror-class)
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
  - [FilesDetailsList (type alias)](#filesdetailslist-type-alias)

---

# Constructors

## \_new

Static method \_new of FilesDetailsList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.FilesDetailsList,
  FilesDetailsListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls FilesDetailsList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.FilesDetailsList;
```

Added in v2.0.0

# Errors

## FilesDetailsListError (class)

Error class for FilesDetailsList operations

This error is thrown when operations on FilesDetailsList instances fail.

**Signature**

```ts
export declare class FilesDetailsListError
```

Added in v2.0.0

# Methods

## add

Method add of FilesDetailsList

**Signature**

```ts
export declare const add: (
  instance: CML.FilesDetailsList,
  elem: CML.CIP25FilesDetails,
) => Effect.Effect<void, FilesDetailsListError>;
```

Added in v2.0.0

## free

Method free of FilesDetailsList

**Signature**

```ts
export declare const free: (
  instance: CML.FilesDetailsList,
) => Effect.Effect<void, FilesDetailsListError>;
```

Added in v2.0.0

## get

Method get of FilesDetailsList

**Signature**

```ts
export declare const get: (
  instance: CML.FilesDetailsList,
  index: number,
) => Effect.Effect<CML.CIP25FilesDetails, FilesDetailsListError>;
```

Added in v2.0.0

## len

Method len of FilesDetailsList

**Signature**

```ts
export declare const len: (
  instance: CML.FilesDetailsList,
) => Effect.Effect<number, FilesDetailsListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.FilesDetailsList,
  elem: CML.CIP25FilesDetails,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.FilesDetailsList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.FilesDetailsList,
  index: number,
) => CML.CIP25FilesDetails;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.FilesDetailsList) => number;
```

Added in v2.0.0

# Types

## FilesDetailsList (type alias)

Type alias for the CML FilesDetailsList class

**Signature**

```ts
export type FilesDetailsList = CML.FilesDetailsList;
```

Added in v2.0.0

---
title: CML/LanguageList.ts
nav_order: 113
parent: Modules
---

## LanguageList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [LanguageListError (class)](#languagelisterror-class)
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
  - [LanguageList (type alias)](#languagelist-type-alias)

---

# Constructors

## \_new

Static method \_new of LanguageList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.LanguageList,
  LanguageListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls LanguageList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.LanguageList;
```

Added in v2.0.0

# Errors

## LanguageListError (class)

Error class for LanguageList operations

This error is thrown when operations on LanguageList instances fail.

**Signature**

```ts
export declare class LanguageListError
```

Added in v2.0.0

# Methods

## add

Method add of LanguageList

**Signature**

```ts
export declare const add: (
  instance: CML.LanguageList,
  elem: CML.Language,
) => Effect.Effect<void, LanguageListError>;
```

Added in v2.0.0

## free

Method free of LanguageList

**Signature**

```ts
export declare const free: (
  instance: CML.LanguageList,
) => Effect.Effect<void, LanguageListError>;
```

Added in v2.0.0

## get

Method get of LanguageList

**Signature**

```ts
export declare const get: (
  instance: CML.LanguageList,
  index: number,
) => Effect.Effect<CML.Language, LanguageListError>;
```

Added in v2.0.0

## len

Method len of LanguageList

**Signature**

```ts
export declare const len: (
  instance: CML.LanguageList,
) => Effect.Effect<number, LanguageListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.LanguageList,
  elem: CML.Language,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.LanguageList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.LanguageList,
  index: number,
) => CML.Language;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.LanguageList) => number;
```

Added in v2.0.0

# Types

## LanguageList (type alias)

Type alias for the CML LanguageList class

**Signature**

```ts
export type LanguageList = CML.LanguageList;
```

Added in v2.0.0

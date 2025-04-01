---
title: CML/CIP25String64List.ts
nav_order: 35
parent: Modules
---

## CIP25String64List overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [CIP25String64ListError (class)](#cip25string64listerror-class)
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
  - [CIP25String64List (type alias)](#cip25string64list-type-alias)

---

# Constructors

## \_new

Static method \_new of CIP25String64List

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.CIP25String64List, CIP25String64ListError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls CIP25String64List.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.CIP25String64List
```

Added in v2.0.0

# Errors

## CIP25String64ListError (class)

Error class for CIP25String64List operations

This error is thrown when operations on CIP25String64List instances fail.

**Signature**

```ts
export declare class CIP25String64ListError
```

Added in v2.0.0

# Methods

## add

Method add of CIP25String64List

**Signature**

```ts
export declare const add: (
  instance: CML.CIP25String64List,
  elem: CML.CIP25String64
) => Effect.Effect<void, CIP25String64ListError>
```

Added in v2.0.0

## free

Method free of CIP25String64List

**Signature**

```ts
export declare const free: (instance: CML.CIP25String64List) => Effect.Effect<void, CIP25String64ListError>
```

Added in v2.0.0

## get

Method get of CIP25String64List

**Signature**

```ts
export declare const get: (
  instance: CML.CIP25String64List,
  index: number
) => Effect.Effect<CML.CIP25String64, CIP25String64ListError>
```

Added in v2.0.0

## len

Method len of CIP25String64List

**Signature**

```ts
export declare const len: (instance: CML.CIP25String64List) => Effect.Effect<number, CIP25String64ListError>
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (instance: CML.CIP25String64List, elem: CML.CIP25String64) => void
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.CIP25String64List) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.CIP25String64List, index: number) => CML.CIP25String64
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.CIP25String64List) => number
```

Added in v2.0.0

# Types

## CIP25String64List (type alias)

Type alias for the CML CIP25String64List class

**Signature**

```ts
export type CIP25String64List = CML.CIP25String64List
```

Added in v2.0.0

---
title: CML/PlutusV1ScriptList.ts
nav_order: 154
parent: Modules
---

## PlutusV1ScriptList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [PlutusV1ScriptListError (class)](#plutusv1scriptlisterror-class)
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
  - [PlutusV1ScriptList (type alias)](#plutusv1scriptlist-type-alias)

---

# Constructors

## \_new

Static method \_new of PlutusV1ScriptList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.PlutusV1ScriptList,
  PlutusV1ScriptListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls PlutusV1ScriptList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.PlutusV1ScriptList;
```

Added in v2.0.0

# Errors

## PlutusV1ScriptListError (class)

Error class for PlutusV1ScriptList operations

This error is thrown when operations on PlutusV1ScriptList instances fail.

**Signature**

```ts
export declare class PlutusV1ScriptListError
```

Added in v2.0.0

# Methods

## add

Method add of PlutusV1ScriptList

**Signature**

```ts
export declare const add: (
  instance: CML.PlutusV1ScriptList,
  elem: CML.PlutusV1Script,
) => Effect.Effect<void, PlutusV1ScriptListError>;
```

Added in v2.0.0

## free

Method free of PlutusV1ScriptList

**Signature**

```ts
export declare const free: (
  instance: CML.PlutusV1ScriptList,
) => Effect.Effect<void, PlutusV1ScriptListError>;
```

Added in v2.0.0

## get

Method get of PlutusV1ScriptList

**Signature**

```ts
export declare const get: (
  instance: CML.PlutusV1ScriptList,
  index: number,
) => Effect.Effect<CML.PlutusV1Script, PlutusV1ScriptListError>;
```

Added in v2.0.0

## len

Method len of PlutusV1ScriptList

**Signature**

```ts
export declare const len: (
  instance: CML.PlutusV1ScriptList,
) => Effect.Effect<number, PlutusV1ScriptListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.PlutusV1ScriptList,
  elem: CML.PlutusV1Script,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PlutusV1ScriptList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.PlutusV1ScriptList,
  index: number,
) => CML.PlutusV1Script;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.PlutusV1ScriptList) => number;
```

Added in v2.0.0

# Types

## PlutusV1ScriptList (type alias)

Type alias for the CML PlutusV1ScriptList class

**Signature**

```ts
export type PlutusV1ScriptList = CML.PlutusV1ScriptList;
```

Added in v2.0.0

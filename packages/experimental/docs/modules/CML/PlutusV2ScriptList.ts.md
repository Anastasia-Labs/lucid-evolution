---
title: CML/PlutusV2ScriptList.ts
nav_order: 156
parent: Modules
---

## PlutusV2ScriptList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [PlutusV2ScriptListError (class)](#plutusv2scriptlisterror-class)
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
  - [PlutusV2ScriptList (type alias)](#plutusv2scriptlist-type-alias)

---

# Constructors

## \_new

Static method \_new of PlutusV2ScriptList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.PlutusV2ScriptList,
  PlutusV2ScriptListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls PlutusV2ScriptList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.PlutusV2ScriptList;
```

Added in v2.0.0

# Errors

## PlutusV2ScriptListError (class)

Error class for PlutusV2ScriptList operations

This error is thrown when operations on PlutusV2ScriptList instances fail.

**Signature**

```ts
export declare class PlutusV2ScriptListError
```

Added in v2.0.0

# Methods

## add

Method add of PlutusV2ScriptList

**Signature**

```ts
export declare const add: (
  instance: CML.PlutusV2ScriptList,
  elem: CML.PlutusV2Script,
) => Effect.Effect<void, PlutusV2ScriptListError>;
```

Added in v2.0.0

## free

Method free of PlutusV2ScriptList

**Signature**

```ts
export declare const free: (
  instance: CML.PlutusV2ScriptList,
) => Effect.Effect<void, PlutusV2ScriptListError>;
```

Added in v2.0.0

## get

Method get of PlutusV2ScriptList

**Signature**

```ts
export declare const get: (
  instance: CML.PlutusV2ScriptList,
  index: number,
) => Effect.Effect<CML.PlutusV2Script, PlutusV2ScriptListError>;
```

Added in v2.0.0

## len

Method len of PlutusV2ScriptList

**Signature**

```ts
export declare const len: (
  instance: CML.PlutusV2ScriptList,
) => Effect.Effect<number, PlutusV2ScriptListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.PlutusV2ScriptList,
  elem: CML.PlutusV2Script,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PlutusV2ScriptList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.PlutusV2ScriptList,
  index: number,
) => CML.PlutusV2Script;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.PlutusV2ScriptList) => number;
```

Added in v2.0.0

# Types

## PlutusV2ScriptList (type alias)

Type alias for the CML PlutusV2ScriptList class

**Signature**

```ts
export type PlutusV2ScriptList = CML.PlutusV2ScriptList;
```

Added in v2.0.0

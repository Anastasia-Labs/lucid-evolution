---
title: CML/PlutusV3ScriptList.ts
nav_order: 158
parent: Modules
---

## PlutusV3ScriptList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [PlutusV3ScriptListError (class)](#plutusv3scriptlisterror-class)
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
  - [PlutusV3ScriptList (type alias)](#plutusv3scriptlist-type-alias)

---

# Constructors

## \_new

Static method \_new of PlutusV3ScriptList

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.PlutusV3ScriptList,
  PlutusV3ScriptListError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls PlutusV3ScriptList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.PlutusV3ScriptList;
```

Added in v2.0.0

# Errors

## PlutusV3ScriptListError (class)

Error class for PlutusV3ScriptList operations

This error is thrown when operations on PlutusV3ScriptList instances fail.

**Signature**

```ts
export declare class PlutusV3ScriptListError
```

Added in v2.0.0

# Methods

## add

Method add of PlutusV3ScriptList

**Signature**

```ts
export declare const add: (
  instance: CML.PlutusV3ScriptList,
  elem: CML.PlutusV3Script,
) => Effect.Effect<void, PlutusV3ScriptListError>;
```

Added in v2.0.0

## free

Method free of PlutusV3ScriptList

**Signature**

```ts
export declare const free: (
  instance: CML.PlutusV3ScriptList,
) => Effect.Effect<void, PlutusV3ScriptListError>;
```

Added in v2.0.0

## get

Method get of PlutusV3ScriptList

**Signature**

```ts
export declare const get: (
  instance: CML.PlutusV3ScriptList,
  index: number,
) => Effect.Effect<CML.PlutusV3Script, PlutusV3ScriptListError>;
```

Added in v2.0.0

## len

Method len of PlutusV3ScriptList

**Signature**

```ts
export declare const len: (
  instance: CML.PlutusV3ScriptList,
) => Effect.Effect<number, PlutusV3ScriptListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.PlutusV3ScriptList,
  elem: CML.PlutusV3Script,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PlutusV3ScriptList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.PlutusV3ScriptList,
  index: number,
) => CML.PlutusV3Script;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.PlutusV3ScriptList) => number;
```

Added in v2.0.0

# Types

## PlutusV3ScriptList (type alias)

Type alias for the CML PlutusV3ScriptList class

**Signature**

```ts
export type PlutusV3ScriptList = CML.PlutusV3ScriptList;
```

Added in v2.0.0

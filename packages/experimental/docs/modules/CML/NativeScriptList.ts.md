---
title: CML/NativeScriptList.ts
nav_order: 142
parent: Modules
---

## NativeScriptList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [NativeScriptListError (class)](#nativescriptlisterror-class)
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
  - [NativeScriptList (type alias)](#nativescriptlist-type-alias)

---

# Constructors

## \_new

Static method \_new of NativeScriptList

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.NativeScriptList, NativeScriptListError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls NativeScriptList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.NativeScriptList
```

Added in v2.0.0

# Errors

## NativeScriptListError (class)

Error class for NativeScriptList operations

This error is thrown when operations on NativeScriptList instances fail.

**Signature**

```ts
export declare class NativeScriptListError
```

Added in v2.0.0

# Methods

## add

Method add of NativeScriptList

**Signature**

```ts
export declare const add: (
  instance: CML.NativeScriptList,
  elem: CML.NativeScript
) => Effect.Effect<void, NativeScriptListError>
```

Added in v2.0.0

## free

Method free of NativeScriptList

**Signature**

```ts
export declare const free: (instance: CML.NativeScriptList) => Effect.Effect<void, NativeScriptListError>
```

Added in v2.0.0

## get

Method get of NativeScriptList

**Signature**

```ts
export declare const get: (
  instance: CML.NativeScriptList,
  index: number
) => Effect.Effect<CML.NativeScript, NativeScriptListError>
```

Added in v2.0.0

## len

Method len of NativeScriptList

**Signature**

```ts
export declare const len: (instance: CML.NativeScriptList) => Effect.Effect<number, NativeScriptListError>
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (instance: CML.NativeScriptList, elem: CML.NativeScript) => void
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.NativeScriptList) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.NativeScriptList, index: number) => CML.NativeScript
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.NativeScriptList) => number
```

Added in v2.0.0

# Types

## NativeScriptList (type alias)

Type alias for the CML NativeScriptList class

**Signature**

```ts
export type NativeScriptList = CML.NativeScriptList
```

Added in v2.0.0

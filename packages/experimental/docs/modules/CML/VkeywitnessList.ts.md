---
title: CML/VkeywitnessList.ts
nav_order: 275
parent: Modules
---

## VkeywitnessList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [VkeywitnessListError (class)](#vkeywitnesslisterror-class)
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
  - [VkeywitnessList (type alias)](#vkeywitnesslist-type-alias)

---

# Constructors

## \_new

Static method \_new of VkeywitnessList

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.VkeywitnessList, VkeywitnessListError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls VkeywitnessList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.VkeywitnessList
```

Added in v2.0.0

# Errors

## VkeywitnessListError (class)

Error class for VkeywitnessList operations

This error is thrown when operations on VkeywitnessList instances fail.

**Signature**

```ts
export declare class VkeywitnessListError
```

Added in v2.0.0

# Methods

## add

Method add of VkeywitnessList

**Signature**

```ts
export declare const add: (
  instance: CML.VkeywitnessList,
  elem: CML.Vkeywitness
) => Effect.Effect<void, VkeywitnessListError>
```

Added in v2.0.0

## free

Method free of VkeywitnessList

**Signature**

```ts
export declare const free: (instance: CML.VkeywitnessList) => Effect.Effect<void, VkeywitnessListError>
```

Added in v2.0.0

## get

Method get of VkeywitnessList

**Signature**

```ts
export declare const get: (
  instance: CML.VkeywitnessList,
  index: number
) => Effect.Effect<CML.Vkeywitness, VkeywitnessListError>
```

Added in v2.0.0

## len

Method len of VkeywitnessList

**Signature**

```ts
export declare const len: (instance: CML.VkeywitnessList) => Effect.Effect<number, VkeywitnessListError>
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (instance: CML.VkeywitnessList, elem: CML.Vkeywitness) => void
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.VkeywitnessList) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.VkeywitnessList, index: number) => CML.Vkeywitness
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.VkeywitnessList) => number
```

Added in v2.0.0

# Types

## VkeywitnessList (type alias)

Type alias for the CML VkeywitnessList class

**Signature**

```ts
export type VkeywitnessList = CML.VkeywitnessList
```

Added in v2.0.0

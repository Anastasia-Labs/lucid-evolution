---
title: CML/BootstrapWitnessList.ts
nav_order: 21
parent: Modules
---

## BootstrapWitnessList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [BootstrapWitnessListError (class)](#bootstrapwitnesslisterror-class)
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
  - [BootstrapWitnessList (type alias)](#bootstrapwitnesslist-type-alias)

---

# Constructors

## \_new

Static method \_new of BootstrapWitnessList

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.BootstrapWitnessList, BootstrapWitnessListError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls BootstrapWitnessList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.BootstrapWitnessList
```

Added in v2.0.0

# Errors

## BootstrapWitnessListError (class)

Error class for BootstrapWitnessList operations

This error is thrown when operations on BootstrapWitnessList instances fail.

**Signature**

```ts
export declare class BootstrapWitnessListError
```

Added in v2.0.0

# Methods

## add

Method add of BootstrapWitnessList

**Signature**

```ts
export declare const add: (
  instance: CML.BootstrapWitnessList,
  elem: CML.BootstrapWitness
) => Effect.Effect<void, BootstrapWitnessListError>
```

Added in v2.0.0

## free

Method free of BootstrapWitnessList

**Signature**

```ts
export declare const free: (instance: CML.BootstrapWitnessList) => Effect.Effect<void, BootstrapWitnessListError>
```

Added in v2.0.0

## get

Method get of BootstrapWitnessList

**Signature**

```ts
export declare const get: (
  instance: CML.BootstrapWitnessList,
  index: number
) => Effect.Effect<CML.BootstrapWitness, BootstrapWitnessListError>
```

Added in v2.0.0

## len

Method len of BootstrapWitnessList

**Signature**

```ts
export declare const len: (instance: CML.BootstrapWitnessList) => Effect.Effect<number, BootstrapWitnessListError>
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (instance: CML.BootstrapWitnessList, elem: CML.BootstrapWitness) => void
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.BootstrapWitnessList) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.BootstrapWitnessList, index: number) => CML.BootstrapWitness
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.BootstrapWitnessList) => number
```

Added in v2.0.0

# Types

## BootstrapWitnessList (type alias)

Type alias for the CML BootstrapWitnessList class

**Signature**

```ts
export type BootstrapWitnessList = CML.BootstrapWitnessList
```

Added in v2.0.0

---
title: CML/ProposalProcedureList.ts
nav_order: 172
parent: Modules
---

## ProposalProcedureList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [ProposalProcedureListError (class)](#proposalprocedurelisterror-class)
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
  - [ProposalProcedureList (type alias)](#proposalprocedurelist-type-alias)

---

# Constructors

## \_new

Static method \_new of ProposalProcedureList

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.ProposalProcedureList, ProposalProcedureListError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ProposalProcedureList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.ProposalProcedureList
```

Added in v2.0.0

# Errors

## ProposalProcedureListError (class)

Error class for ProposalProcedureList operations

This error is thrown when operations on ProposalProcedureList instances fail.

**Signature**

```ts
export declare class ProposalProcedureListError
```

Added in v2.0.0

# Methods

## add

Method add of ProposalProcedureList

**Signature**

```ts
export declare const add: (
  instance: CML.ProposalProcedureList,
  elem: CML.ProposalProcedure
) => Effect.Effect<void, ProposalProcedureListError>
```

Added in v2.0.0

## free

Method free of ProposalProcedureList

**Signature**

```ts
export declare const free: (instance: CML.ProposalProcedureList) => Effect.Effect<void, ProposalProcedureListError>
```

Added in v2.0.0

## get

Method get of ProposalProcedureList

**Signature**

```ts
export declare const get: (
  instance: CML.ProposalProcedureList,
  index: number
) => Effect.Effect<CML.ProposalProcedure, ProposalProcedureListError>
```

Added in v2.0.0

## len

Method len of ProposalProcedureList

**Signature**

```ts
export declare const len: (instance: CML.ProposalProcedureList) => Effect.Effect<number, ProposalProcedureListError>
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (instance: CML.ProposalProcedureList, elem: CML.ProposalProcedure) => void
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ProposalProcedureList) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.ProposalProcedureList, index: number) => CML.ProposalProcedure
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.ProposalProcedureList) => number
```

Added in v2.0.0

# Types

## ProposalProcedureList (type alias)

Type alias for the CML ProposalProcedureList class

**Signature**

```ts
export type ProposalProcedureList = CML.ProposalProcedureList
```

Added in v2.0.0

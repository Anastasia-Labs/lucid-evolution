---
title: CML/MapGovActionIdToVotingProcedure.ts
nav_order: 127
parent: Modules
---

## MapGovActionIdToVotingProcedure overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MapGovActionIdToVotingProcedureError (class)](#mapgovactionidtovotingprocedureerror-class)
- [Methods](#methods)
  - [free](#free)
  - [get](#get)
  - [insert](#insert)
  - [keys](#keys)
  - [len](#len)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getUnsafe](#getunsafe)
  - [insertUnsafe](#insertunsafe)
  - [keysUnsafe](#keysunsafe)
  - [lenUnsafe](#lenunsafe)
- [Types](#types)
  - [MapGovActionIdToVotingProcedure (type alias)](#mapgovactionidtovotingprocedure-type-alias)

---

# Constructors

## \_new

Static method \_new of MapGovActionIdToVotingProcedure

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.MapGovActionIdToVotingProcedure,
  MapGovActionIdToVotingProcedureError
>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls MapGovActionIdToVotingProcedure.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.MapGovActionIdToVotingProcedure
```

Added in v2.0.0

# Errors

## MapGovActionIdToVotingProcedureError (class)

Error class for MapGovActionIdToVotingProcedure operations

This error is thrown when operations on MapGovActionIdToVotingProcedure instances fail.

**Signature**

```ts
export declare class MapGovActionIdToVotingProcedureError
```

Added in v2.0.0

# Methods

## free

Method free of MapGovActionIdToVotingProcedure

**Signature**

```ts
export declare const free: (
  instance: CML.MapGovActionIdToVotingProcedure
) => Effect.Effect<void, MapGovActionIdToVotingProcedureError>
```

Added in v2.0.0

## get

Method get of MapGovActionIdToVotingProcedure

**Signature**

```ts
export declare const get: (
  instance: CML.MapGovActionIdToVotingProcedure,
  key: CML.GovActionId
) => Effect.Effect<CML.VotingProcedure | undefined, MapGovActionIdToVotingProcedureError>
```

Added in v2.0.0

## insert

Method insert of MapGovActionIdToVotingProcedure

**Signature**

```ts
export declare const insert: (
  instance: CML.MapGovActionIdToVotingProcedure,
  key: CML.GovActionId,
  value: CML.VotingProcedure
) => Effect.Effect<CML.VotingProcedure | undefined, MapGovActionIdToVotingProcedureError>
```

Added in v2.0.0

## keys

Method keys of MapGovActionIdToVotingProcedure

**Signature**

```ts
export declare const keys: (
  instance: CML.MapGovActionIdToVotingProcedure
) => Effect.Effect<CML.GovActionIdList, MapGovActionIdToVotingProcedureError>
```

Added in v2.0.0

## len

Method len of MapGovActionIdToVotingProcedure

**Signature**

```ts
export declare const len: (
  instance: CML.MapGovActionIdToVotingProcedure
) => Effect.Effect<number, MapGovActionIdToVotingProcedureError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.MapGovActionIdToVotingProcedure) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.MapGovActionIdToVotingProcedure,
  key: CML.GovActionId
) => CML.VotingProcedure | undefined
```

Added in v2.0.0

## insertUnsafe

Unsafely calls instance.insert without Effect wrapper

**Signature**

```ts
export declare const insertUnsafe: (
  instance: CML.MapGovActionIdToVotingProcedure,
  key: CML.GovActionId,
  value: CML.VotingProcedure
) => CML.VotingProcedure | undefined
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (instance: CML.MapGovActionIdToVotingProcedure) => CML.GovActionIdList
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.MapGovActionIdToVotingProcedure) => number
```

Added in v2.0.0

# Types

## MapGovActionIdToVotingProcedure (type alias)

Type alias for the CML MapGovActionIdToVotingProcedure class

**Signature**

```ts
export type MapGovActionIdToVotingProcedure = CML.MapGovActionIdToVotingProcedure
```

Added in v2.0.0

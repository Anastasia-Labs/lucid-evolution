---
title: CML/VotingProcedures.ts
nav_order: 284
parent: Modules
---

## VotingProcedures overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [VotingProceduresError (class)](#votingprocedureserror-class)
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
  - [VotingProcedures (type alias)](#votingprocedures-type-alias)

---

# Constructors

## \_new

Static method \_new of VotingProcedures

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.VotingProcedures,
  VotingProceduresError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls VotingProcedures.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.VotingProcedures;
```

Added in v2.0.0

# Errors

## VotingProceduresError (class)

Error class for VotingProcedures operations

This error is thrown when operations on VotingProcedures instances fail.

**Signature**

```ts
export declare class VotingProceduresError
```

Added in v2.0.0

# Methods

## free

Method free of VotingProcedures

**Signature**

```ts
export declare const free: (
  instance: CML.VotingProcedures,
) => Effect.Effect<void, VotingProceduresError>;
```

Added in v2.0.0

## get

Method get of VotingProcedures

**Signature**

```ts
export declare const get: (
  instance: CML.VotingProcedures,
  key: CML.Voter,
) => Effect.Effect<
  CML.MapGovActionIdToVotingProcedure | undefined,
  VotingProceduresError
>;
```

Added in v2.0.0

## insert

Method insert of VotingProcedures

**Signature**

```ts
export declare const insert: (
  instance: CML.VotingProcedures,
  key: CML.Voter,
  value: CML.MapGovActionIdToVotingProcedure,
) => Effect.Effect<
  CML.MapGovActionIdToVotingProcedure | undefined,
  VotingProceduresError
>;
```

Added in v2.0.0

## keys

Method keys of VotingProcedures

**Signature**

```ts
export declare const keys: (
  instance: CML.VotingProcedures,
) => Effect.Effect<CML.VoterList, VotingProceduresError>;
```

Added in v2.0.0

## len

Method len of VotingProcedures

**Signature**

```ts
export declare const len: (
  instance: CML.VotingProcedures,
) => Effect.Effect<number, VotingProceduresError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.VotingProcedures) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.VotingProcedures,
  key: CML.Voter,
) => CML.MapGovActionIdToVotingProcedure | undefined;
```

Added in v2.0.0

## insertUnsafe

Unsafely calls instance.insert without Effect wrapper

**Signature**

```ts
export declare const insertUnsafe: (
  instance: CML.VotingProcedures,
  key: CML.Voter,
  value: CML.MapGovActionIdToVotingProcedure,
) => CML.MapGovActionIdToVotingProcedure | undefined;
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (
  instance: CML.VotingProcedures,
) => CML.VoterList;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.VotingProcedures) => number;
```

Added in v2.0.0

# Types

## VotingProcedures (type alias)

Type alias for the CML VotingProcedures class

**Signature**

```ts
export type VotingProcedures = CML.VotingProcedures;
```

Added in v2.0.0

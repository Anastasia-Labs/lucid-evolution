---
title: CML/MapStakeCredentialToDeltaCoin.ts
nav_order: 130
parent: Modules
---

## MapStakeCredentialToDeltaCoin overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MapStakeCredentialToDeltaCoinError (class)](#mapstakecredentialtodeltacoinerror-class)
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
  - [MapStakeCredentialToDeltaCoin (type alias)](#mapstakecredentialtodeltacoin-type-alias)

---

# Constructors

## \_new

Static method \_new of MapStakeCredentialToDeltaCoin

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.MapStakeCredentialToDeltaCoin,
  MapStakeCredentialToDeltaCoinError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls MapStakeCredentialToDeltaCoin.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.MapStakeCredentialToDeltaCoin;
```

Added in v2.0.0

# Errors

## MapStakeCredentialToDeltaCoinError (class)

Error class for MapStakeCredentialToDeltaCoin operations

This error is thrown when operations on MapStakeCredentialToDeltaCoin instances fail.

**Signature**

```ts
export declare class MapStakeCredentialToDeltaCoinError
```

Added in v2.0.0

# Methods

## free

Method free of MapStakeCredentialToDeltaCoin

**Signature**

```ts
export declare const free: (
  instance: CML.MapStakeCredentialToDeltaCoin,
) => Effect.Effect<void, MapStakeCredentialToDeltaCoinError>;
```

Added in v2.0.0

## get

Method get of MapStakeCredentialToDeltaCoin

**Signature**

```ts
export declare const get: (
  instance: CML.MapStakeCredentialToDeltaCoin,
  key: CML.Credential,
) => Effect.Effect<CML.Int | undefined, MapStakeCredentialToDeltaCoinError>;
```

Added in v2.0.0

## insert

Method insert of MapStakeCredentialToDeltaCoin

**Signature**

```ts
export declare const insert: (
  instance: CML.MapStakeCredentialToDeltaCoin,
  key: CML.Credential,
  value: CML.Int,
) => Effect.Effect<CML.Int | undefined, MapStakeCredentialToDeltaCoinError>;
```

Added in v2.0.0

## keys

Method keys of MapStakeCredentialToDeltaCoin

**Signature**

```ts
export declare const keys: (
  instance: CML.MapStakeCredentialToDeltaCoin,
) => Effect.Effect<CML.StakeCredentialList, MapStakeCredentialToDeltaCoinError>;
```

Added in v2.0.0

## len

Method len of MapStakeCredentialToDeltaCoin

**Signature**

```ts
export declare const len: (
  instance: CML.MapStakeCredentialToDeltaCoin,
) => Effect.Effect<number, MapStakeCredentialToDeltaCoinError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.MapStakeCredentialToDeltaCoin,
) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.MapStakeCredentialToDeltaCoin,
  key: CML.Credential,
) => CML.Int | undefined;
```

Added in v2.0.0

## insertUnsafe

Unsafely calls instance.insert without Effect wrapper

**Signature**

```ts
export declare const insertUnsafe: (
  instance: CML.MapStakeCredentialToDeltaCoin,
  key: CML.Credential,
  value: CML.Int,
) => CML.Int | undefined;
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (
  instance: CML.MapStakeCredentialToDeltaCoin,
) => CML.StakeCredentialList;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (
  instance: CML.MapStakeCredentialToDeltaCoin,
) => number;
```

Added in v2.0.0

# Types

## MapStakeCredentialToDeltaCoin (type alias)

Type alias for the CML MapStakeCredentialToDeltaCoin class

**Signature**

```ts
export type MapStakeCredentialToDeltaCoin = CML.MapStakeCredentialToDeltaCoin;
```

Added in v2.0.0

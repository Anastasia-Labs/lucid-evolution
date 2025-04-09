---
title: CML/MapRewardAccountToCoin.ts
nav_order: 125
parent: Modules
---

## MapRewardAccountToCoin overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MapRewardAccountToCoinError (class)](#maprewardaccounttocoinerror-class)
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
  - [MapRewardAccountToCoin (type alias)](#maprewardaccounttocoin-type-alias)

---

# Constructors

## \_new

Static method \_new of MapRewardAccountToCoin

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.MapRewardAccountToCoin,
  MapRewardAccountToCoinError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls MapRewardAccountToCoin.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.MapRewardAccountToCoin;
```

Added in v2.0.0

# Errors

## MapRewardAccountToCoinError (class)

Error class for MapRewardAccountToCoin operations

This error is thrown when operations on MapRewardAccountToCoin instances fail.

**Signature**

```ts
export declare class MapRewardAccountToCoinError
```

Added in v2.0.0

# Methods

## free

Method free of MapRewardAccountToCoin

**Signature**

```ts
export declare const free: (
  instance: CML.MapRewardAccountToCoin,
) => Effect.Effect<void, MapRewardAccountToCoinError>;
```

Added in v2.0.0

## get

Method get of MapRewardAccountToCoin

**Signature**

```ts
export declare const get: (
  instance: CML.MapRewardAccountToCoin,
  key: CML.RewardAddress,
) => Effect.Effect<bigint | undefined, MapRewardAccountToCoinError>;
```

Added in v2.0.0

## insert

Method insert of MapRewardAccountToCoin

**Signature**

```ts
export declare const insert: (
  instance: CML.MapRewardAccountToCoin,
  key: CML.RewardAddress,
  value: bigint,
) => Effect.Effect<bigint | undefined, MapRewardAccountToCoinError>;
```

Added in v2.0.0

## keys

Method keys of MapRewardAccountToCoin

**Signature**

```ts
export declare const keys: (
  instance: CML.MapRewardAccountToCoin,
) => Effect.Effect<CML.RewardAccountList, MapRewardAccountToCoinError>;
```

Added in v2.0.0

## len

Method len of MapRewardAccountToCoin

**Signature**

```ts
export declare const len: (
  instance: CML.MapRewardAccountToCoin,
) => Effect.Effect<number, MapRewardAccountToCoinError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.MapRewardAccountToCoin) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.MapRewardAccountToCoin,
  key: CML.RewardAddress,
) => bigint | undefined;
```

Added in v2.0.0

## insertUnsafe

Unsafely calls instance.insert without Effect wrapper

**Signature**

```ts
export declare const insertUnsafe: (
  instance: CML.MapRewardAccountToCoin,
  key: CML.RewardAddress,
  value: bigint,
) => bigint | undefined;
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (
  instance: CML.MapRewardAccountToCoin,
) => CML.RewardAccountList;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (
  instance: CML.MapRewardAccountToCoin,
) => number;
```

Added in v2.0.0

# Types

## MapRewardAccountToCoin (type alias)

Type alias for the CML MapRewardAccountToCoin class

**Signature**

```ts
export type MapRewardAccountToCoin = CML.MapRewardAccountToCoin;
```

Added in v2.0.0

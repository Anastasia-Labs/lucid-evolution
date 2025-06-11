---
title: CML/MapAssetNameToCoin.ts
nav_order: 122
parent: Modules
---

## MapAssetNameToCoin overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MapAssetNameToCoinError (class)](#mapassetnametocoinerror-class)
- [Methods](#methods)
  - [free](#free)
  - [get](#get)
  - [insert](#insert)
  - [isEmpty](#isempty)
  - [keys](#keys)
  - [len](#len)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getUnsafe](#getunsafe)
  - [insertUnsafe](#insertunsafe)
  - [isEmptyUnsafe](#isemptyunsafe)
  - [keysUnsafe](#keysunsafe)
  - [lenUnsafe](#lenunsafe)
- [Types](#types)
  - [MapAssetNameToCoin (type alias)](#mapassetnametocoin-type-alias)

---

# Constructors

## \_new

Static method \_new of MapAssetNameToCoin

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.MapAssetNameToCoin, MapAssetNameToCoinError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls MapAssetNameToCoin.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.MapAssetNameToCoin
```

Added in v2.0.0

# Errors

## MapAssetNameToCoinError (class)

Error class for MapAssetNameToCoin operations

This error is thrown when operations on MapAssetNameToCoin instances fail.

**Signature**

```ts
export declare class MapAssetNameToCoinError
```

Added in v2.0.0

# Methods

## free

Method free of MapAssetNameToCoin

**Signature**

```ts
export declare const free: (instance: CML.MapAssetNameToCoin) => Effect.Effect<void, MapAssetNameToCoinError>
```

Added in v2.0.0

## get

Method get of MapAssetNameToCoin

**Signature**

```ts
export declare const get: (
  instance: CML.MapAssetNameToCoin,
  key: CML.AssetName
) => Effect.Effect<bigint | undefined, MapAssetNameToCoinError>
```

Added in v2.0.0

## insert

Method insert of MapAssetNameToCoin

**Signature**

```ts
export declare const insert: (
  instance: CML.MapAssetNameToCoin,
  key: CML.AssetName,
  value: bigint
) => Effect.Effect<bigint | undefined, MapAssetNameToCoinError>
```

Added in v2.0.0

## isEmpty

Method isEmpty of MapAssetNameToCoin

**Signature**

```ts
export declare const isEmpty: (instance: CML.MapAssetNameToCoin) => Effect.Effect<boolean, MapAssetNameToCoinError>
```

Added in v2.0.0

## keys

Method keys of MapAssetNameToCoin

**Signature**

```ts
export declare const keys: (
  instance: CML.MapAssetNameToCoin
) => Effect.Effect<CML.AssetNameList, MapAssetNameToCoinError>
```

Added in v2.0.0

## len

Method len of MapAssetNameToCoin

**Signature**

```ts
export declare const len: (instance: CML.MapAssetNameToCoin) => Effect.Effect<number, MapAssetNameToCoinError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.MapAssetNameToCoin) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.MapAssetNameToCoin, key: CML.AssetName) => bigint | undefined
```

Added in v2.0.0

## insertUnsafe

Unsafely calls instance.insert without Effect wrapper

**Signature**

```ts
export declare const insertUnsafe: (
  instance: CML.MapAssetNameToCoin,
  key: CML.AssetName,
  value: bigint
) => bigint | undefined
```

Added in v2.0.0

## isEmptyUnsafe

Unsafely calls instance.isEmpty without Effect wrapper

**Signature**

```ts
export declare const isEmptyUnsafe: (instance: CML.MapAssetNameToCoin) => boolean
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (instance: CML.MapAssetNameToCoin) => CML.AssetNameList
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.MapAssetNameToCoin) => number
```

Added in v2.0.0

# Types

## MapAssetNameToCoin (type alias)

Type alias for the CML MapAssetNameToCoin class

**Signature**

```ts
export type MapAssetNameToCoin = CML.MapAssetNameToCoin
```

Added in v2.0.0

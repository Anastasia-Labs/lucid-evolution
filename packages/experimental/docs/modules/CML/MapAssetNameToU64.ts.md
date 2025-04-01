---
title: CML/MapAssetNameToU64.ts
nav_order: 119
parent: Modules
---

## MapAssetNameToU64 overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MapAssetNameToU64Error (class)](#mapassetnametou64error-class)
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
  - [MapAssetNameToU64 (type alias)](#mapassetnametou64-type-alias)

---

# Constructors

## \_new

Static method \_new of MapAssetNameToU64

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.MapAssetNameToU64, MapAssetNameToU64Error>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls MapAssetNameToU64.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.MapAssetNameToU64
```

Added in v2.0.0

# Errors

## MapAssetNameToU64Error (class)

Error class for MapAssetNameToU64 operations

This error is thrown when operations on MapAssetNameToU64 instances fail.

**Signature**

```ts
export declare class MapAssetNameToU64Error
```

Added in v2.0.0

# Methods

## free

Method free of MapAssetNameToU64

**Signature**

```ts
export declare const free: (instance: CML.MapAssetNameToU64) => Effect.Effect<void, MapAssetNameToU64Error>
```

Added in v2.0.0

## get

Method get of MapAssetNameToU64

**Signature**

```ts
export declare const get: (
  instance: CML.MapAssetNameToU64,
  key: CML.AssetName
) => Effect.Effect<bigint | undefined, MapAssetNameToU64Error>
```

Added in v2.0.0

## insert

Method insert of MapAssetNameToU64

**Signature**

```ts
export declare const insert: (
  instance: CML.MapAssetNameToU64,
  key: CML.AssetName,
  value: bigint
) => Effect.Effect<bigint | undefined, MapAssetNameToU64Error>
```

Added in v2.0.0

## keys

Method keys of MapAssetNameToU64

**Signature**

```ts
export declare const keys: (instance: CML.MapAssetNameToU64) => Effect.Effect<CML.AssetNameList, MapAssetNameToU64Error>
```

Added in v2.0.0

## len

Method len of MapAssetNameToU64

**Signature**

```ts
export declare const len: (instance: CML.MapAssetNameToU64) => Effect.Effect<number, MapAssetNameToU64Error>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.MapAssetNameToU64) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.MapAssetNameToU64, key: CML.AssetName) => bigint | undefined
```

Added in v2.0.0

## insertUnsafe

Unsafely calls instance.insert without Effect wrapper

**Signature**

```ts
export declare const insertUnsafe: (
  instance: CML.MapAssetNameToU64,
  key: CML.AssetName,
  value: bigint
) => bigint | undefined
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (instance: CML.MapAssetNameToU64) => CML.AssetNameList
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.MapAssetNameToU64) => number
```

Added in v2.0.0

# Types

## MapAssetNameToU64 (type alias)

Type alias for the CML MapAssetNameToU64 class

**Signature**

```ts
export type MapAssetNameToU64 = CML.MapAssetNameToU64
```

Added in v2.0.0

---
title: CML/MapAssetNameToNonZeroInt64.ts
nav_order: 123
parent: Modules
---

## MapAssetNameToNonZeroInt64 overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MapAssetNameToNonZeroInt64Error (class)](#mapassetnametononzeroint64error-class)
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
  - [MapAssetNameToNonZeroInt64 (type alias)](#mapassetnametononzeroint64-type-alias)

---

# Constructors

## \_new

Static method \_new of MapAssetNameToNonZeroInt64

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.MapAssetNameToNonZeroInt64,
  MapAssetNameToNonZeroInt64Error
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls MapAssetNameToNonZeroInt64.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.MapAssetNameToNonZeroInt64;
```

Added in v2.0.0

# Errors

## MapAssetNameToNonZeroInt64Error (class)

Error class for MapAssetNameToNonZeroInt64 operations

This error is thrown when operations on MapAssetNameToNonZeroInt64 instances fail.

**Signature**

```ts
export declare class MapAssetNameToNonZeroInt64Error
```

Added in v2.0.0

# Methods

## free

Method free of MapAssetNameToNonZeroInt64

**Signature**

```ts
export declare const free: (
  instance: CML.MapAssetNameToNonZeroInt64,
) => Effect.Effect<void, MapAssetNameToNonZeroInt64Error>;
```

Added in v2.0.0

## get

Method get of MapAssetNameToNonZeroInt64

**Signature**

```ts
export declare const get: (
  instance: CML.MapAssetNameToNonZeroInt64,
  key: CML.AssetName,
) => Effect.Effect<bigint | undefined, MapAssetNameToNonZeroInt64Error>;
```

Added in v2.0.0

## insert

Method insert of MapAssetNameToNonZeroInt64

**Signature**

```ts
export declare const insert: (
  instance: CML.MapAssetNameToNonZeroInt64,
  key: CML.AssetName,
  value: bigint,
) => Effect.Effect<bigint | undefined, MapAssetNameToNonZeroInt64Error>;
```

Added in v2.0.0

## keys

Method keys of MapAssetNameToNonZeroInt64

**Signature**

```ts
export declare const keys: (
  instance: CML.MapAssetNameToNonZeroInt64,
) => Effect.Effect<CML.AssetNameList, MapAssetNameToNonZeroInt64Error>;
```

Added in v2.0.0

## len

Method len of MapAssetNameToNonZeroInt64

**Signature**

```ts
export declare const len: (
  instance: CML.MapAssetNameToNonZeroInt64,
) => Effect.Effect<number, MapAssetNameToNonZeroInt64Error>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.MapAssetNameToNonZeroInt64,
) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.MapAssetNameToNonZeroInt64,
  key: CML.AssetName,
) => bigint | undefined;
```

Added in v2.0.0

## insertUnsafe

Unsafely calls instance.insert without Effect wrapper

**Signature**

```ts
export declare const insertUnsafe: (
  instance: CML.MapAssetNameToNonZeroInt64,
  key: CML.AssetName,
  value: bigint,
) => bigint | undefined;
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (
  instance: CML.MapAssetNameToNonZeroInt64,
) => CML.AssetNameList;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (
  instance: CML.MapAssetNameToNonZeroInt64,
) => number;
```

Added in v2.0.0

# Types

## MapAssetNameToNonZeroInt64 (type alias)

Type alias for the CML MapAssetNameToNonZeroInt64 class

**Signature**

```ts
export type MapAssetNameToNonZeroInt64 = CML.MapAssetNameToNonZeroInt64;
```

Added in v2.0.0

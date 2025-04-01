---
title: CML/MultiAsset.ts
nav_order: 134
parent: Modules
---

## MultiAsset overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MultiAssetError (class)](#multiasseterror-class)
- [Methods](#methods)
  - [checkedAdd](#checkedadd)
  - [checkedSub](#checkedsub)
  - [clampedSub](#clampedsub)
  - [free](#free)
  - [get](#get)
  - [getAssets](#getassets)
  - [insertAssets](#insertassets)
  - [keys](#keys)
  - [policyCount](#policycount)
  - [set](#set)
- [MethodsUnsafe](#methodsunsafe)
  - [checkedAddUnsafe](#checkedaddunsafe)
  - [checkedSubUnsafe](#checkedsubunsafe)
  - [clampedSubUnsafe](#clampedsubunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getAssetsUnsafe](#getassetsunsafe)
  - [getUnsafe](#getunsafe)
  - [insertAssetsUnsafe](#insertassetsunsafe)
  - [keysUnsafe](#keysunsafe)
  - [policyCountUnsafe](#policycountunsafe)
  - [setUnsafe](#setunsafe)
- [Types](#types)
  - [MultiAsset (type alias)](#multiasset-type-alias)

---

# Constructors

## \_new

Static method \_new of MultiAsset

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.MultiAsset, MultiAssetError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls MultiAsset.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.MultiAsset;
```

Added in v2.0.0

# Errors

## MultiAssetError (class)

Error class for MultiAsset operations

This error is thrown when operations on MultiAsset instances fail.

**Signature**

```ts
export declare class MultiAssetError
```

Added in v2.0.0

# Methods

## checkedAdd

Method checkedAdd of MultiAsset

**Signature**

```ts
export declare const checkedAdd: (
  instance: CML.MultiAsset,
  rhs: CML.MultiAsset,
) => Effect.Effect<CML.MultiAsset, MultiAssetError>;
```

Added in v2.0.0

## checkedSub

Method checkedSub of MultiAsset

**Signature**

```ts
export declare const checkedSub: (
  instance: CML.MultiAsset,
  rhs: CML.MultiAsset,
) => Effect.Effect<CML.MultiAsset, MultiAssetError>;
```

Added in v2.0.0

## clampedSub

Method clampedSub of MultiAsset

**Signature**

```ts
export declare const clampedSub: (
  instance: CML.MultiAsset,
  rhs: CML.MultiAsset,
) => Effect.Effect<CML.MultiAsset, MultiAssetError>;
```

Added in v2.0.0

## free

Method free of MultiAsset

**Signature**

```ts
export declare const free: (
  instance: CML.MultiAsset,
) => Effect.Effect<void, MultiAssetError>;
```

Added in v2.0.0

## get

Method get of MultiAsset

**Signature**

```ts
export declare const get: (
  instance: CML.MultiAsset,
  policyId: CML.ScriptHash,
  asset: CML.AssetName,
) => Effect.Effect<bigint | undefined, MultiAssetError>;
```

Added in v2.0.0

## getAssets

Method getAssets of MultiAsset

**Signature**

```ts
export declare const getAssets: (
  instance: CML.MultiAsset,
  key: CML.ScriptHash,
) => Effect.Effect<CML.MapAssetNameToCoin | undefined, MultiAssetError>;
```

Added in v2.0.0

## insertAssets

Method insertAssets of MultiAsset

**Signature**

```ts
export declare const insertAssets: (
  instance: CML.MultiAsset,
  policyId: CML.ScriptHash,
  assets: CML.MapAssetNameToCoin,
) => Effect.Effect<CML.MapAssetNameToCoin | undefined, MultiAssetError>;
```

Added in v2.0.0

## keys

Method keys of MultiAsset

**Signature**

```ts
export declare const keys: (
  instance: CML.MultiAsset,
) => Effect.Effect<CML.PolicyIdList, MultiAssetError>;
```

Added in v2.0.0

## policyCount

Method policyCount of MultiAsset

**Signature**

```ts
export declare const policyCount: (
  instance: CML.MultiAsset,
) => Effect.Effect<number, MultiAssetError>;
```

Added in v2.0.0

## set

Method set of MultiAsset

**Signature**

```ts
export declare const set: (
  instance: CML.MultiAsset,
  policyId: CML.ScriptHash,
  asset: CML.AssetName,
  value: bigint,
) => Effect.Effect<bigint | undefined, MultiAssetError>;
```

Added in v2.0.0

# MethodsUnsafe

## checkedAddUnsafe

Unsafely calls instance.checkedAdd without Effect wrapper

**Signature**

```ts
export declare const checkedAddUnsafe: (
  instance: CML.MultiAsset,
  rhs: CML.MultiAsset,
) => CML.MultiAsset;
```

Added in v2.0.0

## checkedSubUnsafe

Unsafely calls instance.checkedSub without Effect wrapper

**Signature**

```ts
export declare const checkedSubUnsafe: (
  instance: CML.MultiAsset,
  rhs: CML.MultiAsset,
) => CML.MultiAsset;
```

Added in v2.0.0

## clampedSubUnsafe

Unsafely calls instance.clampedSub without Effect wrapper

**Signature**

```ts
export declare const clampedSubUnsafe: (
  instance: CML.MultiAsset,
  rhs: CML.MultiAsset,
) => CML.MultiAsset;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.MultiAsset) => void;
```

Added in v2.0.0

## getAssetsUnsafe

Unsafely calls instance.getAssets without Effect wrapper

**Signature**

```ts
export declare const getAssetsUnsafe: (
  instance: CML.MultiAsset,
  key: CML.ScriptHash,
) => CML.MapAssetNameToCoin | undefined;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.MultiAsset,
  policyId: CML.ScriptHash,
  asset: CML.AssetName,
) => bigint | undefined;
```

Added in v2.0.0

## insertAssetsUnsafe

Unsafely calls instance.insertAssets without Effect wrapper

**Signature**

```ts
export declare const insertAssetsUnsafe: (
  instance: CML.MultiAsset,
  policyId: CML.ScriptHash,
  assets: CML.MapAssetNameToCoin,
) => CML.MapAssetNameToCoin | undefined;
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (instance: CML.MultiAsset) => CML.PolicyIdList;
```

Added in v2.0.0

## policyCountUnsafe

Unsafely calls instance.policyCount without Effect wrapper

**Signature**

```ts
export declare const policyCountUnsafe: (instance: CML.MultiAsset) => number;
```

Added in v2.0.0

## setUnsafe

Unsafely calls instance.set without Effect wrapper

**Signature**

```ts
export declare const setUnsafe: (
  instance: CML.MultiAsset,
  policyId: CML.ScriptHash,
  asset: CML.AssetName,
  value: bigint,
) => bigint | undefined;
```

Added in v2.0.0

# Types

## MultiAsset (type alias)

Type alias for the CML MultiAsset class

**Signature**

```ts
export type MultiAsset = CML.MultiAsset;
```

Added in v2.0.0

---
title: CML/Mint.ts
nav_order: 132
parent: Modules
---

## Mint overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MintError (class)](#minterror-class)
- [Methods](#methods)
  - [asNegativeMultiasset](#asnegativemultiasset)
  - [asPositiveMultiasset](#aspositivemultiasset)
  - [checkedAdd](#checkedadd)
  - [checkedSub](#checkedsub)
  - [free](#free)
  - [get](#get)
  - [getAssets](#getassets)
  - [insertAssets](#insertassets)
  - [keys](#keys)
  - [policyCount](#policycount)
  - [set](#set)
- [MethodsUnsafe](#methodsunsafe)
  - [asNegativeMultiassetUnsafe](#asnegativemultiassetunsafe)
  - [asPositiveMultiassetUnsafe](#aspositivemultiassetunsafe)
  - [checkedAddUnsafe](#checkedaddunsafe)
  - [checkedSubUnsafe](#checkedsubunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getAssetsUnsafe](#getassetsunsafe)
  - [getUnsafe](#getunsafe)
  - [insertAssetsUnsafe](#insertassetsunsafe)
  - [keysUnsafe](#keysunsafe)
  - [policyCountUnsafe](#policycountunsafe)
  - [setUnsafe](#setunsafe)
- [Types](#types)
  - [Mint (type alias)](#mint-type-alias)

---

# Constructors

## \_new

Static method \_new of Mint

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.Mint, MintError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls Mint.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.Mint;
```

Added in v2.0.0

# Errors

## MintError (class)

Error class for Mint operations

This error is thrown when operations on Mint instances fail.

**Signature**

```ts
export declare class MintError
```

Added in v2.0.0

# Methods

## asNegativeMultiasset

Method asNegativeMultiasset of Mint

**Signature**

```ts
export declare const asNegativeMultiasset: (
  instance: CML.Mint,
) => Effect.Effect<CML.MultiAsset, MintError>;
```

Added in v2.0.0

## asPositiveMultiasset

Method asPositiveMultiasset of Mint

**Signature**

```ts
export declare const asPositiveMultiasset: (
  instance: CML.Mint,
) => Effect.Effect<CML.MultiAsset, MintError>;
```

Added in v2.0.0

## checkedAdd

Method checkedAdd of Mint

**Signature**

```ts
export declare const checkedAdd: (
  instance: CML.Mint,
  rhs: CML.Mint,
) => Effect.Effect<CML.Mint, MintError>;
```

Added in v2.0.0

## checkedSub

Method checkedSub of Mint

**Signature**

```ts
export declare const checkedSub: (
  instance: CML.Mint,
  rhs: CML.Mint,
) => Effect.Effect<CML.Mint, MintError>;
```

Added in v2.0.0

## free

Method free of Mint

**Signature**

```ts
export declare const free: (
  instance: CML.Mint,
) => Effect.Effect<void, MintError>;
```

Added in v2.0.0

## get

Method get of Mint

**Signature**

```ts
export declare const get: (
  instance: CML.Mint,
  policyId: CML.ScriptHash,
  asset: CML.AssetName,
) => Effect.Effect<bigint | undefined, MintError>;
```

Added in v2.0.0

## getAssets

Method getAssets of Mint

**Signature**

```ts
export declare const getAssets: (
  instance: CML.Mint,
  key: CML.ScriptHash,
) => Effect.Effect<CML.MapAssetNameToNonZeroInt64 | undefined, MintError>;
```

Added in v2.0.0

## insertAssets

Method insertAssets of Mint

**Signature**

```ts
export declare const insertAssets: (
  instance: CML.Mint,
  policyId: CML.ScriptHash,
  assets: CML.MapAssetNameToNonZeroInt64,
) => Effect.Effect<CML.MapAssetNameToNonZeroInt64 | undefined, MintError>;
```

Added in v2.0.0

## keys

Method keys of Mint

**Signature**

```ts
export declare const keys: (
  instance: CML.Mint,
) => Effect.Effect<CML.PolicyIdList, MintError>;
```

Added in v2.0.0

## policyCount

Method policyCount of Mint

**Signature**

```ts
export declare const policyCount: (
  instance: CML.Mint,
) => Effect.Effect<number, MintError>;
```

Added in v2.0.0

## set

Method set of Mint

**Signature**

```ts
export declare const set: (
  instance: CML.Mint,
  policyId: CML.ScriptHash,
  asset: CML.AssetName,
  value: bigint,
) => Effect.Effect<bigint | undefined, MintError>;
```

Added in v2.0.0

# MethodsUnsafe

## asNegativeMultiassetUnsafe

Unsafely calls instance.asNegativeMultiasset without Effect wrapper

**Signature**

```ts
export declare const asNegativeMultiassetUnsafe: (
  instance: CML.Mint,
) => CML.MultiAsset;
```

Added in v2.0.0

## asPositiveMultiassetUnsafe

Unsafely calls instance.asPositiveMultiasset without Effect wrapper

**Signature**

```ts
export declare const asPositiveMultiassetUnsafe: (
  instance: CML.Mint,
) => CML.MultiAsset;
```

Added in v2.0.0

## checkedAddUnsafe

Unsafely calls instance.checkedAdd without Effect wrapper

**Signature**

```ts
export declare const checkedAddUnsafe: (
  instance: CML.Mint,
  rhs: CML.Mint,
) => CML.Mint;
```

Added in v2.0.0

## checkedSubUnsafe

Unsafely calls instance.checkedSub without Effect wrapper

**Signature**

```ts
export declare const checkedSubUnsafe: (
  instance: CML.Mint,
  rhs: CML.Mint,
) => CML.Mint;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Mint) => void;
```

Added in v2.0.0

## getAssetsUnsafe

Unsafely calls instance.getAssets without Effect wrapper

**Signature**

```ts
export declare const getAssetsUnsafe: (
  instance: CML.Mint,
  key: CML.ScriptHash,
) => CML.MapAssetNameToNonZeroInt64 | undefined;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.Mint,
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
  instance: CML.Mint,
  policyId: CML.ScriptHash,
  assets: CML.MapAssetNameToNonZeroInt64,
) => CML.MapAssetNameToNonZeroInt64 | undefined;
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (instance: CML.Mint) => CML.PolicyIdList;
```

Added in v2.0.0

## policyCountUnsafe

Unsafely calls instance.policyCount without Effect wrapper

**Signature**

```ts
export declare const policyCountUnsafe: (instance: CML.Mint) => number;
```

Added in v2.0.0

## setUnsafe

Unsafely calls instance.set without Effect wrapper

**Signature**

```ts
export declare const setUnsafe: (
  instance: CML.Mint,
  policyId: CML.ScriptHash,
  asset: CML.AssetName,
  value: bigint,
) => bigint | undefined;
```

Added in v2.0.0

# Types

## Mint (type alias)

Type alias for the CML Mint class

**Signature**

```ts
export type Mint = CML.Mint;
```

Added in v2.0.0

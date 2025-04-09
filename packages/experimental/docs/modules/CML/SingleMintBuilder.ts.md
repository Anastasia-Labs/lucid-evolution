---
title: CML/SingleMintBuilder.ts
nav_order: 208
parent: Modules
---

## SingleMintBuilder overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [newSingleAsset](#newsingleasset)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [newSingleAssetUnsafe](#newsingleassetunsafe)
- [Errors](#errors)
  - [SingleMintBuilderError (class)](#singlemintbuildererror-class)
- [Methods](#methods)
  - [free](#free)
  - [nativeScript](#nativescript)
  - [plutusScript](#plutusscript)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [nativeScriptUnsafe](#nativescriptunsafe)
  - [plutusScriptUnsafe](#plutusscriptunsafe)
- [Types](#types)
  - [SingleMintBuilder (type alias)](#singlemintbuilder-type-alias)

---

# Constructors

## \_new

Static method \_new of SingleMintBuilder

**Signature**

```ts
export declare const _new: (
  assets: CML.MapAssetNameToNonZeroInt64,
) => Effect.Effect<CML.SingleMintBuilder, SingleMintBuilderError>;
```

Added in v2.0.0

## newSingleAsset

Static method newSingleAsset of SingleMintBuilder

**Signature**

```ts
export declare const newSingleAsset: (
  asset: CML.AssetName,
  amount: bigint,
) => Effect.Effect<CML.SingleMintBuilder, SingleMintBuilderError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls SingleMintBuilder.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  assets: CML.MapAssetNameToNonZeroInt64,
) => CML.SingleMintBuilder;
```

Added in v2.0.0

## newSingleAssetUnsafe

Unsafely calls SingleMintBuilder.newSingleAsset without Effect wrapper

**Signature**

```ts
export declare const newSingleAssetUnsafe: (
  asset: CML.AssetName,
  amount: bigint,
) => CML.SingleMintBuilder;
```

Added in v2.0.0

# Errors

## SingleMintBuilderError (class)

Error class for SingleMintBuilder operations

This error is thrown when operations on SingleMintBuilder instances fail.

**Signature**

```ts
export declare class SingleMintBuilderError
```

Added in v2.0.0

# Methods

## free

Method free of SingleMintBuilder

**Signature**

```ts
export declare const free: (
  instance: CML.SingleMintBuilder,
) => Effect.Effect<void, SingleMintBuilderError>;
```

Added in v2.0.0

## nativeScript

Method nativeScript of SingleMintBuilder

**Signature**

```ts
export declare const nativeScript: (
  instance: CML.SingleMintBuilder,
  _nativeScript: CML.NativeScript,
  witnessInfo: CML.NativeScriptWitnessInfo,
) => Effect.Effect<CML.MintBuilderResult, SingleMintBuilderError>;
```

Added in v2.0.0

## plutusScript

Method plutusScript of SingleMintBuilder

**Signature**

```ts
export declare const plutusScript: (
  instance: CML.SingleMintBuilder,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
) => Effect.Effect<CML.MintBuilderResult, SingleMintBuilderError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.SingleMintBuilder) => void;
```

Added in v2.0.0

## nativeScriptUnsafe

Unsafely calls instance.nativeScript without Effect wrapper

**Signature**

```ts
export declare const nativeScriptUnsafe: (
  instance: CML.SingleMintBuilder,
  _nativeScript: CML.NativeScript,
  witnessInfo: CML.NativeScriptWitnessInfo,
) => CML.MintBuilderResult;
```

Added in v2.0.0

## plutusScriptUnsafe

Unsafely calls instance.plutusScript without Effect wrapper

**Signature**

```ts
export declare const plutusScriptUnsafe: (
  instance: CML.SingleMintBuilder,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
) => CML.MintBuilderResult;
```

Added in v2.0.0

# Types

## SingleMintBuilder (type alias)

Type alias for the CML SingleMintBuilder class

**Signature**

```ts
export type SingleMintBuilder = CML.SingleMintBuilder;
```

Added in v2.0.0

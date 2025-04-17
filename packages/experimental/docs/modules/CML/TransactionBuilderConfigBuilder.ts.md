---
title: CML/TransactionBuilderConfigBuilder.ts
nav_order: 231
parent: Modules
---

## TransactionBuilderConfigBuilder overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [TransactionBuilderConfigBuilderError (class)](#transactionbuilderconfigbuildererror-class)
- [Methods](#methods)
  - [build](#build)
  - [coinsPerUtxoByte](#coinsperutxobyte)
  - [collateralPercentage](#collateralpercentage)
  - [costModels](#costmodels)
  - [exUnitPrices](#exunitprices)
  - [feeAlgo](#feealgo)
  - [free](#free)
  - [keyDeposit](#keydeposit)
  - [maxCollateralInputs](#maxcollateralinputs)
  - [maxTxSize](#maxtxsize)
  - [maxValueSize](#maxvaluesize)
  - [poolDeposit](#pooldeposit)
  - [preferPureChange](#preferpurechange)
- [MethodsUnsafe](#methodsunsafe)
  - [buildUnsafe](#buildunsafe)
  - [coinsPerUtxoByteUnsafe](#coinsperutxobyteunsafe)
  - [collateralPercentageUnsafe](#collateralpercentageunsafe)
  - [costModelsUnsafe](#costmodelsunsafe)
  - [exUnitPricesUnsafe](#exunitpricesunsafe)
  - [feeAlgoUnsafe](#feealgounsafe)
  - [freeUnsafe](#freeunsafe)
  - [keyDepositUnsafe](#keydepositunsafe)
  - [maxCollateralInputsUnsafe](#maxcollateralinputsunsafe)
  - [maxTxSizeUnsafe](#maxtxsizeunsafe)
  - [maxValueSizeUnsafe](#maxvaluesizeunsafe)
  - [poolDepositUnsafe](#pooldepositunsafe)
  - [preferPureChangeUnsafe](#preferpurechangeunsafe)
- [Types](#types)
  - [TransactionBuilderConfigBuilder (type alias)](#transactionbuilderconfigbuilder-type-alias)

---

# Constructors

## \_new

Static method \_new of TransactionBuilderConfigBuilder

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.TransactionBuilderConfigBuilder,
  TransactionBuilderConfigBuilderError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls TransactionBuilderConfigBuilder.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.TransactionBuilderConfigBuilder;
```

Added in v2.0.0

# Errors

## TransactionBuilderConfigBuilderError (class)

Error class for TransactionBuilderConfigBuilder operations

This error is thrown when operations on TransactionBuilderConfigBuilder instances fail.

**Signature**

```ts
export declare class TransactionBuilderConfigBuilderError
```

Added in v2.0.0

# Methods

## build

Method build of TransactionBuilderConfigBuilder

**Signature**

```ts
export declare const build: (
  instance: CML.TransactionBuilderConfigBuilder,
) => Effect.Effect<
  CML.TransactionBuilderConfig,
  TransactionBuilderConfigBuilderError
>;
```

Added in v2.0.0

## coinsPerUtxoByte

Method coinsPerUtxoByte of TransactionBuilderConfigBuilder

**Signature**

```ts
export declare const coinsPerUtxoByte: (
  instance: CML.TransactionBuilderConfigBuilder,
  _coinsPerUtxoByte: bigint,
) => Effect.Effect<
  CML.TransactionBuilderConfigBuilder,
  TransactionBuilderConfigBuilderError
>;
```

Added in v2.0.0

## collateralPercentage

Method collateralPercentage of TransactionBuilderConfigBuilder

**Signature**

```ts
export declare const collateralPercentage: (
  instance: CML.TransactionBuilderConfigBuilder,
  _collateralPercentage: number,
) => Effect.Effect<
  CML.TransactionBuilderConfigBuilder,
  TransactionBuilderConfigBuilderError
>;
```

Added in v2.0.0

## costModels

Method costModels of TransactionBuilderConfigBuilder

**Signature**

```ts
export declare const costModels: (
  instance: CML.TransactionBuilderConfigBuilder,
  _costModels: CML.CostModels,
) => Effect.Effect<
  CML.TransactionBuilderConfigBuilder,
  TransactionBuilderConfigBuilderError
>;
```

Added in v2.0.0

## exUnitPrices

Method exUnitPrices of TransactionBuilderConfigBuilder

**Signature**

```ts
export declare const exUnitPrices: (
  instance: CML.TransactionBuilderConfigBuilder,
  _exUnitPrices: CML.ExUnitPrices,
) => Effect.Effect<
  CML.TransactionBuilderConfigBuilder,
  TransactionBuilderConfigBuilderError
>;
```

Added in v2.0.0

## feeAlgo

Method feeAlgo of TransactionBuilderConfigBuilder

**Signature**

```ts
export declare const feeAlgo: (
  instance: CML.TransactionBuilderConfigBuilder,
  _feeAlgo: CML.LinearFee,
) => Effect.Effect<
  CML.TransactionBuilderConfigBuilder,
  TransactionBuilderConfigBuilderError
>;
```

Added in v2.0.0

## free

Method free of TransactionBuilderConfigBuilder

**Signature**

```ts
export declare const free: (
  instance: CML.TransactionBuilderConfigBuilder,
) => Effect.Effect<void, TransactionBuilderConfigBuilderError>;
```

Added in v2.0.0

## keyDeposit

Method keyDeposit of TransactionBuilderConfigBuilder

**Signature**

```ts
export declare const keyDeposit: (
  instance: CML.TransactionBuilderConfigBuilder,
  _keyDeposit: bigint,
) => Effect.Effect<
  CML.TransactionBuilderConfigBuilder,
  TransactionBuilderConfigBuilderError
>;
```

Added in v2.0.0

## maxCollateralInputs

Method maxCollateralInputs of TransactionBuilderConfigBuilder

**Signature**

```ts
export declare const maxCollateralInputs: (
  instance: CML.TransactionBuilderConfigBuilder,
  _maxCollateralInputs: number,
) => Effect.Effect<
  CML.TransactionBuilderConfigBuilder,
  TransactionBuilderConfigBuilderError
>;
```

Added in v2.0.0

## maxTxSize

Method maxTxSize of TransactionBuilderConfigBuilder

**Signature**

```ts
export declare const maxTxSize: (
  instance: CML.TransactionBuilderConfigBuilder,
  _maxTxSize: number,
) => Effect.Effect<
  CML.TransactionBuilderConfigBuilder,
  TransactionBuilderConfigBuilderError
>;
```

Added in v2.0.0

## maxValueSize

Method maxValueSize of TransactionBuilderConfigBuilder

**Signature**

```ts
export declare const maxValueSize: (
  instance: CML.TransactionBuilderConfigBuilder,
  _maxValueSize: number,
) => Effect.Effect<
  CML.TransactionBuilderConfigBuilder,
  TransactionBuilderConfigBuilderError
>;
```

Added in v2.0.0

## poolDeposit

Method poolDeposit of TransactionBuilderConfigBuilder

**Signature**

```ts
export declare const poolDeposit: (
  instance: CML.TransactionBuilderConfigBuilder,
  _poolDeposit: bigint,
) => Effect.Effect<
  CML.TransactionBuilderConfigBuilder,
  TransactionBuilderConfigBuilderError
>;
```

Added in v2.0.0

## preferPureChange

Method preferPureChange of TransactionBuilderConfigBuilder

**Signature**

```ts
export declare const preferPureChange: (
  instance: CML.TransactionBuilderConfigBuilder,
  _preferPureChange: boolean,
) => Effect.Effect<
  CML.TransactionBuilderConfigBuilder,
  TransactionBuilderConfigBuilderError
>;
```

Added in v2.0.0

# MethodsUnsafe

## buildUnsafe

Unsafely calls instance.build without Effect wrapper

**Signature**

```ts
export declare const buildUnsafe: (
  instance: CML.TransactionBuilderConfigBuilder,
) => CML.TransactionBuilderConfig;
```

Added in v2.0.0

## coinsPerUtxoByteUnsafe

Unsafely calls instance.coinsPerUtxoByte without Effect wrapper

**Signature**

```ts
export declare const coinsPerUtxoByteUnsafe: (
  instance: CML.TransactionBuilderConfigBuilder,
  _coinsPerUtxoByte: bigint,
) => CML.TransactionBuilderConfigBuilder;
```

Added in v2.0.0

## collateralPercentageUnsafe

Unsafely calls instance.collateralPercentage without Effect wrapper

**Signature**

```ts
export declare const collateralPercentageUnsafe: (
  instance: CML.TransactionBuilderConfigBuilder,
  _collateralPercentage: number,
) => CML.TransactionBuilderConfigBuilder;
```

Added in v2.0.0

## costModelsUnsafe

Unsafely calls instance.costModels without Effect wrapper

**Signature**

```ts
export declare const costModelsUnsafe: (
  instance: CML.TransactionBuilderConfigBuilder,
  _costModels: CML.CostModels,
) => CML.TransactionBuilderConfigBuilder;
```

Added in v2.0.0

## exUnitPricesUnsafe

Unsafely calls instance.exUnitPrices without Effect wrapper

**Signature**

```ts
export declare const exUnitPricesUnsafe: (
  instance: CML.TransactionBuilderConfigBuilder,
  _exUnitPrices: CML.ExUnitPrices,
) => CML.TransactionBuilderConfigBuilder;
```

Added in v2.0.0

## feeAlgoUnsafe

Unsafely calls instance.feeAlgo without Effect wrapper

**Signature**

```ts
export declare const feeAlgoUnsafe: (
  instance: CML.TransactionBuilderConfigBuilder,
  _feeAlgo: CML.LinearFee,
) => CML.TransactionBuilderConfigBuilder;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.TransactionBuilderConfigBuilder,
) => void;
```

Added in v2.0.0

## keyDepositUnsafe

Unsafely calls instance.keyDeposit without Effect wrapper

**Signature**

```ts
export declare const keyDepositUnsafe: (
  instance: CML.TransactionBuilderConfigBuilder,
  _keyDeposit: bigint,
) => CML.TransactionBuilderConfigBuilder;
```

Added in v2.0.0

## maxCollateralInputsUnsafe

Unsafely calls instance.maxCollateralInputs without Effect wrapper

**Signature**

```ts
export declare const maxCollateralInputsUnsafe: (
  instance: CML.TransactionBuilderConfigBuilder,
  _maxCollateralInputs: number,
) => CML.TransactionBuilderConfigBuilder;
```

Added in v2.0.0

## maxTxSizeUnsafe

Unsafely calls instance.maxTxSize without Effect wrapper

**Signature**

```ts
export declare const maxTxSizeUnsafe: (
  instance: CML.TransactionBuilderConfigBuilder,
  _maxTxSize: number,
) => CML.TransactionBuilderConfigBuilder;
```

Added in v2.0.0

## maxValueSizeUnsafe

Unsafely calls instance.maxValueSize without Effect wrapper

**Signature**

```ts
export declare const maxValueSizeUnsafe: (
  instance: CML.TransactionBuilderConfigBuilder,
  _maxValueSize: number,
) => CML.TransactionBuilderConfigBuilder;
```

Added in v2.0.0

## poolDepositUnsafe

Unsafely calls instance.poolDeposit without Effect wrapper

**Signature**

```ts
export declare const poolDepositUnsafe: (
  instance: CML.TransactionBuilderConfigBuilder,
  _poolDeposit: bigint,
) => CML.TransactionBuilderConfigBuilder;
```

Added in v2.0.0

## preferPureChangeUnsafe

Unsafely calls instance.preferPureChange without Effect wrapper

**Signature**

```ts
export declare const preferPureChangeUnsafe: (
  instance: CML.TransactionBuilderConfigBuilder,
  _preferPureChange: boolean,
) => CML.TransactionBuilderConfigBuilder;
```

Added in v2.0.0

# Types

## TransactionBuilderConfigBuilder (type alias)

Type alias for the CML TransactionBuilderConfigBuilder class

**Signature**

```ts
export type TransactionBuilderConfigBuilder =
  CML.TransactionBuilderConfigBuilder;
```

Added in v2.0.0

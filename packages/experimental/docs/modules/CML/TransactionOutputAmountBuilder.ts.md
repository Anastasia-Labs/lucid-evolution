---
title: CML/TransactionOutputAmountBuilder.ts
nav_order: 233
parent: Modules
---

## TransactionOutputAmountBuilder overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [TransactionOutputAmountBuilderError (class)](#transactionoutputamountbuildererror-class)
- [Methods](#methods)
  - [build](#build)
  - [free](#free)
  - [withAssetAndMinRequiredCoin](#withassetandminrequiredcoin)
  - [withValue](#withvalue)
- [MethodsUnsafe](#methodsunsafe)
  - [buildUnsafe](#buildunsafe)
  - [freeUnsafe](#freeunsafe)
  - [withAssetAndMinRequiredCoinUnsafe](#withassetandminrequiredcoinunsafe)
  - [withValueUnsafe](#withvalueunsafe)
- [Types](#types)
  - [TransactionOutputAmountBuilder (type alias)](#transactionoutputamountbuilder-type-alias)

---

# Errors

## TransactionOutputAmountBuilderError (class)

Error class for TransactionOutputAmountBuilder operations

This error is thrown when operations on TransactionOutputAmountBuilder instances fail.

**Signature**

```ts
export declare class TransactionOutputAmountBuilderError
```

Added in v2.0.0

# Methods

## build

Method build of TransactionOutputAmountBuilder

**Signature**

```ts
export declare const build: (
  instance: CML.TransactionOutputAmountBuilder,
) => Effect.Effect<
  CML.SingleOutputBuilderResult,
  TransactionOutputAmountBuilderError
>;
```

Added in v2.0.0

## free

Method free of TransactionOutputAmountBuilder

**Signature**

```ts
export declare const free: (
  instance: CML.TransactionOutputAmountBuilder,
) => Effect.Effect<void, TransactionOutputAmountBuilderError>;
```

Added in v2.0.0

## withAssetAndMinRequiredCoin

Method withAssetAndMinRequiredCoin of TransactionOutputAmountBuilder

**Signature**

```ts
export declare const withAssetAndMinRequiredCoin: (
  instance: CML.TransactionOutputAmountBuilder,
  multiasset: CML.MultiAsset,
  coinsPerUtxoByte: bigint,
) => Effect.Effect<
  CML.TransactionOutputAmountBuilder,
  TransactionOutputAmountBuilderError
>;
```

Added in v2.0.0

## withValue

Method withValue of TransactionOutputAmountBuilder

**Signature**

```ts
export declare const withValue: (
  instance: CML.TransactionOutputAmountBuilder,
  amount: CML.Value,
) => Effect.Effect<
  CML.TransactionOutputAmountBuilder,
  TransactionOutputAmountBuilderError
>;
```

Added in v2.0.0

# MethodsUnsafe

## buildUnsafe

Unsafely calls instance.build without Effect wrapper

**Signature**

```ts
export declare const buildUnsafe: (
  instance: CML.TransactionOutputAmountBuilder,
) => CML.SingleOutputBuilderResult;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.TransactionOutputAmountBuilder,
) => void;
```

Added in v2.0.0

## withAssetAndMinRequiredCoinUnsafe

Unsafely calls instance.withAssetAndMinRequiredCoin without Effect wrapper

**Signature**

```ts
export declare const withAssetAndMinRequiredCoinUnsafe: (
  instance: CML.TransactionOutputAmountBuilder,
  multiasset: CML.MultiAsset,
  coinsPerUtxoByte: bigint,
) => CML.TransactionOutputAmountBuilder;
```

Added in v2.0.0

## withValueUnsafe

Unsafely calls instance.withValue without Effect wrapper

**Signature**

```ts
export declare const withValueUnsafe: (
  instance: CML.TransactionOutputAmountBuilder,
  amount: CML.Value,
) => CML.TransactionOutputAmountBuilder;
```

Added in v2.0.0

# Types

## TransactionOutputAmountBuilder (type alias)

Type alias for the CML TransactionOutputAmountBuilder class

**Signature**

```ts
export type TransactionOutputAmountBuilder = CML.TransactionOutputAmountBuilder;
```

Added in v2.0.0

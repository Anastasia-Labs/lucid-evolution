---
title: CML/Utils/min_fee.ts
nav_order: 271
parent: Modules
---

## min_fee overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [MinFeeError (class)](#minfeeerror-class)
- [Functions](#functions)
  - [minFee](#minfee)
- [FunctionsUnsafe](#functionsunsafe)
  - [minFeeUnsafe](#minfeeunsafe)

---

# Errors

## MinFeeError (class)

Error class for min_fee function

This error is thrown when the min_fee function fails.

**Signature**

```ts
export declare class MinFeeError
```

Added in v2.0.0

# Functions

## minFee

Wrapper for the min_fee function

**Signature**

```ts
export declare const minFee: (
  tx: CML.Transaction,
  linearFee: CML.LinearFee,
  exUnitPrices: CML.ExUnitPrices,
  totalRefScriptSize: bigint,
) => Effect.Effect<bigint, MinFeeError>;
```

Added in v2.0.0

# FunctionsUnsafe

## minFeeUnsafe

Unsafely calls min_fee function without Effect wrapper

**Signature**

```ts
export declare const minFeeUnsafe: (
  tx: CML.Transaction,
  linearFee: CML.LinearFee,
  exUnitPrices: CML.ExUnitPrices,
  totalRefScriptSize: bigint,
) => bigint;
```

Added in v2.0.0

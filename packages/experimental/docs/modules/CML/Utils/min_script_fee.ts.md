---
title: CML/Utils/min_script_fee.ts
nav_order: 273
parent: Modules
---

## min_script_fee overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [MinScriptFeeError (class)](#minscriptfeeerror-class)
- [Functions](#functions)
  - [minScriptFee](#minscriptfee)
- [FunctionsUnsafe](#functionsunsafe)
  - [minScriptFeeUnsafe](#minscriptfeeunsafe)

---

# Errors

## MinScriptFeeError (class)

Error class for min_script_fee function

This error is thrown when the min_script_fee function fails.

**Signature**

```ts
export declare class MinScriptFeeError
```

Added in v2.0.0

# Functions

## minScriptFee

Wrapper for the min_script_fee function

**Signature**

```ts
export declare const minScriptFee: (
  tx: CML.Transaction,
  exUnitPrices: CML.ExUnitPrices,
) => Effect.Effect<bigint, MinScriptFeeError>;
```

Added in v2.0.0

# FunctionsUnsafe

## minScriptFeeUnsafe

Unsafely calls min_script_fee function without Effect wrapper

**Signature**

```ts
export declare const minScriptFeeUnsafe: (
  tx: CML.Transaction,
  exUnitPrices: CML.ExUnitPrices,
) => bigint;
```

Added in v2.0.0

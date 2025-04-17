---
title: CML/Utils/min_no_script_fee.ts
nav_order: 277
parent: Modules
---

## min_no_script_fee overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [MinNoScriptFeeError (class)](#minnoscriptfeeerror-class)
- [Functions](#functions)
  - [minNoScriptFee](#minnoscriptfee)
- [FunctionsUnsafe](#functionsunsafe)
  - [minNoScriptFeeUnsafe](#minnoscriptfeeunsafe)

---

# Errors

## MinNoScriptFeeError (class)

Error class for min_no_script_fee function

This error is thrown when the min_no_script_fee function fails.

**Signature**

```ts
export declare class MinNoScriptFeeError
```

Added in v2.0.0

# Functions

## minNoScriptFee

Wrapper for the min_no_script_fee function

**Signature**

```ts
export declare const minNoScriptFee: (
  tx: CML.Transaction,
  linearFee: CML.LinearFee,
) => Effect.Effect<bigint, MinNoScriptFeeError>;
```

Added in v2.0.0

# FunctionsUnsafe

## minNoScriptFeeUnsafe

Unsafely calls min_no_script_fee function without Effect wrapper

**Signature**

```ts
export declare const minNoScriptFeeUnsafe: (
  tx: CML.Transaction,
  linearFee: CML.LinearFee,
) => bigint;
```

Added in v2.0.0

---
title: CML/Utils/min_ada_required.ts
nav_order: 274
parent: Modules
---

## min_ada_required overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [MinAdaRequiredError (class)](#minadarequirederror-class)
- [Functions](#functions)
  - [minAdaRequired](#minadarequired)
- [FunctionsUnsafe](#functionsunsafe)
  - [minAdaRequiredUnsafe](#minadarequiredunsafe)

---

# Errors

## MinAdaRequiredError (class)

Error class for min_ada_required function

This error is thrown when the min_ada_required function fails.

**Signature**

```ts
export declare class MinAdaRequiredError
```

Added in v2.0.0

# Functions

## minAdaRequired

Wrapper for the min_ada_required function

**Signature**

```ts
export declare const minAdaRequired: (
  output: CML.TransactionOutput,
  coinsPerUtxoByte: bigint,
) => Effect.Effect<bigint, MinAdaRequiredError>;
```

Added in v2.0.0

# FunctionsUnsafe

## minAdaRequiredUnsafe

Unsafely calls min_ada_required function without Effect wrapper

**Signature**

```ts
export declare const minAdaRequiredUnsafe: (
  output: CML.TransactionOutput,
  coinsPerUtxoByte: bigint,
) => bigint;
```

Added in v2.0.0

---
title: CML/Utils/compute_total_ex_units.ts
nav_order: 251
parent: Modules
---

## compute_total_ex_units overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [ComputeTotalExUnitsError (class)](#computetotalexunitserror-class)
- [Functions](#functions)
  - [computeTotalExUnits](#computetotalexunits)
- [FunctionsUnsafe](#functionsunsafe)
  - [computeTotalExUnitsUnsafe](#computetotalexunitsunsafe)

---

# Errors

## ComputeTotalExUnitsError (class)

Error class for compute_total_ex_units function

This error is thrown when the compute_total_ex_units function fails.

**Signature**

```ts
export declare class ComputeTotalExUnitsError
```

Added in v2.0.0

# Functions

## computeTotalExUnits

Wrapper for the compute_total_ex_units function

**Signature**

```ts
export declare const computeTotalExUnits: (
  redeemers: CML.Redeemers
) => Effect.Effect<CML.ExUnits, ComputeTotalExUnitsError>
```

Added in v2.0.0

# FunctionsUnsafe

## computeTotalExUnitsUnsafe

Unsafely calls compute_total_ex_units function without Effect wrapper

**Signature**

```ts
export declare const computeTotalExUnitsUnsafe: (redeemers: CML.Redeemers) => CML.ExUnits
```

Added in v2.0.0

---
title: CML/Utils/make_vkey_witness.ts
nav_order: 274
parent: Modules
---

## make_vkey_witness overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [MakeVkeyWitnessError (class)](#makevkeywitnesserror-class)
- [Functions](#functions)
  - [makeVkeyWitness](#makevkeywitness)
- [FunctionsUnsafe](#functionsunsafe)
  - [makeVkeyWitnessUnsafe](#makevkeywitnessunsafe)

---

# Errors

## MakeVkeyWitnessError (class)

Error class for make_vkey_witness function

This error is thrown when the make_vkey_witness function fails.

**Signature**

```ts
export declare class MakeVkeyWitnessError
```

Added in v2.0.0

# Functions

## makeVkeyWitness

Wrapper for the make_vkey_witness function

**Signature**

```ts
export declare const makeVkeyWitness: (
  txBodyHash: CML.TransactionHash,
  sk: CML.PrivateKey
) => Effect.Effect<CML.Vkeywitness, MakeVkeyWitnessError>
```

Added in v2.0.0

# FunctionsUnsafe

## makeVkeyWitnessUnsafe

Unsafely calls make_vkey_witness function without Effect wrapper

**Signature**

```ts
export declare const makeVkeyWitnessUnsafe: (txBodyHash: CML.TransactionHash, sk: CML.PrivateKey) => CML.Vkeywitness
```

Added in v2.0.0

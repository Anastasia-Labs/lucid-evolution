---
title: CML/Utils/make_daedalus_bootstrap_witness.ts
nav_order: 266
parent: Modules
---

## make_daedalus_bootstrap_witness overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [MakeDaedalusBootstrapWitnessError (class)](#makedaedalusbootstrapwitnesserror-class)
- [Functions](#functions)
  - [makeDaedalusBootstrapWitness](#makedaedalusbootstrapwitness)
- [FunctionsUnsafe](#functionsunsafe)
  - [makeDaedalusBootstrapWitnessUnsafe](#makedaedalusbootstrapwitnessunsafe)

---

# Errors

## MakeDaedalusBootstrapWitnessError (class)

Error class for make_daedalus_bootstrap_witness function

This error is thrown when the make_daedalus_bootstrap_witness function fails.

**Signature**

```ts
export declare class MakeDaedalusBootstrapWitnessError
```

Added in v2.0.0

# Functions

## makeDaedalusBootstrapWitness

Wrapper for the make_daedalus_bootstrap_witness function

**Signature**

```ts
export declare const makeDaedalusBootstrapWitness: (
  txBodyHash: CML.TransactionHash,
  addr: CML.ByronAddress,
  key: CML.LegacyDaedalusPrivateKey
) => Effect.Effect<CML.BootstrapWitness, MakeDaedalusBootstrapWitnessError>
```

Added in v2.0.0

# FunctionsUnsafe

## makeDaedalusBootstrapWitnessUnsafe

Unsafely calls make_daedalus_bootstrap_witness function without Effect wrapper

**Signature**

```ts
export declare const makeDaedalusBootstrapWitnessUnsafe: (
  txBodyHash: CML.TransactionHash,
  addr: CML.ByronAddress,
  key: CML.LegacyDaedalusPrivateKey
) => CML.BootstrapWitness
```

Added in v2.0.0

---
title: CML/Utils/make_icarus_bootstrap_witness.ts
nav_order: 273
parent: Modules
---

## make_icarus_bootstrap_witness overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [MakeIcarusBootstrapWitnessError (class)](#makeicarusbootstrapwitnesserror-class)
- [Functions](#functions)
  - [makeIcarusBootstrapWitness](#makeicarusbootstrapwitness)
- [FunctionsUnsafe](#functionsunsafe)
  - [makeIcarusBootstrapWitnessUnsafe](#makeicarusbootstrapwitnessunsafe)

---

# Errors

## MakeIcarusBootstrapWitnessError (class)

Error class for make_icarus_bootstrap_witness function

This error is thrown when the make_icarus_bootstrap_witness function fails.

**Signature**

```ts
export declare class MakeIcarusBootstrapWitnessError
```

Added in v2.0.0

# Functions

## makeIcarusBootstrapWitness

Wrapper for the make_icarus_bootstrap_witness function

**Signature**

```ts
export declare const makeIcarusBootstrapWitness: (
  txBodyHash: CML.TransactionHash,
  addr: CML.ByronAddress,
  key: CML.Bip32PrivateKey,
) => Effect.Effect<CML.BootstrapWitness, MakeIcarusBootstrapWitnessError>;
```

Added in v2.0.0

# FunctionsUnsafe

## makeIcarusBootstrapWitnessUnsafe

Unsafely calls make_icarus_bootstrap_witness function without Effect wrapper

**Signature**

```ts
export declare const makeIcarusBootstrapWitnessUnsafe: (
  txBodyHash: CML.TransactionHash,
  addr: CML.ByronAddress,
  key: CML.Bip32PrivateKey,
) => CML.BootstrapWitness;
```

Added in v2.0.0

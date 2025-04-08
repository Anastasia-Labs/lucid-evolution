---
title: CML/Utils/calc_script_data_hash_from_witness.ts
nav_order: 250
parent: Modules
---

## calc_script_data_hash_from_witness overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [CalcScriptDataHashFromWitnessError (class)](#calcscriptdatahashfromwitnesserror-class)
- [Functions](#functions)
  - [calcScriptDataHashFromWitness](#calcscriptdatahashfromwitness)
- [FunctionsUnsafe](#functionsunsafe)
  - [calcScriptDataHashFromWitnessUnsafe](#calcscriptdatahashfromwitnessunsafe)

---

# Errors

## CalcScriptDataHashFromWitnessError (class)

Error class for calc_script_data_hash_from_witness function

This error is thrown when the calc_script_data_hash_from_witness function fails.

**Signature**

```ts
export declare class CalcScriptDataHashFromWitnessError
```

Added in v2.0.0

# Functions

## calcScriptDataHashFromWitness

Wrapper for the calc_script_data_hash_from_witness function

**Signature**

```ts
export declare const calcScriptDataHashFromWitness: (
  witnesses: CML.TransactionWitnessSet,
  costModels: CML.CostModels,
) => Effect.Effect<
  CML.ScriptDataHash | undefined,
  CalcScriptDataHashFromWitnessError
>;
```

Added in v2.0.0

# FunctionsUnsafe

## calcScriptDataHashFromWitnessUnsafe

Unsafely calls calc_script_data_hash_from_witness function without Effect wrapper

**Signature**

```ts
export declare const calcScriptDataHashFromWitnessUnsafe: (
  witnesses: CML.TransactionWitnessSet,
  costModels: CML.CostModels,
) => CML.ScriptDataHash | undefined;
```

Added in v2.0.0

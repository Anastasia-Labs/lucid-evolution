---
title: CML/Utils/calc_script_data_hash.ts
nav_order: 255
parent: Modules
---

## calc_script_data_hash overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [CalcScriptDataHashError (class)](#calcscriptdatahasherror-class)
- [Functions](#functions)
  - [calcScriptDataHash](#calcscriptdatahash)
- [FunctionsUnsafe](#functionsunsafe)
  - [calcScriptDataHashUnsafe](#calcscriptdatahashunsafe)

---

# Errors

## CalcScriptDataHashError (class)

Error class for calc_script_data_hash function

This error is thrown when the calc_script_data_hash function fails.

**Signature**

```ts
export declare class CalcScriptDataHashError
```

Added in v2.0.0

# Functions

## calcScriptDataHash

Wrapper for the calc_script_data_hash function

**Signature**

```ts
export declare const calcScriptDataHash: (
  redeemers: CML.Redeemers,
  datums: CML.PlutusDataList,
  costModels: CML.CostModels,
  usedLangs: CML.LanguageList,
) => Effect.Effect<CML.ScriptDataHash | undefined, CalcScriptDataHashError>;
```

Added in v2.0.0

# FunctionsUnsafe

## calcScriptDataHashUnsafe

Unsafely calls calc_script_data_hash function without Effect wrapper

**Signature**

```ts
export declare const calcScriptDataHashUnsafe: (
  redeemers: CML.Redeemers,
  datums: CML.PlutusDataList,
  costModels: CML.CostModels,
  usedLangs: CML.LanguageList,
) => CML.ScriptDataHash | undefined;
```

Added in v2.0.0

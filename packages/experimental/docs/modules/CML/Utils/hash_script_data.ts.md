---
title: CML/Utils/hash_script_data.ts
nav_order: 269
parent: Modules
---

## hash_script_data overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [HashScriptDataError (class)](#hashscriptdataerror-class)
- [Functions](#functions)
  - [hashScriptData](#hashscriptdata)
- [FunctionsUnsafe](#functionsunsafe)
  - [hashScriptDataUnsafe](#hashscriptdataunsafe)

---

# Errors

## HashScriptDataError (class)

Error class for hash_script_data function

This error is thrown when the hash_script_data function fails.

**Signature**

```ts
export declare class HashScriptDataError
```

Added in v2.0.0

# Functions

## hashScriptData

Wrapper for the hash_script_data function

**Signature**

```ts
export declare const hashScriptData: (
  redeemers: CML.Redeemers,
  costModels: CML.CostModels,
  datums: CML.PlutusDataList,
) => Effect.Effect<CML.ScriptDataHash, HashScriptDataError>;
```

Added in v2.0.0

# FunctionsUnsafe

## hashScriptDataUnsafe

Unsafely calls hash_script_data function without Effect wrapper

**Signature**

```ts
export declare const hashScriptDataUnsafe: (
  redeemers: CML.Redeemers,
  costModels: CML.CostModels,
  datums: CML.PlutusDataList,
) => CML.ScriptDataHash;
```

Added in v2.0.0

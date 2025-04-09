---
title: CML/Utils/hash_auxiliary_data.ts
nav_order: 263
parent: Modules
---

## hash_auxiliary_data overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [HashAuxiliaryDataError (class)](#hashauxiliarydataerror-class)
- [Functions](#functions)
  - [hashAuxiliaryData](#hashauxiliarydata)
- [FunctionsUnsafe](#functionsunsafe)
  - [hashAuxiliaryDataUnsafe](#hashauxiliarydataunsafe)

---

# Errors

## HashAuxiliaryDataError (class)

Error class for hash_auxiliary_data function

This error is thrown when the hash_auxiliary_data function fails.

**Signature**

```ts
export declare class HashAuxiliaryDataError
```

Added in v2.0.0

# Functions

## hashAuxiliaryData

Wrapper for the hash_auxiliary_data function

**Signature**

```ts
export declare const hashAuxiliaryData: (
  auxiliaryData: CML.AuxiliaryData,
) => Effect.Effect<CML.AuxiliaryDataHash, HashAuxiliaryDataError>;
```

Added in v2.0.0

# FunctionsUnsafe

## hashAuxiliaryDataUnsafe

Unsafely calls hash_auxiliary_data function without Effect wrapper

**Signature**

```ts
export declare const hashAuxiliaryDataUnsafe: (
  auxiliaryData: CML.AuxiliaryData,
) => CML.AuxiliaryDataHash;
```

Added in v2.0.0

---
title: CML/Utils/hash_plutus_data.ts
nav_order: 268
parent: Modules
---

## hash_plutus_data overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [HashPlutusDataError (class)](#hashplutusdataerror-class)
- [Functions](#functions)
  - [hashPlutusData](#hashplutusdata)
- [FunctionsUnsafe](#functionsunsafe)
  - [hashPlutusDataUnsafe](#hashplutusdataunsafe)

---

# Errors

## HashPlutusDataError (class)

Error class for hash_plutus_data function

This error is thrown when the hash_plutus_data function fails.

**Signature**

```ts
export declare class HashPlutusDataError
```

Added in v2.0.0

# Functions

## hashPlutusData

Wrapper for the hash_plutus_data function

**Signature**

```ts
export declare const hashPlutusData: (
  plutusData: CML.PlutusData,
) => Effect.Effect<CML.DatumHash, HashPlutusDataError>;
```

Added in v2.0.0

# FunctionsUnsafe

## hashPlutusDataUnsafe

Unsafely calls hash_plutus_data function without Effect wrapper

**Signature**

```ts
export declare const hashPlutusDataUnsafe: (
  plutusData: CML.PlutusData,
) => CML.DatumHash;
```

Added in v2.0.0

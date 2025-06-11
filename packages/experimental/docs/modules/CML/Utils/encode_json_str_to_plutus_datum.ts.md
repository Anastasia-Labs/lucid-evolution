---
title: CML/Utils/encode_json_str_to_plutus_datum.ts
nav_order: 264
parent: Modules
---

## encode_json_str_to_plutus_datum overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [EncodeJsonStrToPlutusDatumError (class)](#encodejsonstrtoplutusdatumerror-class)
- [Functions](#functions)
  - [encodeJsonStrToPlutusDatum](#encodejsonstrtoplutusdatum)
- [FunctionsUnsafe](#functionsunsafe)
  - [encodeJsonStrToPlutusDatumUnsafe](#encodejsonstrtoplutusdatumunsafe)

---

# Errors

## EncodeJsonStrToPlutusDatumError (class)

Error class for encode_json_str_to_plutus_datum function

This error is thrown when the encode_json_str_to_plutus_datum function fails.

**Signature**

```ts
export declare class EncodeJsonStrToPlutusDatumError
```

Added in v2.0.0

# Functions

## encodeJsonStrToPlutusDatum

Wrapper for the encode_json_str_to_plutus_datum function

**Signature**

```ts
export declare const encodeJsonStrToPlutusDatum: (
  json: string,
  schema: CML.CardanoNodePlutusDatumSchema
) => Effect.Effect<CML.PlutusData, EncodeJsonStrToPlutusDatumError>
```

Added in v2.0.0

# FunctionsUnsafe

## encodeJsonStrToPlutusDatumUnsafe

Unsafely calls encode_json_str_to_plutus_datum function without Effect wrapper

**Signature**

```ts
export declare const encodeJsonStrToPlutusDatumUnsafe: (
  json: string,
  schema: CML.CardanoNodePlutusDatumSchema
) => CML.PlutusData
```

Added in v2.0.0

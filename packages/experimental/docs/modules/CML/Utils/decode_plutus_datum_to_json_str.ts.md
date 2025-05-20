---
title: CML/Utils/decode_plutus_datum_to_json_str.ts
nav_order: 260
parent: Modules
---

## decode_plutus_datum_to_json_str overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [DecodePlutusDatumToJsonStrError (class)](#decodeplutusdatumtojsonstrerror-class)
- [Functions](#functions)
  - [decodePlutusDatumToJsonStr](#decodeplutusdatumtojsonstr)
- [FunctionsUnsafe](#functionsunsafe)
  - [decodePlutusDatumToJsonStrUnsafe](#decodeplutusdatumtojsonstrunsafe)

---

# Errors

## DecodePlutusDatumToJsonStrError (class)

Error class for decode_plutus_datum_to_json_str function

This error is thrown when the decode_plutus_datum_to_json_str function fails.

**Signature**

```ts
export declare class DecodePlutusDatumToJsonStrError
```

Added in v2.0.0

# Functions

## decodePlutusDatumToJsonStr

Wrapper for the decode_plutus_datum_to_json_str function

**Signature**

```ts
export declare const decodePlutusDatumToJsonStr: (
  datum: CML.PlutusData,
  schema: CML.CardanoNodePlutusDatumSchema
) => Effect.Effect<string, DecodePlutusDatumToJsonStrError>
```

Added in v2.0.0

# FunctionsUnsafe

## decodePlutusDatumToJsonStrUnsafe

Unsafely calls decode_plutus_datum_to_json_str function without Effect wrapper

**Signature**

```ts
export declare const decodePlutusDatumToJsonStrUnsafe: (
  datum: CML.PlutusData,
  schema: CML.CardanoNodePlutusDatumSchema
) => string
```

Added in v2.0.0

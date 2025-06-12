---
title: CML/Utils/encode_json_str_to_metadatum.ts
nav_order: 263
parent: Modules
---

## encode_json_str_to_metadatum overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [EncodeJsonStrToMetadatumError (class)](#encodejsonstrtometadatumerror-class)
- [Functions](#functions)
  - [encodeJsonStrToMetadatum](#encodejsonstrtometadatum)
- [FunctionsUnsafe](#functionsunsafe)
  - [encodeJsonStrToMetadatumUnsafe](#encodejsonstrtometadatumunsafe)

---

# Errors

## EncodeJsonStrToMetadatumError (class)

Error class for encode_json_str_to_metadatum function

This error is thrown when the encode_json_str_to_metadatum function fails.

**Signature**

```ts
export declare class EncodeJsonStrToMetadatumError
```

Added in v2.0.0

# Functions

## encodeJsonStrToMetadatum

Wrapper for the encode_json_str_to_metadatum function

**Signature**

```ts
export declare const encodeJsonStrToMetadatum: (
  json: string,
  schema: CML.MetadataJsonSchema,
) => Effect.Effect<CML.TransactionMetadatum, EncodeJsonStrToMetadatumError>;
```

Added in v2.0.0

# FunctionsUnsafe

## encodeJsonStrToMetadatumUnsafe

Unsafely calls encode_json_str_to_metadatum function without Effect wrapper

**Signature**

```ts
export declare const encodeJsonStrToMetadatumUnsafe: (
  json: string,
  schema: CML.MetadataJsonSchema,
) => CML.TransactionMetadatum;
```

Added in v2.0.0

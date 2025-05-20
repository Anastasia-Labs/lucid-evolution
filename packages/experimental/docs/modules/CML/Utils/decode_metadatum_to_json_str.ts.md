---
title: CML/Utils/decode_metadatum_to_json_str.ts
nav_order: 259
parent: Modules
---

## decode_metadatum_to_json_str overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [DecodeMetadatumToJsonStrError (class)](#decodemetadatumtojsonstrerror-class)
- [Functions](#functions)
  - [decodeMetadatumToJsonStr](#decodemetadatumtojsonstr)
- [FunctionsUnsafe](#functionsunsafe)
  - [decodeMetadatumToJsonStrUnsafe](#decodemetadatumtojsonstrunsafe)

---

# Errors

## DecodeMetadatumToJsonStrError (class)

Error class for decode_metadatum_to_json_str function

This error is thrown when the decode_metadatum_to_json_str function fails.

**Signature**

```ts
export declare class DecodeMetadatumToJsonStrError
```

Added in v2.0.0

# Functions

## decodeMetadatumToJsonStr

Wrapper for the decode_metadatum_to_json_str function

**Signature**

```ts
export declare const decodeMetadatumToJsonStr: (
  metadatum: CML.TransactionMetadatum,
  schema: CML.MetadataJsonSchema
) => Effect.Effect<string, DecodeMetadatumToJsonStrError>
```

Added in v2.0.0

# FunctionsUnsafe

## decodeMetadatumToJsonStrUnsafe

Unsafely calls decode_metadatum_to_json_str function without Effect wrapper

**Signature**

```ts
export declare const decodeMetadatumToJsonStrUnsafe: (
  metadatum: CML.TransactionMetadatum,
  schema: CML.MetadataJsonSchema
) => string
```

Added in v2.0.0

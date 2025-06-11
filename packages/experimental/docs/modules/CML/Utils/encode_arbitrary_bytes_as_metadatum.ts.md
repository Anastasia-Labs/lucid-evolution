---
title: CML/Utils/encode_arbitrary_bytes_as_metadatum.ts
nav_order: 262
parent: Modules
---

## encode_arbitrary_bytes_as_metadatum overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [EncodeArbitraryBytesAsMetadatumError (class)](#encodearbitrarybytesasmetadatumerror-class)
- [Functions](#functions)
  - [encodeArbitraryBytesAsMetadatum](#encodearbitrarybytesasmetadatum)
- [FunctionsUnsafe](#functionsunsafe)
  - [encodeArbitraryBytesAsMetadatumUnsafe](#encodearbitrarybytesasmetadatumunsafe)

---

# Errors

## EncodeArbitraryBytesAsMetadatumError (class)

Error class for encode_arbitrary_bytes_as_metadatum function

This error is thrown when the encode_arbitrary_bytes_as_metadatum function fails.

**Signature**

```ts
export declare class EncodeArbitraryBytesAsMetadatumError
```

Added in v2.0.0

# Functions

## encodeArbitraryBytesAsMetadatum

Wrapper for the encode_arbitrary_bytes_as_metadatum function

**Signature**

```ts
export declare const encodeArbitraryBytesAsMetadatum: (
  bytes: Uint8Array
) => Effect.Effect<CML.TransactionMetadatum, EncodeArbitraryBytesAsMetadatumError>
```

Added in v2.0.0

# FunctionsUnsafe

## encodeArbitraryBytesAsMetadatumUnsafe

Unsafely calls encode_arbitrary_bytes_as_metadatum function without Effect wrapper

**Signature**

```ts
export declare const encodeArbitraryBytesAsMetadatumUnsafe: (bytes: Uint8Array) => CML.TransactionMetadatum
```

Added in v2.0.0

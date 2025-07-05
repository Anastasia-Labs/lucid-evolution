---
title: CML/Utils/decode_arbitrary_bytes_from_metadatum.ts
nav_order: 257
parent: Modules
---

## decode_arbitrary_bytes_from_metadatum overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [DecodeArbitraryBytesFromMetadatumError (class)](#decodearbitrarybytesfrommetadatumerror-class)
- [Functions](#functions)
  - [decodeArbitraryBytesFromMetadatum](#decodearbitrarybytesfrommetadatum)
- [FunctionsUnsafe](#functionsunsafe)
  - [decodeArbitraryBytesFromMetadatumUnsafe](#decodearbitrarybytesfrommetadatumunsafe)

---

# Errors

## DecodeArbitraryBytesFromMetadatumError (class)

Error class for decode_arbitrary_bytes_from_metadatum function

This error is thrown when the decode_arbitrary_bytes_from_metadatum function fails.

**Signature**

```ts
export declare class DecodeArbitraryBytesFromMetadatumError
```

Added in v2.0.0

# Functions

## decodeArbitraryBytesFromMetadatum

Wrapper for the decode_arbitrary_bytes_from_metadatum function

**Signature**

```ts
export declare const decodeArbitraryBytesFromMetadatum: (
  metadata: CML.TransactionMetadatum,
) => Effect.Effect<
  Uint8Array | undefined,
  DecodeArbitraryBytesFromMetadatumError
>;
```

Added in v2.0.0

# FunctionsUnsafe

## decodeArbitraryBytesFromMetadatumUnsafe

Unsafely calls decode_arbitrary_bytes_from_metadatum function without Effect wrapper

**Signature**

```ts
export declare const decodeArbitraryBytesFromMetadatumUnsafe: (
  metadata: CML.TransactionMetadatum,
) => Uint8Array | undefined;
```

Added in v2.0.0

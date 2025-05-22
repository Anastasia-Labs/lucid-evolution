---
title: CML/Utils/hash_transaction.ts
nav_order: 271
parent: Modules
---

## hash_transaction overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [HashTransactionError (class)](#hashtransactionerror-class)
- [Functions](#functions)
  - [hashTransaction](#hashtransaction)
- [FunctionsUnsafe](#functionsunsafe)
  - [hashTransactionUnsafe](#hashtransactionunsafe)

---

# Errors

## HashTransactionError (class)

Error class for hash_transaction function

This error is thrown when the hash_transaction function fails.

**Signature**

```ts
export declare class HashTransactionError
```

Added in v2.0.0

# Functions

## hashTransaction

Wrapper for the hash_transaction function

**Signature**

```ts
export declare const hashTransaction: (
  txBody: CML.TransactionBody,
) => Effect.Effect<CML.TransactionHash, HashTransactionError>;
```

Added in v2.0.0

# FunctionsUnsafe

## hashTransactionUnsafe

Unsafely calls hash_transaction function without Effect wrapper

**Signature**

```ts
export declare const hashTransactionUnsafe: (
  txBody: CML.TransactionBody,
) => CML.TransactionHash;
```

Added in v2.0.0

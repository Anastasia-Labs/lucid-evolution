---
title: CML/Utils/get_deposit.ts
nav_order: 265
parent: Modules
---

## get_deposit overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [GetDepositError (class)](#getdepositerror-class)
- [Functions](#functions)
  - [getDeposit](#getdeposit)
- [FunctionsUnsafe](#functionsunsafe)
  - [getDepositUnsafe](#getdepositunsafe)

---

# Errors

## GetDepositError (class)

Error class for get_deposit function

This error is thrown when the get_deposit function fails.

**Signature**

```ts
export declare class GetDepositError
```

Added in v2.0.0

# Functions

## getDeposit

Wrapper for the get_deposit function

**Signature**

```ts
export declare const getDeposit: (
  txbody: CML.TransactionBody,
  poolDeposit: bigint,
  keyDeposit: bigint
) => Effect.Effect<bigint, GetDepositError>
```

Added in v2.0.0

# FunctionsUnsafe

## getDepositUnsafe

Unsafely calls get_deposit function without Effect wrapper

**Signature**

```ts
export declare const getDepositUnsafe: (txbody: CML.TransactionBody, poolDeposit: bigint, keyDeposit: bigint) => bigint
```

Added in v2.0.0

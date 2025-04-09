---
title: CML/Utils/get_implicit_input.ts
nav_order: 262
parent: Modules
---

## get_implicit_input overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [GetImplicitInputError (class)](#getimplicitinputerror-class)
- [Functions](#functions)
  - [getImplicitInput](#getimplicitinput)
- [FunctionsUnsafe](#functionsunsafe)
  - [getImplicitInputUnsafe](#getimplicitinputunsafe)

---

# Errors

## GetImplicitInputError (class)

Error class for get_implicit_input function

This error is thrown when the get_implicit_input function fails.

**Signature**

```ts
export declare class GetImplicitInputError
```

Added in v2.0.0

# Functions

## getImplicitInput

Wrapper for the get_implicit_input function

**Signature**

```ts
export declare const getImplicitInput: (
  txbody: CML.TransactionBody,
  poolDeposit: bigint,
  keyDeposit: bigint,
) => Effect.Effect<CML.Value, GetImplicitInputError>;
```

Added in v2.0.0

# FunctionsUnsafe

## getImplicitInputUnsafe

Unsafely calls get_implicit_input function without Effect wrapper

**Signature**

```ts
export declare const getImplicitInputUnsafe: (
  txbody: CML.TransactionBody,
  poolDeposit: bigint,
  keyDeposit: bigint,
) => CML.Value;
```

Added in v2.0.0

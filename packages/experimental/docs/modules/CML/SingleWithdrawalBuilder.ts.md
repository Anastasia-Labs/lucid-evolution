---
title: CML/SingleWithdrawalBuilder.ts
nav_order: 215
parent: Modules
---

## SingleWithdrawalBuilder overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [SingleWithdrawalBuilderError (class)](#singlewithdrawalbuildererror-class)
- [Methods](#methods)
  - [free](#free)
  - [nativeScript](#nativescript)
  - [paymentKey](#paymentkey)
  - [plutusScript](#plutusscript)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [nativeScriptUnsafe](#nativescriptunsafe)
  - [paymentKeyUnsafe](#paymentkeyunsafe)
  - [plutusScriptUnsafe](#plutusscriptunsafe)
- [Types](#types)
  - [SingleWithdrawalBuilder (type alias)](#singlewithdrawalbuilder-type-alias)

---

# Constructors

## \_new

Static method \_new of SingleWithdrawalBuilder

**Signature**

```ts
export declare const _new: (
  address: CML.RewardAddress,
  amount: bigint,
) => Effect.Effect<CML.SingleWithdrawalBuilder, SingleWithdrawalBuilderError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls SingleWithdrawalBuilder.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  address: CML.RewardAddress,
  amount: bigint,
) => CML.SingleWithdrawalBuilder;
```

Added in v2.0.0

# Errors

## SingleWithdrawalBuilderError (class)

Error class for SingleWithdrawalBuilder operations

This error is thrown when operations on SingleWithdrawalBuilder instances fail.

**Signature**

```ts
export declare class SingleWithdrawalBuilderError
```

Added in v2.0.0

# Methods

## free

Method free of SingleWithdrawalBuilder

**Signature**

```ts
export declare const free: (
  instance: CML.SingleWithdrawalBuilder,
) => Effect.Effect<void, SingleWithdrawalBuilderError>;
```

Added in v2.0.0

## nativeScript

Method nativeScript of SingleWithdrawalBuilder

**Signature**

```ts
export declare const nativeScript: (
  instance: CML.SingleWithdrawalBuilder,
  _nativeScript: CML.NativeScript,
  witnessInfo: CML.NativeScriptWitnessInfo,
) => Effect.Effect<CML.WithdrawalBuilderResult, SingleWithdrawalBuilderError>;
```

Added in v2.0.0

## paymentKey

Method paymentKey of SingleWithdrawalBuilder

**Signature**

```ts
export declare const paymentKey: (
  instance: CML.SingleWithdrawalBuilder,
) => Effect.Effect<CML.WithdrawalBuilderResult, SingleWithdrawalBuilderError>;
```

Added in v2.0.0

## plutusScript

Method plutusScript of SingleWithdrawalBuilder

**Signature**

```ts
export declare const plutusScript: (
  instance: CML.SingleWithdrawalBuilder,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
) => Effect.Effect<CML.WithdrawalBuilderResult, SingleWithdrawalBuilderError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.SingleWithdrawalBuilder,
) => void;
```

Added in v2.0.0

## nativeScriptUnsafe

Unsafely calls instance.nativeScript without Effect wrapper

**Signature**

```ts
export declare const nativeScriptUnsafe: (
  instance: CML.SingleWithdrawalBuilder,
  _nativeScript: CML.NativeScript,
  witnessInfo: CML.NativeScriptWitnessInfo,
) => CML.WithdrawalBuilderResult;
```

Added in v2.0.0

## paymentKeyUnsafe

Unsafely calls instance.paymentKey without Effect wrapper

**Signature**

```ts
export declare const paymentKeyUnsafe: (
  instance: CML.SingleWithdrawalBuilder,
) => CML.WithdrawalBuilderResult;
```

Added in v2.0.0

## plutusScriptUnsafe

Unsafely calls instance.plutusScript without Effect wrapper

**Signature**

```ts
export declare const plutusScriptUnsafe: (
  instance: CML.SingleWithdrawalBuilder,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
) => CML.WithdrawalBuilderResult;
```

Added in v2.0.0

# Types

## SingleWithdrawalBuilder (type alias)

Type alias for the CML SingleWithdrawalBuilder class

**Signature**

```ts
export type SingleWithdrawalBuilder = CML.SingleWithdrawalBuilder;
```

Added in v2.0.0

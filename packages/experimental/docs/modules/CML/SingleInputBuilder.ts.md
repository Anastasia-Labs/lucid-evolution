---
title: CML/SingleInputBuilder.ts
nav_order: 206
parent: Modules
---

## SingleInputBuilder overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromTransactionUnspentOutput](#fromtransactionunspentoutput)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromTransactionUnspentOutputUnsafe](#fromtransactionunspentoutputunsafe)
- [Errors](#errors)
  - [SingleInputBuilderError (class)](#singleinputbuildererror-class)
- [Methods](#methods)
  - [free](#free)
  - [nativeScript](#nativescript)
  - [paymentKey](#paymentkey)
  - [plutusScript](#plutusscript)
  - [plutusScriptInlineDatum](#plutusscriptinlinedatum)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [nativeScriptUnsafe](#nativescriptunsafe)
  - [paymentKeyUnsafe](#paymentkeyunsafe)
  - [plutusScriptInlineDatumUnsafe](#plutusscriptinlinedatumunsafe)
  - [plutusScriptUnsafe](#plutusscriptunsafe)
- [Types](#types)
  - [SingleInputBuilder (type alias)](#singleinputbuilder-type-alias)

---

# Constructors

## \_new

Static method \_new of SingleInputBuilder

**Signature**

```ts
export declare const _new: (
  input: CML.TransactionInput,
  utxoInfo: CML.TransactionOutput,
) => Effect.Effect<CML.SingleInputBuilder, SingleInputBuilderError>;
```

Added in v2.0.0

## fromTransactionUnspentOutput

Static method fromTransactionUnspentOutput of SingleInputBuilder

**Signature**

```ts
export declare const fromTransactionUnspentOutput: (
  utxo: CML.TransactionUnspentOutput,
) => Effect.Effect<CML.SingleInputBuilder, SingleInputBuilderError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls SingleInputBuilder.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  input: CML.TransactionInput,
  utxoInfo: CML.TransactionOutput,
) => CML.SingleInputBuilder;
```

Added in v2.0.0

## fromTransactionUnspentOutputUnsafe

Unsafely calls SingleInputBuilder.fromTransactionUnspentOutput without Effect wrapper

**Signature**

```ts
export declare const fromTransactionUnspentOutputUnsafe: (
  utxo: CML.TransactionUnspentOutput,
) => CML.SingleInputBuilder;
```

Added in v2.0.0

# Errors

## SingleInputBuilderError (class)

Error class for SingleInputBuilder operations

This error is thrown when operations on SingleInputBuilder instances fail.

**Signature**

```ts
export declare class SingleInputBuilderError
```

Added in v2.0.0

# Methods

## free

Method free of SingleInputBuilder

**Signature**

```ts
export declare const free: (
  instance: CML.SingleInputBuilder,
) => Effect.Effect<void, SingleInputBuilderError>;
```

Added in v2.0.0

## nativeScript

Method nativeScript of SingleInputBuilder

**Signature**

```ts
export declare const nativeScript: (
  instance: CML.SingleInputBuilder,
  _nativeScript: CML.NativeScript,
  witnessInfo: CML.NativeScriptWitnessInfo,
) => Effect.Effect<CML.InputBuilderResult, SingleInputBuilderError>;
```

Added in v2.0.0

## paymentKey

Method paymentKey of SingleInputBuilder

**Signature**

```ts
export declare const paymentKey: (
  instance: CML.SingleInputBuilder,
) => Effect.Effect<CML.InputBuilderResult, SingleInputBuilderError>;
```

Added in v2.0.0

## plutusScript

Method plutusScript of SingleInputBuilder

**Signature**

```ts
export declare const plutusScript: (
  instance: CML.SingleInputBuilder,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
  datum: CML.PlutusData,
) => Effect.Effect<CML.InputBuilderResult, SingleInputBuilderError>;
```

Added in v2.0.0

## plutusScriptInlineDatum

Method plutusScriptInlineDatum of SingleInputBuilder

**Signature**

```ts
export declare const plutusScriptInlineDatum: (
  instance: CML.SingleInputBuilder,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
) => Effect.Effect<CML.InputBuilderResult, SingleInputBuilderError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.SingleInputBuilder) => void;
```

Added in v2.0.0

## nativeScriptUnsafe

Unsafely calls instance.nativeScript without Effect wrapper

**Signature**

```ts
export declare const nativeScriptUnsafe: (
  instance: CML.SingleInputBuilder,
  _nativeScript: CML.NativeScript,
  witnessInfo: CML.NativeScriptWitnessInfo,
) => CML.InputBuilderResult;
```

Added in v2.0.0

## paymentKeyUnsafe

Unsafely calls instance.paymentKey without Effect wrapper

**Signature**

```ts
export declare const paymentKeyUnsafe: (
  instance: CML.SingleInputBuilder,
) => CML.InputBuilderResult;
```

Added in v2.0.0

## plutusScriptInlineDatumUnsafe

Unsafely calls instance.plutusScriptInlineDatum without Effect wrapper

**Signature**

```ts
export declare const plutusScriptInlineDatumUnsafe: (
  instance: CML.SingleInputBuilder,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
) => CML.InputBuilderResult;
```

Added in v2.0.0

## plutusScriptUnsafe

Unsafely calls instance.plutusScript without Effect wrapper

**Signature**

```ts
export declare const plutusScriptUnsafe: (
  instance: CML.SingleInputBuilder,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
  datum: CML.PlutusData,
) => CML.InputBuilderResult;
```

Added in v2.0.0

# Types

## SingleInputBuilder (type alias)

Type alias for the CML SingleInputBuilder class

**Signature**

```ts
export type SingleInputBuilder = CML.SingleInputBuilder;
```

Added in v2.0.0

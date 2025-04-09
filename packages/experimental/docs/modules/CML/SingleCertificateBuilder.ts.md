---
title: CML/SingleCertificateBuilder.ts
nav_order: 204
parent: Modules
---

## SingleCertificateBuilder overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [SingleCertificateBuilderError (class)](#singlecertificatebuildererror-class)
- [Methods](#methods)
  - [free](#free)
  - [nativeScript](#nativescript)
  - [paymentKey](#paymentkey)
  - [plutusScript](#plutusscript)
  - [skipWitness](#skipwitness)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [nativeScriptUnsafe](#nativescriptunsafe)
  - [paymentKeyUnsafe](#paymentkeyunsafe)
  - [plutusScriptUnsafe](#plutusscriptunsafe)
  - [skipWitnessUnsafe](#skipwitnessunsafe)
- [Types](#types)
  - [SingleCertificateBuilder (type alias)](#singlecertificatebuilder-type-alias)

---

# Constructors

## \_new

Static method \_new of SingleCertificateBuilder

**Signature**

```ts
export declare const _new: (
  cert: CML.Certificate,
) => Effect.Effect<CML.SingleCertificateBuilder, SingleCertificateBuilderError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls SingleCertificateBuilder.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  cert: CML.Certificate,
) => CML.SingleCertificateBuilder;
```

Added in v2.0.0

# Errors

## SingleCertificateBuilderError (class)

Error class for SingleCertificateBuilder operations

This error is thrown when operations on SingleCertificateBuilder instances fail.

**Signature**

```ts
export declare class SingleCertificateBuilderError
```

Added in v2.0.0

# Methods

## free

Method free of SingleCertificateBuilder

**Signature**

```ts
export declare const free: (
  instance: CML.SingleCertificateBuilder,
) => Effect.Effect<void, SingleCertificateBuilderError>;
```

Added in v2.0.0

## nativeScript

Method nativeScript of SingleCertificateBuilder

**Signature**

```ts
export declare const nativeScript: (
  instance: CML.SingleCertificateBuilder,
  _nativeScript: CML.NativeScript,
  witnessInfo: CML.NativeScriptWitnessInfo,
) => Effect.Effect<CML.CertificateBuilderResult, SingleCertificateBuilderError>;
```

Added in v2.0.0

## paymentKey

Method paymentKey of SingleCertificateBuilder

**Signature**

```ts
export declare const paymentKey: (
  instance: CML.SingleCertificateBuilder,
) => Effect.Effect<CML.CertificateBuilderResult, SingleCertificateBuilderError>;
```

Added in v2.0.0

## plutusScript

Method plutusScript of SingleCertificateBuilder

**Signature**

```ts
export declare const plutusScript: (
  instance: CML.SingleCertificateBuilder,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
) => Effect.Effect<CML.CertificateBuilderResult, SingleCertificateBuilderError>;
```

Added in v2.0.0

## skipWitness

Method skipWitness of SingleCertificateBuilder

**Signature**

```ts
export declare const skipWitness: (
  instance: CML.SingleCertificateBuilder,
) => Effect.Effect<CML.CertificateBuilderResult, SingleCertificateBuilderError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.SingleCertificateBuilder,
) => void;
```

Added in v2.0.0

## nativeScriptUnsafe

Unsafely calls instance.nativeScript without Effect wrapper

**Signature**

```ts
export declare const nativeScriptUnsafe: (
  instance: CML.SingleCertificateBuilder,
  _nativeScript: CML.NativeScript,
  witnessInfo: CML.NativeScriptWitnessInfo,
) => CML.CertificateBuilderResult;
```

Added in v2.0.0

## paymentKeyUnsafe

Unsafely calls instance.paymentKey without Effect wrapper

**Signature**

```ts
export declare const paymentKeyUnsafe: (
  instance: CML.SingleCertificateBuilder,
) => CML.CertificateBuilderResult;
```

Added in v2.0.0

## plutusScriptUnsafe

Unsafely calls instance.plutusScript without Effect wrapper

**Signature**

```ts
export declare const plutusScriptUnsafe: (
  instance: CML.SingleCertificateBuilder,
  partialWitness: CML.PartialPlutusWitness,
  requiredSigners: CML.Ed25519KeyHashList,
) => CML.CertificateBuilderResult;
```

Added in v2.0.0

## skipWitnessUnsafe

Unsafely calls instance.skipWitness without Effect wrapper

**Signature**

```ts
export declare const skipWitnessUnsafe: (
  instance: CML.SingleCertificateBuilder,
) => CML.CertificateBuilderResult;
```

Added in v2.0.0

# Types

## SingleCertificateBuilder (type alias)

Type alias for the CML SingleCertificateBuilder class

**Signature**

```ts
export type SingleCertificateBuilder = CML.SingleCertificateBuilder;
```

Added in v2.0.0

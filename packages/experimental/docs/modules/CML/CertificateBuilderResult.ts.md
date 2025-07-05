---
title: CML/CertificateBuilderResult.ts
nav_order: 33
parent: Modules
---

## CertificateBuilderResult overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [CertificateBuilderResultError (class)](#certificatebuilderresulterror-class)
- [Methods](#methods)
  - [free](#free)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
- [Types](#types)
  - [CertificateBuilderResult (type alias)](#certificatebuilderresult-type-alias)

---

# Errors

## CertificateBuilderResultError (class)

Error class for CertificateBuilderResult operations

This error is thrown when operations on CertificateBuilderResult instances fail.

**Signature**

```ts
export declare class CertificateBuilderResultError
```

Added in v2.0.0

# Methods

## free

Method free of CertificateBuilderResult

**Signature**

```ts
export declare const free: (
  instance: CML.CertificateBuilderResult,
) => Effect.Effect<void, CertificateBuilderResultError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.CertificateBuilderResult,
) => void;
```

Added in v2.0.0

# Types

## CertificateBuilderResult (type alias)

Type alias for the CML CertificateBuilderResult class

**Signature**

```ts
export type CertificateBuilderResult = CML.CertificateBuilderResult;
```

Added in v2.0.0

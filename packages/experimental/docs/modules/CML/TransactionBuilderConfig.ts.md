---
title: CML/TransactionBuilderConfig.ts
nav_order: 230
parent: Modules
---

## TransactionBuilderConfig overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [TransactionBuilderConfigError (class)](#transactionbuilderconfigerror-class)
- [Methods](#methods)
  - [free](#free)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
- [Types](#types)
  - [TransactionBuilderConfig (type alias)](#transactionbuilderconfig-type-alias)

---

# Errors

## TransactionBuilderConfigError (class)

Error class for TransactionBuilderConfig operations

This error is thrown when operations on TransactionBuilderConfig instances fail.

**Signature**

```ts
export declare class TransactionBuilderConfigError
```

Added in v2.0.0

# Methods

## free

Method free of TransactionBuilderConfig

**Signature**

```ts
export declare const free: (
  instance: CML.TransactionBuilderConfig,
) => Effect.Effect<void, TransactionBuilderConfigError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.TransactionBuilderConfig,
) => void;
```

Added in v2.0.0

# Types

## TransactionBuilderConfig (type alias)

Type alias for the CML TransactionBuilderConfig class

**Signature**

```ts
export type TransactionBuilderConfig = CML.TransactionBuilderConfig;
```

Added in v2.0.0

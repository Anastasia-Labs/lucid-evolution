---
title: CML/WithdrawalBuilderResult.ts
nav_order: 293
parent: Modules
---

## WithdrawalBuilderResult overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [WithdrawalBuilderResultError (class)](#withdrawalbuilderresulterror-class)
- [Methods](#methods)
  - [free](#free)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
- [Types](#types)
  - [WithdrawalBuilderResult (type alias)](#withdrawalbuilderresult-type-alias)

---

# Errors

## WithdrawalBuilderResultError (class)

Error class for WithdrawalBuilderResult operations

This error is thrown when operations on WithdrawalBuilderResult instances fail.

**Signature**

```ts
export declare class WithdrawalBuilderResultError
```

Added in v2.0.0

# Methods

## free

Method free of WithdrawalBuilderResult

**Signature**

```ts
export declare const free: (
  instance: CML.WithdrawalBuilderResult,
) => Effect.Effect<void, WithdrawalBuilderResultError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.WithdrawalBuilderResult,
) => void;
```

Added in v2.0.0

# Types

## WithdrawalBuilderResult (type alias)

Type alias for the CML WithdrawalBuilderResult class

**Signature**

```ts
export type WithdrawalBuilderResult = CML.WithdrawalBuilderResult;
```

Added in v2.0.0

---
title: CML/MintBuilderResult.ts
nav_order: 133
parent: Modules
---

## MintBuilderResult overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [MintBuilderResultError (class)](#mintbuilderresulterror-class)
- [Methods](#methods)
  - [free](#free)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
- [Types](#types)
  - [MintBuilderResult (type alias)](#mintbuilderresult-type-alias)

---

# Errors

## MintBuilderResultError (class)

Error class for MintBuilderResult operations

This error is thrown when operations on MintBuilderResult instances fail.

**Signature**

```ts
export declare class MintBuilderResultError
```

Added in v2.0.0

# Methods

## free

Method free of MintBuilderResult

**Signature**

```ts
export declare const free: (instance: CML.MintBuilderResult) => Effect.Effect<void, MintBuilderResultError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.MintBuilderResult) => void
```

Added in v2.0.0

# Types

## MintBuilderResult (type alias)

Type alias for the CML MintBuilderResult class

**Signature**

```ts
export type MintBuilderResult = CML.MintBuilderResult
```

Added in v2.0.0

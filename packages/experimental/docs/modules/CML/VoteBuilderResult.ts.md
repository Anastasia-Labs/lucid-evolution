---
title: CML/VoteBuilderResult.ts
nav_order: 277
parent: Modules
---

## VoteBuilderResult overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [VoteBuilderResultError (class)](#votebuilderresulterror-class)
- [Methods](#methods)
  - [free](#free)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
- [Types](#types)
  - [VoteBuilderResult (type alias)](#votebuilderresult-type-alias)

---

# Errors

## VoteBuilderResultError (class)

Error class for VoteBuilderResult operations

This error is thrown when operations on VoteBuilderResult instances fail.

**Signature**

```ts
export declare class VoteBuilderResultError
```

Added in v2.0.0

# Methods

## free

Method free of VoteBuilderResult

**Signature**

```ts
export declare const free: (
  instance: CML.VoteBuilderResult,
) => Effect.Effect<void, VoteBuilderResultError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.VoteBuilderResult) => void;
```

Added in v2.0.0

# Types

## VoteBuilderResult (type alias)

Type alias for the CML VoteBuilderResult class

**Signature**

```ts
export type VoteBuilderResult = CML.VoteBuilderResult;
```

Added in v2.0.0

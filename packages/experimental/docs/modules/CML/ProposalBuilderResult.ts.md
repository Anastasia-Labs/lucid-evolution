---
title: CML/ProposalBuilderResult.ts
nav_order: 175
parent: Modules
---

## ProposalBuilderResult overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [ProposalBuilderResultError (class)](#proposalbuilderresulterror-class)
- [Methods](#methods)
  - [free](#free)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
- [Types](#types)
  - [ProposalBuilderResult (type alias)](#proposalbuilderresult-type-alias)

---

# Errors

## ProposalBuilderResultError (class)

Error class for ProposalBuilderResult operations

This error is thrown when operations on ProposalBuilderResult instances fail.

**Signature**

```ts
export declare class ProposalBuilderResultError
```

Added in v2.0.0

# Methods

## free

Method free of ProposalBuilderResult

**Signature**

```ts
export declare const free: (instance: CML.ProposalBuilderResult) => Effect.Effect<void, ProposalBuilderResultError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ProposalBuilderResult) => void
```

Added in v2.0.0

# Types

## ProposalBuilderResult (type alias)

Type alias for the CML ProposalBuilderResult class

**Signature**

```ts
export type ProposalBuilderResult = CML.ProposalBuilderResult
```

Added in v2.0.0

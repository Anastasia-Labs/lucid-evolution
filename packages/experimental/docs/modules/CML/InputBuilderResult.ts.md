---
title: CML/InputBuilderResult.ts
nav_order: 110
parent: Modules
---

## InputBuilderResult overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [InputBuilderResultError (class)](#inputbuilderresulterror-class)
- [Methods](#methods)
  - [free](#free)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
- [Types](#types)
  - [InputBuilderResult (type alias)](#inputbuilderresult-type-alias)

---

# Errors

## InputBuilderResultError (class)

Error class for InputBuilderResult operations

This error is thrown when operations on InputBuilderResult instances fail.

**Signature**

```ts
export declare class InputBuilderResultError
```

Added in v2.0.0

# Methods

## free

Method free of InputBuilderResult

**Signature**

```ts
export declare const free: (instance: CML.InputBuilderResult) => Effect.Effect<void, InputBuilderResultError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.InputBuilderResult) => void
```

Added in v2.0.0

# Types

## InputBuilderResult (type alias)

Type alias for the CML InputBuilderResult class

**Signature**

```ts
export type InputBuilderResult = CML.InputBuilderResult
```

Added in v2.0.0

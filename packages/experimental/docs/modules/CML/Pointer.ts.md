---
title: CML/Pointer.ts
nav_order: 159
parent: Modules
---

## Pointer overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Errors](#errors)
  - [PointerError (class)](#pointererror-class)
- [Methods](#methods)
  - [free](#free)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
- [Types](#types)
  - [Pointer (type alias)](#pointer-type-alias)

---

# Errors

## PointerError (class)

Error class for Pointer operations

This error is thrown when operations on Pointer instances fail.

**Signature**

```ts
export declare class PointerError
```

Added in v2.0.0

# Methods

## free

Method free of Pointer

**Signature**

```ts
export declare const free: (instance: CML.Pointer) => Effect.Effect<void, PointerError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Pointer) => void
```

Added in v2.0.0

# Types

## Pointer (type alias)

Type alias for the CML Pointer class

**Signature**

```ts
export type Pointer = CML.Pointer
```

Added in v2.0.0

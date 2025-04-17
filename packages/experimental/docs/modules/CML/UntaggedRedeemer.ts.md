---
title: CML/UntaggedRedeemer.ts
nav_order: 251
parent: Modules
---

## UntaggedRedeemer overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [UntaggedRedeemerError (class)](#untaggedredeemererror-class)
- [Methods](#methods)
  - [free](#free)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
- [Types](#types)
  - [UntaggedRedeemer (type alias)](#untaggedredeemer-type-alias)

---

# Constructors

## \_new

Static method \_new of UntaggedRedeemer

**Signature**

```ts
export declare const _new: (
  data: CML.PlutusData,
  exUnits: CML.ExUnits,
) => Effect.Effect<CML.UntaggedRedeemer, UntaggedRedeemerError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls UntaggedRedeemer.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  data: CML.PlutusData,
  exUnits: CML.ExUnits,
) => CML.UntaggedRedeemer;
```

Added in v2.0.0

# Errors

## UntaggedRedeemerError (class)

Error class for UntaggedRedeemer operations

This error is thrown when operations on UntaggedRedeemer instances fail.

**Signature**

```ts
export declare class UntaggedRedeemerError
```

Added in v2.0.0

# Methods

## free

Method free of UntaggedRedeemer

**Signature**

```ts
export declare const free: (
  instance: CML.UntaggedRedeemer,
) => Effect.Effect<void, UntaggedRedeemerError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.UntaggedRedeemer) => void;
```

Added in v2.0.0

# Types

## UntaggedRedeemer (type alias)

Type alias for the CML UntaggedRedeemer class

**Signature**

```ts
export type UntaggedRedeemer = CML.UntaggedRedeemer;
```

Added in v2.0.0

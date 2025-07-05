---
title: CML/ProtocolMagic.ts
nav_order: 178
parent: Modules
---

## ProtocolMagic overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [ProtocolMagicError (class)](#protocolmagicerror-class)
- [Methods](#methods)
  - [free](#free)
  - [toInt](#toint)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toIntUnsafe](#tointunsafe)
- [Types](#types)
  - [ProtocolMagic (type alias)](#protocolmagic-type-alias)

---

# Constructors

## \_new

Static method \_new of ProtocolMagic

**Signature**

```ts
export declare const _new: (
  pm: number,
) => Effect.Effect<CML.ProtocolMagic, ProtocolMagicError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ProtocolMagic.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (pm: number) => CML.ProtocolMagic;
```

Added in v2.0.0

# Errors

## ProtocolMagicError (class)

Error class for ProtocolMagic operations

This error is thrown when operations on ProtocolMagic instances fail.

**Signature**

```ts
export declare class ProtocolMagicError
```

Added in v2.0.0

# Methods

## free

Method free of ProtocolMagic

**Signature**

```ts
export declare const free: (
  instance: CML.ProtocolMagic,
) => Effect.Effect<void, ProtocolMagicError>;
```

Added in v2.0.0

## toInt

Method toInt of ProtocolMagic

**Signature**

```ts
export declare const toInt: (
  instance: CML.ProtocolMagic,
) => Effect.Effect<number, ProtocolMagicError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ProtocolMagic) => void;
```

Added in v2.0.0

## toIntUnsafe

Unsafely calls instance.toInt without Effect wrapper

**Signature**

```ts
export declare const toIntUnsafe: (instance: CML.ProtocolMagic) => number;
```

Added in v2.0.0

# Types

## ProtocolMagic (type alias)

Type alias for the CML ProtocolMagic class

**Signature**

```ts
export type ProtocolMagic = CML.ProtocolMagic;
```

Added in v2.0.0

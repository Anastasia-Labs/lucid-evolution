---
title: CML/Crc32.ts
nav_order: 51
parent: Modules
---

## Crc32 overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [Crc32Error (class)](#crc32error-class)
- [Methods](#methods)
  - [finalize](#finalize)
  - [free](#free)
  - [update](#update)
- [MethodsUnsafe](#methodsunsafe)
  - [finalizeUnsafe](#finalizeunsafe)
  - [freeUnsafe](#freeunsafe)
  - [updateUnsafe](#updateunsafe)
- [Types](#types)
  - [Crc32 (type alias)](#crc32-type-alias)

---

# Constructors

## \_new

Static method \_new of Crc32

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.Crc32, Crc32Error>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls Crc32.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.Crc32;
```

Added in v2.0.0

# Errors

## Crc32Error (class)

Error class for Crc32 operations

This error is thrown when operations on Crc32 instances fail.

**Signature**

```ts
export declare class Crc32Error
```

Added in v2.0.0

# Methods

## finalize

Method finalize of Crc32

**Signature**

```ts
export declare const finalize: (
  instance: CML.Crc32,
) => Effect.Effect<number, Crc32Error>;
```

Added in v2.0.0

## free

Method free of Crc32

**Signature**

```ts
export declare const free: (
  instance: CML.Crc32,
) => Effect.Effect<void, Crc32Error>;
```

Added in v2.0.0

## update

Method update of Crc32

**Signature**

```ts
export declare const update: (
  instance: CML.Crc32,
  bytes: Uint8Array,
) => Effect.Effect<void, Crc32Error>;
```

Added in v2.0.0

# MethodsUnsafe

## finalizeUnsafe

Unsafely calls instance.finalize without Effect wrapper

**Signature**

```ts
export declare const finalizeUnsafe: (instance: CML.Crc32) => number;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Crc32) => void;
```

Added in v2.0.0

## updateUnsafe

Unsafely calls instance.update without Effect wrapper

**Signature**

```ts
export declare const updateUnsafe: (
  instance: CML.Crc32,
  bytes: Uint8Array,
) => void;
```

Added in v2.0.0

# Types

## Crc32 (type alias)

Type alias for the CML Crc32 class

**Signature**

```ts
export type Crc32 = CML.Crc32;
```

Added in v2.0.0

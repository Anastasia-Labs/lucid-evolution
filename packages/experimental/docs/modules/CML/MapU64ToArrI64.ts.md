---
title: CML/MapU64ToArrI64.ts
nav_order: 133
parent: Modules
---

## MapU64ToArrI64 overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MapU64ToArrI64Error (class)](#mapu64toarri64error-class)
- [Methods](#methods)
  - [free](#free)
  - [get](#get)
  - [insert](#insert)
  - [isEmpty](#isempty)
  - [keys](#keys)
  - [len](#len)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getUnsafe](#getunsafe)
  - [insertUnsafe](#insertunsafe)
  - [isEmptyUnsafe](#isemptyunsafe)
  - [keysUnsafe](#keysunsafe)
  - [lenUnsafe](#lenunsafe)
- [Types](#types)
  - [MapU64ToArrI64 (type alias)](#mapu64toarri64-type-alias)

---

# Constructors

## \_new

Static method \_new of MapU64ToArrI64

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.MapU64ToArrI64,
  MapU64ToArrI64Error
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls MapU64ToArrI64.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.MapU64ToArrI64;
```

Added in v2.0.0

# Errors

## MapU64ToArrI64Error (class)

Error class for MapU64ToArrI64 operations

This error is thrown when operations on MapU64ToArrI64 instances fail.

**Signature**

```ts
export declare class MapU64ToArrI64Error
```

Added in v2.0.0

# Methods

## free

Method free of MapU64ToArrI64

**Signature**

```ts
export declare const free: (
  instance: CML.MapU64ToArrI64,
) => Effect.Effect<void, MapU64ToArrI64Error>;
```

Added in v2.0.0

## get

Method get of MapU64ToArrI64

**Signature**

```ts
export declare const get: (
  instance: CML.MapU64ToArrI64,
  key: bigint,
) => Effect.Effect<BigInt64Array | undefined, MapU64ToArrI64Error>;
```

Added in v2.0.0

## insert

Method insert of MapU64ToArrI64

**Signature**

```ts
export declare const insert: (
  instance: CML.MapU64ToArrI64,
  key: bigint,
  value: BigInt64Array,
) => Effect.Effect<BigInt64Array | undefined, MapU64ToArrI64Error>;
```

Added in v2.0.0

## isEmpty

Method isEmpty of MapU64ToArrI64

**Signature**

```ts
export declare const isEmpty: (
  instance: CML.MapU64ToArrI64,
) => Effect.Effect<boolean, MapU64ToArrI64Error>;
```

Added in v2.0.0

## keys

Method keys of MapU64ToArrI64

**Signature**

```ts
export declare const keys: (
  instance: CML.MapU64ToArrI64,
) => Effect.Effect<BigUint64Array, MapU64ToArrI64Error>;
```

Added in v2.0.0

## len

Method len of MapU64ToArrI64

**Signature**

```ts
export declare const len: (
  instance: CML.MapU64ToArrI64,
) => Effect.Effect<number, MapU64ToArrI64Error>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.MapU64ToArrI64) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.MapU64ToArrI64,
  key: bigint,
) => BigInt64Array | undefined;
```

Added in v2.0.0

## insertUnsafe

Unsafely calls instance.insert without Effect wrapper

**Signature**

```ts
export declare const insertUnsafe: (
  instance: CML.MapU64ToArrI64,
  key: bigint,
  value: BigInt64Array,
) => BigInt64Array | undefined;
```

Added in v2.0.0

## isEmptyUnsafe

Unsafely calls instance.isEmpty without Effect wrapper

**Signature**

```ts
export declare const isEmptyUnsafe: (instance: CML.MapU64ToArrI64) => boolean;
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (
  instance: CML.MapU64ToArrI64,
) => BigUint64Array;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.MapU64ToArrI64) => number;
```

Added in v2.0.0

# Types

## MapU64ToArrI64 (type alias)

Type alias for the CML MapU64ToArrI64 class

**Signature**

```ts
export type MapU64ToArrI64 = CML.MapU64ToArrI64;
```

Added in v2.0.0

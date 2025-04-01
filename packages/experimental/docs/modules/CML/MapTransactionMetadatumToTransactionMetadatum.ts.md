---
title: CML/MapTransactionMetadatumToTransactionMetadatum.ts
nav_order: 127
parent: Modules
---

## MapTransactionMetadatumToTransactionMetadatum overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MapTransactionMetadatumToTransactionMetadatumError (class)](#maptransactionmetadatumtotransactionmetadatumerror-class)
- [Methods](#methods)
  - [free](#free)
  - [get](#get)
  - [insert](#insert)
  - [keys](#keys)
  - [len](#len)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getUnsafe](#getunsafe)
  - [insertUnsafe](#insertunsafe)
  - [keysUnsafe](#keysunsafe)
  - [lenUnsafe](#lenunsafe)
- [Types](#types)
  - [MapTransactionMetadatumToTransactionMetadatum (type alias)](#maptransactionmetadatumtotransactionmetadatum-type-alias)

---

# Constructors

## \_new

Static method \_new of MapTransactionMetadatumToTransactionMetadatum

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.MapTransactionMetadatumToTransactionMetadatum,
  MapTransactionMetadatumToTransactionMetadatumError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls MapTransactionMetadatumToTransactionMetadatum.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.MapTransactionMetadatumToTransactionMetadatum;
```

Added in v2.0.0

# Errors

## MapTransactionMetadatumToTransactionMetadatumError (class)

Error class for MapTransactionMetadatumToTransactionMetadatum operations

This error is thrown when operations on MapTransactionMetadatumToTransactionMetadatum instances fail.

**Signature**

```ts
export declare class MapTransactionMetadatumToTransactionMetadatumError
```

Added in v2.0.0

# Methods

## free

Method free of MapTransactionMetadatumToTransactionMetadatum

**Signature**

```ts
export declare const free: (
  instance: CML.MapTransactionMetadatumToTransactionMetadatum,
) => Effect.Effect<void, MapTransactionMetadatumToTransactionMetadatumError>;
```

Added in v2.0.0

## get

Method get of MapTransactionMetadatumToTransactionMetadatum

**Signature**

```ts
export declare const get: (
  instance: CML.MapTransactionMetadatumToTransactionMetadatum,
  key: CML.TransactionMetadatum,
) => Effect.Effect<
  CML.TransactionMetadatum | undefined,
  MapTransactionMetadatumToTransactionMetadatumError
>;
```

Added in v2.0.0

## insert

Method insert of MapTransactionMetadatumToTransactionMetadatum

**Signature**

```ts
export declare const insert: (
  instance: CML.MapTransactionMetadatumToTransactionMetadatum,
  key: CML.TransactionMetadatum,
  value: CML.TransactionMetadatum,
) => Effect.Effect<
  CML.TransactionMetadatum | undefined,
  MapTransactionMetadatumToTransactionMetadatumError
>;
```

Added in v2.0.0

## keys

Method keys of MapTransactionMetadatumToTransactionMetadatum

**Signature**

```ts
export declare const keys: (
  instance: CML.MapTransactionMetadatumToTransactionMetadatum,
) => Effect.Effect<
  CML.TransactionMetadatumList,
  MapTransactionMetadatumToTransactionMetadatumError
>;
```

Added in v2.0.0

## len

Method len of MapTransactionMetadatumToTransactionMetadatum

**Signature**

```ts
export declare const len: (
  instance: CML.MapTransactionMetadatumToTransactionMetadatum,
) => Effect.Effect<number, MapTransactionMetadatumToTransactionMetadatumError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.MapTransactionMetadatumToTransactionMetadatum,
) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.MapTransactionMetadatumToTransactionMetadatum,
  key: CML.TransactionMetadatum,
) => CML.TransactionMetadatum | undefined;
```

Added in v2.0.0

## insertUnsafe

Unsafely calls instance.insert without Effect wrapper

**Signature**

```ts
export declare const insertUnsafe: (
  instance: CML.MapTransactionMetadatumToTransactionMetadatum,
  key: CML.TransactionMetadatum,
  value: CML.TransactionMetadatum,
) => CML.TransactionMetadatum | undefined;
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (
  instance: CML.MapTransactionMetadatumToTransactionMetadatum,
) => CML.TransactionMetadatumList;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (
  instance: CML.MapTransactionMetadatumToTransactionMetadatum,
) => number;
```

Added in v2.0.0

# Types

## MapTransactionMetadatumToTransactionMetadatum (type alias)

Type alias for the CML MapTransactionMetadatumToTransactionMetadatum class

**Signature**

```ts
export type MapTransactionMetadatumToTransactionMetadatum =
  CML.MapTransactionMetadatumToTransactionMetadatum;
```

Added in v2.0.0

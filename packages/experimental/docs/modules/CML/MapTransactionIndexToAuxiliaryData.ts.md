---
title: CML/MapTransactionIndexToAuxiliaryData.ts
nav_order: 131
parent: Modules
---

## MapTransactionIndexToAuxiliaryData overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MapTransactionIndexToAuxiliaryDataError (class)](#maptransactionindextoauxiliarydataerror-class)
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
  - [MapTransactionIndexToAuxiliaryData (type alias)](#maptransactionindextoauxiliarydata-type-alias)

---

# Constructors

## \_new

Static method \_new of MapTransactionIndexToAuxiliaryData

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.MapTransactionIndexToAuxiliaryData,
  MapTransactionIndexToAuxiliaryDataError
>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls MapTransactionIndexToAuxiliaryData.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.MapTransactionIndexToAuxiliaryData
```

Added in v2.0.0

# Errors

## MapTransactionIndexToAuxiliaryDataError (class)

Error class for MapTransactionIndexToAuxiliaryData operations

This error is thrown when operations on MapTransactionIndexToAuxiliaryData instances fail.

**Signature**

```ts
export declare class MapTransactionIndexToAuxiliaryDataError
```

Added in v2.0.0

# Methods

## free

Method free of MapTransactionIndexToAuxiliaryData

**Signature**

```ts
export declare const free: (
  instance: CML.MapTransactionIndexToAuxiliaryData
) => Effect.Effect<void, MapTransactionIndexToAuxiliaryDataError>
```

Added in v2.0.0

## get

Method get of MapTransactionIndexToAuxiliaryData

**Signature**

```ts
export declare const get: (
  instance: CML.MapTransactionIndexToAuxiliaryData,
  key: number
) => Effect.Effect<CML.AuxiliaryData | undefined, MapTransactionIndexToAuxiliaryDataError>
```

Added in v2.0.0

## insert

Method insert of MapTransactionIndexToAuxiliaryData

**Signature**

```ts
export declare const insert: (
  instance: CML.MapTransactionIndexToAuxiliaryData,
  key: number,
  value: CML.AuxiliaryData
) => Effect.Effect<CML.AuxiliaryData | undefined, MapTransactionIndexToAuxiliaryDataError>
```

Added in v2.0.0

## keys

Method keys of MapTransactionIndexToAuxiliaryData

**Signature**

```ts
export declare const keys: (
  instance: CML.MapTransactionIndexToAuxiliaryData
) => Effect.Effect<Uint16Array, MapTransactionIndexToAuxiliaryDataError>
```

Added in v2.0.0

## len

Method len of MapTransactionIndexToAuxiliaryData

**Signature**

```ts
export declare const len: (
  instance: CML.MapTransactionIndexToAuxiliaryData
) => Effect.Effect<number, MapTransactionIndexToAuxiliaryDataError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.MapTransactionIndexToAuxiliaryData) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.MapTransactionIndexToAuxiliaryData,
  key: number
) => CML.AuxiliaryData | undefined
```

Added in v2.0.0

## insertUnsafe

Unsafely calls instance.insert without Effect wrapper

**Signature**

```ts
export declare const insertUnsafe: (
  instance: CML.MapTransactionIndexToAuxiliaryData,
  key: number,
  value: CML.AuxiliaryData
) => CML.AuxiliaryData | undefined
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (instance: CML.MapTransactionIndexToAuxiliaryData) => Uint16Array
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.MapTransactionIndexToAuxiliaryData) => number
```

Added in v2.0.0

# Types

## MapTransactionIndexToAuxiliaryData (type alias)

Type alias for the CML MapTransactionIndexToAuxiliaryData class

**Signature**

```ts
export type MapTransactionIndexToAuxiliaryData = CML.MapTransactionIndexToAuxiliaryData
```

Added in v2.0.0

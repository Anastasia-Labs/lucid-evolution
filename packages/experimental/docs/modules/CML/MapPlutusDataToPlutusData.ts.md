---
title: CML/MapPlutusDataToPlutusData.ts
nav_order: 128
parent: Modules
---

## MapPlutusDataToPlutusData overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MapPlutusDataToPlutusDataError (class)](#mapplutusdatatoplutusdataerror-class)
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
  - [MapPlutusDataToPlutusData (type alias)](#mapplutusdatatoplutusdata-type-alias)

---

# Constructors

## \_new

Static method \_new of MapPlutusDataToPlutusData

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.MapPlutusDataToPlutusData, MapPlutusDataToPlutusDataError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls MapPlutusDataToPlutusData.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.MapPlutusDataToPlutusData
```

Added in v2.0.0

# Errors

## MapPlutusDataToPlutusDataError (class)

Error class for MapPlutusDataToPlutusData operations

This error is thrown when operations on MapPlutusDataToPlutusData instances fail.

**Signature**

```ts
export declare class MapPlutusDataToPlutusDataError
```

Added in v2.0.0

# Methods

## free

Method free of MapPlutusDataToPlutusData

**Signature**

```ts
export declare const free: (
  instance: CML.MapPlutusDataToPlutusData
) => Effect.Effect<void, MapPlutusDataToPlutusDataError>
```

Added in v2.0.0

## get

Method get of MapPlutusDataToPlutusData

**Signature**

```ts
export declare const get: (
  instance: CML.MapPlutusDataToPlutusData,
  key: CML.PlutusData
) => Effect.Effect<CML.PlutusData | undefined, MapPlutusDataToPlutusDataError>
```

Added in v2.0.0

## insert

Method insert of MapPlutusDataToPlutusData

**Signature**

```ts
export declare const insert: (
  instance: CML.MapPlutusDataToPlutusData,
  key: CML.PlutusData,
  value: CML.PlutusData
) => Effect.Effect<CML.PlutusData | undefined, MapPlutusDataToPlutusDataError>
```

Added in v2.0.0

## keys

Method keys of MapPlutusDataToPlutusData

**Signature**

```ts
export declare const keys: (
  instance: CML.MapPlutusDataToPlutusData
) => Effect.Effect<CML.PlutusDataList, MapPlutusDataToPlutusDataError>
```

Added in v2.0.0

## len

Method len of MapPlutusDataToPlutusData

**Signature**

```ts
export declare const len: (
  instance: CML.MapPlutusDataToPlutusData
) => Effect.Effect<number, MapPlutusDataToPlutusDataError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.MapPlutusDataToPlutusData) => void
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.MapPlutusDataToPlutusData,
  key: CML.PlutusData
) => CML.PlutusData | undefined
```

Added in v2.0.0

## insertUnsafe

Unsafely calls instance.insert without Effect wrapper

**Signature**

```ts
export declare const insertUnsafe: (
  instance: CML.MapPlutusDataToPlutusData,
  key: CML.PlutusData,
  value: CML.PlutusData
) => CML.PlutusData | undefined
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (instance: CML.MapPlutusDataToPlutusData) => CML.PlutusDataList
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.MapPlutusDataToPlutusData) => number
```

Added in v2.0.0

# Types

## MapPlutusDataToPlutusData (type alias)

Type alias for the CML MapPlutusDataToPlutusData class

**Signature**

```ts
export type MapPlutusDataToPlutusData = CML.MapPlutusDataToPlutusData
```

Added in v2.0.0

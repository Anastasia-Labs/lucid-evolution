---
title: CML/MapRedeemerKeyToRedeemerVal.ts
nav_order: 129
parent: Modules
---

## MapRedeemerKeyToRedeemerVal overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MapRedeemerKeyToRedeemerValError (class)](#mapredeemerkeytoredeemervalerror-class)
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
  - [MapRedeemerKeyToRedeemerVal (type alias)](#mapredeemerkeytoredeemerval-type-alias)

---

# Constructors

## \_new

Static method \_new of MapRedeemerKeyToRedeemerVal

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.MapRedeemerKeyToRedeemerVal,
  MapRedeemerKeyToRedeemerValError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls MapRedeemerKeyToRedeemerVal.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.MapRedeemerKeyToRedeemerVal;
```

Added in v2.0.0

# Errors

## MapRedeemerKeyToRedeemerValError (class)

Error class for MapRedeemerKeyToRedeemerVal operations

This error is thrown when operations on MapRedeemerKeyToRedeemerVal instances fail.

**Signature**

```ts
export declare class MapRedeemerKeyToRedeemerValError
```

Added in v2.0.0

# Methods

## free

Method free of MapRedeemerKeyToRedeemerVal

**Signature**

```ts
export declare const free: (
  instance: CML.MapRedeemerKeyToRedeemerVal,
) => Effect.Effect<void, MapRedeemerKeyToRedeemerValError>;
```

Added in v2.0.0

## get

Method get of MapRedeemerKeyToRedeemerVal

**Signature**

```ts
export declare const get: (
  instance: CML.MapRedeemerKeyToRedeemerVal,
  key: CML.RedeemerKey,
) => Effect.Effect<
  CML.RedeemerVal | undefined,
  MapRedeemerKeyToRedeemerValError
>;
```

Added in v2.0.0

## insert

Method insert of MapRedeemerKeyToRedeemerVal

**Signature**

```ts
export declare const insert: (
  instance: CML.MapRedeemerKeyToRedeemerVal,
  key: CML.RedeemerKey,
  value: CML.RedeemerVal,
) => Effect.Effect<
  CML.RedeemerVal | undefined,
  MapRedeemerKeyToRedeemerValError
>;
```

Added in v2.0.0

## keys

Method keys of MapRedeemerKeyToRedeemerVal

**Signature**

```ts
export declare const keys: (
  instance: CML.MapRedeemerKeyToRedeemerVal,
) => Effect.Effect<CML.RedeemerKeyList, MapRedeemerKeyToRedeemerValError>;
```

Added in v2.0.0

## len

Method len of MapRedeemerKeyToRedeemerVal

**Signature**

```ts
export declare const len: (
  instance: CML.MapRedeemerKeyToRedeemerVal,
) => Effect.Effect<number, MapRedeemerKeyToRedeemerValError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.MapRedeemerKeyToRedeemerVal,
) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.MapRedeemerKeyToRedeemerVal,
  key: CML.RedeemerKey,
) => CML.RedeemerVal | undefined;
```

Added in v2.0.0

## insertUnsafe

Unsafely calls instance.insert without Effect wrapper

**Signature**

```ts
export declare const insertUnsafe: (
  instance: CML.MapRedeemerKeyToRedeemerVal,
  key: CML.RedeemerKey,
  value: CML.RedeemerVal,
) => CML.RedeemerVal | undefined;
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (
  instance: CML.MapRedeemerKeyToRedeemerVal,
) => CML.RedeemerKeyList;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (
  instance: CML.MapRedeemerKeyToRedeemerVal,
) => number;
```

Added in v2.0.0

# Types

## MapRedeemerKeyToRedeemerVal (type alias)

Type alias for the CML MapRedeemerKeyToRedeemerVal class

**Signature**

```ts
export type MapRedeemerKeyToRedeemerVal = CML.MapRedeemerKeyToRedeemerVal;
```

Added in v2.0.0

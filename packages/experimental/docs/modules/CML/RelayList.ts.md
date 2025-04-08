---
title: CML/RelayList.ts
nav_order: 187
parent: Modules
---

## RelayList overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [RelayListError (class)](#relaylisterror-class)
- [Methods](#methods)
  - [add](#add)
  - [free](#free)
  - [get](#get)
  - [len](#len)
- [MethodsUnsafe](#methodsunsafe)
  - [addUnsafe](#addunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getUnsafe](#getunsafe)
  - [lenUnsafe](#lenunsafe)
- [Types](#types)
  - [RelayList (type alias)](#relaylist-type-alias)

---

# Constructors

## \_new

Static method \_new of RelayList

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.RelayList, RelayListError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls RelayList.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.RelayList;
```

Added in v2.0.0

# Errors

## RelayListError (class)

Error class for RelayList operations

This error is thrown when operations on RelayList instances fail.

**Signature**

```ts
export declare class RelayListError
```

Added in v2.0.0

# Methods

## add

Method add of RelayList

**Signature**

```ts
export declare const add: (
  instance: CML.RelayList,
  elem: CML.Relay,
) => Effect.Effect<void, RelayListError>;
```

Added in v2.0.0

## free

Method free of RelayList

**Signature**

```ts
export declare const free: (
  instance: CML.RelayList,
) => Effect.Effect<void, RelayListError>;
```

Added in v2.0.0

## get

Method get of RelayList

**Signature**

```ts
export declare const get: (
  instance: CML.RelayList,
  index: number,
) => Effect.Effect<CML.Relay, RelayListError>;
```

Added in v2.0.0

## len

Method len of RelayList

**Signature**

```ts
export declare const len: (
  instance: CML.RelayList,
) => Effect.Effect<number, RelayListError>;
```

Added in v2.0.0

# MethodsUnsafe

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.RelayList,
  elem: CML.Relay,
) => void;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.RelayList) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.RelayList,
  index: number,
) => CML.Relay;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.RelayList) => number;
```

Added in v2.0.0

# Types

## RelayList (type alias)

Type alias for the CML RelayList class

**Signature**

```ts
export type RelayList = CML.RelayList;
```

Added in v2.0.0

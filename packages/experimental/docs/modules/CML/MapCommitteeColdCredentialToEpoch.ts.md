---
title: CML/MapCommitteeColdCredentialToEpoch.ts
nav_order: 121
parent: Modules
---

## MapCommitteeColdCredentialToEpoch overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MapCommitteeColdCredentialToEpochError (class)](#mapcommitteecoldcredentialtoepocherror-class)
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
  - [MapCommitteeColdCredentialToEpoch (type alias)](#mapcommitteecoldcredentialtoepoch-type-alias)

---

# Constructors

## \_new

Static method \_new of MapCommitteeColdCredentialToEpoch

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.MapCommitteeColdCredentialToEpoch,
  MapCommitteeColdCredentialToEpochError
>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls MapCommitteeColdCredentialToEpoch.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.MapCommitteeColdCredentialToEpoch;
```

Added in v2.0.0

# Errors

## MapCommitteeColdCredentialToEpochError (class)

Error class for MapCommitteeColdCredentialToEpoch operations

This error is thrown when operations on MapCommitteeColdCredentialToEpoch instances fail.

**Signature**

```ts
export declare class MapCommitteeColdCredentialToEpochError
```

Added in v2.0.0

# Methods

## free

Method free of MapCommitteeColdCredentialToEpoch

**Signature**

```ts
export declare const free: (
  instance: CML.MapCommitteeColdCredentialToEpoch,
) => Effect.Effect<void, MapCommitteeColdCredentialToEpochError>;
```

Added in v2.0.0

## get

Method get of MapCommitteeColdCredentialToEpoch

**Signature**

```ts
export declare const get: (
  instance: CML.MapCommitteeColdCredentialToEpoch,
  key: CML.Credential,
) => Effect.Effect<bigint | undefined, MapCommitteeColdCredentialToEpochError>;
```

Added in v2.0.0

## insert

Method insert of MapCommitteeColdCredentialToEpoch

**Signature**

```ts
export declare const insert: (
  instance: CML.MapCommitteeColdCredentialToEpoch,
  key: CML.Credential,
  value: bigint,
) => Effect.Effect<bigint | undefined, MapCommitteeColdCredentialToEpochError>;
```

Added in v2.0.0

## keys

Method keys of MapCommitteeColdCredentialToEpoch

**Signature**

```ts
export declare const keys: (
  instance: CML.MapCommitteeColdCredentialToEpoch,
) => Effect.Effect<
  CML.CommitteeColdCredentialList,
  MapCommitteeColdCredentialToEpochError
>;
```

Added in v2.0.0

## len

Method len of MapCommitteeColdCredentialToEpoch

**Signature**

```ts
export declare const len: (
  instance: CML.MapCommitteeColdCredentialToEpoch,
) => Effect.Effect<number, MapCommitteeColdCredentialToEpochError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.MapCommitteeColdCredentialToEpoch,
) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.MapCommitteeColdCredentialToEpoch,
  key: CML.Credential,
) => bigint | undefined;
```

Added in v2.0.0

## insertUnsafe

Unsafely calls instance.insert without Effect wrapper

**Signature**

```ts
export declare const insertUnsafe: (
  instance: CML.MapCommitteeColdCredentialToEpoch,
  key: CML.Credential,
  value: bigint,
) => bigint | undefined;
```

Added in v2.0.0

## keysUnsafe

Unsafely calls instance.keys without Effect wrapper

**Signature**

```ts
export declare const keysUnsafe: (
  instance: CML.MapCommitteeColdCredentialToEpoch,
) => CML.CommitteeColdCredentialList;
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (
  instance: CML.MapCommitteeColdCredentialToEpoch,
) => number;
```

Added in v2.0.0

# Types

## MapCommitteeColdCredentialToEpoch (type alias)

Type alias for the CML MapCommitteeColdCredentialToEpoch class

**Signature**

```ts
export type MapCommitteeColdCredentialToEpoch =
  CML.MapCommitteeColdCredentialToEpoch;
```

Added in v2.0.0

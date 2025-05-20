---
title: CML/Metadata.ts
nav_order: 135
parent: Modules
---

## Metadata overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
- [Errors](#errors)
  - [MetadataError (class)](#metadataerror-class)
- [Methods](#methods)
  - [free](#free)
  - [get](#get)
  - [getAll](#getall)
  - [labels](#labels)
  - [len](#len)
  - [set](#set)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getAllUnsafe](#getallunsafe)
  - [getUnsafe](#getunsafe)
  - [labelsUnsafe](#labelsunsafe)
  - [lenUnsafe](#lenunsafe)
  - [setUnsafe](#setunsafe)
- [Types](#types)
  - [Metadata (type alias)](#metadata-type-alias)

---

# Constructors

## \_new

Static method \_new of Metadata

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.Metadata, MetadataError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls Metadata.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.Metadata
```

Added in v2.0.0

# Errors

## MetadataError (class)

Error class for Metadata operations

This error is thrown when operations on Metadata instances fail.

**Signature**

```ts
export declare class MetadataError
```

Added in v2.0.0

# Methods

## free

Method free of Metadata

**Signature**

```ts
export declare const free: (instance: CML.Metadata) => Effect.Effect<void, MetadataError>
```

Added in v2.0.0

## get

Method get of Metadata

**Signature**

```ts
export declare const get: (
  instance: CML.Metadata,
  label: bigint
) => Effect.Effect<CML.TransactionMetadatum | undefined, MetadataError>
```

Added in v2.0.0

## getAll

Method getAll of Metadata

**Signature**

```ts
export declare const getAll: (
  instance: CML.Metadata,
  label: bigint
) => Effect.Effect<CML.TransactionMetadatumList | undefined, MetadataError>
```

Added in v2.0.0

## labels

Method labels of Metadata

**Signature**

```ts
export declare const labels: (instance: CML.Metadata) => Effect.Effect<CML.TransactionMetadatumLabels, MetadataError>
```

Added in v2.0.0

## len

Method len of Metadata

**Signature**

```ts
export declare const len: (instance: CML.Metadata) => Effect.Effect<number, MetadataError>
```

Added in v2.0.0

## set

Method set of Metadata

**Signature**

```ts
export declare const set: (
  instance: CML.Metadata,
  key: bigint,
  value: CML.TransactionMetadatum
) => Effect.Effect<void, MetadataError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Metadata) => void
```

Added in v2.0.0

## getAllUnsafe

Unsafely calls instance.getAll without Effect wrapper

**Signature**

```ts
export declare const getAllUnsafe: (instance: CML.Metadata, label: bigint) => CML.TransactionMetadatumList | undefined
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (instance: CML.Metadata, label: bigint) => CML.TransactionMetadatum | undefined
```

Added in v2.0.0

## labelsUnsafe

Unsafely calls instance.labels without Effect wrapper

**Signature**

```ts
export declare const labelsUnsafe: (instance: CML.Metadata) => CML.TransactionMetadatumLabels
```

Added in v2.0.0

## lenUnsafe

Unsafely calls instance.len without Effect wrapper

**Signature**

```ts
export declare const lenUnsafe: (instance: CML.Metadata) => number
```

Added in v2.0.0

## setUnsafe

Unsafely calls instance.set without Effect wrapper

**Signature**

```ts
export declare const setUnsafe: (instance: CML.Metadata, key: bigint, value: CML.TransactionMetadatum) => void
```

Added in v2.0.0

# Types

## Metadata (type alias)

Type alias for the CML Metadata class

**Signature**

```ts
export type Metadata = CML.Metadata
```

Added in v2.0.0

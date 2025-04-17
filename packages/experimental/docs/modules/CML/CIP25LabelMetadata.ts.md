---
title: CML/CIP25LabelMetadata.ts
nav_order: 36
parent: Modules
---

## CIP25LabelMetadata overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
- [Errors](#errors)
  - [CIP25LabelMetadataError (class)](#cip25labelmetadataerror-class)
- [Methods](#methods)
  - [free](#free)
  - [get](#get)
  - [set](#set)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [version](#version)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [getUnsafe](#getunsafe)
  - [setUnsafe](#setunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [versionUnsafe](#versionunsafe)
- [Types](#types)
  - [CIP25LabelMetadata (type alias)](#cip25labelmetadata-type-alias)

---

# Constructors

## \_new

Static method \_new of CIP25LabelMetadata

**Signature**

```ts
export declare const _new: (
  version: CML.CIP25Version,
) => Effect.Effect<CML.CIP25LabelMetadata, CIP25LabelMetadataError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of CIP25LabelMetadata

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.CIP25LabelMetadata, CIP25LabelMetadataError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of CIP25LabelMetadata

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.CIP25LabelMetadata, CIP25LabelMetadataError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of CIP25LabelMetadata

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.CIP25LabelMetadata, CIP25LabelMetadataError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls CIP25LabelMetadata.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  version: CML.CIP25Version,
) => CML.CIP25LabelMetadata;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls CIP25LabelMetadata.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.CIP25LabelMetadata;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls CIP25LabelMetadata.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.CIP25LabelMetadata;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls CIP25LabelMetadata.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.CIP25LabelMetadata;
```

Added in v2.0.0

# Errors

## CIP25LabelMetadataError (class)

Error class for CIP25LabelMetadata operations

This error is thrown when operations on CIP25LabelMetadata instances fail.

**Signature**

```ts
export declare class CIP25LabelMetadataError
```

Added in v2.0.0

# Methods

## free

Method free of CIP25LabelMetadata

**Signature**

```ts
export declare const free: (
  instance: CML.CIP25LabelMetadata,
) => Effect.Effect<void, CIP25LabelMetadataError>;
```

Added in v2.0.0

## get

Method get of CIP25LabelMetadata

**Signature**

```ts
export declare const get: (
  instance: CML.CIP25LabelMetadata,
  policyId: CML.ScriptHash,
  assetName: CML.AssetName,
) => Effect.Effect<
  CML.CIP25MetadataDetails | undefined,
  CIP25LabelMetadataError
>;
```

Added in v2.0.0

## set

Method set of CIP25LabelMetadata

**Signature**

```ts
export declare const set: (
  instance: CML.CIP25LabelMetadata,
  policyId: CML.ScriptHash,
  assetName: CML.AssetName,
  details: CML.CIP25MetadataDetails,
) => Effect.Effect<
  CML.CIP25MetadataDetails | undefined,
  CIP25LabelMetadataError
>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of CIP25LabelMetadata

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.CIP25LabelMetadata,
) => Effect.Effect<Uint8Array, CIP25LabelMetadataError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of CIP25LabelMetadata

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.CIP25LabelMetadata,
) => Effect.Effect<string, CIP25LabelMetadataError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of CIP25LabelMetadata

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.CIP25LabelMetadata,
) => Effect.Effect<any, CIP25LabelMetadataError>;
```

Added in v2.0.0

## toJson

Method toJson of CIP25LabelMetadata

**Signature**

```ts
export declare const toJson: (
  instance: CML.CIP25LabelMetadata,
) => Effect.Effect<string, CIP25LabelMetadataError>;
```

Added in v2.0.0

## version

Method version of CIP25LabelMetadata

**Signature**

```ts
export declare const version: (
  instance: CML.CIP25LabelMetadata,
) => Effect.Effect<CML.CIP25Version, CIP25LabelMetadataError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.CIP25LabelMetadata) => void;
```

Added in v2.0.0

## getUnsafe

Unsafely calls instance.get without Effect wrapper

**Signature**

```ts
export declare const getUnsafe: (
  instance: CML.CIP25LabelMetadata,
  policyId: CML.ScriptHash,
  assetName: CML.AssetName,
) => CML.CIP25MetadataDetails | undefined;
```

Added in v2.0.0

## setUnsafe

Unsafely calls instance.set without Effect wrapper

**Signature**

```ts
export declare const setUnsafe: (
  instance: CML.CIP25LabelMetadata,
  policyId: CML.ScriptHash,
  assetName: CML.AssetName,
  details: CML.CIP25MetadataDetails,
) => CML.CIP25MetadataDetails | undefined;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.CIP25LabelMetadata,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.CIP25LabelMetadata,
) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.CIP25LabelMetadata) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.CIP25LabelMetadata) => string;
```

Added in v2.0.0

## versionUnsafe

Unsafely calls instance.version without Effect wrapper

**Signature**

```ts
export declare const versionUnsafe: (
  instance: CML.CIP25LabelMetadata,
) => CML.CIP25Version;
```

Added in v2.0.0

# Types

## CIP25LabelMetadata (type alias)

Type alias for the CML CIP25LabelMetadata class

**Signature**

```ts
export type CIP25LabelMetadata = CML.CIP25LabelMetadata;
```

Added in v2.0.0

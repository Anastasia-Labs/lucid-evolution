---
title: CML/PoolMetadata.ts
nav_order: 168
parent: Modules
---

## PoolMetadata overview

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
  - [PoolMetadataError (class)](#poolmetadataerror-class)
- [Methods](#methods)
  - [free](#free)
  - [poolMetadataHash](#poolmetadatahash)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [url](#url)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [poolMetadataHashUnsafe](#poolmetadatahashunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [urlUnsafe](#urlunsafe)
- [Types](#types)
  - [PoolMetadata (type alias)](#poolmetadata-type-alias)

---

# Constructors

## \_new

Static method \_new of PoolMetadata

**Signature**

```ts
export declare const _new: (
  url: CML.Url,
  poolMetadataHash: CML.PoolMetadataHash,
) => Effect.Effect<CML.PoolMetadata, PoolMetadataError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of PoolMetadata

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.PoolMetadata, PoolMetadataError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of PoolMetadata

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.PoolMetadata, PoolMetadataError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of PoolMetadata

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.PoolMetadata, PoolMetadataError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls PoolMetadata.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  url: CML.Url,
  poolMetadataHash: CML.PoolMetadataHash,
) => CML.PoolMetadata;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls PoolMetadata.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.PoolMetadata;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls PoolMetadata.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.PoolMetadata;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls PoolMetadata.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.PoolMetadata;
```

Added in v2.0.0

# Errors

## PoolMetadataError (class)

Error class for PoolMetadata operations

This error is thrown when operations on PoolMetadata instances fail.

**Signature**

```ts
export declare class PoolMetadataError
```

Added in v2.0.0

# Methods

## free

Method free of PoolMetadata

**Signature**

```ts
export declare const free: (
  instance: CML.PoolMetadata,
) => Effect.Effect<void, PoolMetadataError>;
```

Added in v2.0.0

## poolMetadataHash

Method poolMetadataHash of PoolMetadata

**Signature**

```ts
export declare const poolMetadataHash: (
  instance: CML.PoolMetadata,
) => Effect.Effect<CML.PoolMetadataHash, PoolMetadataError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of PoolMetadata

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.PoolMetadata,
) => Effect.Effect<Uint8Array, PoolMetadataError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of PoolMetadata

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.PoolMetadata,
) => Effect.Effect<string, PoolMetadataError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of PoolMetadata

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.PoolMetadata,
) => Effect.Effect<Uint8Array, PoolMetadataError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of PoolMetadata

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.PoolMetadata,
) => Effect.Effect<string, PoolMetadataError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of PoolMetadata

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.PoolMetadata,
) => Effect.Effect<any, PoolMetadataError>;
```

Added in v2.0.0

## toJson

Method toJson of PoolMetadata

**Signature**

```ts
export declare const toJson: (
  instance: CML.PoolMetadata,
) => Effect.Effect<string, PoolMetadataError>;
```

Added in v2.0.0

## url

Method url of PoolMetadata

**Signature**

```ts
export declare const url: (
  instance: CML.PoolMetadata,
) => Effect.Effect<CML.Url, PoolMetadataError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PoolMetadata) => void;
```

Added in v2.0.0

## poolMetadataHashUnsafe

Unsafely calls instance.poolMetadataHash without Effect wrapper

**Signature**

```ts
export declare const poolMetadataHashUnsafe: (
  instance: CML.PoolMetadata,
) => CML.PoolMetadataHash;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.PoolMetadata,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.PoolMetadata,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.PoolMetadata,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.PoolMetadata) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.PoolMetadata) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.PoolMetadata) => string;
```

Added in v2.0.0

## urlUnsafe

Unsafely calls instance.url without Effect wrapper

**Signature**

```ts
export declare const urlUnsafe: (instance: CML.PoolMetadata) => CML.Url;
```

Added in v2.0.0

# Types

## PoolMetadata (type alias)

Type alias for the CML PoolMetadata class

**Signature**

```ts
export type PoolMetadata = CML.PoolMetadata;
```

Added in v2.0.0

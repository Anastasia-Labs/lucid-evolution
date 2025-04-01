---
title: CML/CIP25Metadata.ts
nav_order: 31
parent: Modules
---

## CIP25Metadata overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromCborBytes](#fromcborbytes)
  - [fromJson](#fromjson)
  - [fromMetadata](#frommetadata)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [fromMetadataUnsafe](#frommetadataunsafe)
- [Errors](#errors)
  - [CIP25MetadataError (class)](#cip25metadataerror-class)
- [Methods](#methods)
  - [addToMetadata](#addtometadata)
  - [free](#free)
  - [key_721](#key_721)
  - [toCborBytes](#tocborbytes)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [toMetadata](#tometadata)
- [MethodsUnsafe](#methodsunsafe)
  - [addToMetadataUnsafe](#addtometadataunsafe)
  - [freeUnsafe](#freeunsafe)
  - [key_721Unsafe](#key_721unsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [toMetadataUnsafe](#tometadataunsafe)
- [Types](#types)
  - [CIP25Metadata (type alias)](#cip25metadata-type-alias)

---

# Constructors

## \_new

Static method \_new of CIP25Metadata

**Signature**

```ts
export declare const _new: (key_721: CML.CIP25LabelMetadata) => Effect.Effect<CML.CIP25Metadata, CIP25MetadataError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of CIP25Metadata

**Signature**

```ts
export declare const fromCborBytes: (data: Uint8Array) => Effect.Effect<CML.CIP25Metadata, CIP25MetadataError>
```

Added in v2.0.0

## fromJson

Static method fromJson of CIP25Metadata

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.CIP25Metadata, CIP25MetadataError>
```

Added in v2.0.0

## fromMetadata

Static method fromMetadata of CIP25Metadata

**Signature**

```ts
export declare const fromMetadata: (metadata: CML.Metadata) => Effect.Effect<CML.CIP25Metadata, CIP25MetadataError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls CIP25Metadata.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (key_721: CML.CIP25LabelMetadata) => CML.CIP25Metadata
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls CIP25Metadata.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (data: Uint8Array) => CML.CIP25Metadata
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls CIP25Metadata.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.CIP25Metadata
```

Added in v2.0.0

## fromMetadataUnsafe

Unsafely calls CIP25Metadata.fromMetadata without Effect wrapper

**Signature**

```ts
export declare const fromMetadataUnsafe: (metadata: CML.Metadata) => CML.CIP25Metadata
```

Added in v2.0.0

# Errors

## CIP25MetadataError (class)

Error class for CIP25Metadata operations

This error is thrown when operations on CIP25Metadata instances fail.

**Signature**

```ts
export declare class CIP25MetadataError
```

Added in v2.0.0

# Methods

## addToMetadata

Method addToMetadata of CIP25Metadata

**Signature**

```ts
export declare const addToMetadata: (
  instance: CML.CIP25Metadata,
  metadata: CML.Metadata
) => Effect.Effect<void, CIP25MetadataError>
```

Added in v2.0.0

## free

Method free of CIP25Metadata

**Signature**

```ts
export declare const free: (instance: CML.CIP25Metadata) => Effect.Effect<void, CIP25MetadataError>
```

Added in v2.0.0

## key_721

Method key_721 of CIP25Metadata

**Signature**

```ts
export declare const key_721: (instance: CML.CIP25Metadata) => Effect.Effect<CML.CIP25LabelMetadata, CIP25MetadataError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of CIP25Metadata

**Signature**

```ts
export declare const toCborBytes: (instance: CML.CIP25Metadata) => Effect.Effect<Uint8Array, CIP25MetadataError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of CIP25Metadata

**Signature**

```ts
export declare const toJsValue: (instance: CML.CIP25Metadata) => Effect.Effect<any, CIP25MetadataError>
```

Added in v2.0.0

## toJson

Method toJson of CIP25Metadata

**Signature**

```ts
export declare const toJson: (instance: CML.CIP25Metadata) => Effect.Effect<string, CIP25MetadataError>
```

Added in v2.0.0

## toMetadata

Method toMetadata of CIP25Metadata

**Signature**

```ts
export declare const toMetadata: (instance: CML.CIP25Metadata) => Effect.Effect<CML.Metadata, CIP25MetadataError>
```

Added in v2.0.0

# MethodsUnsafe

## addToMetadataUnsafe

Unsafely calls instance.addToMetadata without Effect wrapper

**Signature**

```ts
export declare const addToMetadataUnsafe: (instance: CML.CIP25Metadata, metadata: CML.Metadata) => void
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.CIP25Metadata) => void
```

Added in v2.0.0

## key_721Unsafe

Unsafely calls instance.key_721 without Effect wrapper

**Signature**

```ts
export declare const key_721Unsafe: (instance: CML.CIP25Metadata) => CML.CIP25LabelMetadata
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.CIP25Metadata) => Uint8Array
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.CIP25Metadata) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.CIP25Metadata) => string
```

Added in v2.0.0

## toMetadataUnsafe

Unsafely calls instance.toMetadata without Effect wrapper

**Signature**

```ts
export declare const toMetadataUnsafe: (instance: CML.CIP25Metadata) => CML.Metadata
```

Added in v2.0.0

# Types

## CIP25Metadata (type alias)

Type alias for the CML CIP25Metadata class

**Signature**

```ts
export type CIP25Metadata = CML.CIP25Metadata
```

Added in v2.0.0

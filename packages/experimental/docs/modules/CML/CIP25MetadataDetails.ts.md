---
title: CML/CIP25MetadataDetails.ts
nav_order: 38
parent: Modules
---

## CIP25MetadataDetails overview

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
  - [CIP25MetadataDetailsError (class)](#cip25metadatadetailserror-class)
- [Methods](#methods)
  - [description](#description)
  - [files](#files)
  - [free](#free)
  - [image](#image)
  - [mediaType](#mediatype)
  - [name](#name)
  - [setDescription](#setdescription)
  - [setFiles](#setfiles)
  - [setMediaType](#setmediatype)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [descriptionUnsafe](#descriptionunsafe)
  - [filesUnsafe](#filesunsafe)
  - [freeUnsafe](#freeunsafe)
  - [imageUnsafe](#imageunsafe)
  - [mediaTypeUnsafe](#mediatypeunsafe)
  - [nameUnsafe](#nameunsafe)
  - [setDescriptionUnsafe](#setdescriptionunsafe)
  - [setFilesUnsafe](#setfilesunsafe)
  - [setMediaTypeUnsafe](#setmediatypeunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [CIP25MetadataDetails (type alias)](#cip25metadatadetails-type-alias)

---

# Constructors

## \_new

Static method \_new of CIP25MetadataDetails

**Signature**

```ts
export declare const _new: (
  name: CML.CIP25String64,
  image: CML.CIP25ChunkableString
) => Effect.Effect<CML.CIP25MetadataDetails, CIP25MetadataDetailsError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of CIP25MetadataDetails

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.CIP25MetadataDetails, CIP25MetadataDetailsError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of CIP25MetadataDetails

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string
) => Effect.Effect<CML.CIP25MetadataDetails, CIP25MetadataDetailsError>
```

Added in v2.0.0

## fromJson

Static method fromJson of CIP25MetadataDetails

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.CIP25MetadataDetails, CIP25MetadataDetailsError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls CIP25MetadataDetails.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (name: CML.CIP25String64, image: CML.CIP25ChunkableString) => CML.CIP25MetadataDetails
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls CIP25MetadataDetails.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.CIP25MetadataDetails
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls CIP25MetadataDetails.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.CIP25MetadataDetails
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls CIP25MetadataDetails.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.CIP25MetadataDetails
```

Added in v2.0.0

# Errors

## CIP25MetadataDetailsError (class)

Error class for CIP25MetadataDetails operations

This error is thrown when operations on CIP25MetadataDetails instances fail.

**Signature**

```ts
export declare class CIP25MetadataDetailsError
```

Added in v2.0.0

# Methods

## description

Method description of CIP25MetadataDetails

**Signature**

```ts
export declare const description: (
  instance: CML.CIP25MetadataDetails
) => Effect.Effect<CML.CIP25ChunkableString | undefined, CIP25MetadataDetailsError>
```

Added in v2.0.0

## files

Method files of CIP25MetadataDetails

**Signature**

```ts
export declare const files: (
  instance: CML.CIP25MetadataDetails
) => Effect.Effect<CML.FilesDetailsList | undefined, CIP25MetadataDetailsError>
```

Added in v2.0.0

## free

Method free of CIP25MetadataDetails

**Signature**

```ts
export declare const free: (instance: CML.CIP25MetadataDetails) => Effect.Effect<void, CIP25MetadataDetailsError>
```

Added in v2.0.0

## image

Method image of CIP25MetadataDetails

**Signature**

```ts
export declare const image: (
  instance: CML.CIP25MetadataDetails
) => Effect.Effect<CML.CIP25ChunkableString, CIP25MetadataDetailsError>
```

Added in v2.0.0

## mediaType

Method mediaType of CIP25MetadataDetails

**Signature**

```ts
export declare const mediaType: (
  instance: CML.CIP25MetadataDetails
) => Effect.Effect<CML.CIP25String64 | undefined, CIP25MetadataDetailsError>
```

Added in v2.0.0

## name

Method name of CIP25MetadataDetails

**Signature**

```ts
export declare const name: (
  instance: CML.CIP25MetadataDetails
) => Effect.Effect<CML.CIP25String64, CIP25MetadataDetailsError>
```

Added in v2.0.0

## setDescription

Method setDescription of CIP25MetadataDetails

**Signature**

```ts
export declare const setDescription: (
  instance: CML.CIP25MetadataDetails,
  description: CML.CIP25ChunkableString
) => Effect.Effect<void, CIP25MetadataDetailsError>
```

Added in v2.0.0

## setFiles

Method setFiles of CIP25MetadataDetails

**Signature**

```ts
export declare const setFiles: (
  instance: CML.CIP25MetadataDetails,
  files: CML.FilesDetailsList
) => Effect.Effect<void, CIP25MetadataDetailsError>
```

Added in v2.0.0

## setMediaType

Method setMediaType of CIP25MetadataDetails

**Signature**

```ts
export declare const setMediaType: (
  instance: CML.CIP25MetadataDetails,
  mediaType: CML.CIP25String64
) => Effect.Effect<void, CIP25MetadataDetailsError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of CIP25MetadataDetails

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.CIP25MetadataDetails
) => Effect.Effect<Uint8Array, CIP25MetadataDetailsError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of CIP25MetadataDetails

**Signature**

```ts
export declare const toCborHex: (instance: CML.CIP25MetadataDetails) => Effect.Effect<string, CIP25MetadataDetailsError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of CIP25MetadataDetails

**Signature**

```ts
export declare const toJsValue: (instance: CML.CIP25MetadataDetails) => Effect.Effect<any, CIP25MetadataDetailsError>
```

Added in v2.0.0

## toJson

Method toJson of CIP25MetadataDetails

**Signature**

```ts
export declare const toJson: (instance: CML.CIP25MetadataDetails) => Effect.Effect<string, CIP25MetadataDetailsError>
```

Added in v2.0.0

# MethodsUnsafe

## descriptionUnsafe

Unsafely calls instance.description without Effect wrapper

**Signature**

```ts
export declare const descriptionUnsafe: (instance: CML.CIP25MetadataDetails) => CML.CIP25ChunkableString | undefined
```

Added in v2.0.0

## filesUnsafe

Unsafely calls instance.files without Effect wrapper

**Signature**

```ts
export declare const filesUnsafe: (instance: CML.CIP25MetadataDetails) => CML.FilesDetailsList | undefined
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.CIP25MetadataDetails) => void
```

Added in v2.0.0

## imageUnsafe

Unsafely calls instance.image without Effect wrapper

**Signature**

```ts
export declare const imageUnsafe: (instance: CML.CIP25MetadataDetails) => CML.CIP25ChunkableString
```

Added in v2.0.0

## mediaTypeUnsafe

Unsafely calls instance.mediaType without Effect wrapper

**Signature**

```ts
export declare const mediaTypeUnsafe: (instance: CML.CIP25MetadataDetails) => CML.CIP25String64 | undefined
```

Added in v2.0.0

## nameUnsafe

Unsafely calls instance.name without Effect wrapper

**Signature**

```ts
export declare const nameUnsafe: (instance: CML.CIP25MetadataDetails) => CML.CIP25String64
```

Added in v2.0.0

## setDescriptionUnsafe

Unsafely calls instance.setDescription without Effect wrapper

**Signature**

```ts
export declare const setDescriptionUnsafe: (
  instance: CML.CIP25MetadataDetails,
  description: CML.CIP25ChunkableString
) => void
```

Added in v2.0.0

## setFilesUnsafe

Unsafely calls instance.setFiles without Effect wrapper

**Signature**

```ts
export declare const setFilesUnsafe: (instance: CML.CIP25MetadataDetails, files: CML.FilesDetailsList) => void
```

Added in v2.0.0

## setMediaTypeUnsafe

Unsafely calls instance.setMediaType without Effect wrapper

**Signature**

```ts
export declare const setMediaTypeUnsafe: (instance: CML.CIP25MetadataDetails, mediaType: CML.CIP25String64) => void
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.CIP25MetadataDetails) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.CIP25MetadataDetails) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.CIP25MetadataDetails) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.CIP25MetadataDetails) => string
```

Added in v2.0.0

# Types

## CIP25MetadataDetails (type alias)

Type alias for the CML CIP25MetadataDetails class

**Signature**

```ts
export type CIP25MetadataDetails = CML.CIP25MetadataDetails
```

Added in v2.0.0

---
title: CML/CIP25FilesDetails.ts
nav_order: 29
parent: Modules
---

## CIP25FilesDetails overview

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
  - [CIP25FilesDetailsError (class)](#cip25filesdetailserror-class)
- [Methods](#methods)
  - [free](#free)
  - [mediaType](#mediatype)
  - [name](#name)
  - [src](#src)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [mediaTypeUnsafe](#mediatypeunsafe)
  - [nameUnsafe](#nameunsafe)
  - [srcUnsafe](#srcunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [CIP25FilesDetails (type alias)](#cip25filesdetails-type-alias)

---

# Constructors

## \_new

Static method \_new of CIP25FilesDetails

**Signature**

```ts
export declare const _new: (
  name: CML.CIP25String64,
  mediaType: CML.CIP25String64,
  src: CML.CIP25ChunkableString,
) => Effect.Effect<CML.CIP25FilesDetails, CIP25FilesDetailsError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of CIP25FilesDetails

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.CIP25FilesDetails, CIP25FilesDetailsError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of CIP25FilesDetails

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.CIP25FilesDetails, CIP25FilesDetailsError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of CIP25FilesDetails

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.CIP25FilesDetails, CIP25FilesDetailsError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls CIP25FilesDetails.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  name: CML.CIP25String64,
  mediaType: CML.CIP25String64,
  src: CML.CIP25ChunkableString,
) => CML.CIP25FilesDetails;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls CIP25FilesDetails.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.CIP25FilesDetails;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls CIP25FilesDetails.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.CIP25FilesDetails;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls CIP25FilesDetails.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.CIP25FilesDetails;
```

Added in v2.0.0

# Errors

## CIP25FilesDetailsError (class)

Error class for CIP25FilesDetails operations

This error is thrown when operations on CIP25FilesDetails instances fail.

**Signature**

```ts
export declare class CIP25FilesDetailsError
```

Added in v2.0.0

# Methods

## free

Method free of CIP25FilesDetails

**Signature**

```ts
export declare const free: (
  instance: CML.CIP25FilesDetails,
) => Effect.Effect<void, CIP25FilesDetailsError>;
```

Added in v2.0.0

## mediaType

Method mediaType of CIP25FilesDetails

**Signature**

```ts
export declare const mediaType: (
  instance: CML.CIP25FilesDetails,
) => Effect.Effect<CML.CIP25String64, CIP25FilesDetailsError>;
```

Added in v2.0.0

## name

Method name of CIP25FilesDetails

**Signature**

```ts
export declare const name: (
  instance: CML.CIP25FilesDetails,
) => Effect.Effect<CML.CIP25String64, CIP25FilesDetailsError>;
```

Added in v2.0.0

## src

Method src of CIP25FilesDetails

**Signature**

```ts
export declare const src: (
  instance: CML.CIP25FilesDetails,
) => Effect.Effect<CML.CIP25ChunkableString, CIP25FilesDetailsError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of CIP25FilesDetails

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.CIP25FilesDetails,
) => Effect.Effect<Uint8Array, CIP25FilesDetailsError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of CIP25FilesDetails

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.CIP25FilesDetails,
) => Effect.Effect<string, CIP25FilesDetailsError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of CIP25FilesDetails

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.CIP25FilesDetails,
) => Effect.Effect<any, CIP25FilesDetailsError>;
```

Added in v2.0.0

## toJson

Method toJson of CIP25FilesDetails

**Signature**

```ts
export declare const toJson: (
  instance: CML.CIP25FilesDetails,
) => Effect.Effect<string, CIP25FilesDetailsError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.CIP25FilesDetails) => void;
```

Added in v2.0.0

## mediaTypeUnsafe

Unsafely calls instance.mediaType without Effect wrapper

**Signature**

```ts
export declare const mediaTypeUnsafe: (
  instance: CML.CIP25FilesDetails,
) => CML.CIP25String64;
```

Added in v2.0.0

## nameUnsafe

Unsafely calls instance.name without Effect wrapper

**Signature**

```ts
export declare const nameUnsafe: (
  instance: CML.CIP25FilesDetails,
) => CML.CIP25String64;
```

Added in v2.0.0

## srcUnsafe

Unsafely calls instance.src without Effect wrapper

**Signature**

```ts
export declare const srcUnsafe: (
  instance: CML.CIP25FilesDetails,
) => CML.CIP25ChunkableString;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.CIP25FilesDetails,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.CIP25FilesDetails,
) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.CIP25FilesDetails) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.CIP25FilesDetails) => string;
```

Added in v2.0.0

# Types

## CIP25FilesDetails (type alias)

Type alias for the CML CIP25FilesDetails class

**Signature**

```ts
export type CIP25FilesDetails = CML.CIP25FilesDetails;
```

Added in v2.0.0

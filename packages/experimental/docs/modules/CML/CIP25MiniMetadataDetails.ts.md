---
title: CML/CIP25MiniMetadataDetails.ts
nav_order: 34
parent: Modules
---

## CIP25MiniMetadataDetails overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromJson](#fromjson)
  - [looseParse](#looseparse)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [looseParseUnsafe](#looseparseunsafe)
- [Errors](#errors)
  - [CIP25MiniMetadataDetailsError (class)](#cip25minimetadatadetailserror-class)
- [Methods](#methods)
  - [free](#free)
  - [image](#image)
  - [name](#name)
  - [setImage](#setimage)
  - [setName](#setname)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [imageUnsafe](#imageunsafe)
  - [nameUnsafe](#nameunsafe)
  - [setImageUnsafe](#setimageunsafe)
  - [setNameUnsafe](#setnameunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [CIP25MiniMetadataDetails (type alias)](#cip25minimetadatadetails-type-alias)

---

# Constructors

## \_new

Static method \_new of CIP25MiniMetadataDetails

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.CIP25MiniMetadataDetails,
  CIP25MiniMetadataDetailsError
>;
```

Added in v2.0.0

## fromJson

Static method fromJson of CIP25MiniMetadataDetails

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.CIP25MiniMetadataDetails, CIP25MiniMetadataDetailsError>;
```

Added in v2.0.0

## looseParse

Static method looseParse of CIP25MiniMetadataDetails

**Signature**

```ts
export declare const looseParse: (
  metadatum: CML.TransactionMetadatum,
) => Effect.Effect<CML.CIP25MiniMetadataDetails, CIP25MiniMetadataDetailsError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls CIP25MiniMetadataDetails.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.CIP25MiniMetadataDetails;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls CIP25MiniMetadataDetails.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (
  json: string,
) => CML.CIP25MiniMetadataDetails;
```

Added in v2.0.0

## looseParseUnsafe

Unsafely calls CIP25MiniMetadataDetails.looseParse without Effect wrapper

**Signature**

```ts
export declare const looseParseUnsafe: (
  metadatum: CML.TransactionMetadatum,
) => CML.CIP25MiniMetadataDetails;
```

Added in v2.0.0

# Errors

## CIP25MiniMetadataDetailsError (class)

Error class for CIP25MiniMetadataDetails operations

This error is thrown when operations on CIP25MiniMetadataDetails instances fail.

**Signature**

```ts
export declare class CIP25MiniMetadataDetailsError
```

Added in v2.0.0

# Methods

## free

Method free of CIP25MiniMetadataDetails

**Signature**

```ts
export declare const free: (
  instance: CML.CIP25MiniMetadataDetails,
) => Effect.Effect<void, CIP25MiniMetadataDetailsError>;
```

Added in v2.0.0

## image

Method image of CIP25MiniMetadataDetails

**Signature**

```ts
export declare const image: (
  instance: CML.CIP25MiniMetadataDetails,
) => Effect.Effect<
  CML.CIP25ChunkableString | undefined,
  CIP25MiniMetadataDetailsError
>;
```

Added in v2.0.0

## name

Method name of CIP25MiniMetadataDetails

**Signature**

```ts
export declare const name: (
  instance: CML.CIP25MiniMetadataDetails,
) => Effect.Effect<
  CML.CIP25String64 | undefined,
  CIP25MiniMetadataDetailsError
>;
```

Added in v2.0.0

## setImage

Method setImage of CIP25MiniMetadataDetails

**Signature**

```ts
export declare const setImage: (
  instance: CML.CIP25MiniMetadataDetails,
  image: CML.CIP25ChunkableString,
) => Effect.Effect<void, CIP25MiniMetadataDetailsError>;
```

Added in v2.0.0

## setName

Method setName of CIP25MiniMetadataDetails

**Signature**

```ts
export declare const setName: (
  instance: CML.CIP25MiniMetadataDetails,
  name: CML.CIP25String64,
) => Effect.Effect<void, CIP25MiniMetadataDetailsError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of CIP25MiniMetadataDetails

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.CIP25MiniMetadataDetails,
) => Effect.Effect<any, CIP25MiniMetadataDetailsError>;
```

Added in v2.0.0

## toJson

Method toJson of CIP25MiniMetadataDetails

**Signature**

```ts
export declare const toJson: (
  instance: CML.CIP25MiniMetadataDetails,
) => Effect.Effect<string, CIP25MiniMetadataDetailsError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (
  instance: CML.CIP25MiniMetadataDetails,
) => void;
```

Added in v2.0.0

## imageUnsafe

Unsafely calls instance.image without Effect wrapper

**Signature**

```ts
export declare const imageUnsafe: (
  instance: CML.CIP25MiniMetadataDetails,
) => CML.CIP25ChunkableString | undefined;
```

Added in v2.0.0

## nameUnsafe

Unsafely calls instance.name without Effect wrapper

**Signature**

```ts
export declare const nameUnsafe: (
  instance: CML.CIP25MiniMetadataDetails,
) => CML.CIP25String64 | undefined;
```

Added in v2.0.0

## setImageUnsafe

Unsafely calls instance.setImage without Effect wrapper

**Signature**

```ts
export declare const setImageUnsafe: (
  instance: CML.CIP25MiniMetadataDetails,
  image: CML.CIP25ChunkableString,
) => void;
```

Added in v2.0.0

## setNameUnsafe

Unsafely calls instance.setName without Effect wrapper

**Signature**

```ts
export declare const setNameUnsafe: (
  instance: CML.CIP25MiniMetadataDetails,
  name: CML.CIP25String64,
) => void;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (
  instance: CML.CIP25MiniMetadataDetails,
) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (
  instance: CML.CIP25MiniMetadataDetails,
) => string;
```

Added in v2.0.0

# Types

## CIP25MiniMetadataDetails (type alias)

Type alias for the CML CIP25MiniMetadataDetails class

**Signature**

```ts
export type CIP25MiniMetadataDetails = CML.CIP25MiniMetadataDetails;
```

Added in v2.0.0

---
title: CML/ShelleyMAFormatAuxData.ts
nav_order: 201
parent: Modules
---

## ShelleyMAFormatAuxData overview

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
  - [ShelleyMAFormatAuxDataError (class)](#shelleymaformatauxdataerror-class)
- [Methods](#methods)
  - [auxiliaryScripts](#auxiliaryscripts)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [transactionMetadata](#transactionmetadata)
- [MethodsUnsafe](#methodsunsafe)
  - [auxiliaryScriptsUnsafe](#auxiliaryscriptsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [transactionMetadataUnsafe](#transactionmetadataunsafe)
- [Types](#types)
  - [ShelleyMAFormatAuxData (type alias)](#shelleymaformatauxdata-type-alias)

---

# Constructors

## \_new

Static method \_new of ShelleyMAFormatAuxData

**Signature**

```ts
export declare const _new: (
  transactionMetadata: CML.Metadata,
  auxiliaryScripts: CML.NativeScriptList
) => Effect.Effect<CML.ShelleyMAFormatAuxData, ShelleyMAFormatAuxDataError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ShelleyMAFormatAuxData

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.ShelleyMAFormatAuxData, ShelleyMAFormatAuxDataError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ShelleyMAFormatAuxData

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string
) => Effect.Effect<CML.ShelleyMAFormatAuxData, ShelleyMAFormatAuxDataError>
```

Added in v2.0.0

## fromJson

Static method fromJson of ShelleyMAFormatAuxData

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.ShelleyMAFormatAuxData, ShelleyMAFormatAuxDataError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ShelleyMAFormatAuxData.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  transactionMetadata: CML.Metadata,
  auxiliaryScripts: CML.NativeScriptList
) => CML.ShelleyMAFormatAuxData
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ShelleyMAFormatAuxData.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.ShelleyMAFormatAuxData
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ShelleyMAFormatAuxData.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.ShelleyMAFormatAuxData
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ShelleyMAFormatAuxData.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ShelleyMAFormatAuxData
```

Added in v2.0.0

# Errors

## ShelleyMAFormatAuxDataError (class)

Error class for ShelleyMAFormatAuxData operations

This error is thrown when operations on ShelleyMAFormatAuxData instances fail.

**Signature**

```ts
export declare class ShelleyMAFormatAuxDataError
```

Added in v2.0.0

# Methods

## auxiliaryScripts

Method auxiliaryScripts of ShelleyMAFormatAuxData

**Signature**

```ts
export declare const auxiliaryScripts: (
  instance: CML.ShelleyMAFormatAuxData
) => Effect.Effect<CML.NativeScriptList, ShelleyMAFormatAuxDataError>
```

Added in v2.0.0

## free

Method free of ShelleyMAFormatAuxData

**Signature**

```ts
export declare const free: (instance: CML.ShelleyMAFormatAuxData) => Effect.Effect<void, ShelleyMAFormatAuxDataError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ShelleyMAFormatAuxData

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.ShelleyMAFormatAuxData
) => Effect.Effect<Uint8Array, ShelleyMAFormatAuxDataError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ShelleyMAFormatAuxData

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.ShelleyMAFormatAuxData
) => Effect.Effect<string, ShelleyMAFormatAuxDataError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ShelleyMAFormatAuxData

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.ShelleyMAFormatAuxData
) => Effect.Effect<Uint8Array, ShelleyMAFormatAuxDataError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of ShelleyMAFormatAuxData

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.ShelleyMAFormatAuxData
) => Effect.Effect<string, ShelleyMAFormatAuxDataError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of ShelleyMAFormatAuxData

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.ShelleyMAFormatAuxData
) => Effect.Effect<any, ShelleyMAFormatAuxDataError>
```

Added in v2.0.0

## toJson

Method toJson of ShelleyMAFormatAuxData

**Signature**

```ts
export declare const toJson: (
  instance: CML.ShelleyMAFormatAuxData
) => Effect.Effect<string, ShelleyMAFormatAuxDataError>
```

Added in v2.0.0

## transactionMetadata

Method transactionMetadata of ShelleyMAFormatAuxData

**Signature**

```ts
export declare const transactionMetadata: (
  instance: CML.ShelleyMAFormatAuxData
) => Effect.Effect<CML.Metadata, ShelleyMAFormatAuxDataError>
```

Added in v2.0.0

# MethodsUnsafe

## auxiliaryScriptsUnsafe

Unsafely calls instance.auxiliaryScripts without Effect wrapper

**Signature**

```ts
export declare const auxiliaryScriptsUnsafe: (instance: CML.ShelleyMAFormatAuxData) => CML.NativeScriptList
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ShelleyMAFormatAuxData) => void
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.ShelleyMAFormatAuxData) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.ShelleyMAFormatAuxData) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.ShelleyMAFormatAuxData) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.ShelleyMAFormatAuxData) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.ShelleyMAFormatAuxData) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.ShelleyMAFormatAuxData) => string
```

Added in v2.0.0

## transactionMetadataUnsafe

Unsafely calls instance.transactionMetadata without Effect wrapper

**Signature**

```ts
export declare const transactionMetadataUnsafe: (instance: CML.ShelleyMAFormatAuxData) => CML.Metadata
```

Added in v2.0.0

# Types

## ShelleyMAFormatAuxData (type alias)

Type alias for the CML ShelleyMAFormatAuxData class

**Signature**

```ts
export type ShelleyMAFormatAuxData = CML.ShelleyMAFormatAuxData
```

Added in v2.0.0

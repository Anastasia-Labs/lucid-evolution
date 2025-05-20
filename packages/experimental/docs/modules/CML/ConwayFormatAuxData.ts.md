---
title: CML/ConwayFormatAuxData.ts
nav_order: 54
parent: Modules
---

## ConwayFormatAuxData overview

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
  - [ConwayFormatAuxDataError (class)](#conwayformatauxdataerror-class)
- [Methods](#methods)
  - [free](#free)
  - [metadata](#metadata)
  - [nativeScripts](#nativescripts)
  - [plutusV1Scripts](#plutusv1scripts)
  - [plutusV2Scripts](#plutusv2scripts)
  - [plutusV3Scripts](#plutusv3scripts)
  - [setMetadata](#setmetadata)
  - [setNativeScripts](#setnativescripts)
  - [setPlutusV1Scripts](#setplutusv1scripts)
  - [setPlutusV2Scripts](#setplutusv2scripts)
  - [setPlutusV3Scripts](#setplutusv3scripts)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [metadataUnsafe](#metadataunsafe)
  - [nativeScriptsUnsafe](#nativescriptsunsafe)
  - [plutusV1ScriptsUnsafe](#plutusv1scriptsunsafe)
  - [plutusV2ScriptsUnsafe](#plutusv2scriptsunsafe)
  - [plutusV3ScriptsUnsafe](#plutusv3scriptsunsafe)
  - [setMetadataUnsafe](#setmetadataunsafe)
  - [setNativeScriptsUnsafe](#setnativescriptsunsafe)
  - [setPlutusV1ScriptsUnsafe](#setplutusv1scriptsunsafe)
  - [setPlutusV2ScriptsUnsafe](#setplutusv2scriptsunsafe)
  - [setPlutusV3ScriptsUnsafe](#setplutusv3scriptsunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [ConwayFormatAuxData (type alias)](#conwayformatauxdata-type-alias)

---

# Constructors

## \_new

Static method \_new of ConwayFormatAuxData

**Signature**

```ts
export declare const _new: () => Effect.Effect<CML.ConwayFormatAuxData, ConwayFormatAuxDataError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ConwayFormatAuxData

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.ConwayFormatAuxData, ConwayFormatAuxDataError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ConwayFormatAuxData

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string
) => Effect.Effect<CML.ConwayFormatAuxData, ConwayFormatAuxDataError>
```

Added in v2.0.0

## fromJson

Static method fromJson of ConwayFormatAuxData

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.ConwayFormatAuxData, ConwayFormatAuxDataError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ConwayFormatAuxData.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.ConwayFormatAuxData
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ConwayFormatAuxData.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.ConwayFormatAuxData
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ConwayFormatAuxData.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.ConwayFormatAuxData
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ConwayFormatAuxData.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ConwayFormatAuxData
```

Added in v2.0.0

# Errors

## ConwayFormatAuxDataError (class)

Error class for ConwayFormatAuxData operations

This error is thrown when operations on ConwayFormatAuxData instances fail.

**Signature**

```ts
export declare class ConwayFormatAuxDataError
```

Added in v2.0.0

# Methods

## free

Method free of ConwayFormatAuxData

**Signature**

```ts
export declare const free: (instance: CML.ConwayFormatAuxData) => Effect.Effect<void, ConwayFormatAuxDataError>
```

Added in v2.0.0

## metadata

Method metadata of ConwayFormatAuxData

**Signature**

```ts
export declare const metadata: (
  instance: CML.ConwayFormatAuxData
) => Effect.Effect<CML.Metadata | undefined, ConwayFormatAuxDataError>
```

Added in v2.0.0

## nativeScripts

Method nativeScripts of ConwayFormatAuxData

**Signature**

```ts
export declare const nativeScripts: (
  instance: CML.ConwayFormatAuxData
) => Effect.Effect<CML.NativeScriptList | undefined, ConwayFormatAuxDataError>
```

Added in v2.0.0

## plutusV1Scripts

Method plutusV1Scripts of ConwayFormatAuxData

**Signature**

```ts
export declare const plutusV1Scripts: (
  instance: CML.ConwayFormatAuxData
) => Effect.Effect<CML.PlutusV1ScriptList | undefined, ConwayFormatAuxDataError>
```

Added in v2.0.0

## plutusV2Scripts

Method plutusV2Scripts of ConwayFormatAuxData

**Signature**

```ts
export declare const plutusV2Scripts: (
  instance: CML.ConwayFormatAuxData
) => Effect.Effect<CML.PlutusV2ScriptList | undefined, ConwayFormatAuxDataError>
```

Added in v2.0.0

## plutusV3Scripts

Method plutusV3Scripts of ConwayFormatAuxData

**Signature**

```ts
export declare const plutusV3Scripts: (
  instance: CML.ConwayFormatAuxData
) => Effect.Effect<CML.PlutusV3ScriptList | undefined, ConwayFormatAuxDataError>
```

Added in v2.0.0

## setMetadata

Method setMetadata of ConwayFormatAuxData

**Signature**

```ts
export declare const setMetadata: (
  instance: CML.ConwayFormatAuxData,
  metadata: CML.Metadata
) => Effect.Effect<void, ConwayFormatAuxDataError>
```

Added in v2.0.0

## setNativeScripts

Method setNativeScripts of ConwayFormatAuxData

**Signature**

```ts
export declare const setNativeScripts: (
  instance: CML.ConwayFormatAuxData,
  nativeScripts: CML.NativeScriptList
) => Effect.Effect<void, ConwayFormatAuxDataError>
```

Added in v2.0.0

## setPlutusV1Scripts

Method setPlutusV1Scripts of ConwayFormatAuxData

**Signature**

```ts
export declare const setPlutusV1Scripts: (
  instance: CML.ConwayFormatAuxData,
  plutusV1Scripts: CML.PlutusV1ScriptList
) => Effect.Effect<void, ConwayFormatAuxDataError>
```

Added in v2.0.0

## setPlutusV2Scripts

Method setPlutusV2Scripts of ConwayFormatAuxData

**Signature**

```ts
export declare const setPlutusV2Scripts: (
  instance: CML.ConwayFormatAuxData,
  plutusV2Scripts: CML.PlutusV2ScriptList
) => Effect.Effect<void, ConwayFormatAuxDataError>
```

Added in v2.0.0

## setPlutusV3Scripts

Method setPlutusV3Scripts of ConwayFormatAuxData

**Signature**

```ts
export declare const setPlutusV3Scripts: (
  instance: CML.ConwayFormatAuxData,
  plutusV3Scripts: CML.PlutusV3ScriptList
) => Effect.Effect<void, ConwayFormatAuxDataError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ConwayFormatAuxData

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.ConwayFormatAuxData
) => Effect.Effect<Uint8Array, ConwayFormatAuxDataError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ConwayFormatAuxData

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.ConwayFormatAuxData
) => Effect.Effect<string, ConwayFormatAuxDataError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ConwayFormatAuxData

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.ConwayFormatAuxData
) => Effect.Effect<Uint8Array, ConwayFormatAuxDataError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of ConwayFormatAuxData

**Signature**

```ts
export declare const toCborHex: (instance: CML.ConwayFormatAuxData) => Effect.Effect<string, ConwayFormatAuxDataError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of ConwayFormatAuxData

**Signature**

```ts
export declare const toJsValue: (instance: CML.ConwayFormatAuxData) => Effect.Effect<any, ConwayFormatAuxDataError>
```

Added in v2.0.0

## toJson

Method toJson of ConwayFormatAuxData

**Signature**

```ts
export declare const toJson: (instance: CML.ConwayFormatAuxData) => Effect.Effect<string, ConwayFormatAuxDataError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ConwayFormatAuxData) => void
```

Added in v2.0.0

## metadataUnsafe

Unsafely calls instance.metadata without Effect wrapper

**Signature**

```ts
export declare const metadataUnsafe: (instance: CML.ConwayFormatAuxData) => CML.Metadata | undefined
```

Added in v2.0.0

## nativeScriptsUnsafe

Unsafely calls instance.nativeScripts without Effect wrapper

**Signature**

```ts
export declare const nativeScriptsUnsafe: (instance: CML.ConwayFormatAuxData) => CML.NativeScriptList | undefined
```

Added in v2.0.0

## plutusV1ScriptsUnsafe

Unsafely calls instance.plutusV1Scripts without Effect wrapper

**Signature**

```ts
export declare const plutusV1ScriptsUnsafe: (instance: CML.ConwayFormatAuxData) => CML.PlutusV1ScriptList | undefined
```

Added in v2.0.0

## plutusV2ScriptsUnsafe

Unsafely calls instance.plutusV2Scripts without Effect wrapper

**Signature**

```ts
export declare const plutusV2ScriptsUnsafe: (instance: CML.ConwayFormatAuxData) => CML.PlutusV2ScriptList | undefined
```

Added in v2.0.0

## plutusV3ScriptsUnsafe

Unsafely calls instance.plutusV3Scripts without Effect wrapper

**Signature**

```ts
export declare const plutusV3ScriptsUnsafe: (instance: CML.ConwayFormatAuxData) => CML.PlutusV3ScriptList | undefined
```

Added in v2.0.0

## setMetadataUnsafe

Unsafely calls instance.setMetadata without Effect wrapper

**Signature**

```ts
export declare const setMetadataUnsafe: (instance: CML.ConwayFormatAuxData, metadata: CML.Metadata) => void
```

Added in v2.0.0

## setNativeScriptsUnsafe

Unsafely calls instance.setNativeScripts without Effect wrapper

**Signature**

```ts
export declare const setNativeScriptsUnsafe: (
  instance: CML.ConwayFormatAuxData,
  nativeScripts: CML.NativeScriptList
) => void
```

Added in v2.0.0

## setPlutusV1ScriptsUnsafe

Unsafely calls instance.setPlutusV1Scripts without Effect wrapper

**Signature**

```ts
export declare const setPlutusV1ScriptsUnsafe: (
  instance: CML.ConwayFormatAuxData,
  plutusV1Scripts: CML.PlutusV1ScriptList
) => void
```

Added in v2.0.0

## setPlutusV2ScriptsUnsafe

Unsafely calls instance.setPlutusV2Scripts without Effect wrapper

**Signature**

```ts
export declare const setPlutusV2ScriptsUnsafe: (
  instance: CML.ConwayFormatAuxData,
  plutusV2Scripts: CML.PlutusV2ScriptList
) => void
```

Added in v2.0.0

## setPlutusV3ScriptsUnsafe

Unsafely calls instance.setPlutusV3Scripts without Effect wrapper

**Signature**

```ts
export declare const setPlutusV3ScriptsUnsafe: (
  instance: CML.ConwayFormatAuxData,
  plutusV3Scripts: CML.PlutusV3ScriptList
) => void
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.ConwayFormatAuxData) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.ConwayFormatAuxData) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.ConwayFormatAuxData) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.ConwayFormatAuxData) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.ConwayFormatAuxData) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.ConwayFormatAuxData) => string
```

Added in v2.0.0

# Types

## ConwayFormatAuxData (type alias)

Type alias for the CML ConwayFormatAuxData class

**Signature**

```ts
export type ConwayFormatAuxData = CML.ConwayFormatAuxData
```

Added in v2.0.0

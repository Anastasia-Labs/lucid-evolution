---
title: CML/AuxiliaryData.ts
nav_order: 12
parent: Modules
---

## AuxiliaryData overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [newConway](#newconway)
  - [newShelley](#newshelley)
  - [newShelleyMa](#newshelleyma)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [newConwayUnsafe](#newconwayunsafe)
  - [newShelleyMaUnsafe](#newshelleymaunsafe)
  - [newShelleyUnsafe](#newshelleyunsafe)
- [Errors](#errors)
  - [AuxiliaryDataError (class)](#auxiliarydataerror-class)
- [Methods](#methods)
  - [add](#add)
  - [addMetadata](#addmetadata)
  - [addNativeScripts](#addnativescripts)
  - [addPlutusV1Scripts](#addplutusv1scripts)
  - [addPlutusV2Scripts](#addplutusv2scripts)
  - [asConway](#asconway)
  - [asShelley](#asshelley)
  - [asShelleyMa](#asshelleyma)
  - [free](#free)
  - [kind](#kind)
  - [metadata](#metadata)
  - [nativeScripts](#nativescripts)
  - [plutusV1Scripts](#plutusv1scripts)
  - [plutusV2Scripts](#plutusv2scripts)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [addMetadataUnsafe](#addmetadataunsafe)
  - [addNativeScriptsUnsafe](#addnativescriptsunsafe)
  - [addPlutusV1ScriptsUnsafe](#addplutusv1scriptsunsafe)
  - [addPlutusV2ScriptsUnsafe](#addplutusv2scriptsunsafe)
  - [addUnsafe](#addunsafe)
  - [asConwayUnsafe](#asconwayunsafe)
  - [asShelleyMaUnsafe](#asshelleymaunsafe)
  - [asShelleyUnsafe](#asshelleyunsafe)
  - [freeUnsafe](#freeunsafe)
  - [kindUnsafe](#kindunsafe)
  - [metadataUnsafe](#metadataunsafe)
  - [nativeScriptsUnsafe](#nativescriptsunsafe)
  - [plutusV1ScriptsUnsafe](#plutusv1scriptsunsafe)
  - [plutusV2ScriptsUnsafe](#plutusv2scriptsunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [AuxiliaryData (type alias)](#auxiliarydata-type-alias)

---

# Constructors

## \_new

Static method \_new of AuxiliaryData

**Signature**

```ts
export declare const _new: () => Effect.Effect<
  CML.AuxiliaryData,
  AuxiliaryDataError
>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of AuxiliaryData

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.AuxiliaryData, AuxiliaryDataError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of AuxiliaryData

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.AuxiliaryData, AuxiliaryDataError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of AuxiliaryData

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.AuxiliaryData, AuxiliaryDataError>;
```

Added in v2.0.0

## newConway

Static method newConway of AuxiliaryData

**Signature**

```ts
export declare const newConway: (
  conway: CML.ConwayFormatAuxData,
) => Effect.Effect<CML.AuxiliaryData, AuxiliaryDataError>;
```

Added in v2.0.0

## newShelley

Static method newShelley of AuxiliaryData

**Signature**

```ts
export declare const newShelley: (
  shelley: CML.Metadata,
) => Effect.Effect<CML.AuxiliaryData, AuxiliaryDataError>;
```

Added in v2.0.0

## newShelleyMa

Static method newShelleyMa of AuxiliaryData

**Signature**

```ts
export declare const newShelleyMa: (
  shelleyMa: CML.ShelleyMAFormatAuxData,
) => Effect.Effect<CML.AuxiliaryData, AuxiliaryDataError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls AuxiliaryData.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: () => CML.AuxiliaryData;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls AuxiliaryData.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.AuxiliaryData;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls AuxiliaryData.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.AuxiliaryData;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls AuxiliaryData.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.AuxiliaryData;
```

Added in v2.0.0

## newConwayUnsafe

Unsafely calls AuxiliaryData.newConway without Effect wrapper

**Signature**

```ts
export declare const newConwayUnsafe: (
  conway: CML.ConwayFormatAuxData,
) => CML.AuxiliaryData;
```

Added in v2.0.0

## newShelleyMaUnsafe

Unsafely calls AuxiliaryData.newShelleyMa without Effect wrapper

**Signature**

```ts
export declare const newShelleyMaUnsafe: (
  shelleyMa: CML.ShelleyMAFormatAuxData,
) => CML.AuxiliaryData;
```

Added in v2.0.0

## newShelleyUnsafe

Unsafely calls AuxiliaryData.newShelley without Effect wrapper

**Signature**

```ts
export declare const newShelleyUnsafe: (
  shelley: CML.Metadata,
) => CML.AuxiliaryData;
```

Added in v2.0.0

# Errors

## AuxiliaryDataError (class)

Error class for AuxiliaryData operations

This error is thrown when operations on AuxiliaryData instances fail.

**Signature**

```ts
export declare class AuxiliaryDataError
```

Added in v2.0.0

# Methods

## add

Method add of AuxiliaryData

**Signature**

```ts
export declare const add: (
  instance: CML.AuxiliaryData,
  other: CML.AuxiliaryData,
) => Effect.Effect<void, AuxiliaryDataError>;
```

Added in v2.0.0

## addMetadata

Method addMetadata of AuxiliaryData

**Signature**

```ts
export declare const addMetadata: (
  instance: CML.AuxiliaryData,
  other: CML.Metadata,
) => Effect.Effect<void, AuxiliaryDataError>;
```

Added in v2.0.0

## addNativeScripts

Method addNativeScripts of AuxiliaryData

**Signature**

```ts
export declare const addNativeScripts: (
  instance: CML.AuxiliaryData,
  scripts: CML.NativeScriptList,
) => Effect.Effect<void, AuxiliaryDataError>;
```

Added in v2.0.0

## addPlutusV1Scripts

Method addPlutusV1Scripts of AuxiliaryData

**Signature**

```ts
export declare const addPlutusV1Scripts: (
  instance: CML.AuxiliaryData,
  scripts: CML.PlutusV1ScriptList,
) => Effect.Effect<void, AuxiliaryDataError>;
```

Added in v2.0.0

## addPlutusV2Scripts

Method addPlutusV2Scripts of AuxiliaryData

**Signature**

```ts
export declare const addPlutusV2Scripts: (
  instance: CML.AuxiliaryData,
  scripts: CML.PlutusV2ScriptList,
) => Effect.Effect<void, AuxiliaryDataError>;
```

Added in v2.0.0

## asConway

Method asConway of AuxiliaryData

**Signature**

```ts
export declare const asConway: (
  instance: CML.AuxiliaryData,
) => Effect.Effect<CML.ConwayFormatAuxData | undefined, AuxiliaryDataError>;
```

Added in v2.0.0

## asShelley

Method asShelley of AuxiliaryData

**Signature**

```ts
export declare const asShelley: (
  instance: CML.AuxiliaryData,
) => Effect.Effect<CML.Metadata | undefined, AuxiliaryDataError>;
```

Added in v2.0.0

## asShelleyMa

Method asShelleyMa of AuxiliaryData

**Signature**

```ts
export declare const asShelleyMa: (
  instance: CML.AuxiliaryData,
) => Effect.Effect<CML.ShelleyMAFormatAuxData | undefined, AuxiliaryDataError>;
```

Added in v2.0.0

## free

Method free of AuxiliaryData

**Signature**

```ts
export declare const free: (
  instance: CML.AuxiliaryData,
) => Effect.Effect<void, AuxiliaryDataError>;
```

Added in v2.0.0

## kind

Method kind of AuxiliaryData

**Signature**

```ts
export declare const kind: (
  instance: CML.AuxiliaryData,
) => Effect.Effect<CML.AuxiliaryDataKind, AuxiliaryDataError>;
```

Added in v2.0.0

## metadata

Method metadata of AuxiliaryData

**Signature**

```ts
export declare const metadata: (
  instance: CML.AuxiliaryData,
) => Effect.Effect<CML.Metadata | undefined, AuxiliaryDataError>;
```

Added in v2.0.0

## nativeScripts

Method nativeScripts of AuxiliaryData

**Signature**

```ts
export declare const nativeScripts: (
  instance: CML.AuxiliaryData,
) => Effect.Effect<CML.NativeScriptList | undefined, AuxiliaryDataError>;
```

Added in v2.0.0

## plutusV1Scripts

Method plutusV1Scripts of AuxiliaryData

**Signature**

```ts
export declare const plutusV1Scripts: (
  instance: CML.AuxiliaryData,
) => Effect.Effect<CML.PlutusV1ScriptList | undefined, AuxiliaryDataError>;
```

Added in v2.0.0

## plutusV2Scripts

Method plutusV2Scripts of AuxiliaryData

**Signature**

```ts
export declare const plutusV2Scripts: (
  instance: CML.AuxiliaryData,
) => Effect.Effect<CML.PlutusV2ScriptList | undefined, AuxiliaryDataError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of AuxiliaryData

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.AuxiliaryData,
) => Effect.Effect<Uint8Array, AuxiliaryDataError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of AuxiliaryData

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.AuxiliaryData,
) => Effect.Effect<string, AuxiliaryDataError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of AuxiliaryData

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.AuxiliaryData,
) => Effect.Effect<Uint8Array, AuxiliaryDataError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of AuxiliaryData

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.AuxiliaryData,
) => Effect.Effect<string, AuxiliaryDataError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of AuxiliaryData

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.AuxiliaryData,
) => Effect.Effect<any, AuxiliaryDataError>;
```

Added in v2.0.0

## toJson

Method toJson of AuxiliaryData

**Signature**

```ts
export declare const toJson: (
  instance: CML.AuxiliaryData,
) => Effect.Effect<string, AuxiliaryDataError>;
```

Added in v2.0.0

# MethodsUnsafe

## addMetadataUnsafe

Unsafely calls instance.addMetadata without Effect wrapper

**Signature**

```ts
export declare const addMetadataUnsafe: (
  instance: CML.AuxiliaryData,
  other: CML.Metadata,
) => void;
```

Added in v2.0.0

## addNativeScriptsUnsafe

Unsafely calls instance.addNativeScripts without Effect wrapper

**Signature**

```ts
export declare const addNativeScriptsUnsafe: (
  instance: CML.AuxiliaryData,
  scripts: CML.NativeScriptList,
) => void;
```

Added in v2.0.0

## addPlutusV1ScriptsUnsafe

Unsafely calls instance.addPlutusV1Scripts without Effect wrapper

**Signature**

```ts
export declare const addPlutusV1ScriptsUnsafe: (
  instance: CML.AuxiliaryData,
  scripts: CML.PlutusV1ScriptList,
) => void;
```

Added in v2.0.0

## addPlutusV2ScriptsUnsafe

Unsafely calls instance.addPlutusV2Scripts without Effect wrapper

**Signature**

```ts
export declare const addPlutusV2ScriptsUnsafe: (
  instance: CML.AuxiliaryData,
  scripts: CML.PlutusV2ScriptList,
) => void;
```

Added in v2.0.0

## addUnsafe

Unsafely calls instance.add without Effect wrapper

**Signature**

```ts
export declare const addUnsafe: (
  instance: CML.AuxiliaryData,
  other: CML.AuxiliaryData,
) => void;
```

Added in v2.0.0

## asConwayUnsafe

Unsafely calls instance.asConway without Effect wrapper

**Signature**

```ts
export declare const asConwayUnsafe: (
  instance: CML.AuxiliaryData,
) => CML.ConwayFormatAuxData | undefined;
```

Added in v2.0.0

## asShelleyMaUnsafe

Unsafely calls instance.asShelleyMa without Effect wrapper

**Signature**

```ts
export declare const asShelleyMaUnsafe: (
  instance: CML.AuxiliaryData,
) => CML.ShelleyMAFormatAuxData | undefined;
```

Added in v2.0.0

## asShelleyUnsafe

Unsafely calls instance.asShelley without Effect wrapper

**Signature**

```ts
export declare const asShelleyUnsafe: (
  instance: CML.AuxiliaryData,
) => CML.Metadata | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.AuxiliaryData) => void;
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (
  instance: CML.AuxiliaryData,
) => CML.AuxiliaryDataKind;
```

Added in v2.0.0

## metadataUnsafe

Unsafely calls instance.metadata without Effect wrapper

**Signature**

```ts
export declare const metadataUnsafe: (
  instance: CML.AuxiliaryData,
) => CML.Metadata | undefined;
```

Added in v2.0.0

## nativeScriptsUnsafe

Unsafely calls instance.nativeScripts without Effect wrapper

**Signature**

```ts
export declare const nativeScriptsUnsafe: (
  instance: CML.AuxiliaryData,
) => CML.NativeScriptList | undefined;
```

Added in v2.0.0

## plutusV1ScriptsUnsafe

Unsafely calls instance.plutusV1Scripts without Effect wrapper

**Signature**

```ts
export declare const plutusV1ScriptsUnsafe: (
  instance: CML.AuxiliaryData,
) => CML.PlutusV1ScriptList | undefined;
```

Added in v2.0.0

## plutusV2ScriptsUnsafe

Unsafely calls instance.plutusV2Scripts without Effect wrapper

**Signature**

```ts
export declare const plutusV2ScriptsUnsafe: (
  instance: CML.AuxiliaryData,
) => CML.PlutusV2ScriptList | undefined;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.AuxiliaryData,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.AuxiliaryData,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.AuxiliaryData,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.AuxiliaryData) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.AuxiliaryData) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.AuxiliaryData) => string;
```

Added in v2.0.0

# Types

## AuxiliaryData (type alias)

Type alias for the CML AuxiliaryData class

**Signature**

```ts
export type AuxiliaryData = CML.AuxiliaryData;
```

Added in v2.0.0

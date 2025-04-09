---
title: CML/PlutusData.ts
nav_order: 149
parent: Modules
---

## PlutusData overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [newBytes](#newbytes)
  - [newConstrPlutusData](#newconstrplutusdata)
  - [newInteger](#newinteger)
  - [newList](#newlist)
  - [newMap](#newmap)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [newBytesUnsafe](#newbytesunsafe)
  - [newConstrPlutusDataUnsafe](#newconstrplutusdataunsafe)
  - [newIntegerUnsafe](#newintegerunsafe)
  - [newListUnsafe](#newlistunsafe)
  - [newMapUnsafe](#newmapunsafe)
- [Errors](#errors)
  - [PlutusDataError (class)](#plutusdataerror-class)
- [Methods](#methods)
  - [asBytes](#asbytes)
  - [asConstrPlutusData](#asconstrplutusdata)
  - [asInteger](#asinteger)
  - [asList](#aslist)
  - [asMap](#asmap)
  - [free](#free)
  - [kind](#kind)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCardanoNodeFormat](#tocardanonodeformat)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [asBytesUnsafe](#asbytesunsafe)
  - [asConstrPlutusDataUnsafe](#asconstrplutusdataunsafe)
  - [asIntegerUnsafe](#asintegerunsafe)
  - [asListUnsafe](#aslistunsafe)
  - [asMapUnsafe](#asmapunsafe)
  - [freeUnsafe](#freeunsafe)
  - [kindUnsafe](#kindunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCardanoNodeFormatUnsafe](#tocardanonodeformatunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [PlutusData (type alias)](#plutusdata-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of PlutusData

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.PlutusData, PlutusDataError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of PlutusData

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.PlutusData, PlutusDataError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of PlutusData

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.PlutusData, PlutusDataError>;
```

Added in v2.0.0

## newBytes

Static method newBytes of PlutusData

**Signature**

```ts
export declare const newBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.PlutusData, PlutusDataError>;
```

Added in v2.0.0

## newConstrPlutusData

Static method newConstrPlutusData of PlutusData

**Signature**

```ts
export declare const newConstrPlutusData: (
  constrPlutusData: CML.ConstrPlutusData,
) => Effect.Effect<CML.PlutusData, PlutusDataError>;
```

Added in v2.0.0

## newInteger

Static method newInteger of PlutusData

**Signature**

```ts
export declare const newInteger: (
  bigInt: CML.BigInteger,
) => Effect.Effect<CML.PlutusData, PlutusDataError>;
```

Added in v2.0.0

## newList

Static method newList of PlutusData

**Signature**

```ts
export declare const newList: (
  list: CML.PlutusDataList,
) => Effect.Effect<CML.PlutusData, PlutusDataError>;
```

Added in v2.0.0

## newMap

Static method newMap of PlutusData

**Signature**

```ts
export declare const newMap: (
  map: CML.PlutusMap,
) => Effect.Effect<CML.PlutusData, PlutusDataError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls PlutusData.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.PlutusData;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls PlutusData.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.PlutusData;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls PlutusData.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.PlutusData;
```

Added in v2.0.0

## newBytesUnsafe

Unsafely calls PlutusData.newBytes without Effect wrapper

**Signature**

```ts
export declare const newBytesUnsafe: (bytes: Uint8Array) => CML.PlutusData;
```

Added in v2.0.0

## newConstrPlutusDataUnsafe

Unsafely calls PlutusData.newConstrPlutusData without Effect wrapper

**Signature**

```ts
export declare const newConstrPlutusDataUnsafe: (
  constrPlutusData: CML.ConstrPlutusData,
) => CML.PlutusData;
```

Added in v2.0.0

## newIntegerUnsafe

Unsafely calls PlutusData.newInteger without Effect wrapper

**Signature**

```ts
export declare const newIntegerUnsafe: (
  bigInt: CML.BigInteger,
) => CML.PlutusData;
```

Added in v2.0.0

## newListUnsafe

Unsafely calls PlutusData.newList without Effect wrapper

**Signature**

```ts
export declare const newListUnsafe: (
  list: CML.PlutusDataList,
) => CML.PlutusData;
```

Added in v2.0.0

## newMapUnsafe

Unsafely calls PlutusData.newMap without Effect wrapper

**Signature**

```ts
export declare const newMapUnsafe: (map: CML.PlutusMap) => CML.PlutusData;
```

Added in v2.0.0

# Errors

## PlutusDataError (class)

Error class for PlutusData operations

This error is thrown when operations on PlutusData instances fail.

**Signature**

```ts
export declare class PlutusDataError
```

Added in v2.0.0

# Methods

## asBytes

Method asBytes of PlutusData

**Signature**

```ts
export declare const asBytes: (
  instance: CML.PlutusData,
) => Effect.Effect<Uint8Array | undefined, PlutusDataError>;
```

Added in v2.0.0

## asConstrPlutusData

Method asConstrPlutusData of PlutusData

**Signature**

```ts
export declare const asConstrPlutusData: (
  instance: CML.PlutusData,
) => Effect.Effect<CML.ConstrPlutusData | undefined, PlutusDataError>;
```

Added in v2.0.0

## asInteger

Method asInteger of PlutusData

**Signature**

```ts
export declare const asInteger: (
  instance: CML.PlutusData,
) => Effect.Effect<CML.BigInteger | undefined, PlutusDataError>;
```

Added in v2.0.0

## asList

Method asList of PlutusData

**Signature**

```ts
export declare const asList: (
  instance: CML.PlutusData,
) => Effect.Effect<CML.PlutusDataList | undefined, PlutusDataError>;
```

Added in v2.0.0

## asMap

Method asMap of PlutusData

**Signature**

```ts
export declare const asMap: (
  instance: CML.PlutusData,
) => Effect.Effect<CML.PlutusMap | undefined, PlutusDataError>;
```

Added in v2.0.0

## free

Method free of PlutusData

**Signature**

```ts
export declare const free: (
  instance: CML.PlutusData,
) => Effect.Effect<void, PlutusDataError>;
```

Added in v2.0.0

## kind

Method kind of PlutusData

**Signature**

```ts
export declare const kind: (
  instance: CML.PlutusData,
) => Effect.Effect<CML.PlutusDataKind, PlutusDataError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of PlutusData

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.PlutusData,
) => Effect.Effect<Uint8Array, PlutusDataError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of PlutusData

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.PlutusData,
) => Effect.Effect<string, PlutusDataError>;
```

Added in v2.0.0

## toCardanoNodeFormat

Method toCardanoNodeFormat of PlutusData

**Signature**

```ts
export declare const toCardanoNodeFormat: (
  instance: CML.PlutusData,
) => Effect.Effect<CML.PlutusData, PlutusDataError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of PlutusData

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.PlutusData,
) => Effect.Effect<Uint8Array, PlutusDataError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of PlutusData

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.PlutusData,
) => Effect.Effect<string, PlutusDataError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of PlutusData

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.PlutusData,
) => Effect.Effect<any, PlutusDataError>;
```

Added in v2.0.0

## toJson

Method toJson of PlutusData

**Signature**

```ts
export declare const toJson: (
  instance: CML.PlutusData,
) => Effect.Effect<string, PlutusDataError>;
```

Added in v2.0.0

# MethodsUnsafe

## asBytesUnsafe

Unsafely calls instance.asBytes without Effect wrapper

**Signature**

```ts
export declare const asBytesUnsafe: (
  instance: CML.PlutusData,
) => Uint8Array | undefined;
```

Added in v2.0.0

## asConstrPlutusDataUnsafe

Unsafely calls instance.asConstrPlutusData without Effect wrapper

**Signature**

```ts
export declare const asConstrPlutusDataUnsafe: (
  instance: CML.PlutusData,
) => CML.ConstrPlutusData | undefined;
```

Added in v2.0.0

## asIntegerUnsafe

Unsafely calls instance.asInteger without Effect wrapper

**Signature**

```ts
export declare const asIntegerUnsafe: (
  instance: CML.PlutusData,
) => CML.BigInteger | undefined;
```

Added in v2.0.0

## asListUnsafe

Unsafely calls instance.asList without Effect wrapper

**Signature**

```ts
export declare const asListUnsafe: (
  instance: CML.PlutusData,
) => CML.PlutusDataList | undefined;
```

Added in v2.0.0

## asMapUnsafe

Unsafely calls instance.asMap without Effect wrapper

**Signature**

```ts
export declare const asMapUnsafe: (
  instance: CML.PlutusData,
) => CML.PlutusMap | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.PlutusData) => void;
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (
  instance: CML.PlutusData,
) => CML.PlutusDataKind;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.PlutusData,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.PlutusData,
) => string;
```

Added in v2.0.0

## toCardanoNodeFormatUnsafe

Unsafely calls instance.toCardanoNodeFormat without Effect wrapper

**Signature**

```ts
export declare const toCardanoNodeFormatUnsafe: (
  instance: CML.PlutusData,
) => CML.PlutusData;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.PlutusData,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.PlutusData) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.PlutusData) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.PlutusData) => string;
```

Added in v2.0.0

# Types

## PlutusData (type alias)

Type alias for the CML PlutusData class

**Signature**

```ts
export type PlutusData = CML.PlutusData;
```

Added in v2.0.0

---
title: CML/ConstrPlutusData.ts
nav_order: 54
parent: Modules
---

## ConstrPlutusData overview

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
  - [ConstrPlutusDataError (class)](#constrplutusdataerror-class)
- [Methods](#methods)
  - [alternative](#alternative)
  - [fields](#fields)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [alternativeUnsafe](#alternativeunsafe)
  - [fieldsUnsafe](#fieldsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [ConstrPlutusData (type alias)](#constrplutusdata-type-alias)

---

# Constructors

## \_new

Static method \_new of ConstrPlutusData

**Signature**

```ts
export declare const _new: (
  alternative: bigint,
  fields: CML.PlutusDataList,
) => Effect.Effect<CML.ConstrPlutusData, ConstrPlutusDataError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ConstrPlutusData

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ConstrPlutusData, ConstrPlutusDataError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ConstrPlutusData

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ConstrPlutusData, ConstrPlutusDataError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of ConstrPlutusData

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.ConstrPlutusData, ConstrPlutusDataError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ConstrPlutusData.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  alternative: bigint,
  fields: CML.PlutusDataList,
) => CML.ConstrPlutusData;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ConstrPlutusData.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.ConstrPlutusData;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ConstrPlutusData.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.ConstrPlutusData;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ConstrPlutusData.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ConstrPlutusData;
```

Added in v2.0.0

# Errors

## ConstrPlutusDataError (class)

Error class for ConstrPlutusData operations

This error is thrown when operations on ConstrPlutusData instances fail.

**Signature**

```ts
export declare class ConstrPlutusDataError
```

Added in v2.0.0

# Methods

## alternative

Method alternative of ConstrPlutusData

**Signature**

```ts
export declare const alternative: (
  instance: CML.ConstrPlutusData,
) => Effect.Effect<bigint, ConstrPlutusDataError>;
```

Added in v2.0.0

## fields

Method fields of ConstrPlutusData

**Signature**

```ts
export declare const fields: (
  instance: CML.ConstrPlutusData,
) => Effect.Effect<CML.PlutusDataList, ConstrPlutusDataError>;
```

Added in v2.0.0

## free

Method free of ConstrPlutusData

**Signature**

```ts
export declare const free: (
  instance: CML.ConstrPlutusData,
) => Effect.Effect<void, ConstrPlutusDataError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ConstrPlutusData

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.ConstrPlutusData,
) => Effect.Effect<Uint8Array, ConstrPlutusDataError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ConstrPlutusData

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.ConstrPlutusData,
) => Effect.Effect<string, ConstrPlutusDataError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ConstrPlutusData

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.ConstrPlutusData,
) => Effect.Effect<Uint8Array, ConstrPlutusDataError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of ConstrPlutusData

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.ConstrPlutusData,
) => Effect.Effect<string, ConstrPlutusDataError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of ConstrPlutusData

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.ConstrPlutusData,
) => Effect.Effect<any, ConstrPlutusDataError>;
```

Added in v2.0.0

## toJson

Method toJson of ConstrPlutusData

**Signature**

```ts
export declare const toJson: (
  instance: CML.ConstrPlutusData,
) => Effect.Effect<string, ConstrPlutusDataError>;
```

Added in v2.0.0

# MethodsUnsafe

## alternativeUnsafe

Unsafely calls instance.alternative without Effect wrapper

**Signature**

```ts
export declare const alternativeUnsafe: (
  instance: CML.ConstrPlutusData,
) => bigint;
```

Added in v2.0.0

## fieldsUnsafe

Unsafely calls instance.fields without Effect wrapper

**Signature**

```ts
export declare const fieldsUnsafe: (
  instance: CML.ConstrPlutusData,
) => CML.PlutusDataList;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ConstrPlutusData) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.ConstrPlutusData,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.ConstrPlutusData,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.ConstrPlutusData,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.ConstrPlutusData,
) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.ConstrPlutusData) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.ConstrPlutusData) => string;
```

Added in v2.0.0

# Types

## ConstrPlutusData (type alias)

Type alias for the CML ConstrPlutusData class

**Signature**

```ts
export type ConstrPlutusData = CML.ConstrPlutusData;
```

Added in v2.0.0

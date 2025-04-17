---
title: CML/TransactionMetadatum.ts
nav_order: 235
parent: Modules
---

## TransactionMetadatum overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromJson](#fromjson)
  - [newBytes](#newbytes)
  - [newInt](#newint)
  - [newList](#newlist)
  - [newMap](#newmap)
  - [newText](#newtext)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [newBytesUnsafe](#newbytesunsafe)
  - [newIntUnsafe](#newintunsafe)
  - [newListUnsafe](#newlistunsafe)
  - [newMapUnsafe](#newmapunsafe)
  - [newTextUnsafe](#newtextunsafe)
- [Errors](#errors)
  - [TransactionMetadatumError (class)](#transactionmetadatumerror-class)
- [Methods](#methods)
  - [asBytes](#asbytes)
  - [asInt](#asint)
  - [asList](#aslist)
  - [asMap](#asmap)
  - [asText](#astext)
  - [free](#free)
  - [kind](#kind)
  - [toCborBytes](#tocborbytes)
  - [toJson](#tojson)
  - [toJsonValue](#tojsonvalue)
- [MethodsUnsafe](#methodsunsafe)
  - [asBytesUnsafe](#asbytesunsafe)
  - [asIntUnsafe](#asintunsafe)
  - [asListUnsafe](#aslistunsafe)
  - [asMapUnsafe](#asmapunsafe)
  - [asTextUnsafe](#astextunsafe)
  - [freeUnsafe](#freeunsafe)
  - [kindUnsafe](#kindunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [toJsonValueUnsafe](#tojsonvalueunsafe)
- [Types](#types)
  - [TransactionMetadatum (type alias)](#transactionmetadatum-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of TransactionMetadatum

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of TransactionMetadatum

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumError>;
```

Added in v2.0.0

## newBytes

Static method newBytes of TransactionMetadatum

**Signature**

```ts
export declare const newBytes: (
  bytes: Uint8Array,
) => Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumError>;
```

Added in v2.0.0

## newInt

Static method newInt of TransactionMetadatum

**Signature**

```ts
export declare const newInt: (
  int: CML.Int,
) => Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumError>;
```

Added in v2.0.0

## newList

Static method newList of TransactionMetadatum

**Signature**

```ts
export declare const newList: (
  elements: CML.MetadatumList,
) => Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumError>;
```

Added in v2.0.0

## newMap

Static method newMap of TransactionMetadatum

**Signature**

```ts
export declare const newMap: (
  map: CML.MetadatumMap,
) => Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumError>;
```

Added in v2.0.0

## newText

Static method newText of TransactionMetadatum

**Signature**

```ts
export declare const newText: (
  text: string,
) => Effect.Effect<CML.TransactionMetadatum, TransactionMetadatumError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls TransactionMetadatum.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.TransactionMetadatum;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls TransactionMetadatum.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.TransactionMetadatum;
```

Added in v2.0.0

## newBytesUnsafe

Unsafely calls TransactionMetadatum.newBytes without Effect wrapper

**Signature**

```ts
export declare const newBytesUnsafe: (
  bytes: Uint8Array,
) => CML.TransactionMetadatum;
```

Added in v2.0.0

## newIntUnsafe

Unsafely calls TransactionMetadatum.newInt without Effect wrapper

**Signature**

```ts
export declare const newIntUnsafe: (int: CML.Int) => CML.TransactionMetadatum;
```

Added in v2.0.0

## newListUnsafe

Unsafely calls TransactionMetadatum.newList without Effect wrapper

**Signature**

```ts
export declare const newListUnsafe: (
  elements: CML.MetadatumList,
) => CML.TransactionMetadatum;
```

Added in v2.0.0

## newMapUnsafe

Unsafely calls TransactionMetadatum.newMap without Effect wrapper

**Signature**

```ts
export declare const newMapUnsafe: (
  map: CML.MetadatumMap,
) => CML.TransactionMetadatum;
```

Added in v2.0.0

## newTextUnsafe

Unsafely calls TransactionMetadatum.newText without Effect wrapper

**Signature**

```ts
export declare const newTextUnsafe: (text: string) => CML.TransactionMetadatum;
```

Added in v2.0.0

# Errors

## TransactionMetadatumError (class)

Error class for TransactionMetadatum operations

This error is thrown when operations on TransactionMetadatum instances fail.

**Signature**

```ts
export declare class TransactionMetadatumError
```

Added in v2.0.0

# Methods

## asBytes

Method asBytes of TransactionMetadatum

**Signature**

```ts
export declare const asBytes: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<Uint8Array | undefined, TransactionMetadatumError>;
```

Added in v2.0.0

## asInt

Method asInt of TransactionMetadatum

**Signature**

```ts
export declare const asInt: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<CML.Int | undefined, TransactionMetadatumError>;
```

Added in v2.0.0

## asList

Method asList of TransactionMetadatum

**Signature**

```ts
export declare const asList: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<CML.MetadatumList | undefined, TransactionMetadatumError>;
```

Added in v2.0.0

## asMap

Method asMap of TransactionMetadatum

**Signature**

```ts
export declare const asMap: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<CML.MetadatumMap | undefined, TransactionMetadatumError>;
```

Added in v2.0.0

## asText

Method asText of TransactionMetadatum

**Signature**

```ts
export declare const asText: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<string | undefined, TransactionMetadatumError>;
```

Added in v2.0.0

## free

Method free of TransactionMetadatum

**Signature**

```ts
export declare const free: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<void, TransactionMetadatumError>;
```

Added in v2.0.0

## kind

Method kind of TransactionMetadatum

**Signature**

```ts
export declare const kind: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<CML.TransactionMetadatumKind, TransactionMetadatumError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of TransactionMetadatum

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<Uint8Array, TransactionMetadatumError>;
```

Added in v2.0.0

## toJson

Method toJson of TransactionMetadatum

**Signature**

```ts
export declare const toJson: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<string, TransactionMetadatumError>;
```

Added in v2.0.0

## toJsonValue

Method toJsonValue of TransactionMetadatum

**Signature**

```ts
export declare const toJsonValue: (
  instance: CML.TransactionMetadatum,
) => Effect.Effect<any, TransactionMetadatumError>;
```

Added in v2.0.0

# MethodsUnsafe

## asBytesUnsafe

Unsafely calls instance.asBytes without Effect wrapper

**Signature**

```ts
export declare const asBytesUnsafe: (
  instance: CML.TransactionMetadatum,
) => Uint8Array | undefined;
```

Added in v2.0.0

## asIntUnsafe

Unsafely calls instance.asInt without Effect wrapper

**Signature**

```ts
export declare const asIntUnsafe: (
  instance: CML.TransactionMetadatum,
) => CML.Int | undefined;
```

Added in v2.0.0

## asListUnsafe

Unsafely calls instance.asList without Effect wrapper

**Signature**

```ts
export declare const asListUnsafe: (
  instance: CML.TransactionMetadatum,
) => CML.MetadatumList | undefined;
```

Added in v2.0.0

## asMapUnsafe

Unsafely calls instance.asMap without Effect wrapper

**Signature**

```ts
export declare const asMapUnsafe: (
  instance: CML.TransactionMetadatum,
) => CML.MetadatumMap | undefined;
```

Added in v2.0.0

## asTextUnsafe

Unsafely calls instance.asText without Effect wrapper

**Signature**

```ts
export declare const asTextUnsafe: (
  instance: CML.TransactionMetadatum,
) => string | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.TransactionMetadatum) => void;
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (
  instance: CML.TransactionMetadatum,
) => CML.TransactionMetadatumKind;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.TransactionMetadatum,
) => Uint8Array;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (
  instance: CML.TransactionMetadatum,
) => string;
```

Added in v2.0.0

## toJsonValueUnsafe

Unsafely calls instance.toJsonValue without Effect wrapper

**Signature**

```ts
export declare const toJsonValueUnsafe: (
  instance: CML.TransactionMetadatum,
) => any;
```

Added in v2.0.0

# Types

## TransactionMetadatum (type alias)

Type alias for the CML TransactionMetadatum class

**Signature**

```ts
export type TransactionMetadatum = CML.TransactionMetadatum;
```

Added in v2.0.0

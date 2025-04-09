---
title: CML/AlonzoFormatTxOut.ts
nav_order: 6
parent: Modules
---

## AlonzoFormatTxOut overview

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
  - [AlonzoFormatTxOutError (class)](#alonzoformattxouterror-class)
- [Methods](#methods)
  - [address](#address)
  - [amount](#amount)
  - [datumHash](#datumhash)
  - [free](#free)
  - [setDatumHash](#setdatumhash)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [addressUnsafe](#addressunsafe)
  - [amountUnsafe](#amountunsafe)
  - [datumHashUnsafe](#datumhashunsafe)
  - [freeUnsafe](#freeunsafe)
  - [setDatumHashUnsafe](#setdatumhashunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [AlonzoFormatTxOut (type alias)](#alonzoformattxout-type-alias)

---

# Constructors

## \_new

Static method \_new of AlonzoFormatTxOut

**Signature**

```ts
export declare const _new: (
  address: CML.Address,
  amount: CML.Value,
) => Effect.Effect<CML.AlonzoFormatTxOut, AlonzoFormatTxOutError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of AlonzoFormatTxOut

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.AlonzoFormatTxOut, AlonzoFormatTxOutError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of AlonzoFormatTxOut

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.AlonzoFormatTxOut, AlonzoFormatTxOutError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of AlonzoFormatTxOut

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.AlonzoFormatTxOut, AlonzoFormatTxOutError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls AlonzoFormatTxOut.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  address: CML.Address,
  amount: CML.Value,
) => CML.AlonzoFormatTxOut;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls AlonzoFormatTxOut.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.AlonzoFormatTxOut;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls AlonzoFormatTxOut.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.AlonzoFormatTxOut;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls AlonzoFormatTxOut.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.AlonzoFormatTxOut;
```

Added in v2.0.0

# Errors

## AlonzoFormatTxOutError (class)

Error class for AlonzoFormatTxOut operations

This error is thrown when operations on AlonzoFormatTxOut instances fail.

**Signature**

```ts
export declare class AlonzoFormatTxOutError
```

Added in v2.0.0

# Methods

## address

Method address of AlonzoFormatTxOut

**Signature**

```ts
export declare const address: (
  instance: CML.AlonzoFormatTxOut,
) => Effect.Effect<CML.Address, AlonzoFormatTxOutError>;
```

Added in v2.0.0

## amount

Method amount of AlonzoFormatTxOut

**Signature**

```ts
export declare const amount: (
  instance: CML.AlonzoFormatTxOut,
) => Effect.Effect<CML.Value, AlonzoFormatTxOutError>;
```

Added in v2.0.0

## datumHash

Method datumHash of AlonzoFormatTxOut

**Signature**

```ts
export declare const datumHash: (
  instance: CML.AlonzoFormatTxOut,
) => Effect.Effect<CML.DatumHash | undefined, AlonzoFormatTxOutError>;
```

Added in v2.0.0

## free

Method free of AlonzoFormatTxOut

**Signature**

```ts
export declare const free: (
  instance: CML.AlonzoFormatTxOut,
) => Effect.Effect<void, AlonzoFormatTxOutError>;
```

Added in v2.0.0

## setDatumHash

Method setDatumHash of AlonzoFormatTxOut

**Signature**

```ts
export declare const setDatumHash: (
  instance: CML.AlonzoFormatTxOut,
  datumHash: CML.DatumHash,
) => Effect.Effect<void, AlonzoFormatTxOutError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of AlonzoFormatTxOut

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.AlonzoFormatTxOut,
) => Effect.Effect<Uint8Array, AlonzoFormatTxOutError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of AlonzoFormatTxOut

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.AlonzoFormatTxOut,
) => Effect.Effect<string, AlonzoFormatTxOutError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of AlonzoFormatTxOut

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.AlonzoFormatTxOut,
) => Effect.Effect<Uint8Array, AlonzoFormatTxOutError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of AlonzoFormatTxOut

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.AlonzoFormatTxOut,
) => Effect.Effect<string, AlonzoFormatTxOutError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of AlonzoFormatTxOut

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.AlonzoFormatTxOut,
) => Effect.Effect<any, AlonzoFormatTxOutError>;
```

Added in v2.0.0

## toJson

Method toJson of AlonzoFormatTxOut

**Signature**

```ts
export declare const toJson: (
  instance: CML.AlonzoFormatTxOut,
) => Effect.Effect<string, AlonzoFormatTxOutError>;
```

Added in v2.0.0

# MethodsUnsafe

## addressUnsafe

Unsafely calls instance.address without Effect wrapper

**Signature**

```ts
export declare const addressUnsafe: (
  instance: CML.AlonzoFormatTxOut,
) => CML.Address;
```

Added in v2.0.0

## amountUnsafe

Unsafely calls instance.amount without Effect wrapper

**Signature**

```ts
export declare const amountUnsafe: (
  instance: CML.AlonzoFormatTxOut,
) => CML.Value;
```

Added in v2.0.0

## datumHashUnsafe

Unsafely calls instance.datumHash without Effect wrapper

**Signature**

```ts
export declare const datumHashUnsafe: (
  instance: CML.AlonzoFormatTxOut,
) => CML.DatumHash | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.AlonzoFormatTxOut) => void;
```

Added in v2.0.0

## setDatumHashUnsafe

Unsafely calls instance.setDatumHash without Effect wrapper

**Signature**

```ts
export declare const setDatumHashUnsafe: (
  instance: CML.AlonzoFormatTxOut,
  datumHash: CML.DatumHash,
) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.AlonzoFormatTxOut,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.AlonzoFormatTxOut,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.AlonzoFormatTxOut,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.AlonzoFormatTxOut,
) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.AlonzoFormatTxOut) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.AlonzoFormatTxOut) => string;
```

Added in v2.0.0

# Types

## AlonzoFormatTxOut (type alias)

Type alias for the CML AlonzoFormatTxOut class

**Signature**

```ts
export type AlonzoFormatTxOut = CML.AlonzoFormatTxOut;
```

Added in v2.0.0

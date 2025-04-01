---
title: CML/ConwayFormatTxOut.ts
nav_order: 49
parent: Modules
---

## ConwayFormatTxOut overview

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
  - [ConwayFormatTxOutError (class)](#conwayformattxouterror-class)
- [Methods](#methods)
  - [address](#address)
  - [amount](#amount)
  - [datumOption](#datumoption)
  - [free](#free)
  - [scriptReference](#scriptreference)
  - [setDatumOption](#setdatumoption)
  - [setScriptReference](#setscriptreference)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [addressUnsafe](#addressunsafe)
  - [amountUnsafe](#amountunsafe)
  - [datumOptionUnsafe](#datumoptionunsafe)
  - [freeUnsafe](#freeunsafe)
  - [scriptReferenceUnsafe](#scriptreferenceunsafe)
  - [setDatumOptionUnsafe](#setdatumoptionunsafe)
  - [setScriptReferenceUnsafe](#setscriptreferenceunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [ConwayFormatTxOut (type alias)](#conwayformattxout-type-alias)

---

# Constructors

## \_new

Static method \_new of ConwayFormatTxOut

**Signature**

```ts
export declare const _new: (
  address: CML.Address,
  amount: CML.Value
) => Effect.Effect<CML.ConwayFormatTxOut, ConwayFormatTxOutError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ConwayFormatTxOut

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.ConwayFormatTxOut, ConwayFormatTxOutError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ConwayFormatTxOut

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.ConwayFormatTxOut, ConwayFormatTxOutError>
```

Added in v2.0.0

## fromJson

Static method fromJson of ConwayFormatTxOut

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.ConwayFormatTxOut, ConwayFormatTxOutError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ConwayFormatTxOut.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (address: CML.Address, amount: CML.Value) => CML.ConwayFormatTxOut
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ConwayFormatTxOut.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.ConwayFormatTxOut
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ConwayFormatTxOut.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.ConwayFormatTxOut
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ConwayFormatTxOut.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ConwayFormatTxOut
```

Added in v2.0.0

# Errors

## ConwayFormatTxOutError (class)

Error class for ConwayFormatTxOut operations

This error is thrown when operations on ConwayFormatTxOut instances fail.

**Signature**

```ts
export declare class ConwayFormatTxOutError
```

Added in v2.0.0

# Methods

## address

Method address of ConwayFormatTxOut

**Signature**

```ts
export declare const address: (instance: CML.ConwayFormatTxOut) => Effect.Effect<CML.Address, ConwayFormatTxOutError>
```

Added in v2.0.0

## amount

Method amount of ConwayFormatTxOut

**Signature**

```ts
export declare const amount: (instance: CML.ConwayFormatTxOut) => Effect.Effect<CML.Value, ConwayFormatTxOutError>
```

Added in v2.0.0

## datumOption

Method datumOption of ConwayFormatTxOut

**Signature**

```ts
export declare const datumOption: (
  instance: CML.ConwayFormatTxOut
) => Effect.Effect<CML.DatumOption | undefined, ConwayFormatTxOutError>
```

Added in v2.0.0

## free

Method free of ConwayFormatTxOut

**Signature**

```ts
export declare const free: (instance: CML.ConwayFormatTxOut) => Effect.Effect<void, ConwayFormatTxOutError>
```

Added in v2.0.0

## scriptReference

Method scriptReference of ConwayFormatTxOut

**Signature**

```ts
export declare const scriptReference: (
  instance: CML.ConwayFormatTxOut
) => Effect.Effect<CML.Script | undefined, ConwayFormatTxOutError>
```

Added in v2.0.0

## setDatumOption

Method setDatumOption of ConwayFormatTxOut

**Signature**

```ts
export declare const setDatumOption: (
  instance: CML.ConwayFormatTxOut,
  datumOption: CML.DatumOption
) => Effect.Effect<void, ConwayFormatTxOutError>
```

Added in v2.0.0

## setScriptReference

Method setScriptReference of ConwayFormatTxOut

**Signature**

```ts
export declare const setScriptReference: (
  instance: CML.ConwayFormatTxOut,
  scriptReference: CML.Script
) => Effect.Effect<void, ConwayFormatTxOutError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ConwayFormatTxOut

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.ConwayFormatTxOut
) => Effect.Effect<Uint8Array, ConwayFormatTxOutError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ConwayFormatTxOut

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.ConwayFormatTxOut
) => Effect.Effect<string, ConwayFormatTxOutError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ConwayFormatTxOut

**Signature**

```ts
export declare const toCborBytes: (instance: CML.ConwayFormatTxOut) => Effect.Effect<Uint8Array, ConwayFormatTxOutError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of ConwayFormatTxOut

**Signature**

```ts
export declare const toCborHex: (instance: CML.ConwayFormatTxOut) => Effect.Effect<string, ConwayFormatTxOutError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of ConwayFormatTxOut

**Signature**

```ts
export declare const toJsValue: (instance: CML.ConwayFormatTxOut) => Effect.Effect<any, ConwayFormatTxOutError>
```

Added in v2.0.0

## toJson

Method toJson of ConwayFormatTxOut

**Signature**

```ts
export declare const toJson: (instance: CML.ConwayFormatTxOut) => Effect.Effect<string, ConwayFormatTxOutError>
```

Added in v2.0.0

# MethodsUnsafe

## addressUnsafe

Unsafely calls instance.address without Effect wrapper

**Signature**

```ts
export declare const addressUnsafe: (instance: CML.ConwayFormatTxOut) => CML.Address
```

Added in v2.0.0

## amountUnsafe

Unsafely calls instance.amount without Effect wrapper

**Signature**

```ts
export declare const amountUnsafe: (instance: CML.ConwayFormatTxOut) => CML.Value
```

Added in v2.0.0

## datumOptionUnsafe

Unsafely calls instance.datumOption without Effect wrapper

**Signature**

```ts
export declare const datumOptionUnsafe: (instance: CML.ConwayFormatTxOut) => CML.DatumOption | undefined
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ConwayFormatTxOut) => void
```

Added in v2.0.0

## scriptReferenceUnsafe

Unsafely calls instance.scriptReference without Effect wrapper

**Signature**

```ts
export declare const scriptReferenceUnsafe: (instance: CML.ConwayFormatTxOut) => CML.Script | undefined
```

Added in v2.0.0

## setDatumOptionUnsafe

Unsafely calls instance.setDatumOption without Effect wrapper

**Signature**

```ts
export declare const setDatumOptionUnsafe: (instance: CML.ConwayFormatTxOut, datumOption: CML.DatumOption) => void
```

Added in v2.0.0

## setScriptReferenceUnsafe

Unsafely calls instance.setScriptReference without Effect wrapper

**Signature**

```ts
export declare const setScriptReferenceUnsafe: (instance: CML.ConwayFormatTxOut, scriptReference: CML.Script) => void
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.ConwayFormatTxOut) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.ConwayFormatTxOut) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.ConwayFormatTxOut) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.ConwayFormatTxOut) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.ConwayFormatTxOut) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.ConwayFormatTxOut) => string
```

Added in v2.0.0

# Types

## ConwayFormatTxOut (type alias)

Type alias for the CML ConwayFormatTxOut class

**Signature**

```ts
export type ConwayFormatTxOut = CML.ConwayFormatTxOut
```

Added in v2.0.0

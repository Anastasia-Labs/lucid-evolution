---
title: CML/TransactionOutput.ts
nav_order: 237
parent: Modules
---

## TransactionOutput overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [newAlonzoFormatTxOut](#newalonzoformattxout)
  - [newConwayFormatTxOut](#newconwayformattxout)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [newAlonzoFormatTxOutUnsafe](#newalonzoformattxoutunsafe)
  - [newConwayFormatTxOutUnsafe](#newconwayformattxoutunsafe)
- [Errors](#errors)
  - [TransactionOutputError (class)](#transactionoutputerror-class)
- [Methods](#methods)
  - [address](#address)
  - [amount](#amount)
  - [asAlonzoFormatTxOut](#asalonzoformattxout)
  - [asConwayFormatTxOut](#asconwayformattxout)
  - [datum](#datum)
  - [datumHash](#datumhash)
  - [free](#free)
  - [kind](#kind)
  - [scriptRef](#scriptref)
  - [setAmount](#setamount)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [addressUnsafe](#addressunsafe)
  - [amountUnsafe](#amountunsafe)
  - [asAlonzoFormatTxOutUnsafe](#asalonzoformattxoutunsafe)
  - [asConwayFormatTxOutUnsafe](#asconwayformattxoutunsafe)
  - [datumHashUnsafe](#datumhashunsafe)
  - [datumUnsafe](#datumunsafe)
  - [freeUnsafe](#freeunsafe)
  - [kindUnsafe](#kindunsafe)
  - [scriptRefUnsafe](#scriptrefunsafe)
  - [setAmountUnsafe](#setamountunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [TransactionOutput (type alias)](#transactionoutput-type-alias)

---

# Constructors

## \_new

Static method \_new of TransactionOutput

**Signature**

```ts
export declare const _new: (
  address: CML.Address,
  amount: CML.Value,
  datumOption: CML.DatumOption,
  scriptReference: CML.Script
) => Effect.Effect<CML.TransactionOutput, TransactionOutputError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of TransactionOutput

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.TransactionOutput, TransactionOutputError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of TransactionOutput

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.TransactionOutput, TransactionOutputError>
```

Added in v2.0.0

## fromJson

Static method fromJson of TransactionOutput

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.TransactionOutput, TransactionOutputError>
```

Added in v2.0.0

## newAlonzoFormatTxOut

Static method newAlonzoFormatTxOut of TransactionOutput

**Signature**

```ts
export declare const newAlonzoFormatTxOut: (
  alonzoFormatTxOut: CML.AlonzoFormatTxOut
) => Effect.Effect<CML.TransactionOutput, TransactionOutputError>
```

Added in v2.0.0

## newConwayFormatTxOut

Static method newConwayFormatTxOut of TransactionOutput

**Signature**

```ts
export declare const newConwayFormatTxOut: (
  conwayFormatTxOut: CML.ConwayFormatTxOut
) => Effect.Effect<CML.TransactionOutput, TransactionOutputError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls TransactionOutput.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  address: CML.Address,
  amount: CML.Value,
  datumOption: CML.DatumOption,
  scriptReference: CML.Script
) => CML.TransactionOutput
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls TransactionOutput.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.TransactionOutput
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls TransactionOutput.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.TransactionOutput
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls TransactionOutput.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.TransactionOutput
```

Added in v2.0.0

## newAlonzoFormatTxOutUnsafe

Unsafely calls TransactionOutput.newAlonzoFormatTxOut without Effect wrapper

**Signature**

```ts
export declare const newAlonzoFormatTxOutUnsafe: (alonzoFormatTxOut: CML.AlonzoFormatTxOut) => CML.TransactionOutput
```

Added in v2.0.0

## newConwayFormatTxOutUnsafe

Unsafely calls TransactionOutput.newConwayFormatTxOut without Effect wrapper

**Signature**

```ts
export declare const newConwayFormatTxOutUnsafe: (conwayFormatTxOut: CML.ConwayFormatTxOut) => CML.TransactionOutput
```

Added in v2.0.0

# Errors

## TransactionOutputError (class)

Error class for TransactionOutput operations

This error is thrown when operations on TransactionOutput instances fail.

**Signature**

```ts
export declare class TransactionOutputError
```

Added in v2.0.0

# Methods

## address

Method address of TransactionOutput

**Signature**

```ts
export declare const address: (instance: CML.TransactionOutput) => Effect.Effect<CML.Address, TransactionOutputError>
```

Added in v2.0.0

## amount

Method amount of TransactionOutput

**Signature**

```ts
export declare const amount: (instance: CML.TransactionOutput) => Effect.Effect<CML.Value, TransactionOutputError>
```

Added in v2.0.0

## asAlonzoFormatTxOut

Method asAlonzoFormatTxOut of TransactionOutput

**Signature**

```ts
export declare const asAlonzoFormatTxOut: (
  instance: CML.TransactionOutput
) => Effect.Effect<CML.AlonzoFormatTxOut | undefined, TransactionOutputError>
```

Added in v2.0.0

## asConwayFormatTxOut

Method asConwayFormatTxOut of TransactionOutput

**Signature**

```ts
export declare const asConwayFormatTxOut: (
  instance: CML.TransactionOutput
) => Effect.Effect<CML.ConwayFormatTxOut | undefined, TransactionOutputError>
```

Added in v2.0.0

## datum

Method datum of TransactionOutput

**Signature**

```ts
export declare const datum: (
  instance: CML.TransactionOutput
) => Effect.Effect<CML.DatumOption | undefined, TransactionOutputError>
```

Added in v2.0.0

## datumHash

Method datumHash of TransactionOutput

**Signature**

```ts
export declare const datumHash: (
  instance: CML.TransactionOutput
) => Effect.Effect<CML.DatumHash | undefined, TransactionOutputError>
```

Added in v2.0.0

## free

Method free of TransactionOutput

**Signature**

```ts
export declare const free: (instance: CML.TransactionOutput) => Effect.Effect<void, TransactionOutputError>
```

Added in v2.0.0

## kind

Method kind of TransactionOutput

**Signature**

```ts
export declare const kind: (
  instance: CML.TransactionOutput
) => Effect.Effect<CML.TransactionOutputKind, TransactionOutputError>
```

Added in v2.0.0

## scriptRef

Method scriptRef of TransactionOutput

**Signature**

```ts
export declare const scriptRef: (
  instance: CML.TransactionOutput
) => Effect.Effect<CML.Script | undefined, TransactionOutputError>
```

Added in v2.0.0

## setAmount

Method setAmount of TransactionOutput

**Signature**

```ts
export declare const setAmount: (
  instance: CML.TransactionOutput,
  amount: CML.Value
) => Effect.Effect<void, TransactionOutputError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of TransactionOutput

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.TransactionOutput
) => Effect.Effect<Uint8Array, TransactionOutputError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of TransactionOutput

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.TransactionOutput
) => Effect.Effect<string, TransactionOutputError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of TransactionOutput

**Signature**

```ts
export declare const toCborBytes: (instance: CML.TransactionOutput) => Effect.Effect<Uint8Array, TransactionOutputError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of TransactionOutput

**Signature**

```ts
export declare const toCborHex: (instance: CML.TransactionOutput) => Effect.Effect<string, TransactionOutputError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of TransactionOutput

**Signature**

```ts
export declare const toJsValue: (instance: CML.TransactionOutput) => Effect.Effect<any, TransactionOutputError>
```

Added in v2.0.0

## toJson

Method toJson of TransactionOutput

**Signature**

```ts
export declare const toJson: (instance: CML.TransactionOutput) => Effect.Effect<string, TransactionOutputError>
```

Added in v2.0.0

# MethodsUnsafe

## addressUnsafe

Unsafely calls instance.address without Effect wrapper

**Signature**

```ts
export declare const addressUnsafe: (instance: CML.TransactionOutput) => CML.Address
```

Added in v2.0.0

## amountUnsafe

Unsafely calls instance.amount without Effect wrapper

**Signature**

```ts
export declare const amountUnsafe: (instance: CML.TransactionOutput) => CML.Value
```

Added in v2.0.0

## asAlonzoFormatTxOutUnsafe

Unsafely calls instance.asAlonzoFormatTxOut without Effect wrapper

**Signature**

```ts
export declare const asAlonzoFormatTxOutUnsafe: (instance: CML.TransactionOutput) => CML.AlonzoFormatTxOut | undefined
```

Added in v2.0.0

## asConwayFormatTxOutUnsafe

Unsafely calls instance.asConwayFormatTxOut without Effect wrapper

**Signature**

```ts
export declare const asConwayFormatTxOutUnsafe: (instance: CML.TransactionOutput) => CML.ConwayFormatTxOut | undefined
```

Added in v2.0.0

## datumHashUnsafe

Unsafely calls instance.datumHash without Effect wrapper

**Signature**

```ts
export declare const datumHashUnsafe: (instance: CML.TransactionOutput) => CML.DatumHash | undefined
```

Added in v2.0.0

## datumUnsafe

Unsafely calls instance.datum without Effect wrapper

**Signature**

```ts
export declare const datumUnsafe: (instance: CML.TransactionOutput) => CML.DatumOption | undefined
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.TransactionOutput) => void
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (instance: CML.TransactionOutput) => CML.TransactionOutputKind
```

Added in v2.0.0

## scriptRefUnsafe

Unsafely calls instance.scriptRef without Effect wrapper

**Signature**

```ts
export declare const scriptRefUnsafe: (instance: CML.TransactionOutput) => CML.Script | undefined
```

Added in v2.0.0

## setAmountUnsafe

Unsafely calls instance.setAmount without Effect wrapper

**Signature**

```ts
export declare const setAmountUnsafe: (instance: CML.TransactionOutput, amount: CML.Value) => void
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.TransactionOutput) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.TransactionOutput) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.TransactionOutput) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.TransactionOutput) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.TransactionOutput) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.TransactionOutput) => string
```

Added in v2.0.0

# Types

## TransactionOutput (type alias)

Type alias for the CML TransactionOutput class

**Signature**

```ts
export type TransactionOutput = CML.TransactionOutput
```

Added in v2.0.0

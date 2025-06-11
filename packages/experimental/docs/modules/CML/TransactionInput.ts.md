---
title: CML/TransactionInput.ts
nav_order: 232
parent: Modules
---

## TransactionInput overview

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
  - [TransactionInputError (class)](#transactioninputerror-class)
- [Methods](#methods)
  - [free](#free)
  - [index](#index)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [transactionId](#transactionid)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [indexUnsafe](#indexunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [transactionIdUnsafe](#transactionidunsafe)
- [Types](#types)
  - [TransactionInput (type alias)](#transactioninput-type-alias)

---

# Constructors

## \_new

Static method \_new of TransactionInput

**Signature**

```ts
export declare const _new: (
  transactionId: CML.TransactionHash,
  index: bigint
) => Effect.Effect<CML.TransactionInput, TransactionInputError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of TransactionInput

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.TransactionInput, TransactionInputError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of TransactionInput

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.TransactionInput, TransactionInputError>
```

Added in v2.0.0

## fromJson

Static method fromJson of TransactionInput

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.TransactionInput, TransactionInputError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls TransactionInput.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (transactionId: CML.TransactionHash, index: bigint) => CML.TransactionInput
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls TransactionInput.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.TransactionInput
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls TransactionInput.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.TransactionInput
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls TransactionInput.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.TransactionInput
```

Added in v2.0.0

# Errors

## TransactionInputError (class)

Error class for TransactionInput operations

This error is thrown when operations on TransactionInput instances fail.

**Signature**

```ts
export declare class TransactionInputError
```

Added in v2.0.0

# Methods

## free

Method free of TransactionInput

**Signature**

```ts
export declare const free: (instance: CML.TransactionInput) => Effect.Effect<void, TransactionInputError>
```

Added in v2.0.0

## index

Method index of TransactionInput

**Signature**

```ts
export declare const index: (instance: CML.TransactionInput) => Effect.Effect<bigint, TransactionInputError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of TransactionInput

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.TransactionInput
) => Effect.Effect<Uint8Array, TransactionInputError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of TransactionInput

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.TransactionInput
) => Effect.Effect<string, TransactionInputError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of TransactionInput

**Signature**

```ts
export declare const toCborBytes: (instance: CML.TransactionInput) => Effect.Effect<Uint8Array, TransactionInputError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of TransactionInput

**Signature**

```ts
export declare const toCborHex: (instance: CML.TransactionInput) => Effect.Effect<string, TransactionInputError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of TransactionInput

**Signature**

```ts
export declare const toJsValue: (instance: CML.TransactionInput) => Effect.Effect<any, TransactionInputError>
```

Added in v2.0.0

## toJson

Method toJson of TransactionInput

**Signature**

```ts
export declare const toJson: (instance: CML.TransactionInput) => Effect.Effect<string, TransactionInputError>
```

Added in v2.0.0

## transactionId

Method transactionId of TransactionInput

**Signature**

```ts
export declare const transactionId: (
  instance: CML.TransactionInput
) => Effect.Effect<CML.TransactionHash, TransactionInputError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.TransactionInput) => void
```

Added in v2.0.0

## indexUnsafe

Unsafely calls instance.index without Effect wrapper

**Signature**

```ts
export declare const indexUnsafe: (instance: CML.TransactionInput) => bigint
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.TransactionInput) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.TransactionInput) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.TransactionInput) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.TransactionInput) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.TransactionInput) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.TransactionInput) => string
```

Added in v2.0.0

## transactionIdUnsafe

Unsafely calls instance.transactionId without Effect wrapper

**Signature**

```ts
export declare const transactionIdUnsafe: (instance: CML.TransactionInput) => CML.TransactionHash
```

Added in v2.0.0

# Types

## TransactionInput (type alias)

Type alias for the CML TransactionInput class

**Signature**

```ts
export type TransactionInput = CML.TransactionInput
```

Added in v2.0.0

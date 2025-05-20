---
title: CML/TransactionUnspentOutput.ts
nav_order: 242
parent: Modules
---

## TransactionUnspentOutput overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [\_new](#_new)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [\_newUnsafe](#_newunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
- [Errors](#errors)
  - [TransactionUnspentOutputError (class)](#transactionunspentoutputerror-class)
- [Methods](#methods)
  - [free](#free)
  - [input](#input)
  - [output](#output)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [inputUnsafe](#inputunsafe)
  - [outputUnsafe](#outputunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
- [Types](#types)
  - [TransactionUnspentOutput (type alias)](#transactionunspentoutput-type-alias)

---

# Constructors

## \_new

Static method \_new of TransactionUnspentOutput

**Signature**

```ts
export declare const _new: (
  input: CML.TransactionInput,
  output: CML.TransactionOutput
) => Effect.Effect<CML.TransactionUnspentOutput, TransactionUnspentOutputError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of TransactionUnspentOutput

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.TransactionUnspentOutput, TransactionUnspentOutputError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of TransactionUnspentOutput

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string
) => Effect.Effect<CML.TransactionUnspentOutput, TransactionUnspentOutputError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls TransactionUnspentOutput.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  input: CML.TransactionInput,
  output: CML.TransactionOutput
) => CML.TransactionUnspentOutput
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls TransactionUnspentOutput.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.TransactionUnspentOutput
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls TransactionUnspentOutput.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.TransactionUnspentOutput
```

Added in v2.0.0

# Errors

## TransactionUnspentOutputError (class)

Error class for TransactionUnspentOutput operations

This error is thrown when operations on TransactionUnspentOutput instances fail.

**Signature**

```ts
export declare class TransactionUnspentOutputError
```

Added in v2.0.0

# Methods

## free

Method free of TransactionUnspentOutput

**Signature**

```ts
export declare const free: (
  instance: CML.TransactionUnspentOutput
) => Effect.Effect<void, TransactionUnspentOutputError>
```

Added in v2.0.0

## input

Method input of TransactionUnspentOutput

**Signature**

```ts
export declare const input: (
  instance: CML.TransactionUnspentOutput
) => Effect.Effect<CML.TransactionInput, TransactionUnspentOutputError>
```

Added in v2.0.0

## output

Method output of TransactionUnspentOutput

**Signature**

```ts
export declare const output: (
  instance: CML.TransactionUnspentOutput
) => Effect.Effect<CML.TransactionOutput, TransactionUnspentOutputError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of TransactionUnspentOutput

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.TransactionUnspentOutput
) => Effect.Effect<Uint8Array, TransactionUnspentOutputError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of TransactionUnspentOutput

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.TransactionUnspentOutput
) => Effect.Effect<string, TransactionUnspentOutputError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.TransactionUnspentOutput) => void
```

Added in v2.0.0

## inputUnsafe

Unsafely calls instance.input without Effect wrapper

**Signature**

```ts
export declare const inputUnsafe: (instance: CML.TransactionUnspentOutput) => CML.TransactionInput
```

Added in v2.0.0

## outputUnsafe

Unsafely calls instance.output without Effect wrapper

**Signature**

```ts
export declare const outputUnsafe: (instance: CML.TransactionUnspentOutput) => CML.TransactionOutput
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.TransactionUnspentOutput) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.TransactionUnspentOutput) => string
```

Added in v2.0.0

# Types

## TransactionUnspentOutput (type alias)

Type alias for the CML TransactionUnspentOutput class

**Signature**

```ts
export type TransactionUnspentOutput = CML.TransactionUnspentOutput
```

Added in v2.0.0

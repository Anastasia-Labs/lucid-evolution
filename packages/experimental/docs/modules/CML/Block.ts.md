---
title: CML/Block.ts
nav_order: 24
parent: Modules
---

## Block overview

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
  - [BlockError (class)](#blockerror-class)
- [Methods](#methods)
  - [auxiliaryDataSet](#auxiliarydataset)
  - [free](#free)
  - [header](#header)
  - [invalidTransactions](#invalidtransactions)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [transactionBodies](#transactionbodies)
  - [transactionWitnessSets](#transactionwitnesssets)
- [MethodsUnsafe](#methodsunsafe)
  - [auxiliaryDataSetUnsafe](#auxiliarydatasetunsafe)
  - [freeUnsafe](#freeunsafe)
  - [headerUnsafe](#headerunsafe)
  - [invalidTransactionsUnsafe](#invalidtransactionsunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [transactionBodiesUnsafe](#transactionbodiesunsafe)
  - [transactionWitnessSetsUnsafe](#transactionwitnesssetsunsafe)
- [Types](#types)
  - [Block (type alias)](#block-type-alias)

---

# Constructors

## \_new

Static method \_new of Block

**Signature**

```ts
export declare const _new: (
  header: CML.Header,
  transactionBodies: CML.TransactionBodyList,
  transactionWitnessSets: CML.TransactionWitnessSetList,
  auxiliaryDataSet: CML.MapTransactionIndexToAuxiliaryData,
  invalidTransactions: Uint16Array,
) => Effect.Effect<CML.Block, BlockError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of Block

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Block, BlockError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Block

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Block, BlockError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of Block

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.Block, BlockError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls Block.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  header: CML.Header,
  transactionBodies: CML.TransactionBodyList,
  transactionWitnessSets: CML.TransactionWitnessSetList,
  auxiliaryDataSet: CML.MapTransactionIndexToAuxiliaryData,
  invalidTransactions: Uint16Array,
) => CML.Block;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls Block.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.Block;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Block.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Block;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Block.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Block;
```

Added in v2.0.0

# Errors

## BlockError (class)

Error class for Block operations

This error is thrown when operations on Block instances fail.

**Signature**

```ts
export declare class BlockError
```

Added in v2.0.0

# Methods

## auxiliaryDataSet

Method auxiliaryDataSet of Block

**Signature**

```ts
export declare const auxiliaryDataSet: (
  instance: CML.Block,
) => Effect.Effect<CML.MapTransactionIndexToAuxiliaryData, BlockError>;
```

Added in v2.0.0

## free

Method free of Block

**Signature**

```ts
export declare const free: (
  instance: CML.Block,
) => Effect.Effect<void, BlockError>;
```

Added in v2.0.0

## header

Method header of Block

**Signature**

```ts
export declare const header: (
  instance: CML.Block,
) => Effect.Effect<CML.Header, BlockError>;
```

Added in v2.0.0

## invalidTransactions

Method invalidTransactions of Block

**Signature**

```ts
export declare const invalidTransactions: (
  instance: CML.Block,
) => Effect.Effect<Uint16Array, BlockError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Block

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.Block,
) => Effect.Effect<Uint8Array, BlockError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Block

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.Block,
) => Effect.Effect<string, BlockError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Block

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.Block,
) => Effect.Effect<Uint8Array, BlockError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of Block

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.Block,
) => Effect.Effect<string, BlockError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of Block

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.Block,
) => Effect.Effect<any, BlockError>;
```

Added in v2.0.0

## toJson

Method toJson of Block

**Signature**

```ts
export declare const toJson: (
  instance: CML.Block,
) => Effect.Effect<string, BlockError>;
```

Added in v2.0.0

## transactionBodies

Method transactionBodies of Block

**Signature**

```ts
export declare const transactionBodies: (
  instance: CML.Block,
) => Effect.Effect<CML.TransactionBodyList, BlockError>;
```

Added in v2.0.0

## transactionWitnessSets

Method transactionWitnessSets of Block

**Signature**

```ts
export declare const transactionWitnessSets: (
  instance: CML.Block,
) => Effect.Effect<CML.TransactionWitnessSetList, BlockError>;
```

Added in v2.0.0

# MethodsUnsafe

## auxiliaryDataSetUnsafe

Unsafely calls instance.auxiliaryDataSet without Effect wrapper

**Signature**

```ts
export declare const auxiliaryDataSetUnsafe: (
  instance: CML.Block,
) => CML.MapTransactionIndexToAuxiliaryData;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Block) => void;
```

Added in v2.0.0

## headerUnsafe

Unsafely calls instance.header without Effect wrapper

**Signature**

```ts
export declare const headerUnsafe: (instance: CML.Block) => CML.Header;
```

Added in v2.0.0

## invalidTransactionsUnsafe

Unsafely calls instance.invalidTransactions without Effect wrapper

**Signature**

```ts
export declare const invalidTransactionsUnsafe: (
  instance: CML.Block,
) => Uint16Array;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.Block,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.Block) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.Block) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Block) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Block) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Block) => string;
```

Added in v2.0.0

## transactionBodiesUnsafe

Unsafely calls instance.transactionBodies without Effect wrapper

**Signature**

```ts
export declare const transactionBodiesUnsafe: (
  instance: CML.Block,
) => CML.TransactionBodyList;
```

Added in v2.0.0

## transactionWitnessSetsUnsafe

Unsafely calls instance.transactionWitnessSets without Effect wrapper

**Signature**

```ts
export declare const transactionWitnessSetsUnsafe: (
  instance: CML.Block,
) => CML.TransactionWitnessSetList;
```

Added in v2.0.0

# Types

## Block (type alias)

Type alias for the CML Block class

**Signature**

```ts
export type Block = CML.Block;
```

Added in v2.0.0

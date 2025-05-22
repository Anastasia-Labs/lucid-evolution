---
title: CML/Transaction.ts
nav_order: 226
parent: Modules
---

## Transaction overview

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
  - [TransactionError (class)](#transactionerror-class)
- [Methods](#methods)
  - [auxiliaryData](#auxiliarydata)
  - [body](#body)
  - [free](#free)
  - [isValid](#isvalid)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [witnessSet](#witnessset)
- [MethodsUnsafe](#methodsunsafe)
  - [auxiliaryDataUnsafe](#auxiliarydataunsafe)
  - [bodyUnsafe](#bodyunsafe)
  - [freeUnsafe](#freeunsafe)
  - [isValidUnsafe](#isvalidunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [witnessSetUnsafe](#witnesssetunsafe)
- [Types](#types)
  - [Transaction (type alias)](#transaction-type-alias)

---

# Constructors

## \_new

Static method \_new of Transaction

**Signature**

```ts
export declare const _new: (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSet,
  isValid: boolean,
  auxiliaryData: CML.AuxiliaryData,
) => Effect.Effect<CML.Transaction, TransactionError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of Transaction

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Transaction, TransactionError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Transaction

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Transaction, TransactionError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of Transaction

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.Transaction, TransactionError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls Transaction.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  body: CML.TransactionBody,
  witnessSet: CML.TransactionWitnessSet,
  isValid: boolean,
  auxiliaryData: CML.AuxiliaryData,
) => CML.Transaction;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls Transaction.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.Transaction;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Transaction.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Transaction;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Transaction.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Transaction;
```

Added in v2.0.0

# Errors

## TransactionError (class)

Error class for Transaction operations

This error is thrown when operations on Transaction instances fail.

**Signature**

```ts
export declare class TransactionError
```

Added in v2.0.0

# Methods

## auxiliaryData

Method auxiliaryData of Transaction

**Signature**

```ts
export declare const auxiliaryData: (
  instance: CML.Transaction,
) => Effect.Effect<CML.AuxiliaryData | undefined, TransactionError>;
```

Added in v2.0.0

## body

Method body of Transaction

**Signature**

```ts
export declare const body: (
  instance: CML.Transaction,
) => Effect.Effect<CML.TransactionBody, TransactionError>;
```

Added in v2.0.0

## free

Method free of Transaction

**Signature**

```ts
export declare const free: (
  instance: CML.Transaction,
) => Effect.Effect<void, TransactionError>;
```

Added in v2.0.0

## isValid

Method isValid of Transaction

**Signature**

```ts
export declare const isValid: (
  instance: CML.Transaction,
) => Effect.Effect<boolean, TransactionError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Transaction

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.Transaction,
) => Effect.Effect<Uint8Array, TransactionError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Transaction

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.Transaction,
) => Effect.Effect<string, TransactionError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Transaction

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.Transaction,
) => Effect.Effect<Uint8Array, TransactionError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of Transaction

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.Transaction,
) => Effect.Effect<string, TransactionError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of Transaction

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.Transaction,
) => Effect.Effect<any, TransactionError>;
```

Added in v2.0.0

## toJson

Method toJson of Transaction

**Signature**

```ts
export declare const toJson: (
  instance: CML.Transaction,
) => Effect.Effect<string, TransactionError>;
```

Added in v2.0.0

## witnessSet

Method witnessSet of Transaction

**Signature**

```ts
export declare const witnessSet: (
  instance: CML.Transaction,
) => Effect.Effect<CML.TransactionWitnessSet, TransactionError>;
```

Added in v2.0.0

# MethodsUnsafe

## auxiliaryDataUnsafe

Unsafely calls instance.auxiliaryData without Effect wrapper

**Signature**

```ts
export declare const auxiliaryDataUnsafe: (
  instance: CML.Transaction,
) => CML.AuxiliaryData | undefined;
```

Added in v2.0.0

## bodyUnsafe

Unsafely calls instance.body without Effect wrapper

**Signature**

```ts
export declare const bodyUnsafe: (
  instance: CML.Transaction,
) => CML.TransactionBody;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Transaction) => void;
```

Added in v2.0.0

## isValidUnsafe

Unsafely calls instance.isValid without Effect wrapper

**Signature**

```ts
export declare const isValidUnsafe: (instance: CML.Transaction) => boolean;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.Transaction,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.Transaction,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.Transaction,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Transaction) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Transaction) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Transaction) => string;
```

Added in v2.0.0

## witnessSetUnsafe

Unsafely calls instance.witnessSet without Effect wrapper

**Signature**

```ts
export declare const witnessSetUnsafe: (
  instance: CML.Transaction,
) => CML.TransactionWitnessSet;
```

Added in v2.0.0

# Types

## Transaction (type alias)

Type alias for the CML Transaction class

**Signature**

```ts
export type Transaction = CML.Transaction;
```

Added in v2.0.0

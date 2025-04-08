---
title: CML/ByronTxOut.ts
nav_order: 24
parent: Modules
---

## ByronTxOut overview

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
  - [ByronTxOutError (class)](#byrontxouterror-class)
- [Methods](#methods)
  - [address](#address)
  - [amount](#amount)
  - [free](#free)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
- [MethodsUnsafe](#methodsunsafe)
  - [addressUnsafe](#addressunsafe)
  - [amountUnsafe](#amountunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
- [Types](#types)
  - [ByronTxOut (type alias)](#byrontxout-type-alias)

---

# Constructors

## \_new

Static method \_new of ByronTxOut

**Signature**

```ts
export declare const _new: (
  address: CML.ByronAddress,
  amount: bigint,
) => Effect.Effect<CML.ByronTxOut, ByronTxOutError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ByronTxOut

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ByronTxOut, ByronTxOutError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ByronTxOut

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ByronTxOut, ByronTxOutError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ByronTxOut.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  address: CML.ByronAddress,
  amount: bigint,
) => CML.ByronTxOut;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ByronTxOut.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.ByronTxOut;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ByronTxOut.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.ByronTxOut;
```

Added in v2.0.0

# Errors

## ByronTxOutError (class)

Error class for ByronTxOut operations

This error is thrown when operations on ByronTxOut instances fail.

**Signature**

```ts
export declare class ByronTxOutError
```

Added in v2.0.0

# Methods

## address

Method address of ByronTxOut

**Signature**

```ts
export declare const address: (
  instance: CML.ByronTxOut,
) => Effect.Effect<CML.ByronAddress, ByronTxOutError>;
```

Added in v2.0.0

## amount

Method amount of ByronTxOut

**Signature**

```ts
export declare const amount: (
  instance: CML.ByronTxOut,
) => Effect.Effect<bigint, ByronTxOutError>;
```

Added in v2.0.0

## free

Method free of ByronTxOut

**Signature**

```ts
export declare const free: (
  instance: CML.ByronTxOut,
) => Effect.Effect<void, ByronTxOutError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ByronTxOut

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.ByronTxOut,
) => Effect.Effect<Uint8Array, ByronTxOutError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of ByronTxOut

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.ByronTxOut,
) => Effect.Effect<string, ByronTxOutError>;
```

Added in v2.0.0

# MethodsUnsafe

## addressUnsafe

Unsafely calls instance.address without Effect wrapper

**Signature**

```ts
export declare const addressUnsafe: (
  instance: CML.ByronTxOut,
) => CML.ByronAddress;
```

Added in v2.0.0

## amountUnsafe

Unsafely calls instance.amount without Effect wrapper

**Signature**

```ts
export declare const amountUnsafe: (instance: CML.ByronTxOut) => bigint;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ByronTxOut) => void;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.ByronTxOut,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.ByronTxOut) => string;
```

Added in v2.0.0

# Types

## ByronTxOut (type alias)

Type alias for the CML ByronTxOut class

**Signature**

```ts
export type ByronTxOut = CML.ByronTxOut;
```

Added in v2.0.0

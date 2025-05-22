---
title: CML/GovActionId.ts
nav_order: 104
parent: Modules
---

## GovActionId overview

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
  - [GovActionIdError (class)](#govactioniderror-class)
- [Methods](#methods)
  - [free](#free)
  - [govActionIndex](#govactionindex)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [transactionId](#transactionid)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [govActionIndexUnsafe](#govactionindexunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [transactionIdUnsafe](#transactionidunsafe)
- [Types](#types)
  - [GovActionId (type alias)](#govactionid-type-alias)

---

# Constructors

## \_new

Static method \_new of GovActionId

**Signature**

```ts
export declare const _new: (
  transactionId: CML.TransactionHash,
  govActionIndex: bigint,
) => Effect.Effect<CML.GovActionId, GovActionIdError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of GovActionId

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.GovActionId, GovActionIdError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of GovActionId

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.GovActionId, GovActionIdError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of GovActionId

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.GovActionId, GovActionIdError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls GovActionId.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  transactionId: CML.TransactionHash,
  govActionIndex: bigint,
) => CML.GovActionId;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls GovActionId.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.GovActionId;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls GovActionId.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.GovActionId;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls GovActionId.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.GovActionId;
```

Added in v2.0.0

# Errors

## GovActionIdError (class)

Error class for GovActionId operations

This error is thrown when operations on GovActionId instances fail.

**Signature**

```ts
export declare class GovActionIdError
```

Added in v2.0.0

# Methods

## free

Method free of GovActionId

**Signature**

```ts
export declare const free: (
  instance: CML.GovActionId,
) => Effect.Effect<void, GovActionIdError>;
```

Added in v2.0.0

## govActionIndex

Method govActionIndex of GovActionId

**Signature**

```ts
export declare const govActionIndex: (
  instance: CML.GovActionId,
) => Effect.Effect<bigint, GovActionIdError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of GovActionId

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.GovActionId,
) => Effect.Effect<Uint8Array, GovActionIdError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of GovActionId

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.GovActionId,
) => Effect.Effect<string, GovActionIdError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of GovActionId

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.GovActionId,
) => Effect.Effect<Uint8Array, GovActionIdError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of GovActionId

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.GovActionId,
) => Effect.Effect<string, GovActionIdError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of GovActionId

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.GovActionId,
) => Effect.Effect<any, GovActionIdError>;
```

Added in v2.0.0

## toJson

Method toJson of GovActionId

**Signature**

```ts
export declare const toJson: (
  instance: CML.GovActionId,
) => Effect.Effect<string, GovActionIdError>;
```

Added in v2.0.0

## transactionId

Method transactionId of GovActionId

**Signature**

```ts
export declare const transactionId: (
  instance: CML.GovActionId,
) => Effect.Effect<CML.TransactionHash, GovActionIdError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.GovActionId) => void;
```

Added in v2.0.0

## govActionIndexUnsafe

Unsafely calls instance.govActionIndex without Effect wrapper

**Signature**

```ts
export declare const govActionIndexUnsafe: (
  instance: CML.GovActionId,
) => bigint;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.GovActionId,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.GovActionId,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.GovActionId,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.GovActionId) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.GovActionId) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.GovActionId) => string;
```

Added in v2.0.0

## transactionIdUnsafe

Unsafely calls instance.transactionId without Effect wrapper

**Signature**

```ts
export declare const transactionIdUnsafe: (
  instance: CML.GovActionId,
) => CML.TransactionHash;
```

Added in v2.0.0

# Types

## GovActionId (type alias)

Type alias for the CML GovActionId class

**Signature**

```ts
export type GovActionId = CML.GovActionId;
```

Added in v2.0.0

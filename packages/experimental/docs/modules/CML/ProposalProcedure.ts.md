---
title: CML/ProposalProcedure.ts
nav_order: 177
parent: Modules
---

## ProposalProcedure overview

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
  - [ProposalProcedureError (class)](#proposalprocedureerror-class)
- [Methods](#methods)
  - [anchor](#anchor)
  - [deposit](#deposit)
  - [free](#free)
  - [govAction](#govaction)
  - [rewardAccount](#rewardaccount)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [anchorUnsafe](#anchorunsafe)
  - [depositUnsafe](#depositunsafe)
  - [freeUnsafe](#freeunsafe)
  - [govActionUnsafe](#govactionunsafe)
  - [rewardAccountUnsafe](#rewardaccountunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [ProposalProcedure (type alias)](#proposalprocedure-type-alias)

---

# Constructors

## \_new

Static method \_new of ProposalProcedure

**Signature**

```ts
export declare const _new: (
  deposit: bigint,
  rewardAccount: CML.RewardAddress,
  govAction: CML.GovAction,
  anchor: CML.Anchor,
) => Effect.Effect<CML.ProposalProcedure, ProposalProcedureError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ProposalProcedure

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.ProposalProcedure, ProposalProcedureError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ProposalProcedure

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.ProposalProcedure, ProposalProcedureError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of ProposalProcedure

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.ProposalProcedure, ProposalProcedureError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ProposalProcedure.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  deposit: bigint,
  rewardAccount: CML.RewardAddress,
  govAction: CML.GovAction,
  anchor: CML.Anchor,
) => CML.ProposalProcedure;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ProposalProcedure.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.ProposalProcedure;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ProposalProcedure.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.ProposalProcedure;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ProposalProcedure.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ProposalProcedure;
```

Added in v2.0.0

# Errors

## ProposalProcedureError (class)

Error class for ProposalProcedure operations

This error is thrown when operations on ProposalProcedure instances fail.

**Signature**

```ts
export declare class ProposalProcedureError
```

Added in v2.0.0

# Methods

## anchor

Method anchor of ProposalProcedure

**Signature**

```ts
export declare const anchor: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<CML.Anchor, ProposalProcedureError>;
```

Added in v2.0.0

## deposit

Method deposit of ProposalProcedure

**Signature**

```ts
export declare const deposit: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<bigint, ProposalProcedureError>;
```

Added in v2.0.0

## free

Method free of ProposalProcedure

**Signature**

```ts
export declare const free: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<void, ProposalProcedureError>;
```

Added in v2.0.0

## govAction

Method govAction of ProposalProcedure

**Signature**

```ts
export declare const govAction: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<CML.GovAction, ProposalProcedureError>;
```

Added in v2.0.0

## rewardAccount

Method rewardAccount of ProposalProcedure

**Signature**

```ts
export declare const rewardAccount: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<CML.RewardAddress, ProposalProcedureError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ProposalProcedure

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<Uint8Array, ProposalProcedureError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ProposalProcedure

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<string, ProposalProcedureError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ProposalProcedure

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<Uint8Array, ProposalProcedureError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of ProposalProcedure

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<string, ProposalProcedureError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of ProposalProcedure

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<any, ProposalProcedureError>;
```

Added in v2.0.0

## toJson

Method toJson of ProposalProcedure

**Signature**

```ts
export declare const toJson: (
  instance: CML.ProposalProcedure,
) => Effect.Effect<string, ProposalProcedureError>;
```

Added in v2.0.0

# MethodsUnsafe

## anchorUnsafe

Unsafely calls instance.anchor without Effect wrapper

**Signature**

```ts
export declare const anchorUnsafe: (
  instance: CML.ProposalProcedure,
) => CML.Anchor;
```

Added in v2.0.0

## depositUnsafe

Unsafely calls instance.deposit without Effect wrapper

**Signature**

```ts
export declare const depositUnsafe: (instance: CML.ProposalProcedure) => bigint;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ProposalProcedure) => void;
```

Added in v2.0.0

## govActionUnsafe

Unsafely calls instance.govAction without Effect wrapper

**Signature**

```ts
export declare const govActionUnsafe: (
  instance: CML.ProposalProcedure,
) => CML.GovAction;
```

Added in v2.0.0

## rewardAccountUnsafe

Unsafely calls instance.rewardAccount without Effect wrapper

**Signature**

```ts
export declare const rewardAccountUnsafe: (
  instance: CML.ProposalProcedure,
) => CML.RewardAddress;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.ProposalProcedure,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.ProposalProcedure,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.ProposalProcedure,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.ProposalProcedure,
) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.ProposalProcedure) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.ProposalProcedure) => string;
```

Added in v2.0.0

# Types

## ProposalProcedure (type alias)

Type alias for the CML ProposalProcedure class

**Signature**

```ts
export type ProposalProcedure = CML.ProposalProcedure;
```

Added in v2.0.0

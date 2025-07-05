---
title: CML/CIP36Delegation.ts
nav_order: 43
parent: Modules
---

## CIP36Delegation overview

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
  - [CIP36DelegationError (class)](#cip36delegationerror-class)
- [Methods](#methods)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [votingPubKey](#votingpubkey)
  - [weight](#weight)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [votingPubKeyUnsafe](#votingpubkeyunsafe)
  - [weightUnsafe](#weightunsafe)
- [Types](#types)
  - [CIP36Delegation (type alias)](#cip36delegation-type-alias)

---

# Constructors

## \_new

Static method \_new of CIP36Delegation

**Signature**

```ts
export declare const _new: (
  votingPubKey: CML.PublicKey,
  weight: number,
) => Effect.Effect<CML.CIP36Delegation, CIP36DelegationError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of CIP36Delegation

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.CIP36Delegation, CIP36DelegationError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of CIP36Delegation

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.CIP36Delegation, CIP36DelegationError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of CIP36Delegation

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.CIP36Delegation, CIP36DelegationError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls CIP36Delegation.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  votingPubKey: CML.PublicKey,
  weight: number,
) => CML.CIP36Delegation;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls CIP36Delegation.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.CIP36Delegation;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls CIP36Delegation.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.CIP36Delegation;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls CIP36Delegation.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.CIP36Delegation;
```

Added in v2.0.0

# Errors

## CIP36DelegationError (class)

Error class for CIP36Delegation operations

This error is thrown when operations on CIP36Delegation instances fail.

**Signature**

```ts
export declare class CIP36DelegationError
```

Added in v2.0.0

# Methods

## free

Method free of CIP36Delegation

**Signature**

```ts
export declare const free: (
  instance: CML.CIP36Delegation,
) => Effect.Effect<void, CIP36DelegationError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of CIP36Delegation

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.CIP36Delegation,
) => Effect.Effect<Uint8Array, CIP36DelegationError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of CIP36Delegation

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.CIP36Delegation,
) => Effect.Effect<string, CIP36DelegationError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of CIP36Delegation

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.CIP36Delegation,
) => Effect.Effect<Uint8Array, CIP36DelegationError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of CIP36Delegation

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.CIP36Delegation,
) => Effect.Effect<string, CIP36DelegationError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of CIP36Delegation

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.CIP36Delegation,
) => Effect.Effect<any, CIP36DelegationError>;
```

Added in v2.0.0

## toJson

Method toJson of CIP36Delegation

**Signature**

```ts
export declare const toJson: (
  instance: CML.CIP36Delegation,
) => Effect.Effect<string, CIP36DelegationError>;
```

Added in v2.0.0

## votingPubKey

Method votingPubKey of CIP36Delegation

**Signature**

```ts
export declare const votingPubKey: (
  instance: CML.CIP36Delegation,
) => Effect.Effect<CML.PublicKey, CIP36DelegationError>;
```

Added in v2.0.0

## weight

Method weight of CIP36Delegation

**Signature**

```ts
export declare const weight: (
  instance: CML.CIP36Delegation,
) => Effect.Effect<number, CIP36DelegationError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.CIP36Delegation) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.CIP36Delegation,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.CIP36Delegation,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.CIP36Delegation,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.CIP36Delegation) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.CIP36Delegation) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.CIP36Delegation) => string;
```

Added in v2.0.0

## votingPubKeyUnsafe

Unsafely calls instance.votingPubKey without Effect wrapper

**Signature**

```ts
export declare const votingPubKeyUnsafe: (
  instance: CML.CIP36Delegation,
) => CML.PublicKey;
```

Added in v2.0.0

## weightUnsafe

Unsafely calls instance.weight without Effect wrapper

**Signature**

```ts
export declare const weightUnsafe: (instance: CML.CIP36Delegation) => number;
```

Added in v2.0.0

# Types

## CIP36Delegation (type alias)

Type alias for the CML CIP36Delegation class

**Signature**

```ts
export type CIP36Delegation = CML.CIP36Delegation;
```

Added in v2.0.0

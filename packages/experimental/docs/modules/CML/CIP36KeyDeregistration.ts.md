---
title: CML/CIP36KeyDeregistration.ts
nav_order: 47
parent: Modules
---

## CIP36KeyDeregistration overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
- [Errors](#errors)
  - [CIP36KeyDeregistrationError (class)](#cip36keyderegistrationerror-class)
- [Methods](#methods)
  - [free](#free)
  - [nonce](#nonce)
  - [setVotingPurpose](#setvotingpurpose)
  - [stakeCredential](#stakecredential)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
  - [votingPurpose](#votingpurpose)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [nonceUnsafe](#nonceunsafe)
  - [setVotingPurposeUnsafe](#setvotingpurposeunsafe)
  - [stakeCredentialUnsafe](#stakecredentialunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
  - [votingPurposeUnsafe](#votingpurposeunsafe)
- [Types](#types)
  - [CIP36KeyDeregistration (type alias)](#cip36keyderegistration-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of CIP36KeyDeregistration

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.CIP36KeyDeregistration, CIP36KeyDeregistrationError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of CIP36KeyDeregistration

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.CIP36KeyDeregistration, CIP36KeyDeregistrationError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of CIP36KeyDeregistration

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.CIP36KeyDeregistration, CIP36KeyDeregistrationError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls CIP36KeyDeregistration.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.CIP36KeyDeregistration;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls CIP36KeyDeregistration.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.CIP36KeyDeregistration;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls CIP36KeyDeregistration.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (
  json: string,
) => CML.CIP36KeyDeregistration;
```

Added in v2.0.0

# Errors

## CIP36KeyDeregistrationError (class)

Error class for CIP36KeyDeregistration operations

This error is thrown when operations on CIP36KeyDeregistration instances fail.

**Signature**

```ts
export declare class CIP36KeyDeregistrationError
```

Added in v2.0.0

# Methods

## free

Method free of CIP36KeyDeregistration

**Signature**

```ts
export declare const free: (
  instance: CML.CIP36KeyDeregistration,
) => Effect.Effect<void, CIP36KeyDeregistrationError>;
```

Added in v2.0.0

## nonce

Method nonce of CIP36KeyDeregistration

**Signature**

```ts
export declare const nonce: (
  instance: CML.CIP36KeyDeregistration,
) => Effect.Effect<bigint, CIP36KeyDeregistrationError>;
```

Added in v2.0.0

## setVotingPurpose

Method setVotingPurpose of CIP36KeyDeregistration

**Signature**

```ts
export declare const setVotingPurpose: (
  instance: CML.CIP36KeyDeregistration,
  votingPurpose: bigint,
) => Effect.Effect<void, CIP36KeyDeregistrationError>;
```

Added in v2.0.0

## stakeCredential

Method stakeCredential of CIP36KeyDeregistration

**Signature**

```ts
export declare const stakeCredential: (
  instance: CML.CIP36KeyDeregistration,
) => Effect.Effect<CML.PublicKey, CIP36KeyDeregistrationError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of CIP36KeyDeregistration

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.CIP36KeyDeregistration,
) => Effect.Effect<Uint8Array, CIP36KeyDeregistrationError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of CIP36KeyDeregistration

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.CIP36KeyDeregistration,
) => Effect.Effect<string, CIP36KeyDeregistrationError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of CIP36KeyDeregistration

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.CIP36KeyDeregistration,
) => Effect.Effect<Uint8Array, CIP36KeyDeregistrationError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of CIP36KeyDeregistration

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.CIP36KeyDeregistration,
) => Effect.Effect<string, CIP36KeyDeregistrationError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of CIP36KeyDeregistration

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.CIP36KeyDeregistration,
) => Effect.Effect<any, CIP36KeyDeregistrationError>;
```

Added in v2.0.0

## toJson

Method toJson of CIP36KeyDeregistration

**Signature**

```ts
export declare const toJson: (
  instance: CML.CIP36KeyDeregistration,
) => Effect.Effect<string, CIP36KeyDeregistrationError>;
```

Added in v2.0.0

## votingPurpose

Method votingPurpose of CIP36KeyDeregistration

**Signature**

```ts
export declare const votingPurpose: (
  instance: CML.CIP36KeyDeregistration,
) => Effect.Effect<bigint, CIP36KeyDeregistrationError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.CIP36KeyDeregistration) => void;
```

Added in v2.0.0

## nonceUnsafe

Unsafely calls instance.nonce without Effect wrapper

**Signature**

```ts
export declare const nonceUnsafe: (
  instance: CML.CIP36KeyDeregistration,
) => bigint;
```

Added in v2.0.0

## setVotingPurposeUnsafe

Unsafely calls instance.setVotingPurpose without Effect wrapper

**Signature**

```ts
export declare const setVotingPurposeUnsafe: (
  instance: CML.CIP36KeyDeregistration,
  votingPurpose: bigint,
) => void;
```

Added in v2.0.0

## stakeCredentialUnsafe

Unsafely calls instance.stakeCredential without Effect wrapper

**Signature**

```ts
export declare const stakeCredentialUnsafe: (
  instance: CML.CIP36KeyDeregistration,
) => CML.PublicKey;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.CIP36KeyDeregistration,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.CIP36KeyDeregistration,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.CIP36KeyDeregistration,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.CIP36KeyDeregistration,
) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (
  instance: CML.CIP36KeyDeregistration,
) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (
  instance: CML.CIP36KeyDeregistration,
) => string;
```

Added in v2.0.0

## votingPurposeUnsafe

Unsafely calls instance.votingPurpose without Effect wrapper

**Signature**

```ts
export declare const votingPurposeUnsafe: (
  instance: CML.CIP36KeyDeregistration,
) => bigint;
```

Added in v2.0.0

# Types

## CIP36KeyDeregistration (type alias)

Type alias for the CML CIP36KeyDeregistration class

**Signature**

```ts
export type CIP36KeyDeregistration = CML.CIP36KeyDeregistration;
```

Added in v2.0.0

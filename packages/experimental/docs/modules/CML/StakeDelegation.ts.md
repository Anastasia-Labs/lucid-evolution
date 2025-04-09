---
title: CML/StakeDelegation.ts
nav_order: 213
parent: Modules
---

## StakeDelegation overview

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
  - [StakeDelegationError (class)](#stakedelegationerror-class)
- [Methods](#methods)
  - [free](#free)
  - [pool](#pool)
  - [stakeCredential](#stakecredential)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [poolUnsafe](#poolunsafe)
  - [stakeCredentialUnsafe](#stakecredentialunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [StakeDelegation (type alias)](#stakedelegation-type-alias)

---

# Constructors

## \_new

Static method \_new of StakeDelegation

**Signature**

```ts
export declare const _new: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
) => Effect.Effect<CML.StakeDelegation, StakeDelegationError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of StakeDelegation

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.StakeDelegation, StakeDelegationError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of StakeDelegation

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.StakeDelegation, StakeDelegationError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of StakeDelegation

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.StakeDelegation, StakeDelegationError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls StakeDelegation.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
) => CML.StakeDelegation;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls StakeDelegation.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.StakeDelegation;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls StakeDelegation.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.StakeDelegation;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls StakeDelegation.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.StakeDelegation;
```

Added in v2.0.0

# Errors

## StakeDelegationError (class)

Error class for StakeDelegation operations

This error is thrown when operations on StakeDelegation instances fail.

**Signature**

```ts
export declare class StakeDelegationError
```

Added in v2.0.0

# Methods

## free

Method free of StakeDelegation

**Signature**

```ts
export declare const free: (
  instance: CML.StakeDelegation,
) => Effect.Effect<void, StakeDelegationError>;
```

Added in v2.0.0

## pool

Method pool of StakeDelegation

**Signature**

```ts
export declare const pool: (
  instance: CML.StakeDelegation,
) => Effect.Effect<CML.Ed25519KeyHash, StakeDelegationError>;
```

Added in v2.0.0

## stakeCredential

Method stakeCredential of StakeDelegation

**Signature**

```ts
export declare const stakeCredential: (
  instance: CML.StakeDelegation,
) => Effect.Effect<CML.Credential, StakeDelegationError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of StakeDelegation

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.StakeDelegation,
) => Effect.Effect<Uint8Array, StakeDelegationError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of StakeDelegation

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.StakeDelegation,
) => Effect.Effect<string, StakeDelegationError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of StakeDelegation

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.StakeDelegation,
) => Effect.Effect<Uint8Array, StakeDelegationError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of StakeDelegation

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.StakeDelegation,
) => Effect.Effect<string, StakeDelegationError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of StakeDelegation

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.StakeDelegation,
) => Effect.Effect<any, StakeDelegationError>;
```

Added in v2.0.0

## toJson

Method toJson of StakeDelegation

**Signature**

```ts
export declare const toJson: (
  instance: CML.StakeDelegation,
) => Effect.Effect<string, StakeDelegationError>;
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.StakeDelegation) => void;
```

Added in v2.0.0

## poolUnsafe

Unsafely calls instance.pool without Effect wrapper

**Signature**

```ts
export declare const poolUnsafe: (
  instance: CML.StakeDelegation,
) => CML.Ed25519KeyHash;
```

Added in v2.0.0

## stakeCredentialUnsafe

Unsafely calls instance.stakeCredential without Effect wrapper

**Signature**

```ts
export declare const stakeCredentialUnsafe: (
  instance: CML.StakeDelegation,
) => CML.Credential;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.StakeDelegation,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.StakeDelegation,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.StakeDelegation,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.StakeDelegation) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.StakeDelegation) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.StakeDelegation) => string;
```

Added in v2.0.0

# Types

## StakeDelegation (type alias)

Type alias for the CML StakeDelegation class

**Signature**

```ts
export type StakeDelegation = CML.StakeDelegation;
```

Added in v2.0.0

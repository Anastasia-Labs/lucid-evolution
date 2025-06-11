---
title: CML/StakeVoteRegDelegCert.ts
nav_order: 224
parent: Modules
---

## StakeVoteRegDelegCert overview

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
  - [StakeVoteRegDelegCertError (class)](#stakevoteregdelegcerterror-class)
- [Methods](#methods)
  - [dRep](#drep)
  - [deposit](#deposit)
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
  - [dRepUnsafe](#drepunsafe)
  - [depositUnsafe](#depositunsafe)
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
  - [StakeVoteRegDelegCert (type alias)](#stakevoteregdelegcert-type-alias)

---

# Constructors

## \_new

Static method \_new of StakeVoteRegDelegCert

**Signature**

```ts
export declare const _new: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  dRep: CML.DRep,
  deposit: bigint,
) => Effect.Effect<CML.StakeVoteRegDelegCert, StakeVoteRegDelegCertError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of StakeVoteRegDelegCert

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.StakeVoteRegDelegCert, StakeVoteRegDelegCertError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of StakeVoteRegDelegCert

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.StakeVoteRegDelegCert, StakeVoteRegDelegCertError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of StakeVoteRegDelegCert

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.StakeVoteRegDelegCert, StakeVoteRegDelegCertError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls StakeVoteRegDelegCert.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  dRep: CML.DRep,
  deposit: bigint,
) => CML.StakeVoteRegDelegCert;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls StakeVoteRegDelegCert.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.StakeVoteRegDelegCert;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls StakeVoteRegDelegCert.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.StakeVoteRegDelegCert;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls StakeVoteRegDelegCert.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (
  json: string,
) => CML.StakeVoteRegDelegCert;
```

Added in v2.0.0

# Errors

## StakeVoteRegDelegCertError (class)

Error class for StakeVoteRegDelegCert operations

This error is thrown when operations on StakeVoteRegDelegCert instances fail.

**Signature**

```ts
export declare class StakeVoteRegDelegCertError
```

Added in v2.0.0

# Methods

## dRep

Method dRep of StakeVoteRegDelegCert

**Signature**

```ts
export declare const dRep: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<CML.DRep, StakeVoteRegDelegCertError>;
```

Added in v2.0.0

## deposit

Method deposit of StakeVoteRegDelegCert

**Signature**

```ts
export declare const deposit: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<bigint, StakeVoteRegDelegCertError>;
```

Added in v2.0.0

## free

Method free of StakeVoteRegDelegCert

**Signature**

```ts
export declare const free: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<void, StakeVoteRegDelegCertError>;
```

Added in v2.0.0

## pool

Method pool of StakeVoteRegDelegCert

**Signature**

```ts
export declare const pool: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<CML.Ed25519KeyHash, StakeVoteRegDelegCertError>;
```

Added in v2.0.0

## stakeCredential

Method stakeCredential of StakeVoteRegDelegCert

**Signature**

```ts
export declare const stakeCredential: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<CML.Credential, StakeVoteRegDelegCertError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of StakeVoteRegDelegCert

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<Uint8Array, StakeVoteRegDelegCertError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of StakeVoteRegDelegCert

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<string, StakeVoteRegDelegCertError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of StakeVoteRegDelegCert

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<Uint8Array, StakeVoteRegDelegCertError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of StakeVoteRegDelegCert

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<string, StakeVoteRegDelegCertError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of StakeVoteRegDelegCert

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<any, StakeVoteRegDelegCertError>;
```

Added in v2.0.0

## toJson

Method toJson of StakeVoteRegDelegCert

**Signature**

```ts
export declare const toJson: (
  instance: CML.StakeVoteRegDelegCert,
) => Effect.Effect<string, StakeVoteRegDelegCertError>;
```

Added in v2.0.0

# MethodsUnsafe

## dRepUnsafe

Unsafely calls instance.dRep without Effect wrapper

**Signature**

```ts
export declare const dRepUnsafe: (
  instance: CML.StakeVoteRegDelegCert,
) => CML.DRep;
```

Added in v2.0.0

## depositUnsafe

Unsafely calls instance.deposit without Effect wrapper

**Signature**

```ts
export declare const depositUnsafe: (
  instance: CML.StakeVoteRegDelegCert,
) => bigint;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.StakeVoteRegDelegCert) => void;
```

Added in v2.0.0

## poolUnsafe

Unsafely calls instance.pool without Effect wrapper

**Signature**

```ts
export declare const poolUnsafe: (
  instance: CML.StakeVoteRegDelegCert,
) => CML.Ed25519KeyHash;
```

Added in v2.0.0

## stakeCredentialUnsafe

Unsafely calls instance.stakeCredential without Effect wrapper

**Signature**

```ts
export declare const stakeCredentialUnsafe: (
  instance: CML.StakeVoteRegDelegCert,
) => CML.Credential;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.StakeVoteRegDelegCert,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.StakeVoteRegDelegCert,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.StakeVoteRegDelegCert,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.StakeVoteRegDelegCert,
) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (
  instance: CML.StakeVoteRegDelegCert,
) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (
  instance: CML.StakeVoteRegDelegCert,
) => string;
```

Added in v2.0.0

# Types

## StakeVoteRegDelegCert (type alias)

Type alias for the CML StakeVoteRegDelegCert class

**Signature**

```ts
export type StakeVoteRegDelegCert = CML.StakeVoteRegDelegCert;
```

Added in v2.0.0

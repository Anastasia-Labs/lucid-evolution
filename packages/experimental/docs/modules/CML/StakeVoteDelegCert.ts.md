---
title: CML/StakeVoteDelegCert.ts
nav_order: 218
parent: Modules
---

## StakeVoteDelegCert overview

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
  - [StakeVoteDelegCertError (class)](#stakevotedelegcerterror-class)
- [Methods](#methods)
  - [dRep](#drep)
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
  - [StakeVoteDelegCert (type alias)](#stakevotedelegcert-type-alias)

---

# Constructors

## \_new

Static method \_new of StakeVoteDelegCert

**Signature**

```ts
export declare const _new: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  dRep: CML.DRep,
) => Effect.Effect<CML.StakeVoteDelegCert, StakeVoteDelegCertError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of StakeVoteDelegCert

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.StakeVoteDelegCert, StakeVoteDelegCertError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of StakeVoteDelegCert

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.StakeVoteDelegCert, StakeVoteDelegCertError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of StakeVoteDelegCert

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.StakeVoteDelegCert, StakeVoteDelegCertError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls StakeVoteDelegCert.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  dRep: CML.DRep,
) => CML.StakeVoteDelegCert;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls StakeVoteDelegCert.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.StakeVoteDelegCert;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls StakeVoteDelegCert.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.StakeVoteDelegCert;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls StakeVoteDelegCert.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.StakeVoteDelegCert;
```

Added in v2.0.0

# Errors

## StakeVoteDelegCertError (class)

Error class for StakeVoteDelegCert operations

This error is thrown when operations on StakeVoteDelegCert instances fail.

**Signature**

```ts
export declare class StakeVoteDelegCertError
```

Added in v2.0.0

# Methods

## dRep

Method dRep of StakeVoteDelegCert

**Signature**

```ts
export declare const dRep: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<CML.DRep, StakeVoteDelegCertError>;
```

Added in v2.0.0

## free

Method free of StakeVoteDelegCert

**Signature**

```ts
export declare const free: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<void, StakeVoteDelegCertError>;
```

Added in v2.0.0

## pool

Method pool of StakeVoteDelegCert

**Signature**

```ts
export declare const pool: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<CML.Ed25519KeyHash, StakeVoteDelegCertError>;
```

Added in v2.0.0

## stakeCredential

Method stakeCredential of StakeVoteDelegCert

**Signature**

```ts
export declare const stakeCredential: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<CML.Credential, StakeVoteDelegCertError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of StakeVoteDelegCert

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<Uint8Array, StakeVoteDelegCertError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of StakeVoteDelegCert

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<string, StakeVoteDelegCertError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of StakeVoteDelegCert

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<Uint8Array, StakeVoteDelegCertError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of StakeVoteDelegCert

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<string, StakeVoteDelegCertError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of StakeVoteDelegCert

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<any, StakeVoteDelegCertError>;
```

Added in v2.0.0

## toJson

Method toJson of StakeVoteDelegCert

**Signature**

```ts
export declare const toJson: (
  instance: CML.StakeVoteDelegCert,
) => Effect.Effect<string, StakeVoteDelegCertError>;
```

Added in v2.0.0

# MethodsUnsafe

## dRepUnsafe

Unsafely calls instance.dRep without Effect wrapper

**Signature**

```ts
export declare const dRepUnsafe: (instance: CML.StakeVoteDelegCert) => CML.DRep;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.StakeVoteDelegCert) => void;
```

Added in v2.0.0

## poolUnsafe

Unsafely calls instance.pool without Effect wrapper

**Signature**

```ts
export declare const poolUnsafe: (
  instance: CML.StakeVoteDelegCert,
) => CML.Ed25519KeyHash;
```

Added in v2.0.0

## stakeCredentialUnsafe

Unsafely calls instance.stakeCredential without Effect wrapper

**Signature**

```ts
export declare const stakeCredentialUnsafe: (
  instance: CML.StakeVoteDelegCert,
) => CML.Credential;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.StakeVoteDelegCert,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.StakeVoteDelegCert,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.StakeVoteDelegCert,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.StakeVoteDelegCert,
) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.StakeVoteDelegCert) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.StakeVoteDelegCert) => string;
```

Added in v2.0.0

# Types

## StakeVoteDelegCert (type alias)

Type alias for the CML StakeVoteDelegCert class

**Signature**

```ts
export type StakeVoteDelegCert = CML.StakeVoteDelegCert;
```

Added in v2.0.0

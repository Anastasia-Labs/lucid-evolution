---
title: CML/StakeRegDelegCert.ts
nav_order: 221
parent: Modules
---

## StakeRegDelegCert overview

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
  - [StakeRegDelegCertError (class)](#stakeregdelegcerterror-class)
- [Methods](#methods)
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
  - [StakeRegDelegCert (type alias)](#stakeregdelegcert-type-alias)

---

# Constructors

## \_new

Static method \_new of StakeRegDelegCert

**Signature**

```ts
export declare const _new: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  deposit: bigint
) => Effect.Effect<CML.StakeRegDelegCert, StakeRegDelegCertError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of StakeRegDelegCert

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.StakeRegDelegCert, StakeRegDelegCertError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of StakeRegDelegCert

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.StakeRegDelegCert, StakeRegDelegCertError>
```

Added in v2.0.0

## fromJson

Static method fromJson of StakeRegDelegCert

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.StakeRegDelegCert, StakeRegDelegCertError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls StakeRegDelegCert.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  deposit: bigint
) => CML.StakeRegDelegCert
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls StakeRegDelegCert.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.StakeRegDelegCert
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls StakeRegDelegCert.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.StakeRegDelegCert
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls StakeRegDelegCert.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.StakeRegDelegCert
```

Added in v2.0.0

# Errors

## StakeRegDelegCertError (class)

Error class for StakeRegDelegCert operations

This error is thrown when operations on StakeRegDelegCert instances fail.

**Signature**

```ts
export declare class StakeRegDelegCertError
```

Added in v2.0.0

# Methods

## deposit

Method deposit of StakeRegDelegCert

**Signature**

```ts
export declare const deposit: (instance: CML.StakeRegDelegCert) => Effect.Effect<bigint, StakeRegDelegCertError>
```

Added in v2.0.0

## free

Method free of StakeRegDelegCert

**Signature**

```ts
export declare const free: (instance: CML.StakeRegDelegCert) => Effect.Effect<void, StakeRegDelegCertError>
```

Added in v2.0.0

## pool

Method pool of StakeRegDelegCert

**Signature**

```ts
export declare const pool: (
  instance: CML.StakeRegDelegCert
) => Effect.Effect<CML.Ed25519KeyHash, StakeRegDelegCertError>
```

Added in v2.0.0

## stakeCredential

Method stakeCredential of StakeRegDelegCert

**Signature**

```ts
export declare const stakeCredential: (
  instance: CML.StakeRegDelegCert
) => Effect.Effect<CML.Credential, StakeRegDelegCertError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of StakeRegDelegCert

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.StakeRegDelegCert
) => Effect.Effect<Uint8Array, StakeRegDelegCertError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of StakeRegDelegCert

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.StakeRegDelegCert
) => Effect.Effect<string, StakeRegDelegCertError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of StakeRegDelegCert

**Signature**

```ts
export declare const toCborBytes: (instance: CML.StakeRegDelegCert) => Effect.Effect<Uint8Array, StakeRegDelegCertError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of StakeRegDelegCert

**Signature**

```ts
export declare const toCborHex: (instance: CML.StakeRegDelegCert) => Effect.Effect<string, StakeRegDelegCertError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of StakeRegDelegCert

**Signature**

```ts
export declare const toJsValue: (instance: CML.StakeRegDelegCert) => Effect.Effect<any, StakeRegDelegCertError>
```

Added in v2.0.0

## toJson

Method toJson of StakeRegDelegCert

**Signature**

```ts
export declare const toJson: (instance: CML.StakeRegDelegCert) => Effect.Effect<string, StakeRegDelegCertError>
```

Added in v2.0.0

# MethodsUnsafe

## depositUnsafe

Unsafely calls instance.deposit without Effect wrapper

**Signature**

```ts
export declare const depositUnsafe: (instance: CML.StakeRegDelegCert) => bigint
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.StakeRegDelegCert) => void
```

Added in v2.0.0

## poolUnsafe

Unsafely calls instance.pool without Effect wrapper

**Signature**

```ts
export declare const poolUnsafe: (instance: CML.StakeRegDelegCert) => CML.Ed25519KeyHash
```

Added in v2.0.0

## stakeCredentialUnsafe

Unsafely calls instance.stakeCredential without Effect wrapper

**Signature**

```ts
export declare const stakeCredentialUnsafe: (instance: CML.StakeRegDelegCert) => CML.Credential
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.StakeRegDelegCert) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.StakeRegDelegCert) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.StakeRegDelegCert) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.StakeRegDelegCert) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.StakeRegDelegCert) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.StakeRegDelegCert) => string
```

Added in v2.0.0

# Types

## StakeRegDelegCert (type alias)

Type alias for the CML StakeRegDelegCert class

**Signature**

```ts
export type StakeRegDelegCert = CML.StakeRegDelegCert
```

Added in v2.0.0

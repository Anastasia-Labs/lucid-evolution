---
title: CML/VoteRegDelegCert.ts
nav_order: 280
parent: Modules
---

## VoteRegDelegCert overview

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
  - [VoteRegDelegCertError (class)](#voteregdelegcerterror-class)
- [Methods](#methods)
  - [dRep](#drep)
  - [deposit](#deposit)
  - [free](#free)
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
  - [stakeCredentialUnsafe](#stakecredentialunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [VoteRegDelegCert (type alias)](#voteregdelegcert-type-alias)

---

# Constructors

## \_new

Static method \_new of VoteRegDelegCert

**Signature**

```ts
export declare const _new: (
  stakeCredential: CML.Credential,
  dRep: CML.DRep,
  deposit: bigint
) => Effect.Effect<CML.VoteRegDelegCert, VoteRegDelegCertError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of VoteRegDelegCert

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.VoteRegDelegCert, VoteRegDelegCertError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of VoteRegDelegCert

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.VoteRegDelegCert, VoteRegDelegCertError>
```

Added in v2.0.0

## fromJson

Static method fromJson of VoteRegDelegCert

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.VoteRegDelegCert, VoteRegDelegCertError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls VoteRegDelegCert.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  stakeCredential: CML.Credential,
  dRep: CML.DRep,
  deposit: bigint
) => CML.VoteRegDelegCert
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls VoteRegDelegCert.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.VoteRegDelegCert
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls VoteRegDelegCert.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.VoteRegDelegCert
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls VoteRegDelegCert.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.VoteRegDelegCert
```

Added in v2.0.0

# Errors

## VoteRegDelegCertError (class)

Error class for VoteRegDelegCert operations

This error is thrown when operations on VoteRegDelegCert instances fail.

**Signature**

```ts
export declare class VoteRegDelegCertError
```

Added in v2.0.0

# Methods

## dRep

Method dRep of VoteRegDelegCert

**Signature**

```ts
export declare const dRep: (instance: CML.VoteRegDelegCert) => Effect.Effect<CML.DRep, VoteRegDelegCertError>
```

Added in v2.0.0

## deposit

Method deposit of VoteRegDelegCert

**Signature**

```ts
export declare const deposit: (instance: CML.VoteRegDelegCert) => Effect.Effect<bigint, VoteRegDelegCertError>
```

Added in v2.0.0

## free

Method free of VoteRegDelegCert

**Signature**

```ts
export declare const free: (instance: CML.VoteRegDelegCert) => Effect.Effect<void, VoteRegDelegCertError>
```

Added in v2.0.0

## stakeCredential

Method stakeCredential of VoteRegDelegCert

**Signature**

```ts
export declare const stakeCredential: (
  instance: CML.VoteRegDelegCert
) => Effect.Effect<CML.Credential, VoteRegDelegCertError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of VoteRegDelegCert

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.VoteRegDelegCert
) => Effect.Effect<Uint8Array, VoteRegDelegCertError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of VoteRegDelegCert

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.VoteRegDelegCert
) => Effect.Effect<string, VoteRegDelegCertError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of VoteRegDelegCert

**Signature**

```ts
export declare const toCborBytes: (instance: CML.VoteRegDelegCert) => Effect.Effect<Uint8Array, VoteRegDelegCertError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of VoteRegDelegCert

**Signature**

```ts
export declare const toCborHex: (instance: CML.VoteRegDelegCert) => Effect.Effect<string, VoteRegDelegCertError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of VoteRegDelegCert

**Signature**

```ts
export declare const toJsValue: (instance: CML.VoteRegDelegCert) => Effect.Effect<any, VoteRegDelegCertError>
```

Added in v2.0.0

## toJson

Method toJson of VoteRegDelegCert

**Signature**

```ts
export declare const toJson: (instance: CML.VoteRegDelegCert) => Effect.Effect<string, VoteRegDelegCertError>
```

Added in v2.0.0

# MethodsUnsafe

## dRepUnsafe

Unsafely calls instance.dRep without Effect wrapper

**Signature**

```ts
export declare const dRepUnsafe: (instance: CML.VoteRegDelegCert) => CML.DRep
```

Added in v2.0.0

## depositUnsafe

Unsafely calls instance.deposit without Effect wrapper

**Signature**

```ts
export declare const depositUnsafe: (instance: CML.VoteRegDelegCert) => bigint
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.VoteRegDelegCert) => void
```

Added in v2.0.0

## stakeCredentialUnsafe

Unsafely calls instance.stakeCredential without Effect wrapper

**Signature**

```ts
export declare const stakeCredentialUnsafe: (instance: CML.VoteRegDelegCert) => CML.Credential
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.VoteRegDelegCert) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.VoteRegDelegCert) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.VoteRegDelegCert) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.VoteRegDelegCert) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.VoteRegDelegCert) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.VoteRegDelegCert) => string
```

Added in v2.0.0

# Types

## VoteRegDelegCert (type alias)

Type alias for the CML VoteRegDelegCert class

**Signature**

```ts
export type VoteRegDelegCert = CML.VoteRegDelegCert
```

Added in v2.0.0

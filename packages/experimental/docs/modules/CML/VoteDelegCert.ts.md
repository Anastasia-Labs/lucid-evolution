---
title: CML/VoteDelegCert.ts
nav_order: 278
parent: Modules
---

## VoteDelegCert overview

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
  - [VoteDelegCertError (class)](#votedelegcerterror-class)
- [Methods](#methods)
  - [dRep](#drep)
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
  - [freeUnsafe](#freeunsafe)
  - [stakeCredentialUnsafe](#stakecredentialunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [VoteDelegCert (type alias)](#votedelegcert-type-alias)

---

# Constructors

## \_new

Static method \_new of VoteDelegCert

**Signature**

```ts
export declare const _new: (
  stakeCredential: CML.Credential,
  dRep: CML.DRep
) => Effect.Effect<CML.VoteDelegCert, VoteDelegCertError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of VoteDelegCert

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.VoteDelegCert, VoteDelegCertError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of VoteDelegCert

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.VoteDelegCert, VoteDelegCertError>
```

Added in v2.0.0

## fromJson

Static method fromJson of VoteDelegCert

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.VoteDelegCert, VoteDelegCertError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls VoteDelegCert.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (stakeCredential: CML.Credential, dRep: CML.DRep) => CML.VoteDelegCert
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls VoteDelegCert.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.VoteDelegCert
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls VoteDelegCert.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.VoteDelegCert
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls VoteDelegCert.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.VoteDelegCert
```

Added in v2.0.0

# Errors

## VoteDelegCertError (class)

Error class for VoteDelegCert operations

This error is thrown when operations on VoteDelegCert instances fail.

**Signature**

```ts
export declare class VoteDelegCertError
```

Added in v2.0.0

# Methods

## dRep

Method dRep of VoteDelegCert

**Signature**

```ts
export declare const dRep: (instance: CML.VoteDelegCert) => Effect.Effect<CML.DRep, VoteDelegCertError>
```

Added in v2.0.0

## free

Method free of VoteDelegCert

**Signature**

```ts
export declare const free: (instance: CML.VoteDelegCert) => Effect.Effect<void, VoteDelegCertError>
```

Added in v2.0.0

## stakeCredential

Method stakeCredential of VoteDelegCert

**Signature**

```ts
export declare const stakeCredential: (instance: CML.VoteDelegCert) => Effect.Effect<CML.Credential, VoteDelegCertError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of VoteDelegCert

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.VoteDelegCert
) => Effect.Effect<Uint8Array, VoteDelegCertError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of VoteDelegCert

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.VoteDelegCert) => Effect.Effect<string, VoteDelegCertError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of VoteDelegCert

**Signature**

```ts
export declare const toCborBytes: (instance: CML.VoteDelegCert) => Effect.Effect<Uint8Array, VoteDelegCertError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of VoteDelegCert

**Signature**

```ts
export declare const toCborHex: (instance: CML.VoteDelegCert) => Effect.Effect<string, VoteDelegCertError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of VoteDelegCert

**Signature**

```ts
export declare const toJsValue: (instance: CML.VoteDelegCert) => Effect.Effect<any, VoteDelegCertError>
```

Added in v2.0.0

## toJson

Method toJson of VoteDelegCert

**Signature**

```ts
export declare const toJson: (instance: CML.VoteDelegCert) => Effect.Effect<string, VoteDelegCertError>
```

Added in v2.0.0

# MethodsUnsafe

## dRepUnsafe

Unsafely calls instance.dRep without Effect wrapper

**Signature**

```ts
export declare const dRepUnsafe: (instance: CML.VoteDelegCert) => CML.DRep
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.VoteDelegCert) => void
```

Added in v2.0.0

## stakeCredentialUnsafe

Unsafely calls instance.stakeCredential without Effect wrapper

**Signature**

```ts
export declare const stakeCredentialUnsafe: (instance: CML.VoteDelegCert) => CML.Credential
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.VoteDelegCert) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.VoteDelegCert) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.VoteDelegCert) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.VoteDelegCert) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.VoteDelegCert) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.VoteDelegCert) => string
```

Added in v2.0.0

# Types

## VoteDelegCert (type alias)

Type alias for the CML VoteDelegCert class

**Signature**

```ts
export type VoteDelegCert = CML.VoteDelegCert
```

Added in v2.0.0

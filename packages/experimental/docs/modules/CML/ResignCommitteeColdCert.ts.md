---
title: CML/ResignCommitteeColdCert.ts
nav_order: 194
parent: Modules
---

## ResignCommitteeColdCert overview

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
  - [ResignCommitteeColdCertError (class)](#resigncommitteecoldcerterror-class)
- [Methods](#methods)
  - [anchor](#anchor)
  - [committeeColdCredential](#committeecoldcredential)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [anchorUnsafe](#anchorunsafe)
  - [committeeColdCredentialUnsafe](#committeecoldcredentialunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [ResignCommitteeColdCert (type alias)](#resigncommitteecoldcert-type-alias)

---

# Constructors

## \_new

Static method \_new of ResignCommitteeColdCert

**Signature**

```ts
export declare const _new: (
  committeeColdCredential: CML.Credential,
  anchor: CML.Anchor
) => Effect.Effect<CML.ResignCommitteeColdCert, ResignCommitteeColdCertError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of ResignCommitteeColdCert

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.ResignCommitteeColdCert, ResignCommitteeColdCertError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of ResignCommitteeColdCert

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string
) => Effect.Effect<CML.ResignCommitteeColdCert, ResignCommitteeColdCertError>
```

Added in v2.0.0

## fromJson

Static method fromJson of ResignCommitteeColdCert

**Signature**

```ts
export declare const fromJson: (
  json: string
) => Effect.Effect<CML.ResignCommitteeColdCert, ResignCommitteeColdCertError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls ResignCommitteeColdCert.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  committeeColdCredential: CML.Credential,
  anchor: CML.Anchor
) => CML.ResignCommitteeColdCert
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls ResignCommitteeColdCert.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.ResignCommitteeColdCert
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls ResignCommitteeColdCert.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.ResignCommitteeColdCert
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls ResignCommitteeColdCert.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.ResignCommitteeColdCert
```

Added in v2.0.0

# Errors

## ResignCommitteeColdCertError (class)

Error class for ResignCommitteeColdCert operations

This error is thrown when operations on ResignCommitteeColdCert instances fail.

**Signature**

```ts
export declare class ResignCommitteeColdCertError
```

Added in v2.0.0

# Methods

## anchor

Method anchor of ResignCommitteeColdCert

**Signature**

```ts
export declare const anchor: (
  instance: CML.ResignCommitteeColdCert
) => Effect.Effect<CML.Anchor | undefined, ResignCommitteeColdCertError>
```

Added in v2.0.0

## committeeColdCredential

Method committeeColdCredential of ResignCommitteeColdCert

**Signature**

```ts
export declare const committeeColdCredential: (
  instance: CML.ResignCommitteeColdCert
) => Effect.Effect<CML.Credential, ResignCommitteeColdCertError>
```

Added in v2.0.0

## free

Method free of ResignCommitteeColdCert

**Signature**

```ts
export declare const free: (instance: CML.ResignCommitteeColdCert) => Effect.Effect<void, ResignCommitteeColdCertError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of ResignCommitteeColdCert

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.ResignCommitteeColdCert
) => Effect.Effect<Uint8Array, ResignCommitteeColdCertError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of ResignCommitteeColdCert

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.ResignCommitteeColdCert
) => Effect.Effect<string, ResignCommitteeColdCertError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of ResignCommitteeColdCert

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.ResignCommitteeColdCert
) => Effect.Effect<Uint8Array, ResignCommitteeColdCertError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of ResignCommitteeColdCert

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.ResignCommitteeColdCert
) => Effect.Effect<string, ResignCommitteeColdCertError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of ResignCommitteeColdCert

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.ResignCommitteeColdCert
) => Effect.Effect<any, ResignCommitteeColdCertError>
```

Added in v2.0.0

## toJson

Method toJson of ResignCommitteeColdCert

**Signature**

```ts
export declare const toJson: (
  instance: CML.ResignCommitteeColdCert
) => Effect.Effect<string, ResignCommitteeColdCertError>
```

Added in v2.0.0

# MethodsUnsafe

## anchorUnsafe

Unsafely calls instance.anchor without Effect wrapper

**Signature**

```ts
export declare const anchorUnsafe: (instance: CML.ResignCommitteeColdCert) => CML.Anchor | undefined
```

Added in v2.0.0

## committeeColdCredentialUnsafe

Unsafely calls instance.committeeColdCredential without Effect wrapper

**Signature**

```ts
export declare const committeeColdCredentialUnsafe: (instance: CML.ResignCommitteeColdCert) => CML.Credential
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.ResignCommitteeColdCert) => void
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.ResignCommitteeColdCert) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.ResignCommitteeColdCert) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.ResignCommitteeColdCert) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.ResignCommitteeColdCert) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.ResignCommitteeColdCert) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.ResignCommitteeColdCert) => string
```

Added in v2.0.0

# Types

## ResignCommitteeColdCert (type alias)

Type alias for the CML ResignCommitteeColdCert class

**Signature**

```ts
export type ResignCommitteeColdCert = CML.ResignCommitteeColdCert
```

Added in v2.0.0

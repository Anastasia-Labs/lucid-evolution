---
title: CML/RegDrepCert.ts
nav_order: 191
parent: Modules
---

## RegDrepCert overview

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
  - [RegDrepCertError (class)](#regdrepcerterror-class)
- [Methods](#methods)
  - [anchor](#anchor)
  - [deposit](#deposit)
  - [drepCredential](#drepcredential)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [anchorUnsafe](#anchorunsafe)
  - [depositUnsafe](#depositunsafe)
  - [drepCredentialUnsafe](#drepcredentialunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [RegDrepCert (type alias)](#regdrepcert-type-alias)

---

# Constructors

## \_new

Static method \_new of RegDrepCert

**Signature**

```ts
export declare const _new: (
  drepCredential: CML.Credential,
  deposit: bigint,
  anchor: CML.Anchor
) => Effect.Effect<CML.RegDrepCert, RegDrepCertError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of RegDrepCert

**Signature**

```ts
export declare const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.RegDrepCert, RegDrepCertError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of RegDrepCert

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.RegDrepCert, RegDrepCertError>
```

Added in v2.0.0

## fromJson

Static method fromJson of RegDrepCert

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.RegDrepCert, RegDrepCertError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls RegDrepCert.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  drepCredential: CML.Credential,
  deposit: bigint,
  anchor: CML.Anchor
) => CML.RegDrepCert
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls RegDrepCert.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.RegDrepCert
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls RegDrepCert.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.RegDrepCert
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls RegDrepCert.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.RegDrepCert
```

Added in v2.0.0

# Errors

## RegDrepCertError (class)

Error class for RegDrepCert operations

This error is thrown when operations on RegDrepCert instances fail.

**Signature**

```ts
export declare class RegDrepCertError
```

Added in v2.0.0

# Methods

## anchor

Method anchor of RegDrepCert

**Signature**

```ts
export declare const anchor: (instance: CML.RegDrepCert) => Effect.Effect<CML.Anchor | undefined, RegDrepCertError>
```

Added in v2.0.0

## deposit

Method deposit of RegDrepCert

**Signature**

```ts
export declare const deposit: (instance: CML.RegDrepCert) => Effect.Effect<bigint, RegDrepCertError>
```

Added in v2.0.0

## drepCredential

Method drepCredential of RegDrepCert

**Signature**

```ts
export declare const drepCredential: (instance: CML.RegDrepCert) => Effect.Effect<CML.Credential, RegDrepCertError>
```

Added in v2.0.0

## free

Method free of RegDrepCert

**Signature**

```ts
export declare const free: (instance: CML.RegDrepCert) => Effect.Effect<void, RegDrepCertError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of RegDrepCert

**Signature**

```ts
export declare const toCanonicalCborBytes: (instance: CML.RegDrepCert) => Effect.Effect<Uint8Array, RegDrepCertError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of RegDrepCert

**Signature**

```ts
export declare const toCanonicalCborHex: (instance: CML.RegDrepCert) => Effect.Effect<string, RegDrepCertError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of RegDrepCert

**Signature**

```ts
export declare const toCborBytes: (instance: CML.RegDrepCert) => Effect.Effect<Uint8Array, RegDrepCertError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of RegDrepCert

**Signature**

```ts
export declare const toCborHex: (instance: CML.RegDrepCert) => Effect.Effect<string, RegDrepCertError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of RegDrepCert

**Signature**

```ts
export declare const toJsValue: (instance: CML.RegDrepCert) => Effect.Effect<any, RegDrepCertError>
```

Added in v2.0.0

## toJson

Method toJson of RegDrepCert

**Signature**

```ts
export declare const toJson: (instance: CML.RegDrepCert) => Effect.Effect<string, RegDrepCertError>
```

Added in v2.0.0

# MethodsUnsafe

## anchorUnsafe

Unsafely calls instance.anchor without Effect wrapper

**Signature**

```ts
export declare const anchorUnsafe: (instance: CML.RegDrepCert) => CML.Anchor | undefined
```

Added in v2.0.0

## depositUnsafe

Unsafely calls instance.deposit without Effect wrapper

**Signature**

```ts
export declare const depositUnsafe: (instance: CML.RegDrepCert) => bigint
```

Added in v2.0.0

## drepCredentialUnsafe

Unsafely calls instance.drepCredential without Effect wrapper

**Signature**

```ts
export declare const drepCredentialUnsafe: (instance: CML.RegDrepCert) => CML.Credential
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.RegDrepCert) => void
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.RegDrepCert) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.RegDrepCert) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.RegDrepCert) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.RegDrepCert) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.RegDrepCert) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.RegDrepCert) => string
```

Added in v2.0.0

# Types

## RegDrepCert (type alias)

Type alias for the CML RegDrepCert class

**Signature**

```ts
export type RegDrepCert = CML.RegDrepCert
```

Added in v2.0.0

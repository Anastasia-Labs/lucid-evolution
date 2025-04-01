---
title: CML/UnregCert.ts
nav_order: 243
parent: Modules
---

## UnregCert overview

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
  - [UnregCertError (class)](#unregcerterror-class)
- [Methods](#methods)
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
  - [UnregCert (type alias)](#unregcert-type-alias)

---

# Constructors

## \_new

Static method \_new of UnregCert

**Signature**

```ts
export declare const _new: (
  stakeCredential: CML.Credential,
  deposit: bigint,
) => Effect.Effect<CML.UnregCert, UnregCertError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of UnregCert

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.UnregCert, UnregCertError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of UnregCert

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.UnregCert, UnregCertError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of UnregCert

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.UnregCert, UnregCertError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls UnregCert.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  stakeCredential: CML.Credential,
  deposit: bigint,
) => CML.UnregCert;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls UnregCert.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.UnregCert;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls UnregCert.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.UnregCert;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls UnregCert.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.UnregCert;
```

Added in v2.0.0

# Errors

## UnregCertError (class)

Error class for UnregCert operations

This error is thrown when operations on UnregCert instances fail.

**Signature**

```ts
export declare class UnregCertError
```

Added in v2.0.0

# Methods

## deposit

Method deposit of UnregCert

**Signature**

```ts
export declare const deposit: (
  instance: CML.UnregCert,
) => Effect.Effect<bigint, UnregCertError>;
```

Added in v2.0.0

## free

Method free of UnregCert

**Signature**

```ts
export declare const free: (
  instance: CML.UnregCert,
) => Effect.Effect<void, UnregCertError>;
```

Added in v2.0.0

## stakeCredential

Method stakeCredential of UnregCert

**Signature**

```ts
export declare const stakeCredential: (
  instance: CML.UnregCert,
) => Effect.Effect<CML.Credential, UnregCertError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of UnregCert

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.UnregCert,
) => Effect.Effect<Uint8Array, UnregCertError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of UnregCert

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.UnregCert,
) => Effect.Effect<string, UnregCertError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of UnregCert

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.UnregCert,
) => Effect.Effect<Uint8Array, UnregCertError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of UnregCert

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.UnregCert,
) => Effect.Effect<string, UnregCertError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of UnregCert

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.UnregCert,
) => Effect.Effect<any, UnregCertError>;
```

Added in v2.0.0

## toJson

Method toJson of UnregCert

**Signature**

```ts
export declare const toJson: (
  instance: CML.UnregCert,
) => Effect.Effect<string, UnregCertError>;
```

Added in v2.0.0

# MethodsUnsafe

## depositUnsafe

Unsafely calls instance.deposit without Effect wrapper

**Signature**

```ts
export declare const depositUnsafe: (instance: CML.UnregCert) => bigint;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.UnregCert) => void;
```

Added in v2.0.0

## stakeCredentialUnsafe

Unsafely calls instance.stakeCredential without Effect wrapper

**Signature**

```ts
export declare const stakeCredentialUnsafe: (
  instance: CML.UnregCert,
) => CML.Credential;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.UnregCert,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.UnregCert,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.UnregCert) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.UnregCert) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.UnregCert) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.UnregCert) => string;
```

Added in v2.0.0

# Types

## UnregCert (type alias)

Type alias for the CML UnregCert class

**Signature**

```ts
export type UnregCert = CML.UnregCert;
```

Added in v2.0.0

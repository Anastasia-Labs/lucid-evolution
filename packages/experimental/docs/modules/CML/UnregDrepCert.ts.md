---
title: CML/UnregDrepCert.ts
nav_order: 245
parent: Modules
---

## UnregDrepCert overview

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
  - [UnregDrepCertError (class)](#unregdrepcerterror-class)
- [Methods](#methods)
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
  - [UnregDrepCert (type alias)](#unregdrepcert-type-alias)

---

# Constructors

## \_new

Static method \_new of UnregDrepCert

**Signature**

```ts
export declare const _new: (
  drepCredential: CML.Credential,
  deposit: bigint,
) => Effect.Effect<CML.UnregDrepCert, UnregDrepCertError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of UnregDrepCert

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.UnregDrepCert, UnregDrepCertError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of UnregDrepCert

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.UnregDrepCert, UnregDrepCertError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of UnregDrepCert

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.UnregDrepCert, UnregDrepCertError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls UnregDrepCert.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  drepCredential: CML.Credential,
  deposit: bigint,
) => CML.UnregDrepCert;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls UnregDrepCert.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.UnregDrepCert;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls UnregDrepCert.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.UnregDrepCert;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls UnregDrepCert.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.UnregDrepCert;
```

Added in v2.0.0

# Errors

## UnregDrepCertError (class)

Error class for UnregDrepCert operations

This error is thrown when operations on UnregDrepCert instances fail.

**Signature**

```ts
export declare class UnregDrepCertError
```

Added in v2.0.0

# Methods

## deposit

Method deposit of UnregDrepCert

**Signature**

```ts
export declare const deposit: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<bigint, UnregDrepCertError>;
```

Added in v2.0.0

## drepCredential

Method drepCredential of UnregDrepCert

**Signature**

```ts
export declare const drepCredential: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<CML.Credential, UnregDrepCertError>;
```

Added in v2.0.0

## free

Method free of UnregDrepCert

**Signature**

```ts
export declare const free: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<void, UnregDrepCertError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of UnregDrepCert

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<Uint8Array, UnregDrepCertError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of UnregDrepCert

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<string, UnregDrepCertError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of UnregDrepCert

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<Uint8Array, UnregDrepCertError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of UnregDrepCert

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<string, UnregDrepCertError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of UnregDrepCert

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<any, UnregDrepCertError>;
```

Added in v2.0.0

## toJson

Method toJson of UnregDrepCert

**Signature**

```ts
export declare const toJson: (
  instance: CML.UnregDrepCert,
) => Effect.Effect<string, UnregDrepCertError>;
```

Added in v2.0.0

# MethodsUnsafe

## depositUnsafe

Unsafely calls instance.deposit without Effect wrapper

**Signature**

```ts
export declare const depositUnsafe: (instance: CML.UnregDrepCert) => bigint;
```

Added in v2.0.0

## drepCredentialUnsafe

Unsafely calls instance.drepCredential without Effect wrapper

**Signature**

```ts
export declare const drepCredentialUnsafe: (
  instance: CML.UnregDrepCert,
) => CML.Credential;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.UnregDrepCert) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.UnregDrepCert,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.UnregDrepCert,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.UnregDrepCert,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.UnregDrepCert) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.UnregDrepCert) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.UnregDrepCert) => string;
```

Added in v2.0.0

# Types

## UnregDrepCert (type alias)

Type alias for the CML UnregDrepCert class

**Signature**

```ts
export type UnregDrepCert = CML.UnregDrepCert;
```

Added in v2.0.0

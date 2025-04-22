---
title: CML/RegCert.ts
nav_order: 190
parent: Modules
---

## RegCert overview

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
  - [RegCertError (class)](#regcerterror-class)
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
  - [RegCert (type alias)](#regcert-type-alias)

---

# Constructors

## \_new

Static method \_new of RegCert

**Signature**

```ts
export declare const _new: (
  stakeCredential: CML.Credential,
  deposit: bigint,
) => Effect.Effect<CML.RegCert, RegCertError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of RegCert

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.RegCert, RegCertError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of RegCert

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.RegCert, RegCertError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of RegCert

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.RegCert, RegCertError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls RegCert.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  stakeCredential: CML.Credential,
  deposit: bigint,
) => CML.RegCert;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls RegCert.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.RegCert;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls RegCert.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.RegCert;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls RegCert.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.RegCert;
```

Added in v2.0.0

# Errors

## RegCertError (class)

Error class for RegCert operations

This error is thrown when operations on RegCert instances fail.

**Signature**

```ts
export declare class RegCertError
```

Added in v2.0.0

# Methods

## deposit

Method deposit of RegCert

**Signature**

```ts
export declare const deposit: (
  instance: CML.RegCert,
) => Effect.Effect<bigint, RegCertError>;
```

Added in v2.0.0

## free

Method free of RegCert

**Signature**

```ts
export declare const free: (
  instance: CML.RegCert,
) => Effect.Effect<void, RegCertError>;
```

Added in v2.0.0

## stakeCredential

Method stakeCredential of RegCert

**Signature**

```ts
export declare const stakeCredential: (
  instance: CML.RegCert,
) => Effect.Effect<CML.Credential, RegCertError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of RegCert

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.RegCert,
) => Effect.Effect<Uint8Array, RegCertError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of RegCert

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.RegCert,
) => Effect.Effect<string, RegCertError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of RegCert

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.RegCert,
) => Effect.Effect<Uint8Array, RegCertError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of RegCert

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.RegCert,
) => Effect.Effect<string, RegCertError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of RegCert

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.RegCert,
) => Effect.Effect<any, RegCertError>;
```

Added in v2.0.0

## toJson

Method toJson of RegCert

**Signature**

```ts
export declare const toJson: (
  instance: CML.RegCert,
) => Effect.Effect<string, RegCertError>;
```

Added in v2.0.0

# MethodsUnsafe

## depositUnsafe

Unsafely calls instance.deposit without Effect wrapper

**Signature**

```ts
export declare const depositUnsafe: (instance: CML.RegCert) => bigint;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.RegCert) => void;
```

Added in v2.0.0

## stakeCredentialUnsafe

Unsafely calls instance.stakeCredential without Effect wrapper

**Signature**

```ts
export declare const stakeCredentialUnsafe: (
  instance: CML.RegCert,
) => CML.Credential;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.RegCert,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.RegCert,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.RegCert) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.RegCert) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.RegCert) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.RegCert) => string;
```

Added in v2.0.0

# Types

## RegCert (type alias)

Type alias for the CML RegCert class

**Signature**

```ts
export type RegCert = CML.RegCert;
```

Added in v2.0.0

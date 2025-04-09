---
title: CML/AuthCommitteeHotCert.ts
nav_order: 11
parent: Modules
---

## AuthCommitteeHotCert overview

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
  - [AuthCommitteeHotCertError (class)](#authcommitteehotcerterror-class)
- [Methods](#methods)
  - [committeeColdCredential](#committeecoldcredential)
  - [committeeHotCredential](#committeehotcredential)
  - [free](#free)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [committeeColdCredentialUnsafe](#committeecoldcredentialunsafe)
  - [committeeHotCredentialUnsafe](#committeehotcredentialunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [AuthCommitteeHotCert (type alias)](#authcommitteehotcert-type-alias)

---

# Constructors

## \_new

Static method \_new of AuthCommitteeHotCert

**Signature**

```ts
export declare const _new: (
  committeeColdCredential: CML.Credential,
  committeeHotCredential: CML.Credential,
) => Effect.Effect<CML.AuthCommitteeHotCert, AuthCommitteeHotCertError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of AuthCommitteeHotCert

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.AuthCommitteeHotCert, AuthCommitteeHotCertError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of AuthCommitteeHotCert

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.AuthCommitteeHotCert, AuthCommitteeHotCertError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of AuthCommitteeHotCert

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.AuthCommitteeHotCert, AuthCommitteeHotCertError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls AuthCommitteeHotCert.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  committeeColdCredential: CML.Credential,
  committeeHotCredential: CML.Credential,
) => CML.AuthCommitteeHotCert;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls AuthCommitteeHotCert.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.AuthCommitteeHotCert;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls AuthCommitteeHotCert.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.AuthCommitteeHotCert;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls AuthCommitteeHotCert.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.AuthCommitteeHotCert;
```

Added in v2.0.0

# Errors

## AuthCommitteeHotCertError (class)

Error class for AuthCommitteeHotCert operations

This error is thrown when operations on AuthCommitteeHotCert instances fail.

**Signature**

```ts
export declare class AuthCommitteeHotCertError
```

Added in v2.0.0

# Methods

## committeeColdCredential

Method committeeColdCredential of AuthCommitteeHotCert

**Signature**

```ts
export declare const committeeColdCredential: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<CML.Credential, AuthCommitteeHotCertError>;
```

Added in v2.0.0

## committeeHotCredential

Method committeeHotCredential of AuthCommitteeHotCert

**Signature**

```ts
export declare const committeeHotCredential: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<CML.Credential, AuthCommitteeHotCertError>;
```

Added in v2.0.0

## free

Method free of AuthCommitteeHotCert

**Signature**

```ts
export declare const free: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<void, AuthCommitteeHotCertError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of AuthCommitteeHotCert

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<Uint8Array, AuthCommitteeHotCertError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of AuthCommitteeHotCert

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<string, AuthCommitteeHotCertError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of AuthCommitteeHotCert

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<Uint8Array, AuthCommitteeHotCertError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of AuthCommitteeHotCert

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<string, AuthCommitteeHotCertError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of AuthCommitteeHotCert

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<any, AuthCommitteeHotCertError>;
```

Added in v2.0.0

## toJson

Method toJson of AuthCommitteeHotCert

**Signature**

```ts
export declare const toJson: (
  instance: CML.AuthCommitteeHotCert,
) => Effect.Effect<string, AuthCommitteeHotCertError>;
```

Added in v2.0.0

# MethodsUnsafe

## committeeColdCredentialUnsafe

Unsafely calls instance.committeeColdCredential without Effect wrapper

**Signature**

```ts
export declare const committeeColdCredentialUnsafe: (
  instance: CML.AuthCommitteeHotCert,
) => CML.Credential;
```

Added in v2.0.0

## committeeHotCredentialUnsafe

Unsafely calls instance.committeeHotCredential without Effect wrapper

**Signature**

```ts
export declare const committeeHotCredentialUnsafe: (
  instance: CML.AuthCommitteeHotCert,
) => CML.Credential;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.AuthCommitteeHotCert) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.AuthCommitteeHotCert,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.AuthCommitteeHotCert,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.AuthCommitteeHotCert,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (
  instance: CML.AuthCommitteeHotCert,
) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (
  instance: CML.AuthCommitteeHotCert,
) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (
  instance: CML.AuthCommitteeHotCert,
) => string;
```

Added in v2.0.0

# Types

## AuthCommitteeHotCert (type alias)

Type alias for the CML AuthCommitteeHotCert class

**Signature**

```ts
export type AuthCommitteeHotCert = CML.AuthCommitteeHotCert;
```

Added in v2.0.0

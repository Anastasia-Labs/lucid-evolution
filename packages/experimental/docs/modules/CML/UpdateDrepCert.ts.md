---
title: CML/UpdateDrepCert.ts
nav_order: 247
parent: Modules
---

## UpdateDrepCert overview

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
  - [UpdateDrepCertError (class)](#updatedrepcerterror-class)
- [Methods](#methods)
  - [anchor](#anchor)
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
  - [drepCredentialUnsafe](#drepcredentialunsafe)
  - [freeUnsafe](#freeunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [UpdateDrepCert (type alias)](#updatedrepcert-type-alias)

---

# Constructors

## \_new

Static method \_new of UpdateDrepCert

**Signature**

```ts
export declare const _new: (
  drepCredential: CML.Credential,
  anchor: CML.Anchor,
) => Effect.Effect<CML.UpdateDrepCert, UpdateDrepCertError>;
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of UpdateDrepCert

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.UpdateDrepCert, UpdateDrepCertError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of UpdateDrepCert

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.UpdateDrepCert, UpdateDrepCertError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of UpdateDrepCert

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.UpdateDrepCert, UpdateDrepCertError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls UpdateDrepCert.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (
  drepCredential: CML.Credential,
  anchor: CML.Anchor,
) => CML.UpdateDrepCert;
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls UpdateDrepCert.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.UpdateDrepCert;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls UpdateDrepCert.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (
  cborBytes: string,
) => CML.UpdateDrepCert;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls UpdateDrepCert.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.UpdateDrepCert;
```

Added in v2.0.0

# Errors

## UpdateDrepCertError (class)

Error class for UpdateDrepCert operations

This error is thrown when operations on UpdateDrepCert instances fail.

**Signature**

```ts
export declare class UpdateDrepCertError
```

Added in v2.0.0

# Methods

## anchor

Method anchor of UpdateDrepCert

**Signature**

```ts
export declare const anchor: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<CML.Anchor | undefined, UpdateDrepCertError>;
```

Added in v2.0.0

## drepCredential

Method drepCredential of UpdateDrepCert

**Signature**

```ts
export declare const drepCredential: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<CML.Credential, UpdateDrepCertError>;
```

Added in v2.0.0

## free

Method free of UpdateDrepCert

**Signature**

```ts
export declare const free: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<void, UpdateDrepCertError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of UpdateDrepCert

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<Uint8Array, UpdateDrepCertError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of UpdateDrepCert

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<string, UpdateDrepCertError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of UpdateDrepCert

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<Uint8Array, UpdateDrepCertError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of UpdateDrepCert

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<string, UpdateDrepCertError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of UpdateDrepCert

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<any, UpdateDrepCertError>;
```

Added in v2.0.0

## toJson

Method toJson of UpdateDrepCert

**Signature**

```ts
export declare const toJson: (
  instance: CML.UpdateDrepCert,
) => Effect.Effect<string, UpdateDrepCertError>;
```

Added in v2.0.0

# MethodsUnsafe

## anchorUnsafe

Unsafely calls instance.anchor without Effect wrapper

**Signature**

```ts
export declare const anchorUnsafe: (
  instance: CML.UpdateDrepCert,
) => CML.Anchor | undefined;
```

Added in v2.0.0

## drepCredentialUnsafe

Unsafely calls instance.drepCredential without Effect wrapper

**Signature**

```ts
export declare const drepCredentialUnsafe: (
  instance: CML.UpdateDrepCert,
) => CML.Credential;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.UpdateDrepCert) => void;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.UpdateDrepCert,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.UpdateDrepCert,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.UpdateDrepCert,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.UpdateDrepCert) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.UpdateDrepCert) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.UpdateDrepCert) => string;
```

Added in v2.0.0

# Types

## UpdateDrepCert (type alias)

Type alias for the CML UpdateDrepCert class

**Signature**

```ts
export type UpdateDrepCert = CML.UpdateDrepCert;
```

Added in v2.0.0

---
title: CML/Credential.ts
nav_order: 59
parent: Modules
---

## Credential overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [fromCborBytes](#fromcborbytes)
  - [fromCborHex](#fromcborhex)
  - [fromJson](#fromjson)
  - [newPubKey](#newpubkey)
  - [newScript](#newscript)
- [ConstructorsUnsafe](#constructorsunsafe)
  - [fromCborBytesUnsafe](#fromcborbytesunsafe)
  - [fromCborHexUnsafe](#fromcborhexunsafe)
  - [fromJsonUnsafe](#fromjsonunsafe)
  - [newPubKeyUnsafe](#newpubkeyunsafe)
  - [newScriptUnsafe](#newscriptunsafe)
- [Errors](#errors)
  - [CredentialError (class)](#credentialerror-class)
- [Methods](#methods)
  - [asPubKey](#aspubkey)
  - [asScript](#asscript)
  - [free](#free)
  - [kind](#kind)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [asPubKeyUnsafe](#aspubkeyunsafe)
  - [asScriptUnsafe](#asscriptunsafe)
  - [freeUnsafe](#freeunsafe)
  - [kindUnsafe](#kindunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [Credential (type alias)](#credential-type-alias)

---

# Constructors

## fromCborBytes

Static method fromCborBytes of Credential

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.Credential, CredentialError>;
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of Credential

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.Credential, CredentialError>;
```

Added in v2.0.0

## fromJson

Static method fromJson of Credential

**Signature**

```ts
export declare const fromJson: (
  json: string,
) => Effect.Effect<CML.Credential, CredentialError>;
```

Added in v2.0.0

## newPubKey

Static method newPubKey of Credential

**Signature**

```ts
export declare const newPubKey: (
  hash: CML.Ed25519KeyHash,
) => Effect.Effect<CML.Credential, CredentialError>;
```

Added in v2.0.0

## newScript

Static method newScript of Credential

**Signature**

```ts
export declare const newScript: (
  hash: CML.ScriptHash,
) => Effect.Effect<CML.Credential, CredentialError>;
```

Added in v2.0.0

# ConstructorsUnsafe

## fromCborBytesUnsafe

Unsafely calls Credential.decodeCBORBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (
  cborBytes: Uint8Array,
) => CML.Credential;
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls Credential.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.Credential;
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls Credential.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.Credential;
```

Added in v2.0.0

## newPubKeyUnsafe

Unsafely calls Credential.newPubKey without Effect wrapper

**Signature**

```ts
export declare const newPubKeyUnsafe: (
  hash: CML.Ed25519KeyHash,
) => CML.Credential;
```

Added in v2.0.0

## newScriptUnsafe

Unsafely calls Credential.newScript without Effect wrapper

**Signature**

```ts
export declare const newScriptUnsafe: (hash: CML.ScriptHash) => CML.Credential;
```

Added in v2.0.0

# Errors

## CredentialError (class)

Error class for Credential operations

This error is thrown when operations on Credential instances fail.

**Signature**

```ts
export declare class CredentialError
```

Added in v2.0.0

# Methods

## asPubKey

Method asPubKey of Credential

**Signature**

```ts
export declare const asPubKey: (
  instance: CML.Credential,
) => Effect.Effect<CML.Ed25519KeyHash | undefined, CredentialError>;
```

Added in v2.0.0

## asScript

Method asScript of Credential

**Signature**

```ts
export declare const asScript: (
  instance: CML.Credential,
) => Effect.Effect<CML.ScriptHash | undefined, CredentialError>;
```

Added in v2.0.0

## free

Method free of Credential

**Signature**

```ts
export declare const free: (
  instance: CML.Credential,
) => Effect.Effect<void, CredentialError>;
```

Added in v2.0.0

## kind

Method kind of Credential

**Signature**

```ts
export declare const kind: (
  instance: CML.Credential,
) => Effect.Effect<CML.CredentialKind, CredentialError>;
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of Credential

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.Credential,
) => Effect.Effect<Uint8Array, CredentialError>;
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of Credential

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.Credential,
) => Effect.Effect<string, CredentialError>;
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of Credential

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.Credential,
) => Effect.Effect<Uint8Array, CredentialError>;
```

Added in v2.0.0

## toCborHex

Method toCborHex of Credential

**Signature**

```ts
export declare const toCborHex: (
  instance: CML.Credential,
) => Effect.Effect<string, CredentialError>;
```

Added in v2.0.0

## toJsValue

Method toJsValue of Credential

**Signature**

```ts
export declare const toJsValue: (
  instance: CML.Credential,
) => Effect.Effect<any, CredentialError>;
```

Added in v2.0.0

## toJson

Method toJson of Credential

**Signature**

```ts
export declare const toJson: (
  instance: CML.Credential,
) => Effect.Effect<string, CredentialError>;
```

Added in v2.0.0

# MethodsUnsafe

## asPubKeyUnsafe

Unsafely calls instance.asPubKey without Effect wrapper

**Signature**

```ts
export declare const asPubKeyUnsafe: (
  instance: CML.Credential,
) => CML.Ed25519KeyHash | undefined;
```

Added in v2.0.0

## asScriptUnsafe

Unsafely calls instance.asScript without Effect wrapper

**Signature**

```ts
export declare const asScriptUnsafe: (
  instance: CML.Credential,
) => CML.ScriptHash | undefined;
```

Added in v2.0.0

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.Credential) => void;
```

Added in v2.0.0

## kindUnsafe

Unsafely calls instance.kind without Effect wrapper

**Signature**

```ts
export declare const kindUnsafe: (
  instance: CML.Credential,
) => CML.CredentialKind;
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (
  instance: CML.Credential,
) => Uint8Array;
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (
  instance: CML.Credential,
) => string;
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (
  instance: CML.Credential,
) => Uint8Array;
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.Credential) => string;
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.Credential) => any;
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.Credential) => string;
```

Added in v2.0.0

# Types

## Credential (type alias)

Type alias for the CML Credential class

**Signature**

```ts
export type Credential = CML.Credential;
```

Added in v2.0.0

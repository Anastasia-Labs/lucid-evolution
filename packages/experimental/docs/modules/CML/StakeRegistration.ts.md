---
title: CML/StakeRegistration.ts
nav_order: 217
parent: Modules
---

## StakeRegistration overview

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
  - [StakeRegistrationError (class)](#stakeregistrationerror-class)
- [Methods](#methods)
  - [free](#free)
  - [stakeCredential](#stakecredential)
  - [toCanonicalCborBytes](#tocanonicalcborbytes)
  - [toCanonicalCborHex](#tocanonicalcborhex)
  - [toCborBytes](#tocborbytes)
  - [toCborHex](#tocborhex)
  - [toJsValue](#tojsvalue)
  - [toJson](#tojson)
- [MethodsUnsafe](#methodsunsafe)
  - [freeUnsafe](#freeunsafe)
  - [stakeCredentialUnsafe](#stakecredentialunsafe)
  - [toCanonicalCborBytesUnsafe](#tocanonicalcborbytesunsafe)
  - [toCanonicalCborHexUnsafe](#tocanonicalcborhexunsafe)
  - [toCborBytesUnsafe](#tocborbytesunsafe)
  - [toCborHexUnsafe](#tocborhexunsafe)
  - [toJsValueUnsafe](#tojsvalueunsafe)
  - [toJsonUnsafe](#tojsonunsafe)
- [Types](#types)
  - [StakeRegistration (type alias)](#stakeregistration-type-alias)

---

# Constructors

## \_new

Static method \_new of StakeRegistration

**Signature**

```ts
export declare const _new: (
  stakeCredential: CML.Credential
) => Effect.Effect<CML.StakeRegistration, StakeRegistrationError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of StakeRegistration

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.StakeRegistration, StakeRegistrationError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of StakeRegistration

**Signature**

```ts
export declare const fromCborHex: (cborBytes: string) => Effect.Effect<CML.StakeRegistration, StakeRegistrationError>
```

Added in v2.0.0

## fromJson

Static method fromJson of StakeRegistration

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.StakeRegistration, StakeRegistrationError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls StakeRegistration.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (stakeCredential: CML.Credential) => CML.StakeRegistration
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls StakeRegistration.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.StakeRegistration
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls StakeRegistration.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.StakeRegistration
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls StakeRegistration.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.StakeRegistration
```

Added in v2.0.0

# Errors

## StakeRegistrationError (class)

Error class for StakeRegistration operations

This error is thrown when operations on StakeRegistration instances fail.

**Signature**

```ts
export declare class StakeRegistrationError
```

Added in v2.0.0

# Methods

## free

Method free of StakeRegistration

**Signature**

```ts
export declare const free: (instance: CML.StakeRegistration) => Effect.Effect<void, StakeRegistrationError>
```

Added in v2.0.0

## stakeCredential

Method stakeCredential of StakeRegistration

**Signature**

```ts
export declare const stakeCredential: (
  instance: CML.StakeRegistration
) => Effect.Effect<CML.Credential, StakeRegistrationError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of StakeRegistration

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.StakeRegistration
) => Effect.Effect<Uint8Array, StakeRegistrationError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of StakeRegistration

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.StakeRegistration
) => Effect.Effect<string, StakeRegistrationError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of StakeRegistration

**Signature**

```ts
export declare const toCborBytes: (instance: CML.StakeRegistration) => Effect.Effect<Uint8Array, StakeRegistrationError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of StakeRegistration

**Signature**

```ts
export declare const toCborHex: (instance: CML.StakeRegistration) => Effect.Effect<string, StakeRegistrationError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of StakeRegistration

**Signature**

```ts
export declare const toJsValue: (instance: CML.StakeRegistration) => Effect.Effect<any, StakeRegistrationError>
```

Added in v2.0.0

## toJson

Method toJson of StakeRegistration

**Signature**

```ts
export declare const toJson: (instance: CML.StakeRegistration) => Effect.Effect<string, StakeRegistrationError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.StakeRegistration) => void
```

Added in v2.0.0

## stakeCredentialUnsafe

Unsafely calls instance.stakeCredential without Effect wrapper

**Signature**

```ts
export declare const stakeCredentialUnsafe: (instance: CML.StakeRegistration) => CML.Credential
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.StakeRegistration) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.StakeRegistration) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.StakeRegistration) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.StakeRegistration) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.StakeRegistration) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.StakeRegistration) => string
```

Added in v2.0.0

# Types

## StakeRegistration (type alias)

Type alias for the CML StakeRegistration class

**Signature**

```ts
export type StakeRegistration = CML.StakeRegistration
```

Added in v2.0.0

---
title: CML/StakeDeregistration.ts
nav_order: 213
parent: Modules
---

## StakeDeregistration overview

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
  - [StakeDeregistrationError (class)](#stakederegistrationerror-class)
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
  - [StakeDeregistration (type alias)](#stakederegistration-type-alias)

---

# Constructors

## \_new

Static method \_new of StakeDeregistration

**Signature**

```ts
export declare const _new: (
  stakeCredential: CML.Credential
) => Effect.Effect<CML.StakeDeregistration, StakeDeregistrationError>
```

Added in v2.0.0

## fromCborBytes

Static method fromCborBytes of StakeDeregistration

**Signature**

```ts
export declare const fromCborBytes: (
  cborBytes: Uint8Array
) => Effect.Effect<CML.StakeDeregistration, StakeDeregistrationError>
```

Added in v2.0.0

## fromCborHex

Static method fromCborHex of StakeDeregistration

**Signature**

```ts
export declare const fromCborHex: (
  cborBytes: string
) => Effect.Effect<CML.StakeDeregistration, StakeDeregistrationError>
```

Added in v2.0.0

## fromJson

Static method fromJson of StakeDeregistration

**Signature**

```ts
export declare const fromJson: (json: string) => Effect.Effect<CML.StakeDeregistration, StakeDeregistrationError>
```

Added in v2.0.0

# ConstructorsUnsafe

## \_newUnsafe

Unsafely calls StakeDeregistration.\_new without Effect wrapper

**Signature**

```ts
export declare const _newUnsafe: (stakeCredential: CML.Credential) => CML.StakeDeregistration
```

Added in v2.0.0

## fromCborBytesUnsafe

Unsafely calls StakeDeregistration.fromCborBytes without Effect wrapper

**Signature**

```ts
export declare const fromCborBytesUnsafe: (cborBytes: Uint8Array) => CML.StakeDeregistration
```

Added in v2.0.0

## fromCborHexUnsafe

Unsafely calls StakeDeregistration.fromCborHex without Effect wrapper

**Signature**

```ts
export declare const fromCborHexUnsafe: (cborBytes: string) => CML.StakeDeregistration
```

Added in v2.0.0

## fromJsonUnsafe

Unsafely calls StakeDeregistration.fromJson without Effect wrapper

**Signature**

```ts
export declare const fromJsonUnsafe: (json: string) => CML.StakeDeregistration
```

Added in v2.0.0

# Errors

## StakeDeregistrationError (class)

Error class for StakeDeregistration operations

This error is thrown when operations on StakeDeregistration instances fail.

**Signature**

```ts
export declare class StakeDeregistrationError
```

Added in v2.0.0

# Methods

## free

Method free of StakeDeregistration

**Signature**

```ts
export declare const free: (instance: CML.StakeDeregistration) => Effect.Effect<void, StakeDeregistrationError>
```

Added in v2.0.0

## stakeCredential

Method stakeCredential of StakeDeregistration

**Signature**

```ts
export declare const stakeCredential: (
  instance: CML.StakeDeregistration
) => Effect.Effect<CML.Credential, StakeDeregistrationError>
```

Added in v2.0.0

## toCanonicalCborBytes

Method toCanonicalCborBytes of StakeDeregistration

**Signature**

```ts
export declare const toCanonicalCborBytes: (
  instance: CML.StakeDeregistration
) => Effect.Effect<Uint8Array, StakeDeregistrationError>
```

Added in v2.0.0

## toCanonicalCborHex

Method toCanonicalCborHex of StakeDeregistration

**Signature**

```ts
export declare const toCanonicalCborHex: (
  instance: CML.StakeDeregistration
) => Effect.Effect<string, StakeDeregistrationError>
```

Added in v2.0.0

## toCborBytes

Method toCborBytes of StakeDeregistration

**Signature**

```ts
export declare const toCborBytes: (
  instance: CML.StakeDeregistration
) => Effect.Effect<Uint8Array, StakeDeregistrationError>
```

Added in v2.0.0

## toCborHex

Method toCborHex of StakeDeregistration

**Signature**

```ts
export declare const toCborHex: (instance: CML.StakeDeregistration) => Effect.Effect<string, StakeDeregistrationError>
```

Added in v2.0.0

## toJsValue

Method toJsValue of StakeDeregistration

**Signature**

```ts
export declare const toJsValue: (instance: CML.StakeDeregistration) => Effect.Effect<any, StakeDeregistrationError>
```

Added in v2.0.0

## toJson

Method toJson of StakeDeregistration

**Signature**

```ts
export declare const toJson: (instance: CML.StakeDeregistration) => Effect.Effect<string, StakeDeregistrationError>
```

Added in v2.0.0

# MethodsUnsafe

## freeUnsafe

Unsafely calls instance.free without Effect wrapper

**Signature**

```ts
export declare const freeUnsafe: (instance: CML.StakeDeregistration) => void
```

Added in v2.0.0

## stakeCredentialUnsafe

Unsafely calls instance.stakeCredential without Effect wrapper

**Signature**

```ts
export declare const stakeCredentialUnsafe: (instance: CML.StakeDeregistration) => CML.Credential
```

Added in v2.0.0

## toCanonicalCborBytesUnsafe

Unsafely calls instance.toCanonicalCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborBytesUnsafe: (instance: CML.StakeDeregistration) => Uint8Array
```

Added in v2.0.0

## toCanonicalCborHexUnsafe

Unsafely calls instance.toCanonicalCborHex without Effect wrapper

**Signature**

```ts
export declare const toCanonicalCborHexUnsafe: (instance: CML.StakeDeregistration) => string
```

Added in v2.0.0

## toCborBytesUnsafe

Unsafely calls instance.toCborBytes without Effect wrapper

**Signature**

```ts
export declare const toCborBytesUnsafe: (instance: CML.StakeDeregistration) => Uint8Array
```

Added in v2.0.0

## toCborHexUnsafe

Unsafely calls instance.toCborHex without Effect wrapper

**Signature**

```ts
export declare const toCborHexUnsafe: (instance: CML.StakeDeregistration) => string
```

Added in v2.0.0

## toJsValueUnsafe

Unsafely calls instance.toJsValue without Effect wrapper

**Signature**

```ts
export declare const toJsValueUnsafe: (instance: CML.StakeDeregistration) => any
```

Added in v2.0.0

## toJsonUnsafe

Unsafely calls instance.toJson without Effect wrapper

**Signature**

```ts
export declare const toJsonUnsafe: (instance: CML.StakeDeregistration) => string
```

Added in v2.0.0

# Types

## StakeDeregistration (type alias)

Type alias for the CML StakeDeregistration class

**Signature**

```ts
export type StakeDeregistration = CML.StakeDeregistration
```

Added in v2.0.0
